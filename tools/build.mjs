import {cpSync,rmSync,mkdirSync,writeFileSync} from 'node:fs';
rmSync('dist',{recursive:true,force:true}); mkdirSync('dist',{recursive:true}); cpSync('site','dist',{recursive:true});
writeFileSync('dist/PRODUCTION_URL.txt','https://montrealai.github.io/goalos-agijobmanager-ascension/\n');
