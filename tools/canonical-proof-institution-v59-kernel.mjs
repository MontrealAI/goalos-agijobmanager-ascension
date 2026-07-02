import fs from 'node:fs';
const ok=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
ok(manifest.version==='v59','canonical manifest is v59');
ok(manifest.routeCount===manifest.pages.length,'route count equals pages length');
ok(manifest.pages.some(p=>p.href==='canonical-proof-institution.html'),'manifest includes Canonical Proof Institution');
for (const href of manifest.pages.map(p=>p.href)) ok(fs.existsSync('site/'+href),`source route exists ${href}`);
for (const href of ['index.html','experience-command.html','command-center.html','experience-hub.html','experience-concierge.html','complete-route-index.html']) {
  const html=fs.readFileSync('site/'+href,'utf8');
  ok(html.includes('canonical-proof-institution.html'),`${href} links canonical proof institution`);
  ok(html.includes(String(manifest.routeCount)),`${href} advertises current route count`);
}
if(fs.existsSync('dist/build-manifest.json')){const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8')); ok(String(bm.release||'').includes('v59'),'dist build manifest advertises v59'); ok(Number(bm.routeCount)>=manifest.routeCount,'dist build manifest does not lose routes');}
console.log('Canonical Proof Institution v59 kernel PASS');
