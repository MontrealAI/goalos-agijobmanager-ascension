import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const packetPath = path.join(root, 'data/public-proof-institution-readiness.json');
const manifestPath = path.join(root, 'data/canonical-route-manifest.json');

function fail(message) {
  console.error(`FAIL · public proof readiness: ${message}`);
  process.exit(1);
}

const packet = JSON.parse(fs.readFileSync(packetPath, 'utf8'));
const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));

if (!packet.productionUrl.startsWith('https://montrealai.github.io/goalos-agijobmanager-ascension/')) {
  fail('production URL is not the canonical GitHub Pages URL');
}

if (packet.canonicalRouteManifest !== 'data/canonical-route-manifest.json') {
  fail('canonical route manifest pointer drifted');
}

const routes = Array.isArray(manifest.pages) ? manifest.pages : [];
if (packet.canonicalRouteCount !== routes.length) {
  fail(`canonical route count ${packet.canonicalRouteCount} does not match manifest pages length ${routes.length}`);
}

const posture = packet.defaultPublicPosture || {};
for (const [key, value] of Object.entries(posture)) {
  if (value !== true) fail(`default public posture ${key} must remain true`);
}

const requiredDomains = new Set([
  'visitor_clarity',
  'route_continuity',
  'public_safe_boundary',
  'claim_discipline',
  'legal_privacy_token_boundary',
  'release_repeatability'
]);
for (const domain of packet.reviewDomains || []) {
  requiredDomains.delete(domain.domain);
  for (const evidence of domain.primaryEvidence || []) {
    if (!fs.existsSync(path.join(root, evidence))) {
      fail(`missing evidence file ${evidence} for ${domain.domain}`);
    }
  }
}
if (requiredDomains.size) {
  fail(`missing review domains: ${Array.from(requiredDomains).join(', ')}`);
}

for (const check of ['node tools/public-proof-readiness-checker.mjs', 'npm test', 'npm run build']) {
  if (!packet.requiredChecks.includes(check)) fail(`required check missing: ${check}`);
}

console.log(`PASS · public proof readiness verified ${routes.length} canonical routes across ${packet.reviewDomains.length} review domains`);
