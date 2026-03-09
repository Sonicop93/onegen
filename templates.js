// ─────────────────────────────────────────────
//  LaunchPad — templates.js
//  32 blueprints · Mind Maps · Live Previews
// ─────────────────────────────────────────────

// ── TEMPLATE DATA ─────────────────────────────

export const moduleTemplates = [
  { id:'ai-saas',      title:'AI SaaS Platform',      icon:'🧠', category:'AI / ML',       tag:'AI',          color:'#a78bfa', glow:'rgba(167,139,250,0.13)', description:'Neural-powered multi-tenant app with model orchestration.',       flow:'Frontend ➔ API Gateway ➔ AI Orchestrator ➔ Vector DB',           blocks:['Auth Service','Usage Billing','Model Controller','Knowledge Graph'],  previewType:'dashboard', mindMap:{ center:'AI SaaS', branches:[{label:'Frontend',children:['React App','Dashboard','Usage Charts']},{label:'API',children:['Gateway','Rate Limiter','Versioning']},{label:'AI Engine',children:['Orchestrator','Model Router','Embeddings']},{label:'Storage',children:['Vector DB','Redis Cache','S3 Assets']}]}},
  { id:'fintech',      title:'FinTech Dashboard',      icon:'💳', category:'Finance',        tag:'Finance',     color:'#34d399', glow:'rgba(52,211,153,0.13)',  description:'Secure digital banking ecosystem with real-time ledger.',        flow:'Client ➔ Encryption Layer ➔ Ledger Engine ➔ Cold Storage',        blocks:['KYC Portal','Fraud Monitor','Transaction API','Audit Logs'],        previewType:'dashboard', mindMap:{ center:'FinTech', branches:[{label:'Security',children:['Encryption','2FA','Biometrics']},{label:'Payments',children:['Ledger','Settlements','FX']},{label:'Compliance',children:['KYC','AML','Reports']},{label:'Storage',children:['Cold Wallet','Hot Wallet','Audit DB']}]}},
  { id:'ecommerce',    title:'E-Commerce Store',       icon:'🛒', category:'Commerce',       tag:'Retail',      color:'#fb923c', glow:'rgba(251,146,60,0.13)',  description:'Scalable retail architecture with real-time inventory.',         flow:'User ➔ Load Balancer ➔ Product Service ➔ SQL DB',                 blocks:['Cart Logic','Stripe Bridge','Inventory Worker','Global Search'],     previewType:'commerce', mindMap:{ center:'E-Commerce', branches:[{label:'Catalog',children:['Products','Categories','Search']},{label:'Cart',children:['Session','Wishlist','Checkout']},{label:'Payments',children:['Stripe','PayPal','Crypto']},{label:'Ops',children:['Inventory','Shipping','Returns']}]}},
  { id:'iot-hub',      title:'IoT Control Hub',        icon:'📡', category:'IoT',            tag:'IoT',         color:'#22d3ee', glow:'rgba(34,211,238,0.13)',  description:'Real-time device orchestration with edge computing.',            flow:'Hardware ➔ MQTT Broker ➔ Analytics Engine ➔ Dashboard',           blocks:['Device Registry','Alert Worker','Time-series DB','OTA Manager'],    previewType:'terminal', mindMap:{ center:'IoT Hub', branches:[{label:'Devices',children:['Sensors','Actuators','Edge Nodes']},{label:'Broker',children:['MQTT','WebSocket','Protocols']},{label:'Analytics',children:['Stream Processor','Anomaly Detect','ML Models']},{label:'Ops',children:['OTA Updates','Fleet Mgmt','Alerts']}]}},
  { id:'healthcare',   title:'Healthcare Portal',      icon:'🏥', category:'Health',         tag:'MedTech',     color:'#f472b6', glow:'rgba(244,114,182,0.13)', description:'HIPAA-compliant patient management with EHR integration.',       flow:'Patient App ➔ HL7 Gateway ➔ EHR Engine ➔ FHIR Store',            blocks:['Patient Auth','Appointment API','EHR Adapter','Billing Engine'],    previewType:'dashboard', mindMap:{ center:'Healthcare', branches:[{label:'Patients',children:['Portal','Records','Appointments']},{label:'Clinical',children:['EHR','Lab Results','Imaging']},{label:'Billing',children:['Insurance','Claims','Payments']},{label:'Compliance',children:['HIPAA','Audit Log','Encryption']}]}},
  { id:'edtech',       title:'EdTech Platform',        icon:'🎓', category:'Education',      tag:'Edu',         color:'#fbbf24', glow:'rgba(251,191,36,0.13)',  description:'Adaptive learning platform with AI-driven curriculum.',          flow:'Learner ➔ LMS Core ➔ AI Tutor ➔ Progress DB',                    blocks:['Course Builder','Quiz Engine','AI Mentor','Certificate API'],       previewType:'platform', mindMap:{ center:'EdTech', branches:[{label:'Content',children:['Courses','Videos','Quizzes']},{label:'AI Tutor',children:['Adaptive Path','Hints','Assessment']},{label:'Social',children:['Forums','Study Groups','Leaderboard']},{label:'Admin',children:['Analytics','Certificates','Payments']}]}},
  { id:'social',       title:'Social Network',         icon:'🌐', category:'Social',         tag:'Social',      color:'#60a5fa', glow:'rgba(96,165,250,0.13)',  description:'Scalable social graph with real-time feed and stories.',          flow:'Client ➔ GraphQL API ➔ Feed Engine ➔ Media CDN',                  blocks:['Graph DB','Feed Algorithm','Media Processor','Push Service'],       previewType:'social', mindMap:{ center:'Social', branches:[{label:'Content',children:['Posts','Stories','Reels']},{label:'Graph',children:['Friends','Follow','Groups']},{label:'Messaging',children:['DMs','Group Chat','Calls']},{label:'Monetize',children:['Ads','Creator Fund','Shop']}]}},
  { id:'devops',       title:'DevOps Pipeline',        icon:'⚙️', category:'Cloud / DevOps', tag:'DevOps',      color:'#94a3b8', glow:'rgba(148,163,184,0.13)', description:'CI/CD pipeline with container orchestration and observability.',  flow:'Git Push ➔ CI Runner ➔ Docker Build ➔ K8s Cluster',               blocks:['Pipeline YAML','Registry','Helm Charts','Grafana Stack'],           previewType:'terminal', mindMap:{ center:'DevOps', branches:[{label:'CI',children:['Git Hooks','Test Runner','SAST']},{label:'CD',children:['Docker Build','Push Image','Deploy']},{label:'Infra',children:['Terraform','Helm','K8s']},{label:'Observe',children:['Prometheus','Grafana','Alerts']}]}},
  { id:'gaming',       title:'Gaming Platform',        icon:'🎮', category:'Gaming',         tag:'Game',        color:'#f43f5e', glow:'rgba(244,63,94,0.13)',   description:'Multiplayer gaming backend with matchmaking and leaderboards.',   flow:'Client ➔ Game Server ➔ Match Engine ➔ Leaderboard DB',            blocks:['Auth & Sessions','Match Maker','State Sync','Anti-Cheat'],          previewType:'platform', mindMap:{ center:'Gaming', branches:[{label:'Gameplay',children:['Game Server','State Sync','Physics']},{label:'Social',children:['Friends','Clans','Chat']},{label:'Economy',children:['Store','In-App','NFT Items']},{label:'Meta',children:['Achievements','Leaderboard','Seasons']}]}},
  { id:'realestate',   title:'Real Estate App',        icon:'🏘️', category:'PropTech',       tag:'PropTech',    color:'#a3e635', glow:'rgba(163,230,53,0.13)',  description:'Property listing platform with virtual tours and CRM.',           flow:'User ➔ Search API ➔ Listing Engine ➔ Geo DB',                    blocks:['MLS Sync','Map Service','Virtual Tour','Lead CRM'],                 previewType:'commerce', mindMap:{ center:'Real Estate', branches:[{label:'Listings',children:['Properties','Photos','Virtual Tour']},{label:'Search',children:['Geo Filter','Price Range','AI Match']},{label:'Transactions',children:['Offers','Docs','Escrow']},{label:'Agents',children:['CRM','Leads','Commission']}]}},
  { id:'hrtech',       title:'HR & Recruiting',        icon:'👥', category:'HRTech',         tag:'HR',          color:'#e879f9', glow:'rgba(232,121,249,0.13)', description:'End-to-end talent acquisition with AI resume screening.',         flow:'Candidate ➔ ATS ➔ AI Screener ➔ HRIS',                           blocks:['Job Board','Resume Parser','Interview Bot','Onboarding Flow'],      previewType:'dashboard', mindMap:{ center:'HR Tech', branches:[{label:'Acquire',children:['Job Posts','ATS','Sourcing']},{label:'Screen',children:['Resume AI','Video Int.','Assessments']},{label:'Hire',children:['Offer Mgmt','BGCheck','Onboarding']},{label:'Retain',children:['Perf Reviews','L&D','Payroll']}]}},
  { id:'analytics',    title:'Analytics Dashboard',    icon:'📊', category:'Data',           tag:'Data',        color:'#38bdf8', glow:'rgba(56,189,248,0.13)',  description:'Real-time BI platform with self-serve queries and AI insights.',  flow:'Data Sources ➔ ETL Pipeline ➔ Query Engine ➔ Viz Layer',          blocks:['Connector Hub','dbt Models','Cube.js Cache','Chart Builder'],       previewType:'dashboard', mindMap:{ center:'Analytics', branches:[{label:'Ingest',children:['Connectors','CDC','Webhooks']},{label:'Transform',children:['dbt','Spark','SQL Engine']},{label:'Serve',children:['Cache','API','Exports']},{label:'Viz',children:['Charts','Dashboards','Alerts']}]}},
  { id:'logistics',    title:'Logistics Tracker',      icon:'🚚', category:'Logistics',      tag:'Logistics',   color:'#fb923c', glow:'rgba(251,146,60,0.13)',  description:'Last-mile delivery platform with live GPS and route optimization.',flow:'Order ➔ Dispatch API ➔ Route Engine ➔ Driver App',                blocks:['Order API','Route Optimizer','GPS Stream','Proof of Delivery'],     previewType:'dashboard', mindMap:{ center:'Logistics', branches:[{label:'Orders',children:['Intake','Dispatch','SLA']},{label:'Routing',children:['Optimizer','ETA','Traffic']},{label:'Fleet',children:['Driver App','GPS','Telemetry']},{label:'Ops',children:['POD','Returns','Analytics']}]}},
  { id:'crm',          title:'CRM System',             icon:'🤝', category:'Sales',          tag:'CRM',         color:'#34d399', glow:'rgba(52,211,153,0.13)',  description:'AI-powered CRM with pipeline forecasting and deal intelligence.',  flow:'Lead ➔ CRM Core ➔ AI Scorer ➔ Integration Hub',                  blocks:['Contact Graph','Deal Pipeline','Email Sequence','Forecast Engine'],  previewType:'dashboard', mindMap:{ center:'CRM', branches:[{label:'Contacts',children:['Leads','Accounts','Segments']},{label:'Pipeline',children:['Deals','Stages','Forecast']},{label:'Engage',children:['Email','Calls','Meetings']},{label:'Analyze',children:['Reports','AI Score','ROI']}]}},
  { id:'security',     title:'Security Platform',      icon:'🔐', category:'Cybersecurity',  tag:'SecOps',      color:'#f87171', glow:'rgba(248,113,113,0.13)', description:'Zero-trust SOC platform with SIEM, threat intel, and auto-response.',flow:'Telemetry ➔ SIEM Ingestion ➔ Threat Engine ➔ Response',          blocks:['Log Aggregator','UEBA Engine','Playbook Runner','SOAR Actions'],     previewType:'terminal', mindMap:{ center:'SecOps', branches:[{label:'Detect',children:['SIEM','EDR','NDR']},{label:'Analyze',children:['UEBA','Threat Intel','ML Models']},{label:'Respond',children:['Playbooks','SOAR','Quarantine']},{label:'Report',children:['Dashboards','Compliance','Forensics']}]}},
  { id:'food',         title:'Food Delivery App',      icon:'🍔', category:'On-Demand',      tag:'FoodTech',    color:'#fbbf24', glow:'rgba(251,191,36,0.13)',  description:'Hyperlocal food delivery with dynamic pricing and kitchen ops.',   flow:'Customer App ➔ Order API ➔ Kitchen Display ➔ Delivery Agent',     blocks:['Menu Engine','Dynamic Pricing','KDS System','Driver Dispatch'],     previewType:'commerce', mindMap:{ center:'Food Delivery', branches:[{label:'Customer',children:['Browse','Order','Track']},{label:'Restaurant',children:['Menu','KDS','Acceptance']},{label:'Delivery',children:['Dispatch','GPS','ETL']},{label:'Payments',children:['Checkout','Wallet','Refunds']}]}},
  { id:'streaming',    title:'Video Streaming',        icon:'🎬', category:'Media',          tag:'Media',       color:'#f43f5e', glow:'rgba(244,63,94,0.13)',   description:'Netflix-scale VOD platform with adaptive bitrate and CDN.',       flow:'Uploader ➔ Transcoder ➔ CDN Edge ➔ Player SDK',                  blocks:['Ingest Pipeline','FFmpeg Workers','Edge Cache','DRM Layer'],         previewType:'platform', mindMap:{ center:'Streaming', branches:[{label:'Content',children:['Upload','Transcode','DRM']},{label:'Delivery',children:['CDN','Adaptive BR','Offline']},{label:'Discovery',children:['Rec Engine','Search','Trending']},{label:'Monetize',children:['Subscription','Ads','Pay-per-View']}]}},
  { id:'crypto',       title:'Crypto Exchange',        icon:'₿',  category:'Blockchain',     tag:'Web3',        color:'#f59e0b', glow:'rgba(245,158,11,0.13)',  description:'CEX with order book matching engine and cold wallet custody.',     flow:'Trader ➔ Matching Engine ➔ Settlement ➔ Custodian',              blocks:['Order Book','Matching Core','Risk Engine','Custody API'],            previewType:'terminal', mindMap:{ center:'Exchange', branches:[{label:'Trading',children:['Order Book','Matching','APIs']},{label:'Wallet',children:['Hot Wallet','Cold Storage','MPC']},{label:'Risk',children:['Margin','Liquidation','Insurance']},{label:'Compliance',children:['KYC','AML','Travel Rule']}]}},
  { id:'projectmgmt',  title:'Project Management',     icon:'📋', category:'Productivity',   tag:'Productivity',color:'#818cf8', glow:'rgba(129,140,248,0.13)', description:'Kanban-first PM tool with AI sprint planning and burndown.',        flow:'User ➔ Task API ➔ AI Planner ➔ Notification Hub',                blocks:['Board Engine','Sprint AI','Time Tracker','Gantt Renderer'],         previewType:'dashboard', mindMap:{ center:'Project Mgmt', branches:[{label:'Planning',children:['Roadmap','Sprints','Backlog']},{label:'Track',children:['Kanban','Timeline','Reports']},{label:'Collaborate',children:['Comments','Docs','Calls']},{label:'Automate',children:['AI Planner','Rules','Integrations']}]}},
  { id:'travel',       title:'Travel Booking',         icon:'✈️', category:'Travel',         tag:'TravelTech',  color:'#22d3ee', glow:'rgba(34,211,238,0.13)',  description:'Multi-modal travel platform with dynamic packaging engine.',       flow:'Search ➔ GDS Aggregator ➔ Pricing Engine ➔ Booking DB',           blocks:['GDS Connector','Price Engine','Booking Flow','Loyalty API'],        previewType:'platform', mindMap:{ center:'Travel', branches:[{label:'Search',children:['Flights','Hotels','Cars']},{label:'Pricing',children:['Dynamic Rate','GDS','Cache']},{label:'Book',children:['PNR','Payments','E-Ticket']},{label:'Post-Trip',children:['Loyalty','Manage','Support']}]}},
  { id:'events',       title:'Event Platform',         icon:'🎪', category:'Events',         tag:'Events',      color:'#c084fc', glow:'rgba(192,132,252,0.13)', description:'Hybrid event platform with ticketing, streaming, and networking.',   flow:'Organizer ➔ Event Engine ➔ Ticket API ➔ Attendee App',           blocks:['Ticket Engine','Seating Map','Stream Hub','Networking Graph'],      previewType:'platform', mindMap:{ center:'Events', branches:[{label:'Organizer',children:['Builder','Speakers','Sponsors']},{label:'Ticketing',children:['Sales','QR','Waitlist']},{label:'Experience',children:['Live Stream','Q&A','Polls']},{label:'Network',children:['Matchmaking','Chat','1:1 Meetings']}]}},
  { id:'news',         title:'News Aggregator',        icon:'📰', category:'Media',          tag:'Media',       color:'#94a3b8', glow:'rgba(148,163,184,0.13)', description:'AI-curated news platform with personalisation and fact-checking.',   flow:'Sources ➔ NLP Ingestion ➔ Rank Engine ➔ Feed API',               blocks:['RSS Crawler','NLP Parser','Bias Detector','Personalise Engine'],    previewType:'social', mindMap:{ center:'News', branches:[{label:'Ingest',children:['RSS','Scrapers','APIs']},{label:'Process',children:['NLP','Classification','Fact Check']},{label:'Rank',children:['Personalize','Trending','Editor Pick']},{label:'Deliver',children:['Web Feed','Newsletter','Notifications']}]}},
  { id:'fitness',      title:'Fitness Tracker',        icon:'🏋️', category:'Health',         tag:'FitTech',     color:'#4ade80', glow:'rgba(74,222,128,0.13)',  description:'Wearable-integrated fitness app with AI coach and nutrition.',      flow:'Wearable ➔ Health API ➔ AI Coach ➔ Progress Store',              blocks:['Wearable SDK','Activity Engine','Nutrition AI','Goals API'],        previewType:'dashboard', mindMap:{ center:'Fitness', branches:[{label:'Activity',children:['Workouts','Steps','Sleep']},{label:'Nutrition',children:['Meal Log','Macros','AI Recs']},{label:'Coach',children:['Plans','Adaptive','Form Check']},{label:'Social',children:['Challenges','Leaderboard','Friends']}]}},
  { id:'smarthome',    title:'Smart Home Hub',         icon:'🏠', category:'IoT',            tag:'SmartHome',   color:'#f59e0b', glow:'rgba(245,158,11,0.13)',  description:'Matter-compatible home automation with scene and energy control.',  flow:'Devices ➔ Matter Bridge ➔ Scene Engine ➔ Voice Skill',           blocks:['Device Mesh','Automation Rules','Energy Monitor','Voice Bridge'],    previewType:'dashboard', mindMap:{ center:'Smart Home', branches:[{label:'Devices',children:['Lights','Locks','Thermostat']},{label:'Automate',children:['Scenes','Schedules','Triggers']},{label:'Energy',children:['Monitor','Solar','EV Charging']},{label:'Secure',children:['Cameras','Alerts','E2E Encrypt']}]}},
  { id:'legaltech',    title:'Legal Tech Platform',    icon:'⚖️', category:'LegalTech',      tag:'LegalTech',   color:'#a78bfa', glow:'rgba(167,139,250,0.13)', description:'AI contract review, e-signature, and matter management platform.',   flow:'Upload ➔ AI Review ➔ eSign Engine ➔ Matter DB',                  blocks:['Contract AI','Clause Library','eSign API','Billing Tracker'],       previewType:'dashboard', mindMap:{ center:'LegalTech', branches:[{label:'Contracts',children:['AI Review','Redline','Clauses']},{label:'eSign',children:['Workflow','Audit Trail','DocuSign']},{label:'Matters',children:['Cases','Time Track','Billing']},{label:'Research',children:['Case Law AI','Citations','Memos']}]}},
  { id:'supplychain',  title:'Supply Chain Manager',   icon:'🏭', category:'Operations',     tag:'OpsTech',     color:'#34d399', glow:'rgba(52,211,153,0.13)',  description:'End-to-end supply chain visibility with demand forecasting AI.',    flow:'Supplier ➔ Procurement API ➔ WMS ➔ Distribution Engine',          blocks:['Supplier Portal','Demand AI','WMS Core','Track & Trace'],           previewType:'dashboard', mindMap:{ center:'Supply Chain', branches:[{label:'Procure',children:['Suppliers','POs','Contracts']},{label:'Warehouse',children:['WMS','Picking','Packing']},{label:'Transport',children:['Carriers','Track','Last Mile']},{label:'Forecast',children:['Demand AI','Safety Stock','Replenish']}]}},
  { id:'email-mktg',   title:'Email Marketing',        icon:'📧', category:'MarTech',        tag:'MarTech',     color:'#fb923c', glow:'rgba(251,146,60,0.13)',  description:'AI-powered email platform with segmentation and deliverability.',   flow:'Audience ➔ Segmentation Engine ➔ Render Engine ➔ SMTP Relay',    blocks:['List Manager','AI Copywriter','A/B Engine','Deliverability API'],   previewType:'dashboard', mindMap:{ center:'Email Marketing', branches:[{label:'Audience',children:['Segments','Tags','Sync']},{label:'Create',children:['Templates','AI Copy','Personalise']},{label:'Send',children:['Schedule','A/B Test','SMTP']},{label:'Analyze',children:['Opens','Clicks','Revenue']}]}},
  { id:'cloud-storage',title:'Cloud Storage',          icon:'☁️', category:'Cloud / DevOps', tag:'Cloud',       color:'#60a5fa', glow:'rgba(96,165,250,0.13)',  description:'S3-compatible object storage with deduplication and encryption.',   flow:'Client SDK ➔ API Gateway ➔ Object Store ➔ Replication Engine',   blocks:['Multipart Upload','Dedup Engine','AES Encryption','CDN Proxy'],     previewType:'terminal', mindMap:{ center:'Cloud Storage', branches:[{label:'Ingest',children:['SDK','Multipart','Chunking']},{label:'Store',children:['Object Store','Dedup','Versioning']},{label:'Security',children:['Encryption','IAM','Audit']},{label:'Deliver',children:['CDN','Presigned URLs','Streaming']}]}},
  { id:'rideshare',    title:'Ride Sharing App',       icon:'🚗', category:'On-Demand',      tag:'Mobility',    color:'#22d3ee', glow:'rgba(34,211,238,0.13)',  description:'Two-sided mobility marketplace with surge pricing and ETA AI.',     flow:'Rider App ➔ Match Engine ➔ Surge Pricer ➔ Driver App',           blocks:['Geo Matcher','Dynamic Pricing','Payment Split','Rating System'],     previewType:'platform', mindMap:{ center:'Ride Share', branches:[{label:'Rider',children:['Book','Track','Rate']},{label:'Driver',children:['Accept','Nav','Earnings']},{label:'Pricing',children:['Surge','Base Rate','Promo']},{label:'Ops',children:['Dispatch','Support','Safety']}]}},
  { id:'nft',          title:'NFT Marketplace',        icon:'🖼️', category:'Blockchain',     tag:'Web3',        color:'#e879f9', glow:'rgba(232,121,249,0.13)', description:'Multi-chain NFT marketplace with lazy minting and royalties.',       flow:'Creator ➔ Minting Engine ➔ Smart Contract ➔ IPFS Store',          blocks:['Lazy Minting','Royalty Engine','Auction House','Chain Bridge'],     previewType:'commerce', mindMap:{ center:'NFT Market', branches:[{label:'Create',children:['Mint','Lazy Mint','Collections']},{label:'Trade',children:['Fixed Price','Auction','Offers']},{label:'Chain',children:['ETH','Polygon','Solana']},{label:'Storage',children:['IPFS','Metadata','Provenance']}]}},
  { id:'chatbot',      title:'AI Chatbot Builder',     icon:'🤖', category:'AI / ML',        tag:'AI',          color:'#a78bfa', glow:'rgba(167,139,250,0.13)', description:'No-code conversational AI builder with RAG and multi-channel.',      flow:'Prompt Studio ➔ RAG Pipeline ➔ LLM Router ➔ Channel API',        blocks:['Prompt IDE','Knowledge Base','LLM Router','Omnichannel Hub'],       previewType:'platform', mindMap:{ center:'Chatbot', branches:[{label:'Build',children:['Prompt IDE','Personas','Flows']},{label:'Knowledge',children:['RAG','Embeddings','Sync']},{label:'Route',children:['LLM Router','Fallback','Escalate']},{label:'Deploy',children:['Web Widget','WhatsApp','Slack']}]}},
  { id:'restaurant',   title:'Restaurant POS',         icon:'🍽️', category:'Commerce',       tag:'FoodTech',    color:'#fbbf24', glow:'rgba(251,191,36,0.13)',  description:'Cloud POS with table management, KDS, and menu engineering.',       flow:'Order Terminal ➔ POS Core ➔ KDS Display ➔ Kitchen Printer',      blocks:['Table Manager','Menu Engine','KDS System','Loyalty & Void'],        previewType:'dashboard', mindMap:{ center:'Restaurant POS', branches:[{label:'Front of House',children:['Tables','Orders','Split Bill']},{label:'Kitchen',children:['KDS','Ticket Queue','Timing']},{label:'Menu',children:['Builder','Modifiers','86 Item']},{label:'Reports',children:['Sales','Labour','Food Cost']}]}}
];

