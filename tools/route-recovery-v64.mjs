import fs from 'node:fs';
const prod='https://montrealai.github.io/goalos-agijobmanager-ascension/';
const route={route:'/goalos-command-console.html',href:'goalos-command-console.html',title:'GoalOS Command Console',group:'Start here',audience:'Everyone',description:'Front-and-center browser-local GoalOS command console: type what you want and receive a Mission Contract, Evidence Docket plan, Verifier Mesh, governed decision state, route handoff, and downloadable receipt.',outputArtifact:'GoalOSCommandReceipt',boundary:'Browser-local command planning only; no account, no form submission, no wallet, no token approval, no analytics, no cookies, no browser storage, no network request from the console, no user data retained, no production authority.',canonicalUrl:prod+'goalos-command-console.html'};
const fail=m=>{console.error('FAIL · route recovery v64: '+m);process.exit(1)};
function read(f){return JSON.parse(fs.readFileSync(f,'utf8'))} function write(f,d){fs.writeFileSync(f,JSON.stringify(d,null,2)+'\n')}
for(const f of ['site/goalos-command-console.html','site/assets/goalos-command-console.js','site/assets/goalos-command-console.css']) if(!fs.existsSync(f)) fail('missing '+f);
let d=read('data/canonical-route-manifest.json'); let pages=d.pages||d.routes||[];
pages=pages.filter(p=>p.href!=='goalos-command-console.html');
let idx=1; for(let i=0;i<pages.length;i++){ if(['canonical-proof-institution.html','ask-goalos.html','goalos-mission-autopilot.html'].includes(pages[i].href)){idx=i+1;break}}
pages.splice(idx,0,route);
d.pages=pages; d.routes=pages; d.routeCount=pages.length; d.publicHtmlRouteCount=pages.length; d.version='v64-command-console'; d.release=String(d.release||'')+' v64-goalos-command-console'; d.releaseAliases=Array.from(new Set([...(d.releaseAliases||[]),'v64-goalos-command-console','v63-mission-autopilot','v62-ask-goalos-sovereign-router','v61-route-count-self-healing','v60-ask-goalos-autonomous-question-router','v59-canonical-proof-institution','v46-compatibility-failsafe']));
write('data/canonical-route-manifest.json',d); write('data/canonical-route-manifest-v64.json',d);
for(const f of ['data/production-url.json','site/production-url.json','data/site-navigation-catalog.json','data/site-navigation-map.json','data/site-experience-atlas.json','data/experience-hub-catalog.json','data/ask-goalos-routing.json']){
 if(!fs.existsSync(f)) continue; try{let x=read(f); x.pages=pages; x.routes=pages; x.routeCount=pages.length; x.publicHtmlRouteCount=pages.length; x.version='v64-command-console'; x.release=String(x.release||'')+' v64-goalos-command-console'; write(f,x);}catch{}
}
console.log(`PASS · route recovery v64 restored ${pages.length} public routes with GoalOS Command Console`);
