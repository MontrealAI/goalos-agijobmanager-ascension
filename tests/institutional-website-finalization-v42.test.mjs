
import fs from 'node:fs';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
const files=['site/start.html','site/coordination-lab.html','site/experience-concierge.html','site/command-center.html','site/experience-hub.html','site/site-atlas.html','site/navigation-atlas.html','site/assets/institutional-final-v42.css','site/assets/coordination-lab-v42.js','data/site-navigation-v42.json'];
for(const f of files) must(fs.existsSync(f),`v42 file exists: ${f}`);
for(const f of files.filter(f=>f.endsWith('.html'))){const h=fs.readFileSync(f,'utf8'); must(!/Loading…|Loading\.\.\.|0 routes|0 matching pages|—public routes|HomeStartDemos|Settlement Rail<\/a><a[^>]+>Evidence Docket<\/a><a[^>]+>Settlement Rail/.test(h),`${f} has no blank/stacked fallback markers`); must((h.match(/<nav\b/g)||[]).length<=1,`${f} has at most one native nav`); must(/site-command-v39\.js/.test(h),`${f} keeps floating Site Command`); must(/no wallet|No wallet/i.test(h),`${f} states no-wallet public posture`); must(!/localStorage|sessionStorage|document\.cookie|navigator\.sendBeacon|ethereum\.request|eth_sendTransaction|wallet_switchEthereumChain|<form\b/i.test(h),`${f} avoids forbidden public primitives`);}
const nav=JSON.parse(fs.readFileSync('data/site-navigation-v42.json','utf8')); must(nav.pages.length>=38,'v42 route catalog preserves at least 38 routes'); must(nav.posture.noBlankFallbacks===true,'v42 catalog encodes no blank fallbacks');
console.log('Institutional Website Finalization v42 PASS');
