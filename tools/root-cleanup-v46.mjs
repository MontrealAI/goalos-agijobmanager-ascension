import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const dest=path.join(root,'docs','reports','historical-root');
fs.mkdirSync(dest,{recursive:true});
const keep=new Set(['README.md','CONTRIBUTING.md','SECURITY.md','SUPPORT.md','CODE_OF_CONDUCT.md','LICENSE','NOTICE','package.json']);
const patterns=[/_V\d+_REPORT\.(md|json)$/i,/_V\d+_WEB_UI_GUIDE\.md$/i,/_REPORT\.(md|json)$/i,/_WEB_UI_GUIDE\.md$/i,/FINAL_ASSURANCE_DOCKET_V\d+\.(md|json)$/i,/DEMO_DELIGHT_V\d+_REPORT\.md$/i,/DEPENDENCY_ZERO_ASSURANCE_V\d+\.json$/i,/AUTOMATED_ASSURANCE_SUMMARY\.json$/i,/FACTUAL_CORRECTNESS_REPORT\.json$/i,/AGIJOBMANAGER_.*\.(md|json)$/i,/ASCENSION_.*_REPORT\.(md|json)$/i,/CHRONICLE_.*_REPORT\.(md|json)$/i,/CLAIM_BOUNDARY_.*_REPORT\.(md|json)$/i,/EVIDENCE_DOCKET_.*_REPORT\.json$/i,/EXPERIENCE_.*_REPORT\.json$/i,/NAVIGATION_.*_REPORT\.json$/i,/PROOF_.*_REPORT\.json$/i,/TRUST_EQUATION_.*_REPORT\.json$/i,/UNTIL_DONE_.*_REPORT\.json$/i,/INSTITUTIONAL_WEBSITE_FINALIZATION_.*_REPORT\.json$/i];
let moved=0;
for(const entry of fs.readdirSync(root,{withFileTypes:true})){
  if(!entry.isFile()) continue;
  if(keep.has(entry.name)) continue;
  if(!patterns.some(re=>re.test(entry.name))) continue;
  const from=path.join(root,entry.name); const to=path.join(dest,entry.name);
  if(fs.existsSync(to)) fs.rmSync(from); else fs.renameSync(from,to);
  moved++;
}
console.log(`PASS · root cleanup v45 moved/merged ${moved} historical root artifacts into docs/reports/historical-root`);
