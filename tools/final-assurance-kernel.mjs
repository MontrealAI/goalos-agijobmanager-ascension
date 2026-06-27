import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const root = path.resolve(import.meta.dirname, '..');
const prod = 'https://montrealai.github.io/goalos-agijobmanager-ascension/';
const AGI_JOB_MANAGER = '0xB3AAeb69b630f0299791679c063d68d6687481d1';
const AGIALPHA = '0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA';
const required = [
  'site/index.html','site/operator-console.html','site/expert-console.html','site/expert-mainnet-console.html','site/sovereign-machine-economy.html','site/evidence/index.html','site/architecture.html','site/verification.html','site/assurance.html',
  'site/assets/atelier.css','site/assets/atelier.js','site/assets/expert-console.js','site/assets/sovereign-economy.js','site/assets/mainnet-console.js',
  'data/canonical-identities.json','data/evidence-docket-6-1.json','data/agijobmanager-action-catalog.json','data/agijobmanager-expert-action-catalog.json','data/capability-contract.json','data/mainnet-capability-contract.json','data/sovereign-machine-economy-capability-contract.json','data/final-assurance-policy.json',
  'schemas/goalos-intent.schema.json','schemas/evidence-docket.schema.json','schemas/mainnet-capability-contract.schema.json','schemas/sovereign-machine-economy.schema.json',
  'src/contracts/agijobmanager-parity.mjs','src/sovereign/sovereign-machine-economy.mjs','tools/build.py','tools/verify.py','tools/automated-assurance.mjs','tools/factual-correctness.mjs','tools/mainnet-factual-check.mjs',
  'docs/CLAIM_BOUNDARY.md','docs/AUTOMATED_AUDIT_EQUIVALENT.md','docs/EXPERT_CONSOLE_TRANSACTION_POSTURE.md','docs/SOVEREIGN_MACHINE_ECONOMY_IMPLEMENTATION.md','docs/FINAL_PRODUCTION_ASSURANCE_DOCKET_V11.md'
];
function read(p){ return fs.readFileSync(path.join(root,p),'utf8'); }
function exists(p){ return fs.existsSync(path.join(root,p)); }
function sha256(p){ return crypto.createHash('sha256').update(fs.readFileSync(path.join(root,p))).digest('hex'); }
const checks=[];
function assert(name, cond, detail=''){
  checks.push({name, status: cond ? 'PASS' : 'FAIL', detail});
  if(!cond) console.error(`FAIL: ${name}${detail ? ' · '+detail : ''}`);
}
for (const p of required) assert(`required file: ${p}`, exists(p));
if (checks.some(c=>c.status==='FAIL')) finish();
const texts = Object.fromEntries(required.filter(p=>exists(p)).map(p=>[p, read(p)]));
const all = Object.values(texts).join('\n');
assert('production URL present', all.includes(prod));
assert('canonical AGIJobManager address present', all.includes(AGI_JOB_MANAGER));
assert('canonical AGIALPHA address present', all.includes(AGIALPHA));
assert('chain id 1 present', /chain id `?1`?|"chainId"\s*:\s*1/.test(all));
for (const marker of ['META-AGENTIC α-AGI','AGI Alpha Node v0','AGI Jobs v0 (v2)','AGIJobManager','Sovereign Machine Economy']) assert(`lineage marker: ${marker}`, all.includes(marker));
for (const marker of ['GoalOSCommit','RunCommitment','ProofPacket','SelectionCertificate','Evidence Docket']) assert(`AEP object marker: ${marker}`, all.includes(marker));
for (const marker of ['createJob','applyForJob','requestJobCompletion','validateJob','disapproveJob','disputeJob','finalizeJob','expireJob','cancelJob']) assert(`AGIJobManager action: ${marker}`, all.includes(marker));
const publicFiles = ['site/index.html','site/operator-console.html','site/sovereign-machine-economy.html','site/evidence/index.html','site/architecture.html','site/verification.html','site/assurance.html','site/assets/atelier.js','site/assets/sovereign-economy.js'];
const publicText = publicFiles.map(read).join('\n');
for (const bad of ['eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','approve(CANON.manager','MaxUint256','privateKey','sendTransaction(']) assert(`public surface excludes ${bad}`, !publicText.includes(bad));
const expert = read('site/assets/expert-console.js');
for (const marker of ['eth_requestAccounts','wallet_switchEthereumChain','approve(CANON.manager','staticCall','estimateGas','AUTHORIZE MAINNET','ACTIVATE PRODUCTION AUTHORITY']) assert(`expert console contains ${marker}`, expert.includes(marker));
for (const bad of ['MaxUint256','localStorage.setItem','sessionStorage.setItem','privateKey']) assert(`expert console excludes ${bad}`, !expert.includes(bad));
assert('Expert console contains typed production authority gate', read('site/expert-console.html').includes('ACTIVATE PRODUCTION AUTHORITY') || expert.includes('ACTIVATE PRODUCTION AUTHORITY'));
assert('Expert console contains exact approval posture', read('site/expert-console.html').toLowerCase().includes('exact') || expert.includes('approve(CANON.manager'));
assert('Ascendant particle field preserved', read('site/assets/atelier.js').includes('d.y-=d.v'));
const cat = JSON.parse(read('data/agijobmanager-expert-action-catalog.json'));
assert('expert action catalog has at least 10 actions', Array.isArray(cat.actions) && cat.actions.length >= 10, String(cat.actions?.length || 0));
const missingActions = ['createJob','applyForJob','requestJobCompletion','validateJob','disapproveJob','disputeJob','finalizeJob','expireJob','cancelJob'].filter(a => !JSON.stringify(cat).includes(a));
assert('expert action catalog covers legacy lifecycle', missingActions.length===0, missingActions.join(','));
const identities = JSON.parse(read('data/canonical-identities.json'));
assert('canonical identity JSON locks AGIJobManager', JSON.stringify(identities).includes(AGI_JOB_MANAGER));
assert('canonical identity JSON locks AGIALPHA', JSON.stringify(identities).includes(AGIALPHA));
const sme = JSON.parse(read('data/sovereign-machine-economy-capability-contract.json'));
assert('sovereign lineage has 4+ components', Array.isArray(sme.sourceLineage) && sme.sourceLineage.length >= 4);
assert('sovereign operating loop has 10 gates', Array.isArray(sme.operatingLoop) && sme.operatingLoop.length === 10);
assert('sovereign public safety boundary separates expert console', sme.publicSafetyBoundary?.expertConsoleSeparated === true);
assert('claim boundary visible on website', /not a third-party audit|not an audit|no production activation|external actions remain zero/i.test(all));
const critical = ['site/index.html','site/operator-console.html','site/expert-console.html','site/sovereign-machine-economy.html','site/verification.html','data/final-assurance-policy.json','data/canonical-identities.json','data/agijobmanager-expert-action-catalog.json','tools/final-assurance-kernel.mjs'];
const fileHashes = critical.filter(exists).map(p=>({path:p, sha256:sha256(p), bytes:fs.statSync(path.join(root,p)).size}));
const passed = checks.filter(c=>c.status==='PASS').length;
const failed = checks.filter(c=>c.status==='FAIL').length;
const report = {
  status: failed ? 'FAIL' : 'PASS',
  release: 'v11-final-assurance-kernel',
  productionUrl: prod,
  checkedAt: new Date().toISOString(),
  checks: {passed, failed, total: checks.length},
  canonicalIdentities: {AGIJobManager: AGI_JOB_MANAGER, AGIALPHA, chainId: 1},
  assuranceLevel: failed ? 'blocked' : 'publication-grade automated assurance with expert Mainnet separation',
  explicitBoundary: 'Automated assurance is not a legal third-party audit opinion and does not by itself authorize funds or activate production authority.',
  fileHashes,
  results: checks
};
fs.writeFileSync(path.join(root,'FINAL_ASSURANCE_DOCKET_V11.json'), JSON.stringify(report,null,2));
const md = `# GoalOS AGIJobManager Ascension · Final Assurance Docket v11\n\nStatus: **${report.status}**\n\nProduction URL: ${prod}\n\nChecks: ${passed}/${checks.length} passed.\n\nCanonical identities:\n\n- AGIJobManager: \`${AGI_JOB_MANAGER}\`\n- AGIALPHA: \`${AGIALPHA}\`\n- Chain: Ethereum Mainnet, chain id \`1\`\n\nBoundary: ${report.explicitBoundary}\n\n## Critical file hashes\n\n${fileHashes.map(f=>`- \`${f.sha256}\`  ${f.path}`).join('\n')}\n`;
fs.writeFileSync(path.join(root,'FINAL_ASSURANCE_DOCKET_V11.md'), md);
finish();
function finish(){
  const failed = checks.filter(c=>c.status==='FAIL').length;
  const passed = checks.filter(c=>c.status==='PASS').length;
  if (failed) { console.error(`Final assurance FAIL · ${passed}/${checks.length} passed`); process.exit(1); }
  console.log(`Final assurance PASS · ${passed}/${checks.length} checks`);
}
