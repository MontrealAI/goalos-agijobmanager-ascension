import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
for(const d of ['site','dist']){
  ok(fs.existsSync(`${d}/loop-to-rsi-control-room.html`),`${d} page exists`);
  const html=fs.readFileSync(`${d}/loop-to-rsi-control-room.html`,'utf8');
  ok(/Loop → RSI Control Room|Loop &rarr; RSI Control Room/.test(html),`${d} names page`);
  ok(/RSIDossier/.test(html),`${d} exposes RSIDossier`);
  ok(/No account\. No form\. No wallet\. No token approval\. No network request/i.test(html),`${d} preserves public-safe posture`);
  ok(!/Loading…|>\s*Loading\s*<|<form\b|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|fetch\(|XMLHttpRequest/i.test(html),`${d} has no blank state or forbidden primitive`);
}
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
ok(String(prod.release||'').includes('v51') || String(prod.repositoryPublicTrustLoopToRsiControlRoomV51||'')==='PASS','production contract advertises v51');
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
ok(String(manifest.release||'').includes('v51'),'build manifest advertises v51');
console.log('Loop to RSI Control Room v51 kernel PASS');
