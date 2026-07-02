import fs from 'node:fs';
const fail=m=>{console.error('FAIL · public trust v59: '+m);process.exit(1)};
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
if(manifest.routeCount!==manifest.pages.length) fail('route count mismatch');
for(const p of manifest.pages){if(!fs.existsSync('site/'+p.href)) fail('missing source route '+p.href)}
for(const href of ['canonical-proof-institution.html','experience-command.html','complete-route-index.html','command-center.html','experience-hub.html','experience-concierge.html']){
 const html=fs.readFileSync('site/'+href,'utf8');
 if(!html.includes('No wallet') && !html.includes('no wallet')) fail(href+' missing no-wallet public-safe posture');
 if(/<form\b|ethereum\.request|eth_requestAccounts|wallet_switchEthereumChain|eth_sendTransaction|navigator\.sendBeacon|document\.cookie|localStorage\.setItem|sessionStorage\.setItem|XMLHttpRequest|fetch\(/.test(html)) fail(href+' contains forbidden public primitive');
 if(!html.includes('canonical-proof-institution.html') && href!=='canonical-proof-institution.html') fail(href+' does not link canonical institution');
}
console.log('PASS · public trust checker v59 verified '+manifest.routeCount+' canonical routes');
