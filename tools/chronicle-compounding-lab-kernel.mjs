
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
let failures=[];
const required=['site/chronicle-compounding-lab.html','site/assets/chronicle-lab.js','site/assets/chronicle-lab.css','data/chronicle-compounding-lab-demo.json','schemas/chronicle-compounding-lab.schema.json','docs/CHRONICLE_COMPOUNDING_LAB_V20.md'];
for(const p of required) if(!fs.existsSync(p)) failures.push('missing '+p);
const html=fs.existsSync(required[0])?read(required[0]):'';
const js=fs.existsSync(required[1])?read(required[1]):'';
const build=fs.existsSync('tools/build.py')?read('tools/build.py'):'';
const pkg=fs.existsSync('package.json')?read('package.json'):'';
for(const route of ['chronicle-compounding-lab.html','chronicle-compounding-lab-demo.json']) if(!build.includes(route)) failures.push('build missing '+route);
for(const marker of ['chronicle-compounding-lab.test.mjs','chronicle-compounding-lab-kernel.mjs','chronicle-compounding']) if(!pkg.includes(marker)) failures.push('package missing '+marker);
for(const marker of ['No Chronicle entry, no institutional memory','ChronicleEntry','CapabilityPackage','accepted proof became reusable capability']) if(!(html+js).includes(marker)) failures.push('missing teaching marker '+marker);
for(const bad of ['eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','approve(','MaxUint256','localStorage','sessionStorage','document.cookie','fetch(','XMLHttpRequest','navigator.sendBeacon']) if((html+js).includes(bad)) failures.push('forbidden public demo primitive '+bad);
if(!js.includes('d.y-=p.v')) failures.push('ascendant particle motion not preserved');
if(failures.length){console.error('Chronicle Compounding Lab kernel FAIL'); for(const f of failures) console.error('- '+f); process.exit(1)}
const report={status:'PASS',release:'v20-chronicle-compounding-lab',page:'chronicle-compounding-lab.html',networkRequests:0,walletCalls:0,externalActions:0,userDataWanted:false,storageWrites:0};
fs.writeFileSync('CHRONICLE_COMPOUNDING_LAB_V20_REPORT.json',JSON.stringify(report,null,2));
fs.writeFileSync('CHRONICLE_COMPOUNDING_LAB_V20_REPORT.md','# Chronicle Compounding Lab v20 Report\n\nStatus: **PASS**\n\nBrowser-local proof-to-memory demonstration verified.\n\nNo wallet. No network. No storage. No user data. No external action.\n');
console.log('Chronicle Compounding Lab kernel PASS · v20 report emitted');
