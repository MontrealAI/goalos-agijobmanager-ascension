import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
const dist=fs.existsSync('dist');
ok(fs.existsSync('site/loop-contract-theatre.html'),'source Loop Contract Theatre page exists');
ok(fs.existsSync('data/loop-contract-theatre-demo.json'),'source Loop Contract data exists');
if(dist){
  ok(fs.existsSync('dist/loop-contract-theatre.html'),'dist Loop Contract Theatre page exists');
  ok(fs.existsSync('dist/loop-contract-theatre-demo.json'),'dist Loop Contract data exists');
  const html=fs.readFileSync('dist/loop-contract-theatre.html','utf8');
  ok(/LoopReceipt/.test(html),'dist page exposes LoopReceipt');
  ok(/site-command-v39\.js/.test(html),'dist page keeps floating Site Command');
  ok(/<link\s+rel=["']canonical["']/i.test(html),'dist page has canonical metadata');
  ok(/<meta\s+property=["']og:title["']/i.test(html),'dist page has OpenGraph metadata');
  ok(!/Loading…|>\s*Loading\s*<|localStorage|sessionStorage|document\.cookie|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b/i.test(html),'dist page avoids blank and authority primitives');
  const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
  ok(String(manifest.release||'').includes('v47') || (manifest.releaseAliases||[]).some(x=>String(x).includes('v47')),'build manifest advertises v47');
}
console.log('Loop Contract Theatre v47 kernel PASS');
