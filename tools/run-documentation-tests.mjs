import {spawnSync} from 'node:child_process';
const tests=['tests/documentation.test.mjs','tests/repository-public-trust-v43.test.mjs'];
for (const t of tests) {
  const r=spawnSync(process.execPath,[t],{stdio:'inherit'});
  if (r.status !== 0) process.exit(r.status ?? 1);
}
console.log(`PASS · ${tests.length} documentation/public-trust tests executed`);
