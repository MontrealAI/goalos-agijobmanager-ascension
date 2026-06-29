import fs from 'node:fs';
const required = [
  'site/mandate-epoch-clearinghouse.html',
  'site/assets/mandate-epoch.css',
  'site/assets/mandate-epoch.js',
  'data/mandate-epoch-clearinghouse-demo.json',
  'schemas/mandate-epoch-clearinghouse.schema.json',
  'docs/MANDATE_EPOCH_CLEARINGHOUSE_V26.md'
];
for (const f of required) if (!fs.existsSync(f)) throw new Error(`missing ${f}`);
const html = fs.readFileSync('site/mandate-epoch-clearinghouse.html','utf8');
const js = fs.readFileSync('site/assets/mandate-epoch.js','utf8');
const data = JSON.parse(fs.readFileSync('data/mandate-epoch-clearinghouse-demo.json','utf8'));
for (const phrase of ['MandateEpoch Clearinghouse','Many work receipts','One settlement','AGIJobManager','Chronicle','No user data wanted','No wallet','No network request','No transaction broadcast']) {
  if (!html.includes(phrase)) throw new Error(`missing page phrase ${phrase}`);
}
for (const marker of ['MandateEpochReceipt','receiptRoot','payoutRoot','archiveDeltaRoot','quarantineRoot','NettingHouse','Alpha-Factory']) {
  if (!js.includes(marker) && !html.includes(marker)) throw new Error(`missing implementation marker ${marker}`);
}
for (const forbidden of ['<form','localStorage','sessionStorage','fetch(','XMLHttpRequest','sendBeacon','ethereum.request']) {
  if ((html+js).includes(forbidden)) throw new Error(`forbidden primitive ${forbidden}`);
}
if (!data.safeByDefault.noWallet || !data.safeByDefault.noNetwork || !data.safeByDefault.noTransactionBroadcast) throw new Error('safeByDefault invariant failed');
console.log('MandateEpoch Clearinghouse v26 PASS');
