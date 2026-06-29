import fs from 'node:fs';
const ok=m=>console.log('PASS · '+m); const fail=m=>{console.error('FAIL · '+m);process.exit(1)}; const must=(c,m)=>c?ok(m):fail(m);
const required=['site/index.html','site/experience-hub.html','site/assets/experience-hub.css','site/assets/experience-hub.js','site/assets/site-guide.js','data/experience-hub-catalog.json','schemas/experience-hub-catalog.schema.json','docs/EXPERIENCE_HUB_V37.md'];
for(const f of required) must(fs.existsSync(f),`required file exists: ${f}`);
const catalog=JSON.parse(fs.readFileSync('data/experience-hub-catalog.json','utf8'));
must(catalog.pages.length>=38,'catalog indexes the complete route set');
must(catalog.paths.length>=4,'guided paths exist for major user types');
must(catalog.categories.length>=6,'categories organize the site');
for(const p of catalog.pages){ if(!fs.existsSync('site/'+p.href) && !fs.existsSync('site/'+p.href+'/index.html')) fail(`catalog href missing: ${p.href}`); }
const home=fs.readFileSync('site/index.html','utf8'); const hub=fs.readFileSync('site/experience-hub.html','utf8'); const guide=fs.readFileSync('site/assets/site-guide.js','utf8');
must(home.includes('Experience Hub') && home.includes('Default deny'), 'homepage is concise, guided, and boundary-aware');
must(hub.includes('Choose your role') && hub.includes('All pages') && hub.includes('No account'), 'hub exposes personas, catalog, and public-safe posture');
must(!/<form\b/i.test(home+hub), 'new pages do not use forms');
must(!/localStorage|sessionStorage|document\.cookie|googletagmanager|google-analytics|gtag\(|fbq\(|cdn\.jsdelivr|unpkg\.com/i.test(home+hub+guide), 'new pages and global guide avoid storage/tracking/CDN primitives');
must(guide.includes('GoalOS site guide') && guide.includes('experience-hub.html'), 'global site guide provides universal navigation');
console.log('Experience Hub v37 PASS');
