import {readFileSync,existsSync} from 'node:fs';
const required=['site/index.html','site/operator-console.html','site/evidence/index.html','site/verification.html','site/production-url.json','schemas/goalos-intent.schema.json'];
for (const f of required) if (!existsSync(f)) throw new Error(`missing ${f}`);
const all=required.map(f=>readFileSync(f,'utf8')).join('\n');
const checks=['0xB3AAeb69b630f0299791679c063d68d6687481d1','0xa61a3b3a130a9c20768eebf97e21515a6046a1fa','https://montrealai.github.io/goalos-agijobmanager-ascension/','No wallet auto-connect','no token approval','no transaction broadcast'];
for (const s of checks) if (!all.includes(s)) throw new Error(`missing check: ${s}`);
console.log('GoalOS AGIJobManager Ascension verification PASS');
