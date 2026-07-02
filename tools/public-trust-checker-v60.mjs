
import fs from 'node:fs';
const fail=m=>{console.error('FAIL · public trust v60: '+m);process.exit(1)};
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
if(manifest.routeCount!==manifest.pages.length) fail('route count mismatch');
if(manifest.routeCount!==66) fail('expected 66 routes');
for(const p of manifest.pages){if(!fs.existsSync('site/'+p.href)) fail('missing route '+p.href)}
for(const f of ['site/ask-goalos.html','site/assets/ask-goalos.js','site/assets/ask-goalos-data.js','data/ask-goalos-routing.json']) if(!fs.existsSync(f)) fail('missing '+f);
const js=fs.readFileSync('site/assets/ask-goalos.js','utf8')+fs.readFileSync('site/assets/ask-goalos-page.js','utf8');
for(const forbidden of ['fetch(','XMLHttpRequest','document.cookie','localStorage.setItem','sessionStorage.setItem','navigator.sendBeacon','ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction']) if(js.includes(forbidden)) fail('forbidden primitive '+forbidden);
console.log('PASS · public trust checker v60 verified Ask GoalOS and '+manifest.routeCount+' routes');
