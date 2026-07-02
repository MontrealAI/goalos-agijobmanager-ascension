import fs from 'node:fs';
const ok=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)} console.log('PASS · '+m)};
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
ok(['v58','v59'].includes(manifest.version),'canonical manifest is v58/v59');
ok(manifest.routeCount===manifest.pages.length,'route count equals pages length');
ok(manifest.pages.some(p=>p.href==='experience-command.html'),'manifest includes Experience Command');
for (const href of ['index.html','command-center.html','experience-hub.html','experience-concierge.html','complete-route-index.html','experience-command.html']) { const html=fs.readFileSync('site/'+href,'utf8'); ok(html.includes(String(manifest.routeCount)),`${href} advertises current route count`); ok(html.includes('experience-command.html'),`${href} links Experience Command`); }
const cmd=fs.readFileSync('site/assets/site-command-v41.js','utf8'); ok(cmd.includes('experience-command.html'),'floating Site Command includes Experience Command');
if(fs.existsSync('dist/build-manifest.json')){const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8')); ok(String(bm.release||'').match(/v5[89]/),'dist build manifest advertises v58'); ok(Number(bm.routeCount)>=manifest.routeCount,'dist build manifest does not lose routes');}
console.log('Experience Command v58 kernel PASS');
