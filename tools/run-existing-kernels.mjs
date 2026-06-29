import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
const dir='tools';
const skip=new Set(['pathspec-proof-kernel.mjs','final-assurance-kernel.mjs','legal-shield-kernel.mjs','token-boundary-kernel.mjs']);
const files=fs.readdirSync(dir).filter(f=>f.endsWith('-kernel.mjs')&&!skip.has(f)).sort();
for(const file of files){
  const p=path.join(dir,file);
  console.log(`RUN ${p}`);
  const r=spawnSync(process.execPath,[p],{stdio:'inherit'});
  if(r.status!==0) process.exit(r.status??1);
}
console.log(`PASS · ${files.length} post-build kernels executed`);
