import fs from 'node:fs';
for (const dir of ['site','site/assets','data','schemas','docs','docs/releases','tools','tests','dist']) fs.mkdirSync(dir,{recursive:true});
for (const f of ['site/goalos-care-command.html','site/assets/goalos-care-command.js','site/assets/goalos-care-command.css','data/goalos-care-command-demo.json','schemas/goalos-care-command.schema.json','tests/goalos-care-command-v66.test.mjs','tools/goalos-care-command-v66-kernel.mjs']) {
  if(!fs.existsSync(f)){console.error('FAIL · failsafe bootstrap v66 missing '+f); process.exit(1)}
}
console.log('PASS · failsafe bootstrap v66 completed');
