import fs from 'node:fs'; import path from 'node:path'; import {spawnSync} from 'node:child_process';
const productionKernels=[
  'action-graph-handoff-kernel.mjs',
  'ascension-flight-deck-kernel.mjs',
  'ascension-inflow-control-kernel.mjs',
  'chronicle-compounding-lab-kernel.mjs',
  'claim-boundary-firewall-kernel.mjs',
  'dependency-zero-kernel.mjs',
  'evidence-docket-composer-kernel.mjs',
  'mandate-epoch-clearinghouse-kernel.mjs',
  'multi-agent-institution-kernel.mjs',
  'proof-backed-upgrade-foundry-kernel.mjs',
  'proof-carrying-artifact-passport-kernel.mjs',
  'proof-conditioned-router-observatory-kernel.mjs',
  'proof-constitution-simulator-kernel.mjs',
  'proof-governed-institution-kernel.mjs',
  'proof-gradient-arena-kernel.mjs',
  'proof-to-action-theatre-kernel.mjs',
  'real-task-benchmark-bridge-kernel.mjs',
  'replay-falsification-gauntlet-kernel.mjs',
  'sovereign-experience-stream-kernel.mjs',
  'until-done-mission-control-kernel.mjs',
  'user-delight-kernel.mjs',
  'trust-equation-simulator-kernel.mjs',
  'proof-settlement-lifecycle-kernel.mjs',
  'experience-hub-kernel.mjs',
  'navigation-system-final-kernel.mjs',
  'experience-concierge-kernel.mjs',
  'navigation-polish-v40-kernel.mjs',
  'navigation-polish-v41-kernel.mjs',
  'institutional-website-finalization-v42-kernel.mjs',
  'repository-public-trust-finalization-v43-kernel.mjs',
  'repository-public-trust-failsafe-v44-kernel.mjs'
];
let ran=0,skipped=[];
for(const file of productionKernels){const p=path.join('tools',file); if(!fs.existsSync(p)){skipped.push(file); continue;} if((file==='repository-public-trust-finalization-v43-kernel.mjs'||file==='repository-public-trust-failsafe-v44-kernel.mjs') && fs.existsSync(path.join('tools','root-cleanup-v44.mjs'))){ console.log('RUN tools/root-cleanup-v44.mjs'); const c=spawnSync(process.execPath,[path.join('tools','root-cleanup-v44.mjs')],{stdio:'inherit'}); if(c.status!==0) process.exit(c.status??1); } console.log(`RUN ${p}`); const r=spawnSync(process.execPath,[p],{stdio:'inherit'}); if(r.status!==0) process.exit(r.status??1); ran++;}
if(ran<18){console.error(`FAIL · post-build kernel coverage too low: ${ran}`);process.exit(1)}
if(skipped.length) console.log(`SKIP · optional kernels not present: ${skipped.join(', ')}`);
console.log(`PASS · ${ran} production post-build kernels executed with manifest guard`);