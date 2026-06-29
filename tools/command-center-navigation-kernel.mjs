import fs from 'node:fs';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
for(const f of ['dist/index.html','dist/command-center.html','dist/site-navigation-v37.json','dist/assets/site-command-v39.js','dist/assets/site-command-v39.css','dist/production-url.json']) must(fs.existsSync(f),`dist file exists: ${f}`);
const index=fs.readFileSync('dist/index.html','utf8'); const command=fs.readFileSync('dist/command-center.html','utf8');
must(index.includes('command-center.html'),'home links to command center');
must(index.includes('assets/site-command-v39.js') && command.includes('assets/site-command-v39.js'),'floating Site Command present without stacked top nav');
for(const ref of ['navigation-v38.js','navigation-v37.js','site-shell.js','site-guide.js']) must(!index.includes(ref),`home excludes ${ref}`);
console.log('Command Center Navigation v41 PASS');
