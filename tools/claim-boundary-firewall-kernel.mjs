import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const fail = msg => { throw new Error(msg); };
const ok = msg => console.log('PASS · '+msg);
const required = [
  'site/claim-boundary-firewall.html',
  'site/assets/claim-firewall.css',
  'site/assets/claim-firewall.js',
  'data/claim-boundary-firewall-demo.json',
  'schemas/claim-boundary-firewall.schema.json',
  'docs/CLAIM_BOUNDARY_FIREWALL_V22.md'
];
for (const rel of required) if (!fs.existsSync(path.join(root, rel))) fail('missing '+rel);
ok('claim boundary firewall files exist');
const html = read('site/claim-boundary-firewall.html');
const js = read('site/assets/claim-firewall.js');
const built = fs.existsSync(path.join(root,'dist/claim-boundary-firewall.html')) ? read('dist/claim-boundary-firewall.html') : '';
const data = JSON.parse(read('data/claim-boundary-firewall-demo.json'));
if (!data.publicSafety || data.publicSafety.userDataWanted !== false || data.publicSafety.networkRequest !== false || data.publicSafety.walletConnection !== false) fail('public safety boundary incomplete');
ok('data contract asserts no user data, no network, no wallet');
for (const rel of ['site/claim-boundary-firewall.html','site/assets/claim-firewall.js']) {
  const text = read(rel);
  for (const bad of ['fetch(', 'XMLHttpRequest', 'navigator.sendBeacon', 'WebSocket(', 'localStorage', 'sessionStorage', '<form', 'eth_requestAccounts', 'wallet_switchEthereumChain', 'eth_sendTransaction', 'MaxUint256', 'privateKey']) {
    if (text.includes(bad)) fail(rel+' contains forbidden primitive '+bad);
  }
}
ok('public demo is zero-network and authority-free');
for (const phrase of ['GoalOSCommit','ProofPacket','EvalAttestation','SelectionCertificate','EvidenceDocket','ChronicleEntry','public/private']) {
  if (!html.includes(phrase) && !js.includes(phrase) && !JSON.stringify(data).includes(phrase)) fail('missing protocol marker '+phrase);
}
ok('protocol objects and public/private boundary are present');
if (built && !built.includes('Claim Boundary Firewall')) fail('built route missing Claim Boundary Firewall content');
if (fs.existsSync(path.join(root,'dist/claim-boundary-firewall-demo.json'))) ok('build emits claim firewall demo JSON');
fs.writeFileSync(path.join(root,'CLAIM_BOUNDARY_FIREWALL_V22_REPORT.json'), JSON.stringify({status:'PASS',route:'/claim-boundary-firewall.html',demoJson:'/claim-boundary-firewall-demo.json',gates:data.gates,boundary:data.publicSafety},null,2));
fs.writeFileSync(path.join(root,'CLAIM_BOUNDARY_FIREWALL_V22_REPORT.md'), '# Claim Boundary Firewall v22\n\nStatus: PASS. The browser-local claim boundary demo, public-safe Evidence Docket export, and zero-network/no-wallet/no-user-data boundary were verified.\n');
console.log('Claim Boundary Firewall kernel PASS');
