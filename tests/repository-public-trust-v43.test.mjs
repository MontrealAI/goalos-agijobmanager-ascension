import fs from 'node:fs';
import path from 'node:path';
function ok(cond,msg){ if(!cond){ console.error('FAIL · '+msg); process.exit(1);} console.log('PASS · '+msg); }
const manifestPath='data/canonical-route-manifest-v43.json';
ok(fs.existsSync(manifestPath),'canonical v43 route manifest exists');
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
ok(Array.isArray(manifest.pages),'canonical route manifest exposes pages array');
ok(Number(manifest.routeCount)===manifest.pages.length,'canonical route count equals page array length');
ok(manifest.routeCount>=45,'canonical route manifest covers institutional site');
let checked=0;
for(const p of manifest.pages){ if(fs.existsSync(path.join('site',p.href))) checked++; }
ok(checked>=Math.min(45, manifest.pages.length),'required route sources exist in current repository state');
if(fs.existsSync('site/ascension-flight-deck.html')){
  const af=fs.readFileSync('site/ascension-flight-deck.html','utf8');
  ok(!/Loading…|>\s*Loading\s*</i.test(af),'Ascension Flight Deck has no Loading fallback');
}
const readme=fs.existsSync('README.md')?fs.readFileSync('README.md','utf8'):'';
ok(/canonical public routes|public routes/i.test(readme),'README documents public routes');
ok(fs.existsSync('LICENSE') || fs.existsSync('NOTICE'),'explicit license or notice exists');
ok(fs.existsSync('docs/BRAND_AND_COMMUNICATIONS.md'),'brand and communications doc exists');
ok(fs.existsSync('docs/ACCESSIBILITY_QA.md'),'accessibility QA doc exists');
console.log('Repository Public Trust v43 compatibility test PASS');
