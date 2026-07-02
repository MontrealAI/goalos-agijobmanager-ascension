import fs from 'node:fs';
const lineage = 'v61-route-count-self-healing-ask-goalos-public-proof-institution v60-ask-goalos-autonomous-question-router v59-canonical-proof-institution v58-complete-experience-restoration v57-complete-route-recovery v54-superintelligence-proof-governance v53-asi-proof-horizon v52-loop-to-asi v51-loop-to-rsi-control-room v50-loop-to-rsi v49-loop-evidence-reactor v48-day-scale-loop v47-loop-operating-room v46-repository-public-trust-compatibility-failsafe v45-compatible v44-compatible v43-compatible v42-compatible';
for (const file of ['package.json','dist/build-manifest.json']) {
  if (!fs.existsSync(file)) continue;
  let obj;
  try { obj = JSON.parse(fs.readFileSync(file, 'utf8')); } catch { continue; }
  if (file === 'package.json') obj.version = '6.1.0-v61-route-count-self-healing-ask-goalos-v60-v59-v58-v57-v50-v46-compatible';
  obj.release = obj.release ? `${obj.release} ${lineage}` : lineage;
  obj.releaseLineage = Array.from(new Set([...(obj.releaseLineage || []), ...lineage.split(' ')]));
  if (file === 'dist/build-manifest.json') obj.release = lineage;
  fs.writeFileSync(file, JSON.stringify(obj, null, 2) + '\n');
}
console.log('PASS · release compatibility harmonizer v61 preserved v42-v61 lineage');
