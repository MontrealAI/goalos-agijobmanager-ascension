import fs from 'node:fs';
import path from 'node:path';
const fail = message => { console.error(`FAIL · public trust checker v61: ${message}`); process.exit(1); };
const manifest = JSON.parse(fs.readFileSync('data/canonical-route-manifest.json', 'utf8'));
const pages = manifest.pages || manifest.routes || [];
if (manifest.routeCount !== pages.length) fail(`routeCount ${manifest.routeCount} != pages length ${pages.length}`);
for (const file of ['site/ask-goalos.html', 'site/index.html', 'docs/DEMO_CATALOG.md', 'README.md']) {
  if (!fs.existsSync(file)) fail(`missing required file ${file}`);
}
const forbidden = [/connectWallet\s*\(/, /ethereum\.request/, /localStorage\./, /sessionStorage\./, /document\.cookie/, /fetch\s*\(/, /XMLHttpRequest/, /navigator\.sendBeacon/];
const expertOnly = new Set(['site/expert-mainnet-console.html', 'site/expert-console.html']);
const siteHtml = fs.readdirSync('site').filter(f => f.endsWith('.html')).map(f => `site/${f}`);
for (const file of siteHtml) {
  if (expertOnly.has(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  for (const re of forbidden) if (re.test(text)) fail(`${file} contains forbidden public primitive ${re}`);
}
for (const file of expertOnly) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  if (!/expert|human|authority|mainnet|separated/i.test(text)) fail(`${file} lacks expert-only boundary language`);
}
const catalog = fs.readFileSync('docs/DEMO_CATALOG.md', 'utf8');
if (!catalog.includes(`${pages.length} public routes`)) fail('demo catalog route count is not current');
if (/65 public routes/.test(catalog)) fail('demo catalog still has stale route count');
console.log(`PASS · public trust checker v61 verified Ask GoalOS and ${pages.length} current public routes; expert-only wallet surfaces remain separated`);
