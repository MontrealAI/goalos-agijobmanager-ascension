import fs from 'node:fs';
import path from 'node:path';
const fail=m=>{console.error('FAIL · v63 route-count harmonizer: '+m);process.exit(1)};
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const write=(f,d)=>fs.writeFileSync(f,JSON.stringify(d,null,2)+'\n');
if(!fs.existsSync('data/canonical-route-manifest.json')) fail('missing canonical manifest');
let manifest=read('data/canonical-route-manifest.json');
let pages=manifest.pages||manifest.routes||[];
if(!pages.some(p=>p.href==='goalos-mission-autopilot.html')) fail('canonical manifest missing goalos-mission-autopilot.html');
const count=pages.length;
const aliases=['v63-mission-autopilot','v62-ask-goalos-sovereign-router','v61-route-count-self-healing','v60-ask-goalos-autonomous-question-router','v59-canonical-proof-institution','v58-complete-experience-restoration','v57-complete-route-recovery','v46-compatibility-failsafe'];
function harmonize(file){if(!fs.existsSync(file))return false;let d;try{d=read(file)}catch{return false} if(typeof d!=='object'||!d)return false; const before=JSON.stringify(d); if('pages'in d||'routes'in d||'routeCount'in d||/canonical-route-manifest|site-navigation|experience-hub|production-url/.test(file)){d.pages=pages;d.routes=pages;d.routeCount=count;d.publicHtmlRouteCount=count;d.productionUrl=d.productionUrl||'https://montrealai.github.io/goalos-agijobmanager-ascension/';d.release=String(d.release||'')+' v63-mission-autopilot';d.releaseAliases=Array.from(new Set([...(d.releaseAliases||[]),...aliases]));} if(JSON.stringify(d)!==before){write(file,d);return true} return false;}
let changed=0;
for(const dir of ['data','site','dist','dist/data']) if(fs.existsSync(dir)) for(const name of fs.readdirSync(dir)) if(/(canonical-route-manifest|site-navigation|experience-hub-catalog|site-experience-atlas|production-url).*\.json$/.test(name)) if(harmonize(path.join(dir,name))) changed++;
for(const file of ['data/site-navigation-catalog.json','data/site-navigation-map.json','data/site-experience-atlas.json','data/experience-hub-catalog.json','site/production-url.json','data/production-url.json','dist/production-url.json']) if(harmonize(file)) changed++;
const update=t=>t.replace(/\b(6[0-6]|65)\s+(canonical\s+)?public routes\b/g,`${count} $2public routes`).replace(/route count:\s*\*\*\d+\*\*/gi,`route count: **${count}**`).replace(/See all \d+ routes/g,`See all ${count} routes`);
let docs=0; for(const f of ['README.md','docs/DEMO_CATALOG.md','docs/ASK_GOALOS_SOVEREIGN_ROUTER_V62.md','docs/ASK_GOALOS_ROUTE_COUNT_SELF_HEALING_V61.md','docs/CANONICAL_PROOF_INSTITUTION_V59.md','docs/COMPLETE_EXPERIENCE_RESTORATION_V58.md']) if(fs.existsSync(f)){const b=fs.readFileSync(f,'utf8');const a=update(b);if(a!==b){fs.writeFileSync(f,a);docs++;}}
for(const f of ['README.md','docs/DEMO_CATALOG.md']) if(fs.existsSync(f)){const t=fs.readFileSync(f,'utf8');const re=/(\d+)\s+(?:canonical\s+)?public routes|route count:\s*\*\*(\d+)\*\*/ig;let m;while((m=re.exec(t))){const n=Number(m[1]||m[2]); if(n!==count) fail(`${f} still hardcodes stale route count ${n}; canonical is ${count}`)}}
write('data/route-count-harmonizer-v63.json',{receiptType:'GoalOSRouteCountHarmonizerReceipt',version:'v63',routeCount:count,canonicalManifest:'data/canonical-route-manifest.json',jsonTargetsChanged:changed,docsChanged:docs,publicSafeBoundary:{noAccount:true,noForms:true,noWallet:true,noTokenApproval:true,noNetworkRequest:true,noAnalytics:true,noCookies:true,noBrowserStorage:true,noTransactionBroadcast:true,noProductionAuthority:true,noUserDataRetained:true}});
console.log(`PASS · route-count harmonizer v63 normalized ${count} public routes across ${changed} manifests/catalogs and ${docs} docs`);
