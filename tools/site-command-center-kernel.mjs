import fs from 'node:fs';
const fail = msg => { console.error('FAIL · '+msg); process.exit(1); };
const ok = msg => console.log('PASS · '+msg);
for (const p of ['dist/index.html','dist/site-atlas.html','dist/archive-v36-ascension-chamber.html','dist/site-navigation-map.json','dist/assets/site-shell.js','dist/assets/site-shell.css','dist/assets/site-shell-data.js']) {
  if (!fs.existsSync(p)) fail(`dist artifact missing: ${p}`);
}
ok('v37 command-center dist artifacts exist');
const data = JSON.parse(fs.readFileSync('dist/site-navigation-map.json','utf8'));
if (data.routes.length < 40) fail('dist navigation map is incomplete');
const status = JSON.parse(fs.readFileSync('dist/production-url.json','utf8'));
if (status.siteCommandCenter !== 'PASS' || status.navigationCompleteness !== 'PASS') fail('production-url status missing v37 completion marks');
const manifest = JSON.parse(fs.readFileSync('dist/build-manifest.json','utf8'));
const aliases = [manifest.release, ...(manifest.releaseAliases||[])];
if (!aliases.includes('v37-site-command-center')) fail('build manifest should include v37-site-command-center alias');
fs.writeFileSync('SITE_COMMAND_CENTER_V37_REPORT.json', JSON.stringify({status:'PASS',routes:data.routes.length,release:'v37-site-command-center'}, null, 2));
ok('Site Command Center v37 kernel PASS');
