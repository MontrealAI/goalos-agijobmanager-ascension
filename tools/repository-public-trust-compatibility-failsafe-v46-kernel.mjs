import fs from 'node:fs';
function ok(cond,msg){ if(!cond){ console.error('FAIL · '+msg); process.exit(1); } console.log('PASS · '+msg); }
const wf=fs.readFileSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml','utf8');
ok(/Publisher (?:v4[6789]|v5[0-9])/i.test(wf), 'workflow identifies v46/v47/v48/v49/v50/v50-compatible publisher');
ok(wf.includes('failsafe-bootstrap-v50.mjs') || wf.includes('failsafe-bootstrap-v49.mjs') || wf.includes('failsafe-bootstrap-v48.mjs') || wf.includes('failsafe-bootstrap-v47.mjs') || wf.includes('failsafe-bootstrap-v46.mjs'), 'workflow uses v46/v47/v48/v49/v50 bootstrap helper');
ok(wf.includes('release-compatibility-harmonizer-v50.mjs') || wf.includes('release-compatibility-harmonizer-v49.mjs') || wf.includes('release-compatibility-harmonizer-v48.mjs') || wf.includes('release-compatibility-harmonizer-v47.mjs') || wf.includes('release-compatibility-harmonizer-v46.mjs'), 'workflow harmonizes build manifest release compatibility');
ok(wf.includes('run-documentation-tests.mjs'), 'workflow uses guarded documentation runner');
ok(wf.includes('run-all-tests.mjs'), 'workflow uses dynamic production test runner');
ok(wf.includes('run-existing-kernels.mjs'), 'workflow uses dynamic post-build kernel runner');
ok(!new RegExp('node\\s+tests\\/[^\\n\\s]+\\.test\\.mjs').test(wf), 'workflow has no direct hard-coded test execution');
ok(fs.existsSync('tools/institutional-website-finalization-v42-kernel.mjs'), 'v42 compatibility kernel exists');
ok(fs.existsSync('tools/public-trust-checker-v50.mjs') || fs.existsSync('tools/public-trust-checker-v49.mjs') || fs.existsSync('tools/public-trust-checker-v48.mjs') || fs.existsSync('tools/public-trust-checker-v47.mjs') || fs.existsSync('tools/public-trust-checker-v46.mjs'), 'v46 public-trust checker exists');
const pkg=JSON.parse(fs.readFileSync('package.json','utf8'));
ok(/(?:4\.[6789]\.0|5\.[0-9]\.0|v4[6789]|v5[0-9])/.test(String(pkg.version||'')), 'package version advertises v46/v47/v48/v49/v50');
ok(pkg.scripts?.build?.includes('release-compatibility-harmonizer-v48.mjs') || pkg.scripts?.build?.includes('release-compatibility-harmonizer-v47.mjs') || pkg.scripts?.build?.includes('release-compatibility-harmonizer-v46.mjs'), 'build script harmonizes release metadata');
ok(pkg.scripts?.test?.includes('run-all-tests.mjs'), 'test script uses dynamic runner');
if(fs.existsSync('dist/build-manifest.json')){
  const m=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
  const family=[m.release,...(m.releaseAliases||[])].join('|');
  ok(/v42/.test(family) && /v4[6789]|v5[0-9]/.test(family), 'dist build manifest advertises v42-compatible v46/v47/v48/v49/v50 release family');
}
console.log('Repository Public Trust Compatibility Failsafe v46 kernel PASS');
