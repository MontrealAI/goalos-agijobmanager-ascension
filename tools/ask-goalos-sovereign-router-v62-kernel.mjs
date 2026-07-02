import fs from 'node:fs';
const fail=m=>{console.error('FAIL · Ask GoalOS Sovereign Router v62 kernel: '+m);process.exit(1)};
for (const dir of ['site','dist']) {
  const htmlPath=`${dir}/ask-goalos.html`;
  if(!fs.existsSync(htmlPath)) fail('missing '+htmlPath);
  const html=fs.readFileSync(htmlPath,'utf8');
  for(const x of ['Ask once','Receive the proof path','Sovereign question router','QuestionRoutingReceipt','No network request','No production authority']) if(!html.includes(x)) fail(`${htmlPath} missing ${x}`);
  for(const ref of ['assets/ask-goalos.css','assets/ask-goalos-data.js','assets/ask-goalos.js','assets/ask-goalos-page.js']) if(!html.includes(ref)) fail(`${htmlPath} missing ${ref}`);
}
const manifest=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
if(!String(manifest.release||'').includes('v62')) fail('build manifest missing v62 release identity');
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
if(Number(prod.publicHtmlRouteCount)<66) fail('production-url route count below v62 baseline');
console.log('PASS · Ask GoalOS Sovereign Router v62 kernel verified live-style build output and route contract');
