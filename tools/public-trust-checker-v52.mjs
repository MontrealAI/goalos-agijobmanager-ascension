import fs from 'node:fs';
import path from 'node:path';
function fail(m){console.error('FAIL · '+m);process.exit(1)}
function ok(m){console.log('PASS · '+m)}
const forbidden=/Loading…|>\s*Loading\s*<|0 matching pages|HomeStartDemos|menu over menu|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|<form\b|fetch\(|XMLHttpRequest|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain/i;
for(const base of ['site','dist'].filter(d=>fs.existsSync(d))){
  for(const f of fs.readdirSync(base).filter(x=>x.endsWith('.html'))){
    const html=fs.readFileSync(path.join(base,f),'utf8');
    if(forbidden.test(html)) fail(`${base}/${f} contains blank/menu/forbidden primitive marker`);
    if(!/<link\s+rel=["']canonical["']/i.test(html)) fail(`${base}/${f} missing canonical metadata`);
    if(!/<meta\s+property=["']og:title["']/i.test(html)) fail(`${base}/${f} missing OpenGraph title`);
  }
}
if(!fs.existsSync('site/loop-to-rsi-to-asi-superintelligence.html')) fail('missing Loop to RSI to ASI Superintelligence page');
if(!fs.existsSync('site/loop-to-asi-governance-corridor.html')) fail('missing Loop to ASI Governance Corridor page');
const data=JSON.parse(fs.readFileSync('data/loop-to-asi-governance-corridor-demo.json','utf8'));
if(!data.posture?.noWallet || !data.posture?.noUserDataWanted || !data.posture?.noNetworkRequest) fail('Loop to ASI Governance data contract public-safe posture incomplete');
if(!data.claimBoundary || !/no achieved/i.test(data.claimBoundary)) fail('Loop to ASI Governance claim boundary incomplete');
ok('public trust checker v52 passed');
