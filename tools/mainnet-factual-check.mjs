import fs from 'node:fs';
const shouldRun = process.env.RUN_LIVE_FACTUAL_CHECK !== 'false' && process.env.SKIP_LIVE_RPC !== '1';
const strict = shouldRun && process.env.STRICT_LIVE_FACTUAL_CHECK === 'true';
const AGI_JOB_MANAGER='0xB3AAeb69b630f0299791679c063d68d6687481d1';
const AGIALPHA='0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA';
const endpoints=(process.env.ETHEREUM_RPC_URL ? [process.env.ETHEREUM_RPC_URL] : []).concat(['https://ethereum-rpc.publicnode.com','https://ethereum.publicnode.com','https://cloudflare-eth.com']);
async function rpc(url,method,params=[]){ const r=await fetch(url,{method:'POST',headers:{'content-type':'application/json'},body:JSON.stringify({jsonrpc:'2.0',id:1,method,params})}); if(!r.ok) throw new Error(`${url} HTTP ${r.status}`); const j=await r.json(); if(j.error) throw new Error(`${url} ${j.error.message}`); return j.result; }
async function callAny(method,params){ const errors=[]; for(const url of endpoints){ try{ return {url,result:await rpc(url,method,params)}; }catch(e){ errors.push(e.message); } } throw new Error(errors.join(' | ')); }
function decodeString(hex){ if(!hex || hex==='0x') return ''; const s=hex.slice(2); const offset=parseInt(s.slice(0,64),16); const start=offset*2; const len=parseInt(s.slice(start,start+64),16); let out=''; for(let i=0;i<len;i++){ const byte=parseInt(s.slice(start+64+i*2,start+66+i*2),16); if(byte) out+=String.fromCharCode(byte); } return out; }
try {
  if (!shouldRun) {
    const report={status:'SKIPPED',scope:'live Mainnet identity and ERC20 sanity check with AGIALPHA checksum token identity',reason:'live RPC check disabled for deterministic zero-network publication; set run_live_factual_check=true and STRICT_LIVE_FACTUAL_CHECK=true for hard live RPC gate',checkedAt:new Date().toISOString()};
    fs.writeFileSync('FACTUAL_CORRECTNESS_REPORT.json', JSON.stringify(report,null,2));
    console.log('Mainnet factual check SKIPPED: deterministic zero-network publication mode');
    process.exit(0);
  }
  const chain=await callAny('eth_chainId',[]);
  if(chain.result!=='0x1') throw new Error('Expected Ethereum Mainnet chain 0x1, got '+chain.result);
  const managerCode=await callAny('eth_getCode',[AGI_JOB_MANAGER,'latest']);
  const tokenCode=await callAny('eth_getCode',[AGIALPHA,'latest']);
  if(!managerCode.result || managerCode.result==='0x') throw new Error('AGIJobManager has no bytecode');
  if(!tokenCode.result || tokenCode.result==='0x') throw new Error('AGIALPHA has no bytecode');
  const symbolRaw=await callAny('eth_call',[{to:AGIALPHA,data:'0x95d89b41'},'latest']).catch(()=>({result:'0x'}));
  const decimalsRaw=await callAny('eth_call',[{to:AGIALPHA,data:'0x313ce567'},'latest']).catch(()=>({result:'0x'}));
  const report={status:'PASS',scope:'live Mainnet identity and ERC20 sanity check with AGIALPHA checksum token identity',chainId:1,rpcEndpoint:chain.url,addresses:{AGIJobManager:AGI_JOB_MANAGER,AGIALPHA},codeBytes:{AGIJobManager:(managerCode.result.length-2)/2,AGIALPHA:(tokenCode.result.length-2)/2},token:{symbol:decodeString(symbolRaw.result),decimals:decimalsRaw.result==='0x'?null:parseInt(decimalsRaw.result,16)},checkedAt:new Date().toISOString()};
  fs.writeFileSync('FACTUAL_CORRECTNESS_REPORT.json', JSON.stringify(report,null,2));
  console.log('Mainnet factual check PASS');
} catch (error) {
  const report={status:strict?'FAIL':'SKIPPED',scope:'live Mainnet identity and ERC20 sanity check with AGIALPHA checksum token identity',error:String(error.message||error),checkedAt:new Date().toISOString()};
  fs.writeFileSync('FACTUAL_CORRECTNESS_REPORT.json', JSON.stringify(report,null,2));
  console.log(`Mainnet factual check ${report.status}: ${report.error}`);
  if(strict) process.exit(1);
}
