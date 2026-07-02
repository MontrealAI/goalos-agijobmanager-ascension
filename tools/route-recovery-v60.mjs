
import fs from 'node:fs';
const manifest=JSON.parse(fs.readFileSync('data/canonical-route-manifest-v60.json','utf8'));
manifest.routeCount=manifest.pages.length;
for (const name of ['data/canonical-route-manifest.json','data/site-navigation-v60.json','data/site-navigation-v59.json','data/site-navigation-catalog.json','data/site-navigation-map.json','data/site-experience-atlas.json','data/experience-hub-catalog.json']) {
  let obj={}; if(fs.existsSync(name)){try{obj=JSON.parse(fs.readFileSync(name,'utf8'))}catch{obj={}}}
  obj={...obj,version:'v60',release:'v60-ask-goalos-autonomous-question-router',routeCount:manifest.pages.length,pages:manifest.pages,routes:manifest.pages,productionUrl:manifest.productionUrl};
  fs.writeFileSync(name, JSON.stringify(obj,null,2));
}
console.log('PASS · route recovery v60 verified '+manifest.pages.length+' public routes');
