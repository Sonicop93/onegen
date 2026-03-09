// ═══════════════════════════════════════════════════════
//  LaunchPad — script.js
//  Full application controller · State · AI · Search · UX
// ═══════════════════════════════════════════════════════

import { moduleTemplates } from './templates.js';

// ── CONSTANTS ──────────────────────────────────────────

const SESSION_ID   = Math.random().toString(36).substring(2, 9).toUpperCase();
const BUILD_VER    = '2.1.0';
const MAX_HISTORY  = 12;
const TYPING_DELAY = 1700;

// ── STATE ──────────────────────────────────────────────

const State = {
  activeTemplate : null,
  chatHistory    : [],          // { role, text, templateId, ts }
  projectHistory : JSON.parse(localStorage.getItem('lp_history') || '[]'),
  searchQuery    : '',
  activeCategory : 'All',
  commandOpen    : false,
  typingTimer    : null,
  user           : JSON.parse(localStorage.getItem('lp_user') || 'null'),
  stats          : { generated: 0, templatesViewed: 0, sessionStart: Date.now() },
};

// ── DOM CACHE ──────────────────────────────────────────

const $ = id => document.getElementById(id);
const DOM = {
  templatesGrid  : $('templatesGrid'),
  chatArea       : $('chatArea'),
  generateBtn    : $('generateBtn'),
  promptInput    : $('promptInput'),
  historyList    : $('historyList'),
  feedbackModal  : $('feedbackModal'),
  loginModal     : $('loginModal'),
  feedbackText   : $('feedbackText'),
  loginEmail     : $('loginEmail'),
  loginPass      : $('loginPass'),
  loginSubmit    : $('loginSubmit'),
  submitFeedback : $('submitFeedback'),
  openFeedback   : $('openFeedback'),
  openLogin      : $('openLogin'),
  toast          : $('toast'),
  toastMsg       : $('toastMsg'),
};

// ── CATEGORIES ─────────────────────────────────────────

const CATEGORIES = ['All', ...new Set(moduleTemplates.map(t => t.category))];

// ── AI RESPONSE ENGINE ─────────────────────────────────

const AI = {
  intros: [
    t => `Analysing **${t.title}** architecture… I'll scaffold the ${t.blocks[0]} layer first, then wire the ${t.blocks[1]} into the pipeline.`,
    t => `Great choice. The *${t.flow.split('➔')[0].trim()}* entry point is clean. Bootstrapping your ${t.blocks[2]} and ${t.blocks[3]} now.`,
    t => `${t.tag} stack detected. Mapping ${t.title} across ${t.mindMap.branches.length} service domains — starting with ${t.mindMap.branches[0].label}.`,
    t => `Initiating **${t.title}** blueprint. ${t.description} I'll generate the full architecture tree momentarily.`,
  ],
  followUps: [
    t => `Blueprint ready. Your **${t.flow}** pipeline has been initialised with ${t.blocks.length} core modules. Click the preview card above to explore the full mind map.`,
    t => `Scaffolding complete. ${t.blocks.map(b => `\`${b}\``).join(', ')} — all modules are online. Open the detail view to inspect the architecture.`,
    t => `Done. ${t.title} is live in preview mode. The **${t.blocks[0]}** and **${t.blocks[3]}** are your critical path — I'd start there.`,
  ],
  freeform: [
    `I can architect any system you describe. Try: *"Build me a real-time chat app"* or *"Design a multi-tenant billing platform."*`,
    `Paste a feature spec, a rough idea, or even a user story — I'll turn it into a production-ready blueprint with modules, flow, and a live preview.`,
    `I see you're thinking big. Give me a domain (fintech, health, logistics, gaming…) and a target scale, and I'll draft the full architecture.`,
    `Not sure where to start? Try one of the 32 blueprints below — each one opens a full mind map, block diagram, and working UI preview.`,
  ],
  suggestions: [
    'Build a multi-tenant SaaS billing engine',
    'Design a real-time analytics pipeline',
    'Create a HIPAA-compliant patient portal',
    'Architect a zero-trust security platform',
    'Generate an e-commerce checkout flow',
    'Build a serverless IoT ingestion service',
  ],

  respond(text, template) {
    if (template) {
      const intro    = AI.intros[Math.floor(Math.random() * AI.intros.length)](template);
      const followUp = AI.followUps[Math.floor(Math.random() * AI.followUps.length)](template);
      return { intro, followUp };
    }
    // Fuzzy-match a template from free text
    const lower  = text.toLowerCase();
    const match  = moduleTemplates.find(t =>
      lower.includes(t.title.toLowerCase().split(' ')[0]) ||
      lower.includes(t.tag.toLowerCase()) ||
      lower.includes(t.category.toLowerCase().split(' ')[0])
    );
    if (match) return AI.respond(text, match);
    return { intro: AI.freeform[Math.floor(Math.random() * AI.freeform.length)], followUp: null };
  },
};

