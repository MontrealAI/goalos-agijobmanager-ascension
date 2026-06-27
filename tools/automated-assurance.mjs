import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(import.meta.dirname, '..');
function read(p){return fs.readFileSync(path.join(root,p),'utf8')}
const expert = read('site/assets/mainnet-console.js');
const pages = ['site/index.html','site/operator-console.html','site/expert-mainnet-console.html','site/architecture.html','site/verification.html'].map(read).join('\n');
const assertions = [];
function ok(name, cond){ assertions.push([name, !!cond]); if(!cond) console.error('FAIL', name); }
ok('wallet only in expert module', expert.includes('eth_requestAccounts') && read('site/index.html').includes('default read-only'));
ok('no auto wallet connection on load', !/DOMContentLoaded[^]*connectWallet\s*\(/.test(expert));
ok('mainnet switch requires typed phrase', expert.includes("typed('SWITCH TO MAINNET')"));
ok('approval requires typed phrase', expert.includes("typed('APPROVE EXACT AGIALPHA')"));
ok('broadcast requires typed phrase', expert.includes("typed('BROADCAST MAINNET TRANSACTION')"));
ok('exact approval not unlimited', !expert.includes('MaxUint') && expert.includes('token.approve(AGI_JOB_MANAGER, amount)'));
ok('preflight static call present', expert.includes('.staticCall'));
ok('gas estimate present', expert.includes('.estimateGas'));
ok('human terms gate present', expert.includes('termsBox') && pages.includes('human wallet'));
ok('legacy posture reflected', pages.includes('legacy operating posture') || pages.includes('Legacy console'));
ok('audit wording honest', read('site/verification.html').includes('not a third-party audit opinion'));
if(!assertions.every(x=>x[1])) process.exit(1);
fs.writeFileSync(path.join(root,'AUTOMATED_ASSURANCE_SUMMARY.json'), JSON.stringify({status:'PASS',checks:assertions.length,scope:'static controls + capability conformance + no autonomous fund movement'},null,2));
console.log(`Automated assurance PASS · ${assertions.length}/${assertions.length} checks`);
