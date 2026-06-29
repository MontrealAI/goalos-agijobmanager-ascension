import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const productionTests = [
  'operator-parity.test.mjs',
  'sovereign-machine-economy.test.mjs',
  'final-assurance-kernel.test.mjs',
  'legal-shield.test.mjs',
  'token-boundary.test.mjs',
  'user-delight.test.mjs',
  'multi-agent-institution.test.mjs',
  'proof-governed-institution.test.mjs',
  'proof-to-action-theatre.test.mjs',
  'proof-gradient-arena.test.mjs',
  'chronicle-compounding-lab.test.mjs',
  'ascension-inflow-control.test.mjs',
  'claim-boundary-firewall.test.mjs',
  'replay-falsification-gauntlet.test.mjs',
  'sovereign-experience-stream.test.mjs',
  'proof-backed-upgrade-foundry.test.mjs',
  'mandate-epoch-clearinghouse.test.mjs',
  'real-task-benchmark-bridge.test.mjs',
  'action-graph-handoff.test.mjs',
  'proof-carrying-artifact-passport.test.mjs',
  'proof-conditioned-router-observatory.test.mjs',
  'ascension-flight-deck.test.mjs',
  'proof-constitution-simulator.test.mjs',
  'until-done-mission-control.test.mjs'
];
let ran=0, skipped=[];
for(const file of productionTests){
  const p=path.join('tests',file);
  if(!fs.existsSync(p)){skipped.push(file); continue;}
  console.log(`RUN ${p}`);
  const r=spawnSync(process.execPath,[p],{stdio:'inherit'});
  if(r.status!==0) process.exit(r.status??1);
  ran++;
}
if(ran<18){console.error(`FAIL · production test coverage too low: ${ran} tests ran`);process.exit(1)}
if(skipped.length) console.log(`SKIP · optional production tests not present in this repository: ${skipped.join(', ')}`);
console.log(`PASS · ${ran} production test files executed with manifest guard`);
