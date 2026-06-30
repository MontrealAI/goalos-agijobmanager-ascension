import fs from 'node:fs';
import path from 'node:path';

const required = [
  'README.md',
  'docs/README.md',
  'docs/GETTING_STARTED.md',
  'docs/ARCHITECTURE.md',
  'docs/DEMO_CATALOG.md',
  'docs/PROOF_OBJECTS.md',
  'docs/DEPLOYMENT_GITHUB_WEB_UI.md',
  'docs/WORKFLOW_AUTOPILOT.md',
  'docs/SECURITY_PRIVACY_BOUNDARY.md',
  'docs/CLAIM_BOUNDARY.md',
  'docs/AGIALPHA_BOUNDARY.md',
  'docs/TROUBLESHOOTING.md',
  'docs/RELEASE_CHECKLIST.md',
  'CONTRIBUTING.md',
  'SECURITY.md',
  'CODE_OF_CONDUCT.md',
  'SUPPORT.md',
  'docs/FAQ.md',
  'docs/GITHUB_SETTINGS_GUIDE.md',
  'docs/releases/V41_DOCUMENTATION_UPGRADE.md',
  '.github/ISSUE_TEMPLATE/bug_report.yml',
  '.github/ISSUE_TEMPLATE/documentation.yml',
  '.github/ISSUE_TEMPLATE/demo_feedback.yml',
  '.github/PULL_REQUEST_TEMPLATE.md'
];
const failures = [];
for (const file of required) if (!fs.existsSync(file)) failures.push(`Missing ${file}`);
const readme = fs.readFileSync('README.md', 'utf8');
for (const phrase of [
  'https://montrealai.github.io/goalos-agijobmanager-ascension/',
  'no user data wanted',
  'no wallet',
  'Evidence Docket',
  'ProofBundle',
  'Governed Decision State',
  'AGIALPHA'
]) {
  if (!readme.includes(phrase)) failures.push(`README missing ${phrase}`);
}

function markdownFiles(dir) {
  const out = [];
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) out.push(...markdownFiles(p));
    else if (entry.isFile() && entry.name.endsWith('.md')) out.push(p);
  }
  return out;
}

const unsupported = [
  'achieved AGI',
  'achieved ASI',
  'guaranteed return',
  'investment opportunity',
  'external audit completed',
  'production certified',
  'risk-free'
];
const boundaryPattern = /does not claim|not claim|does not prove|not prove|claims not made|no achieved|not an external audit|not an offer|no promise|no profit|forbidden language|must not claim|not\s+(?:a\s+)?(?:production certified|risk-free|investment opportunity)|no\s+(?:legal|financial|investment|external audit|production certification)|without claiming|do not create/i;
const secretInstructionPattern = /\b(enter|paste|submit|provide|upload)\b.*\b(private key|seed phrase|customer data|personal data|secret|secrets)\b/i;

for (const file of ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'SUPPORT.md', 'CODE_OF_CONDUCT.md', ...markdownFiles('docs')]) {
  if (!fs.existsSync(file)) continue;
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, i) => {
    const context = `${lines[Math.max(0, i - 2)] || ''} ${lines[Math.max(0, i - 1)] || ''} ${line}`;
    for (const phrase of unsupported) {
      if (line.includes(phrase) && !boundaryPattern.test(context)) {
        failures.push(`${file}:${i + 1} unsupported affirmative claim phrase: ${phrase}`);
      }
    }
    if (secretInstructionPattern.test(line) && !/do not|never|must not|should not|without|not to|told not|instructed not/i.test(line)) {
      failures.push(`${file}:${i + 1} appears to instruct users to provide sensitive data`);
    }
  });
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('documentation.test PASS');
