
import fs from 'node:fs';
const fail=m=>{console.error('FAIL · GoalOS Take-Care Console v65 test: '+m);process.exit(1)};
for(const f of ['site/goalos-take-care.html','site/assets/goalos-take-care.css','site/assets/goalos-take-care.js','data/goalos-take-care-demo.json','schemas/goalos-take-care.schema.json','docs/GOALOS_TAKE_CARE_CONSOLE_V65.md','docs/releases/V65_GOALOS_TAKE_CARE_CONSOLE.md']) if(!fs.existsSync(f)) fail('missing '+f);
const html=fs.readFileSync('site/goalos-take-care.html','utf8');
for(const phrase of ['What do you want GoalOS to take care of?','GoalOSTakeCareReceipt','Let GoalOS take care of it','No browser storage','No user data retained','No production authority','No network request from the console']) if(!html.includes(phrase)) fail('page missing '+phrase);
const js=fs.readFileSync('site/assets/goalos-take-care.js','utf8');
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage.setItem','sessionStorage.setItem','document.cookie','navigator.sendBeacon','ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','<form']) if(js.includes(forbidden)) fail('forbidden primitive '+forbidden);
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
if(!manifest.pages.some(p=>p.href==='goalos-take-care.html')) fail('canonical manifest missing route');
if(manifest.routeCount!==manifest.pages.length) fail('route count mismatch');
if(manifest.routeCount<69) fail('route count below v65 expectation');
const index=fs.readFileSync('site/index.html','utf8');
if(!index.includes('goalos-take-care.html')) fail('homepage missing Take-Care front door');
if(!index.includes('data-home-console')) fail('homepage missing front-and-center command box compatibility marker');
console.log('PASS · GoalOS Take-Care Console v65 page, homepage front door, data, schema, and public-safe guard verified');
