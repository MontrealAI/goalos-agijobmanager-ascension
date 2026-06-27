const ethers = window.ethers;
if (!ethers) { throw new Error('Local ethers library not loaded.'); }

const AGI_JOB_MANAGER = '0xB3AAeb69b630f0299791679c063d68d6687481d1';
const AGIALPHA = '0xa61a3b3a130a9c20768eebf97e21515a6046a1fa';
const MAINNET = '0x1';
const DECIMALS = 18;

const ERC20_ABI = [
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
  'function balanceOf(address) view returns (uint256)',
  'function allowance(address,address) view returns (uint256)',
  'function approve(address,uint256) returns (bool)'
];
const CREATE_JOB_ABI = ['function createJob(string jobSpecURI,uint256 payout,uint256 duration,string details) returns (uint256)'];
const DEFAULT_ACTIONS = [
  'applyForJob(uint256 jobId)',
  'submitCompletion(uint256 jobId,string completionURI)',
  'approveCompletion(uint256 jobId)',
  'disapproveCompletion(uint256 jobId)',
  'openDispute(uint256 jobId,string reasonURI)',
  'finalizeJob(uint256 jobId)',
  'expireJob(uint256 jobId)',
  'cancelJob(uint256 jobId)'
];

let browserProvider, signer, account, token, manager;
const $ = (id)=>document.getElementById(id);
const log = (m)=>{ const el=$('txLog'); el.textContent += `[${new Date().toISOString()}] ${m}\n`; el.scrollTop = el.scrollHeight; };
const set = (id,v)=>{ const el=$(id); if(el) el.textContent=v; };
const mustHaveWallet = ()=>{ if(!window.ethereum) throw new Error('No injected EIP-1193 wallet found. Install or unlock a compatible wallet.'); };
const typed = (phrase)=> $('typedConfirm').value.trim() === phrase;
const termsAccepted = ()=> $('termsBox').checked === true;
const parseAmount = (value)=> ethers.parseUnits(String(value || '0'), DECIMALS);

function guardBase(){
  if(!termsAccepted()) throw new Error('Read and accept the expert terms first.');
  if(!account) throw new Error('Connect wallet first.');
}
function guardApproval(){ guardBase(); if(!typed('APPROVE EXACT AGIALPHA')) throw new Error('Type APPROVE EXACT AGIALPHA before approval.'); }
function guardBroadcast(){ guardBase(); if(!typed('BROADCAST MAINNET TRANSACTION')) throw new Error('Type BROADCAST MAINNET TRANSACTION before a Mainnet broadcast.'); }

async function refreshStatus(){
  if(!window.ethereum) { set('walletStatus','No wallet detected'); return; }
  const chain = await window.ethereum.request({method:'eth_chainId'}).catch(()=>null);
  set('chainStatus', chain === MAINNET ? 'Ethereum Mainnet' : (chain || 'unknown'));
  if(account) set('walletStatus', account.slice(0,6)+'…'+account.slice(-4));
  if(token && account){
    const [bal, allow] = await Promise.all([token.balanceOf(account), token.allowance(account, AGI_JOB_MANAGER)]);
    set('balanceStatus', ethers.formatUnits(bal, DECIMALS)+' AGIALPHA');
    set('allowanceStatus', ethers.formatUnits(allow, DECIMALS)+' AGIALPHA');
  }
}

async function connectWallet(){
  mustHaveWallet();
  if(!termsAccepted()) throw new Error('Accept the terms before connecting.');
  await window.ethereum.request({method:'eth_requestAccounts'});
  browserProvider = new ethers.BrowserProvider(window.ethereum);
  signer = await browserProvider.getSigner();
  account = await signer.getAddress();
  token = new ethers.Contract(AGIALPHA, ERC20_ABI, signer);
  manager = new ethers.Contract(AGI_JOB_MANAGER, CREATE_JOB_ABI, signer);
  log('Wallet connected: '+account);
  await refreshStatus();
}

async function switchToMainnet(){
  mustHaveWallet();
  if(!typed('SWITCH TO MAINNET')) throw new Error('Type SWITCH TO MAINNET before requesting a network switch.');
  await window.ethereum.request({method:'wallet_switchEthereumChain', params:[{chainId:MAINNET}]});
  log('Requested Ethereum Mainnet switch.');
  await refreshStatus();
}