// ── UTILITIES ──────────────────────────────────────────

function formatTime(ts) {
  const d   = new Date(ts);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60)  return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  return d.toLocaleDateString('en-US', { month:'short', day:'numeric' });
}

function escapeHTML(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function markdownToHTML(text) {
  return escapeHTML(text)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/`(.+?)`/g, `<code style="background:rgba(255,255,255,0.08);padding:1px 6px;border-radius:4px;font-size:12px;font-family:monospace">$1</code>`);
}

function saveHistory() {
  localStorage.setItem('lp_history', JSON.stringify(State.projectHistory.slice(0, MAX_HISTORY)));
}

function pushHistory(template) {
  State.projectHistory = State.projectHistory.filter(h => h.id !== template.id);
  State.projectHistory.unshift({ id: template.id, title: template.title, icon: template.icon, color: template.color, ts: Date.now() });
  saveHistory();
  renderHistory();
}

// ── TOAST ──────────────────────────────────────────────

function showToast(msg, type = 'success') {
  if (!DOM.toast || !DOM.toastMsg) return;
  const colors = { success: '#3ddc84', error: '#f43f5e', info: '#38bdf8', warn: '#fbbf24' };
  const dot = DOM.toast.querySelector('.dot');
  if (dot) dot.style.background = colors[type] || colors.success;
  DOM.toastMsg.textContent = msg;
  DOM.toast.classList.add('show');
  clearTimeout(DOM.toast._timer);
  DOM.toast._timer = setTimeout(() => DOM.toast.classList.remove('show'), 3200);
}

// ── MODAL HELPERS ──────────────────────────────────────

function openModal(id)  { $(id)?.classList.add('open');    }
function closeModal(id) { $(id)?.classList.remove('open'); }
window.closeModal = closeModal;

// ── CHAT ENGINE ────────────────────────────────────────

function appendBubble(role, html, template = null) {
  const wrap = document.createElement('div');
  wrap.className = `chat-bubble ${role}`;

  if (role === 'ai') {
    wrap.innerHTML = `
      <div class="ai-header">
        <div class="ai-dot"></div>
        <span class="ai-label">LaunchPad AI</span>
        <span style="margin-left:auto;font-size:10px;color:var(--text-dim)">${formatTime(Date.now())}</span>
      </div>
      <div class="bubble-body">${html}</div>`;

    // If there's a template, attach a quick-action chip inside the bubble
    if (template) {
      const chip = document.createElement('div');
      chip.style.cssText = `margin-top:10px;display:flex;gap:8px;flex-wrap:wrap`;
      chip.innerHTML = `
        <button class="chip-btn" data-id="${template.id}" style="--chip-c:${template.color}">
          ${template.icon} Open Full Blueprint
        </button>
        <button class="chip-copy" data-flow="${escapeHTML(template.flow)}" style="--chip-c:#7a7d8a">
          📋 Copy Flow
        </button>`;
      wrap.querySelector('.bubble-body').appendChild(chip);

      chip.querySelector('.chip-btn').addEventListener('click', () => {
        const t = moduleTemplates.find(m => m.id === template.id);
        if (t) window._openTemplateDetail(t);
      });
      chip.querySelector('.chip-copy').addEventListener('click', e => {
        navigator.clipboard?.writeText(template.flow);
        showToast('Flow copied to clipboard', 'info');
      });
    }
  } else {
    wrap.innerHTML = `<div class="bubble-body">${html}</div>
      <div style="font-size:10px;color:var(--text-dim);margin-top:5px;text-align:right">${formatTime(Date.now())}</div>`;
  }

  DOM.chatArea?.appendChild(wrap);
  requestAnimationFrame(() => {
    wrap.style.animation = 'bubbleIn .3s cubic-bezier(.22,1,.36,1)';
    scrollChatBottom();
  });
  return wrap;
}

function appendTypingIndicator() {
  const wrap = document.createElement('div');
  wrap.id = 'typingIndicator';
  wrap.className = 'chat-bubble ai';
  wrap.innerHTML = `<div class="ai-header"><div class="ai-dot"></div><span class="ai-label">LaunchPad AI</span><span style="margin-left:auto;font-size:10px;color:var(--text-dim)">typing…</span></div>
    <div class="typing-dots"><span></span><span></span><span></span></div>`;
  DOM.chatArea?.appendChild(wrap);
  scrollChatBottom();
  return wrap;
}

function removeTypingIndicator() {
  $('typingIndicator')?.remove();
}

