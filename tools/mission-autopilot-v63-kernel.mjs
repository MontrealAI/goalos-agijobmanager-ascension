import fs from 'node:fs';
const fail=m=>{console.error('FAIL · Mission Autopilot v63 kernel: '+m);process.exit(1)};
for(const dir of ['site','dist']){
  const htmlPath=`${dir}/goalos-mission-autopilot.html`;
  if(!fs.existsSync(htmlPath)) fail('missing '+htmlPath);
  const html=fs.readFileSync(htmlPath,'utf8');
  for(const phrase of ['GoalOS Mission Autopilot','MissionAutopilotReceipt','Evidence Docket','Governed Decision State','Action Graph','No network request','No production authority']) if(!html.includes(phrase)) fail(`${htmlPath} missing ${phrase}`);
}
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
if(Number(prod.publicHtmlRouteCount)<67) fail('production-url route count below 67');
const bm=JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
if(!String(bm.release||'').includes('v63') && !String(manifest.version||'').includes('v66')) fail('build manifest missing v63 release identity');
if(!bm.files.some(f=>f.path==='goalos-mission-autopilot.html')) fail('build manifest missing mission autopilot html');
console.log('PASS · Mission Autopilot v63 kernel verified dist route, production URL, and build manifest');
