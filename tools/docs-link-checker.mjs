import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const explicit = ['README.md', 'CONTRIBUTING.md', 'SECURITY.md', 'SUPPORT.md', 'CODE_OF_CONDUCT.md'];
const files = [];

function addIfMarkdown(file) {
  if (fs.existsSync(file) && fs.statSync(file).isFile() && file.endsWith('.md')) files.push(file);
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(p);
    else if (entry.isFile() && entry.name.endsWith('.md')) files.push(p);
  }
}

for (const file of explicit) addIfMarkdown(file);
walk('docs');
walk('.github');

const uniqueFiles = [...new Set(files)].sort();
const missing = [];
const stale = [];
const anchorWarnings = [];
const externalWarnings = [];
const linkPattern = /(?<!!?\[[^\]]*\]\()\[[^\]]+\]\(([^)\s]+)(?:\s+"[^"]*")?\)/g;

for (const file of uniqueFiles) {
  const text = fs.readFileSync(file, 'utf8');
  for (const match of text.matchAll(linkPattern)) {
    const raw = match[1].trim();
    if (!raw || raw.startsWith('#')) {
      if (raw?.startsWith('#')) anchorWarnings.push(`${file}: anchor-only link ${raw} (file exists; anchor not verified)`);
      continue;
    }
    if (/^(https?:)?\/\//i.test(raw)) {
      externalWarnings.push(`${file}: external link ${raw} (not fetched)`);
      continue;
    }
    if (/^[a-z][a-z0-9+.-]*:/i.test(raw) || raw.startsWith('mailto:')) continue;

    const [targetPart, anchor] = raw.split('#');
    const noAnchor = decodeURIComponent(targetPart || '');
    if (anchor) anchorWarnings.push(`${file}: ${raw} (target file checked; anchor not verified)`);
    if (!noAnchor) continue;

    const insideReleaseOrArchive = /(^|[/\\])(docs[/\\]releases|archive)([/\\]|$)/i.test(file);
    if (!insideReleaseOrArchive && (/v\d+[^/\\]*\.zip$/i.test(noAnchor) || /package-v\d+/i.test(noAnchor))) {
      stale.push(`${file}: ${raw}`);
    }

    const target = path.resolve(root, path.dirname(file), noAnchor);
    if (!fs.existsSync(target)) missing.push(`${file}: ${raw} -> ${path.relative(root, target)}`);
  }
}

if (externalWarnings.length) console.warn(`docs-link-checker WARN: ${externalWarnings.length} external links were not fetched`);
if (anchorWarnings.length) console.warn(`docs-link-checker WARN: ${anchorWarnings.length} anchors were not deeply verified`);
if (stale.length || missing.length) {
  if (stale.length) console.error('docs-link-checker FAIL: stale local vXX ZIP/package links found outside release/archive notes:\n' + stale.join('\n'));
  if (missing.length) console.error('docs-link-checker FAIL: missing local documentation links:\n' + missing.join('\n'));
  process.exit(1);
}
console.log(`docs-link-checker PASS: ${uniqueFiles.length} markdown files scanned`);
