import fs from 'node:fs';
const must=(c,m)=>{if(!c){console.error('FAIL · '+m);process.exit(1)}console.log('PASS · '+m)};
must(fs.existsSync('dist/experience-concierge.html'),'dist Experience Concierge exists');
must(fs.existsSync('dist/site-navigation-v39.json'),'dist v39 navigation data exists');
const html=fs.readFileSync('dist/experience-concierge.html','utf8');
must(/Experience Concierge/.test(html),'dist Concierge page names itself');
must(/assets\/site-command-v39.js/.test(html),'dist page has global Site Command');
fs.writeFileSync('EXPERIENCE_CONCIERGE_V39_REPORT.json',JSON.stringify({status:'PASS',route:'experience-concierge.html'},null,2));
console.log('Experience Concierge v39 kernel PASS');
