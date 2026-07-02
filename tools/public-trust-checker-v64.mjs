import fs from 'node:fs';
const fail=m=>{console.error('FAIL · public trust checker v64: '+m);process.exit(1)};
for(const f of ['site/goalos-command-console.html','site/assets/goalos-command-console.js','data/goalos-command-console-demo.json','schemas/goalos-command-console.schema.json','data/canonical-route-manifest.json']) if(!fs.existsSync(f)) fail('missing '+f);
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8')); const pages=manifest.pages||[];
if(!pages.some(p=>p.href==='goalos-command-console.html')) fail('canonical manifest missing command console');
if(Number(manifest.routeCount)!==pages.length) fail('route count mismatch');
if(Number(manifest.routeCount)<68) fail('route count below v64 expectation');
const index=fs.readFileSync('site/index.html','utf8');
for(const phrase of ['What do you want GoalOS to take care of?','goalos-command-console.html','Everything remains available']) if(!index.includes(phrase)) fail('homepage missing '+phrase);
const js=fs.readFileSync('site/assets/goalos-command-console.js','utf8');
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage.setItem','sessionStorage.setItem','document.cookie','navigator.sendBeacon','ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction']) if(js.includes(forbidden)) fail('forbidden primitive '+forbidden);
if(fs.existsSync('dist/build-manifest.json')){const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8')); if(!String(bm.release||'').includes('v64')) fail('dist build manifest missing v64');}
console.log('PASS · public trust checker v64 verified front-and-center command console, route count, and public-safe boundary');
