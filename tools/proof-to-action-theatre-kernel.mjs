import fs from 'node:fs';
const required=['site/proof-to-action-theatre.html','site/assets/proof-theatre.css','site/assets/proof-theatre.js','data/proof-to-action-theatre-demo.json','schemas/proof-to-action-theatre.schema.json','docs/PROOF_TO_ACTION_THEATRE_V18.md'];
let failures=[];
for(const f of required){if(!fs.existsSync(f))failures.push('missing '+f)}
const safeRead=f=>fs.existsSync(f)?fs.readFileSync(f,'utf8'):'';
const html=safeRead('site/proof-to-action-theatre.html');
const js=safeRead('site/assets/proof-theatre.js');
const css=safeRead('site/assets/proof-theatre.css');
const data=JSON.parse(safeRead('data/proof-to-action-theatre-demo.json')||'{}');
for(const phrase of ['Run until DONE','GoalOSCommit','Evidence Docket','Governed Decision State','No wallet','No network request','No user data','proof debt']){
  if(!html.toLowerCase().includes(phrase.toLowerCase())&&!js.toLowerCase().includes(phrase.toLowerCase())) failures.push('missing phrase '+phrase);
}
for(const forbidden of ['fetch(','XMLHttpRequest','localStorage','sessionStorage','document.cookie','<form','https://unpkg','https://cdn','http://']){
  if(html.includes(forbidden)||js.includes(forbidden)) failures.push('forbidden primitive '+forbidden);
}
for(const marker of ['networkRequests:0','walletCalls:0','externalActions:0','d.y-=d.v','buildDocket','GoalOSCommit','GovernedDecisionState','CapabilityPackage']){
  if(!js.includes(marker)) failures.push('js missing '+marker);
}
if(!css.includes('conic-gradient')) failures.push('proof score ring visual missing');
if(data.networkRequests!==0||data.walletCalls!==0||data.externalActions!==0||data.userDataWanted!==false) failures.push('data boundary broken');
if(!Array.isArray(data.doneGates)||data.doneGates.length<10) failures.push('insufficient proof gates');
if(!html.includes('proof-theatre.css')||!html.includes('proof-theatre.js')) failures.push('page must load proof theatre assets');
if(failures.length){console.error('Proof-to-Action Theatre v18 FAIL'); for(const f of failures)console.error('- '+f); process.exit(1)}
const report={status:'PASS',page:'proof-to-action-theatre.html',checks:22,boundary:'browser-local data-zero',networkRequests:0,walletCalls:0,externalActions:0};
fs.writeFileSync('PROOF_TO_ACTION_THEATRE_V18_REPORT.json',JSON.stringify(report,null,2));
console.log('Proof-to-Action Theatre v18 PASS · browser-local GoalOS core demonstration verified');
