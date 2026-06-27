import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const required = [
  'site/vendor/ethers.umd.min.js',
  'site/expert-console.html',
  'site/expert-mainnet-console.html',
  'site/assets/expert-console.js',
  'tools/build.py',
  'tools/verify.py',
  'tools/mainnet-factual-check.mjs',
  'package.json',
  '.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml'
];
const fail = (msg) => { console.error(`Dependency-Zero Kernel FAIL: ${msg}`); process.exit(1); };
for (const rel of required) if (!fs.existsSync(path.join(root, rel))) fail(`missing ${rel}`);

const pkg = JSON.parse(fs.readFileSync(path.join(root, 'package.json'), 'utf8'));
if (pkg.dependencies && Object.keys(pkg.dependencies).length) fail('package.json must not define runtime dependencies');
if (pkg.devDependencies && Object.keys(pkg.devDependencies).length) fail('package.json must not define devDependencies');
if (fs.existsSync(path.join(root, 'package-lock.json'))) fail('package-lock.json must be removed to prevent registry lock-in');
if (fs.existsSync(path.join(root, 'node_modules'))) fail('node_modules must not be committed or required');

const workflow = fs.readFileSync(path.join(root, '.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml'), 'utf8');
for (const bad of ['npm ci', 'npm install', 'npm audit', 'setup-node', 'packages.applied-caas-gateway', 'registry-url']) {
  if (workflow.includes(bad)) fail(`workflow contains network/dependency primitive: ${bad}`);
}
for (const marker of ['Dependency-Zero Publisher v14', 'actions/checkout@v7', 'actions/configure-pages@v6', 'actions/upload-pages-artifact@v5', 'actions/deploy-pages@v5', 'rm -f package-lock.json']) {
  if (!workflow.includes(marker)) fail(`workflow missing v14 marker: ${marker}`);
}

const ethersBytes = fs.statSync(path.join(root, 'site/vendor/ethers.umd.min.js')).size;
if (ethersBytes < 100000) fail('vendored ethers bundle appears missing or truncated');
const expert = fs.readFileSync(path.join(root, 'site/assets/expert-console.js'), 'utf8') + fs.readFileSync(path.join(root, 'site/expert-mainnet-console.html'), 'utf8');
for (const marker of ['eth_requestAccounts', 'wallet_switchEthereumChain', 'approve(CANON.manager', 'staticCall', 'estimateGas', 'AUTHORIZE MAINNET', 'ACTIVATE PRODUCTION AUTHORITY']) {
  if (!expert.includes(marker)) fail(`expert Mainnet console missing capability: ${marker}`);
}
for (const bad of ['MaxUint256', 'localStorage.setItem', 'sessionStorage.setItem', 'privateKey']) {
  if (expert.includes(bad)) fail(`expert console contains forbidden primitive: ${bad}`);
}

const publicFiles = ['site/index.html','site/operator-console.html','site/sovereign-machine-economy.html','site/evidence/index.html','site/architecture.html','site/verification.html','site/assurance.html'];
const publicText = publicFiles.map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
for (const bad of ['eth_requestAccounts', 'wallet_switchEthereumChain', 'eth_sendTransaction', 'approve(CANON.manager', 'MaxUint256']) {
  if (publicText.includes(bad)) fail(`public surface contains expert primitive: ${bad}`);
}

const legal = ['site/privacy.html','site/legal.html','site/terms.html','site/regulatory-boundary.html','site/third-party-responsibility.html','site/agialpha-token-boundary.html'].map(f => fs.readFileSync(path.join(root, f), 'utf8')).join('\n');
for (const phrase of ['We do not want', 'No analytics', 'No cookies', 'not available from MontrealAI', 'not available from this website', '0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA']) {
  if (!legal.includes(phrase)) fail(`legal/token boundary missing phrase: ${phrase}`);
}

const report = {
  status: 'PASS',
  release: 'v14-dependency-zero-final',
  checks: [
    'no package-lock registry lock-in',
    'no npm install / npm ci in workflow',
    'vendored ethers present',
    'public surface excludes wallet primitives',
    'expert console contains gated Mainnet capabilities',
    'legal/data-zero/token boundary present',
    'current GitHub Pages actions selected'
  ],
  generatedAt: new Date().toISOString()
};
fs.writeFileSync(path.join(root, 'DEPENDENCY_ZERO_ASSURANCE_V14.json'), JSON.stringify(report, null, 2));
console.log('Dependency-Zero Kernel PASS · no npm · no registry · vendored expert console · Pages-ready');
