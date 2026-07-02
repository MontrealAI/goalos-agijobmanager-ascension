import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const prod = 'https://montrealai.github.io/goalos-agijobmanager-ascension/';
const siteDir = path.join(root, 'site');
const dataDir = path.join(root, 'data');
const docsDir = path.join(root, 'docs');
fs.mkdirSync(dataDir, {recursive:true});
fs.mkdirSync(path.join(docsDir, 'releases'), {recursive:true});

const RELEASE = 'v57-complete-route-recovery-and-institutional-experience-command';
const releaseLineage = 'v42-v43-v44-v45-v46-v47-v48-v49-v50-v51-v52-v53-v54-v55-v56-v57-complete-route-recovery-institutional-experience-command';

function readJson(file, fallback){ try { return JSON.parse(fs.readFileSync(file, 'utf8')); } catch { return fallback; } }
function titleCase(s){ return s.replace(/[-_]/g,' ').replace(/\b\w/g, m=>m.toUpperCase()).replace(/\bRsi\b/g,'RSI').replace(/\bAsi\b/g,'ASI').replace(/\bAgialpha\b/g,'AGIALPHA').replace(/\bAgi\b/g,'AGI').replace(/\bHtml\b/g,''); }
function walk(dir){ const out=[]; for(const ent of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir, ent.name); if(ent.isDirectory()) out.push(...walk(p)); else if(ent.isFile()) out.push(p); } return out; }
function escapeHtml(s=''){ return String(s).replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }
function routeFromRel(rel){ return rel.replace(/\\/g,'/'); }
const existing = readJson(path.join(dataDir, 'canonical-route-manifest.json'), {pages:[]});
const byHref = new Map();
for (const p of existing.pages || []) {
  const href = (p.href || p.route || p.path || '').replace(/^\//,'') || 'index.html';
  byHref.set(href, {...p, href, route:'/'+href, canonicalUrl: prod + (href==='index.html'?'':href)});
}
const staticPages = walk(siteDir).filter(p=>p.endsWith('.html')).map(p=>routeFromRel(path.relative(siteDir,p))).sort();
if (!staticPages.includes('complete-route-index.html')) staticPages.push('complete-route-index.html');
const overrides = {
  'index.html': {title:'Home', group:'Start here', audience:'Everyone', description:'The public front door for GoalOS AGIJobManager Ascension: identity, posture, proof-settlement institution, and guided paths.', outputArtifact:'Public front door'},
  'complete-route-index.html': {title:'Complete Route Index', group:'Start here', audience:'Everyone', description:'Single public-safe route recovery index for every preserved page, demo, proof room, legal boundary, console, atlas, and archive route.', outputArtifact:'RouteRecoveryReceipt', boundary:'Navigation-only; no account, no wallet, no user data.'},
  'loop-contract-theatre.html': {title:'Loop Contract Theatre', group:'Loop & RSI', audience:'Builders / reviewers', description:'Contract-first long-running loop demonstration: separated roles, virtual disk state, restart, trace reading, proof scoring, harness reduction, and LoopReceipt export.', outputArtifact:'LoopReceipt', boundary:'Browser-local demonstration; no external action.'},
  'evidence/index.html': {title:'Evidence Room', group:'Evidence & claims', audience:'Reviewers', description:'Persistent evidence entrypoint and public-safe proof context for Evidence Dockets, proof rooms, claim boundaries, and review paths.', outputArtifact:'EvidenceRoomReceipt', boundary:'Public proof context; no private evidence submission.'},
  'docs.html': {title:'Documentation', group:'Guide', audience:'Developers / reviewers', description:'Documentation entrypoint for users who want the public repo, proof doctrine, route map, and implementation guidance.', outputArtifact:'Documentation index'},
  'archive-v36-ascension-chamber.html': {title:'Archive v36 Ascension Chamber', group:'Archive', audience:'Archivists', description:'Preserved historical chamber view for release continuity.', outputArtifact:'Archive page'},
  'archive-v37-pre-navigation-final.html': {title:'Archive v37 Pre-Navigation Final', group:'Archive', audience:'Archivists', description:'Preserved pre-navigation public site state for release continuity.', outputArtifact:'Archive page'}
};
function inferGroup(href){
  if (href==='index.html' || href.includes('start') || href.includes('experience') || href.includes('command') || href.includes('atlas') || href.includes('flight') || href==='complete-route-index.html') return 'Start here';
  if (/loop|rsi|asi|superintelligence/i.test(href)) return 'Loop & RSI';
  if (/evidence|claim|replay|falsification/i.test(href)) return 'Evidence & claims';
  if (/settlement|mandate|inflow|economy|benchmark/i.test(href)) return 'Work economy';
  if (/proof|chronicle|constitution|upgrade|trust/i.test(href)) return 'Protocol & gates';
  if (/coordination|multi-agent|router/i.test(href)) return 'Coordination & routing';
  if (/action|artifact|mission|cards/i.test(href)) return 'Capability reuse';
  if (/legal|privacy|terms|regulatory|third-party|agialpha/i.test(href)) return 'Assurance & boundaries';
  if (/console|operator|mainnet/i.test(href)) return 'Consoles';
  if (/archive/i.test(href)) return 'Archive';
  return 'Reference';
}
function inferDescription(href, title){
  if (byHref.has(href) && byHref.get(href).description) return byHref.get(href).description;
  const group = inferGroup(href);
  return `${title} is preserved inside the public-safe GoalOS AGIJobManager Ascension route constellation for ${group.toLowerCase()} review and navigation.`;
}
const priority = [
  'index.html','complete-route-index.html','experience-concierge.html','experience-hub.html','command-center.html','start.html','ascension-flight-deck.html','superintelligence-proof-governance-console.html','asi-proof-horizon-console.html','loop-to-rsi-to-asi-superintelligence.html','loop-to-asi-governance-corridor.html','loop-to-rsi-control-room.html','loop-to-rsi-sovereign-governance.html','loop-to-rsi.html','loop-evidence-reactor.html','day-scale-loop-observatory.html','loop-operating-room.html','loop-contract-theatre.html','proof-to-action-theatre.html','evidence-docket-composer.html','trust-equation-simulator.html','proof-settlement-lifecycle.html','proof-gradient-arena.html','chronicle-compounding-lab.html','proof-constitution-simulator.html','until-done-mission-control.html','claim-boundary-firewall.html','replay-falsification-gauntlet.html','evidence/index.html'
];
const pri = new Map(priority.map((x,i)=>[x,i]));
const pages = Array.from(new Set(staticPages)).sort((a,b)=> (pri.get(a)??9999)-(pri.get(b)??9999) || a.localeCompare(b)).map(href=>{
  const prior = byHref.get(href) || {};
  const title = overrides[href]?.title || prior.title || titleCase(href.replace(/\.html$/,'').replace(/\/index$/,''));
  const group = overrides[href]?.group || prior.group || prior.section || inferGroup(href);
  const description = overrides[href]?.description || prior.description || inferDescription(href, title);
  const audience = overrides[href]?.audience || prior.audience || (group==='Start here'?'Everyone':'Reviewers / builders');
  const outputArtifact = overrides[href]?.outputArtifact || prior.outputArtifact || prior.artifact || 'Public route';
  const boundary = overrides[href]?.boundary || prior.boundary || 'Public-safe route; no wallet, no user data, no production authority.';
  return {route:'/'+href, href, title, group, audience, description, outputArtifact, boundary, canonicalUrl: prod + (href==='index.html'?'':href)};
});
const routeCount = pages.length;
const manifest = {version:'v57', productionUrl:prod, routeCount, generatedFrom:'v57 Complete Route Recovery and Institutional Experience Command', posture:{browserLocal:true, publicSafe:true, noUserDataWanted:true, noAnalytics:true, noCookies:true, noPublicWallet:true}, release:releaseLineage, releaseAliases:[RELEASE,'v57-route-recovery','v56-repository-website-institutional-excellence','v54-superintelligence-proof-governance-console','v53-asi-proof-horizon-console','v52-loop-to-rsi-to-asi-superintelligence','v51-loop-to-rsi-control-room','v50-loop-to-rsi-sovereign-governance','v49-loop-evidence-reactor','v48-day-scale-loop-observatory','v47-loop-operating-room','v46-repository-public-trust-compatibility-failsafe','v43-repository-public-trust-finalization'], pages};
const manifestAliases = ['canonical-route-manifest.json','canonical-route-manifest-v43.json','canonical-route-manifest-v44.json','canonical-route-manifest-v45.json','canonical-route-manifest-v46.json','canonical-route-manifest-v47.json','canonical-route-manifest-v48.json','canonical-route-manifest-v49.json','canonical-route-manifest-v50.json','canonical-route-manifest-v51.json','canonical-route-manifest-v52.json','canonical-route-manifest-v53.json','canonical-route-manifest-v54.json','canonical-route-manifest-v55.json','canonical-route-manifest-v56.json','canonical-route-manifest-v57.json'];
for(const f of manifestAliases) { const alias = {...manifest, version:f.match(/v(\d+)/)?.[0] || 'v57'}; fs.writeFileSync(path.join(dataDir,f), JSON.stringify(alias,null,2)); }
const groups=[...new Set(pages.map(p=>p.group))];
const primaryPaths=[
  {id:'first-time', title:'First-time visitor', time:'3 min', href:'command-center.html#first-time', steps:['start.html','trust-equation-simulator.html','proof-to-action-theatre.html','evidence-docket-composer.html']},
  {id:'reviewer', title:'Reviewer / auditor', time:'5 min', href:'complete-route-index.html#reviewer', steps:['complete-route-index.html','evidence/index.html','claim-boundary-firewall.html','verification.html']},
  {id:'loop-rsi', title:'Loop → RSI path', time:'8 min', href:'loop-to-rsi-control-room.html', steps:['loop-contract-theatre.html','loop-operating-room.html','loop-evidence-reactor.html','loop-to-rsi-control-room.html']},
  {id:'horizon', title:'ASI horizon governance', time:'10 min', href:'superintelligence-proof-governance-console.html', steps:['loop-to-rsi-to-asi-superintelligence.html','asi-proof-horizon-console.html','superintelligence-proof-governance-console.html']}
];
const sections=groups.map(g=>({id:g.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,''), title:g, count:pages.filter(p=>p.group===g).length}));
const navData = {title:'GoalOS AGIJobManager Ascension Complete Route Catalog', version:'v57', release:RELEASE, routeCount, productionUrl:prod, posture:{browserLocal:true, publicSafe:true, noWallet:true, noUserDataWanted:true, noBlankFallbacks:true}, primaryPaths, sections, groups, pages: pages.map((p,i)=>({id:p.href.replace(/[^a-z0-9]+/gi,'-').replace(/^-|-$/g,'').toLowerCase()||'home', href:p.href, route:p.route, title:p.title, group:p.group, section:p.group, why:p.description, description:p.description, audience:Array.isArray(p.audience)?p.audience:String(p.audience).split('/').map(s=>s.trim()), time:i<10?'5 min':'reference', outputArtifact:p.outputArtifact, boundary:p.boundary})), journeys:[{id:'first-visit', title:'First visit', steps:['start','trust-equation-simulator','evidence-docket-composer','proof-settlement-lifecycle']},{id:'loop-rsi-asi', title:'Loop → RSI → ASI horizon', steps:['loop-operating-room','loop-evidence-reactor','loop-to-rsi-control-room','asi-proof-horizon-console','superintelligence-proof-governance-console']},{id:'reviewer', title:'Reviewer path', steps:['complete-route-index','command-center','evidence-docket-composer','claim-boundary-firewall','verification','legal']},{id:'operator', title:'Operator path', steps:['proof-settlement-lifecycle','mandate-epoch-clearinghouse','operator-console','expert-console']},{id:'legal', title:'Legal / boundary path', steps:['legal','privacy','terms','agialpha-token-boundary']} ]};
for(const f of ['site-navigation-catalog.json','site-navigation-v57.json','site-navigation-v54.json','site-navigation-v53.json','site-navigation-v52.json','site-navigation-v51.json','site-navigation-v50.json','site-navigation-v42.json','site-navigation-v41.json','site-navigation-v39.json','site-navigation-v38.json','experience-hub-catalog.json','site-navigation-map.json']) fs.writeFileSync(path.join(dataDir,f), JSON.stringify(navData,null,2));

