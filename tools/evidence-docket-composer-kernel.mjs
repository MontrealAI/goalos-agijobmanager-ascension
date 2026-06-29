import fs from 'node:fs';
const fail=m=>{throw new Error(m)}; const ok=m=>console.log('PASS · '+m);
for(const f of ['dist/evidence-docket-composer.html','dist/evidence-docket-composer-demo.json']) if(!fs.existsSync(f)) fail('missing built '+f);
const html=fs.readFileSync('dist/evidence-docket-composer.html','utf8');
for(const marker of ['Evidence Docket Composer','Build the','proof room','No user data wanted']) if(!html.includes(marker)) fail('built page missing '+marker);
fs.writeFileSync('EVIDENCE_DOCKET_COMPOSER_V34_REPORT.json', JSON.stringify({status:'PASS',route:'evidence-docket-composer.html',posture:'browser-local public-safe'},null,2));
ok('Evidence Docket Composer v34 kernel PASS');