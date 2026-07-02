import fs from 'node:fs';
const ok=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
ok(['v57','v58','v59','v60'].includes(manifest.version),'v57/v58/v59/v60 manifest active');
ok(manifest.routeCount===manifest.pages.length,'route count matches page array');
ok(manifest.routeCount>=63,'route recovery exposes every current page');
const siteHtml=[];
function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=d+'/'+e.name;if(e.isDirectory())walk(p);else if(e.isFile()&&p.endsWith('.html'))siteHtml.push(p.replace(/^site\//,''));}}
walk('site');
for(const href of siteHtml) ok(manifest.pages.some(p=>p.href===href),`site html is in manifest: ${href}`);
for(const href of ['loop-contract-theatre.html','evidence/index.html','complete-route-index.html']) ok(fs.existsSync('site/'+href),`recovered route exists: ${href}`);
const hub=fs.readFileSync('site/experience-hub.html','utf8');
ok(!hub.includes('>43</') && !hub.includes('43 routes'),'experience hub has no stale 43 route count');
ok(hub.includes(`${manifest.routeCount}</b> routes`) || hub.includes(`${manifest.routeCount} routes`),'experience hub shows canonical count');
console.log('Complete Route Recovery v57 source test PASS');