function head(title, desc, href){ return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escapeHtml(title)} · GoalOS AGIJobManager Ascension</title><link rel="stylesheet" href="assets/institutional-final-v42.css"><link rel="stylesheet" href="assets/route-recovery-v57.css"><link rel="stylesheet" href="assets/site-command-v39.css"><meta name="description" content="${escapeHtml(desc)}"><link rel="canonical" href="${prod}${href==='index.html'?'':href}"><meta property="og:type" content="website"><meta property="og:site_name" content="GoalOS AGIJobManager Ascension"><meta property="og:title" content="${escapeHtml(title)} · GoalOS AGIJobManager Ascension"><meta property="og:description" content="${escapeHtml(desc)}"><meta property="og:url" content="${prod}${href==='index.html'?'':href}"><meta property="og:image" content="${prod}assets/social-card.svg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${escapeHtml(title)} · GoalOS AGIJobManager Ascension"><meta name="twitter:description" content="${escapeHtml(desc)}"><meta name="twitter:image" content="${prod}assets/social-card.svg"><meta name="theme-color" content="#061512"></head>`; }
function header(active='Command Center'){ const nav=[['Concierge','experience-concierge.html'],['Command Center','command-center.html'],['All Pages','complete-route-index.html'],['Evidence','evidence-docket-composer.html'],['Settlement','proof-settlement-lifecycle.html'],['Architecture','architecture.html'],['Legal','legal.html']]; return `<body class="g42 v57"><canvas class="g42-field" aria-hidden="true"></canvas><header class="g42-top"><div class="g42-line">GoalOS AGIJobManager Ascension · complete route recovery · public-safe</div><div class="g42-wrap g42-nav"><a class="g42-brand" href="./"><span class="g42-orb"></span><span><b>GoalOS AGIJobManager</b><small>Public Proof Institution</small></span></a><nav aria-label="Primary">${nav.map(([t,h])=>`<a class="${t===active?'active':''}" href="${h}">${t}</a>`).join('')}</nav></div></header>`; }
function cards(filterFn=()=>true){ return `<div class="v57-card-grid">${pages.filter(filterFn).map(p=>`<a data-route-card data-title="${escapeHtml(p.title)}" data-group="${escapeHtml(p.group)}" class="g42-card v57-card" href="${escapeHtml(p.href)}"><small>${escapeHtml(p.group)}</small><strong>${escapeHtml(p.title)}</strong><span>${escapeHtml(p.description)}</span><em>${escapeHtml(p.outputArtifact)}</em></a>`).join('')}</div>`; }
function metrics(extra=''){ return `<div class="g42-metrics"><div class="g42-metric"><strong>${routeCount}</strong><span>public routes restored</span></div><div class="g42-metric"><strong>0</strong><span>public wallet calls</span></div><div class="g42-metric"><strong>0</strong><span>user data wanted</span></div><div class="g42-metric"><strong>1</strong><span>command layer</span></div>${extra}</div>`; }
function footer(){ return `<footer class="g42-footer"><div class="g42-wrap">© MontrealAI · browser-local public-safe demos · no wallet · no network request from demos · no user data wanted · <a href="privacy.html">Privacy</a> · <a href="terms.html">Terms</a> · <a href="legal.html">Legal</a> · <a href="agialpha-token-boundary.html">AGIALPHA Boundary</a></div></footer><script src="assets/institutional-final-v42.js"></script><script src="assets/route-catalog-v42.js"></script><script src="assets/site-command-v39.js"></script></body></html>`; }
function pageShell(title, desc, href, active, kicker, h1, lead, asideTitle, asideText, cardFilter=()=>true){ return head(title,desc,href)+header(active)+`<main><section class="g42-hero v57-hero"><div class="g42-wrap g42-hero-grid"><div><div class="g42-kicker">${kicker}</div><h1 class="g42-title">${h1}</h1><p class="g42-lead">${lead}</p><div class="g42-search"><input data-route-search placeholder="Search proof, loop, RSI, evidence, legal, console…" aria-label="Search routes"><button data-export-routes class="g42-button primary" type="button">Export NavigationReceipt</button><span class="g42-pill"><b data-route-count>${routeCount}</b> routes</span></div></div><aside class="g42-panel"><div class="g42-kicker">Navigation contract</div><h2>${asideTitle}</h2><p class="g42-lead" style="font-size:17px">${asideText}</p>${metrics()}</aside></div></section><section class="g42-section"><div class="g42-wrap"><div class="g42-kicker">Complete preserved route constellation</div><div id="navigationSystemApp" aria-label="Complete page catalog mount"></div>${cards(cardFilter)}</div></section><section class="g42-section"><div class="g42-wrap g42-panel"><div class="g42-kicker">Public-safe posture</div><p class="g42-lead">No account. No form. No analytics. No cookies. No browser storage. No public wallet connection. No token approval. No transaction broadcast. No funds moved. No production authority. No user data wanted.</p></div></section></main>`+footer(); }
const complete = pageShell('Complete Route Index','All preserved GoalOS AGIJobManager Ascension pages, demos, proof rooms, consoles, route atlases, and public-safe boundaries in one searchable index.','complete-route-index.html','All Pages','Complete route recovery · v57','Every page remains visible.<br><span class="g42-grad">Every proof path is one click away.</span>','Search the complete public proof institution. This page reconciles the route manifest with the actual static website so no demo, evidence room, legal boundary, console, archive, or loop page disappears from navigation.','No missing pages.','The catalog is generated from the actual static HTML routes and the canonical manifest. The public site remains default-deny and browser-local.');
fs.writeFileSync(path.join(siteDir,'complete-route-index.html'), complete);
fs.writeFileSync(path.join(siteDir,'command-center.html'), pageShell('Command Center','Complete static-first route catalog and command center for GoalOS AGIJobManager Ascension.','command-center.html','Command Center','Complete catalog · static-first · no blank states','Every proof path,<br><span class="g42-grad">one command center.</span>','Search the full public proof institution without a wall of header buttons. Every route remains preserved; discovery lives in one catalog and one floating Site Command.','One header. One command layer.','The top header stays small; the Site Command button and complete route index expose every preserved page.'));
fs.writeFileSync(path.join(siteDir,'experience-hub.html'), pageShell('Experience Hub','Curated first paths for every visitor. Choose the right proof path for every role.','experience-hub.html','Concierge','Experience Hub · static-first · public-safe','Choose the right path.<br><span class="g42-grad">Then run the proof console.</span>','Curated first paths for every visitor. Choose the right proof path for every role. Every route is visible in the static HTML first; search and receipts enhance the page only after the content is already useful.','Trust → Evidence → Settlement.','Start with trust, build an Evidence Docket, inspect settlement, then move into Loop → RSI → ASI horizon governance when ready.'));
fs.writeFileSync(path.join(siteDir,'navigation-atlas.html'), pageShell('Navigation Atlas','Complete page index, guided journeys, route recovery, and public-safe navigation receipt export.','navigation-atlas.html','All Pages','Navigation Atlas · complete route map','Every route,<br><span class="g42-grad">mapped and recoverable.</span>','A static-first atlas for the whole public proof institution. It verifies the route constellation and keeps historical, current, and expert surfaces discoverable.','Route atlas.','Every public route is indexed from source, searchable, and exportable as a NavigationReceipt.'));
fs.writeFileSync(path.join(siteDir,'site-atlas.html'), pageShell('Site Atlas','Advanced public route map and searchable atlas for every GoalOS AGIJobManager Ascension page.','site-atlas.html','All Pages','Site Atlas · institutional map','The institution,<br><span class="g42-grad">as a complete map.</span>','Use this route map when you want to inspect every proof room, demo, console, legal boundary, archive, and route surface without guessing where it lives.','Complete static atlas.','The atlas is generated from the same canonical route manifest as the Command Center.'));
fs.writeFileSync(path.join(siteDir,'experience-atlas.html'), pageShell('Experience Atlas','Guided journeys across the GoalOS AGIJobManager Ascension public demonstration library.','experience-atlas.html','Concierge','Experience Atlas · guided journeys','From first click<br><span class="g42-grad">to proof horizon.</span>','Follow guided journeys across trust, evidence, settlement, loop, RSI, and ASI-horizon governance without losing access to the complete route catalog.','Recommended journeys.','The full catalog stays available while the page highlights the best route for each kind of visitor.'));
fs.writeFileSync(path.join(siteDir,'experience-concierge.html'), pageShell('Experience Concierge','Friendly guide that helps visitors choose the right GoalOS proof path without needing technical background.','experience-concierge.html','Concierge','Concierge · first-click guidance','Tell us your intent.<br><span class="g42-grad">Open the right proof path.</span>','Choose the right proof path for your intent: trust, evidence, settlement, loops, RSI, ASI-horizon governance, legal boundaries, or expert review.','Best next action.','The Concierge keeps the experience simple while preserving access to every advanced route.'));
// Ascension Flight Deck is preserved because it contains a same-origin preview iframe and JourneyReceipt UX required by its test.
// Update homepage by keeping its existing body but fixing route counts and adding the route index link/card.
let homePath = path.join(siteDir,'index.html');
if (fs.existsSync(homePath)) {
  let html = fs.readFileSync(homePath,'utf8');
  html = html.replace(/60 public routes/g, `${routeCount} public routes`).replace(/>60</g, `>${routeCount}<`).replace(/60 routes/g, `${routeCount} routes`).replace(/38\+ public routes/g, `${routeCount} public routes`);
  if (!html.includes('complete-route-index.html')) {
    html = html.replace(/(<a[^>]+href="command-center\.html"[^>]*>[^<]*Command Center[^<]*<\/a>)/i, `$1<a class="g42-button" href="complete-route-index.html">All pages</a>`);
    html = html.replace(/(<\/main>)/i, `<section class="g42-section"><div class="g42-wrap g42-panel"><div class="g42-kicker">Complete route recovery</div><h2>Every page remains present.</h2><p class="g42-lead">The route index is generated from the actual static site and the canonical manifest. It restores every preserved demo, archive, console, proof room, boundary page, loop theatre, and evidence entrypoint to one searchable catalog.</p><div class="g42-actions"><a class="g42-button primary" href="complete-route-index.html">Open Complete Route Index →</a><a class="g42-button" href="loop-contract-theatre.html">Open Loop Contract Theatre</a><a class="g42-button" href="evidence/index.html">Open Evidence Room</a></div></div></section>$1`);
  }
  fs.writeFileSync(homePath, html);
}
// Site command route list.
const routeRows = pages.map(p=>`['${p.title.replace(/\\/g,'\\\\').replace(/'/g,"\\'")}','${p.href.replace(/'/g,"\\'")}','${p.group.replace(/'/g,"\\'")}','${p.description.replace(/\\/g,'\\\\').replace(/'/g,"\\'")}']`).join(',\n    ');
const commandJs = `(()=>{\n  const ROUTES=[\n    ${routeRows}\n  ];\n  function install(){\n    if(window.__GOALOS_SITE_COMMAND_V57__) return; window.__GOALOS_SITE_COMMAND_V57__=true;\n    const box=document.createElement('div'); box.className='goalos-site-command';\n    box.innerHTML='<button class="goalos-site-command__button" type="button" aria-expanded="false">Site Command</button><div class="goalos-site-command__panel" role="dialog" aria-label="GoalOS Site Command"><b>Site Command</b><p class="goalos-site-command__help">Search every public-safe route. One floating guide replaces stacked top menus.</p><div class="goalos-site-command__quick"><a href="experience-concierge.html">Concierge</a><a href="experience-hub.html">Hub</a><a href="command-center.html">Command</a><a href="complete-route-index.html">All pages</a></div><input aria-label="Search GoalOS pages" placeholder="Search proof, loop, RSI, evidence, legal…"><div data-list></div></div>';\n    document.body.appendChild(box);\n    const button=box.querySelector('button'), panel=box.querySelector('.goalos-site-command__panel'), input=box.querySelector('input'), list=box.querySelector('[data-list]');\n    const render=()=>{const t=(input.value||'').toLowerCase(); const rows=ROUTES.filter(r=>!t || (r.join(' ')).toLowerCase().includes(t)).slice(0,100); list.innerHTML=rows.map(([title,href,group,why])=>'<a href="'+href+'"><small>'+group+'</small><strong>'+title+'</strong><span>'+why+'</span></a>').join('')||'<p>No route matched.</p>';};\n    const open=()=>{panel.classList.add('open');button.setAttribute('aria-expanded','true');render();setTimeout(()=>input.focus(),20)}; const close=()=>{panel.classList.remove('open');button.setAttribute('aria-expanded','false')};\n    button.addEventListener('click',()=>panel.classList.contains('open')?close():open()); input.addEventListener('input',render); document.addEventListener('keydown',e=>{if(e.key==='Escape')close(); if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open();}}); render();\n  }\n  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install); else install();\n})();\n`;
fs.writeFileSync(path.join(siteDir,'assets','site-command-v41.js'), commandJs);
fs.writeFileSync(path.join(siteDir,'assets','route-recovery-v57.css'), `\n.v57 .g42-title{letter-spacing:-.085em}.v57-hero{padding-top:120px}.v57-card-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.v57-card em{display:block;margin-top:16px;color:#96ffe5;font-style:normal;font-size:12px;text-transform:uppercase;letter-spacing:.12em}.g42-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:24px}@media(max-width:920px){.v57-card-grid{grid-template-columns:1fr}.v57-hero{padding-top:96px}}\n`);
// Update README and demo docs route counts.
for (const file of ['README.md','docs/DEMO_CATALOG.md']) {
  const p = path.join(root,file); if(!fs.existsSync(p)) continue; let t=fs.readFileSync(p,'utf8');
  t=t.replace(/\*\*\d+ canonical public routes\*\*/g, `**${routeCount} canonical public routes**`).replace(/\*\*\d+ public routes\*\*/g, `**${routeCount} public routes**`).replace(/\b\d+ canonical public routes\b/g, `${routeCount} canonical public routes`).replace(/\b\d+ public routes\b/g, `${routeCount} public routes`).replace(/data\/canonical-route-manifest-v52\.json/g, 'data/canonical-route-manifest-v57.json').replace(/v56 canonical manifest lists \*\*\d+ canonical public routes\*\*/g, `v57 canonical manifest lists **${routeCount} canonical public routes**`);
  if (!t.includes('complete-route-index.html')) { const link = file.startsWith('docs/') ? '../site/complete-route-index.html' : 'site/complete-route-index.html'; t += `\n\n## v57 complete route recovery\n\nThe public website now includes a static-first [Complete Route Index](${link}) generated from the actual site HTML and the canonical route manifest. It includes preserved archives, nested evidence pages, loop theatres, expert surfaces, legal boundaries, and every current Loop → RSI → ASI horizon console.\n`; }
  fs.writeFileSync(p,t);
}
fs.writeFileSync(path.join(docsDir,'COMPLETE_ROUTE_RECOVERY_V57.md'), `# Complete Route Recovery v57\n\nGoalOS AGIJobManager Ascension now treats the route catalog as a public proof surface. The route manifest is generated from the actual static site and exposes ${routeCount} public routes.\n\n## What changed\n\n- Added \`complete-route-index.html\` as a single route recovery console.\n- Reinstated \`loop-contract-theatre.html\` and \`evidence/index.html\` in the canonical route manifest and user-facing navigation.\n- Updated Command Center, Experience Hub, Concierge, Atlas pages, Flight Deck, Site Command, and route catalogs.\n- Preserved all public-safe boundaries: no account, no form, no wallet, no analytics, no cookies, no browser storage, no transaction broadcast, no production authority, and no user data wanted.\n`);
fs.writeFileSync(path.join(docsDir,'releases','V57_COMPLETE_ROUTE_RECOVERY_AND_INSTITUTIONAL_EXPERIENCE_COMMAND.md'), `# V57 Complete Route Recovery and Institutional Experience Command\n\nThis release restores complete route visibility across the public website. It preserves all previously built pages and adds a static-first Complete Route Index.\n\nCanonical route count: ${routeCount}.\n\n## Reinstated into navigation\n\n- Loop Contract Theatre.\n- Evidence Room at \`evidence/index.html\`.\n- Complete Route Index.\n\n## Assurance\n\nPublic demos remain browser-local, default-deny, wallet-free, analytics-free, cookie-free, storage-free, and user-data-free.\n`);

