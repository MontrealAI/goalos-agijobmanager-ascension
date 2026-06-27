import fs from 'node:fs';
import assert from 'node:assert/strict';

const read = p => fs.readFileSync(p, 'utf8');
const expertHtml = read('site/expert-console.html');
const expertJs = read('site/assets/expert-console.js');
const index = read('site/index.html');
const catalog = JSON.parse(read('data/agijobmanager-expert-action-catalog.json'));

assert(index.includes('expert-console.html'), 'homepage must link to local expert console');
assert(expertHtml.includes('Expert Mainnet Console'), 'expert console page missing');
assert(expertJs.includes('eth_requestAccounts'), 'wallet connection capability missing');
assert(expertJs.includes('wallet_switchEthereumChain'), 'network switch capability missing');
assert(expertJs.includes('approve(CANON.manager'), 'exact AGIALPHA approval capability missing');
assert(expertJs.includes('staticCall'), 'transaction simulation missing');
assert(expertJs.includes('estimateGas'), 'gas estimation missing');
assert(expertJs.includes('AUTHORIZE MAINNET'), 'typed broadcast confirmation missing');
assert(expertJs.includes('ACTIVATE PRODUCTION AUTHORITY'), 'production authority phrase missing');
assert(!expertJs.includes('MaxUint256'), 'unlimited approval must not be used');
assert(!expertJs.includes('localStorage.setItem') && !expertJs.includes('privateKey'), 'private key or persistent wallet storage forbidden');
for (const action of ['createJob','applyForJob','requestJobCompletion','validateJob','disapproveJob','disputeJob','finalizeJob','expireJob','cancelJob']) {
  assert(catalog.actions.includes(action), `missing action ${action}`);
  assert(expertJs.includes(action), `expert JS missing ${action}`);
}
console.log('operator parity PASS · expert Mainnet console matches public posture and legacy action model');
