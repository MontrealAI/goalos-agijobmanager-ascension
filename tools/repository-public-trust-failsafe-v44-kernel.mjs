import fs from 'node:fs';
import path from 'node:path';
import {spawnSync} from 'node:child_process';
if (fs.existsSync('tools/root-cleanup-v44.mjs')) {
  const cleanup = spawnSync(process.execPath, ['tools/root-cleanup-v44.mjs'], { stdio: 'inherit' });
  if (cleanup.status !== 0) process.exit(cleanup.status ?? 1);
}
const workflowPath = '.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml';
const workflow = fs.readFileSync(workflowPath, 'utf8');
const requiredMarkers = [
  'Repository Public Trust Failsafe Publisher v44',
  'Bootstrap resilient public-trust tooling',
  'root-cleanup-v44.mjs',
  'apply-public-trust-metadata-v44.mjs',
  'public-trust-checker-v44.mjs',
  'repository-public-trust-failsafe-v44-kernel.mjs'
];
const missingMarkers = requiredMarkers.filter((marker) => !workflow.includes(marker));
if (missingMarkers.length) {
  console.error('FAIL · v44 workflow missing failsafe markers: ' + missingMarkers.join(', '));
  process.exit(1);
}
const requiredFiles = [
  'tools/root-cleanup-v44.mjs',
  'tools/apply-public-trust-metadata-v44.mjs',
  'tools/public-trust-checker-v44.mjs',
  'tools/repository-public-trust-failsafe-v44-kernel.mjs',
  'docs/releases/V44_REPOSITORY_PUBLIC_TRUST_FAILSAFE.md'
];
const missingFiles = requiredFiles.filter((file) => !fs.existsSync(file));
if (missingFiles.length) {
  console.error('FAIL · v44 repository missing required files: ' + missingFiles.join(', '));
  process.exit(1);
}
const rootReportNames = fs.readdirSync(process.cwd()).filter((name) => /_REPORT\.(md|json)$/i.test(name) || /_WEB_UI_GUIDE\.md$/i.test(name));
if (rootReportNames.length) {
  console.error('FAIL · v44 root still has historical reports/guides: ' + rootReportNames.join(', '));
  process.exit(1);
}
const sourcePages = fs.readdirSync('site').filter((f) => f.endsWith('.html'));
let failures = [];
for (const f of sourcePages) {
  const html = fs.readFileSync(path.join('site', f), 'utf8');
  if (/Loading…|>\s*Loading\s*<|>\s*0 routes\s*</i.test(html)) failures.push(`${f}: loading/zero fallback`);
  if (!/<link\s+rel=["']canonical["']/i.test(html)) failures.push(`${f}: missing canonical`);
  if (!/<meta\s+property=["']og:title["']/i.test(html)) failures.push(`${f}: missing og:title`);
  if (!/<meta\s+name=["']twitter:card["']/i.test(html)) failures.push(`${f}: missing twitter card`);
}
if (failures.length) {
  console.error('FAIL · v44 source page trust checks failed');
  failures.slice(0, 80).forEach((f) => console.error(' - ' + f));
  process.exit(1);
}
console.log(`PASS · Repository Public Trust Failsafe v44 kernel (${sourcePages.length} source pages checked)`);
