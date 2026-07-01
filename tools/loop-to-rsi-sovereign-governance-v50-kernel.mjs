import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
ok(fs.existsSync('site/loop-to-rsi-sovereign-governance.html'),'source From Loop to RSI page exists');
ok(fs.existsSync('data/loop-to-rsi-sovereign-governance-demo.json'),'source From Loop to RSI data exists');
if(fs.existsSync('dist')){
  ok(fs.existsSync('dist/loop-to-rsi-sovereign-governance.html'),'dist From Loop to RSI page exists');
  ok(fs.existsSync('dist/loop-to-rsi-sovereign-governance-demo.json'),'dist From Loop to RSI data exists');
  const html=fs.readFileSync('dist/loop-to-rsi-sovereign-governance.html','utf8');
  ok(/RSIDossier/.test(html),'dist page exposes RSIDossier');
  ok(/site-command-v39\.js/.test(html),'dist page keeps floating Site Command');
  ok(/<link\s+rel=["']canonical["']/i.test(html),'dist page has canonical metadata');
  ok(/<meta\s+property=["']og:title["']/i.test(html),'dist page has OpenGraph metadata');
  ok(!/Loading…|>\s*Loading\s*<|localStorage|sessionStorage|document\.cookie|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b/i.test(html),'dist page avoids blank and authority primitives');
  const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
  ok(String(manifest.release||'').includes('v50') || (manifest.releaseAliases||[]).some(x=>String(x).includes('v50')),'build manifest advertises v50');
  ok(Number(manifest.routeCount)>=54,'build manifest advertises at least 54 routes');
}
console.log('From Loop to RSI Sovereign Governance v50 kernel PASS');
