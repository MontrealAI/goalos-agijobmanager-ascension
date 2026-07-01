import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
const required=['site/asi-proof-horizon-console.html','site/assets/asi-proof-horizon-console.css','site/assets/asi-proof-horizon-console.js','data/asi-proof-horizon-console-demo.json','schemas/asi-proof-horizon-console.schema.json','docs/ASI_PROOF_HORIZON_CONSOLE_V53.md'];
for(const f of required) ok(fs.existsSync(f),`required v53 file exists: ${f}`);
const html=fs.readFileSync('site/asi-proof-horizon-console.html','utf8');
const js=fs.readFileSync('site/assets/asi-proof-horizon-console.js','utf8');
ok(/ASI Proof Horizon Console/.test(html),'page names ASI Proof Horizon Console');
ok(/HorizonProofDocket/.test(html+js),'page exports HorizonProofDocket');
ok(/Capability rises/.test(html)&&/Authority narrows/.test(html),'page communicates capability-authority law');
ok(/No account\. No form\. No wallet\. No token approval\. No network request/i.test(html),'page states public-safe posture');
ok(/ASI is handled here as a proof horizon/i.test(html),'page frames ASI as proof horizon');
ok(!/Loading…|>\s*Loading\s*<|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b|fetch\(|XMLHttpRequest/i.test(html+js),'forbidden public primitives absent');
const data=JSON.parse(fs.readFileSync('data/asi-proof-horizon-console-demo.json','utf8'));
ok(data.posture.noWallet && data.posture.zeroNetwork && data.posture.noBrowserStorage && data.posture.noUserDataWanted,'data contract encodes public-safe posture');
ok(data.pipeline.length===12 && data.pipeline[0]==='LOOP' && data.pipeline.at(-1)==='CHRONICLE','data contract encodes full loop-rsi-asi horizon pipeline');
ok(data.gates.includes('architect_validator_council') && data.gates.includes('human_boundary'),'data contract includes council and human boundary gates');
ok(/No achieved AGI/.test(data.claimBoundary)&&/achieved ASI/.test(data.claimBoundary),'claim boundary is explicit');
console.log('ASI Proof Horizon Console v53 test PASS');
