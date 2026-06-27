import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const read = p => fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
const fail = msg => { throw new Error(msg); };
const ok = msg => console.log('PASS · '+msg);
const pkg = JSON.parse(read(path.join(root, 'package.json')) || '{}');
const deps = {...(pkg.dependencies||{}), ...(pkg.devDependencies||{})};
if (Object.keys(deps).length) fail('package.json must remain zero-dependency for offline publisher; found '+Object.keys(deps).join(', '));
ok('package.json has no npm registry dependencies');
const workflow = read(path.join(root, '.github/workflows/goalos-agijobmanager-ascension-production-url-autopilot.yml'));
for (const bad of ['npm ci', 'npm install', 'package-lock-only', 'node_modules/', 'cdn.jsdelivr', 'unpkg.com']) {
  if (workflow.includes(bad)) fail('workflow contains forbidden network/dependency primitive: '+bad);
}
ok('workflow avoids npm install and public package registries');
if (!workflow.includes('git add -A')) fail('workflow must use git add -A, not fragile explicit pathspecs');
if (/git\s+add\s+[^\n]*(npm-shrinkwrap\.json|yarn\.lock|pnpm-lock\.yaml)/.test(workflow)) fail('workflow contains optional lockfile pathspec that can fail when absent');
ok('workflow commit stage is pathspec-proof');
const vendor = path.join(root, 'site/vendor/ethers.umd.min.js');
if (!fs.existsSync(vendor)) fail('site/vendor/ethers.umd.min.js must be checked in; no runtime CDN or npm fetch allowed');
if (fs.statSync(vendor).size < 100000) fail('vendored ethers file appears incomplete');
ok('vendored ethers library is present');
const mainnet = read(path.join(root, 'site/assets/mainnet-console.js')) + read(path.join(root, 'site/assets/expert-console.js'));
if (!mainnet.includes('window.ethereum')) fail('expert Mainnet surface must explicitly use user wallet provider only');
if (!mainnet.includes('eth_requestAccounts')) fail('expert Mainnet surface must request wallet accounts only by explicit user action');
if (!mainnet.includes('wallet_switchEthereumChain')) fail('expert Mainnet surface must support explicit Ethereum Mainnet switch');
if (mainnet.includes('MaxUint256')) fail('unlimited approval primitive is forbidden');
ok('expert Mainnet surface remains explicit and finite');
const publicPages = ['site/index.html','site/operator-console.html','site/evidence/index.html','site/architecture.html','site/verification.html','site/legal.html','site/privacy.html','site/terms.html','site/regulatory-boundary.html','site/third-party-responsibility.html','site/agialpha-token-boundary.html','site/sovereign-machine-economy.html','site/assurance.html'];
for (const rel of publicPages) {
  const text = read(path.join(root, rel));
  for (const bad of ['eth_requestAccounts','wallet_switchEthereumChain','eth_sendTransaction','approve(']) {
    if (text.includes(bad)) fail(rel+' contains forbidden public-page primitive '+bad);
  }
}
ok('public pages remain wallet-free');
const token = read(path.join(root,'data/agialpha-token-boundary.json')) + read(path.join(root,'site/agialpha-token-boundary.html'));
if (!token.includes('0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA')) fail('official checksum AGIALPHA address missing from token boundary');
if (!/not available from MontrealAI/i.test(token)) fail('token boundary must say AGIALPHA is not available from MontrealAI');
if (!/not available from this website/i.test(token)) fail('token boundary must say AGIALPHA is not available from this website');
ok('AGIALPHA token market boundary remains explicit');
