import fs from 'node:fs';
const manifest = JSON.parse(fs.readFileSync('data/canonical-route-manifest.json', 'utf8'));
const pages = manifest.pages || manifest.routes || [];
const count = pages.length;
const required = ['ask-goalos.html', 'canonical-proof-institution.html', 'complete-route-index.html', 'command-center.html', 'experience-command.html', 'experience-hub.html'];
for (const route of required) {
  const found = pages.some(page => (page.route || page.path || '').replace(/^\//,'') === route);
  if (!found) throw new Error(`missing canonical route ${route}`);
  if (!fs.existsSync(`site/${route}`)) throw new Error(`missing source page site/${route}`);
}
const catalog = fs.readFileSync('docs/DEMO_CATALOG.md','utf8');
if (!catalog.includes(`${count} public routes`)) throw new Error(`docs/DEMO_CATALOG.md does not advertise ${count} public routes`);
if (/65 public routes/.test(catalog)) throw new Error('docs/DEMO_CATALOG.md still advertises stale 65 public routes');
console.log(`PASS · Ask GoalOS route-count failsafe v61 kernel verified ${count} routes and current docs`);
