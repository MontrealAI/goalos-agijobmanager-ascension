import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const required=['site/goalos-mission-autopilot.html','site/assets/mission-autopilot.css','site/assets/mission-autopilot.js','data/canonical-route-manifest.json','tools/route-count-harmonizer-v63.mjs','tools/release-compatibility-harmonizer-v63.mjs','tools/public-trust-checker-v63.mjs','tests/mission-autopilot-v63.test.mjs'];
for(const f of required){if(!fs.existsSync(f)){console.error('FAIL · v63 failsafe bootstrap missing '+f);process.exit(1)}}
if(fs.existsSync('package-lock.json'))fs.rmSync('package-lock.json');
if(fs.existsSync('npm-shrinkwrap.json'))fs.rmSync('npm-shrinkwrap.json');
console.log('PASS · failsafe bootstrap v63 completed');
