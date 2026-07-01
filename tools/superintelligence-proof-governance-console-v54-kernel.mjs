import fs from 'node:fs';
function ok(c,m){if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)}
for(const d of ['site','dist']){
  ok(fs.existsSync(`${d}/superintelligence-proof-governance-console.html`),`${d} v54 page exists`);
  const html=fs.readFileSync(`${d}/superintelligence-proof-governance-console.html`,'utf8');
  ok(/Superintelligence Proof Governance Console/.test(html),`${d} names Superintelligence Proof Governance Console`);
  ok(/SuperintelligenceGovernanceDocket/.test(html),`${d} exposes SuperintelligenceGovernanceDocket`);
  ok(/No account\. No form\. No wallet\. No token approval\. No network request/i.test(html),`${d} preserves public-safe posture`);
  ok(/not an achievement claim/i.test(html),`${d} preserves ASI claim boundary`);
  ok(!/Loading…|>\s*Loading\s*<|<form\b|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|fetch\(|XMLHttpRequest/i.test(html),`${d} has no blank state or forbidden primitive`);
}
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
ok(String(prod.release||'').includes('v54') || prod.superintelligenceProofGovernanceConsole==='PASS','production contract advertises v54');
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
ok(String(manifest.release||'').includes('v54'),'build manifest advertises v54');
ok(Number(manifest.routeCount)>=60 || Number(prod.publicHtmlRouteCount)>=60,'canonical route count is at least 60');
console.log('Superintelligence Proof Governance Console v54 kernel PASS');
