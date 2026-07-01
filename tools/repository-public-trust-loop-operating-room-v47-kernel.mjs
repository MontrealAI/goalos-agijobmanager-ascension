import fs from 'node:fs';
function ok(c,m){ if(!c){ console.error('FAIL · '+m); process.exit(1); } console.log('PASS · '+m); }
const wf=fs.readFileSync('.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml','utf8');
ok(/Publisher v(?:4[789]|50)/i.test(wf),'workflow identifies v47/v48/v49/v50 publisher');
ok(wf.includes('failsafe-bootstrap-v50.mjs') || wf.includes('failsafe-bootstrap-v49.mjs') || wf.includes('failsafe-bootstrap-v48.mjs') || wf.includes('failsafe-bootstrap-v47.mjs'),'workflow uses v47/v48/v49/v50 bootstrap');
ok(wf.includes('release-compatibility-harmonizer-v50.mjs') || wf.includes('release-compatibility-harmonizer-v49.mjs') || wf.includes('release-compatibility-harmonizer-v48.mjs') || wf.includes('release-compatibility-harmonizer-v47.mjs'),'workflow harmonizes v47 release metadata');
ok(wf.includes('run-all-tests.mjs') && wf.includes('run-existing-kernels.mjs'),'workflow uses dynamic runners');
ok(!new RegExp('node\\s+tests\\/[^\\n\\s]+\\.test\\.mjs').test(wf),'workflow has no direct hard-coded test execution');
ok(fs.existsSync('site/loop-operating-room.html'),'source Loop Operating Room page exists');
ok(fs.existsSync('data/loop-operating-room-demo.json'),'source Loop data contract exists');
ok(fs.existsSync('schemas/loop-operating-room.schema.json'),'source Loop schema exists');
ok(fs.existsSync('docs/LOOP_OPERATING_ROOM_V47.md'),'source Loop docs exist');
if(fs.existsSync('dist/build-manifest.json')){
  const m=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
  const family=[m.release,...(m.releaseAliases||[])].join('|');
  ok(/v42/i.test(family)&&/v47|v48|v49|v50/i.test(family),'dist build manifest advertises v42-compatible v47/v48/v49/v50 release family');
  ok(m.files.some(f=>f.path==='loop-operating-room.html'),'dist build manifest includes Loop Operating Room');
}
if(fs.existsSync('dist/production-url.json')){
  const p=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
  ok(p.loopOperatingRoom==='PASS','production-url advertises Loop Operating Room PASS');
  ok(Number(p.publicHtmlRouteCount)>=51,'production-url route count includes v47 page');
}
console.log('Repository Public Trust Loop Operating Room v47 kernel PASS');
