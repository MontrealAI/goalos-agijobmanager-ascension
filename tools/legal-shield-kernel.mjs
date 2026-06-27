import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const failures = [];
function assert(name, cond){ if(!cond) failures.push(name); else console.log('PASS', name); }
function read(p){ return fs.readFileSync(path.join(root,p),'utf8'); }
function exists(p){ return fs.existsSync(path.join(root,p)); }
const required = [
  'site/legal.html','site/privacy.html','site/terms.html','site/regulatory-boundary.html','site/third-party-responsibility.html',
  'docs/DATA_ZERO_PRIVACY_POLICY.md','docs/TERMS_OF_USE.md','docs/LEGAL_AND_REGULATORY_BOUNDARY.md','docs/INVESTMENT_AND_TOKEN_BOUNDARY.md','docs/THIRD_PARTY_OPERATOR_RESPONSIBILITY.md',
  'data/legal-boundary-policy.json','schemas/legal-boundary-policy.schema.json'
];
for (const f of required) assert(`required file exists: ${f}`, exists(f));
const policy = JSON.parse(read('data/legal-boundary-policy.json'));
assert('zero intentional personal-data collection', policy.dataZeroPosture.intentionalPersonalDataCollection === false);
assert('analytics disabled', policy.dataZeroPosture.analytics === false);
assert('cookies disabled', policy.dataZeroPosture.cookies === false);
assert('forms disabled', policy.dataZeroPosture.forms === false);
assert('no investment offering', policy.investmentAndTokenBoundary.offering === false);
assert('no investment advice', policy.investmentAndTokenBoundary.investmentAdvice === false);
assert('no profit promise', policy.investmentAndTokenBoundary.profitPromise === false);
assert('no external audit completed claim', policy.auditAndAssuranceBoundary.externalAuditCompleted === false);
assert('user burden explicit', /solely responsible/i.test(policy.thirdPartyResponsibility.userBurden));
const combined = required.filter(f=>f.endsWith('.md') || f.endsWith('.html')).map(read).join('\n').toLowerCase();
for (const phrase of ['do not submit personal data','no investment','not legal','solely responsible','no analytics','no cookies','no accounts','no forms','not a third-party audit']){
  assert(`legal phrase present: ${phrase}`, combined.includes(phrase));
}
const scanFiles = [];
function walk(dir){ for(const ent of fs.readdirSync(path.join(root,dir),{withFileTypes:true})){ const rel=path.join(dir,ent.name); if(ent.isDirectory()) walk(rel); else scanFiles.push(rel); } }
walk('site');
const forbidden = [
  'googletagmanager.com','google-analytics.com','gtag(','fbq(','connect.facebook.net','hotjar','mixpanel','segment.io','amplitude.com','plausible.io','document.cookie','localStorage.setItem','sessionStorage.setItem'
];
for(const f of scanFiles){
  if(f.includes('vendor/')) continue;
  const txt = read(f);
  for(const bad of forbidden){ assert(`no tracking primitive ${bad} in ${f}`, !txt.includes(bad)); }
  if(f.endsWith('.html') && !['site/expert-mainnet-console.html'].includes(f)) assert(`no form tag in ${f}`, !/<form\b/i.test(txt));
}
const mainnetJs = read('site/assets/mainnet-console.js');
assert('expert console uses local ethers global', mainnetJs.includes('window.ethers') && !mainnetJs.includes('cdn.jsdelivr'));
const expertHtml = read('site/expert-mainnet-console.html');
assert('expert console loads local vendor ethers', expertHtml.includes('vendor/ethers.umd.min.js'));
const index = read('site/index.html');
assert('home exposes legal boundary', index.includes('legal.html') && index.includes('privacy.html') && index.includes('terms.html'));
if (failures.length){ console.error(`LEGAL SHIELD FAIL: ${failures.length} failure(s)`); for(const f of failures) console.error('-', f); process.exit(1); }
console.log('LEGAL SHIELD PASS · data-zero, no-investment, no-advice, third-party responsibility, and public-safety boundaries verified');
