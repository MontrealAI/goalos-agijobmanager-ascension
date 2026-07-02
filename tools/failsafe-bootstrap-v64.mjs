import fs from 'node:fs';
const required=['site/goalos-command-console.html','site/assets/goalos-command-console.js','site/assets/goalos-command-console.css','data/goalos-command-console-demo.json','schemas/goalos-command-console.schema.json','tests/goalos-command-console-v64.test.mjs','tools/goalos-command-console-v64-kernel.mjs'];
for(const f of required){if(!fs.existsSync(f)){console.error('FAIL · v64 bootstrap missing '+f);process.exit(1)}}
console.log('PASS · failsafe bootstrap v64 completed');
