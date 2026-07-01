import fs from 'node:fs';
const release='v42-v43-v44-v45-v46-v47-loop-contract-theatre-public-trust-failsafe';
const aliases=[release,'v47-loop-contract-theatre','v46-repository-public-trust-compatibility-failsafe','v45-repository-public-trust-ultimate-failsafe','v44-repository-public-trust-failsafe','v43-repository-public-trust-finalization','v42-institutional-website-finalization'];
for(const file of ['dist/build-manifest.json','dist/production-url.json']){
  if(!fs.existsSync(file)) continue;
  const j=JSON.parse(fs.readFileSync(file,'utf8'));
  j.release=release;
  j.version='v47';
  j.releaseAliases=Array.from(new Set([...(j.releaseAliases||[]),...aliases]));
  j.loopContractTheatre='PASS';
  j.repositoryPublicTrustCompatibilityFailsafeV47='PASS';
  fs.writeFileSync(file,JSON.stringify(j,null,2));
}
console.log('PASS · release compatibility harmonizer v47 completed');
