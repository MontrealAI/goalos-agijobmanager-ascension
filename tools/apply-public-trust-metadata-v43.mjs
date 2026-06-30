import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const site = path.join(root, 'site');
const candidates = [
  path.join(root, 'data', 'canonical-route-manifest-v44.json'),
  path.join(root, 'data', 'canonical-route-manifest-v43.json')
];
const manifestPath = candidates.find((p) => fs.existsSync(p));
if (!manifestPath) {
  console.error('FAIL · missing canonical route manifest for public-trust metadata');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const pageByHref = new Map((manifest.pages || []).map((p) => [p.href, p]));
const prod = manifest.productionUrl || 'https://montrealai.github.io/goalos-agijobmanager-ascension/';
const image = prod + 'assets/social-card.svg';
function esc(s){return String(s ?? '').replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;')}
if (!fs.existsSync(site)) {
  console.error('FAIL · missing site directory for metadata application');
  process.exit(1);
}
let count = 0;
for (const f of fs.readdirSync(site).filter((f) => f.endsWith('.html'))) {
  const p = pageByHref.get(f) || {
    title: f.replace(/\.html$/,'').replaceAll('-',' '),
    description: 'GoalOS AGIJobManager Ascension public-safe proof institution route.',
    canonicalUrl: prod + f
  };
  const pagePath = path.join(site, f);
  let html = fs.readFileSync(pagePath, 'utf8');
  const titleMatch = html.match(/<title>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? titleMatch[1].trim() : `${p.title} · GoalOS AGIJobManager Ascension`;
  const descMatch = html.match(/<meta\s+name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i) || html.match(/<meta\s+content=["']([^"']*)["'][^>]*name=["']description["'][^>]*>/i);
  const desc = (descMatch ? descMatch[1] : p.description || 'GoalOS AGIJobManager Ascension public-safe proof institution.').slice(0, 240);
  const url = p.canonicalUrl || prod + f;
  html = html
    .replace(/<link\s+rel=["']canonical["'][^>]*>/ig, '')
    .replace(/<meta\s+name=["']description["'][^>]*>/ig, '')
    .replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/ig, '')
    .replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/ig, '')
    .replace(/<meta\s+name=["']theme-color["'][^>]*>/ig, '');
  const block = [
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
  html = html.includes('</head>') ? html.replace('</head>', block + '</head>') : block + html;
  fs.writeFileSync(pagePath, html);
  count++;
}
console.log(`PASS · public-trust metadata v44 applied to ${count} source HTML pages using ${path.basename(manifestPath)}`);
