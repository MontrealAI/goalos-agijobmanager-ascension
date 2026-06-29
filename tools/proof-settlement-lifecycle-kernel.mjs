import fs from 'node:fs';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
for(const f of ['dist/proof-settlement-lifecycle.html','dist/proof-settlement-lifecycle-demo.json']) must(fs.existsSync(f),`dist artifact exists: ${f}`);
const page=fs.readFileSync('dist/proof-settlement-lifecycle.html','utf8');
must(/No ProofBundle, no settlement/.test(page),'dist page exposes settlement law');
must(/simulated only/i.test(page),'dist page keeps simulated-only boundary');
fs.writeFileSync('PROOF_SETTLEMENT_LIFECYCLE_V36_REPORT.json',JSON.stringify({status:'PASS',page:'proof-settlement-lifecycle.html',demo:'proof-settlement-lifecycle-demo.json',posture:['browser-local','zero-network','no-wallet','simulated-settlement-only']},null,2));
console.log('Proof-Settlement Lifecycle Console v36 kernel PASS');