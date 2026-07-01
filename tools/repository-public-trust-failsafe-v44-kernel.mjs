import fs from 'node:fs';
function pass(msg){console.log('PASS · '+msg)}
function fail(msg){console.error('FAIL · '+msg); process.exit(1)}
function read(p){return fs.existsSync(p)?fs.readFileSync(p,'utf8'):''}
const wf=read('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml');
if(!(/Publisher v(?:4[456789]|50)/.test(wf) || wf.includes('Public Trust Ultimate Failsafe Publisher v45') || wf.includes('Compatibility Failsafe Publisher v46'))) fail('workflow name must advertise v44-v50-compatible release');
pass('workflow advertises v44-v50-compatible release');
for (const marker of ['tools/run-documentation-tests.mjs','tools/run-all-tests.mjs','tools/run-existing-kernels.mjs']) if(!wf.includes(marker)) fail(`workflow missing guarded runner marker: ${marker}`);
pass('workflow contains guarded documentation, test, and kernel runners');
if(/node\s+tests\/[^\s]+\.test\.mjs/.test(wf)) fail('workflow must not hard-call individual test files');
pass('workflow does not hard-call individual test files');
for (const f of ['tools/root-cleanup-v48.mjs','tools/apply-public-trust-metadata-v48.mjs','tools/public-trust-checker-v48.mjs','tools/repository-public-trust-day-scale-loop-v48-kernel.mjs','tools/root-cleanup-v47.mjs','tools/apply-public-trust-metadata-v47.mjs','tools/public-trust-checker-v47.mjs','tools/repository-public-trust-loop-operating-room-v47-kernel.mjs']) if(!fs.existsSync(f)) fail(`source missing v45 public-trust tool: ${f}`);
pass('v47 public-trust source tools exist');
const pkg=JSON.parse(read('package.json'));
if(!/(?:4\.[56789]\.0|5\.0\.0|v4[56789]|v50)/.test(String(pkg.version||''))) fail('package version must include v45-compatible, v46, v47, v48, v49, or v50');
if(!pkg.scripts?.build?.includes('run-existing-kernels.mjs')) fail('build script must use manifest-guarded kernel runner');
if(!pkg.scripts?.test?.includes('run-all-tests.mjs')) fail('test script must use dynamic test runner');
pass('package scripts use dynamic runners and v45 version');
const fd=read('site/ascension-flight-deck.html');
if(/Loading…|>\s*Loading\s*</i.test(fd)) fail('Ascension Flight Deck source still contains Loading fallback');
pass('Ascension Flight Deck source has no Loading fallback');
console.log('Repository Public Trust Failsafe v44 compatibility kernel PASS');
