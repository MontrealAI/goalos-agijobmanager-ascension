import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
for(const d of ['site','dist']){
  ok(fs.existsSync(`${d}/loop-to-asi-governance-corridor.html`),`${d} v52 page exists`);
  const html=fs.readFileSync(`${d}/loop-to-asi-governance-corridor.html`,'utf8');
  ok(/Loop → RSI → ASI Governance Corridor/.test(html),`${d} names v52 page`);
  ok(/CorridorDossier/.test(html),`${d} exposes CorridorDossier`);
  ok(/No account\. No form\. No wallet\. No token approval\. No network request/i.test(html),`${d} preserves public-safe posture`);
  ok(/not a claim of achieved ASI/i.test(html),`${d} preserves achieved-ASI boundary`);
  ok(!/Loading…|>\s*Loading\s*<|<form\b|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|fetch\(|XMLHttpRequest/i.test(html),`${d} has no blank state or forbidden primitive`);
}
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
ok(String(prod.release||'').includes('v52') || prod.loopToAsiGovernanceCorridor==='PASS','production contract advertises v52');
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
ok(String(manifest.release||'').includes('v52'),'build manifest advertises v52');
ok(Number(manifest.routeCount)>=57,'build manifest route count includes v52');
console.log('Loop to ASI Governance Corridor v52 kernel PASS');
