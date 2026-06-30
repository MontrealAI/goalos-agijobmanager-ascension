import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const site=path.join(root,'site');
const manifestPath = ['data/canonical-route-manifest-v46.json','data/canonical-route-manifest-v45.json','data/canonical-route-manifest-v43.json'].find((p)=>fs.existsSync(p));
const manifest=manifestPath?JSON.parse(fs.readFileSync(manifestPath,'utf8')):{productionUrl:'https://montrealai.github.io/goalos-agijobmanager-ascension/',pages:[]};
const prod=manifest.productionUrl || 'https://montrealai.github.io/goalos-agijobmanager-ascension/';
const pageByHref=new Map((manifest.pages||[]).map(p=>[p.href||p.route?.replace(/^\//,''),p]));
const image=prod+'assets/social-card.svg';
function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
function collect(dir){
  const out=[];
  if(!fs.existsSync(dir)) return out;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name);
    if(entry.isDirectory()) out.push(...collect(p));
    else if(entry.isFile() && entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}
let count=0;
for(const file of collect(site)){
  const rel=path.relative(site,file).replace(/\\/g,'/');
  const p=pageByHref.get(rel)||pageByHref.get(path.basename(rel))||{title:rel.replace(/\.html$/,'').replaceAll('-',' ').replaceAll('/',' · '),description:'GoalOS AGIJobManager Ascension public-safe proof institution route.',canonicalUrl:prod+rel};
  let html=fs.readFileSync(file,'utf8');
  const titleMatch=html.match(/<title>([\s\S]*?)<\/title>/i);
  const title=titleMatch?titleMatch[1].trim():`${p.title} · GoalOS AGIJobManager Ascension`;
  const descMatch=html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || html.match(/<meta\s+content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const desc=(descMatch?descMatch[1]:p.description||'GoalOS AGIJobManager Ascension public-safe proof institution route.').slice(0,240);
  const url=p.canonicalUrl || prod+rel;
  html=html
    .replace(/<link\s+rel=["']canonical["'][^>]*>/ig,'')
    .replace(/<meta\s+name=["']description["'][^>]*>/ig,'')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/ig,'')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/ig,'')
    .replace(/<meta\s+name=["']theme-color["'][^>]*>/ig,'');
  const block=[
    `<meta name="description" content="${esc(desc)}">`,
    `<link rel="canonical" href="${esc(url)}">`,
    `<meta property="og:type" content="website">`,
    `<meta property="og:site_name" content="GoalOS AGIJobManager Ascension">`,
    `<meta property="og:title" content="${esc(title)}">`,
    `<meta property="og:description" content="${esc(desc)}">`,
    `<meta property="og:url" content="${esc(url)}">`,
    `<meta property="og:image" content="${esc(image)}">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(desc)}">`,
    `<meta name="twitter:image" content="${esc(image)}">`,
    `<meta name="theme-color" content="#061512">`
  ].join('');
  html=html.includes('</head>')?html.replace('</head>',block+'</head>'):block+html;
  fs.writeFileSync(file,html); count++;
}
console.log(`PASS · public-trust metadata v46 applied to ${count} site HTML files`);