// ── PREVIEW HTML GENERATORS ───────────────────

const FONT = "font-family:'Segoe UI',sans-serif";

function dashboardPreview(t) {
  const c = t.color;
  return `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;${FONT}}
body{background:#0a0b0f;color:#f0ede8;height:100vh;display:flex;overflow:hidden;font-size:13px}
.sb{width:160px;background:#111318;border-right:1px solid rgba(255,255,255,0.07);padding:16px 12px;display:flex;flex-direction:column;gap:4px;flex-shrink:0}
.logo{font-size:14px;font-weight:700;color:${c};margin-bottom:16px;display:flex;align-items:center;gap:8px}
.nav{padding:8px 10px;border-radius:7px;color:#7a7d8a;font-size:12px;cursor:pointer;transition:.2s}
.nav.a,.nav:hover{background:rgba(255,255,255,0.06);color:${c}}
.main{flex:1;display:flex;flex-direction:column;overflow:hidden}
.topbar{padding:12px 20px;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;justify-content:space-between;align-items:center}
.topbar h2{font-size:16px;font-weight:600}
.btn{padding:5px 14px;border-radius:7px;background:${c};color:#0a0b0f;font-size:11px;font-weight:700;border:none;cursor:pointer}
.scroll{flex:1;padding:16px;overflow:auto;display:flex;flex-direction:column;gap:12px}
.cards{display:grid;grid-template-columns:repeat(4,1fr);gap:10px}
.card{background:#111318;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:14px}
.card .val{font-size:22px;font-weight:700;color:${c};margin-bottom:4px}
.card .lbl{font-size:10px;color:#7a7d8a;text-transform:uppercase;letter-spacing:.06em}
.chart-area{background:#111318;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:16px;flex:1}
.chart-title{font-size:12px;font-weight:600;margin-bottom:12px;color:#7a7d8a;text-transform:uppercase;letter-spacing:.06em}
.bars{display:flex;align-items:flex-end;gap:8px;height:80px}
.bar{flex:1;border-radius:4px 4px 0 0;opacity:.8;animation:grow .6s ease both}
@keyframes grow{from{transform:scaleY(0);transform-origin:bottom}to{transform:scaleY(1)}}
.table-area{background:#111318;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:14px}
.tr{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;padding:7px 4px;border-bottom:1px solid rgba(255,255,255,0.04);font-size:11px;gap:8px}
.tr.hd{color:#7a7d8a;font-weight:600;text-transform:uppercase;letter-spacing:.05em}
.badge{display:inline-block;padding:2px 8px;border-radius:20px;font-size:10px;font-weight:600}
</style></head><body>
<div class="sb">
  <div class="logo">${t.icon} ${t.title.split(' ')[0]}</div>
  ${t.blocks.map((b,i)=>`<div class="nav${i===0?' a':''}">${b}</div>`).join('')}
</div>
<div class="main">
  <div class="topbar"><h2>${t.title}</h2><button class="btn">+ New</button></div>
  <div class="scroll">
    <div class="cards">
      <div class="card"><div class="val">2,841</div><div class="lbl">Total Users</div></div>
      <div class="card"><div class="val" style="color:#4ade80">94.2%</div><div class="lbl">Uptime</div></div>
      <div class="card"><div class="val" style="color:#fb923c">$18.4k</div><div class="lbl">Revenue</div></div>
      <div class="card"><div class="val" style="color:#60a5fa">143</div><div class="lbl">Active Now</div></div>
    </div>
    <div class="chart-area">
      <div class="chart-title">Activity · Last 7 Days</div>
      <div class="bars">
        ${[45,70,55,90,65,80,95].map((h,i)=>`<div class="bar" style="height:${h}%;background:${c};animation-delay:${i*0.08}s"></div>`).join('')}
      </div>
    </div>
    <div class="table-area">
      <div class="tr hd"><span>${t.blocks[0]}</span><span>Status</span><span>Score</span><span>Action</span></div>
      ${['Alpha Corp','Beta Labs','Gamma Inc'].map(n=>`<div class="tr"><span>${n}</span><span><span class="badge" style="background:rgba(74,222,128,0.15);color:#4ade80">Active</span></span><span style="color:${c}">${(Math.random()*40+60).toFixed(1)}</span><span style="color:#7a7d8a;cursor:pointer">View →</span></div>`).join('')}
    </div>
  </div>
</div>
</body></html>`;
}

