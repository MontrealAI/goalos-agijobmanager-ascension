import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
const files=['site/superintelligence-proof-governance-console.html','site/assets/superintelligence-proof-governance-console.css','site/assets/superintelligence-proof-governance-console.js','data/superintelligence-proof-governance-console-demo.json','schemas/superintelligence-proof-governance-console.schema.json','docs/SUPERINTELLIGENCE_PROOF_GOVERNANCE_CONSOLE_V54.md'];
for(const f of files) ok(fs.existsSync(f),`required v54 file exists: ${f}`);
const html=fs.readFileSync('site/superintelligence-proof-governance-console.html','utf8');
const js=fs.readFileSync('site/assets/superintelligence-proof-governance-console.js','utf8');
ok(/Superintelligence Proof Governance Console/.test(html),'page names Superintelligence Proof Governance Console');
ok(/SuperintelligenceGovernanceDocket/.test(html+js),'page exports SuperintelligenceGovernanceDocket');
ok(/Capability can rise/.test(html)&&/Authority must narrow/.test(html),'page communicates capability-authority law');
ok(/Search control is not outcome authority/.test(html),'page preserves search-control boundary');
ok(/No account\. No form\. No wallet\. No token approval\. No network request/i.test(html),'page states public-safe posture');
ok(/not an achievement claim/i.test(html),'page frames ASI as governance horizon and not achievement claim');
ok(!/Loading…|>\s*Loading\s*<|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b|fetch\(|XMLHttpRequest/i.test(html+js),'forbidden public primitives absent');
const data=JSON.parse(fs.readFileSync('data/superintelligence-proof-governance-console-demo.json','utf8'));
ok(data.posture.noWallet && data.posture.zeroNetwork && data.posture.noBrowserStorage && data.posture.noUserDataWanted,'data contract encodes public-safe posture');
ok(data.corridor.length===14 && data.corridor[0]==='PROMPT' && data.corridor.at(-1)==='CHRONICLE','data contract encodes full loop-rsi-asi-chronicled corridor');
ok(data.hardGates.includes('architect_validator_council') && data.hardGates.includes('human_boundary'),'data contract includes council and human boundary gates');
ok(/not achieved capability claims/i.test(data.claimBoundary),'claim boundary is explicit');
console.log('Superintelligence Proof Governance Console v54 test PASS');
