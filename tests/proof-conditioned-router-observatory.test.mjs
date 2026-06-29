import fs from 'node:fs';
import vm from 'node:vm';
const must=[
  'site/proof-conditioned-router-observatory.html','site/assets/router-observatory.css','site/assets/router-observatory.js','data/proof-conditioned-router-observatory-demo.json','schemas/proof-conditioned-router-observatory.schema.json','docs/PROOF_CONDITIONED_ROUTER_OBSERVATORY_V30.md'
];
for(const f of must){ if(!fs.existsSync(f)) throw new Error(`missing ${f}`); }
const html=fs.readFileSync('site/proof-conditioned-router-observatory.html','utf8');
const js=fs.readFileSync('site/assets/router-observatory.js','utf8');
const css=fs.readFileSync('site/assets/router-observatory.css','utf8');
const data=JSON.parse(fs.readFileSync('data/proof-conditioned-router-observatory-demo.json','utf8'));
for(const marker of ['R0','R1','R2','R3','R4','R5','GoalOSProofConditionedRoutingReceipt','Proof bundle required','Validator set assigned','Public/private boundary preserved']){
  if(!(html+js+JSON.stringify(data)).includes(marker)) throw new Error(`missing marker ${marker}`);
}
if(data.routerFamily.length!==6) throw new Error('router family must contain exactly 6 routers');
if(data.safetyBoundary.networkRequests!==false || data.safetyBoundary.wallet!==false || data.safetyBoundary.userDataWanted!==false) throw new Error('safety boundary must be default-deny');
for(const bad of ['<form','localStorage','sessionStorage','fetch(','XMLHttpRequest','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','privateKey','document.cookie']){
  if((html+js+css).includes(bad)) throw new Error(`forbidden primitive ${bad}`);
}
if(!js.includes('d.y-=d.v')) throw new Error('particles must ascend upward');
new vm.Script(js, {filename:'router-observatory.js'});
console.log('Proof-Conditioned Router Observatory v30 PASS');