function commercePreview(t) {
  const c = t.color;
  return `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;${FONT}}
body{background:#0d0f14;color:#f0ede8;height:100vh;display:flex;flex-direction:column;overflow:hidden;font-size:13px}
nav{padding:12px 24px;background:#111318;border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between}
.logo{font-size:16px;font-weight:700;color:${c};display:flex;align-items:center;gap:8px}
.nav-links{display:flex;gap:20px;font-size:12px;color:#7a7d8a}
.search{background:#181b22;border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:6px 16px;font-size:12px;color:#f0ede8;outline:none;width:200px}
.grid-wrap{flex:1;display:flex;overflow:hidden}
.filters{width:140px;padding:16px;border-right:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;gap:6px;flex-shrink:0}
.filter-label{font-size:10px;text-transform:uppercase;letter-spacing:.08em;color:#4a4d5a;font-weight:600;margin-top:8px}
.filter-item{font-size:11px;color:#7a7d8a;padding:5px 8px;border-radius:6px;cursor:pointer}
.filter-item.a{color:${c};background:rgba(255,255,255,0.05)}
.products{flex:1;padding:16px;overflow:auto}
.pgrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}
.pcard{background:#111318;border:1px solid rgba(255,255,255,0.07);border-radius:12px;overflow:hidden;cursor:pointer;transition:.25s}
.pcard:hover{border-color:${c};transform:translateY(-2px)}
.thumb{height:90px;display:flex;align-items:center;justify-content:center;font-size:36px}
.pinfo{padding:10px}
.ptitle{font-size:12px;font-weight:600;margin-bottom:4px}
.pprice{font-size:14px;font-weight:700;color:${c}}
.pbadge{font-size:10px;color:#7a7d8a;margin-top:2px}
.cart-btn{width:100%;margin-top:8px;padding:6px;border-radius:6px;background:${c};color:#0a0b0f;font-size:11px;font-weight:700;border:none;cursor:pointer}
</style></head><body>
<nav>
  <div class="logo">${t.icon} ${t.title}</div>
  <div class="nav-links"><span>Browse</span><span>Deals</span><span>Orders</span></div>
  <input class="search" placeholder="Search…">
</nav>
<div class="grid-wrap">
  <div class="filters">
    <div class="filter-label">Category</div>
    ${t.blocks.map((b,i)=>`<div class="filter-item${i===0?' a':''}">${b}</div>`).join('')}
    <div class="filter-label">Price</div>
    <div class="filter-item a">All</div>
    <div class="filter-item">Under $50</div>
    <div class="filter-item">$50–$200</div>
  </div>
  <div class="products">
    <div class="pgrid">
      ${[['🔷','Pro Plan','$49/mo','Most Popular'],['🔶','Starter','$19/mo','Best Value'],['💠','Enterprise','$199/mo','Full Suite'],['🌀','Add-on A','$9/mo','Flexible'],['⚡','Add-on B','$14/mo','Popular'],['🎯','Bundle','$89/mo','Save 30%']].map(([e,n,p,b])=>`<div class="pcard"><div class="thumb" style="background:#181b22">${e}</div><div class="pinfo"><div class="ptitle">${n}</div><div class="pprice">${p}</div><div class="pbadge">${b}</div><button class="cart-btn">Add to Cart</button></div></div>`).join('')}
    </div>
  </div>
</div>
</body></html>`;
}

