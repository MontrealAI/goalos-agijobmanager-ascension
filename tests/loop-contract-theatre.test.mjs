import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
for(const f of ['site/loop-contract-theatre.html','site/assets/loop-contract-theatre.css','site/assets/loop-contract-theatre.js','data/loop-contract-theatre-demo.json','schemas/loop-contract-theatre.schema.json','docs/LOOP_CONTRACT_THEATRE_V47.md']) ok(fs.existsSync(f),`required v47 file exists: ${f}`);
const html=fs.readFileSync('site/loop-contract-theatre.html','utf8');
ok(/Loop Contract Theatre/.test(html),'page names Loop Contract Theatre');
ok(/contract first|Contract first/i.test(html),'page exposes contract-first loop');
ok(/virtual disk/i.test(html),'page explains virtual disk state');
ok(/restart/i.test(html),'page exposes restart-safe loop');
ok(/LoopReceipt/.test(html),'page exports LoopReceipt');
ok(/no account, no form, no wallet, no network request/i.test(html),'page states public-safe posture');
ok(!/localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b|fetch\(|XMLHttpRequest/i.test(html+fs.readFileSync('site/assets/loop-contract-theatre.js','utf8')),'forbidden public primitives absent');
const data=JSON.parse(fs.readFileSync('data/loop-contract-theatre-demo.json','utf8'));
ok(data.posture.noWallet && data.posture.noNetwork && data.posture.noBrowserStorage && data.posture.noUserDataWanted,'data contract encodes public-safe posture');
ok(data.loopRules.length>=9,'data contract encodes loop rules');
ok(data.proofLifecycle.includes('Evidence Docket') && data.proofLifecycle.includes('Chronicle'),'data contract connects loop to GoalOS proof lifecycle');
console.log('Loop Contract Theatre v47 test PASS');
