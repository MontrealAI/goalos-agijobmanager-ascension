import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const mustExist = [
  'site/replay-falsification-gauntlet.html',
  'site/assets/replay-gauntlet.css',
  'site/assets/replay-gauntlet.js',
  'data/replay-falsification-gauntlet-demo.json',
  'schemas/replay-falsification-gauntlet.schema.json',
  'docs/REPLAY_FALSIFICATION_GAUNTLET_V23.md'
];
const fail = msg => { console.error(msg); process.exit(1); };
for (const f of mustExist) if (!fs.existsSync(path.join(root,f))) fail(`missing ${f}`);
const html = fs.readFileSync(path.join(root,'site/replay-falsification-gauntlet.html'),'utf8');
const js = fs.readFileSync(path.join(root,'site/assets/replay-gauntlet.js'),'utf8');
const data = JSON.parse(fs.readFileSync(path.join(root,'data/replay-falsification-gauntlet-demo.json'),'utf8'));
const forbiddenPublic = [
  'ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','approve(','transfer(','localStorage','sessionStorage','fetch(','XMLHttpRequest','<form','setItem('
];
for (const token of forbiddenPublic) {
  if ((html + js).includes(token)) fail(`forbidden public primitive found: ${token}`);
}
const required = [
  'ReplayReceipt','FalsificationReport','GoalOSCommit','RunCommitment','ProofPacket','EvalAttestation','SelectionCertificate','Evidence Docket','No user data wanted','No account','No cookies','No analytics','No storage','No wallet','No network request','No external action','Human review'
];
for (const token of required) if (!html.includes(token) && !js.includes(token) && !JSON.stringify(data).includes(token)) fail(`missing marker ${token}`);
if (!js.includes('d.y-=d.v')) fail('ascendant particle motion d.y-=d.v is required');
if (!data.publicSafety.noUserDataWanted || !data.publicSafety.noNetworkRequest || !data.publicSafety.noWalletConnection) fail('public safety flags must be true');
if (!data.verdicts.includes('REPLAY_SURVIVED_PUBLIC_SAFE') || !data.verdicts.includes('REJECT_STRONG_CLAIM')) fail('verdict taxonomy incomplete');
console.log('Replay & Falsification Gauntlet v23 PASS');