function socialPreview(t) {
  const c = t.color;
  return `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;${FONT}}
body{background:#0a0b0f;color:#f0ede8;height:100vh;display:flex;overflow:hidden;font-size:13px}
.left{width:180px;padding:16px;border-right:1px solid rgba(255,255,255,0.07);display:flex;flex-direction:column;gap:4px}
.logo{font-size:15px;font-weight:700;color:${c};margin-bottom:12px}
.ni{display:flex;align-items:center;gap:8px;padding:8px 10px;border-radius:8px;color:#7a7d8a;font-size:12px;cursor:pointer}
.ni.a,.ni:hover{background:rgba(255,255,255,0.05);color:${c}}
.feed{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:12px;max-width:520px}
.post{background:#111318;border:1px solid rgba(255,255,255,0.07);border-radius:12px;padding:14px}
.post-head{display:flex;align-items:center;gap:10px;margin-bottom:10px}
.avatar{width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;font-weight:700;flex-shrink:0}
.post-meta .name{font-size:13px;font-weight:600}
.post-meta .time{font-size:11px;color:#7a7d8a}
.post-body{font-size:12.5px;line-height:1.6;color:#c4c0bc;margin-bottom:10px}
.post-img{border-radius:8px;background:#181b22;height:80px;display:flex;align-items:center;justify-content:center;font-size:32px;margin-bottom:10px}
.actions{display:flex;gap:16px;font-size:11px;color:#7a7d8a}
.actions span{cursor:pointer;display:flex;align-items:center;gap:4px}
.actions span:hover{color:${c}}
.right{width:200px;padding:16px;border-left:1px solid rgba(255,255,255,0.07)}
.widget{background:#111318;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:12px;margin-bottom:10px}
.w-title{font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.07em;color:#7a7d8a;margin-bottom:8px}
.trend{font-size:12px;padding:5px 0;border-bottom:1px solid rgba(255,255,255,0.04);color:#c4c0bc}
.trend span{color:${c};font-weight:600}
</style></head><body>
<div class="left">
  <div class="logo">${t.icon} ${t.title.split(' ')[0]}</div>
  ${['Home','Explore','Notifications','Messages','Profile'].map((l,i)=>`<div class="ni${i===0?' a':''}">${['🏠','🔍','🔔','💬','👤'][i]} ${l}</div>`).join('')}
</div>
<div class="feed">
  ${[['🌟','Alex R.','2m ago','Just shipped the new ${t.blocks[0]} module. The performance gains are insane — 10× faster than v1.','🚀'],['💡','Priya M.','15m ago','Hot take: the future of ${t.tag} is edge-native. Thread 🧵','💡'],['🔥','James K.','1h ago','Our team crossed 10k users today! Thank you everyone who believed in us 🙌','🎉']].map(([e,n,ti,body,emoji])=>`<div class="post"><div class="post-head"><div class="avatar" style="background:${c}22;color:${c}">${e}</div><div class="post-meta"><div class="name">${n}</div><div class="time">${ti}</div></div></div><div class="post-body">${body.replace('${t.blocks[0]}',t.blocks[0]).replace('${t.tag}',t.tag)}</div><div class="post-img">${emoji}</div><div class="actions"><span>❤️ 142</span><span>💬 38</span><span>🔁 21</span></div></div>`).join('')}
</div>
<div class="right">
  <div class="widget"><div class="w-title">Trending</div>${['#'+t.tag,'#LaunchPad','#BuildInPublic'].map(tr=>`<div class="trend"><span>${tr}</span> · 1.2k posts</div>`).join('')}</div>
  <div class="widget"><div class="w-title">Who to Follow</div>${['Raj S.','Mei L.','Chris B.'].map(u=>`<div class="trend">${u}</div>`).join('')}</div>
</div>
</body></html>`;
}

