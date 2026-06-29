import fs from 'node:fs';
import path from 'node:path';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
const legacy=['assets/site-shell.js','assets/site-guide.js','assets/navigation-v38.js','assets/navigation-v37.js','assets/navigation-atlas.js','assets/navigation-v38.css','assets/navigation-atlas.css','assets/site-shell.css'];
for(const area of ['site','dist']){
  const files=fs.existsSync(area)?fs.readdirSync(area).filter(f=>f.endsWith('.html')).map(f=>path.join(area,f)):[];
  must(files.length>0, `${area} html files exist`);
  for(const f of files){
    const s=fs.readFileSync(f,'utf8');
    for(const bad of legacy) must(!s.includes(bad), `${f} does not include legacy overlay ${bad}`);
    if(!f.includes('archive-v')){
      const count=(s.match(/assets\/site-command-v39\.js/g)||[]).length;
      must(count<=1, `${f} has at most one floating Site Command script`);
    }
  }
}
const prod=JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
must(prod.navigationSourcePolishV41==='PASS','production-url marks v41 source navigation polish PASS');
console.log('Navigation Source Polish v41 kernel PASS');
