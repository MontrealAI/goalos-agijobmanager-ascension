import fs from 'node:fs';
const route='dist/proof-conditioned-router-observatory.html';
const demo='dist/proof-conditioned-router-observatory-demo.json';
if(!fs.existsSync(route)) throw new Error('missing built route');
if(!fs.existsSync(demo)) throw new Error('missing built demo json');
const html=fs.readFileSync(route,'utf8');
const obj=JSON.parse(fs.readFileSync(demo,'utf8'));
for(const marker of ['Route the institution','R0','R5','GoalOSProofConditionedRoutingReceipt']){
  if(!html.includes(marker) && !JSON.stringify(obj).includes(marker)) throw new Error(`missing ${marker}`);
}
for(const bad of ['<form','localStorage','sessionStorage','fetch(','XMLHttpRequest','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','privateKey','document.cookie']){
  if(html.includes(bad)) throw new Error(`forbidden built primitive ${bad}`);
}
console.log('Proof-Conditioned Router Observatory build PASS');
