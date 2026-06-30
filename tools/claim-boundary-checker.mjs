import fs from 'node:fs';
import path from 'node:path';

const roots = ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'SUPPORT.md', 'CODE_OF_CONDUCT.md'];
const scanDirs = ['docs', 'site'];
const files = [];
function walk(p) {
  if (!fs.existsSync(p)) return;
  const st = fs.statSync(p);
  if (st.isFile()) {
    if (/\.(md|html)$/i.test(p)) files.push(p);
    return;
  }
  for (const e of fs.readdirSync(p, { withFileTypes: true })) walk(path.join(p, e.name));
}
for (const f of roots) if (fs.existsSync(f)) files.push(f);
for (const d of scanDirs) walk(d);

const prohibited = [
  'achieved AGI','achieved ASI','achieved superintelligence','guaranteed return',
  'investment opportunity','external audit completed','production certified','risk-free',
  'legal advice','financial advice','guaranteed ROI','empirical SOTA','safety certified',
  'token sale','buy AGIALPHA','sell AGIALPHA','price support','liquidity support'
];
const neg = /\b(no|not|never|does not|do not|must not|without|isn't|is not|avoid|forbidden|prohibited|boundary|negative|neither|nor)\b/i;
const secret = /\b(enter|paste|submit|provide|upload|type)\b.*\b(private keys?|seed phrases?|customer data|regulated data|secrets?|wallet credentials?|personal data)\b/i;
const failures = [];
for (const file of [...new Set(files)].sort()) {
  const lines = fs.readFileSync(file, 'utf8').split(/\r?\n/);
  lines.forEach((line, idx) => {
    const context = `${lines[idx-2]||''} ${lines[idx-1]||''} ${line}`;
    for (const phrase of prohibited) {
      if (line.toLowerCase().includes(phrase.toLowerCase()) && !neg.test(context)) {
        failures.push(`${file}:${idx+1}: unsupported affirmative phrase "${phrase}"`);
      }
    }
    if (secret.test(line) && !/do not|never|must not|should not|without|not to|instruct.*not|free of|non-confidential|public-safe/i.test(line)) {
      failures.push(`${file}:${idx+1}: appears to instruct users to provide sensitive data`);
    }
  });
}
if (failures.length) {
  console.error('claim-boundary-checker FAIL');
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log(`claim-boundary-checker PASS: ${[...new Set(files)].length} files scanned`);
