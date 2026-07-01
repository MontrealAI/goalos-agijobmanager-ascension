import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
const files=['site/loop-to-rsi-sovereign-governance.html','site/assets/loop-to-rsi-sovereign-governance.css','site/assets/loop-to-rsi-sovereign-governance.js','data/loop-to-rsi-sovereign-governance-demo.json','schemas/loop-to-rsi-sovereign-governance.schema.json','docs/LOOP_TO_RSI_SOVEREIGN_GOVERNANCE_V50.md'];
for(const f of files) ok(fs.existsSync(f),`required v50 file exists: ${f}`);
const html=fs.readFileSync('site/loop-to-rsi-sovereign-governance.html','utf8');
const js=fs.readFileSync('site/assets/loop-to-rsi-sovereign-governance.js','utf8');
ok(/From Loop to RSI/.test(html),'page names From Loop to RSI');
ok(/TARGET/.test(html)&&/PROMOTE/.test(html)&&/TEST-PLAN/.test(html),'page exposes RSI pipeline');
ok(/Search control/.test(html)&&/outcome authority/i.test(html),'page distinguishes search control from outcome authority');
ok(/Move-37/i.test(html),'page exposes Move-37 handling');
ok(/RSIDossier/.test(html+js),'page exports RSIDossier');
ok(/No account\. No form\. No wallet\. No token approval\. No network request/i.test(html),'page states public-safe posture');
ok(!/localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b|fetch\(|XMLHttpRequest/i.test(html+js),'forbidden public primitives absent');
const data=JSON.parse(fs.readFileSync('data/loop-to-rsi-sovereign-governance-demo.json','utf8'));
ok(data.posture.noWallet && data.posture.zeroNetwork && data.posture.noBrowserStorage && data.posture.noUserDataWanted,'data contract encodes public-safe posture');
ok(data.pipeline.length===8 && data.pipeline[0]==='TARGET' && data.pipeline[7]==='PROMOTE','data contract encodes RSI cycle');
ok(data.move37.includes('Stress-test') && data.move37.includes('Dossier bundle'),'data contract encodes Move-37 controls');
console.log('Loop to RSI Sovereign Governance v50 test PASS');
