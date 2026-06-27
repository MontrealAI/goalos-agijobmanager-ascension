import fs from 'node:fs';
const fail = msg => { throw new Error(msg); };
const ok = msg => console.log('PASS · '+msg);
const workflowPath = '.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml';
const workflow = fs.readFileSync(workflowPath, 'utf8');
if (!workflow.includes('git add -A')) fail('workflow must use git add -A for pathspec-safe generated commits');
const dangerous = [
  'git add site data schemas',
  'git add package-lock.json',
  'git add npm-shrinkwrap.json',
  'git add yarn.lock',
  'git add pnpm-lock.yaml'
];
for (const token of dangerous) {
  if (workflow.includes(token)) fail('workflow contains pathspec-fragile command: '+token);
}
if (/git\s+add\s+[^\n]*npm-shrinkwrap\.json/.test(workflow)) fail('workflow must not git add npm-shrinkwrap.json by explicit path');
if (/git\s+add\s+[^\n]*yarn\.lock/.test(workflow)) fail('workflow must not git add yarn.lock by explicit path');
if (/git\s+add\s+[^\n]*pnpm-lock\.yaml/.test(workflow)) fail('workflow must not git add pnpm-lock.yaml by explicit path');
if (workflow.includes('npm ci') || workflow.includes('npm install')) fail('workflow must not install npm dependencies');
if (!workflow.includes('actions/checkout@v6.0.0')) fail('workflow should use pinned checkout v6.0.0');
if (!workflow.includes('actions/configure-pages@v6.0.0')) fail('workflow should use pinned configure-pages v6.0.0');
if (!workflow.includes('actions/upload-pages-artifact@v5.0.0')) fail('workflow should use pinned upload-pages-artifact v5.0.0');
if (!workflow.includes('actions/deploy-pages@v5.0.0')) fail('workflow should use pinned deploy-pages v5.0.0');
ok('workflow commit step is pathspec-proof and registry-independent');
