import fs from 'node:fs';
const required=['site/goalos-take-care.html','site/assets/goalos-take-care.js','site/assets/goalos-take-care.css','data/goalos-take-care-demo.json','schemas/goalos-take-care.schema.json','tests/goalos-take-care-v65.test.mjs','tools/goalos-take-care-v65-kernel.mjs'];
for(const f of required){if(!fs.existsSync(f)){console.error('FAIL · v65 bootstrap missing '+f);process.exit(1)}}
console.log('PASS · failsafe bootstrap v65 completed');