function terminalPreview(t) {
  const c = t.color;
  const lines = [
    `$ launchpad init --template ${t.id}`,
    `✔ Scaffolding ${t.title}...`,
    `✔ Installing dependencies`,
    `✔ Configuring ${t.blocks[0]}`,
    `✔ Connecting ${t.blocks[1]}`,
    ``,
    `[INFO] ${t.flow}`,
    ``,
    `[LIVE] ${t.blocks[2]} · STATUS: ONLINE`,
    `[LIVE] ${t.blocks[3]} · LATENCY: 12ms`,
    ``,
    `> ${t.description}`,
    `> All systems operational ✔`,
  ];
  return `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box}
body{background:#0a0b0f;color:#f0ede8;height:100vh;font-family:'Courier New',monospace;font-size:13px;padding:24px;overflow:hidden}
.term{background:#0d1117;border:1px solid rgba(255,255,255,0.07);border-radius:12px;height:100%;padding:20px;display:flex;flex-direction:column}
.term-bar{display:flex;gap:6px;margin-bottom:16px}
.dot{width:10px;height:10px;border-radius:50%}
.lines{flex:1;overflow:hidden;display:flex;flex-direction:column;gap:5px}
.line{animation:appear .1s ease both;white-space:nowrap;overflow:hidden}
@keyframes appear{from{opacity:0;transform:translateX(-4px)}to{opacity:1;transform:translateX(0)}}
.cursor{display:inline-block;width:8px;height:14px;background:${c};animation:blink 1s infinite;vertical-align:middle;margin-left:2px}
@keyframes blink{0%,49%{opacity:1}50%,100%{opacity:0}}
</style></head><body>
<div class="term">
  <div class="term-bar"><div class="dot" style="background:#f43f5e"></div><div class="dot" style="background:#fbbf24"></div><div class="dot" style="background:#4ade80"></div></div>
  <div class="lines">
    ${lines.map((l,i)=>{
      const color = l.startsWith('$')?c:l.startsWith('✔')?'#4ade80':l.startsWith('[LIVE]')?'#38bdf8':l.startsWith('[INFO]')?'#fbbf24':l.startsWith('>')?'#7a7d8a':'#c4c0bc';
      return `<div class="line" style="color:${color};animation-delay:${i*0.1}s">${l||'&nbsp;'}</div>`;
    }).join('')}
    <div class="line" style="animation-delay:${lines.length*0.1}s">$ <div class="cursor"></div></div>
  </div>
</div>
</body></html>`;
}

