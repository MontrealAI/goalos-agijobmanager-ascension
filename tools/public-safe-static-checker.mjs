import fs from 'node:fs';
import path from 'node:path';
const fail=m=>{console.error('FAIL · public-safe static: '+m); process.exit(1)};
const files=[]; function walk(d){ for(const e of fs.readdirSync(d,{withFileTypes:true})){ const p=path.join(d,e.name); if(e.isDirectory()) walk(p); else if(/\.(html|js)$/i.test(p) && !/expert-(mainnet-)?console\.(html|js)$/.test(p) && !/mainnet-console\.js$/.test(p) && !/site\/vendor\//.test(p)) files.push(p); }} walk('site');
const forbidden=['ethereum.request','eth_requestAccounts','wallet_addEthereumChain','wallet_switchEthereumChain','eth_sendTransaction','navigator.sendBeacon','googletagmanager.com','google-analytics.com','gtag(','fbq(','connect.facebook.net','hotjar','mixpanel','segment.io','amplitude.com','plausible.io','document.cookie','localStorage.setItem','sessionStorage.setItem','<form'];
for (const f of files) { const t=fs.readFileSync(f,'utf8'); for (const x of forbidden) if (t.includes(x)) fail(`${f} contains forbidden primitive ${x}`); if (/fetch\(\s*[`'"]https?:/i.test(t) || /XMLHttpRequest/i.test(t)) fail(`${f} contains external network primitive`); }
console.log(`PASS · public-safe static checker scanned ${files.length} public files`);
