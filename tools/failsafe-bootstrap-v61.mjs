import fs from 'node:fs';
const writeIfMissing=(file,body)=>{if(!fs.existsSync(file)){fs.mkdirSync(file.split('/').slice(0,-1).join('/'),{recursive:true});fs.writeFileSync(file,body)}};
writeIfMissing('tools/route-count-harmonizer-v61.mjs', `import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest.json','utf8'));
const pages=manifest.pages||manifest.routes||[];
const count=pages.length;
const compat=(text,offset)=>/historical|compatibility lineage|v43-compatible|historical v43/i.test(text.slice(Math.max(0,offset-220),offset+280));
for(const file of ['README.md','docs/DEMO_CATALOG.md']){if(!fs.existsSync(file))continue;let text=fs.readFileSync(file,'utf8');text=text.replace(/(\d+)\s+(canonical\s+)?public routes/g,(m,n,c,offset,src)=>compat(src,offset)?m:count+' '+(c||'')+'public routes').replace(/data\/canonical-route-manifest-v58\.json/g,'data/canonical-route-manifest.json');fs.writeFileSync(file,text);}
console.log('PASS · route count harmonized across active public docs: '+count+' routes');
`);
console.log('PASS · failsafe bootstrap v61 completed');
