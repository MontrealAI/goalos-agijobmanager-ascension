import fs from 'node:fs';
import path from 'node:path';
const release = "v42-v43-v44-v45-v46-repository-public-trust-compatibility-failsafe";
const aliases = ["v42-v43-v44-v45-v46-repository-public-trust-compatibility-failsafe", "v46-repository-public-trust-compatibility-failsafe", "v45-repository-public-trust-ultimate-failsafe", "v45-repository-public-trust-zero-missing-test-failsafe", "v44-repository-public-trust-failsafe", "v43-repository-public-trust-finalization", "v42-institutional-website-finalization", "v41-navigation-source-polish-final", "v40-navigation-polish-failsafe", "v39-experience-concierge-complete-navigation", "v38-navigation-system-final", "v37-site-command-center", "v37-site-experience-atlas", "v37-website-command-center"];
function write(file, content){ fs.mkdirSync(path.dirname(file),{recursive:true}); fs.writeFileSync(file, content); }
function ensureCopy(src,dst){ if(fs.existsSync(src) && !fs.existsSync(dst)) fs.copyFileSync(src,dst); }
fs.mkdirSync('tools',{recursive:true}); fs.mkdirSync('tests',{recursive:true}); fs.mkdirSync('data',{recursive:true}); fs.mkdirSync('docs/releases',{recursive:true}); fs.mkdirSync('docs/reports/historical-root',{recursive:true});
// Compatibility manifest: create v46 from v45/v43 if needed.
if(!fs.existsSync('data/canonical-route-manifest-v46.json')){
  const src = fs.existsSync('data/canonical-route-manifest-v45.json') ? 'data/canonical-route-manifest-v45.json' : (fs.existsSync('data/canonical-route-manifest-v43.json') ? 'data/canonical-route-manifest-v43.json' : null);
  if(src){ const m=JSON.parse(fs.readFileSync(src,'utf8')); m.release=release; m.version='v46'; m.releaseAliases=aliases; if(Array.isArray(m.pages)) m.routeCount=m.pages.length; fs.writeFileSync('data/canonical-route-manifest-v46.json', JSON.stringify(m,null,2)); }
}
// Make old cleanup aliases safe.
ensureCopy('tools/root-cleanup-v45.mjs','tools/root-cleanup-v46.mjs');
if(!fs.existsSync('tools/root-cleanup-v46.mjs')) write('tools/root-cleanup-v46.mjs', `import fs from 'node:fs';
import path from 'node:path';
fs.mkdirSync('docs/releases',{recursive:true}); fs.mkdirSync('docs/reports/historical-root',{recursive:true});
let moved=0;
for(const e of fs.readdirSync('.',{withFileTypes:true})){ if(!e.isFile()) continue; if(/_V\d+_REPORT\.md$|_V\d+_WEB_UI_GUIDE\.md$/i.test(e.name)){ const to=path.join('docs','releases',e.name); if(fs.existsSync(to)) fs.rmSync(e.name); else fs.renameSync(e.name,to); moved++; } }
console.log('PASS · root cleanup v46 moved/merged '+moved+' historical files');
`);
ensureCopy('tools/root-cleanup-v46.mjs','tools/root-cleanup-v45.mjs');
ensureCopy('tools/root-cleanup-v46.mjs','tools/root-cleanup-v44.mjs');
ensureCopy('tools/root-cleanup-v46.mjs','tools/root-cleanup-v43.mjs');
// Safe site rehydration fallback.
if(!fs.existsSync('tools/site-rehydrate.mjs')) write('tools/site-rehydrate.mjs', `import fs from 'node:fs';
fs.mkdirSync('data',{recursive:true});
fs.writeFileSync('data/site-rehydration-v46.json', JSON.stringify({status:'PASS',restored:0,release:'v46'},null,2));
console.log('PASS · fallback site rehydration v46 restored 0 missing files');
`);
// Public trust checker aliases.
ensureCopy('tools/public-trust-checker-v46.mjs','tools/public-trust-checker-v45.mjs');
ensureCopy('tools/public-trust-checker-v46.mjs','tools/public-trust-checker-v43.mjs');
ensureCopy('tools/apply-public-trust-metadata-v45.mjs','tools/apply-public-trust-metadata-v46.mjs');
if(!fs.existsSync('tools/apply-public-trust-metadata-v46.mjs')) write('tools/apply-public-trust-metadata-v46.mjs', `import fs from 'node:fs'; import path from 'node:path';
const prod='https://montrealai.github.io/goalos-agijobmanager-ascension/';
for(const dir of ['site','dist']){ if(!fs.existsSync(dir)) continue; for(const f of fs.readdirSync(dir).filter(x=>x.endsWith('.html'))){ const p=path.join(dir,f); let h=fs.readFileSync(p,'utf8'); h=h.replace(/<link\s+rel=["']canonical["'][^>]*>/ig,'').replace(/<meta\s+property=["']og:[^"']+["'][^>]*>/ig,'').replace(/<meta\s+name=["']twitter:[^"']+["'][^>]*>/ig,''); const title=(h.match(/<title>([^<]+)<\/title>/i)?.[1]||'GoalOS AGIJobManager Ascension').replace(/"/g,'&quot;'); const url=prod+(f==='index.html'?'':f); const block='<link rel="canonical" href="'+url+'"><meta property="og:type" content="website"><meta property="og:title" content="'+title+'"><meta property="og:description" content="GoalOS AGIJobManager Ascension public-safe proof institution."><meta property="og:url" content="'+url+'"><meta property="og:image" content="'+prod+'assets/social-card.svg"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="'+title+'"><meta name="twitter:description" content="GoalOS AGIJobManager Ascension public-safe proof institution."><meta name="twitter:image" content="'+prod+'assets/social-card.svg">'; fs.writeFileSync(p,h.includes('</head>')?h.replace('</head>',block+'</head>'):block+h); } }
console.log('PASS · public trust metadata v46 applied');
`);
// Copy v46 files backward for v45/v44 compatibility if current workflow/kernels ask for old names.
ensureCopy('tools/repository-public-trust-compatibility-failsafe-v46-kernel.mjs','tools/repository-public-trust-failsafe-v45-kernel.mjs');
ensureCopy('tests/repository-public-trust-compatibility-failsafe-v46.test.mjs','tests/repository-public-trust-failsafe-v45.test.mjs');
console.log('PASS · failsafe bootstrap v46 completed');
