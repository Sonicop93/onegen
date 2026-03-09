// ═══════════════════════════════════════════════════════
//  LaunchPad — server.js
//  Local AI Engine · Ollama · SSE Streaming · Session Mgmt
// ═══════════════════════════════════════════════════════

import express   from "express";
import cors      from "cors";
import dotenv    from "dotenv";
import helmet    from "helmet";
import rateLimit from "express-rate-limit";
import { Ollama } from "ollama";

dotenv.config();

// ── CONSTANTS ──────────────────────────────────────────

const PORT            = process.env.PORT            || 5000;
const NODE_ENV        = process.env.NODE_ENV        || "development";
const OLLAMA_HOST     = process.env.OLLAMA_HOST     || "http://127.0.0.1:11434";
const OLLAMA_MODEL    = process.env.OLLAMA_MODEL    || "llama3.2";
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || "http://localhost:3000,http://localhost:5500,http://127.0.0.1:5500").split(",");
const SESSION_TTL_MS  = 30 * 60 * 1000;   // 30 min idle TTL
const MAX_SESSIONS    = 200;
const MAX_HISTORY     = 40;

// ── APP ────────────────────────────────────────────────

const app = express();

// ── SECURITY MIDDLEWARE ────────────────────────────────

app.use(helmet({ contentSecurityPolicy: false, crossOriginEmbedderPolicy: false }));

