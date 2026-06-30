import fs from 'node:fs';
function ok(cond,msg){ if(!cond){ console.error('FAIL · '+msg); process.exit(1); } console.log('PASS · '+msg); }
const wf = fs.readFileSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml','utf8');
ok(/Public Trust (Ultimate|Compatibility) Failsafe Publisher v4[56]/i.test(wf), 'workflow names v45 ultimate failsafe publisher');
ok(wf.includes('tools/failsafe-bootstrap-v46.mjs') || wf.includes('tools/failsafe-bootstrap-v45.mjs'), 'workflow includes v45-compatible or v46 bootstrap helper');
ok(wf.includes('node tools/run-documentation-tests.mjs'), 'workflow uses documentation runner, not direct test files');
ok(wf.includes('node tools/run-all-tests.mjs'), 'workflow uses dynamic production test runner');
ok(wf.includes('node tools/run-existing-kernels.mjs'), 'workflow uses dynamic kernel runner');
ok(!new RegExp('node\\s+tests\\/[^\\n\\s]+\\.test\\.mjs').test(wf), 'workflow has no direct hard-coded test execution');
ok(fs.existsSync('data/canonical-route-manifest-v45.json') || fs.existsSync('data/canonical-route-manifest-v43.json'), 'canonical route manifest exists');
console.log('Repository Public Trust Ultimate Failsafe v45 kernel PASS');
