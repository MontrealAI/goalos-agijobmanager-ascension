import fs from 'node:fs';
const ok=m=>console.log('PASS · '+m); const fail=m=>{console.error('FAIL · '+m);process.exit(1)}; const must=(c,m)=>c?ok(m):fail(m);
for(const f of ['dist/index.html','dist/experience-hub.html','dist/experience-hub-catalog.json','dist/assets/site-guide.js','dist/production-url.json']) must(fs.existsSync(f),`dist file exists: ${f}`);
const status=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
must(status.experienceHub==='PASS','production-url advertises Experience Hub PASS');
const html=fs.readFileSync('dist/experience-hub.html','utf8');
must(html.includes('right proof path'), 'experience hub renders core headline');
fs.writeFileSync('EXPERIENCE_HUB_V37_REPORT.json', JSON.stringify({status:'PASS',release:'v37-navigation-experience-hub',checkedAt:new Date().toISOString()},null,2));
console.log('Experience Hub v37 kernel PASS');