function scrollChatBottom() {
  const scroll = document.querySelector('.content-scroll');
  if (scroll) scroll.scrollTo({ top: scroll.scrollHeight, behavior: 'smooth' });
}

function sendMessage(text, template = null) {
  const val = text?.trim() || DOM.promptInput?.value.trim();
  if (!val) return;

  if (DOM.promptInput) {
    DOM.promptInput.value = '';
    DOM.promptInput.style.height = 'auto';
  }

  // Dismiss suggestion chips if present
  $('suggestionsRow')?.remove();

  // Push user bubble
  appendBubble('user', markdownToHTML(val));
  State.chatHistory.push({ role: 'user', text: val, ts: Date.now() });

  // Hero section collapses after first message
  const hero = document.querySelector('.hero-section');
  if (hero && hero.style.display !== 'none') {
    hero.style.transition = 'all .4s ease';
    hero.style.opacity = '0';
    hero.style.transform = 'translateY(-10px)';
    setTimeout(() => { hero.style.display = 'none'; }, 400);
  }

  // Typing indicator
  const indicator = appendTypingIndicator();

  // AI response
  const { intro, followUp } = AI.respond(val, template);
  const matchedTemplate = template || moduleTemplates.find(t =>
    val.toLowerCase().includes(t.title.toLowerCase().split(' ')[0]) ||
    val.toLowerCase().includes(t.tag.toLowerCase())
  );

  clearTimeout(State.typingTimer);
  State.typingTimer = setTimeout(() => {
    removeTypingIndicator();
    appendBubble('ai', markdownToHTML(intro), matchedTemplate || null);
    State.stats.generated++;

    if (matchedTemplate) {
      pushHistory(matchedTemplate);
      State.activeTemplate = matchedTemplate;
    }

    if (followUp) {
      setTimeout(() => {
        appendBubble('ai', markdownToHTML(followUp));
      }, 900);
    }

    State.chatHistory.push({ role: 'ai', text: intro, ts: Date.now() });
    updateSessionBadge();
  }, TYPING_DELAY);
}

// ── TEMPLATE GRID ──────────────────────────────────────

function renderTemplates(filter = State.activeCategory, query = State.searchQuery) {
  if (!DOM.templatesGrid) return;

  const q   = query.toLowerCase().trim();
  const all = moduleTemplates.filter(t => {
    const catMatch = filter === 'All' || t.category === filter;
    const qMatch   = !q ||
      t.title.toLowerCase().includes(q) ||
      t.description.toLowerCase().includes(q) ||
      t.tag.toLowerCase().includes(q) ||
      t.category.toLowerCase().includes(q) ||
      t.blocks.some(b => b.toLowerCase().includes(q));
    return catMatch && qMatch;
  });

  // Animate out
  DOM.templatesGrid.style.opacity = '0';
  DOM.templatesGrid.style.transform = 'translateY(4px)';

  setTimeout(() => {
    DOM.templatesGrid.innerHTML = '';

    if (all.length === 0) {
      DOM.templatesGrid.innerHTML = `<div style="grid-column:1/-1;padding:40px;text-align:center;color:var(--text-dim);font-size:14px">
        No blueprints match "<strong style="color:var(--text-muted)">${escapeHTML(q)}</strong>" · <a href="#" id="clearSearch" style="color:var(--gold);text-decoration:none">Clear search</a>
      </div>`;
      $('clearSearch')?.addEventListener('click', e => { e.preventDefault(); clearSearch(); });
    } else {
      all.forEach((t, i) => {
        const card = document.createElement('div');
        card.className = 'template-card';
        card.style.cssText = `animation-delay:${i * 0.035 + 0.05}s;--card-glow:${t.glow}`;
        card.dataset.id = t.id;

        card.innerHTML = `
          <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:12px">
            <span style="font-size:26px">${t.icon}</span>
            <span class="card-tag" style="background:${t.color}22;color:${t.color}">${t.tag}</span>
          </div>
          <div class="card-title">${q ? highlightMatch(t.title, q) : t.title}</div>
          <div class="card-desc">${t.description}</div>
          <div style="margin-top:12px;display:flex;flex-wrap:wrap;gap:4px">
            ${t.blocks.slice(0,2).map(b => `<span style="font-size:10px;padding:2px 7px;border-radius:5px;background:rgba(255,255,255,0.05);color:var(--text-dim)">${b}</span>`).join('')}
            <span style="font-size:10px;padding:2px 7px;border-radius:5px;background:rgba(255,255,255,0.03);color:var(--text-dim)">+${t.blocks.length - 2} more</span>
          </div>`;

        card.addEventListener('click', () => handleTemplateClick(t));
        card.addEventListener('mouseenter', () => { card.style.borderColor = t.color + '55'; });
        card.addEventListener('mouseleave', () => { card.style.borderColor = ''; });

        DOM.templatesGrid.appendChild(card);
      });
    }

    DOM.templatesGrid.style.transition = 'opacity .25s ease, transform .25s ease';
    DOM.templatesGrid.style.opacity = '1';
    DOM.templatesGrid.style.transform = 'translateY(0)';
  }, 120);
}

