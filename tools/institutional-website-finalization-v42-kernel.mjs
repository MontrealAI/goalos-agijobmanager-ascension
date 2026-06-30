
import fs from 'node:fs';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
const pages=['dist/index.html','dist/start.html','dist/coordination-lab.html','dist/experience-concierge.html','dist/command-center.html','dist/experience-hub.html','dist/site-atlas.html','dist/navigation-atlas.html'];
for(const f of pages){must(fs.existsSync(f),`dist page exists: ${f}`); const h=fs.readFileSync(f,'utf8'); must(!/Loading…|0 routes|0 matching pages|HomeStartDemos|menu over menu/i.test(h),`${f} has no blank/menu-stacking markers`); must(/Site Command/.test(h)||/site-command-v39\.js/.test(h),`${f} keeps Site Command access`);}
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8')); must(/v42/.test(manifest.release),'build manifest advertises v42');
fs.writeFileSync('INSTITUTIONAL_WEBSITE_FINALIZATION_V42_REPORT.json',JSON.stringify({status:'PASS',pages:pages.length,release:manifest.release},null,2));
console.log('Institutional Website Finalization v42 kernel PASS');