async function verifyLiveFacts(){
  mustHaveWallet();
  const p = browserProvider || new ethers.BrowserProvider(window.ethereum);
  const [chain, managerCode, tokenCode] = await Promise.all([p.send('eth_chainId',[]), p.getCode(AGI_JOB_MANAGER), p.getCode(AGIALPHA)]);
  const readToken = new ethers.Contract(AGIALPHA, ERC20_ABI, p);
  const [symbol, decimals] = await Promise.all([readToken.symbol(), readToken.decimals()]);
  const report = { chain, managerCodePresent: managerCode !== '0x', tokenCodePresent: tokenCode !== '0x', symbol, decimals: Number(decimals), addresses:{AGI_JOB_MANAGER, AGIALPHA} };
  $('factReport').textContent = JSON.stringify(report,null,2);
  log('Live factual verification completed.');
}

async function approveExact(){
  guardApproval();
  const amount = parseAmount($('approveAmount').value);
  if(amount <= 0n) throw new Error('Approval amount must be positive.');
  const current = await token.allowance(account, AGI_JOB_MANAGER);
  if(current >= amount){ log('Current allowance already covers requested exact amount.'); return; }
  const gas = await token.approve.estimateGas(AGI_JOB_MANAGER, amount);
  log(`Approval gas estimate: ${gas.toString()}. Sending exact approval only.`);
  const tx = await token.approve(AGI_JOB_MANAGER, amount);
  log('Approval broadcast: '+tx.hash);
  const receipt = await tx.wait();
  log('Approval confirmed in block '+receipt.blockNumber);
  await refreshStatus();
}

async function createJob(){
  guardBroadcast();
  const uri = $('jobSpecURI').value.trim();
  const details = $('jobDetails').value.trim();
  const payout = parseAmount($('jobPayout').value);
  const duration = BigInt($('jobDuration').value || '0');
  if(!/^ipfs:\/\/|^https:\/\//.test(uri)) throw new Error('Use an ipfs:// or https:// Job Spec URI.');
  if(!details) throw new Error('Details are required.');
  if(payout <= 0n || duration <= 0n) throw new Error('Payout and duration must be positive.');
  const allowance = await token.allowance(account, AGI_JOB_MANAGER);
  if(allowance < payout) throw new Error('Allowance is below payout. Approve the exact payout first.');
  try { await manager.createJob.staticCall(uri, payout, duration, details); log('createJob eth_call preflight passed.'); } catch(e){ log('createJob preflight reverted: '+(e.shortMessage || e.message)); throw e; }
  const gas = await manager.createJob.estimateGas(uri, payout, duration, details);
  log('createJob gas estimate: '+gas.toString());
  const tx = await manager.createJob(uri, payout, duration, details);
  log('createJob broadcast: '+tx.hash);
  const receipt = await tx.wait();
  log('createJob confirmed in block '+receipt.blockNumber);
}

function argsFromText(){
  const raw = $('genericArgs').value.trim();
  if(!raw) return [];
  const parsed = JSON.parse(raw);
  if(!Array.isArray(parsed)) throw new Error('Arguments must be a JSON array.');
  return parsed;
}
async function genericAction(){
  guardBroadcast();
  const sig = $('actionSignature').value.trim();
  if(!sig || !sig.includes('(')) throw new Error('Select or enter a function signature.');
  const iface = new ethers.Interface([`function ${sig}`]);
  const fn = sig.slice(0, sig.indexOf('('));
  const args = argsFromText();
  const c = new ethers.Contract(AGI_JOB_MANAGER, [`function ${sig}`], signer);
  try { await c[fn].staticCall(...args); log(`${fn} eth_call preflight passed.`); } catch(e){ log(`${fn} preflight reverted: `+(e.shortMessage || e.message)); throw e; }
  const gas = await c[fn].estimateGas(...args);
  log(`${fn} gas estimate: ${gas.toString()}`);
  const tx = await c[fn](...args);
  log(`${fn} broadcast: ${tx.hash}`);
  const receipt = await tx.wait();
  log(`${fn} confirmed in block ${receipt.blockNumber}`);
}
function loadDefaults(){
  const sel=$('actionSignature');
  DEFAULT_ACTIONS.forEach(sig=>{ const opt=document.createElement('option'); opt.value=sig; opt.textContent=sig; sel.appendChild(opt); });
  set('managerAddress', AGI_JOB_MANAGER); set('tokenAddress', AGIALPHA);
  log('Expert console loaded. No wallet request has been made.');
}
window.GoalOSMainnetConsole = {connectWallet, switchToMainnet, verifyLiveFacts, approveExact, createJob, genericAction, refreshStatus};
window.addEventListener('DOMContentLoaded', loadDefaults);
