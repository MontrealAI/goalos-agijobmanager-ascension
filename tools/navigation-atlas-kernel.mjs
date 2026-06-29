import fs from 'node:fs';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
for(const f of ['dist/index.html','dist/experience-atlas.html','dist/site-navigation-v37.json','dist/assets/site-v37.css','dist/assets/site-v37.js']) must(fs.existsSync(f),`dist file exists: ${f}`);
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
must(prod.navigationAtlas==='PASS','production-url marks navigation atlas PASS');
const html=fs.readFileSync('dist/index.html','utf8')+fs.readFileSync('dist/experience-atlas.html','utf8');
must(/Experience Atlas/.test(html) && /No user data wanted/i.test(html),'dist navigation exposes atlas and data-zero posture');
fs.writeFileSync('NAVIGATION_ATLAS_V37_REPORT.json',JSON.stringify({status:'PASS',release:'v37-navigation-atlas',routes:['index.html','experience-atlas.html','site-navigation-v37.json']},null,2));
console.log('Navigation Atlas v37 kernel PASS');
