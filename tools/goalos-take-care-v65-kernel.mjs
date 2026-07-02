
import fs from 'node:fs';
const fail=m=>{console.error('FAIL · GoalOS Take-Care Console v65 kernel: '+m);process.exit(1)};
for(const f of ['dist/goalos-take-care.html','dist/assets/goalos-take-care.js','dist/data/goalos-take-care-demo.json','dist/schemas/goalos-take-care.schema.json','dist/index.html','dist/production-url.json','dist/build-manifest.json']) if(!fs.existsSync(f)) fail('missing built file '+f);
const html=fs.readFileSync('dist/goalos-take-care.html','utf8');
for(const phrase of ['Tell GoalOS what you want','GoalOSTakeCareReceipt','Open recommended route','No network request from the console']) if(!html.includes(phrase)) fail('dist page missing '+phrase);
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
if(Number(prod.publicHtmlRouteCount)<69) fail('production-url route count below 69');
const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
if(!String(bm.release||'').includes('v65')) fail('build manifest missing v65 release');
console.log('PASS · GoalOS Take-Care Console v65 kernel verified built route, assets, metadata, and front-door interface');
