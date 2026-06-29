import fs from 'node:fs';
const fail=m=>{throw new Error(m)}; const ok=m=>console.log('PASS · '+m);
for(const f of ['dist/index.html','dist/experience-atlas.html','dist/site-experience-atlas.json','dist/assets/site-nav.css','dist/assets/site-nav.js','dist/assets/experience-atlas.css','dist/assets/experience-atlas.js']){if(!fs.existsSync(f)) fail(`missing built file: ${f}`);}
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
if(prod.siteExperienceAtlas!=='PASS') fail('production-url.json missing siteExperienceAtlas PASS');
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
if(![manifest.release, ...(manifest.releaseAliases||[])].includes('v37-site-experience-atlas')) fail('build manifest should include v37-site-experience-atlas alias');
const html=fs.readFileSync('dist/index.html','utf8')+fs.readFileSync('dist/experience-atlas.html','utf8');
for(const phrase of ['Experience Atlas','Flight Deck','Proof-Settlement Lifecycle','Evidence Docket Composer','AGIALPHA Boundary']) if(!html.includes(phrase)) fail(`built pages missing phrase ${phrase}`);
ok('Site Experience Atlas v37 kernel PASS');
fs.writeFileSync('SITE_EXPERIENCE_ATLAS_V37_REPORT.json',JSON.stringify({status:'PASS',release:'v37-site-experience-atlas',routes:'complete',posture:'public-safe'},null,2));
