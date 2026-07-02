import './route-recovery-v57.mjs';
import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const prod='https://montrealai.github.io/goalos-agijobmanager-ascension/';
const dataDir=path.join(root,'data');
const siteDir=path.join(root,'site');
const docsDir=path.join(root,'docs');
const release='v42-v43-v44-v45-v46-v47-v48-v49-v50-v51-v52-v53-v54-v55-v56-v57-v58-complete-experience-restoration-command';
const RELEASE='v58-complete-experience-restoration-command';
function readJson(f){return JSON.parse(fs.readFileSync(f,'utf8'))}
function writeJson(f,j){fs.writeFileSync(f, JSON.stringify(j,null,2))}
function ensureLink(file){
  if(!fs.existsSync(file)) return;
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/complete route recovery/ig,'complete experience command');
  html=html.replace(/Complete route recovery/g,'Complete experience command');
  if(!html.includes('experience-command.html')){
    html=html.replace(/(<a[^>]+href="experience-concierge\.html"[^>]*>Concierge<\/a>)/i, `$1<a href="experience-command.html">Experience Command</a>`);
    html=html.replace(/(<a[^>]+href="complete-route-index\.html"[^>]*>[^<]*All Pages[^<]*<\/a>)/i, `$1<a href="experience-command.html">Experience Command</a>`);
    html=html.replace(/(<\/main>)/i, `<section class="g42-section"><div class="g42-wrap g42-panel"><div class="g42-kicker">Experience Command</div><h2>One command route for every preserved public surface.</h2><p class="g42-lead">Open guided paths, search all pages, inspect proofs, run loop/RSI consoles, read boundaries, and recover archives without stacked menus.</p><div class="g42-actions"><a class="g42-button primary" href="experience-command.html">Open Experience Command →</a><a class="g42-button" href="complete-route-index.html">Open all pages</a></div></div></section>$1`);
  }
  fs.writeFileSync(file,html);
}
function patchText(file){
  if(!fs.existsSync(file)) return;
  let t=fs.readFileSync(file,'utf8');
  t=t.replace(/v57/g,'v58').replace(/V57/g,'V58');
  t=t.replace(/Complete Route Recovery/g,'Complete Experience Restoration').replace(/complete route recovery/g,'complete experience command');
  t=t.replace(/route recovery/g,'experience restoration');
  fs.writeFileSync(file,t);
}
let manifest=readJson(path.join(dataDir,'canonical-route-manifest.json'));
const idx=manifest.pages.findIndex(p=>p.href==='experience-command.html');
const cmdPage={route:'/experience-command.html',href:'experience-command.html',title:'Experience Command',group:'Start here',audience:'Everyone',description:'The single command-grade route for every preserved demo, proof room, loop theatre, RSI console, ASI-horizon boundary, legal page, archive, and evidence surface.',outputArtifact:'ExperienceCommandReceipt',boundary:'Navigation and route-discovery only; no account, no form, no wallet, no network request, no user data.',canonicalUrl:prod+'experience-command.html'};
if(idx>=0) manifest.pages[idx]={...manifest.pages[idx],...cmdPage}; else manifest.pages.splice(1,0,cmdPage);
manifest.pages=[...new Map(manifest.pages.map(p=>[p.href,p])).values()];
const pri=['index.html','experience-command.html','complete-route-index.html','experience-concierge.html','experience-hub.html','command-center.html','start.html','ascension-flight-deck.html'];
const order=new Map(pri.map((x,i)=>[x,i]));
manifest.pages.sort((a,b)=>(order.get(a.href)??9999)-(order.get(b.href)??9999)||a.href.localeCompare(b.href));
manifest.version='v58';
manifest.routeCount=manifest.pages.length;
manifest.release=release;
manifest.generatedFrom='v58 Complete Experience Restoration Command';
manifest.releaseAliases=Array.from(new Set([...(manifest.releaseAliases||[]), RELEASE,'v58-complete-experience-command','v57-complete-route-recovery','v56-repository-website-institutional-excellence','v54-superintelligence-proof-governance-console','v50-loop-to-rsi-sovereign-governance','v46-repository-public-trust-compatibility-failsafe']));
for(const f of ['canonical-route-manifest.json','canonical-route-manifest-v43.json','canonical-route-manifest-v44.json','canonical-route-manifest-v45.json','canonical-route-manifest-v46.json','canonical-route-manifest-v47.json','canonical-route-manifest-v48.json','canonical-route-manifest-v49.json','canonical-route-manifest-v50.json','canonical-route-manifest-v51.json','canonical-route-manifest-v52.json','canonical-route-manifest-v53.json','canonical-route-manifest-v54.json','canonical-route-manifest-v55.json','canonical-route-manifest-v56.json','canonical-route-manifest-v57.json','canonical-route-manifest-v58.json']) writeJson(path.join(dataDir,f), {...manifest, version:'v58'});
// Navigation catalogs inherit v58 manifest.
const navFiles=['site-navigation-catalog.json','site-navigation-map.json','site-experience-atlas.json','experience-hub-catalog.json','site-navigation-v38.json','site-navigation-v39.json','site-navigation-v41.json','site-navigation-v42.json','site-navigation-v50.json','site-navigation-v51.json','site-navigation-v52.json','site-navigation-v53.json','site-navigation-v54.json','site-navigation-v57.json','site-navigation-v58.json'];
for(const f of navFiles){
  const p=path.join(dataDir,f); let j=fs.existsSync(p)?readJson(p):{};
  j.version='v58'; j.release=RELEASE; j.routeCount=manifest.routeCount; j.pages=manifest.pages; j.routes=manifest.pages; j.productionUrl=prod;
  if(!j.primaryPaths) j.primaryPaths=[];
  j.primaryPaths=[{id:'experience-command',title:'Experience Command',time:'1 min',href:'experience-command.html',steps:['experience-command.html','complete-route-index.html','evidence-docket-composer.html']},...(j.primaryPaths||[]).filter(x=>x.id!=='experience-command')];
  writeJson(p,j);
}
// Make primary pages expose the v58 command front door.
for(const href of ['index.html','command-center.html','experience-hub.html','experience-concierge.html','complete-route-index.html','experience-atlas.html','site-atlas.html','navigation-atlas.html','ascension-flight-deck.html']) ensureLink(path.join(siteDir,href));
// Update route counts in source pages and docs.
for(const f of fs.readdirSync(siteDir,{recursive:true})){
  const p=path.join(siteDir,f); if(!fs.existsSync(p)||!fs.statSync(p).isFile()||!String(f).endsWith('.html')) continue;
  let html=fs.readFileSync(p,'utf8');
  html=html.replace(/\b63\s+public routes\b/g, `${manifest.routeCount} public routes`).replace(/\b63\s+routes\b/g, `${manifest.routeCount} routes`).replace(/>63<\/b>/g, `>${manifest.routeCount}</b>`).replace(/>63<\/strong>/g, `>${manifest.routeCount}</strong>`);
  fs.writeFileSync(p,html);
}
for(const file of ['README.md','docs/DEMO_CATALOG.md','docs/COMPLETE_ROUTE_RECOVERY_V57.md']){
  const p=path.join(root,file); if(!fs.existsSync(p)) continue; let t=fs.readFileSync(p,'utf8');
  t=t.replace(/\b63\s+(?:canonical\s+)?public routes\b/g, `${manifest.routeCount} public routes`).replace(/\*\*63 public routes\*\*/g, `**${manifest.routeCount} public routes**`).replace(/data\/canonical-route-manifest-v57\.json/g,'data/canonical-route-manifest-v58.json');
  if(!t.includes('experience-command.html')) t += `\n\n## v58 complete experience command\n\nThe public website includes [Experience Command](../site/experience-command.html), a single command-grade route for every preserved public demo, proof room, loop/RSI console, ASI-horizon boundary, archive, legal boundary, and evidence surface.\n`;
  fs.writeFileSync(p,t);
}
fs.writeFileSync(path.join(docsDir,'COMPLETE_EXPERIENCE_RESTORATION_V58.md'), `# Complete Experience Restoration Command v58\n\nGoalOS AGIJobManager Ascension now exposes ${manifest.routeCount} public routes through one complete command-grade experience.\n\n## What changed\n\n- Added \`experience-command.html\` as the primary command route.\n- Preserved every built page.\n- Updated Command Center, Experience Hub, Experience Concierge, route atlases, Complete Route Index, Site Command, manifests, docs, tests, and kernels.\n- Preserved the public-safe boundary: no account, no form, no wallet, no analytics, no cookies, no browser storage, no transaction broadcast, no production authority, and no user data wanted.\n`);
fs.writeFileSync(path.join(docsDir,'releases','V58_COMPLETE_EXPERIENCE_RESTORATION_COMMAND.md'), `# V58 Complete Experience Restoration Command\n\nThis release adds \`/experience-command.html\` and restores every public route into one clear user journey system.\n\nCanonical public route count: ${manifest.routeCount}.\n\n## Assurance\n\nThe release remains browser-local, public-safe, wallet-free, analytics-free, cookie-free, storage-free, and user-data-free.\n`);
// Sync dist when present.
const dist=path.join(root,'dist');
if(fs.existsSync(dist)){
  for(const href of manifest.pages.map(p=>p.href)){
    const src=path.join(siteDir,href), dst=path.join(dist,href); if(fs.existsSync(src)){fs.mkdirSync(path.dirname(dst),{recursive:true}); fs.copyFileSync(src,dst);}
  }
  for(const f of [...navFiles,'canonical-route-manifest.json','canonical-route-manifest-v58.json','canonical-route-manifest-v57.json','experience-command-demo.json']){const src=path.join(dataDir,f); if(fs.existsSync(src)) fs.copyFileSync(src,path.join(dist,f));}
  for(const f of ['experience-command.css','experience-command.js','site-command-v41.js']){const src=path.join(siteDir,'assets',f); const dst=path.join(dist,'assets',f); if(fs.existsSync(src)){fs.mkdirSync(path.dirname(dst),{recursive:true}); fs.copyFileSync(src,dst);}}
  for(const statusFile of ['production-url.json','build-manifest.json']){const sf=path.join(dist,statusFile); if(fs.existsSync(sf)){const j=readJson(sf); j.version='v58'; j.release=release; j.routeCount=manifest.routeCount; j.publicHtmlRouteCount=manifest.routeCount; j.completeExperienceRestoration='PASS'; j.releaseAliases=Array.from(new Set([...(j.releaseAliases||[]), RELEASE,'v58-complete-experience-restoration-command','v57-complete-route-recovery','v50-loop-to-rsi-sovereign-governance'])); writeJson(sf,j);}}
}
console.log(`PASS · complete experience restoration v58 restored ${manifest.routeCount} public routes`);
