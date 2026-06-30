import fs from 'node:fs';
function ok(cond, msg) { if (!cond) { console.error('FAIL · ' + msg); process.exit(1); } console.log('PASS · ' + msg); }
ok(fs.existsSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml'), 'publisher workflow exists');
const wf = fs.readFileSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml', 'utf8');
ok(/Publisher v4[56]/i.test(wf), 'workflow identifies v45-compatible or v46 publisher');
ok(wf.includes('Bootstrap compatibility failsafe tooling') || wf.includes('Bootstrap zero-missing-test public-trust tooling'), 'workflow bootstraps zero-missing-test tooling');
ok(wf.includes('tools/run-documentation-tests.mjs'), 'workflow uses guarded documentation test runner');
ok(wf.includes('tools/run-all-tests.mjs'), 'workflow uses guarded production test runner');
ok(wf.includes('tools/run-existing-kernels.mjs'), 'workflow uses guarded post-build kernel runner');
ok(!new RegExp('node\\s+tests\\/[^\\n\\s]+\\.test\\.mjs').test(wf), 'workflow does not hard-call individual test files');
ok(fs.existsSync('tools/run-documentation-tests.mjs'), 'guarded documentation test runner exists');
ok(fs.existsSync('tests/repository-public-trust-v43.test.mjs'), 'v43 public trust test is present for compatibility');
ok(fs.existsSync('tests/repository-public-trust-compatibility-failsafe-v46.test.mjs') || fs.existsSync('tests/repository-public-trust-failsafe-v45.test.mjs'), 'v45-compatible/v46 public trust failsafe test is present');
ok(fs.existsSync('tools/repository-public-trust-compatibility-failsafe-v46-kernel.mjs') || fs.existsSync('tools/repository-public-trust-failsafe-v45-kernel.mjs'), 'v45-compatible/v46 public trust failsafe kernel exists');
console.log('Repository Public Trust Zero-Missing-Test Failsafe v45 test PASS');
