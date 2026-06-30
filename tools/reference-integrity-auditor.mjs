import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd();
const read=f=>fs.readFileSync(f,'utf8');
function walk(dir, out=[]){ if(!fs.existsSync(dir)) return out; for(const e of fs.readdirSync(dir,{withFileTypes:true})){ const p=path.join(dir,e.name); if(e.isDirectory()) walk(p,out); else out.push(p);} return out; }
const sources=[];
for(const f of walk('.github/workflows').filter(f=>/\.ya?ml$/.test(f))) sources.push([f,read(f)]);
const pkg=JSON.parse(read('package.json')); for(const [k,v] of Object.entries(pkg.scripts||{})) sources.push([`package.json#scripts.${k}`,String(v)]);
for(const f of ['tools/run-all-tests.mjs','tools/run-existing-kernels.mjs','tools/run-documentation-tests.mjs']) if(fs.existsSync(f)) sources.push([f,read(f)]);
const patterns=[/\b(?:node|python3?|bash|sh)\s+((?:tools|tests|scripts|site|data|schemas|docs)\/[A-Za-z0-9_./@%+=:-]+\.(?:mjs|js|py|sh|json|html|md|ya?ml))/g,/\btest\s+-f\s+((?:tools|tests|scripts|site|data|schemas|docs|dist)\/[A-Za-z0-9_./@%+=:-]+)/g];
const optional=/optional|if \[ ! -f|fallback|compatibility alias/i;
const missing=[]; const warns=[]; const refs=[];
for(const [src,text] of sources){ const lines=text.split(/\r?\n/); lines.forEach((line,i)=>{ for(const re of patterns){ re.lastIndex=0; let m; while((m=re.exec(line))){ const file=m[1].replace(/["'`),;]+$/g,''); if(file.includes('$')||file.includes('*')) continue; refs.push([src,i+1,file]); if(!fs.existsSync(path.resolve(root,file))){ (optional.test(line)?warns:missing).push(`${src}:${i+1} -> ${file}`); } } } }); }
for(const w of warns) console.warn(`WARN · optional missing reference documented: ${w}`);
if(missing.length){ console.error('FAIL · missing local command/file references:'); missing.forEach(m=>console.error(` - ${m}`)); process.exit(1); }
console.log(`PASS · reference integrity auditor verified ${refs.length} local references across ${sources.length} sources`);
