import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
const required=['site/loop-to-rsi-to-asi-superintelligence.html','site/assets/loop-to-rsi-to-asi-superintelligence.css','site/assets/loop-to-rsi-to-asi-superintelligence.js','data/loop-to-rsi-to-asi-superintelligence-demo.json','schemas/loop-to-rsi-to-asi-superintelligence.schema.json','docs/LOOP_TO_RSI_TO_ASI_SUPERINTELLIGENCE_V52.md'];
for(const f of required) ok(fs.existsSync(f),`required v52 file exists: ${f}`);
const html=fs.readFileSync('site/loop-to-rsi-to-asi-superintelligence.html','utf8');
const js=fs.readFileSync('site/assets/loop-to-rsi-to-asi-superintelligence.js','utf8');
ok(/Loop → RSI → ASI Governance Console/.test(html),'page names Loop → RSI → ASI Governance Console');
ok(/HorizonDossier/.test(html+js),'page exports HorizonDossier');
ok(/No account\. No form\. No wallet\. No token approval\. No network request/i.test(html),'page states public-safe posture');
ok(/ASI is a governance horizon/i.test(html+js),'page includes claim-boundary horizon language');
ok(/RiskGate|EvidenceGate|BaselineGate|ValidatorQuorum/i.test(fs.readFileSync('data/loop-to-rsi-to-asi-superintelligence-demo.json','utf8')),'data contract exposes hard gates');
ok(!/localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b|fetch\(|XMLHttpRequest/i.test(html+js),'forbidden public primitives absent');
const data=JSON.parse(fs.readFileSync('data/loop-to-rsi-to-asi-superintelligence-demo.json','utf8'));
ok(data.posture.noWallet && data.posture.zeroNetwork && data.posture.noBrowserStorage && data.posture.noUserDataWanted,'data contract encodes public-safe posture');
ok(data.pipeline.length===8 && data.pipeline[0]==='LOOP' && data.pipeline[7]==='DOSSIER','data contract encodes full loop-to-ASI governance pipeline');
ok(data.claimBoundary.includes('No achieved AGI') && data.claimBoundary.includes('ASI'),'claim boundary is explicit');
console.log('Loop to RSI to ASI Superintelligence v52 test PASS');
