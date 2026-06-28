import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const fail = msg => { throw new Error(msg); };
const ok = msg => console.log('PASS · '+msg);
const required = [
  'site/ascension-inflow-control.html',
  'site/assets/inflow-control.css',
  'site/assets/inflow-control.js',
  'data/ascension-inflow-control-demo.json',
  'schemas/ascension-inflow-control.schema.json',
  'docs/ASCENSION_INFLOW_CONTROL_ROOM_V21.md'
];
for (const rel of required) if (!fs.existsSync(path.join(root, rel))) fail('missing '+rel);
ok('inflow control source files exist');
const html = read('site/ascension-inflow-control.html');
const js = read('site/assets/inflow-control.js');
const built = fs.existsSync(path.join(root,'dist/ascension-inflow-control.html')) ? read('dist/ascension-inflow-control.html') : '';
const data = JSON.parse(read('data/ascension-inflow-control-demo.json'));
if (data.inflows.length !== 7) fail('inflow demo must define seven inflows');
if (!data.publicSafetyBoundary.noNetworkRequest || !data.publicSafetyBoundary.noWallet || !data.publicSafetyBoundary.noUserDataWanted) fail('public safety boundary incomplete');
ok('data contract asserts zero-network/no-wallet/no-user-data');
for (const rel of ['site/ascension-inflow-control.html','site/assets/inflow-control.js']) {
  const text = read(rel);
  for (const bad of ['fetch(', 'XMLHttpRequest', 'sendBeacon', 'localStorage', 'sessionStorage', 'eth_requestAccounts', 'wallet_switchEthereumChain', 'eth_sendTransaction', 'MaxUint256', 'privateKey']) {
    if (text.includes(bad)) fail(rel+' contains forbidden primitive '+bad);
  }
}
ok('inflow page is public-safe');
for (const phrase of ['Compute','Data','Tasks','Incentives','Feedback','Governance','Tools','ProofPacket','SelectionCertificate','ChronicleEntry','EvidenceDocket']) {
  if (!html.includes(phrase) && !js.includes(phrase) && !JSON.stringify(data).includes(phrase)) fail('missing protocol/inflow marker '+phrase);
}
ok('protocol markers and inflow markers present');
if (built && !built.includes('Ascension Inflow Control Room')) fail('built page missing v21 route content');
if (fs.existsSync(path.join(root,'dist/ascension-inflow-control-demo.json'))) ok('build emits inflow demo JSON');
fs.writeFileSync(path.join(root,'ASCENSION_INFLOW_CONTROL_ROOM_V21_REPORT.json'), JSON.stringify({status:'PASS',checks:required.length,route:'/ascension-inflow-control.html',demoJson:'/ascension-inflow-control-demo.json',boundary:data.publicSafetyBoundary},null,2));
console.log('Ascension Inflow Control Room kernel PASS');
