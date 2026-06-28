import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
const read = rel => fs.readFileSync(path.join(root, rel), 'utf8');
const fail = msg => { throw new Error(msg); };
const ok = msg => console.log('PASS · '+msg);
for (const rel of [
  'site/ascension-inflow-control.html',
  'site/assets/inflow-control.css',
  'site/assets/inflow-control.js',
  'data/ascension-inflow-control-demo.json',
  'schemas/ascension-inflow-control.schema.json',
  'docs/ASCENSION_INFLOW_CONTROL_ROOM_V21.md'
]) if (!fs.existsSync(path.join(root, rel))) fail('missing '+rel);
ok('v21 files exist');
const html = read('site/ascension-inflow-control.html');
const js = read('site/assets/inflow-control.js');
const data = JSON.parse(read('data/ascension-inflow-control-demo.json'));
for (const phrase of ['Ascension Inflow Control Room','Trusted Work = Output × Proof × Validation × Settlement × Reuse','No account','No wallet','no network request','Do not enter personal','Download Evidence Docket JSON']) {
  if (!html.includes(phrase)) fail('page missing phrase: '+phrase);
}
ok('page teaches regulated inflow and public safety boundary');
for (const key of ['compute','data','tasks','incentives','feedback','governance','tools']) {
  if (!js.includes(key)) fail('js missing inflow '+key);
  if (!data.inflows.some(x => x.id === key)) fail('data missing inflow '+key);
}
ok('seven inflows are implemented in data and JS');
for (const phrase of ['SUSTAINED_ASCENSION','UNGOVERNED_ACTUATION','CHAOTIC_SWARM','BUREAUCRATIC_STALL','STALE_SELF_REFERENCE','INERT_QUEUE']) {
  if (!js.includes(phrase) || !data.regimes.includes(phrase)) fail('regime missing '+phrase);
}
ok('regime detection is implemented');
for (const bad of ['fetch(', 'XMLHttpRequest', 'sendBeacon', 'localStorage', 'sessionStorage', 'eth_requestAccounts', 'wallet_switchEthereumChain', 'eth_sendTransaction', 'approve(', 'privateKey']) {
  if (html.includes(bad) || js.includes(bad)) fail('forbidden public demo primitive found: '+bad);
}
ok('public demo remains zero-network and wallet-free');
if (!js.includes('d.y-=d.v')) fail('ascendant particle motion must be upward');
if (!js.includes('downloadDocket')) fail('downloadable docket control missing');
if (!js.includes('navigator.clipboard')) fail('copy review brief affordance missing');
ok('public delight controls are present');
console.log('Ascension Inflow Control Room v21 PASS');