function highlightMatch(text, query) {
  const re = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return escapeHTML(text).replace(re, `<mark style="background:var(--gold-dim);color:var(--gold);border-radius:2px">$1</mark>`);
}

function clearSearch() {
  State.searchQuery = '';
  const inp = $('searchInput');
  if (inp) inp.value = '';
  renderTemplates();
}

function handleTemplateClick(t) {
  State.stats.templatesViewed++;
  State.activeTemplate = t;
  // Fire into templates.js detail modal
  if (window._openTemplateDetail) {
    window._openTemplateDetail(t);
  }
}

// Wire templates.js → script.js bridge
window._launchpadSelectTemplate = (t) => {
  sendMessage(`Build ${t.title}`, t);
  showToast(`Blueprint loaded: ${t.title}`, 'success');
};

// ── CATEGORY FILTER BAR ────────────────────────────────

function renderCategoryBar() {
  const container = document.querySelector('.section-header');
  if (!container) return;

  const bar = document.createElement('div');
  bar.id = 'categoryBar';
  bar.style.cssText = `display:flex;gap:6px;flex-wrap:wrap;margin-bottom:14px;animation:fadeUp .4s ease both`;

  CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.textContent = cat;
    btn.dataset.cat = cat;
    btn.style.cssText = `padding:5px 13px;border-radius:20px;border:1px solid var(--border);background:none;color:var(--text-muted);font-family:var(--font-body);font-size:11.5px;font-weight:500;cursor:pointer;transition:all .2s;white-space:nowrap`;
    btn.addEventListener('click', () => {
      State.activeCategory = cat;
      bar.querySelectorAll('button').forEach(b => {
        b.style.background = 'none';
        b.style.color = 'var(--text-muted)';
        b.style.borderColor = 'var(--border)';
      });
      btn.style.background = 'var(--gold-dim)';
      btn.style.color = 'var(--gold)';
      btn.style.borderColor = 'rgba(201,168,76,.3)';
      renderTemplates();
    });
    if (cat === 'All') {
      btn.style.background = 'var(--gold-dim)';
      btn.style.color = 'var(--gold)';
      btn.style.borderColor = 'rgba(201,168,76,.3)';
    }
    bar.appendChild(btn);
  });

  container.insertAdjacentElement('afterend', bar);
}

// ── SEARCH BAR ─────────────────────────────────────────

function renderSearchBar() {
  const container = document.querySelector('.templates-container .section-header');
  if (!container || $('searchInput')) return;

  const wrap = document.createElement('div');
  wrap.style.cssText = `position:relative;display:flex;align-items:center`;
  wrap.innerHTML = `
    <span style="position:absolute;left:11px;font-size:14px;pointer-events:none;color:var(--text-dim)">🔍</span>
    <input id="searchInput" placeholder="Search 32 blueprints…" style="
      padding:7px 14px 7px 32px;border-radius:8px;border:1px solid var(--border);
      background:var(--surface2);color:var(--text);font-family:var(--font-body);
      font-size:12.5px;outline:none;width:220px;transition:border-color .2s,width .3s;
    ">
    <span id="searchCount" style="position:absolute;right:10px;font-size:10px;color:var(--text-dim)"></span>`;

  container.appendChild(wrap);

  const inp = $('searchInput');
  inp.addEventListener('focus',  () => { inp.style.borderColor = 'rgba(201,168,76,.4)'; inp.style.width = '260px'; });
  inp.addEventListener('blur',   () => { inp.style.borderColor = ''; inp.style.width = '220px'; });
  inp.addEventListener('input',  () => {
    State.searchQuery = inp.value;
    renderTemplates();
    updateSearchCount();
  });
  inp.addEventListener('keydown', e => { if (e.key === 'Escape') clearSearch(); });
}

function updateSearchCount() {
  const el = $('searchCount');
  if (!el) return;
  const q    = State.searchQuery.toLowerCase();
  const cat  = State.activeCategory;
  const count = moduleTemplates.filter(t => {
    const c = cat === 'All' || t.category === cat;
    const m = !q || t.title.toLowerCase().includes(q) || t.tag.toLowerCase().includes(q);
    return c && m;
  }).length;
  el.textContent = q || cat !== 'All' ? `${count} result${count !== 1 ? 's' : ''}` : '';
}

// ── HISTORY SIDEBAR ────────────────────────────────────

