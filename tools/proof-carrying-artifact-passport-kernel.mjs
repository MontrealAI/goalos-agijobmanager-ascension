import { readFileSync, existsSync } from 'node:fs';
const required = [
  'site/proof-carrying-artifact-passport.html',
  'site/assets/artifact-passport.css',
  'site/assets/artifact-passport.js',
  'data/proof-carrying-artifact-passport-demo.json',
  'schemas/proof-carrying-artifact-passport.schema.json',
  'docs/PROOF_CARRYING_ARTIFACT_PASSPORT_V29.md'
];
for (const f of required) if (!existsSync(f)) throw new Error(`missing ${f}`);
const html = readFileSync('site/proof-carrying-artifact-passport.html','utf8');
const js = readFileSync('site/assets/artifact-passport.js','utf8');
const data = JSON.parse(readFileSync('data/proof-carrying-artifact-passport-demo.json','utf8'));
const requiredMarkers = ['ProofCarryingArtifactPassport','Artifact Vault','No user data wanted','No wallet','No network request','Public/private boundary','rollback','Evidence Docket'];
for (const m of requiredMarkers) if (!html.includes(m) && !js.includes(m)) throw new Error(`missing marker ${m}`);
for (const g of ['immutable_version_hash','source_provenance','proof_history','validator_attestations','scope_authorization','dependency_integrity','privacy_boundary','rollback_target','replay_path','human_review']) if (!data.gates.includes(g)) throw new Error(`missing gate ${g}`);
for (const bad of ['localStorage','sessionStorage','document.cookie','fetch(','XMLHttpRequest','ethereum.request','eth_sendTransaction','wallet_switchEthereumChain']) {
  if (html.includes(bad) || js.includes(bad)) throw new Error(`forbidden primitive on public demo: ${bad}`);
}
if (!js.includes('d.y-=d.v')) throw new Error('ascendant particle motion missing');
console.log('Proof-Carrying Artifact Passport v29 PASS');
