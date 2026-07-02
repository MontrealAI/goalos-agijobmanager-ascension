import fs from 'node:fs';
const fail=m=>{console.error('FAIL · public trust checker v62: '+m);process.exit(1)};
for (const f of ['site/ask-goalos.html','site/assets/ask-goalos.js','site/assets/ask-goalos-page.js','data/ask-goalos-routing.json','docs/ASK_GOALOS_SOVEREIGN_ROUTER_V62.md']) if(!fs.existsSync(f)) fail('missing '+f);
const routing=JSON.parse(fs.readFileSync('data/ask-goalos-routing.json','utf8'));
if(!String(routing.version||'').includes('v62')) fail('routing data is not v62-compatible');
if(Number(routing.routeCount)<66 || Number(routing.routeCount)!==routing.routes.length) fail('route count mismatch');
const page=fs.readFileSync('site/ask-goalos.html','utf8');
for(const phrase of ['Sovereign question router · v62','QuestionRoutingReceipt','No network request','No browser storage','No user data retained']) if(!page.includes(phrase)) fail('ask page missing '+phrase);
const js=fs.readFileSync('site/assets/ask-goalos.js','utf8')+'\n'+fs.readFileSync('site/assets/ask-goalos-page.js','utf8');
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage.setItem','sessionStorage.setItem','document.cookie','ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','navigator.sendBeacon']) if(js.includes(forbidden)) fail('forbidden primitive '+forbidden);
for(const phrase of ['GoalOSQuestionRoutingReceipt','confidence','explicitly asks','GOALOS_ASK_ROUTER_V62']) if(!js.includes(phrase)) fail('router missing '+phrase);
if(fs.existsSync('dist/build-manifest.json')) {
  const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
  if(!String(bm.release||'').includes('v62')) fail('dist build manifest missing v62');
}
console.log('PASS · public trust checker v62 verified Ask GoalOS Sovereign Router and public-safe boundary');
