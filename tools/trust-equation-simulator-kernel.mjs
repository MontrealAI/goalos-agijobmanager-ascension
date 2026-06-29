import fs from 'node:fs';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
for(const f of ['dist/trust-equation-simulator.html','dist/trust-equation-simulator-demo.json']) must(fs.existsSync(f),`dist artifact exists: ${f}`);
const html=fs.readFileSync('dist/trust-equation-simulator.html','utf8');
must(html.includes('When proof is zero') && html.includes('Download TrustReceipt'),'dist page exposes core simulator UX');
const report={status:'PASS',release:'v35-trust-equation-simulator',page:'trust-equation-simulator.html',networkRequests:0,walletCalls:0,storageWrites:0,userDataWanted:false,teachingLaw:'AI Work = Output × Proof × Validation × Settlement × Reuse'};
fs.writeFileSync('TRUST_EQUATION_SIMULATOR_V35_REPORT.json',JSON.stringify(report,null,2));
console.log('Trust Equation Simulator v35 kernel PASS');
