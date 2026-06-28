
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const must=['site/chronicle-compounding-lab.html','site/assets/chronicle-lab.css','site/assets/chronicle-lab.js','data/chronicle-compounding-lab-demo.json','schemas/chronicle-compounding-lab.schema.json','docs/CHRONICLE_COMPOUNDING_LAB_V20.md'];
let failures=[];
for(const f of must){if(!fs.existsSync(f)) failures.push('missing '+f)}
const html=fs.existsSync(must[0])?read(must[0]):'';
const js=fs.existsSync(must[2])?read(must[2]):'';
const css=fs.existsSync(must[1])?read(must[1]):'';
const data=JSON.parse(fs.existsSync(must[3])?read(must[3]):'{}');
for(const phrase of ['No Chronicle entry, no institutional memory','Verified work','institutional memory','CapabilityPackage','ChronicleEntry','SelectionCertificate','No wallet','No network request','No user data']){
  if(!(html+js).toLowerCase().includes(phrase.toLowerCase())) failures.push('missing phrase '+phrase);
}
for(const marker of ['buildDocket','GoalOSCommit','ProofPacket','SelectionCertificate','ChronicleEntry','CapabilityPackage','d.y-=p.v','networkRequests:0','walletCalls:0','externalActions:0','storageWrites:0']){
  if(!js.includes(marker)) failures.push('missing js marker '+marker);
}
for(const bad of ['fetch(','XMLHttpRequest','localStorage','sessionStorage','document.cookie','<form','https://unpkg','https://cdn','eth_requestAccounts','eth_sendTransaction','wallet_switchEthereumChain','approve(','MaxUint256']){
  if(html.includes(bad)||js.includes(bad)) failures.push('forbidden primitive '+bad);
}
if(!css.includes('radial-gradient')||!css.includes('@keyframes')) failures.push('missing dynamic visual CSS');
if(data.networkRequests!==0||data.walletCalls!==0||data.externalActions!==0||data.storageWrites!==0||data.userDataWanted!==false) failures.push('data boundary broken');
if(!Array.isArray(data.gates)||data.gates.length!==7) failures.push('must have seven Chronicle gates');
if(!Array.isArray(data.missionPresets)||data.missionPresets.length<5) failures.push('mission presets incomplete');
if(!data.protocolObjects.includes('ChronicleEntry')||!data.protocolObjects.includes('CapabilityPackage')) failures.push('protocol objects incomplete');
if(!html.includes('chronicle-lab.css')||!html.includes('chronicle-lab.js')) failures.push('page must load v20 assets');
if(failures.length){console.error('Chronicle Compounding Lab v20 FAIL'); for(const f of failures) console.error('- '+f); process.exit(1)}
console.log('Chronicle Compounding Lab v20 PASS · proof-to-memory public demo verified');
