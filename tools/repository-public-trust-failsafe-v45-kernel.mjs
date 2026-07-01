import fs from 'node:fs';
function ok(cond,msg){ if(!cond){ console.error('FAIL · '+msg); process.exit(1); } console.log('PASS · '+msg); }
const wf = fs.readFileSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml','utf8');
ok(/(Public Trust (Ultimate|Compatibility|Loop Operating Room|Day-Scale Loop Observatory) Failsafe Publisher v4[56789]|Loop Evidence Reactor Publisher v49|Loop-to-RSI Governance Publisher v50|Loop to RSI Sovereign Governance Publisher v50|Publisher v50)/i.test(wf), 'workflow names v45-v50-compatible publisher');
ok(wf.includes('tools/failsafe-bootstrap-v50.mjs') || wf.includes('tools/failsafe-bootstrap-v49.mjs') || wf.includes('tools/failsafe-bootstrap-v48.mjs') || wf.includes('tools/failsafe-bootstrap-v47.mjs') || wf.includes('tools/failsafe-bootstrap-v46.mjs') || wf.includes('tools/failsafe-bootstrap-v45.mjs'), 'workflow includes v45-compatible or v46 bootstrap helper');
ok(wf.includes('tools/run-documentation-tests.mjs'), 'workflow uses documentation runner, not direct test files');
ok(wf.includes('tools/run-all-tests.mjs'), 'workflow uses dynamic production test runner');
ok(wf.includes('tools/run-existing-kernels.mjs'), 'workflow uses dynamic kernel runner');
ok(!new RegExp('node\\s+tests\\/[^\\n\\s]+\\.test\\.mjs').test(wf), 'workflow has no direct hard-coded test execution');
ok(fs.existsSync('data/canonical-route-manifest-v45.json') || fs.existsSync('data/canonical-route-manifest-v43.json'), 'canonical route manifest exists');
console.log('Repository Public Trust Ultimate Failsafe v45 kernel PASS');
