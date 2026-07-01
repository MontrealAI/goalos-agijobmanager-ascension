import fs from 'node:fs';import path from 'node:path';
function fail(m){console.error('FAIL · '+m);process.exit(1)}function ok(m){console.log('PASS · '+m)}
const forbidden=/Loading…|>\s*Loading\s*<|0 matching pages|HomeStartDemos|menu over menu|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|<form\b|fetch\(|XMLHttpRequest|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain/i;
for(const base of ['site','dist'].filter(d=>fs.existsSync(d))){for(const f of fs.readdirSync(base).filter(x=>x.endsWith('.html'))){const html=fs.readFileSync(path.join(base,f),'utf8');if(forbidden.test(html))fail(`${base}/${f} contains blank/menu/forbidden primitive marker`);if(!/<link\s+rel=["']canonical["']/i.test(html))fail(`${base}/${f} missing canonical metadata`);if(!/<meta\s+property=["']og:title["']/i.test(html))fail(`${base}/${f} missing OpenGraph title`);}}
if(!fs.existsSync('site/superintelligence-proof-governance-console.html')) fail('missing v54 Superintelligence Proof Governance Console page');
const data=JSON.parse(fs.readFileSync('data/superintelligence-proof-governance-console-demo.json','utf8'));
if(!data.posture?.noWallet || !data.posture?.noUserDataWanted || !data.posture?.zeroNetwork) fail('v54 data contract public-safe posture incomplete');
if(!data.claimBoundary || !/not achieved capability claims/i.test(data.claimBoundary)) fail('v54 claim boundary incomplete');
ok('public trust checker v54 passed');
