import fs from 'node:fs';
function ok(c,m){ if(!c){ console.error('FAIL · '+m); process.exit(1); } console.log('PASS · '+m); }
const page='site/loop-operating-room.html'; const data='data/loop-operating-room-demo.json';
ok(fs.existsSync(page),'Loop Operating Room page exists');
ok(fs.existsSync('site/assets/loop-operating-room.css'),'Loop CSS exists');
ok(fs.existsSync('site/assets/loop-operating-room.js'),'Loop JS exists');
ok(fs.existsSync(data),'Loop data contract exists');
ok(fs.existsSync('schemas/loop-operating-room.schema.json'),'Loop schema exists');
const h=fs.readFileSync(page,'utf8');
ok(/GoalOS Loop Operating Room/.test(h),'page has canonical title');
ok(/LoopReceipt/.test(h),'page exposes LoopReceipt output');
ok(/append-only trace/i.test(h),'page explains append-only trace');
ok(/No account|no form|no wallet|no network/i.test(h),'page displays public-safe boundary');
ok(!/fetch\(|XMLHttpRequest|sendBeacon|localStorage|sessionStorage|connect\s+wallet|approve\s+token/i.test(h+fs.readFileSync('site/assets/loop-operating-room.js','utf8')),'page avoids forbidden public primitives');
const j=JSON.parse(fs.readFileSync(data,'utf8'));
ok(j.publicSafe===true && j.browserLocal===true && j.noWallet===true && j.noNetwork===true,'data contract encodes public-safe posture');
ok(j.roles.length===5,'data contract has five separated roles');
ok(j.gates.includes('evidence') && j.gates.includes('chronicle'),'data contract includes evidence and Chronicle gates');
console.log('Loop Operating Room v47 test PASS');
