import fs from 'node:fs';
import path from 'node:path';
const fail=m=>{console.error('FAIL · route manifest integrity: '+m); process.exit(1)};
const read=f=>JSON.parse(fs.readFileSync(f,'utf8'));
const manifest=read('data/canonical-route-manifest.json');
const pages=manifest.pages||manifest.routes||[];
if (!pages.length) fail('canonical manifest has no pages');
if (manifest.routeCount !== pages.length) fail(`routeCount ${manifest.routeCount} != pages length ${pages.length}`);
for (const p of pages) {
  const route=(p.route||p.path||p.url||'').replace(/^\//,'') || 'index.html';
  if (!route.endsWith('.html') && !route.endsWith('/')) continue;
  const source=path.join('site', route === '' ? 'index.html' : route);
  if (!fs.existsSync(source)) fail(`manifest route missing source file ${source}`);
  const dist=path.join('dist', route === '' ? 'index.html' : route);
  if (fs.existsSync('dist') && !fs.existsSync(dist)) fail(`manifest route missing dist file ${dist}; run npm run build and commit dist if dist is intentional`);
}
for (const file of ['README.md','docs/DEMO_CATALOG.md']) {
  if (!fs.existsSync(file)) continue;
  const text=fs.readFileSync(file,'utf8');
  const re=/(\d+)\s+(?:canonical\s+)?public routes|route count:\s*\*\*(\d+)\*\*/ig;
  let m; while ((m=re.exec(text))) { const n=Number(m[1]||m[2]); if (n!==pages.length && !/historical|compatibility lineage|v43-compatible/i.test(text.slice(Math.max(0, m.index-160), m.index+220))) fail(`${file} hardcodes stale route count ${n}; canonical is ${pages.length}`); }
}
for (const file of ['data/production-url.json','dist/production-url.json']) {
  if (!fs.existsSync(file)) continue;
  const j=read(file); const n=j.routeCount??j.publicHtmlRouteCount;
  if (n !== undefined && Number(n)!==pages.length) fail(`${file} route count ${n} != ${pages.length}`);
}
console.log(`PASS · route manifest integrity verified ${pages.length} canonical routes`);
