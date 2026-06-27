(() => {
  'use strict';
  const $ = (s, r=document) => r.querySelector(s);
  const CANON = {
    manager: '0xB3AAeb69b630f0299791679c063d68d6687481d1',
    token: '0xa61a3b3a130a9c20768eebf97e21515a6046a1fa',
    chainId: 1,
    chainHex: '0x1',
    productionUrl: 'https://montrealai.github.io/goalos-agijobmanager-ascension/',
    legacyConsole: 'https://montrealai.github.io/agijobmanagerv0.html'
  };
  const MANAGER_ABI = [
    'function createJob(string _jobSpecURI,uint256 _payout,uint256 _duration,string _details)',
    'function applyForJob(uint256 _jobId,string subdomain,bytes32[] proof)',
    'function requestJobCompletion(uint256 _jobId,string _jobCompletionURI)',
    'function validateJob(uint256 _jobId,string subdomain,bytes32[] proof)',
    'function disapproveJob(uint256 _jobId,string subdomain,bytes32[] proof)',
    'function disputeJob(uint256 _jobId)',
    'function finalizeJob(uint256 _jobId)',
    'function expireJob(uint256 _jobId)',
    'function cancelJob(uint256 _jobId)',
    'function resolveDisputeWithCode(uint256 _jobId,uint8 resolutionCode,string reason)',
    'function lockJobENS(uint256 jobId,bool burnFuses)',
    'function nextJobId() view returns (uint256)',
    'function requiredValidatorApprovals() view returns (uint256)',
    'function requiredValidatorDisapprovals() view returns (uint256)',
    'function voteQuorum() view returns (uint256)',
    'function completionReviewPeriod() view returns (uint256)',
    'function challengePeriodAfterApproval() view returns (uint256)',
    'function settlementPaused() view returns (bool)',
    'function paused() view returns (bool)',
    'function getJobCore(uint256 jobId) view returns (address employer,address assignedAgent,uint256 payout,uint256 duration,uint256 assignedAt,bool completed,bool disputed,bool expired,uint8 agentPayoutPct)',
    'function getJobValidation(uint256 jobId) view returns (bool completionRequested,uint256 validatorApprovals,uint256 validatorDisapprovals,uint256 completionRequestedAt,uint256 disputedAt)'
  ];
  const ERC20_ABI = [
    'function name() view returns (string)', 'function symbol() view returns (string)', 'function decimals() view returns (uint8)',
    'function balanceOf(address) view returns (uint256)', 'function allowance(address,address) view returns (uint256)',
    'function approve(address spender,uint256 amount) returns (bool)'
  ];
  const ACTIONS = {
    createJob: {label:'Create Job', method:'createJob', approval:'payout', fields:[['jobSpecURI','string','ipfs://...'],['payout','agialpha','1000'],['duration','uint256 seconds','259200'],['details','string','Short on-chain details']]},
    applyForJob: {label:'Apply For Job', method:'applyForJob', approval:'bond', fields:[['jobId','uint256','0'],['subdomain','string','alice.agent.agi.eth or alice.alpha.agent.agi.eth'],['proof','bytes32[]','[]']]},
    requestJobCompletion: {label:'Request Job Completion', method:'requestJobCompletion', fields:[['jobId','uint256','0'],['jobCompletionURI','string','ipfs://...']]},
    validateJob: {label:'Validate Job', method:'validateJob', approval:'bond', fields:[['jobId','uint256','0'],['subdomain','string','validator.club.agi.eth'],['proof','bytes32[]','[]']]},
    disapproveJob: {label:'Disapprove Job', method:'disapproveJob', approval:'bond', fields:[['jobId','uint256','0'],['subdomain','string','validator.club.agi.eth'],['proof','bytes32[]','[]']]},
    disputeJob: {label:'Dispute Job', method:'disputeJob', approval:'bond', fields:[['jobId','uint256','0']]},
    finalizeJob: {label:'Finalize Job', method:'finalizeJob', fields:[['jobId','uint256','0']]},
    expireJob: {label:'Expire Job', method:'expireJob', fields:[['jobId','uint256','0']]},
    cancelJob: {label:'Cancel Job', method:'cancelJob', fields:[['jobId','uint256','0']]},
    resolveDisputeWithCode: {label:'Resolve Dispute With Code · moderator only', method:'resolveDisputeWithCode', fields:[['jobId','uint256','0'],['resolutionCode','uint8 0/1/2','1'],['reason','string','Evidence reviewed; agent wins.']]},
    lockJobENS: {label:'Lock Job ENS', method:'lockJobENS', fields:[['jobId','uint256','0'],['burnFuses','bool','false']]}
  };
  let provider, signer, manager, token, account, built, authority = false, audit = {events:[]};
  function log(msg, level='info') { const line = `[${new Date().toISOString()}] ${msg}`; audit.events.push({at:new Date().toISOString(),level,msg}); const el=$('#sessionLog'); if(el) el.textContent = (line+'\n'+el.textContent).slice(0,5000); }
  function alog(msg) { const el=$('#auditLog'); if(el) el.textContent = `[${new Date().toISOString()}] ${msg}\n` + el.textContent; }
  function short(a){return a ? a.slice(0,6)+'…'+a.slice(-4) : '—'}
  function ensureEthers(){ if(!window.ethers) throw new Error('Vendored ethers.js is not loaded. Run the publisher workflow so site/vendor/ethers.umd.min.js is generated.'); }
  async function connectWallet(){ ensureEthers(); if(!window.ethereum) throw new Error('No EIP-1193 wallet detected.'); await window.ethereum.request({ method: 'eth_requestAccounts' }); provider = new ethers.BrowserProvider(window.ethereum); signer = await provider.getSigner(); account = await signer.getAddress(); manager = new ethers.Contract(CANON.manager, MANAGER_ABI, signer); token = new ethers.Contract(CANON.token, ERC20_ABI, signer); $('#walletShort').textContent = short(account); $('#sessionStatus').textContent = 'Connected'; log('Wallet connected by explicit user action: '+account); await refreshChain(); }
  async function switchMainnet(){ if(!window.ethereum) throw new Error('No wallet detected.'); await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: CANON.chainHex }] }); log('Wallet switchEthereumChain requested by user.'); await connectWallet(); }
  async function refreshChain(){ if(!provider) return; const net=await provider.getNetwork(); $('#chainId').textContent = String(net.chainId); if(Number(net.chainId)!==CANON.chainId) $('#sessionStatus').textContent='Wrong network'; }
  function parseProof(v){ try{ const arr=JSON.parse(v||'[]'); if(!Array.isArray(arr)) throw new Error('not array'); return arr; } catch(e){ throw new Error('Proof must be a JSON array of bytes32 values.'); } }
  function parseBool(v){ return String(v).toLowerCase()==='true' || String(v)==='1' || String(v).toLowerCase()==='yes'; }
  function parseArg(type, raw){ if(type.startsWith('uint')) return BigInt(raw||'0'); if(type==='agialpha') return ethers.parseUnits(raw||'0',18); if(type==='bytes32[]') return parseProof(raw); if(type==='bool') return parseBool(raw); return raw||''; }
  function renderActions(){ const sel=$('#actionSelect'); if(!sel) return; sel.innerHTML = Object.entries(ACTIONS).map(([k,v])=>`<option value="${k}">${v.label}</option>`).join(''); renderFields(); }
  function renderFields(){ const action=ACTIONS[$('#actionSelect').value]; $('#actionFields').innerHTML = action.fields.map(([name,type,ph]) => `<div class="field"><label>${name} · ${type}</label>${type==='string'&&name.toLowerCase().includes('uri')?`<textarea data-name="${name}" data-type="${type}" placeholder="${ph}"></textarea>`:`<input data-name="${name}" data-type="${type}" placeholder="${ph}">`}</div>`).join(''); }
  function collect(){ const key=$('#actionSelect').value; const action=ACTIONS[key]; const args=[...document.querySelectorAll('#actionFields [data-name]')].map(el=>parseArg(el.dataset.type, el.value)); return {key, action, args}; }
  async function buildTx(){ ensureEthers(); const {action,args,key}=collect(); const iface=new ethers.Interface(MANAGER_ABI); const data=iface.encodeFunctionData(action.method,args); built={key,method:action.method,args,data,to:CANON.manager,value:'0x0',approvalAmount:$('#approvalAmount').value||'',approvalRequired:!!action.approval,createdAt:new Date().toISOString()}; $('#txPreview').textContent=JSON.stringify(publicTxView(built),null,2); $('#txState').textContent='Built'; log('Built transaction intent for '+action.method); return built; }
  function publicTxView(tx){ return {...tx,args:tx.args.map(v=>typeof v==='bigint'?v.toString():v),manager:CANON.manager,token:CANON.token,chainId:CANON.chainId,typedConfirmation:'AUTHORIZE MAINNET'}; }
  async function verifyIdentity(){ await connectIfNeeded(); const code=await provider.getCode(CANON.manager); const tokenCode=await provider.getCode(CANON.token); const [sym,dec]=await Promise.all([token.symbol().catch(()=>'?'), token.decimals().catch(()=>'?')]); const ok=code && code!=='0x' && tokenCode && tokenCode!=='0x'; audit.identity={managerCodeBytes:(code.length-2)/2,tokenCodeBytes:(tokenCode.length-2)/2,symbol:String(sym),decimals:String(dec),chainId:Number((await provider.getNetwork()).chainId),ok}; alog('Live identity check: '+(ok?'PASS':'FAIL')+' · token '+sym+' decimals '+dec); return audit.identity; }
  async function connectIfNeeded(){ if(!signer) await connectWallet(); await refreshChain(); const net=await provider.getNetwork(); if(Number(net.chainId)!==CANON.chainId) throw new Error('Ethereum Mainnet required. Click Switch Mainnet first.'); }
  async function simulateTx(){ await connectIfNeeded(); if(!built) await buildTx(); await verifyIdentity(); const fn = manager[built.method]; const args = built.args; let gas, sim='not-run'; try { await fn.staticCall(...args); sim='PASS'; } catch(e){ sim='REVERT: '+(e.shortMessage||e.reason||e.message).slice(0,220); }
    try { gas = (await fn.estimateGas(...args)).toString(); } catch(e){ gas = 'UNAVAILABLE: '+(e.shortMessage||e.reason||e.message).slice(0,180); }
    built.simulation={sim,gas,at:new Date().toISOString()}; $('#txPreview').textContent=JSON.stringify(publicTxView(built),null,2); $('#txState').textContent=String(sim).startsWith('PASS')?'Simulation pass':'Review revert'; alog('Simulation '+sim+' · gas '+gas); return built.simulation; }
  async function ensureAllowance(){ const amount=$('#approvalAmount').value; if(!amount) return {skipped:true,reason:'No exact approval amount requested'}; const wei=ethers.parseUnits(amount,18); const allowance=await token.allowance(account,CANON.manager); if(allowance>=wei) return {skipped:true,reason:'Allowance already sufficient',allowance:allowance.toString()}; if(!confirm(`Approve exactly ${amount} AGIALPHA to AGIJobManager? This opens a wallet transaction.`)) throw new Error('Approval cancelled.'); const tx=await token.approve(CANON.manager, wei); alog('Approval submitted: '+tx.hash); const receipt=await tx.wait(); alog('Approval confirmed in block '+receipt.blockNumber); return {skipped:false,hash:tx.hash,blockNumber:receipt.blockNumber,amountWei:wei.toString()}; }
  async function sendTx(){ await connectIfNeeded(); if(!authority) throw new Error('Local production authority session is not active.'); if(!$('#termsAccepted').checked) throw new Error('Terms/risk acknowledgement required.'); if(($('#broadcastPhrase').value||'')!=='AUTHORIZE MAINNET') throw new Error('Type AUTHORIZE MAINNET before broadcast.'); if(!built) await buildTx(); await simulateTx(); if(!String(built.simulation.sim).startsWith('PASS') && !confirm('Simulation did not pass. Continue anyway?')) throw new Error('Broadcast cancelled after simulation revert.'); const approval = await ensureAllowance(); const fn=manager[built.method]; const tx = await fn(...built.args); alog('Mainnet transaction submitted: '+tx.hash); const receipt = await tx.wait(); built.broadcast={hash:tx.hash,blockNumber:receipt.blockNumber,status:receipt.status,approval}; $('#txPreview').textContent=JSON.stringify(publicTxView(built),null,2); $('#txState').textContent='Broadcast complete'; alog('Mainnet transaction confirmed in block '+receipt.blockNumber); }
  function activateAuthority(){ if(!$('#termsAccepted').checked) throw new Error('Risk and terms acknowledgement required.'); if(($('#authorityPhrase').value||'')!=='ACTIVATE PRODUCTION AUTHORITY') throw new Error('Type ACTIVATE PRODUCTION AUTHORITY exactly.'); authority=true; $('#sessionStatus').textContent='Authority active'; log('Local production authority session activated by typed human confirmation.'); }
  function evidenceReport(){ return {schema:'goalos/agijobmanager/operator-parity-evidence/v1',generatedAt:new Date().toISOString(),productionUrl:CANON.productionUrl,legacyConsole:CANON.legacyConsole,canonical:{agiJobManager:CANON.manager,agialpha:CANON.token,chainId:CANON.chainId},session:{account:account||null,authorityActive:authority},latestTransaction:built?publicTxView(built):null,audit,boundaries:['No auto-connect','No unlimited approvals','No private keys','No automatic network switch','No unsigned broadcast','Wallet decides final authorization','Automated checks are not a law-firm or audit-firm attestation']}; }
  function download(name,obj){ const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([JSON.stringify(obj,null,2)],{type:'application/json'})); a.download=name; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),500); }
  function bind(){ renderActions(); $('#actionSelect')?.addEventListener('change',renderFields); $('#connectWallet')?.addEventListener('click',()=>connectWallet().catch(e=>alert(e.message))); $('#switchMainnet')?.addEventListener('click',()=>switchMainnet().catch(e=>alert(e.message))); $('#verifyIdentity')?.addEventListener('click',()=>verifyIdentity().catch(e=>alert(e.message))); $('#activateAuthority')?.addEventListener('click',()=>{try{activateAuthority()}catch(e){alert(e.message)}}); $('#buildTx')?.addEventListener('click',()=>buildTx().catch(e=>alert(e.message))); $('#simulateTx')?.addEventListener('click',()=>simulateTx().catch(e=>alert(e.message))); $('#sendTx')?.addEventListener('click',()=>sendTx().catch(e=>alert(e.message))); $('#downloadAudit')?.addEventListener('click',()=>download('agijobmanager-operator-parity-evidence.json',evidenceReport())); $('#copyAudit')?.addEventListener('click',()=>navigator.clipboard?.writeText(JSON.stringify(evidenceReport(),null,2))); if(window.ethereum){ window.ethereum.on?.('accountsChanged',()=>{account=null;connectWallet().catch(()=>{})}); window.ethereum.on?.('chainChanged',()=>location.reload()); }}
  document.addEventListener('DOMContentLoaded',bind);
})();
