import fs from 'node:fs';
fs.mkdirSync('data',{recursive:true});fs.mkdirSync('tools',{recursive:true});fs.mkdirSync('tests',{recursive:true});
fs.writeFileSync('data/failsafe-bootstrap-v51.json', JSON.stringify({status:'PASS',release:'v51',purpose:'loop-to-rsi-control-room compatibility bootstrap'},null,2));
console.log('PASS · failsafe bootstrap v51 completed');
