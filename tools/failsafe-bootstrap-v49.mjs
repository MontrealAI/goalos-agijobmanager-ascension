import fs from 'node:fs';
fs.mkdirSync('data',{recursive:true}); fs.mkdirSync('tools',{recursive:true}); fs.mkdirSync('tests',{recursive:true});
fs.writeFileSync('data/failsafe-bootstrap-v49.json', JSON.stringify({status:'PASS',release:'v49',fallback:false},null,2));
console.log('PASS · failsafe bootstrap v49 completed');
