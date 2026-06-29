import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const files = ['README.md'];
function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(p);
  }
}
walk('docs');
const missing = [];
const legacy = [];
const linkPattern = /(?<!!?\[[^\]]*\]\()\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(linkPattern)) {
    const raw = match[1].trim();
    if (!raw || raw.startsWith('#') || /^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith('mailto:')) continue;
    const noAnchor = decodeURIComponent(raw.split('#')[0]);
    if (!noAnchor) continue;
    if (/v\d+[^/]*\.zip$/i.test(noAnchor) || /package-v\d+/i.test(noAnchor)) legacy.push(`${file}: ${raw}`);
    const target = path.resolve(root, path.dirname(file), noAnchor);
    if (!fs.existsSync(target)) missing.push(`${file}: ${raw} -> ${path.relative(root, target)}`);
  }
}
if (legacy.length || missing.length) {
  if (legacy.length) console.error('Archived package links must be intentional:\n' + legacy.join('\n'));
  if (missing.length) console.error('Missing local documentation links:\n' + missing.join('\n'));
  process.exit(1);
}
console.log(`docs-link-checker PASS: ${files.length} markdown files scanned`);
