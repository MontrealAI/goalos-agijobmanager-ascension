
import fs from 'node:fs';
const fail=m=>{console.error('FAIL · ask-goalos v60: '+m);process.exit(1)};
const files=['site/ask-goalos.html','site/assets/ask-goalos.css','site/assets/ask-goalos.js','site/assets/ask-goalos-data.js','site/assets/ask-goalos-page.js','site/assets/ask-goalos-page.css','data/ask-goalos-routing.json','schemas/ask-goalos-routing.schema.json'];
for (const f of files) if(!fs.existsSync(f)) fail('missing '+f);
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
if(manifest.routeCount!==66) fail('expected 66 routes, got '+manifest.routeCount);
if(!manifest.pages.some(p=>p.href==='ask-goalos.html')) fail('ask-goalos route missing from canonical manifest');
const page=fs.readFileSync('site/ask-goalos.html','utf8');
for (const phrase of ['No network request','No browser storage','No user data retained','QuestionRoutingReceipt']) if(!page.includes(phrase)) fail('ask page missing '+phrase);
const js=fs.readFileSync('site/assets/ask-goalos.js','utf8')+'\n'+fs.readFileSync('site/assets/ask-goalos-page.js','utf8');
for (const forbidden of ['fetch(','XMLHttpRequest','localStorage.setItem','sessionStorage.setItem','document.cookie','ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','navigator.sendBeacon']) if(js.includes(forbidden)) fail('forbidden primitive '+forbidden);
const routing=JSON.parse(fs.readFileSync('data/ask-goalos-routing.json','utf8'));
if(routing.routeCount!==66 || routing.routes.length!==66) fail('routing data route count mismatch');
for (const id of ['start','proof','settlement','loop','rsi','asi','legal','agialpha','all']) if(!routing.intents.some(i=>i.id===id)) fail('missing intent '+id);
console.log('PASS · Ask GoalOS Concierge v60 is browser-local, route-aware, and public-safe');
