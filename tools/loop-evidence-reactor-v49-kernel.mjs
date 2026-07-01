import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
ok(fs.existsSync('site/loop-evidence-reactor.html'),'source Loop Evidence Reactor page exists');
ok(fs.existsSync('data/loop-evidence-reactor-demo.json'),'source Loop Evidence Reactor data exists');
if(fs.existsSync('dist')){
  ok(fs.existsSync('dist/loop-evidence-reactor.html'),'dist Loop Evidence Reactor page exists');
  ok(fs.existsSync('dist/loop-evidence-reactor-demo.json'),'dist Loop Evidence Reactor data exists');
  const html=fs.readFileSync('dist/loop-evidence-reactor.html','utf8');
  ok(/LoopDocket/.test(html),'dist page exposes LoopDocket');
  ok(/site-command-v39\.js/.test(html),'dist page keeps floating Site Command');
  ok(/<link\s+rel=["']canonical["']/i.test(html),'dist page has canonical metadata');
  ok(/<meta\s+property=["']og:title["']/i.test(html),'dist page has OpenGraph metadata');
  ok(!/Loading…|>\s*Loading\s*<|localStorage|sessionStorage|document\.cookie|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b/i.test(html),'dist page avoids blank and authority primitives');
  const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
  ok(String(manifest.release||'').includes('v49') || (manifest.releaseAliases||[]).some(x=>String(x).includes('v49')),'build manifest advertises v49');
  ok(Number(manifest.routeCount)>=53,'build manifest advertises at least 53 routes');
}
console.log('Loop Evidence Reactor v49 kernel PASS');