function platformPreview(t) {
  const c = t.color;
  return `<!DOCTYPE html><html><head><style>
*{margin:0;padding:0;box-sizing:border-box;${FONT}}
body{background:#0a0b0f;color:#f0ede8;height:100vh;display:flex;flex-direction:column;overflow:hidden;font-size:13px}
nav{padding:12px 28px;background:rgba(10,11,15,0.9);border-bottom:1px solid rgba(255,255,255,0.07);display:flex;align-items:center;justify-content:space-between}
.logo{font-size:16px;font-weight:700;color:${c};display:flex;align-items:center;gap:8px}
.nav-links{display:flex;gap:24px;font-size:12px;color:#7a7d8a}
.nav-links span:hover{color:${c};cursor:pointer}
.btns{display:flex;gap:8px}
.btn-o{padding:6px 14px;border:1px solid rgba(255,255,255,0.12);border-radius:7px;background:none;color:#f0ede8;font-size:12px;cursor:pointer}
.btn-p{padding:6px 14px;border-radius:7px;background:${c};color:#0a0b0f;font-size:12px;font-weight:700;border:none;cursor:pointer}
.hero{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:24px;background:radial-gradient(ellipse 70% 50% at 50% 30%,${c}18 0%,transparent 70%)}
.tag{display:inline-block;padding:4px 12px;border-radius:20px;background:${c}22;color:${c};font-size:11px;font-weight:600;letter-spacing:.06em;margin-bottom:14px}
h1{font-size:32px;font-weight:700;line-height:1.2;margin-bottom:10px;max-width:500px}
.sub{font-size:14px;color:#7a7d8a;max-width:380px;line-height:1.6;margin-bottom:24px}
.hero-btns{display:flex;gap:10px;justify-content:center}
.features{display:flex;gap:12px;padding:16px 28px;border-top:1px solid rgba(255,255,255,0.07)}
.feat{flex:1;background:#111318;border:1px solid rgba(255,255,255,0.07);border-radius:10px;padding:14px;text-align:center}
.feat .ico{font-size:20px;margin-bottom:6px}
.feat .fn{font-size:12px;font-weight:600;margin-bottom:3px}
.feat .fd{font-size:11px;color:#7a7d8a}
</style></head><body>
<nav>
  <div class="logo">${t.icon} ${t.title}</div>
  <div class="nav-links"><span>Features</span><span>Pricing</span><span>Docs</span><span>Blog</span></div>
  <div class="btns"><button class="btn-o">Login</button><button class="btn-p">Get Started</button></div>
</nav>
<div class="hero">
  <div class="tag">${t.tag}</div>
  <h1>${t.title}</h1>
  <p class="sub">${t.description}</p>
  <div class="hero-btns"><button class="btn-p">Start Building →</button><button class="btn-o">Watch Demo</button></div>
</div>
<div class="features">
  ${t.blocks.map((b,i)=>`<div class="feat"><div class="ico">${['⚡','🔒','📊','🔗'][i]}</div><div class="fn">${b}</div><div class="fd">Production ready</div></div>`).join('')}
</div>
</body></html>`;
}

function getPreviewHTML(t) {
  switch(t.previewType) {
    case 'dashboard': return dashboardPreview(t);
    case 'commerce':  return commercePreview(t);
    case 'social':    return socialPreview(t);
    case 'terminal':  return terminalPreview(t);
    case 'platform':  return platformPreview(t);
    default:          return dashboardPreview(t);
  }
}

// ── MIND MAP SVG RENDERER ─────────────────────

