import {spawnSync} from 'node:child_process';
const r=spawnSync(process.execPath, ['tools/accessibility-static-checker.mjs'], {stdio:'inherit'});
process.exit(r.status ?? 1);
