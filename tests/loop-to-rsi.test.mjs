
import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
const files=['site/loop-to-rsi.html','site/assets/loop-to-rsi.css','site/assets/loop-to-rsi.js','data/loop-to-rsi-demo.json','schemas/loop-to-rsi.schema.json','docs/LOOP_TO_RSI_V50.md'];
for(const f of files) ok(fs.existsSync(f),`required v50 file exists: ${f}`);
const html=fs.readFileSync('site/loop-to-rsi.html','utf8');
const js=fs.readFileSync('site/assets/loop-to-rsi.js','utf8');
ok(/From Loop to RSI/.test(html),'page names From Loop to RSI');
ok(/TARGET/.test(html)&&/PROMOTE/.test(html),'page exposes RSI pipeline');
ok(/Search control.*outcome authority|outcome authority/i.test(html),'page exposes search-control boundary');
ok(/Move-37|Move37/.test(html+js),'page exposes Move-37 handling');
ok(/RSIDossier/.test(html+js),'page exports RSIDossier');
ok(/No account.*No form.*No wallet.*No token approval.*No network request/i.test(html),'page states public-safe posture');
ok(!/localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b|fetch\(|XMLHttpRequest/i.test(html+js),'forbidden public primitives absent');
const data=JSON.parse(fs.readFileSync('data/loop-to-rsi-demo.json','utf8'));
ok(data.posture.noWallet && data.posture.noNetwork && data.posture.noBrowserStorage && data.posture.noUserDataWanted,'data contract encodes public-safe posture');
ok(data.pipeline.length===8 && data.pipeline[0]==='TARGET' && data.pipeline.at(-1)==='PROMOTE','data contract encodes full RSI pipeline');
ok(data.loopToRsiMap.length>=9,'data contract maps loop rules to RSI controls');
ok(data.move37.requiredSteps.includes('dossier packaging'),'data contract encodes Move-37 dossier packaging');
console.log('Loop to RSI v50 test PASS');
