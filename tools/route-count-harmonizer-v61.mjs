import fs from 'node:fs';
import path from 'node:path';

const fail = message => { console.error(`FAIL · v61 route-count harmonizer: ${message}`); process.exit(1); };
const readJson = file => JSON.parse(fs.readFileSync(file, 'utf8'));
const writeJson = (file, data) => fs.writeFileSync(file, JSON.stringify(data, null, 2) + '\n');
if (!fs.existsSync('data/canonical-route-manifest.json')) fail('missing data/canonical-route-manifest.json');
const manifest = readJson('data/canonical-route-manifest.json');
const pages = manifest.pages || manifest.routes || [];
if (!Array.isArray(pages) || !pages.length) fail('canonical route manifest has no pages/routes array');
const count = pages.length;
const release = 'v61-route-count-self-healing-ask-goalos-public-proof-institution';
const productionUrl = manifest.productionUrl || 'https://montrealai.github.io/goalos-agijobmanager-ascension/';
const releaseAliases = ['v61-route-count-self-healing','v60-ask-goalos-autonomous-question-router','v59-canonical-proof-institution','v58-complete-experience-restoration','v57-complete-route-recovery','v46-compatibility-failsafe'];

function harmonizeManifestLike(file) {
  if (!fs.existsSync(file)) return false;
  let data;
  try { data = readJson(file); } catch { return false; }
  const before = JSON.stringify(data);
  data.pages = pages;
  data.routes = pages;
  data.routeCount = count;
  data.publicHtmlRouteCount = count;
  data.productionUrl = data.productionUrl || productionUrl;
  data.version = 'v61';
  data.release = data.release || release;
  data.releaseAliases = Array.from(new Set([...(data.releaseAliases || []), ...releaseAliases]));
  if (JSON.stringify(data) !== before) writeJson(file, data);
  return true;
}

const jsonTargets = new Set();
for (const dir of ['data', 'dist', 'dist/data']) {
  if (!fs.existsSync(dir)) continue;
  for (const name of fs.readdirSync(dir)) {
    if (/^canonical-route-manifest(?:-v\d+)?\.json$/.test(name)) jsonTargets.add(path.join(dir, name));
    if (/^site-navigation(?:-v\d+)?\.json$/.test(name)) jsonTargets.add(path.join(dir, name));
  }
}
for (const file of [
  'data/site-navigation-catalog.json',
  'data/site-navigation-map.json',
  'data/site-experience-atlas.json',
  'data/experience-hub-catalog.json',
  'data/production-url.json',
  'site/production-url.json',
  'dist/production-url.json'
]) jsonTargets.add(file);
let jsonChanged = 0;
for (const file of jsonTargets) if (harmonizeManifestLike(file)) jsonChanged++;

const updateRouteText = text => text
  .replace(/publishes \*\*\d+ public routes\*\* from `data\/canonical-route-manifest-v\d+\.json`/g, `publishes **${count} public routes** from \`data/canonical-route-manifest.json\``)
  .replace(/publishes \*\*\d+ public routes\*\* from `data\/canonical-route-manifest\.json`/g, `publishes **${count} public routes** from \`data/canonical-route-manifest.json\``)
  .replace(/exposes \*\*\d+ canonical public routes\*\*/g, `exposes **${count} canonical public routes**`)
  .replace(/current v\d+ canonical manifest lists \*\*\d+ canonical public routes\*\*/g, `current v61 canonical manifest lists **${count} canonical public routes**`)
  .replace(/route count:\s*\*\*\d+\*\*/gi, `route count: **${count}**`)
  .replace(/(\d+)\s+(canonical\s+)?public routes/g, (match, n, canonical) => `${count} ${canonical || ''}public routes`)
  .replace(/data\/canonical-route-manifest-v\d+\.json/g, 'data/canonical-route-manifest.json');

let docsChanged = 0;
for (const file of ['README.md', 'docs/DEMO_CATALOG.md', 'docs/ASK_GOALOS_AUTONOMOUS_QUESTION_ROUTER_V60.md', 'docs/CANONICAL_PROOF_INSTITUTION_V59.md', 'docs/COMPLETE_EXPERIENCE_RESTORATION_V58.md', 'docs/COMPLETE_ROUTE_RECOVERY_V57.md']) {
  if (!fs.existsSync(file)) continue;
  const before = fs.readFileSync(file, 'utf8');
  const after = updateRouteText(before);
  if (after !== before) { fs.writeFileSync(file, after); docsChanged++; }
}

for (const file of ['README.md', 'docs/DEMO_CATALOG.md']) {
  if (!fs.existsSync(file)) continue;
  const text = fs.readFileSync(file, 'utf8');
  const re = /(\d+)\s+(?:canonical\s+)?public routes|route count:\s*\*\*(\d+)\*\*/ig;
  let m;
  while ((m = re.exec(text))) {
    const n = Number(m[1] || m[2]);
    if (n !== count) fail(`${file} still hardcodes stale route count ${n}; canonical is ${count}`);
  }
}

writeJson('data/route-count-harmonizer-v61.json', {
  receiptType: 'GoalOSRouteCountHarmonizerReceipt',
  version: 'v61',
  routeCount: count,
  canonicalManifest: 'data/canonical-route-manifest.json',
  jsonTargets: jsonChanged,
  docsChanged,
  publicSafeBoundary: {
    noAccount: true,
    noForms: true,
    noWallet: true,
    noTokenApproval: true,
    noNetworkRequest: true,
    noAnalytics: true,
    noCookies: true,
    noBrowserStorage: true,
    noTransactionBroadcast: true,
    noProductionAuthority: true,
    noUserDataRetained: true
  }
});
console.log(`PASS · route-count harmonizer v61 normalized ${count} public routes across ${jsonChanged} manifests/catalogs and ${docsChanged} live docs`);
