import './failsafe-bootstrap-v58.mjs';
import fs from 'node:fs';
const required=['site/canonical-proof-institution.html','site/assets/canonical-proof-institution.css','site/assets/canonical-proof-institution.js','data/canonical-proof-institution-demo.json','schemas/canonical-proof-institution.schema.json','tests/canonical-proof-institution-v59.test.mjs','tools/canonical-proof-institution-v59-kernel.mjs','tools/route-recovery-v59.mjs','tools/public-trust-checker-v59.mjs','tools/release-compatibility-harmonizer-v59.mjs'];
for(const f of required){if(!fs.existsSync(f)){console.error('FAIL · v59 missing required file '+f); process.exit(1);}}
console.log('PASS · failsafe bootstrap v59 completed');
