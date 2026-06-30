import fs from 'node:fs';
function pass(msg){console.log('PASS · '+msg)}
function fail(msg){console.error('FAIL · '+msg); process.exit(1)}
function read(p){return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''}
const wf=read('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml');
if(!(/Publisher v4[45]/.test(wf) || wf.includes('Public Trust Ultimate Failsafe Publisher v45'))) fail('workflow name must advertise v44-compatible or v45 release');
pass('workflow advertises v44-compatible/v45 release');
for (const marker of ['tools/run-documentation-tests.mjs','tools/run-all-tests.mjs','tools/run-existing-kernels.mjs']) if(!wf.includes(marker)) fail(`workflow missing guarded runner marker: ${marker}`);
pass('workflow contains guarded documentation, test, and kernel runners');
if(/node\s+tests\/[^\s]+\.test\.mjs/.test(wf)) fail('workflow must not hard-call individual test files');
pass('workflow does not hard-call individual test files');
for (const f of ['tools/root-cleanup-v45.mjs','tools/apply-public-trust-metadata-v45.mjs','tools/public-trust-checker-v45.mjs','tools/repository-public-trust-failsafe-v45-kernel.mjs']) if(!fs.existsSync(f)) fail(`source missing v45 public-trust tool: ${f}`);
pass('v45 public-trust source tools exist');
const pkg=JSON.parse(read('package.json'));
if(!/4\.5\.0|v45/.test(String(pkg.version||''))) fail('package version must include v45');
if(!pkg.scripts?.build?.includes('run-existing-kernels.mjs')) fail('build script must use manifest-guarded kernel runner');
if(!pkg.scripts?.test?.includes('run-all-tests.mjs')) fail('test script must use dynamic test runner');
pass('package scripts use dynamic runners and v45 version');
const fd=read('site/ascension-flight-deck.html');
if(/Loading…|>\s*Loading\s*</i.test(fd)) fail('Ascension Flight Deck source still contains Loading fallback');
pass('Ascension Flight Deck source has no Loading fallback');
console.log('Repository Public Trust Failsafe v44 compatibility kernel PASS');
