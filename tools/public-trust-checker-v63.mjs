import fs from 'node:fs';
const fail=m=>{console.error('FAIL · public trust checker v63: '+m);process.exit(1)};
for(const f of ['site/goalos-mission-autopilot.html','site/assets/mission-autopilot.js','data/mission-autopilot-demo.json','schemas/mission-autopilot.schema.json','docs/MISSION_AUTOPILOT_V63.md','data/canonical-route-manifest.json']) if(!fs.existsSync(f)) fail('missing '+f);
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
const pages=manifest.pages||[];
if(!pages.some(p=>p.href==='goalos-mission-autopilot.html')) fail('canonical manifest missing v63 route');
if(Number(manifest.routeCount)!==pages.length) fail('route count mismatch');
if(Number(manifest.routeCount)<67) fail('route count below v63 expectation');
const html=fs.readFileSync('site/goalos-mission-autopilot.html','utf8');
for(const phrase of ['GoalOS Mission Autopilot','MissionAutopilotReceipt','Let GoalOS take care of it','No network request','No browser storage','No user data retained','No production authority']) if(!html.includes(phrase)) fail('page missing '+phrase);
const js=fs.readFileSync('site/assets/mission-autopilot.js','utf8');
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage.setItem','sessionStorage.setItem','document.cookie','ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','navigator.sendBeacon']) if(js.includes(forbidden)) fail('forbidden primitive '+forbidden);
if(fs.existsSync('dist/build-manifest.json')){const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8')); if(!String(bm.release||'').includes('v63')) fail('dist build manifest missing v63');}
console.log('PASS · public trust checker v63 verified Mission Autopilot, route count, and public-safe boundary');
