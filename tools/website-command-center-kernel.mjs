import fs from 'node:fs';
const ok=(cond,msg)=>{ if(!cond){ console.error('FAIL · '+msg); process.exit(1)} console.log('PASS · '+msg); };
for (const p of ['dist/index.html','dist/site-atlas.html','dist/archive-v36-ascension-chamber.html','dist/site-navigation-map.json','dist/assets/site-command-v39.js','dist/assets/site-command-v39.css']) ok(fs.existsSync(p),`built file exists: ${p}`);
const page=fs.readFileSync('dist/index.html','utf8');
ok(page.includes('command-center.html'),'home links command center');
ok(page.includes('Everything remains available'),'home preserves everything promise');
ok(page.includes('assets/site-command-v39.js'),'home has floating Site Command');
for(const ref of ['navigation-v38.js','navigation-v37.js','navigation-atlas.js','site-shell.js','site-guide.js']) ok(!page.includes(ref),`home excludes legacy menu injector ${ref}`);
console.log('Website Command Center v41 PASS');
