
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const fail=m=>{throw new Error(m)};
const ok=m=>console.log('PASS · '+m);
const pages=['site/start.html','site/demo-lab.html','site/mission-studio.html','site/proof-cards.html'];
for(const p of pages){ if(!exists(p)) fail('missing user delight page '+p); const t=read(p); if(!t.includes('assets/delight.css')||!t.includes('assets/delight.js')) fail(p+' must load delight assets'); if(/<form\b/i.test(t)) fail(p+' must not contain form tags'); }
ok('all user delight pages exist and avoid form tags');
const js=read('site/assets/delight.js');
for(const marker of ['docketFor','downloadDocket','copySummary','p.y-=p.v','walletCalls:0','externalActions:0']) if(!js.includes(marker)) fail('delight.js missing marker '+marker);
if(!read('site/demo-lab.html').includes('Run autonomous demo')) fail('demo lab must expose Run autonomous demo button');
for(const bad of ['eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','localStorage.setItem','sessionStorage.setItem','document.cookie','fetch(','XMLHttpRequest','navigator.sendBeacon']) if(js.includes(bad)) fail('delight.js contains forbidden public-demo primitive '+bad);
ok('delight javascript is local-only, ascendant, and wallet-free');
const missions=JSON.parse(read('data/demo-missions.json'));
if(!Array.isArray(missions.missions)||missions.missions.length<5) fail('demo mission data must include at least five missions');
for(const m of missions.missions){ if(!Array.isArray(m.gates)||m.gates.length!==10) fail('demo mission '+m.id+' must include exactly ten gates'); }
ok('demo mission catalog has five ten-gate missions');
const idx=read('site/index.html');
for(const route of ['start.html','demo-lab.html','mission-studio.html','proof-cards.html']) if(!idx.includes(route)) fail('home page must link '+route);
ok('homepage exposes user additions');
const build=read('tools/build.py');
for(const route of ['start.html','demo-lab.html','mission-studio.html','proof-cards.html']) if(!build.includes(route)) fail('build sitemap must include '+route);
ok('build pipeline includes user addition routes');
console.log('USER DELIGHT v16 PASS · browser-local autonomous demos verified');
