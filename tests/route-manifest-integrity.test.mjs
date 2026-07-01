import {spawnSync} from 'node:child_process';
const r=spawnSync(process.execPath, ['tools/route-manifest-integrity.mjs'], {stdio:'inherit'});
process.exit(r.status ?? 1);