app.use(cors({
  origin: (origin, cb) => {
    if (!origin || ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
    cb(new Error(`CORS: ${origin} not in ALLOWED_ORIGINS`));
  },
  methods:     ["GET", "POST", "DELETE", "OPTIONS"],
  credentials: true,
}));

app.options("*", cors());
app.use(express.json({ limit: "32kb" }));

// ── RATE LIMITERS ──────────────────────────────────────

app.use(rateLimit({
  windowMs: 60 * 1000, max: 120,
  message:  { error: "Too many requests — slow down." },
  standardHeaders: true, legacyHeaders: false,
}));

const aiLimiter = rateLimit({
  windowMs:     60 * 1000, max: 30,
  message:      { error: "AI limit: 30 req/min. Please wait." },
  keyGenerator: (req) => req.body?.sessionId || req.ip,
});

const feedbackLimiter = rateLimit({
  windowMs: 10 * 60 * 1000, max: 5,
  message:  { error: "Feedback limit: 5 per 10 min." },
});

// ── OLLAMA CLIENT ──────────────────────────────────────

const ollama = new Ollama({ host: OLLAMA_HOST });

async function checkOllama() {
  try {
    const { models } = await ollama.list();
    const names = models.map(m => m.name);
    const found = names.some(n => n.startsWith(OLLAMA_MODEL));
    if (found) {
      log("info", `Ollama ready — model: ${OLLAMA_MODEL}`, { available: names });
    } else {
      log("warn", `Model "${OLLAMA_MODEL}" not found. Run: ollama pull ${OLLAMA_MODEL}`, { available: names });
    }
  } catch {
    log("warn", `Ollama offline at ${OLLAMA_HOST}. Run: ollama serve`);
  }
}

// ── SYSTEM PROMPT ──────────────────────────────────────

const SYSTEM_PROMPT = `You are LaunchPad Architect — an elite full-stack software architect AI embedded in the LaunchPad platform.
Your job is to transform any idea, product description, or vague prompt into a precise, production-ready technical blueprint.

STRICT RESPONSE FORMAT — always use ALL blocks:

SUMMARY:
One or two sentences describing the system and its audience.

FLOW: [StepA] ➔ [StepB] ➔ [StepC] ➔ [StepD]
High-level architecture as a linear data/request flow (4–6 short technical steps).

COMPONENTS: [Module1] | [Module2] | [Module3] | [Module4]
4–6 core service modules separated by pipes. Use real engineering names.

STACK:
Specific frameworks, databases, cloud providers — 1–2 lines.

SNIPPET:
\`\`\`javascript
// Core implementation — under 30 lines, real and practical
\`\`\`

NEXT STEPS:
1. First action item
2. Second action item
3. Third action item

RULES:
- Zero filler. Concise and technical.
- Name real technologies. Never say "a database" — say "PostgreSQL" or "Redis".
- Match complexity to the request (simple → minimal, enterprise → distributed).
- Maintain full context across follow-up messages.
- For healthcare, fintech, crypto: always mention HIPAA, PCI-DSS, or SOC 2 compliance.`;

// ── SESSION STORE ──────────────────────────────────────

const sessions = new Map();

function buildSystemMsg(templateHint) {
  if (!templateHint) return SYSTEM_PROMPT;
  return `${SYSTEM_PROMPT}\n\nACTIVE BLUEPRINT: The user is working on "${templateHint}". Ground your first response in this domain.`;
}

function getOrCreateSession(sessionId, templateHint = null, userAgent = "") {
  if (sessions.has(sessionId)) {
    const sess = sessions.get(sessionId);
    clearTimeout(sess.timer);
    sess.timer = setTimeout(() => destroySession(sessionId), SESSION_TTL_MS);
    sess.meta.lastActive = Date.now();
    return sess;
  }

  // Evict oldest when at capacity
  if (sessions.size >= MAX_SESSIONS) {
    const [oldestId] = [...sessions.entries()]
      .sort((a, b) => a[1].meta.lastActive - b[1].meta.lastActive)[0];
    destroySession(oldestId);
  }

  const sess = {
    history: [{ role: "system", content: buildSystemMsg(templateHint), ts: Date.now() }],
    meta: {
      createdAt:    Date.now(),
      lastActive:   Date.now(),
      messageCount: 0,
      templateId:   templateHint || null,
      userAgent,
    },
    timer: setTimeout(() => destroySession(sessionId), SESSION_TTL_MS),
  };

  sessions.set(sessionId, sess);
  log("info", `Session created: ${sessionId}${templateHint ? ` [${templateHint}]` : ""}`);
  return sess;
}

function destroySession(sessionId) {
  const sess = sessions.get(sessionId);
  if (sess) {
    clearTimeout(sess.timer);
    sessions.delete(sessionId);
    log("info", `Session destroyed: ${sessionId} (${sess.meta.messageCount} msgs)`);
  }
}

// ── LOGGER ─────────────────────────────────────────────

function log(level, msg, meta = {}) {
  const line = JSON.stringify({ ts: new Date().toISOString(), level, msg, ...meta });
  if (level === "error" || level === "warn") console.error(line);
  else if (NODE_ENV !== "test") console.log(line);
}

// ── SSE HELPERS ────────────────────────────────────────

function sseOpen(res) {
  res.setHeader("Content-Type",      "text/event-stream");
  res.setHeader("Cache-Control",     "no-cache");
  res.setHeader("Connection",        "keep-alive");
  res.setHeader("X-Accel-Buffering", "no");
  res.flushHeaders();
}

const sseWrite = (res, p) => res.write(`data: ${JSON.stringify(p)}\n\n`);
const sseDone  = (res)    => { res.write("data: [DONE]\n\n"); res.end(); };
const sseError = (res, message, code = "AI_ERROR") => { sseWrite(res, { error: message, code }); res.end(); };

// ── VALIDATION ─────────────────────────────────────────

function validateChat({ prompt, sessionId }) {
  if (!prompt || typeof prompt !== "string")       return "prompt must be a non-empty string.";
  if (prompt.trim().length === 0)                  return "prompt cannot be blank.";
  if (prompt.length > 4000)                        return "prompt too long (max 4000 chars).";
  if (!sessionId || typeof sessionId !== "string") return "sessionId is required.";
  if (!/^[a-zA-Z0-9_-]{4,32}$/.test(sessionId))   return "sessionId: 4–32 alphanumeric chars.";
  return null;
}

// ── ROUTE: POST /api/ai/chat  (SSE streaming) ──────────

app.post("/api/ai/chat", aiLimiter, async (req, res) => {
  const err = validateChat(req.body);
  if (err) return res.status(400).json({ error: err });

  const { prompt, sessionId, templateId } = req.body;

  sseOpen(res);

  let aborted = false;
  req.on("close", () => { aborted = true; });

  try {
    const sess = getOrCreateSession(sessionId, templateId || null, req.headers["user-agent"] || "");
    sess.meta.messageCount++;

    // Trim keeping system message
    if (sess.history.length > MAX_HISTORY + 1) {
      sess.history = [sess.history[0], ...sess.history.slice(-MAX_HISTORY)];
    }

    sess.history.push({ role: "user", content: prompt, ts: Date.now() });

    // Strip internal ts field before sending to Ollama
    const messages = sess.history.map(({ role, content }) => ({ role, content }));

    const stream = await ollama.chat({
      model:    OLLAMA_MODEL,
      messages,
      stream:   true,
      options: {
        temperature: 0.75,
        top_p:       0.92,
        top_k:       40,
        num_predict: 1500,
      },
    });

    let fullText = "";
    for await (const chunk of stream) {
      if (aborted) break;
      const text = chunk.message?.content || "";
      if (text) {
        fullText += text;
        sseWrite(res, { text, sessionId });
      }
    }

    sess.history.push({ role: "assistant", content: fullText, ts: Date.now() });

    if (!aborted) sseDone(res);

    log("info", "chat.ok", { sessionId, model: OLLAMA_MODEL, promptLen: prompt.length, replyLen: fullText.length });

  } catch (e) {
    log("error", "chat.error", { sessionId, message: e.message });

    const friendly =
      e.message?.includes("ECONNREFUSED") || e.message?.includes("fetch failed")
        ? "Ollama is not running. Open a terminal and run: ollama serve"
        : e.message?.toLowerCase().includes("not found")
          ? `Model "${OLLAMA_MODEL}" not pulled. Run: ollama pull ${OLLAMA_MODEL}`
          : "LaunchPad Architect hit an error. Please retry.";

    const code = e.message?.includes("ECONNREFUSED") ? "OLLAMA_OFFLINE" : "AI_ERROR";
    sseError(res, friendly, code);
  }
});

// ── ROUTE: GET /api/session/:id ────────────────────────

app.get("/api/session/:id", (req, res) => {
  const { id } = req.params;
  if (!/^[a-zA-Z0-9_-]{4,32}$/.test(id))
    return res.status(400).json({ error: "Invalid session ID." });

  const sess = sessions.get(id);
  if (!sess) return res.status(404).json({ error: "Session not found or expired." });

  res.json({
    sessionId:     id,
    model:         OLLAMA_MODEL,
    messageCount:  sess.meta.messageCount,
    templateId:    sess.meta.templateId,
    createdAt:     sess.meta.createdAt,
    lastActive:    sess.meta.lastActive,
    historyLength: sess.history.length - 1,
    ttlRemaining:  Math.max(0, SESSION_TTL_MS - (Date.now() - sess.meta.lastActive)),
  });
});

// ── ROUTE: GET /api/session/:id/history ───────────────

app.get("/api/session/:id/history", (req, res) => {
  const sess = sessions.get(req.params.id);
  if (!sess) return res.status(404).json({ error: "Session not found." });

  const limit   = Math.min(parseInt(req.query.limit) || 20, MAX_HISTORY);
  const history = sess.history.filter(m => m.role !== "system").slice(-limit);

  res.json({ sessionId: req.params.id, history, total: history.length });
});

// ── ROUTE: DELETE /api/session/:id ────────────────────

app.delete("/api/session/:id", (req, res) => {
  if (!sessions.has(req.params.id))
    return res.status(404).json({ error: "Session not found." });
  destroySession(req.params.id);
  res.json({ ok: true, message: `Session ${req.params.id} cleared.` });
});

// ── ROUTE: POST /api/feedback ──────────────────────────

app.post("/api/feedback", feedbackLimiter, (req, res) => {
  const { text, sessionId, rating } = req.body;
  if (!text || typeof text !== "string" || text.trim().length < 3)
    return res.status(400).json({ error: "Feedback text is too short." });

  log("info", "feedback", { sessionId: sessionId || "anon", rating: rating ?? null, snippet: text.trim().slice(0, 120) });
  res.json({ ok: true, message: "Feedback received — thank you!" });
});

// ── ROUTE: POST /api/blueprint/parse ──────────────────

app.post("/api/blueprint/parse", (req, res) => {
  const { text } = req.body;
  if (!text || typeof text !== "string")
    return res.status(400).json({ error: "text field required." });

  const grab  = (label) => { const m = text.match(new RegExp(`${label}:?\\s*([^\\n]+)`, "i")); return m ? m[1].trim() : null; };
  const snippetM = text.match(/```(\w+)?\n([\s\S]*?)```/);
  const nextM    = text.match(/NEXT STEPS:?([\s\S]*?)(?:\n{2,}|$)/i);
  const flowRaw  = grab("FLOW");
  const compRaw  = grab("COMPONENTS");

  res.json({
    summary:    grab("SUMMARY"),
    stack:      grab("STACK"),
    flow:       flowRaw ? flowRaw.split("➔").map(s => s.trim()) : [],
    components: compRaw ? compRaw.split("|").map(s => s.replace(/[\[\]]/g, "").trim()).filter(Boolean) : [],
    snippet:    snippetM ? { language: snippetM[1] || "javascript", code: snippetM[2].trim() } : null,
    nextSteps:  nextM ? nextM[1].trim().split("\n").map(l => l.replace(/^\d+\.\s*/, "").trim()).filter(Boolean) : [],
    raw:        text,
  });
});

// ── ROUTE: GET /api/templates ──────────────────────────

app.get("/api/templates", (_req, res) => {
  import("./templates.js")
    .then(({ moduleTemplates }) => {
      const safe = moduleTemplates.map(({ id, title, icon, category, tag, color, glow, description, flow, blocks, mindMap }) =>
        ({ id, title, icon, category, tag, color, glow, description, flow, blocks, mindMap })
      );
      res.json({ count: safe.length, templates: safe });
    })
    .catch(() => res.status(500).json({ error: "Could not load templates." }));
});

// ── ROUTE: GET /api/models ─────────────────────────────

app.get("/api/models", async (_req, res) => {
  try {
    const { models } = await ollama.list();
    res.json({
      active: OLLAMA_MODEL,
      models: models.map(m => ({
        name:     m.name,
        size:     m.size,
        modified: m.modified_at,
        isActive: m.name.startsWith(OLLAMA_MODEL),
      })),
    });
  } catch {
    res.status(503).json({ error: "Cannot reach Ollama.", hint: "Run: ollama serve" });
  }
});

// ── ROUTE: GET /api/health ─────────────────────────────

app.get("/api/health", async (_req, res) => {
  let ollamaStatus = "unknown";
  try { await ollama.list(); ollamaStatus = "online"; }
  catch { ollamaStatus = "offline"; }

  res.json({
    status: "ok", version: "2.1.0", env: NODE_ENV,
    uptime: Math.floor(process.uptime()),
    ai: { provider: "Ollama (local)", host: OLLAMA_HOST, model: OLLAMA_MODEL, status: ollamaStatus },
    sessions: { active: sessions.size, maxAllowed: MAX_SESSIONS },
    memory: {
      heapUsedMB:  Math.round(process.memoryUsage().heapUsed  / 1024 / 1024),
      heapTotalMB: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
    },
    ts: new Date().toISOString(),
  });
});

// ── ROUTE: GET /api/stats ──────────────────────────────

app.get("/api/stats", (_req, res) => {
  const totalMessages = [...sessions.values()].reduce((s, v) => s + v.meta.messageCount, 0);
  const freq = [...sessions.values()].map(s => s.meta.templateId).filter(Boolean)
    .reduce((acc, t) => { acc[t] = (acc[t] || 0) + 1; return acc; }, {});

  res.json({
    activeSessions: sessions.size, totalMessages, model: OLLAMA_MODEL,
    topTemplates:   Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 5),
    serverUptime:   Math.floor(process.uptime()),
  });
});

