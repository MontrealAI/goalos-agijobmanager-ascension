
import fs from 'node:fs';
const fail=m=>{console.error('FAIL · Ask GoalOS Concierge v60 kernel: '+m);process.exit(1)};
for (const dir of ['site','dist']) {
  const page=`${dir}/ask-goalos.html`;
  if(!fs.existsSync(page)) fail('missing '+page);
  const html=fs.readFileSync(page,'utf8');
  for (const x of ['Ask once','QuestionRoutingReceipt','No account','No wallet','No production authority']) if(!html.includes(x)) fail(page+' missing '+x);
  for (const ref of ['assets/ask-goalos.css','assets/ask-goalos-data.js','assets/ask-goalos.js']) if(!html.includes(ref)) fail(page+' missing global ask asset '+ref);
}
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
if(!String(manifest.release||'').includes('v60')) fail('build manifest missing v60 release identity');
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
if(Number(prod.publicHtmlRouteCount)<66) fail('production-url route count below v60 baseline');
console.log('PASS · Ask GoalOS Concierge v60 kernel verified build output and route contract');
