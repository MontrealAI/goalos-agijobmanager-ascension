import fs from 'node:fs';
const fail=m=>{console.error('FAIL · public trust checker v66: '+m);process.exit(1)};
for(const f of ['site/goalos-care-command.html','site/assets/goalos-care-command.js','data/goalos-care-command-demo.json','schemas/goalos-care-command.schema.json','data/canonical-route-manifest.json']) if(!fs.existsSync(f)) fail('missing '+f);
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8')); const pages=manifest.pages||[];
if(!pages.some(p=>p.href==='goalos-care-command.html')) fail('canonical manifest missing care command');
if(Number(manifest.routeCount)!==pages.length) fail('route count mismatch');
if(Number(manifest.routeCount)<70) fail('route count below v66 expectation');
const index=fs.readFileSync('site/index.html','utf8');
for(const phrase of ['goalos-care-command.html','What do you want GoalOS to take care of?','Everything remains available']) if(!index.includes(phrase)) fail('homepage missing '+phrase);
const js=fs.readFileSync('site/assets/goalos-care-command.js','utf8');
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage.setItem','sessionStorage.setItem','document.cookie','navigator.sendBeacon','ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction']) if(js.includes(forbidden)) fail('forbidden primitive '+forbidden);
if(fs.existsSync('dist/build-manifest.json')){const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8')); if(!String(bm.release||'').includes('v66')) fail('dist build manifest missing v66');}
console.log('PASS · public trust checker v66 verified Care Command, route count, chat routing, and public-safe boundary');
