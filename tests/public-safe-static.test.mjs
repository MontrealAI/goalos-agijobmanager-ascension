import {spawnSync} from 'node:child_process';
const r=spawnSync(process.execPath, ['tools/public-safe-static-checker.mjs'], {stdio:'inherit'});
process.exit(r.status ?? 1);
