import fs from 'node:fs';
import path from 'node:path';
const legacyRefs = [
  '<link rel="stylesheet" href="assets/navigation-v37.css">',
  '<script src="assets/navigation-v37.js"></script>',
  '<link rel="stylesheet" href="assets/navigation-atlas.css">',
  '<script src="assets/navigation-atlas.js"></script>',
  '<link rel="stylesheet" href="assets/navigation-v38.css">',
  '<script src="assets/navigation-v38.js"></script>',
  '<link rel="stylesheet" href="assets/site-shell.css">',
  '<script src="assets/site-shell-data.js"></script>',
  '<script src="assets/site-shell.js"></script>',
  '<script src="assets/site-guide.js"></script>',
  '<link rel="stylesheet" href="assets/site-command.css">',
  '<script src="assets/site-command.js"></script>',
  '<link rel="stylesheet" href="assets/site-navigation.css">',
  '<script src="assets/site-navigation.js"></script>',
  '<link rel="stylesheet" href="assets/site-nav.css">',
  '<script src="assets/site-nav.js"></script>'
];
let touched = 0;
function sanitize(file){
  let html=fs.readFileSync(file,'utf8');
  const before=html;
  for(const ref of legacyRefs) html=html.split(ref).join('');
  html=html.split('<link rel="stylesheet" href="assets/site-command-v39.css">').join('');
  html=html.split('<script src="assets/site-command-v39.js"></script>').join('');
  if(html.includes('</head>')) html=html.replace('</head>','<link rel="stylesheet" href="assets/site-command-v39.css"></head>');
  if(html.includes('</body>')) html=html.replace('</body>','<script src="assets/site-command-v39.js"></script></body>');
  if(html!==before){fs.writeFileSync(file,html);touched++;}
}
function walk(dir){
  if(!fs.existsSync(dir)) return;
  for(const ent of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,ent.name);
    if(ent.isDirectory()) walk(p);
    if(ent.isFile() && ent.name.endsWith('.html')) sanitize(p);
  }
}
walk('site');
console.log(`Navigation source sanitizer PASS · sanitized ${touched} html files`);
