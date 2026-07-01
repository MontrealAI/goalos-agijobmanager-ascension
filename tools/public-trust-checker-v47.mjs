import fs from 'node:fs';
import path from 'node:path';
function collect(dir){
  const out=[];
  if(!fs.existsSync(dir)) return out;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,entry.name);
    if(entry.isDirectory()) out.push(...collect(p));
    else if(entry.isFile() && entry.name.endsWith('.html')) out.push(p);
  }
  return out;
}
const dirs=['site'];
if(process.env.CHECK_DIST==='true') dirs.push('dist');
const failures=[];
for(const dir of dirs){
  for(const file of collect(dir)){
    const html=fs.readFileSync(file,'utf8');
    const compact=html.replace(/\s+/g,' ');
    const rel=file.replace(/\\/g,'/');
    const forbidden=[
      [/Loading…/i,'visible Loading ellipsis'],
      [/>\s*Loading\s*</i,'visible Loading text'],
      [/>\s*0 routes\s*</i,'zero-route fallback'],
      [/>\s*0 matching pages\s*</i,'zero matching pages fallback'],
      [/HomeStartDemosCoordination LabMission StudioProof CardsAssuranceLegal/i,'raw concatenated legacy nav'],
      [/menu over menu/i,'menu stacking marker']
    ];
    for(const [re,label] of forbidden) if(re.test(compact)) failures.push(`${rel}: ${label}`);
    const required=[
      [/<link\s+rel=["']canonical["']/i,'canonical URL'],
      [/<meta\s+property=["']og:title["']/i,'OpenGraph title'],
      [/<meta\s+property=["']og:description["']/i,'OpenGraph description'],
      [/<meta\s+property=["']og:image["']/i,'OpenGraph image'],
      [/<meta\s+name=["']twitter:card["']/i,'Twitter card']
    ];
    for(const [re,label] of required) if(!re.test(html)) failures.push(`${rel}: missing ${label}`);
    const navCount=(html.match(/<nav\b/gi)||[]).length;
    if(path.basename(file)==='index.html' && navCount>1) failures.push(`${rel}: more than one native nav (${navCount})`);
  }
}
if(failures.length){
  console.error('FAIL · public trust compatibility checks failed');
  for(const f of failures.slice(0,80)) console.error(' - '+f);
  if(failures.length>80) console.error(` - ... ${failures.length-80} more`);
  process.exit(1);
}
console.log('PASS · public trust compatibility checks passed for ' + dirs.join(', '));
