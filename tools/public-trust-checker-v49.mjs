import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const base=spawnSync(process.execPath,['tools/public-trust-checker-v48.mjs'],{stdio:'inherit',env:{...process.env,CHECK_DIST:process.env.CHECK_DIST||''}});
if(base.status!==0) process.exit(base.status ?? 1);
const places=['site']; if(process.env.CHECK_DIST==='true') places.push('dist');
for(const d of places){
  const p=d+'/loop-evidence-reactor.html';
  if(!fs.existsSync(p)){console.error('FAIL · missing Loop Evidence Reactor in '+d);process.exit(1)}
  const html=fs.readFileSync(p,'utf8');
  if(!/Loop Evidence Reactor/.test(html)||!/LoopDocket/.test(html)){console.error('FAIL · Loop Evidence Reactor route incomplete in '+d);process.exit(1)}
  if(/Loading…|>\s*Loading\s*<|<form\b|localStorage|sessionStorage|document\.cookie|ethereum\.request|fetch\(|XMLHttpRequest/i.test(html)){console.error('FAIL · Loop Evidence Reactor contains forbidden primitive in '+d);process.exit(1)}
}
console.log('PASS · public trust checker v49 passed');
