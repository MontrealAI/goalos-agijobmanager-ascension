import fs from 'node:fs';
import path from 'node:path';

const required = [
  'README.md','docs/README.md','docs/GETTING_STARTED.md','docs/ARCHITECTURE.md','docs/DEMO_CATALOG.md',
  'docs/SECURITY_PRIVACY_BOUNDARY.md','docs/CLAIM_BOUNDARY.md','docs/AGIALPHA_BOUNDARY.md',
  'docs/DEPLOYMENT_GITHUB_WEB_UI.md','docs/TROUBLESHOOTING.md'
];
const failures = [];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing ${file}`);
const readme = fs.readFileSync('README.md', 'utf8');
for (const phrase of [
  'https://montrealai.github.io/goalos-agijobmanager-ascension/',
  'no user data wanted', 'no wallet', 'Evidence Docket', 'ProofBundle', 'Governed Decision State'
]) {
  if (!readme.includes(phrase)) failures.push(`README missing ${phrase}`);
}
function markdownFiles(dir) {
  const out = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...markdownFiles(p));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}
const unsupported = [
  'achieved AGI','achieved ASI','guaranteed return','investment opportunity',
  'external audit completed','production certified'
];
for (const file of ['README.md', ...markdownFiles('docs')]) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    const context = `${lines[Math.max(0, i - 2)] || ''} ${lines[Math.max(0, i - 1)] || ''} ${line}`;
    for (const phrase of unsupported) {
      if (line.includes(phrase) && !/does not claim|not claim|does not prove|Claims not made|No achieved|not an external audit|not an offer|no promise|No profit promise|\bnot\b|Forbidden language|must not claim/i.test(context)) {
        failures.push(`${file}:${i + 1} unsupported claim phrase: ${phrase}`);
      }
    }
  });
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('documentation.test PASS');
