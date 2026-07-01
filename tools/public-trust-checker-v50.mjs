
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const base=spawnSync(process.execPath,['tools/public-trust-checker-v49.mjs'],{stdio:'inherit',env:{...process.env,CHECK_DIST:process.env.CHECK_DIST||''}});
if(base.status!==0) process.exit(base.status ?? 1);
const places=['site']; if(process.env.CHECK_DIST==='true') places.push('dist');
for(const d of places){
  const p=d+'/loop-to-rsi.html';
  if(!fs.existsSync(p)){console.error('FAIL · missing From Loop to RSI in '+d);process.exit(1)}
  const html=fs.readFileSync(p,'utf8');
  for(const phrase of ['From Loop to RSI','TARGET','PROMOTE','Move-37','RSIDossier','Search control']) if(!html.includes(phrase)){console.error('FAIL · '+p+' missing '+phrase);process.exit(1)}
  if(/Loading…|>\s*Loading\s*<|<form\b|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|fetch\(|XMLHttpRequest/i.test(html)){console.error('FAIL · From Loop to RSI contains forbidden primitive in '+d);process.exit(1)}
}
console.log('PASS · public trust checker v50 passed');
