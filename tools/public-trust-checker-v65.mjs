import fs from 'node:fs';
const fail=m=>{console.error('FAIL · public trust checker v65: '+m);process.exit(1)};
for(const f of ['site/goalos-take-care.html','site/assets/goalos-take-care.js','data/goalos-take-care-demo.json','schemas/goalos-take-care.schema.json','data/canonical-route-manifest.json']) if(!fs.existsSync(f)) fail('missing '+f);
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8')); const pages=manifest.pages||[];
if(!pages.some(p=>p.href==='goalos-take-care.html')) fail('canonical manifest missing take-care console');
if(Number(manifest.routeCount)!==pages.length) fail('route count mismatch');
if(Number(manifest.routeCount)<69) fail('route count below v65 expectation');
const index=fs.readFileSync('site/index.html','utf8');
for(const phrase of ['What do you want GoalOS to take care of?','goalos-take-care.html','Everything remains available']) if(!index.includes(phrase)) fail('homepage missing '+phrase);
const js=fs.readFileSync('site/assets/goalos-take-care.js','utf8');
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage.setItem','sessionStorage.setItem','document.cookie','navigator.sendBeacon','ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction']) if(js.includes(forbidden)) fail('forbidden primitive '+forbidden);
if(fs.existsSync('dist/build-manifest.json')){const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8')); if(!String(bm.release||'').includes('v65')) fail('dist build manifest missing v65');}
console.log('PASS · public trust checker v65 verified front-and-center command console, route count, and public-safe boundary');
