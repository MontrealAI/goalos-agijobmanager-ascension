import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=p=>fs.readFileSync(path.join(root,p),'utf8');
const exists=p=>fs.existsSync(path.join(root,p));
const fail=m=>{throw new Error(m)};
const ok=m=>console.log('PASS · '+m);
const page='site/coordination-lab.html';
if(!exists(page)) fail('missing coordination lab page');
const html=read(page);
for(const marker of ['Large multi-agent systems coordinate to maximum effect','Run proof cycle','Download Evidence Docket','GoalOSCommit','No wallet','No network','no user data wanted']){
  if(!html.includes(marker)) fail('coordination lab missing marker '+marker);
}
if(/<form\b/i.test(html)) fail('coordination lab must not contain form tags');
if(!html.includes('assets/institution.css') || !html.includes('assets/institution.js')) fail('coordination lab must load institution assets');
ok('coordination lab page exposes public-safe local proof institution UX');
const js=read('site/assets/institution.js');
for(const marker of ['d.y-=d.v','GoalOSCommit','RunCommitment','ProofPacket','EvalAttestation','SelectionCertificate','ChronicleEntry','CapabilityPackage','networkRequests:0','walletCalls:0','externalActions:0']){
  if(!js.includes(marker)) fail('institution.js missing marker '+marker);
}
if(!js.includes('AIWork = Output × Proof × Validation × Settlement × Reuse') && !js.includes('AI Work = Output × Proof × Validation × Settlement × Reuse')) fail('institution.js missing AI Work equation');
if(!js.includes('tokenAvailabilityFromSite:false') && !js.includes('noTokenAvailabilityFromSite:true')) fail('institution.js missing token availability boundary');
for(const bad of ['eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','approve(','MaxUint256','localStorage','sessionStorage','document.cookie','fetch(','XMLHttpRequest','navigator.sendBeacon','sendBeacon']){
  if(js.includes(bad)) fail('institution.js contains forbidden public-demo primitive '+bad);
}
ok('institution javascript is local-only, ascendant, wallet-free, and docket-emitting');
const data=JSON.parse(read('data/proof-governed-institution-demo.json'));
if(data.schema!=='goalos.proof_governed_multi_agent_institution.v17') fail('bad institution schema id');
if(data.thesis!=='Large multi-agent systems coordinate to maximum effect when they become proof-governed sovereign institutions.') fail('thesis mismatch');
if(!Array.isArray(data.gates)||data.gates.length!==10) fail('institution demo must have ten gates');
for(const k of ['accounts','forms','analytics','cookies','storage','walletConnection','networkRequests','externalActions','userDataWanted']){
  if(data.browserLocalBoundary[k]!==false) fail('browser-local boundary must be false for '+k);
}
ok('institution data contract enforces browser-local Data-Zero posture');
const build=read('tools/build.py');
for(const route of ['coordination-lab.html','proof-governed-institution-demo.json']) if(!build.includes(route)) fail('build pipeline missing route '+route);
ok('build pipeline publishes coordination lab and conformance JSON');
const idx=read('site/index.html');
if(!idx.includes('coordination-lab.html')||!idx.includes('Proof-governed multi-agent institution')) fail('homepage must expose coordination lab');
ok('homepage exposes proof-governed institution addition');
console.log('PROOF-GOVERNED INSTITUTION v17 PASS · browser-local coordination lab verified');