function renderHistory() {
  if (!DOM.historyList) return;
  DOM.historyList.innerHTML = '';

  const items = State.projectHistory.length
    ? State.projectHistory
    : [
        { title: 'AI SaaS Dashboard',  icon: '🧠', color: '#a78bfa', ts: Date.now() - 3600000  },
        { title: 'FinTech Portal',      icon: '💳', color: '#34d399', ts: Date.now() - 7200000  },
        { title: 'E-Commerce v2',       icon: '🛒', color: '#fb923c', ts: Date.now() - 86400000 },
        { title: 'IoT Monitor',         icon: '📡', color: '#22d3ee', ts: Date.now() - 172800000 },
      ];

  items.slice(0, MAX_HISTORY).forEach((h, i) => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.style.cssText = `display:flex;align-items:center;gap:7px;animation:fadeUp .3s ${i*0.05}s ease both`;
    item.innerHTML = `
      <span style="font-size:13px;flex-shrink:0">${h.icon}</span>
      <div style="min-width:0;flex:1">
        <div style="font-size:12px;color:var(--text-muted);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${h.title}</div>
        <div style="font-size:10px;color:var(--text-dim)">${formatTime(h.ts)}</div>
      </div>
      <div style="width:5px;height:5px;border-radius:50%;background:${h.color || 'var(--gold)'};flex-shrink:0;opacity:.7"></div>`;

    item.addEventListener('click', () => {
      const t = moduleTemplates.find(m => m.title === h.title || m.id === h.id);
      if (t) handleTemplateClick(t);
    });

    DOM.historyList.appendChild(item);
  });

  if (State.projectHistory.length) {
    const clear = document.createElement('button');
    clear.textContent = 'Clear history';
    clear.style.cssText = `margin-top:8px;width:100%;padding:6px;border:none;background:none;color:var(--text-dim);font-size:11px;cursor:pointer;text-align:left;padding-left:8px;transition:color .2s`;
    clear.addEventListener('mouseenter', () => clear.style.color = 'var(--red)');
    clear.addEventListener('mouseleave', () => clear.style.color = 'var(--text-dim)');
    clear.addEventListener('click', () => {
      State.projectHistory = [];
      saveHistory();
      renderHistory();
      showToast('History cleared', 'info');
    });
    DOM.historyList.appendChild(clear);
  }
}

// ── COMMAND PALETTE ────────────────────────────────────

