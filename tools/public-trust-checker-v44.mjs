import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const manifestCandidates = [
  path.join(root, 'data', 'canonical-route-manifest-v44.json'),
  path.join(root, 'data', 'canonical-route-manifest-v43.json')
];
const manifestPath = manifestCandidates.find((p) => fs.existsSync(p));
if (!manifestPath) {
  console.error('FAIL · missing canonical-route-manifest-v44.json or v43 fallback');
  process.exit(1);
}
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
const sourceDirs = [path.join(root, 'site')];
if (process.env.CHECK_DIST === 'true' && fs.existsSync(path.join(root, 'dist'))) sourceDirs.push(path.join(root, 'dist'));
let fail = [];
const visibleBad = [
  /Loading…/i,
  />\s*Loading\s*</i,
  />\s*0 routes\s*</i,
  />\s*0 public routes\s*</i,
  />\s*0 matching pages\s*</i,
  /—public routes indexed/i,
  /—recommended paths/i,
  /menu over menu/i
];
for (const sourceDir of sourceDirs) {
  for (const page of manifest.pages || []) {
    const file = path.join(sourceDir, page.href);
    if (!fs.existsSync(file)) { fail.push(`${path.relative(root, file)} missing route`); continue; }
    const html = fs.readFileSync(file, 'utf8');
    const checks = [
      ['title', /<title>[^<]+<\/title>/i],
      ['meta description', /<meta\s+name=["']description["']\s+content=["'][^"']{20,}["']/i],
      ['canonical', /<link\s+rel=["']canonical["']\s+href=["']https:\/\/montrealai\.github\.io\/goalos-agijobmanager-ascension\/?[^"']*["']/i],
      ['og title', /<meta\s+property=["']og:title["']\s+content=["'][^"']+["']/i],
      ['og description', /<meta\s+property=["']og:description["']\s+content=["'][^"']+["']/i],
      ['og url', /<meta\s+property=["']og:url["']\s+content=["']https:\/\/montrealai\.github\.io\/goalos-agijobmanager-ascension\/?[^"']*["']/i],
      ['og image', /<meta\s+property=["']og:image["']\s+content=["'][^"']+social-card\.svg["']/i],
      ['twitter card', /<meta\s+name=["']twitter:card["']\s+content=["']summary_large_image["']/i]
    ];
    for (const [label, re] of checks) if (!re.test(html)) fail.push(`${page.href}: missing ${label}`);
    for (const re of visibleBad) if (re.test(html)) fail.push(`${page.href}: blank/loading/stacked-menu fallback ${re}`);
  }
}
for (const sourceDir of sourceDirs) {
  for (const htmlFile of fs.readdirSync(sourceDir).filter((f) => f.endsWith('.html'))) {
    const html = fs.readFileSync(path.join(sourceDir, htmlFile), 'utf8');
    for (const re of visibleBad) if (re.test(html)) fail.push(`${path.basename(sourceDir)}/${htmlFile}: global no-loading violation ${re}`);
    const topInjectors = (html.match(/site-command-v39|navigation-v37|navigation-v38|site-shell|site-guide|nav-atlas/g) || []).length;
    if (topInjectors > 2) fail.push(`${path.basename(sourceDir)}/${htmlFile}: legacy navigation injector remnants ${topInjectors}`);
  }
  const indexFile = path.join(sourceDir, 'index.html');
  if (fs.existsSync(indexFile)) {
    const idx = fs.readFileSync(indexFile, 'utf8');
    if (!idx.includes(`<b>${manifest.routeCount}</b><span>public routes</span>`)) fail.push(`${path.relative(root,indexFile)}: route count does not match manifest (${manifest.routeCount})`);
  }
}
if (fail.length) {
  console.error('FAIL · public trust v44 checks failed');
  for (const f of fail.slice(0, 100)) console.error(' - ' + f);
  if (fail.length > 100) console.error(` - ... ${fail.length - 100} more`);
  process.exit(1);
}
console.log(`PASS · public trust v44 metadata, exact route count, no Loading fallbacks, and no legacy nav stacking across ${(manifest.pages || []).length} routes`);
