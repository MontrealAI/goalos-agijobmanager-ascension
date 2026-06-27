import fs from 'node:fs';
import path from 'node:path';
const root = process.cwd();
const CHECKSUM = '0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA';
const LOWER = CHECKSUM.toLowerCase();
const failures = [];
function assert(name, cond){ if(!cond) failures.push(name); else console.log('PASS', name); }
function read(p){ return fs.readFileSync(path.join(root,p),'utf8'); }
function exists(p){ return fs.existsSync(path.join(root,p)); }
const required = [
  'data/agialpha-token-boundary.json',
  'schemas/agialpha-token-boundary.schema.json',
  'data/legal-boundary-policy.json',
  'data/canonical-identities.json',
  'site/agialpha-token-boundary.html',
  'docs/AGIALPHA_TOKEN_MARKET_BOUNDARY.md',
  'docs/INVESTMENT_AND_TOKEN_BOUNDARY.md',
  'docs/LEGAL_SHIELD_V13_TOKEN_MARKET_BOUNDARY_REPORT.md'
];
for(const f of required) assert(`required file exists: ${f}`, exists(f));
const token = JSON.parse(read('data/agialpha-token-boundary.json'));
const legal = JSON.parse(read('data/legal-boundary-policy.json'));
const canonical = JSON.parse(read('data/canonical-identities.json'));
assert('official checksum address in token policy', token.officialToken.addressChecksum === CHECKSUM);
assert('official lowercase address recorded', token.officialToken.addressLowercase === LOWER);
assert('canonical identities use checksum token address', canonical.contracts.AGIALPHA === CHECKSUM);
assert('legal policy uses checksum token address', legal.canonicalIdentities.AGIALPHA === CHECKSUM);
for(const k of ['preExistingPublicMarketToken','thirdPartyPublicMarkets','decentralizedMarketSurfaces','notOfferedByMontrealAI','notSoldByMontrealAI','notMadeAvailableFromMontrealAI','notRedeemableFromMontrealAI','noPrimarySale','noAllocationFromProject','noBrokerDealerOrExchangeService','noCustody','noLiquiditySupport','noMarketMaking','noPriceSupport','noAvailabilityGuarantee','noRecommendationToAcquireHoldOrSell']){
  assert(`token market posture ${k} true`, token.marketPosture[k] === true);
}
assert('user/operator burden is sole responsibility', token.userOperatorBurden.soleResponsibility === true && /solely responsible/i.test(token.userOperatorBurden.text));
const combined = required.filter(f=>f.endsWith('.md') || f.endsWith('.html')).map(read).join('\n');
for(const phrase of [
  CHECKSUM,
  'not available from MontrealAI',
  'not available from this website',
  'pre-existing public-market token',
  'third-party market',
  'no primary sale',
  'no custody',
  'no price support',
  'no liquidity support',
  'solely responsible'
]){ assert(`token boundary phrase present: ${phrase}`, combined.includes(phrase)); }
const siteText = ['site/index.html','site/legal.html','site/regulatory-boundary.html','site/terms.html','site/verification.html','site/agialpha-token-boundary.html'].map(read).join('\n');
assert('site exposes token-boundary route', siteText.includes('agialpha-token-boundary.html'));
assert('site includes official checksum token address', siteText.includes(CHECKSUM));
const forbidden = ['buy from us','we sell AGIALPHA','guaranteed liquidity','guaranteed price','guaranteed return','profit opportunity','official exchange service','we custody AGIALPHA'];
for(const bad of forbidden){ assert(`forbidden token phrase absent: ${bad}`, !siteText.toLowerCase().includes(bad.toLowerCase())); }
if(failures.length){ console.error(`TOKEN BOUNDARY FAIL: ${failures.length} failure(s)`); for(const f of failures) console.error('-', f); process.exit(1); }
console.log('TOKEN BOUNDARY PASS · AGIALPHA checksum identity, third-party-market boundary, no-availability-from-project posture, and user responsibility verified');
