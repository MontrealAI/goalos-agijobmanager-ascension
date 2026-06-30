import fs from 'node:fs';
const workflow = fs.readFileSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml','utf8');
const pkg = JSON.parse(fs.readFileSync('package.json','utf8'));
function assert(cond,msg){ if(!cond){ console.error('FAIL · '+msg); process.exit(1); } console.log('PASS · '+msg); }
assert(workflow.includes('Repository Public Trust Failsafe Publisher v44'), 'workflow name is v44 failsafe');
assert(workflow.includes('inline root cleanup'), 'workflow contains inline cleanup fallback');
assert(!/node\s+tools\/root-cleanup-v43\.mjs/.test(workflow), 'workflow does not hard-call root-cleanup-v43.mjs');
assert(workflow.includes('tools/run-all-tests.mjs'), 'workflow keeps dynamic test runner reference');
assert(workflow.includes('tools/run-existing-kernels.mjs'), 'workflow keeps dynamic kernel runner reference');
assert(pkg.version.startsWith('4.4.0'), 'package version is v44');
assert(pkg.scripts.test.includes('tools/run-all-tests.mjs'), 'test script uses dynamic test runner');
assert(pkg.scripts.build.includes('tools/run-existing-kernels.mjs'), 'build script uses dynamic kernel runner');
assert(fs.existsSync('tools/root-cleanup-v43.mjs'), 'root cleanup helper included for full-source overlays');
assert(fs.existsSync('tools/repository-public-trust-failsafe-v44-kernel.mjs'), 'v44 kernel included');
console.log('Repository Public Trust Failsafe v44 test PASS');
