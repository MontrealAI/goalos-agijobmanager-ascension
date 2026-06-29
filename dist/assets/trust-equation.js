
const DATA = {
  presets: [
    {id:'report-only', name:'Report-only output', lesson:'High output cannot substitute for proof.', values:{output:92,proof:15,validation:12,settlement:5,reuse:18,decisionImpact:70,actionability:52,cost:30,risk:62,latency:25,proofDebt:82}},
    {id:'agent-swarm', name:'Busy agent swarm', lesson:'Activity without gates creates proof debt.', values:{output:76,proof:34,validation:28,settlement:18,reuse:30,decisionImpact:68,actionability:61,cost:74,risk:71,latency:66,proofDebt:78}},
    {id:'evidence-room', name:'Evidence-room mission', lesson:'Evidence turns output into governable work.', values:{output:74,proof:82,validation:79,settlement:67,reuse:70,decisionImpact:78,actionability:80,cost:42,risk:32,latency:36,proofDebt:24}},
    {id:'goalos-ready', name:'GoalOS-ready governed state', lesson:'Proof-cleared output can become action and reusable capability.', values:{output:86,proof:91,validation:88,settlement:82,reuse:84,decisionImpact:88,actionability:86,cost:38,risk:25,latency:31,proofDebt:12}},
    {id:'missing-rollback', name:'Missing rollback boundary', lesson:'No rollback, no release.', values:{output:84,proof:74,validation:76,settlement:40,reuse:72,decisionImpact:90,actionability:77,cost:48,risk:78,latency:39,proofDebt:55}}
  ]
};
const sliders=['output','proof','validation','settlement','reuse','decisionImpact','actionability','cost','risk','latency','proofDebt'];
const state={...DATA.presets[3].values, preset:'goalos-ready'};
const $=s=>document.querySelector(s);
function pct(x){return Math.max(0,Math.min(100,Number(x)||0));}
function trustedWork(){return Math.round((state.output*state.proof*state.validation*state.settlement*state.reuse)/100000000);}
function missionValue(){const numerator=state.decisionImpact*state.proof*state.actionability*state.reuse/10000; const denom=Math.max(1,state.cost+state.risk+state.latency+state.proofDebt); return Math.round((numerator/denom)*100);}
function proofDebtPressure(){return Math.round((state.decisionImpact*(100-state.proof)*(state.risk+state.proofDebt)*Math.max(10,state.reuse))/300000);}
function gateStates(){return [
  ['Proof valid',state.proof>=70],['Eval pass',state.validation>=70],['Settlement ready',state.settlement>=60],['Rollback ready',state.risk<=45],['Reuse bounded',state.reuse>=55],['Claim boundary',state.proofDebt<=40]
];}
function verdict(){const gates=gateStates(); const passes=gates.filter(g=>g[1]).length; if(state.proof<=1) return 'TRUSTED_WORK_ZERO'; if(passes===6 && trustedWork()>=50) return 'GOVERNED_DECISION_READY'; if(passes>=4) return 'HUMAN_REVIEW_READY'; if(state.proofDebt>60||state.risk>70) return 'RETURN_TO_PROOF'; return 'NEEDS_EVIDENCE';}
function render(){
  sliders.forEach(k=>{const el=$('#'+k); if(el){el.value=state[k]; const out=$('[data-out="'+k+'"]'); if(out) out.textContent=state[k];}});
  const tw=trustedWork(), mv=missionValue(), pd=proofDebtPressure(), vd=verdict();
  $('#trustedScore').textContent=tw; $('#missionValue').textContent=mv; $('#proofDebt').textContent=pd; $('#verdict').textContent=vd.replaceAll('_',' ');
  $('#trustedOrb').style.filter=`saturate(${0.75+tw/100}) brightness(${0.78+tw/180})`;
  $('#trustedOrb').style.transform=`scale(${0.92+tw/900})`;
  const gates=$('#gates'); gates.innerHTML=''; gateStates().forEach(([label,pass])=>{const d=document.createElement('div'); d.className='gate '+(pass?'pass':'fail'); d.innerHTML=`<b>${pass?'PASS':'HOLD'}</b><span>${label}</span>`; gates.appendChild(d);});
  const flow=$('#flow'); flow.innerHTML=''; ['Output','Proof','Validation','Settlement','Reuse'].forEach((label,i)=>{const keys=['output','proof','validation','settlement','reuse']; const val=state[keys[i]]; const d=document.createElement('div'); d.className='node '+(val>=60?'active':''); d.innerHTML=`<div class="num">${val}</div><b>${label}</b>`; flow.appendChild(d);});
  const active=DATA.presets.find(p=>p.id===state.preset); $('#lesson').textContent=active?active.lesson:'Custom scenario';
  $('#briefText').textContent=makeBrief();
  document.querySelectorAll('.preset').forEach(p=>p.classList.toggle('active',p.dataset.id===state.preset));
}
function makeBrief(){return `GoalOS Trust Equation\n\nAI Work = Output × Proof × Validation × Settlement × Reuse\nTrusted Work: ${trustedWork()}/100\nMission Value: ${missionValue()}/100\nProof Debt Pressure: ${proofDebtPressure()}/100\nVerdict: ${verdict()}\n\nGate summary:\n${gateStates().map(([g,p])=>`- ${p?'PASS':'HOLD'} · ${g}`).join('\n')}\n\nBoundary: browser-local public-safe simulation. No wallet, no network, no production authority, no factual certification.`;}
function exportReceipt(){const payload={receiptType:'GoalOSTrustEquationReceipt',version:'v35-trust-equation-simulator',generatedAt:new Date().toISOString(),inputs:{...state},trustedWork:trustedWork(),missionValue:missionValue(),proofDebtPressure:proofDebtPressure(),verdict:verdict(),gates:Object.fromEntries(gateStates()),posture:{browserLocal:true,zeroNetwork:true,noWallet:true,noUserDataWanted:true}}; const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='goalos-trust-equation-receipt.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);}
async function copyBrief(){try{await navigator.clipboard.writeText(makeBrief()); $('#copyBrief').textContent='Copied'; setTimeout(()=>$('#copyBrief').textContent='Copy review brief',1200);}catch{$('#copyBrief').textContent='Copy failed'; setTimeout(()=>$('#copyBrief').textContent='Copy review brief',1200);}}
function applyPreset(p){state.preset=p.id; Object.assign(state,p.values); render();}
function init(){const pbox=$('#presets'); DATA.presets.forEach(p=>{const b=document.createElement('button'); b.className='preset'; b.dataset.id=p.id; b.innerHTML=`<b>${p.name}</b><span>${p.lesson}</span>`; b.addEventListener('click',()=>applyPreset(p)); pbox.appendChild(b);}); sliders.forEach(k=>{const el=$('#'+k); if(el) el.addEventListener('input',()=>{state[k]=pct(el.value); state.preset='custom'; render();});}); $('#zeroProof').addEventListener('click',()=>{state.proof=0; state.validation=Math.min(state.validation,20); state.settlement=Math.min(state.settlement,10); state.proofDebt=95; state.preset='custom'; render();}); $('#goalosPreset').addEventListener('click',()=>applyPreset(DATA.presets.find(p=>p.id==='goalos-ready'))); $('#exportReceipt').addEventListener('click',exportReceipt); $('#copyBrief').addEventListener('click',copyBrief); render();}
init();
