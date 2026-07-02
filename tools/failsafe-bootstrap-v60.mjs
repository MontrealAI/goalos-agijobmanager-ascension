
import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const required=['site/ask-goalos.html','site/assets/ask-goalos.js','site/assets/ask-goalos-data.js','tools/route-recovery-v60.mjs','tests/ask-goalos-concierge-v60.test.mjs'];
for (const f of required) { if(!fs.existsSync(f)) { console.error('FAIL · v60 bootstrap missing '+f+'. Upload the complete v60 overlay contents.'); process.exit(1); } }
const r=spawnSync(process.execPath,['tools/route-recovery-v60.mjs'],{stdio:'inherit'});
process.exit(r.status??1);
