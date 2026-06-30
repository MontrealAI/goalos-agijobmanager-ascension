import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const required=['tests/documentation.test.mjs'];
const optional=['tests/repository-public-trust-v43.test.mjs','tests/repository-public-trust-failsafe-v44.test.mjs','tests/repository-public-trust-failsafe-v45.test.mjs','tests/repository-public-trust-compatibility-failsafe-v46.test.mjs'];
let ran=0;
for(const t of [...required,...optional]){
  if(!fs.existsSync(t)){
    if(required.includes(t)){ console.error(`FAIL · required documentation test missing: ${t}`); process.exit(1); }
    console.log(`SKIP · optional documentation/public-trust test not present: ${t}`);
    continue;
  }
  console.log(`RUN ${t}`);
  const r=spawnSync(process.execPath,[t],{stdio:'inherit'});
  if(r.status!==0) process.exit(r.status??1);
  ran++;
}
console.log(`PASS · ${ran} documentation/public-trust tests executed with compatibility guard`);
