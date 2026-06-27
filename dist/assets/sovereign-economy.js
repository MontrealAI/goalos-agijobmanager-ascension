const $=s=>document.querySelector(s);
const stages=['mandate','compose','route','execute','prove','validate','settle','chronicle','select','rollback'];
const lineage=[['META-AGENTIC α-AGI','GoalOSCommit','SelectionCertificate'],['AGI Alpha Node v0','RunCommitment','ProofPacket'],['AGI Jobs v0 (v2)','JobSpec','Chronicle'],['AGIJobManager','Escrow','Finalization']];
const state={step:0,events:[],externalActions:0,authority:'HUMAN_REVIEW_REQUIRED'};
function render(){
  const stage=$('#stageList'); if(stage) stage.innerHTML=stages.map((s,i)=>`<div class="stage-row ${i===state.step?'active':''}"><strong>${String(i+1).padStart(2,'0')}</strong><span>${s.toUpperCase()}</span><code>${i<state.step?'SEALED':i===state.step?'ACTIVE':'QUEUED'}</code></div>`).join('');
  const trace=$('#economyTrace'); if(trace) trace.textContent=state.events.join('\n')||'Awaiting local sovereign cycle. No wallet, no RPC, no external action.';
  const meter=$('#economyMeter'); if(meter) meter.textContent=`${state.step}/10 gates · ${state.externalActions} external actions · ${state.authority}`;
}
function run(){
  state.step=0; state.events=[]; render();
  const timer=setInterval(()=>{const gate=stages[state.step]; state.events.push(`${String(state.step+1).padStart(2,'0')} ${gate.toUpperCase()} · sealed local evidence object · external actions 0`); state.step++; render(); if(state.step>=stages.length){clearInterval(timer); state.authority='HUMAN_REVIEW_REQUIRED'; state.events.push('TERMINAL · Evidence Docket ready for review; no value moved; no authority self-granted.'); render();}},420);
}
function docket(){return {docketVersion:'6.1-sme-v10',title:'GoalOS AGIALPHA Ascension — Sovereign Machine Economy',productionUrl:'https://montrealai.github.io/goalos-agijobmanager-ascension/',canonical:{AGIJobManager:'0xB3AAeb69b630f0299791679c063d68d6687481d1',AGIALPHA:'0xA61a3B3a130a9c20768EEBF97E21515A6046a1fA',chainId:1},lineage:lineage.map(([surface,input,output])=>({surface,input,output})),loop:stages,terminalDisposition:'HUMAN_REVIEW_REQUIRED',publicSafety:{walletConnections:0,networkSwitches:0,tokenApprovals:0,mainnetBroadcasts:0,externalActions:0},claimBoundary:'Architecture and implementation surface; empirical claims require real tasks, baselines, proof bundles, replay, validator reports and independent review.'};}
function download(){const blob=new Blob([JSON.stringify(docket(),null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='goalos-sovereign-machine-economy-docket.json'; a.click(); URL.revokeObjectURL(a.href);}
function copy(){navigator.clipboard?.writeText(JSON.stringify(docket(),null,2)); state.events.push('COPY · public-safe docket copied for reviewer.'); render();}
window.addEventListener('DOMContentLoaded',()=>{render(); $('#runEconomy')?.addEventListener('click',run); $('#exportEconomy')?.addEventListener('click',download); $('#copyEconomy')?.addEventListener('click',copy);});
