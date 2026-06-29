import fs from 'node:fs';
const workflowPath='.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml';
const workflow=fs.readFileSync(workflowPath,'utf8');
const refs=[...workflow.matchAll(/\b(?:node|python3)\s+([A-Za-z0-9_./-]+\.(?:mjs|py))/g)].map(m=>m[1]).filter(x=>!x.includes('${'));
let missing=[];
for (const ref of refs) if(!fs.existsSync(ref)) missing.push(ref);
if (missing.length) {
  console.error('FAIL · workflow references missing files: '+missing.join(', '));
  process.exit(1);
}
if (/node\s+tests\/[A-Za-z0-9_.-]+\.test\.mjs/.test(workflow)) {
  console.error('FAIL · workflow should use dynamic test discovery instead of hard-coded test file calls');
  process.exit(1);
}
console.log(`PASS · workflow references ${refs.length} existing script files and uses dynamic tests`);
