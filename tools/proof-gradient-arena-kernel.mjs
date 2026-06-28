
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
let failures=[];
const required=['site/proof-gradient-arena.html','site/assets/proof-gradient-arena.js','site/assets/proof-gradient-arena.css','data/proof-gradient-arena-demo.json','schemas/proof-gradient-arena.schema.json','docs/PROOF_GRADIENT_ARENA_V19.md'];
for(const p of required) if(!fs.existsSync(p)) failures.push('missing '+p);
const html=fs.existsSync(required[0])?read(required[0]):'';
const js=fs.existsSync(required[1])?read(required[1]):'';
const build=fs.existsSync('tools/build.py')?read('tools/build.py'):'';
const pkg=fs.existsSync('package.json')?read('package.json'):'';
for(const route of ['proof-gradient-arena.html','proof-gradient-arena-demo.json']) if(!build.includes(route)) failures.push('build missing '+route);
for(const marker of ['proof-gradient-arena.test.mjs','proof-gradient-arena-kernel.mjs','proof-gradient-arena']) if(!pkg.includes(marker)) failures.push('package missing '+marker);
for(const marker of ['Score is advisory','Gates are mandatory','SelectionCertificate','High score cannot bypass']) if(!(html+js).includes(marker)) failures.push('missing teaching marker '+marker);
for(const bad of ['eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','approve(','MaxUint256','localStorage','sessionStorage','document.cookie','fetch(','XMLHttpRequest','navigator.sendBeacon']) if((html+js).includes(bad)) failures.push('forbidden public demo primitive '+bad);
if(!js.includes('d.y-=p.v')) failures.push('ascendant field not preserved in v19 page');
if(failures.length){console.error('Proof Gradient Arena kernel FAIL'); for(const f of failures) console.error('- '+f); process.exit(1)}
const report={status:'PASS',release:'v19-proof-gradient-arena',page:'proof-gradient-arena.html',networkRequests:0,walletCalls:0,externalActions:0,userDataWanted:false};
fs.writeFileSync('PROOF_GRADIENT_ARENA_V19_REPORT.json',JSON.stringify(report,null,2));
fs.writeFileSync('PROOF_GRADIENT_ARENA_V19_REPORT.md','# Proof Gradient Arena v19 Report\n\nStatus: **PASS**\n\nBrowser-local Selection Gate public demonstration verified.\n\nNo wallet. No network. No user data. No external action.\n');
console.log('Proof Gradient Arena kernel PASS · v19 report emitted');
