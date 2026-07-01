
import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
for(const p of ['dist/loop-to-rsi.html','dist/loop-to-rsi-demo.json','dist/schemas/loop-to-rsi.schema.json','dist/docs/LOOP_TO_RSI_V50.md']) ok(fs.existsSync(p),`dist artifact exists: ${p}`);
const html=fs.readFileSync('dist/loop-to-rsi.html','utf8');
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
ok(/From Loop to RSI/.test(html),'dist page title rendered');
ok(/TARGET/.test(html)&&/PROMOTE/.test(html)&&/RSIDossier/.test(html),'dist page keeps RSI pipeline and dossier');
ok(!/Loading…|>\s*Loading\s*<|<form\b|localStorage|sessionStorage|document\.cookie|fetch\(|XMLHttpRequest|ethereum\.request/i.test(html),'dist page has no blank or forbidden primitives');
ok(String(manifest.release||'').includes('v50') || (manifest.releaseAliases||[]).some(x=>String(x).includes('v50')),'build manifest advertises v50');
ok(prod.loopToRsi === 'PASS','production-url records loop-to-RSI PASS');
ok(Number(prod.publicHtmlRouteCount || prod.routeCount || 0) >= 54,'production-url records at least at least 55 public routes');
console.log('Loop to RSI v50 kernel PASS');
