import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
for(const d of ['site','dist']){
  ok(fs.existsSync(`${d}/asi-proof-horizon-console.html`),`${d} v53 page exists`);
  const html=fs.readFileSync(`${d}/asi-proof-horizon-console.html`,'utf8');
  ok(/ASI Proof Horizon Console/.test(html),`${d} names ASI Proof Horizon Console`);
  ok(/HorizonProofDocket/.test(html),`${d} exposes HorizonProofDocket`);
  ok(/No account\. No form\. No wallet\. No token approval\. No network request/i.test(html),`${d} preserves public-safe posture`);
  ok(/ASI is handled here as a proof horizon/i.test(html),`${d} preserves proof-horizon claim boundary`);
  ok(!/Loading…|>\s*Loading\s*<|<form\b|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|fetch\(|XMLHttpRequest/i.test(html),`${d} has no blank state or forbidden primitive`);
}
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
ok(String(prod.release||'').includes('v53') || prod.asiProofHorizonConsole==='PASS','production contract advertises v53');
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
ok(String(manifest.release||'').includes('v53'),'build manifest advertises v53');
ok(Number(manifest.routeCount)>=59 || Number(prod.publicHtmlRouteCount)>=59,'canonical route count is at least 59');
console.log('ASI Proof Horizon Console v53 kernel PASS');
