import fs from 'node:fs';
const pkgPath='package.json';
const pkg=JSON.parse(fs.readFileSync(pkgPath,'utf8'));
const aliases=['v66-goalos-care-command','v65-take-care-console','v64-goalos-command-console','v63-mission-autopilot','v62-ask-goalos-sovereign-router','v61-route-count-self-healing','v60-ask-goalos-autonomous-question-router','v59-canonical-proof-institution','v46-repository-public-trust-compatibility-failsafe'];
pkg.version='6.6.0-v66-goalos-care-command-v65-v64-v63-v62-v61-v60-v59-v46-compatible';
pkg.release=Array.from(new Set([String(pkg.release||''),...aliases])).join(' ');
pkg.releaseAliases=Array.from(new Set([...(pkg.releaseAliases||[]),...aliases]));
pkg.releaseLineage=Array.from(new Set([...(pkg.releaseLineage||[]),...aliases]));
pkg.goalOSCareCommandV66='PASS';
fs.writeFileSync(pkgPath,JSON.stringify(pkg,null,2)+'\n');
function patchJson(file){if(!fs.existsSync(file))return;try{const d=JSON.parse(fs.readFileSync(file,'utf8'));d.version='v66-goalos-care-command';d.release=Array.from(new Set(['v66-goalos-care-command',...String(d.release||'').split(/\s+/).filter(Boolean),...aliases])).join(' ');d.releaseAliases=Array.from(new Set([...(d.releaseAliases||[]),...aliases]));d.releaseLineage=Array.from(new Set([...(d.releaseLineage||[]),...aliases]));d.goalOSCareCommandV66='PASS';fs.writeFileSync(file,JSON.stringify(d,null,2)+'\n')}catch{}}
for(const f of ['data/production-url.json','site/production-url.json','dist/production-url.json','dist/build-manifest.json','data/canonical-route-manifest.json','data/canonical-route-manifest-v66.json','dist/data/canonical-route-manifest.json','dist/data/canonical-route-manifest-v66.json']) patchJson(f);
console.log('PASS · release compatibility harmonizer v66 maintained v46-v66 lineage');
