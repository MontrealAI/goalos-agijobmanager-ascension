import fs from 'node:fs';
const fail=m=>{console.error('FAIL · accessibility static: '+m); process.exit(1)};
const pages=['index.html','start.html','command-center.html','experience-concierge.html','experience-hub.html','site-atlas.html','navigation-atlas.html','experience-atlas.html','superintelligence-proof-governance-console.html','asi-proof-horizon-console.html'];
for (const p of pages) { const f='site/'+p; const t=fs.readFileSync(f,'utf8'); const h1=(t.match(/<h1\b/gi)||[]).length; if (h1!==1) fail(`${f} must have exactly one h1, found ${h1}`); if (!/<title>[^<]{8,}<\/title>/i.test(t)) fail(`${f} needs meaningful title`); if (/<button\b[^>]*>\s*<\/button>/i.test(t) || /<a\b[^>]*>\s*<\/a>/i.test(t)) fail(`${f} has empty button/link`); }
const css=fs.readdirSync('site/assets').filter(f=>f.endsWith('.css')).map(f=>fs.readFileSync('site/assets/'+f,'utf8')).join('\n');
if (!css.includes(':focus') && !css.includes('focus-visible')) fail('visible focus state not documented in CSS');
if (!css.includes('prefers-reduced-motion')) fail('prefers-reduced-motion support missing');
console.log(`PASS · accessibility static checks verified ${pages.length} flagship pages`);
