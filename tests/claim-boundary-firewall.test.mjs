import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const fail = msg => { throw new Error(msg); };
const ok = msg => console.log('PASS · '+msg);
for (const rel of [
  'site/claim-boundary-firewall.html',
  'site/assets/claim-firewall.css',
  'site/assets/claim-firewall.js',
  'data/claim-boundary-firewall-demo.json',
  'schemas/claim-boundary-firewall.schema.json',
  'docs/CLAIM_BOUNDARY_FIREWALL_V22.md'
]) if (!fs.existsSync(path.join(root, rel))) fail('missing '+rel);
ok('v22 source files exist');
const html = read('site/claim-boundary-firewall.html');
const js = read('site/assets/claim-firewall.js');
const data = JSON.parse(read('data/claim-boundary-firewall-demo.json'));
for (const phrase of ['A claim enters.', 'The firewall', 'Verifier Mesh', 'Evidence Docket', 'No user data wanted', 'no wallet', 'no network request', 'Download docket JSON']) {
  if (!html.includes(phrase)) fail('page missing phrase: '+phrase);
}
ok('page teaches claim boundary and public-safe proof-room posture');
for (const gate of ['claimBounded','sourceProvenance','evidenceSupport','contradictionCoverage','riskClassed','replayPath','publicPrivateBoundary','humanReview']) {
  if (!JSON.stringify(data).includes(gate)) fail('data missing gate '+gate);
}
ok('all claim promotion gates are represented in data contract');
for (const verdict of ['PUBLISH_PUBLIC_SAFE_DOCKET','NEEDS_MORE_EVIDENCE','QUARANTINE_PRIVATE_APPENDIX','REJECT_STRONG_CLAIM']) {
  if (!js.includes(verdict) && !JSON.stringify(data).includes(verdict)) fail('missing verdict '+verdict);
}
ok('publication/quarantine/rejection verdicts implemented');
for (const bad of ['fetch(', 'XMLHttpRequest', 'sendBeacon', 'WebSocket(', 'localStorage', 'sessionStorage', '<form', 'eth_requestAccounts', 'wallet_switchEthereumChain', 'eth_sendTransaction', 'approve(', 'privateKey']) {
  if (html.includes(bad) || js.includes(bad)) fail('forbidden public demo primitive found: '+bad);
}
ok('page remains zero-network, storage-free, wallet-free, and form-free');
if (!js.includes('d.y-=d.v')) fail('ascendant particle motion must be upward');
if (!js.includes('navigator.clipboard')) fail('copy review brief affordance missing');
if (!js.includes('downloadDocket')) fail('downloadable docket control missing');
ok('delight controls and ascendant motion are present');
console.log('Claim Boundary Firewall v22 PASS');
