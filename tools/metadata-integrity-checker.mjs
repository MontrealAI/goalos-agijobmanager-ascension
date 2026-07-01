import fs from 'node:fs';
const fail=m=>{console.error('FAIL · metadata integrity: '+m); process.exit(1)};
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
const primary=new Set(['index.html','start.html','command-center.html','experience-concierge.html','experience-hub.html','site-atlas.html','navigation-atlas.html','experience-atlas.html','superintelligence-proof-governance-console.html','asi-proof-horizon-console.html','loop-to-rsi-to-asi-superintelligence.html','loop-to-rsi-control-room.html','loop-to-rsi.html','loop-evidence-reactor.html','proof-to-action-theatre.html','evidence-docket-composer.html','proof-settlement-lifecycle.html','trust-equation-simulator.html','legal.html','privacy.html','terms.html','agialpha-token-boundary.html']);
const routes=(manifest.pages||[]).map(p=>(p.route||'').replace(/^\//,'')||'index.html').filter(r=>primary.has(r));
const required=['<title','name="description"','rel="canonical"','property="og:type"','property="og:site_name"','property="og:title"','property="og:description"','property="og:url"','property="og:image"','name="twitter:card"','name="twitter:title"','name="twitter:description"','name="twitter:image"','name="theme-color"'];
for (const r of routes) { const f='site/'+r; if (!fs.existsSync(f)) fail(`missing ${f}`); const t=fs.readFileSync(f,'utf8'); for (const needle of required) if (!t.includes(needle)) fail(`${f} missing ${needle}`); }
if (!fs.existsSync('site/assets/social-card.svg')) fail('missing site/assets/social-card.svg');
console.log(`PASS · metadata integrity verified ${routes.length} flagship pages`);
