import fs from 'node:fs';
import path from 'node:path';
const fail = msg => { console.error('FAIL · '+msg); process.exit(1); };
const ok = msg => console.log('PASS · '+msg);
const read = p => fs.readFileSync(p,'utf8');
const exists = p => fs.existsSync(p);
for (const p of ['site/index.html','site/site-atlas.html','site/archive-v36-ascension-chamber.html','site/assets/site-shell.css','site/assets/site-shell.js','site/assets/site-shell-data.js','site/assets/site-atlas.css','site/assets/site-atlas.js','data/site-navigation-map.json','schemas/site-navigation-map.schema.json','docs/SITE_COMMAND_CENTER_V37.md']) {
  if (!exists(p)) fail(`required file missing: ${p}`);
}
ok('required v37 files exist');
const data = JSON.parse(read('data/site-navigation-map.json'));
if (data.version !== 'v37-site-command-center') fail('navigation map version mismatch');
if (data.routes.length < 40) fail('navigation map should cover the full site');
if (new Set(data.routes.map(r=>r.id)).size !== data.routes.length) fail('route IDs must be unique');
if (new Set(data.routes.map(r=>r.href)).size !== data.routes.length) fail('route hrefs must be unique');
for (const r of data.routes) {
  const routePath = r.href.endsWith('/') ? path.join('site', r.href, 'index.html') : path.join('site', r.href);
  if (!exists(routePath)) fail(`route target missing: ${r.title} -> ${r.href}`);
  for (const k of ['id','title','href','group','audience','time','summary']) if (!(k in r)) fail(`route ${r.id} missing field ${k}`);
}
ok('navigation map covers existing unique public routes');
if (data.journeys.length < 4) fail('expected at least four guided journeys');
for (const j of data.journeys) for (const step of j.steps) if (!data.routes.find(r=>r.id===step)) fail(`journey ${j.id} references missing route ${step}`);
ok('guided journeys reference valid route IDs');
const index = read('site/index.html');
if (!/Command Center/.test(index) || !/Everything remains available/.test(index)) fail('home page must expose command center and preservation promise');
if ((index.match(/Expert Console/g)||[]).length > 1) fail('home page should not duplicate Expert Console navigation');
if ((index.match(/<nav/g)||[]).length > 2) fail('home page should have simplified navigation');
ok('home page is simplified and preservation-forward');
const shell = read('site/assets/site-shell.js') + read('site/assets/site-atlas.js') + read('site/assets/site-shell-data.js');
for (const bad of ['fetch(','XMLHttpRequest','navigator.sendBeacon','localStorage','sessionStorage','document.cookie','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','approve(']) if (shell.includes(bad)) fail(`site command assets contain forbidden primitive: ${bad}`);
ok('site command assets remain zero-network, storage-free, and wallet-free');
let htmlCount = 0, missingShell = [];
function walk(dir){ for (const ent of fs.readdirSync(dir,{withFileTypes:true})) { const rel=path.join(dir,ent.name); if (ent.isDirectory()) walk(rel); else if (rel.endsWith('.html')) { htmlCount++; const txt=read(rel); if (!txt.includes('site-shell')) missingShell.push(rel); if (/<form\b/i.test(txt) && !rel.endsWith('expert-mainnet-console.html')) fail(`unexpected form tag in ${rel}`); } } }
walk('site');
if (htmlCount < 40) fail('expected complete HTML page set');
if (missingShell.length) fail('missing global command shell on pages: '+missingShell.join(', '));
ok('global command shell is present across public HTML pages');
console.log('Site Command Center v37 PASS');
