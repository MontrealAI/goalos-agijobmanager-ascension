import fs from 'node:fs';
const required = [
  'site/real-task-benchmark-bridge.html',
  'site/assets/benchmark-bridge.css',
  'site/assets/benchmark-bridge.js',
  'data/real-task-benchmark-bridge-demo.json',
  'schemas/real-task-benchmark-bridge.schema.json',
  'docs/REAL_TASK_BENCHMARK_BRIDGE_V27.md'
];
for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`missing ${file}`);
}
const html = fs.readFileSync('site/real-task-benchmark-bridge.html','utf8');
const js = fs.readFileSync('site/assets/benchmark-bridge.js','utf8');
const data = JSON.parse(fs.readFileSync('data/real-task-benchmark-bridge-demo.json','utf8'));
const must = ['BenchmarkEvidenceDocket','baseline ladder','Equal-budget','No user data wanted','no wallet','no network','no transaction'];
for (const marker of must) {
  if (!html.includes(marker) && !js.includes(marker) && !JSON.stringify(data).includes(marker)) throw new Error(`missing marker ${marker}`);
}
for (const forbidden of ['<form','localStorage','sessionStorage','XMLHttpRequest','fetch(','sendTransaction(','eth_sendTransaction','wallet_addEthereumChain','wallet_switchEthereumChain']) {
  if (html.includes(forbidden) || js.includes(forbidden)) throw new Error(`forbidden primitive ${forbidden}`);
}
if (!js.includes('d.y-=d.v')) throw new Error('ascendant particle motion missing');
for (const outcome of ['EXTERNAL_REPLAY_READY_FOR_REVIEW','LOCAL_BENCHMARK_DOCKET_READY','HOLD_FOR_MISSING_GATES','BASELINE_WINS_REJECT_PROMOTION']) {
  if (!js.includes(outcome) && !JSON.stringify(data).includes(outcome)) throw new Error(`missing outcome ${outcome}`);
}
if (data.baselineLadder.length < 7) throw new Error('baseline ladder incomplete');
if (data.promotionGates.length < 8) throw new Error('promotion gates incomplete');
console.log('Real-Task Benchmark Bridge v27 PASS');