function openCommandPalette() {
  if ($('cmdPalette')) return;
  State.commandOpen = true;

  const overlay = document.createElement('div');
  overlay.id = 'cmdPalette';
  overlay.style.cssText = `position:fixed;inset:0;z-index:800;background:rgba(5,6,10,.82);backdrop-filter:blur(10px);display:flex;justify-content:center;padding-top:18vh;animation:fadein .15s ease`;

  overlay.innerHTML = `
    <style>@keyframes fadein{from{opacity:0}to{opacity:1}}</style>
    <div style="width:100%;max-width:540px;height:fit-content;background:var(--surface);border:1px solid var(--border);border-radius:16px;overflow:hidden;box-shadow:var(--shadow)">
      <div style="padding:14px 18px;border-bottom:1px solid var(--border);display:flex;align-items:center;gap:10px">
        <span style="font-size:16px;color:var(--text-dim)">⌘</span>
        <input id="cmdInput" placeholder="Search blueprints, categories, commands…"
          style="flex:1;background:none;border:none;outline:none;color:var(--text);font-family:var(--font-body);font-size:14px;caret-color:var(--gold)">
        <kbd style="padding:3px 8px;border-radius:5px;border:1px solid var(--border);color:var(--text-dim);font-size:10px;background:var(--surface2)">ESC</kbd>
      </div>
      <div id="cmdResults" style="max-height:360px;overflow-y:auto;padding:8px"></div>
    </div>`;

  document.body.appendChild(overlay);

  const inp = $('cmdInput');
  inp.focus();

  function renderCmdResults(q = '') {
    const res = $('cmdResults');
    if (!res) return;
    const ql = q.toLowerCase();

    const systemCmds = [
      { icon: '✨', label: 'New Project',    action: () => { closePalette(); clearChat(); } },
      { icon: '📁', label: 'My Library',     action: () => { closePalette(); showToast('Library coming soon', 'info'); } },
      { icon: '🔍', label: 'Search Blueprints', action: () => { closePalette(); $('searchInput')?.focus(); } },
      { icon: '⌨️', label: 'Keyboard Shortcuts', action: () => { closePalette(); showShortcutsModal(); } },
    ].filter(c => !ql || c.label.toLowerCase().includes(ql));

    const tmplMatches = moduleTemplates.filter(t =>
      !ql || t.title.toLowerCase().includes(ql) || t.tag.toLowerCase().includes(ql) || t.category.toLowerCase().includes(ql)
    ).slice(0, 8);

    res.innerHTML = '';
    const section = (title, items, render) => {
      if (!items.length) return;
      res.insertAdjacentHTML('beforeend', `<div style="font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:var(--text-dim);padding:8px 10px 4px">${title}</div>`);
      items.forEach(render);
    };

    section('Commands', systemCmds, cmd => {
      const row = document.createElement('div');
      row.style.cssText = `display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text-muted);transition:.15s`;
      row.innerHTML = `<span style="font-size:16px">${cmd.icon}</span>${cmd.label}`;
      row.addEventListener('mouseenter', () => { row.style.background = 'rgba(255,255,255,0.05)'; row.style.color = 'var(--text)'; });
      row.addEventListener('mouseleave', () => { row.style.background = ''; row.style.color = 'var(--text-muted)'; });
      row.addEventListener('click', cmd.action);
      res.appendChild(row);
    });

    section('Blueprints', tmplMatches, t => {
      const row = document.createElement('div');
      row.style.cssText = `display:flex;align-items:center;gap:10px;padding:9px 12px;border-radius:8px;cursor:pointer;font-size:13px;color:var(--text-muted);transition:.15s`;
      row.innerHTML = `<span style="font-size:16px;width:24px;text-align:center">${t.icon}</span>
        <div style="flex:1;min-width:0"><div style="color:var(--text);font-size:13px">${t.title}</div><div style="font-size:11px;color:var(--text-dim)">${t.category}</div></div>
        <span style="padding:2px 8px;border-radius:10px;font-size:10px;font-weight:700;background:${t.color}22;color:${t.color}">${t.tag}</span>`;
      row.addEventListener('mouseenter', () => { row.style.background = `${t.color}12`; });
      row.addEventListener('mouseleave', () => { row.style.background = ''; });
      row.addEventListener('click', () => { closePalette(); handleTemplateClick(t); });
      res.appendChild(row);
    });

    if (!systemCmds.length && !tmplMatches.length) {
      res.innerHTML = `<div style="text-align:center;padding:32px;color:var(--text-dim);font-size:13px">No results for "<strong>${escapeHTML(q)}</strong>"</div>`;
    }
  }

  renderCmdResults();
  inp.addEventListener('input', () => renderCmdResults(inp.value));
  inp.addEventListener('keydown', e => { if (e.key === 'Escape') closePalette(); });
  overlay.addEventListener('click', e => { if (e.target === overlay) closePalette(); });

  function closePalette() {
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity .15s';
    setTimeout(() => { overlay.remove(); State.commandOpen = false; }, 150);
  }
}

// ── KEYBOARD SHORTCUTS ─────────────────────────────────

function showShortcutsModal() {
  const modal = document.createElement('div');
  modal.style.cssText = `position:fixed;inset:0;z-index:900;background:rgba(5,6,10,.8);backdrop-filter:blur(8px);display:flex;align-items:center;justify-content:center`;
  const shortcuts = [
    ['⌘K / Ctrl+K', 'Open command palette'],
    ['Enter',        'Send message'],
    ['Shift+Enter',  'New line in input'],
    ['Escape',       'Close modals / palette'],
    ['⌘/',          'Focus search bar'],
    ['⌘↑',          'Scroll to top'],
  ];
  modal.innerHTML = `<div style="background:var(--surface);border:1px solid var(--border);border-radius:16px;padding:28px 32px;min-width:380px;box-shadow:var(--shadow)">
    <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
      <h3 style="font-family:var(--font-display);font-size:20px;color:var(--text)">Keyboard Shortcuts</h3>
      <button onclick="this.closest('div[style]').remove()" style="background:var(--surface2);border:1px solid var(--border);border-radius:50%;width:28px;height:28px;cursor:pointer;color:var(--text-muted);font-size:13px;display:flex;align-items:center;justify-content:center">✕</button>
    </div>
    ${shortcuts.map(([k,d])=>`<div style="display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid var(--border);font-size:13px">
      <span style="color:var(--text-muted)">${d}</span>
      <kbd style="padding:3px 10px;border-radius:6px;border:1px solid var(--border);background:var(--surface2);color:var(--text);font-size:11px">${k}</kbd>
    </div>`).join('')}
  </div>`;
  document.body.appendChild(modal);
  modal.addEventListener('click', e => { if (e.target === modal) modal.remove(); });
}

// ── CHAT CONTROLS ──────────────────────────────────────

