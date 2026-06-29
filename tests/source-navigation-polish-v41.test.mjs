import fs from 'node:fs';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
const legacy=['assets/site-shell.js','assets/site-guide.js','assets/navigation-v38.js','assets/navigation-v37.js','assets/navigation-atlas.js','assets/navigation-v38.css','assets/navigation-atlas.css','assets/site-shell.css'];
for(const f of fs.readdirSync('site').filter(x=>x.endsWith('.html')).map(x=>'site/'+x)){
  const s=fs.readFileSync(f,'utf8');
  for(const bad of legacy) must(!s.includes(bad), `${f} source excludes legacy overlay ${bad}`);
}
const homepage=fs.readFileSync('site/index.html','utf8');
must((homepage.match(/assets\/site-command-v39\.js/g)||[]).length===1,'homepage source has exactly one floating Site Command script');
must(homepage.includes('experience-concierge.html') && homepage.includes('command-center.html'),'homepage keeps clear concierge and command center paths');
console.log('Navigation Source Polish v41 test PASS');