// ── 404 ────────────────────────────────────────────────

app.use((_req, res) => res.status(404).json({
  error: "Route not found.",
  hint:  "Available: /api/health · /api/ai/chat · /api/models · /api/templates · /api/stats",
}));

// ── GLOBAL ERROR ───────────────────────────────────────

// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  log("error", "unhandled", { message: err.message });
  res.status(500).json({ error: "Internal server error.", message: NODE_ENV === "development" ? err.message : undefined });
});

// ── SESSION GC ─────────────────────────────────────────

setInterval(() => {
  const now = Date.now(); let pruned = 0;
  for (const [id, sess] of sessions) {
    if (now - sess.meta.lastActive > SESSION_TTL_MS) { destroySession(id); pruned++; }
  }
  if (pruned) log("info", `GC: pruned ${pruned} idle session(s)`);
}, 5 * 60 * 1000);

// ── GRACEFUL SHUTDOWN ──────────────────────────────────

const shutdown = (sig) => { log("info", `${sig} received`); sessions.forEach((_, id) => destroySession(id)); process.exit(0); };
process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT",  () => shutdown("SIGINT"));
process.on("uncaughtException",  e => log("error", "uncaughtException",  { message: e.message }));
process.on("unhandledRejection", e => log("error", "unhandledRejection", { message: String(e) }));

// ── BOOT ───────────────────────────────────────────────

app.listen(PORT, async () => {
  console.log(`
╔═══════════════════════════════════════════╗
║   🚀  LaunchPad Engine  v2.1.0            ║
╠═══════════════════════════════════════════╣
║  ENV    : ${NODE_ENV.padEnd(31)}║
║  PORT   : http://localhost:${String(PORT).padEnd(14)}║
║  AI     : Ollama (local) · ${OLLAMA_MODEL.padEnd(13)}║
║  HOST   : ${OLLAMA_HOST.padEnd(31)}║
╠═══════════════════════════════════════════╣
║  POST   /api/ai/chat        SSE stream    ║
║  GET    /api/session/:id    info          ║
║  DELETE /api/session/:id    clear         ║
║  GET    /api/session/:id/history          ║
║  GET    /api/models         local models  ║
║  GET    /api/templates      32 blueprints ║
║  POST   /api/blueprint/parse              ║
║  POST   /api/feedback                     ║
║  GET    /api/health                       ║
║  GET    /api/stats                        ║
╚═══════════════════════════════════════════╝`);
  await checkOllama();
});

export default app;
