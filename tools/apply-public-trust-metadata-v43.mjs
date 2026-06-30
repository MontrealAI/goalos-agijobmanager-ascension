import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const site=path.join(root,'site');
const manifest=JSON.parse(fs.readFileSync(path.join(root,'data','canonical-route-manifest-v43.json'),'utf8'));
const pageByHref=new Map(manifest.pages.map(p=>[p.href,p]));
const image=manifest.productionUrl+'assets/social-card.svg';
function esc(s){return String(s??'').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
for(const f of fs.readdirSync(site).filter(f=>f.endsWith('.html'))){
  const p=pageByHref.get(f)||{title:f.replace(/\.html$/,'').replaceAll('-',' '),description:'GoalOS AGIJobManager Ascension public-safe proof institution route.',canonicalUrl:manifest.productionUrl+f};
  let html=fs.readFileSync(path.join(site,f),'utf8');
  const titleMatch=html.match(/<title>([\s\S]*?)<\/title>/i);
  const title=titleMatch?titleMatch[1].trim():`${p.title} · GoalOS AGIJobManager Ascension`;
  const descMatch=html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || html.match(/<meta\s+content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const desc=(descMatch?descMatch[1]:p.description).slice(0,240);
  const url=p.canonicalUrl;
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
  html=html.replace('</head>',block+'</head>');
  fs.writeFileSync(path.join(site,f),html);
}
console.log(`PASS · public-trust metadata applied to ${manifest.pages.length} canonical routes`);