function clearChat() {
  if (!DOM.chatArea) return;
  State.chatHistory = [];
  State.activeTemplate = null;
  DOM.chatArea.innerHTML = '';

  // Re-show hero
  const hero = document.querySelector('.hero-section');
  if (hero) {
    hero.style.display = '';
    requestAnimationFrame(() => {
      hero.style.transition = 'all .4s ease';
      hero.style.opacity = '1';
      hero.style.transform = 'translateY(0)';
    });
  }

  renderSuggestions();
  showToast('Workspace cleared', 'info');
}

function renderSuggestions() {
  if (!DOM.chatArea) return;
  $('suggestionsRow')?.remove();

  const row = document.createElement('div');
  row.id = 'suggestionsRow';
  row.style.cssText = `display:flex;flex-wrap:wrap;gap:8px;margin-bottom:20px;animation:fadeUp .4s ease both`;

  AI.suggestions.forEach(s => {
    const btn = document.createElement('button');
    btn.textContent = s;
    btn.style.cssText = `padding:7px 14px;border-radius:20px;border:1px solid var(--border);background:var(--surface2);color:var(--text-muted);font-family:var(--font-body);font-size:12px;cursor:pointer;transition:all .2s`;
    btn.addEventListener('mouseenter', () => { btn.style.borderColor = 'var(--border-hover)'; btn.style.color = 'var(--text)'; });
    btn.addEventListener('mouseleave', () => { btn.style.borderColor = 'var(--border)'; btn.style.color = 'var(--text-muted)'; });
    btn.addEventListener('click', () => sendMessage(s));
    row.appendChild(btn);
  });

  DOM.chatArea.appendChild(row);
}

// ── SESSION BADGE ──────────────────────────────────────

function updateSessionBadge() {
  let badge = $('sessionBadge');
  if (!badge) {
    badge = document.createElement('div');
    badge.id = 'sessionBadge';
    badge.style.cssText = `display:inline-flex;align-items:center;gap:6px;padding:4px 10px;border-radius:20px;background:var(--surface2);border:1px solid var(--border);font-size:11px;color:var(--text-dim);margin-left:12px`;
    const breadcrumb = document.querySelector('.breadcrumb');
    breadcrumb?.appendChild(badge);
  }
  const secs = Math.floor((Date.now() - State.stats.sessionStart) / 1000);
  const mins = Math.floor(secs / 60);
  badge.innerHTML = `<span style="width:5px;height:5px;border-radius:50%;background:var(--green);animation:blink 2s infinite"></span>Session ${SESSION_ID} · ${State.stats.generated} generated`;
}

// ── TEXTAREA AUTO-RESIZE ───────────────────────────────

function autoResize(ta) {
  ta.style.height = 'auto';
  ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
}

// ── PROFILE / LOGIN ────────────────────────────────────

function handleLogin() {
  const email = DOM.loginEmail?.value.trim();
  const pass  = DOM.loginPass?.value;
  if (!email || !pass) { showToast('Please fill in all fields', 'warn'); return; }
  if (!email.includes('@')) { showToast('Enter a valid email', 'error'); return; }
  State.user = { email, name: email.split('@')[0] };
  localStorage.setItem('lp_user', JSON.stringify(State.user));
  closeModal('loginModal');
  updateProfileDisplay();
  showToast(`Welcome back, ${State.user.name}!`, 'success');
}

