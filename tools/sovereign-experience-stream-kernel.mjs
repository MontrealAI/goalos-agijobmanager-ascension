import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const fail = msg => { console.error(msg); process.exit(1); };
const mustExist = [
  'site/sovereign-experience-stream.html',
  'site/assets/experience-stream.css',
  'site/assets/experience-stream.js',
  'data/sovereign-experience-stream-demo.json',
  'schemas/sovereign-experience-stream.schema.json',
  'docs/SOVEREIGN_EXPERIENCE_STREAM_V24.md'
];
for (const f of mustExist) if (!fs.existsSync(path.join(root,f))) fail(`missing ${f}`);
const html = fs.readFileSync(path.join(root,'site/sovereign-experience-stream.html'),'utf8');
const js = fs.readFileSync(path.join(root,'site/assets/experience-stream.js'),'utf8');
const data = JSON.parse(fs.readFileSync(path.join(root,'data/sovereign-experience-stream-demo.json'),'utf8'));
const forbidden = ['ethereum.request','eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','approve(','transfer(','localStorage','sessionStorage','fetch(','XMLHttpRequest','<form','setItem('];
for (const token of forbidden) if ((html + js).includes(token)) fail(`forbidden public primitive found: ${token}`);
for (const token of ['ExperienceEvent','GroundedRewardLedger','Validator is not reward','No user data wanted','No account','No cookies','No analytics','No storage','No wallet','No network request','No transaction broadcast','Human review']) {
  if (!html.includes(token) && !js.includes(token) && !JSON.stringify(data).includes(token)) fail(`missing marker ${token}`);
}
if (!js.includes('d.y-=d.v')) fail('ascendant particle motion d.y-=d.v is required');
if (!data.publicSafety.noUserDataWanted || !data.publicSafety.noNetworkRequest || !data.publicSafety.noStorage) fail('public safety flags must be true');
if (!data.verdicts.includes('POLICY_UPDATE_ALLOWED_AFTER_HUMAN_REVIEW') || !data.verdicts.includes('QUARANTINE_REWARD_SIGNAL')) fail('verdict taxonomy incomplete');
console.log('Sovereign Experience Stream v24 PASS');
