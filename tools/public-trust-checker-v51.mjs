import fs from 'node:fs';
function walk(d){return fs.existsSync(d)?fs.readdirSync(d,{withFileTypes:true}).flatMap(e=>{const p=d+'/'+e.name;return e.isDirectory()?walk(p):[p]}):[]}
let fail=[];
for(const d of ['site','dist']){
  for(const f of walk(d).filter(x=>x.endsWith('.html'))){
    const h=fs.readFileSync(f,'utf8');
    if(/Loading…|>\s*Loading\s*<|>\s*0 routes\s*<|>\s*0 matching pages\s*</i.test(h)) fail.push(`${f}: blank fallback`);
    if(!/<link rel="canonical"/.test(h)) fail.push(`${f}: missing canonical`);
    if(!/og:title/.test(h)) fail.push(`${f}: missing OpenGraph title`);
    if(/<form\b|localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|fetch\(|XMLHttpRequest/.test(h)) fail.push(`${f}: forbidden public primitive`);
  }
}
for(const f of ['site/loop-to-rsi-control-room.html','data/loop-to-rsi-control-room-demo.json','schemas/loop-to-rsi-control-room.schema.json']) if(!fs.existsSync(f)) fail.push(`${f}: missing`);
if(fail.length){console.error('FAIL · public trust checker v51'); console.error(fail.join('\n')); process.exit(1)}
console.log('PASS · public trust checker v51 passed');
