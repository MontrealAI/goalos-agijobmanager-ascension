import fs from 'node:fs';
function ok(cond,msg){ if(!cond){ console.error('FAIL · '+msg); process.exit(1); } console.log('PASS · '+msg); }
const wf=fs.readFileSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml','utf8');
ok(/Publisher v46/i.test(wf), 'workflow identifies v46 publisher');
ok(wf.includes('failsafe-bootstrap-v46.mjs'), 'workflow uses v46 bootstrap helper');
ok(wf.includes('release-compatibility-harmonizer-v46.mjs'), 'workflow harmonizes build manifest release compatibility');
ok(wf.includes('run-documentation-tests.mjs'), 'workflow uses guarded documentation runner');
ok(wf.includes('run-all-tests.mjs'), 'workflow uses dynamic production test runner');
ok(wf.includes('run-existing-kernels.mjs'), 'workflow uses dynamic post-build kernel runner');
ok(!new RegExp('node\\s+tests\\/[^\\n\\s]+\\.test\\.mjs').test(wf), 'workflow has no direct hard-coded test execution');
ok(fs.existsSync('tools/institutional-website-finalization-v42-kernel.mjs'), 'v42 compatibility kernel exists');
const v42=fs.readFileSync('tools/institutional-website-finalization-v42-kernel.mjs','utf8');
ok(/v42/i.test(v42) && /v45\|v46|v45\|v46|v45|v46/i.test(v42), 'v42 kernel accepts current v45/v46 public-trust lineage and v42 compatibility');
ok(fs.existsSync('tools/public-trust-checker-v46.mjs'), 'v46 public-trust checker exists');
ok(fs.existsSync('tools/repository-public-trust-compatibility-failsafe-v46-kernel.mjs'), 'v46 compatibility failsafe kernel exists');
console.log('Repository Public Trust Compatibility Failsafe v46 test PASS');