function renderMindMap(svgEl, t) {
  const W = svgEl.clientWidth || 640;
  const H = svgEl.clientHeight || 340;
  const cx = W / 2, cy = H / 2;
  const c = t.color;
  const map = t.mindMap;
  const numBranches = map.branches.length;

  let html = `<defs>
    <radialGradient id="cg"><stop offset="0%" stop-color="${c}" stop-opacity="0.3"/><stop offset="100%" stop-color="${c}" stop-opacity="0"/></radialGradient>
    <filter id="glow"><feGaussianBlur stdDeviation="3" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
  </defs>
  <circle cx="${cx}" cy="${cy}" r="60" fill="url(#cg)"/>`;

  map.branches.forEach((branch, bi) => {
    const angle = (bi / numBranches) * Math.PI * 2 - Math.PI / 2;
    const bx = cx + Math.cos(angle) * 140;
    const by = cy + Math.sin(angle) * 110;

    // Center → Branch connector
    html += `<line x1="${cx}" y1="${cy}" x2="${bx}" y2="${by}" stroke="${c}" stroke-width="1.5" stroke-opacity="0.4" stroke-dasharray="4,4"/>`;

    // Branch node
    html += `<rect x="${bx-44}" y="${by-14}" width="88" height="28" rx="8" fill="#181b22" stroke="${c}" stroke-width="1.5" filter="url(#glow)"/>
    <text x="${bx}" y="${by+5}" text-anchor="middle" fill="${c}" font-size="11" font-weight="600" font-family="DM Sans,sans-serif">${branch.label}</text>`;

    // Children
    branch.children.forEach((child, ci) => {
      const spread = (branch.children.length - 1) * 0.32;
      const childAngle = angle + (ci / (branch.children.length - 1 || 1) - 0.5) * spread;
      const cr = 90;
      const chx = bx + Math.cos(childAngle) * cr;
      const chy = by + Math.sin(childAngle) * cr;

      html += `<line x1="${bx}" y1="${by}" x2="${chx}" y2="${chy}" stroke="${c}" stroke-width="1" stroke-opacity="0.25"/>
      <rect x="${chx-38}" y="${chy-11}" width="76" height="22" rx="6" fill="#111318" stroke="rgba(255,255,255,0.08)" stroke-width="1"/>
      <text x="${chx}" y="${chy+4}" text-anchor="middle" fill="#c4c0bc" font-size="10" font-family="DM Sans,sans-serif">${child}</text>`;
    });
  });

  // Center label
  html += `<circle cx="${cx}" cy="${cy}" r="36" fill="#111318" stroke="${c}" stroke-width="2" filter="url(#glow)"/>
  <text x="${cx}" y="${cy-6}" text-anchor="middle" fill="${c}" font-size="11" font-weight="700" font-family="DM Sans,sans-serif">${map.center.split(' ')[0]}</text>
  <text x="${cx}" y="${cy+8}" text-anchor="middle" fill="${c}" font-size="11" font-weight="700" font-family="DM Sans,sans-serif">${map.center.split(' ').slice(1).join(' ')}</text>`;

  svgEl.innerHTML = html;
}

// ── BLOCK DIAGRAM ─────────────────────────────

function renderBlockDiagram(el, t) {
  const steps = t.flow.split(' ➔ ');
  const c = t.color;
  el.innerHTML = steps.map((s, i) => `
    <div style="display:flex;align-items:center;gap:6px;animation:fadeUp .4s ${i*0.12}s ease both">
      <div style="background:#111318;border:1px solid ${c}44;border-radius:10px;padding:8px 14px;font-size:12px;font-weight:600;color:${c};white-space:nowrap">${s}</div>
      ${i < steps.length - 1 ? `<div style="color:${c};font-size:16px;opacity:.6">➔</div>` : ''}
    </div>
  `).join('');
}

// ── DETAIL MODAL ──────────────────────────────

let currentTemplate = null;

function openTemplateDetail(t) {
  currentTemplate = t;
  const existing = document.getElementById('templateDetail');
  if (existing) existing.remove();

  const modal = document.createElement('div');
  modal.id = 'templateDetail';
  modal.style.cssText = `position:fixed;inset:0;z-index:500;background:rgba(5,6,10,0.88);backdrop-filter:blur(10px);display:flex;align-items:flex-start;justify-content:center;overflow-y:auto;padding:24px;animation:fadein .2s ease`;

  modal.innerHTML = `
    <style>
      @keyframes fadein{from{opacity:0}to{opacity:1}}
      @keyframes fadeUp{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
      #td-inner{width:100%;max-width:860px;padding-bottom:40px}
      .td-section{background:#111318;border:1px solid rgba(255,255,255,0.07);border-radius:16px;padding:20px;margin-bottom:14px;animation:fadeUp .45s ease both}
      .td-label{font-size:10.5px;font-weight:700;text-transform:uppercase;letter-spacing:.1em;color:#4a4d5a;margin-bottom:12px;font-family:'DM Sans',sans-serif}
      .td-tag{display:inline-block;padding:3px 10px;border-radius:20px;font-size:11px;font-weight:700;letter-spacing:.04em;margin-right:6px}
    </style>
    <div id="td-inner">
      <!-- Header -->
      <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:18px;animation:fadeUp .3s ease both">
        <div style="display:flex;align-items:center;gap:14px">
          <div style="width:52px;height:52px;background:linear-gradient(135deg,${t.color}33,${t.color}11);border:1px solid ${t.color}44;border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px">${t.icon}</div>
          <div>
            <h2 style="font-family:'Playfair Display',serif;font-size:22px;color:#f0ede8;margin-bottom:3px">${t.title}</h2>
            <p style="font-size:13px;color:#7a7d8a;font-family:'DM Sans',sans-serif">${t.description}</p>
          </div>
        </div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="td-tag" style="background:${t.color}22;color:${t.color}">${t.tag}</span>
          <span class="td-tag" style="background:rgba(255,255,255,0.06);color:#7a7d8a">${t.category}</span>
          <button id="tdClose" style="width:34px;height:34px;border-radius:50%;background:#181b22;border:1px solid rgba(255,255,255,0.08);color:#7a7d8a;cursor:pointer;font-size:14px;display:flex;align-items:center;justify-content:center;transition:.2s">✕</button>
        </div>
      </div>

      <!-- Architecture Flow -->
      <div class="td-section" style="animation-delay:.05s">
        <div class="td-label">Architecture Flow</div>
        <div id="tdBlocks" style="display:flex;flex-wrap:wrap;align-items:center;gap:8px"></div>
      </div>

      <!-- Service Blocks -->
      <div class="td-section" style="animation-delay:.1s">
        <div class="td-label">Service Modules</div>
        <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:10px">
          ${t.blocks.map((b,i)=>`
            <div style="background:#181b22;border:1px solid ${t.color}33;border-radius:10px;padding:14px;box-shadow:4px 4px 0 ${t.color}44;animation:fadeUp .5s ${0.12+i*0.06}s ease both">
              <div style="font-size:18px;margin-bottom:6px">${['⚡','🔒','📊','🔗','🛡️','🔀','📦','🔎'][i]||'🔧'}</div>
              <div style="font-size:12px;font-weight:700;color:#f0ede8;font-family:'DM Sans',sans-serif;margin-bottom:3px">${b}</div>
              <div style="font-size:10px;color:#7a7d8a;font-family:'DM Sans',sans-serif">Module ${i+1}</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Mind Map -->
      <div class="td-section" style="animation-delay:.15s">
        <div class="td-label">System Mind Map</div>
        <svg id="tdMindmap" width="100%" height="340" style="overflow:visible;display:block"></svg>
      </div>

      <!-- Demo Output -->
      <div class="td-section" style="animation-delay:.2s">
        <div class="td-label">Live Preview — ${t.title} Interface</div>
        <div style="border-radius:10px;overflow:hidden;border:1px solid rgba(255,255,255,0.06)">
          <div style="background:#181b22;padding:8px 12px;display:flex;align-items:center;gap:6px;border-bottom:1px solid rgba(255,255,255,0.07)">
            <div style="width:8px;height:8px;border-radius:50%;background:#f43f5e"></div>
            <div style="width:8px;height:8px;border-radius:50%;background:#fbbf24"></div>
            <div style="width:8px;height:8px;border-radius:50%;background:#4ade80"></div>
            <span style="font-size:11px;color:#4a4d5a;margin-left:8px;font-family:'DM Sans',sans-serif">${t.title} · Live Preview</span>
          </div>
          <iframe id="tdIframe" srcdoc="" style="width:100%;height:360px;border:none;display:block" sandbox="allow-scripts"></iframe>
        </div>
      </div>

      <!-- Use This Button -->
      <div style="text-align:center;animation:fadeUp .5s .35s ease both">
        <button id="tdUseBtn" style="padding:13px 36px;background:linear-gradient(135deg,${t.color},${t.color}cc);color:#0a0b0f;font-family:'DM Sans',sans-serif;font-size:14px;font-weight:700;border:none;border-radius:12px;cursor:pointer;box-shadow:0 8px 24px ${t.color}44;transition:all .25s">
          Use This Blueprint →
        </button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  // Wire close
  document.getElementById('tdClose').addEventListener('click', () => { modal.style.opacity = '0'; modal.style.transition = 'opacity .2s'; setTimeout(() => modal.remove(), 200); });
  modal.addEventListener('click', e => { if (e.target === modal) { modal.style.opacity='0'; modal.style.transition='opacity .2s'; setTimeout(()=>modal.remove(),200); } });

  // Use button
  document.getElementById('tdUseBtn').addEventListener('click', () => {
    modal.remove();
    if (window._launchpadSelectTemplate) window._launchpadSelectTemplate(t);
  });

  // Render block diagram
  renderBlockDiagram(document.getElementById('tdBlocks'), t);

  // Render mind map after layout settles
  requestAnimationFrame(() => {
    requestAnimationFrame(() => renderMindMap(document.getElementById('tdMindmap'), t));
  });

  // Inject iframe preview
  document.getElementById('tdIframe').srcdoc = getPreviewHTML(t);
}

