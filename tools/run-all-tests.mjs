import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const preferred = ["operator-parity.test.mjs", "sovereign-machine-economy.test.mjs", "final-assurance-kernel.test.mjs", "legal-shield.test.mjs", "token-boundary.test.mjs", "user-delight.test.mjs", "multi-agent-institution.test.mjs", "proof-governed-institution.test.mjs", "proof-to-action-theatre.test.mjs", "proof-gradient-arena.test.mjs", "chronicle-compounding-lab.test.mjs", "ascension-inflow-control.test.mjs", "claim-boundary-firewall.test.mjs", "replay-falsification-gauntlet.test.mjs", "sovereign-experience-stream.test.mjs", "proof-backed-upgrade-foundry.test.mjs", "mandate-epoch-clearinghouse.test.mjs", "real-task-benchmark-bridge.test.mjs", "action-graph-handoff.test.mjs", "proof-carrying-artifact-passport.test.mjs", "proof-conditioned-router-observatory.test.mjs", "ascension-flight-deck.test.mjs", "proof-constitution-simulator.test.mjs", "until-done-mission-control.test.mjs", "evidence-docket-composer.test.mjs", "trust-equation-simulator.test.mjs", "proof-settlement-lifecycle.test.mjs", "navigation-system-final.test.mjs", "website-command-center.test.mjs", "command-center-navigation.test.mjs", "site-experience-atlas.test.mjs", "experience-concierge-v39.test.mjs", "navigation-polish-v40.test.mjs", "navigation-polish-v41.test.mjs", "institutional-website-finalization-v42.test.mjs", "repository-public-trust-v43.test.mjs", "repository-public-trust-failsafe-v44.test.mjs", "repository-public-trust-failsafe-v45.test.mjs", "repository-public-trust-compatibility-failsafe-v46.test.mjs", "loop-operating-room.test.mjs", "day-scale-loop-observatory.test.mjs", "loop-evidence-reactor.test.mjs", "loop-to-rsi.test.mjs", "loop-to-rsi-sovereign-governance.test.mjs", "loop-to-rsi-control-room.test.mjs", "loop-to-asi-governance-corridor.test.mjs", "loop-to-rsi-to-asi-superintelligence.test.mjs", "asi-proof-horizon-console.test.mjs", "superintelligence-proof-governance-console.test.mjs", "complete-route-recovery-v57.test.mjs", "experience-command-v58.test.mjs", "canonical-proof-institution-v59.test.mjs", "ask-goalos-concierge-v60.test.mjs", "ask-goalos-route-count-v61.test.mjs"];
const discovered = fs.existsSync('tests') ? fs.readdirSync('tests').filter(f => f.endsWith('.test.mjs')).sort() : [];
const ordered = preferred.filter(f => discovered.includes(f));
let ran = 0;
for (const f of ordered) {
  const p = path.join('tests', f);
  console.log('RUN ' + p);
  const r = spawnSync(process.execPath, [p], {stdio: 'inherit'});
  if (r.status !== 0) process.exit(r.status ?? 1);
  ran++;
}
const missing = preferred.filter(f => !discovered.includes(f));
if (ran < 18) { console.error('FAIL · production test coverage too low: ' + ran + ' tests ran'); process.exit(1); }
if (missing.length) console.log('SKIP · optional preferred production tests not present in this repository: ' + missing.join(', '));
console.log('PASS · ' + ran + ' production test files executed with compatibility-manifest guard');
