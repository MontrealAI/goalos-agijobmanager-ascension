import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const manifestPath=path.join(root,'data','canonical-route-manifest-v45.json');
if(!fs.existsSync(manifestPath)){console.error('FAIL · missing canonical-route-manifest-v45.json'); process.exit(1)}
const manifest=JSON.parse(fs.readFileSync(manifestPath,'utf8'));
const sourceDirs=[path.join(root,'site')];
if(process.env.CHECK_DIST==='true' && fs.existsSync(path.join(root,'dist'))) sourceDirs.push(path.join(root,'dist'));
let fail=[];
for(const sourceDir of sourceDirs){
for(const page of manifest.pages){
  const file=path.join(sourceDir,page.href);
  if(!fs.existsSync(file)){fail.push(`missing route: ${page.href}`); continue;}
  const html=fs.readFileSync(file,'utf8');
  const checks=[
    ['<title>', /<title>[^<]+<\/title>/i],
    ['meta description', /<meta\s+name=["']description["']\s+content=["'][^"']{20,}["']/i],
    ['canonical', /<link\s+rel=["']canonical["']\s+href=["']https:\/\/montrealai\.github\.io\/goalos-agijobmanager-ascension\/?[^"']*["']/i],
    ['og title', /<meta\s+property=["']og:title["']\s+content=["'][^"']+["']/i],
    ['og description', /<meta\s+property=["']og:description["']\s+content=["'][^"']+["']/i],
    ['og url', /<meta\s+property=["']og:url["']\s+content=["']https:\/\/montrealai\.github\.io\/goalos-agijobmanager-ascension\/?[^"']*["']/i],
    ['og image', /<meta\s+property=["']og:image["']\s+content=["'][^"']+social-card\.svg["']/i],
    ['twitter card', /<meta\s+name=["']twitter:card["']\s+content=["']summary_large_image["']/i]
  ];
  for(const [label,re] of checks) if(!re.test(html)) fail.push(`${page.href}: missing ${label}`);
  const visibleBad=[/Loading…/i,/>\s*Loading\s*</i,/>\s*0 routes\s*</i,/>\s*0 public routes\s*</i,/>\s*0 matching pages\s*</i,/—public routes indexed/i,/—recommended paths/i];
  for(const re of visibleBad) if(re.test(html)) fail.push(`${page.href}: blank/loading fallback ${re}`);
}
}
for(const sourceDir of sourceDirs){
const indexFile=path.join(sourceDir,'index.html');
if(fs.existsSync(indexFile)){
  const idx=fs.readFileSync(indexFile,'utf8');
  if(!idx.includes(`<b>${manifest.routeCount}</b><span>public routes</span>`)) fail.push(`${path.relative(root,indexFile)}: route count does not match manifest (${manifest.routeCount})`);
}
}
if(fail.length){console.error('FAIL · public trust v45 checks failed'); for(const f of fail.slice(0,80)) console.error(' - '+f); if(fail.length>80) console.error(` - ... ${fail.length-80} more`); process.exit(1);}
console.log(`PASS · public trust v45 metadata, exact route count, and no Loading fallbacks across ${manifest.pages.length} routes`);
