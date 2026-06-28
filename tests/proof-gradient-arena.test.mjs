
import fs from 'node:fs';
const read=p=>fs.readFileSync(p,'utf8');
const must=['site/proof-gradient-arena.html','site/assets/proof-gradient-arena.css','site/assets/proof-gradient-arena.js','data/proof-gradient-arena-demo.json','schemas/proof-gradient-arena.schema.json','docs/PROOF_GRADIENT_ARENA_V19.md'];
let failures=[];
for(const f of must){if(!fs.existsSync(f)) failures.push('missing '+f)}
const html=fs.existsSync(must[0])?read(must[0]):'';
const js=fs.existsSync(must[2])?read(must[2]):'';
const css=fs.existsSync(must[1])?read(must[1]):'';
const data=JSON.parse(fs.existsSync(must[3])?read(must[3]):'{}');
for(const phrase of ['Score is advisory','Gates are mandatory','SelectionCertificate','ProofValid','EvalPass','RollbackReady','ChallengeWindowCleared','No wallet','No network request','No user data']){
  if(!(html+js).toLowerCase().includes(phrase.toLowerCase())) failures.push('missing phrase '+phrase);
}
for(const marker of ['buildCertificate','buildDocket','GoalOSCommit','ProofPacket','EvalAttestation','SelectionCertificate','RollbackReceipt','d.y-=p.v','networkRequests:0','walletCalls:0','externalActions:0']){
  if(!js.includes(marker)) failures.push('missing js marker '+marker);
}
for(const bad of ['fetch(','XMLHttpRequest','localStorage','sessionStorage','document.cookie','<form','https://unpkg','https://cdn','http://']){
  if(html.includes(bad)||js.includes(bad)) failures.push('forbidden primitive '+bad);
}
if(!css.includes('conic-gradient')) failures.push('missing proof gradient visual');
if(data.networkRequests!==0||data.walletCalls!==0||data.externalActions!==0||data.userDataWanted!==false||data.storageWrites!==0) failures.push('data boundary broken');
if(!Array.isArray(data.hardGates)||data.hardGates.length!==7) failures.push('hard gates must have exactly seven gates');
if(!Array.isArray(data.candidates)||data.candidates.length<4) failures.push('candidate set incomplete');
if(!data.candidates.some(c=>Object.values(c.gates||{}).every(Boolean))) failures.push('must include at least one promotable candidate');
if(!data.candidates.some(c=>!Object.values(c.gates||{}).every(Boolean))) failures.push('must include at least one rejected candidate');
if(!html.includes('proof-gradient-arena.css')||!html.includes('proof-gradient-arena.js')) failures.push('page must load v19 assets');
if(failures.length){console.error('Proof Gradient Arena v19 FAIL'); for(const f of failures) console.error('- '+f); process.exit(1)}
console.log('Proof Gradient Arena v19 PASS · Selection Gate public demo verified');