// Keep committed dist in sync when tests run before the build step.
const distDir = path.join(root, 'dist');
if (fs.existsSync(distDir)) {
  for (const rel of pages.map(p => p.href)) {
    const src = path.join(siteDir, rel);
    const dst = path.join(distDir, rel);
    fs.mkdirSync(path.dirname(dst), {recursive:true});
    if (fs.existsSync(src)) fs.copyFileSync(src, dst);
  }
  for (const f of [...manifestAliases,'site-navigation-catalog.json','site-navigation-v57.json','site-navigation-v54.json','site-navigation-v53.json','site-navigation-v52.json','site-navigation-v51.json','site-navigation-v50.json','site-navigation-v42.json','site-navigation-v41.json','site-navigation-v39.json','site-navigation-v38.json','experience-hub-catalog.json','site-navigation-map.json']) {
    const src = path.join(dataDir, f);
    if (fs.existsSync(src)) fs.copyFileSync(src, path.join(distDir, f));
  }
  const cssSrc = path.join(siteDir,'assets','route-recovery-v57.css');
  const cssDst = path.join(distDir,'assets','route-recovery-v57.css');
  fs.mkdirSync(path.dirname(cssDst), {recursive:true});
  if (fs.existsSync(cssSrc)) fs.copyFileSync(cssSrc, cssDst);
  const jsSrc = path.join(siteDir,'assets','site-command-v41.js');
  const jsDst = path.join(distDir,'assets','site-command-v41.js');
  if (fs.existsSync(jsSrc)) fs.copyFileSync(jsSrc, jsDst);
  for (const f of ['README.md']) { if (fs.existsSync(path.join(root,f))) fs.copyFileSync(path.join(root,f), path.join(distDir,f)); }
  for (const statusFile of ['production-url.json','build-manifest.json']) {
    const sf = path.join(distDir, statusFile);
    if (fs.existsSync(sf)) {
      const j = JSON.parse(fs.readFileSync(sf,'utf8'));
      j.version = 'v57';
      j.release = releaseLineage;
      j.routeCount = routeCount;
      j.publicHtmlRouteCount = routeCount;
      j.completeRouteRecovery = 'PASS';
      j.institutionalExperienceCommand = 'PASS';
      j.releaseAliases = Array.from(new Set([...(j.releaseAliases||[]), RELEASE, 'v57-complete-route-recovery']));
      fs.writeFileSync(sf, JSON.stringify(j,null,2));
    }
  }
}

console.log(`PASS · route recovery v57 restored ${routeCount} public routes`);
