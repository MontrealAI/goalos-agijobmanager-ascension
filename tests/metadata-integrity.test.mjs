import {spawnSync} from 'node:child_process';
const r=spawnSync(process.execPath, ['tools/metadata-integrity-checker.mjs'], {stdio:'inherit'});
process.exit(r.status ?? 1);