function updateProfileDisplay() {
  const span = document.querySelector('.btn-profile span');
  if (span && State.user) span.textContent = State.user.name;
  const img = document.querySelector('.btn-profile img');
  if (img && State.user) {
    img.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(State.user.name)}&background=c9a84c&color=0a0b0f`;
  }
  const loginBtn = DOM.openLogin;
  if (loginBtn && State.user) {
    loginBtn.textContent = State.user.name.charAt(0).toUpperCase() + State.user.name.slice(1);
  }
}

function handleFeedback() {
  const text = DOM.feedbackText?.value.trim();
  if (!text) { showToast('Please write something first', 'warn'); return; }
  console.log('[LaunchPad Feedback]', { text, sessionId: SESSION_ID, ts: new Date().toISOString() });
  if (DOM.feedbackText) DOM.feedbackText.value = '';
  closeModal('feedbackModal');
  showToast('Feedback received — thank you! 🙌', 'success');
}

// ── NAV ACTIVE STATE ───────────────────────────────────

function initNav() {
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const label = this.textContent.trim();
      if (label.includes('New Project')) clearChat();
      if (label.includes('Settings'))    showToast('Settings coming soon', 'info');
      if (label.includes('Library'))     showToast('Library coming soon', 'info');
    });
  });
}

// ── GLOBAL KEYBOARD SHORTCUTS ──────────────────────────

function initKeyboard() {
  document.addEventListener('keydown', e => {
    const ctrl = e.ctrlKey || e.metaKey;

    // ⌘K → Command palette
    if (ctrl && e.key === 'k') { e.preventDefault(); openCommandPalette(); return; }

    // ⌘/ → Focus search
    if (ctrl && e.key === '/') { e.preventDefault(); $('searchInput')?.focus(); return; }

    // ⌘↑ → Scroll to top
    if (ctrl && e.key === 'ArrowUp') { e.preventDefault(); document.querySelector('.content-scroll')?.scrollTo({ top: 0, behavior: 'smooth' }); return; }

    // ESC → Close anything open
    if (e.key === 'Escape') {
      document.querySelectorAll('.modal-overlay.open').forEach(m => m.classList.remove('open'));
      $('templateDetail')?.remove();
      if (State.commandOpen) return;
    }
  });
}

// ── CHIP BUTTON STYLES ─────────────────────────────────

function injectChipStyles() {
  if ($('chipStyles')) return;
  const style = document.createElement('style');
  style.id = 'chipStyles';
  style.textContent = `
    @keyframes blink { 0%,49%{opacity:1} 50%,100%{opacity:0} }
    .chip-btn, .chip-copy {
      padding: 6px 13px; border-radius: 20px; border: 1px solid;
      font-family: var(--font-body); font-size: 12px; font-weight: 600;
      cursor: pointer; transition: all .2s; display: inline-flex; align-items: center; gap: 5px;
    }
    .chip-btn {
      background: color-mix(in srgb, var(--chip-c) 15%, transparent);
      border-color: color-mix(in srgb, var(--chip-c) 35%, transparent);
      color: var(--chip-c);
    }
    .chip-btn:hover { background: color-mix(in srgb, var(--chip-c) 25%, transparent); transform: translateY(-1px); }
    .chip-copy { background: rgba(255,255,255,0.04); border-color: var(--border); color: var(--text-muted); }
    .chip-copy:hover { border-color: var(--border-hover); color: var(--text); }
  `;
  document.head.appendChild(style);
}

// ── EXPOSE OPENDETAIL TO TEMPLATES.JS ─────────────────

function bridgeTemplatesJS() {
  // templates.js calls window._openTemplateDetail(t) — we expose it here
  // It was previously openTemplateDetail in templates.js; the export name is _openTemplateDetail
  if (!window._openTemplateDetail) {
    // Lazy-load from templates.js via dynamic import
    import('./templates.js').then(mod => {
      if (mod.openTemplateDetail) {
        window._openTemplateDetail = mod.openTemplateDetail;
      }
    }).catch(() => {
      // If openTemplateDetail isn't exported, fall back gracefully
      window._openTemplateDetail = (t) => {
        showToast(`${t.icon} ${t.title} — upgrade templates.js to enable full detail view`, 'info');
      };
    });
  }
}

// ── INIT ───────────────────────────────────────────────

function init() {
  injectChipStyles();
  bridgeTemplatesJS();

  // Nav
  initNav();

  // Keyboard
  initKeyboard();

  // Templates
  renderSearchBar();
  renderCategoryBar();
  renderTemplates();
  renderHistory();

  // Suggestion chips on empty chat
  renderSuggestions();

  // Session badge
  updateSessionBadge();

  // Restore user
  if (State.user) updateProfileDisplay();

  // Textarea
  if (DOM.promptInput) {
    DOM.promptInput.addEventListener('input', () => autoResize(DOM.promptInput));
    DOM.promptInput.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
  }

  // Send button
  DOM.generateBtn?.addEventListener('click', () => sendMessage());

  // Modals
  DOM.openFeedback?.addEventListener('click', () => openModal('feedbackModal'));
  DOM.openLogin?.addEventListener('click',    () => {
    if (State.user) { showToast(`Signed in as ${State.user.email}`, 'info'); return; }
    openModal('loginModal');
  });
  DOM.submitFeedback?.addEventListener('click', handleFeedback);
  DOM.loginSubmit?.addEventListener('click', handleLogin);

  // Press Enter in login fields
  DOM.loginPass?.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });

  // Profile button
  document.querySelector('.btn-profile')?.addEventListener('click', () => {
    if (State.user) {
      showToast(`${State.user.email} · Session ${SESSION_ID}`, 'info');
    } else {
      openModal('loginModal');
    }
  });

  // Expose for console debugging
  window.LaunchPad = { State, moduleTemplates, sendMessage, showToast, openCommandPalette, clearChat, renderTemplates, BUILD_VER, SESSION_ID };

  console.log(`%c🚀 LaunchPad v${BUILD_VER} · Session ${SESSION_ID}`, 'color:#c9a84c;font-weight:700;font-size:13px');
  console.log('%cwindow.LaunchPad — full API available in console', 'color:#7a7d8a;font-size:11px');
}

// ── BOOT ───────────────────────────────────────────────

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}