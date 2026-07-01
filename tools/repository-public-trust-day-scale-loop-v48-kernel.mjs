import fs from 'node:fs';
function ok(c,m){ if(!c){ console.error('FAIL · '+m); process.exit(1); } console.log('PASS · '+m); }
for(const f of ['site/day-scale-loop-observatory.html','data/day-scale-loop-observatory-demo.json','schemas/day-scale-loop-observatory.schema.json','tests/day-scale-loop-observatory.test.mjs','tools/day-scale-loop-observatory-v48-kernel.mjs']) ok(fs.existsSync(f),`v48 source exists: ${f}`);
const wf=fs.readFileSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml','utf8');
ok(/v48|Day-Scale Loop/.test(wf),'workflow identifies v48 release');
ok(/run-all-tests\.mjs/.test(wf) && /run-existing-kernels\.mjs/.test(wf),'workflow uses dynamic test and kernel runners');
ok(!/node tests\/repository-public-trust-v43\.test\.mjs/.test(wf),'workflow does not hard-call historical v43 test file');
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest-v48.json','utf8'));
ok(manifest.routeCount===manifest.pages.length,'v48 route manifest count matches page array');
ok(manifest.pages.some(p=>p.href==='day-scale-loop-observatory.html'),'v48 manifest includes Day-Scale Loop Observatory');
console.log('Repository Public Trust Day-Scale Loop v48 kernel PASS');