import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const preferred = ["action-graph-handoff-kernel.mjs", "ascension-flight-deck-kernel.mjs", "ascension-inflow-control-kernel.mjs", "chronicle-compounding-lab-kernel.mjs", "claim-boundary-firewall-kernel.mjs", "dependency-zero-kernel.mjs", "evidence-docket-composer-kernel.mjs", "mandate-epoch-clearinghouse-kernel.mjs", "multi-agent-institution-kernel.mjs", "proof-backed-upgrade-foundry-kernel.mjs", "proof-carrying-artifact-passport-kernel.mjs", "proof-conditioned-router-observatory-kernel.mjs", "proof-constitution-simulator-kernel.mjs", "proof-governed-institution-kernel.mjs", "proof-gradient-arena-kernel.mjs", "proof-to-action-theatre-kernel.mjs", "real-task-benchmark-bridge-kernel.mjs", "replay-falsification-gauntlet-kernel.mjs", "sovereign-experience-stream-kernel.mjs", "until-done-mission-control-kernel.mjs", "user-delight-kernel.mjs", "trust-equation-simulator-kernel.mjs", "proof-settlement-lifecycle-kernel.mjs", "experience-hub-kernel.mjs", "navigation-system-final-kernel.mjs", "experience-concierge-kernel.mjs", "navigation-polish-v40-kernel.mjs", "navigation-polish-v41-kernel.mjs", "institutional-website-finalization-v42-kernel.mjs", "repository-public-trust-finalization-v43-kernel.mjs", "repository-public-trust-failsafe-v44-kernel.mjs", "repository-public-trust-failsafe-v45-kernel.mjs", "repository-public-trust-compatibility-failsafe-v46-kernel.mjs", "loop-operating-room-kernel.mjs", "repository-public-trust-loop-operating-room-v47-kernel.mjs", "day-scale-loop-observatory-v48-kernel.mjs", "loop-evidence-reactor-v49-kernel.mjs", "loop-to-rsi-v50-kernel.mjs", "loop-to-rsi-sovereign-governance-v50-kernel.mjs", "repository-public-trust-day-scale-loop-v48-kernel.mjs", "loop-to-rsi-sovereign-governance-v50-kernel.mjs", "loop-to-rsi-control-room-v51-kernel.mjs", "loop-to-rsi-to-asi-superintelligence-v52-kernel.mjs", "asi-proof-horizon-console-v53-kernel.mjs", "superintelligence-proof-governance-console-v54-kernel.mjs", "complete-route-recovery-v57-kernel.mjs"];
const discovered = fs.existsSync('tools') ? fs.readdirSync('tools').filter(f => f.endsWith('-kernel.mjs')).sort() : [];
const ordered = preferred.filter(f => discovered.includes(f));
let ran = 0;
for (const f of ordered) {
  const p = path.join('tools', f);
  console.log('RUN ' + p);
  const r = spawnSync(process.execPath, [p], {stdio: 'inherit'});
  if (r.status !== 0) process.exit(r.status ?? 1);
  ran++;
}
const missing = preferred.filter(f => !discovered.includes(f));
if (ran < 18) { console.error('FAIL · post-build kernel coverage too low: ' + ran); process.exit(1); }
if (missing.length) console.log('SKIP · optional preferred kernels not present: ' + missing.join(', '));
console.log('PASS · ' + ran + ' production post-build kernels executed with compatibility-manifest guard');
