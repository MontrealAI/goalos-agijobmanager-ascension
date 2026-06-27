import fs from 'node:fs';
if (process.env.SKIP_LIVE_RPC === '1') {
  const report = {status:'SKIPPED', reason:'SKIP_LIVE_RPC=1', scope:'live RPC factual check not executed'};
  fs.writeFileSync('FACTUAL_CORRECTNESS_REPORT.json', JSON.stringify(report,null,2));
  console.log('Factual correctness SKIPPED by environment');
  process.exit(0);
}
const AGI_JOB_MANAGER='0xB3AAeb69b630f0299791679c063d68d6687481d1';
const AGIALPHA='0xa61a3b3a130a9c20768eebf97e21515a6046a1fa';
const endpoints=['https://ethereum.publicnode.com','https://ethereum-rpc.publicnode.com','https://cloudflare-eth.com'];
async function rpc(url,method,params=[]){ const r=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})}); if(!r.ok) throw new Error(`${url} HTTP ${r.status}`); const j=await r.json(); if(j.error) throw new Error(`${url} ${j.error.message}`); return j.result; }
async function callAny(method,params){ const errors=[]; for(const url of endpoints){ try{ const result=await rpc(url,method,params); return {url,result}; }catch(e){ errors.push(e.message); } } throw new Error(errors.join(' | ')); }
function decodeString(hex){ if(!hex || hex==='0x') return ''; const s=hex.slice(2); const len=parseInt(s.slice(64,128),16); let out=''; for(let i=0;i<len;i++){ const byte=parseInt(s.slice(128+i*2,130+i*2),16); if(byte) out+=String.fromCharCode(byte); } return out; }
const chain=await callAny('eth_chainId',[]);
if(chain.result!=='0x1') throw new Error('Expected chain 0x1, got '+chain.result);
const managerCode=await callAny('eth_getCode',[AGI_JOB_MANAGER,'latest']);
const tokenCode=await callAny('eth_getCode',[AGIALPHA,'latest']);
if(!managerCode.result || managerCode.result==='0x') throw new Error('AGIJobManager has no code');
if(!tokenCode.result || tokenCode.result==='0x') throw new Error('AGIALPHA has no code');
const symbolRaw=await callAny('eth_call',[{to:AGIALPHA,data:'0x95d89b41'},'latest']);
const decimalsRaw=await callAny('eth_call',[{to:AGIALPHA,data:'0x313ce567'},'latest']);
const report={status:'PASS',chainId:1,managerCodeBytes:(managerCode.result.length-2)/2,tokenCodeBytes:(tokenCode.result.length-2)/2,tokenSymbol:decodeString(symbolRaw.result),tokenDecimals:parseInt(decimalsRaw.result,16),rpcEndpoint:chain.url,addresses:{AGIJobManager:AGI_JOB_MANAGER,AGIALPHA}};
if(report.tokenDecimals!==18) throw new Error('Expected 18 decimals');
fs.writeFileSync('FACTUAL_CORRECTNESS_REPORT.json', JSON.stringify(report,null,2));
console.log('Factual correctness PASS', JSON.stringify(report));
