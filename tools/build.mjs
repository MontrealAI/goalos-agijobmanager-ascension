import {cpSync,rmSync,mkdirSync,writeFileSync,existsSync} from 'node:fs';
rmSync('dist',{recursive:true,force:true}); mkdirSync('dist',{recursive:true}); cpSync('site','dist',{recursive:true});
if(!existsSync('dist/index.html')) throw new Error('dist/index.html missing');
writeFileSync('dist/PRODUCTION_URL.txt','https://montrealai.github.io/goalos-agijobmanager-ascension/\n');
