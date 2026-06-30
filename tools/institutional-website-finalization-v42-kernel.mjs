// compatibility lineage: v42|v43|v44|v45|v46
import fs from 'node:fs';
function must(c,m){ if(!c){ console.error('FAIL · '+m); process.exit(1); } console.log('PASS · '+m); }
const pages=['dist/index.html','dist/start.html','dist/coordination-lab.html','dist/experience-concierge.html','dist/command-center.html','dist/experience-hub.html','dist/site-atlas.html','dist/navigation-atlas.html'];
for(const f of pages){
  must(fs.existsSync(f),`dist page exists: ${f}`);
  const h=fs.readFileSync(f,'utf8');
  must(!/Loading…|>\s*Loading\s*<|>\s*0 routes\s*<|0 matching pages|HomeStartDemos|menu over menu/i.test(h),`${f} has no blank/menu-stacking markers`);
  must(/Site Command/.test(h)||/site-command.*\.js/.test(h),`${f} keeps Site Command access`);
}
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
const releaseFamily=[manifest.release, ...(manifest.releaseAliases||[])].join('|');
must(/v42/i.test(releaseFamily),'build manifest advertises v42-compatible release family');
must(/v45|v46/i.test(releaseFamily),'build manifest advertises current public-trust release family');
fs.writeFileSync('INSTITUTIONAL_WEBSITE_FINALIZATION_V42_REPORT.json',JSON.stringify({status:'PASS',pages:pages.length,release:manifest.release,aliases:manifest.releaseAliases||[]},null,2));
console.log('Institutional Website Finalization v42 compatibility kernel PASS');
