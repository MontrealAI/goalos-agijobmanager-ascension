import fs from 'node:fs';
import { execFileSync } from 'node:child_process';
const fail = m => { console.error('FAIL · Ask GoalOS route-count v61: ' + m); process.exit(1); };
const manifest = JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
const count = (manifest.pages || []).length;
if (count !== 66) fail(`expected 66 canonical routes, found ${count}`);
execFileSync(process.execPath, ['tools/route-count-harmonizer-v61.mjs'], {stdio:'inherit'});
for (const file of ['README.md', 'docs/DEMO_CATALOG.md']) {
  const text = fs.readFileSync(file, 'utf8');
  const re = /(\d+)\s+(?:canonical\s+)?public routes|route count:\s*\*\*(\d+)\*\*/ig;
  let m;
  while ((m = re.exec(text))) {
    const n = Number(m[1] || m[2]);
    const context = text.slice(Math.max(0, m.index - 180), m.index + 240);
    const historicalCompatibility = /historical|compatibility lineage|v43-compatible/i.test(context);
    if (n !== count && !historicalCompatibility) fail(`${file} still contains stale route count ${n}`);
  }
}
console.log('PASS · Ask GoalOS route-count v61 prevents stale README/DEMO_CATALOG route counts');
