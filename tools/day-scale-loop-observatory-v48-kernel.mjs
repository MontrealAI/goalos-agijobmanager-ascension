import fs from 'node:fs';
function ok(c,m){ if(!c){ console.error('FAIL · '+m); process.exit(1); } console.log('PASS · '+m); }
const html=fs.readFileSync('dist/day-scale-loop-observatory.html','utf8');
const data=JSON.parse(fs.readFileSync('dist/day-scale-loop-observatory-demo.json','utf8'));
const manifest=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
ok(/Day-Scale Loop Observatory/.test(html),'dist page renders Day-Scale Loop Observatory');
ok(/LongLoopDocket/.test(html),'dist page exposes LongLoopDocket');
ok(/Virtual disk/.test(html) && /Readable trace/.test(html),'dist page includes disk and trace observatory');
ok(data.noWallet && data.noNetwork && data.noExternalAction,'dist data remains public-safe');
ok(manifest.dayScaleLoopObservatory==='PASS','production manifest advertises v48 Day-Scale Loop Observatory');
ok((manifest.publicHtmlRouteCount||0)>=52,'production manifest has at least 52 public routes');
console.log('Day-Scale Loop Observatory v48 kernel PASS');