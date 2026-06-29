import fs from 'node:fs';
const required=[
  'site/action-graph-handoff.html',
  'site/assets/action-graph-handoff.css',
  'site/assets/action-graph-handoff.js',
  'data/action-graph-handoff-demo.json',
  'schemas/action-graph-handoff.schema.json',
  'docs/ACTION_GRAPH_HANDOFF_V28.md'
];
for(const file of required){if(!fs.existsSync(file)) throw new Error(`missing ${file}`)}
const html=fs.readFileSync('site/action-graph-handoff.html','utf8');
const js=fs.readFileSync('site/assets/action-graph-handoff.js','utf8');
const data=JSON.parse(fs.readFileSync('data/action-graph-handoff-demo.json','utf8'));
const blob=html+'\n'+js+'\n'+JSON.stringify(data);
for(const marker of ['ActionGraphHandoffReceipt','GovernedDecisionState','ActionGraph','RollbackPlan','ChronicleEntry','No user data wanted','no wallet','no network','no transaction','HUMAN_REVIEW_READY_ACTION_GRAPH','EVIDENCE_DEBT_RETURN_TO_PROOF','ROLLBACK_REQUIRED']){
  if(!blob.includes(marker)) throw new Error(`missing marker ${marker}`)
}
for(const forbidden of ['<form','localStorage','sessionStorage','XMLHttpRequest','fetch(','sendTransaction(','eth_sendTransaction','wallet_addEthereumChain','wallet_switchEthereumChain','ethereum.request({method:\'eth_requestAccounts\'']){
  if(blob.includes(forbidden)) throw new Error(`forbidden primitive ${forbidden}`)
}
if(!js.includes('d.y-=d.v')) throw new Error('ascendant particle motion missing');
if(data.presets.length<4) throw new Error('not enough presets');
if(data.gates.length<8) throw new Error('not enough gates');
if(data.handoffObjects.length<8) throw new Error('not enough handoff objects');
if(!data.publicSafety.noUserDataWanted || !data.publicSafety.noWalletConnection || !data.publicSafety.noNetworkRequest) throw new Error('public safety boundary incomplete');
console.log('Action Graph Handoff v28 PASS');