// ── TEMPLATE GRID ─────────────────────────────

export function renderTemplates(containerId = 'templatesGrid') {
  const grid = document.getElementById(containerId);
  if (!grid) return;
  grid.innerHTML = '';

  const grouped = {};
  moduleTemplates.forEach(t => {
    if (!grouped[t.category]) grouped[t.category] = [];
    grouped[t.category].push(t);
  });

  // Flat grid with cards
  moduleTemplates.forEach((t, i) => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.style.cssText = `animation-delay:${0.04 * i + 0.1}s;--card-glow:${t.glow}`;
    card.innerHTML = `
      <span class="card-icon">${t.icon}</span>
      <div class="card-title">${t.title}</div>
      <div class="card-desc">${t.description}</div>
      <span class="card-tag" style="background:${t.color}22;color:${t.color}">${t.tag}</span>
    `;
    card.addEventListener('click', () => openTemplateDetail(t));
    grid.appendChild(card);
  });
}

// ── HISTORY ───────────────────────────────────

const HISTORY = ['AI SaaS Dashboard','FinTech Portal','E-Commerce v2','IoT Monitor'];

export function renderHistory(containerId = 'historyList') {
  const list = document.getElementById(containerId);
  if (!list) return;
  HISTORY.forEach(h => {
    const item = document.createElement('div');
    item.className = 'history-item';
    item.textContent = '· ' + h;
    list.appendChild(item);
  });
}

// ── CHAT ──────────────────────────────────────

const AI_RESPONSES = [
  t => `Excellent! Scaffolding **${t.title}** now. I'll define the ${t.blocks[0]} and ${t.blocks[1]} first, then layer the ${t.blocks[2]}. Ready in seconds…`,
  t => `Great choice. The ${t.flow.split('➔')[0].trim()} → pipeline is clean. Starting with the ${t.blocks[0]} module and connecting to ${t.blocks[3]}.`,
  t => `On it. ${t.title} uses a ${t.tag}-optimized architecture. Configuring ${t.blocks[2]} and ${t.blocks[3]} as the core services now.`,
];

export function sendMessage(text, templateObj = null) {
  const val = text || document.getElementById('promptInput')?.value.trim();
  if (!val) return;
  if (document.getElementById('promptInput')) document.getElementById('promptInput').value = '';

  const chat = document.getElementById('chatArea');
  if (!chat) return;

  // User bubble
  const ub = document.createElement('div');
  ub.className = 'chat-bubble user';
  ub.textContent = val;
  chat.appendChild(ub);

  // Typing
  const tb = document.createElement('div');
  tb.className = 'chat-bubble ai';
  tb.innerHTML = `<div class="ai-header"><div class="ai-dot"></div><span class="ai-label">LaunchPad AI</span></div><div class="typing-dots"><span></span><span></span><span></span></div>`;
  chat.appendChild(tb);
  chat.scrollTop = chat.scrollHeight;
  document.querySelector('.content-scroll')?.scrollTo({ top: 99999, behavior: 'smooth' });

  setTimeout(() => {
    const t = templateObj || moduleTemplates.find(m => val.toLowerCase().includes(m.title.toLowerCase())) || moduleTemplates[0];
    const msg = AI_RESPONSES[Math.floor(Math.random() * AI_RESPONSES.length)](t);
    tb.innerHTML = `<div class="ai-header"><div class="ai-dot"></div><span class="ai-label">LaunchPad AI</span></div>${msg}`;

    if (templateObj) {
      setTimeout(() => {
        const preview = document.createElement('div');
        preview.className = 'chat-bubble ai';
        preview.innerHTML = `<div class="ai-header"><div class="ai-dot"></div><span class="ai-label">LaunchPad AI</span></div>Blueprint loaded. <strong style="color:${templateObj.color};cursor:pointer" id="openDetail-${templateObj.id}">Click to open full preview →</strong>`;
        chat.appendChild(preview);
        document.getElementById(`openDetail-${templateObj.id}`)?.addEventListener('click', () => openTemplateDetail(templateObj));
        chat.scrollTop = chat.scrollHeight;
      }, 600);
    }
    chat.scrollTop = chat.scrollHeight;
  }, 1600);
}

// ── TOAST ─────────────────────────────────────

export function showToast(msg, type = 'success') {
  const t = document.getElementById('toast');
  if (!t) return;
  document.getElementById('toastMsg').textContent = msg;
  const dot = t.querySelector('.dot');
  if (dot) dot.style.background = type === 'error' ? '#f43f5e' : '#3ddc84';
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 3000);
}

// ── MODALS ────────────────────────────────────

export function openModal(id) { document.getElementById(id)?.classList.add('open'); }
export function closeModal(id) { document.getElementById(id)?.classList.remove('open'); }
window.closeModal = closeModal;

// ── INIT ──────────────────────────────────────

export function init() {
  renderTemplates();
  renderHistory();

  // Auto-resize textarea
  const ta = document.getElementById('promptInput');
  if (ta) {
    ta.addEventListener('input', () => {
      ta.style.height = 'auto';
      ta.style.height = Math.min(ta.scrollHeight, 160) + 'px';
    });
    ta.addEventListener('keydown', e => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
  }

  document.getElementById('generateBtn')?.addEventListener('click', () => sendMessage());
  document.getElementById('openFeedback')?.addEventListener('click', () => openModal('feedbackModal'));
  document.getElementById('openLogin')?.addEventListener('click', () => openModal('loginModal'));

  document.getElementById('submitFeedback')?.addEventListener('click', () => {
    const v = document.getElementById('feedbackText')?.value.trim();
    if (!v) return;
    closeModal('feedbackModal');
    document.getElementById('feedbackText').value = '';
    showToast('Feedback received — thank you!');
  });

  document.getElementById('loginSubmit')?.addEventListener('click', () => {
    closeModal('loginModal');
    showToast('Signed in successfully');
  });

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(m => {
    m.addEventListener('click', e => { if (e.target === m) m.classList.remove('open'); });
  });

  // Nav active state
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // Wire template selection back into chat
  window._launchpadSelectTemplate = (t) => {
    sendMessage(`Build ${t.title}`, t);
    showToast(`Blueprint loaded: ${t.title}`);
  };
}

// Auto-init on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}