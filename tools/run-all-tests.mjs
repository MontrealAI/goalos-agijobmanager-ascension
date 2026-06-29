import fs from 'node:fs'; import path from 'node:path'; import {spawnSync} from 'node:child_process';
const root=process.cwd(); const dir=path.join(root,'tests');
const files=fs.readdirSync(dir).filter(f=>f.endsWith('.test.mjs')).sort();
if(!files.length){console.error('No test files found'); process.exit(1)}
for(const file of files){console.log(`RUN tests/${file}`); const r=spawnSync(process.execPath,[path.join('tests',file)],{stdio:'inherit'}); if(r.status!==0) process.exit(r.status??1)}
console.log(`PASS · ${files.length} test files executed`);