import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const base=spawnSync(process.execPath,['tools/public-trust-checker-v46.mjs'],{stdio:'inherit',env:{...process.env,CHECK_DIST:process.env.CHECK_DIST||''}});
if(base.status!==0) process.exit(base.status ?? 1);
const places=['site']; if(process.env.CHECK_DIST==='true') places.push('dist');
for(const d of places){
  const p=d+'/loop-contract-theatre.html';
  if(!fs.existsSync(p)){console.error('FAIL · missing Loop Contract Theatre in '+d);process.exit(1)}
  const html=fs.readFileSync(p,'utf8');
  if(!/Loop Contract Theatre/.test(html)||!/LoopReceipt/.test(html)){console.error('FAIL · Loop Contract Theatre route incomplete in '+d);process.exit(1)}
}
console.log('PASS · public trust checker v47 passed');
