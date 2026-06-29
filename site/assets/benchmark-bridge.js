(() => {
  const $ = id => document.getElementById(id);
  const baselines = [
    ['B0','Report-only','Static answer without proof packet.'],
    ['B1','Single agent','One strong agent, same budget.'],
    ['B2','Unstructured swarm','Many agents, weak routing, high overhead.'],
    ['B3','Fixed crew','Planner / executor / reviewer with static roles.'],
    ['B4','GoalOS routed constellation','Proof-conditioned routing with validator gate.'],
    ['B5','GoalOS + Chronicle reuse','Prior accepted capability improves future work.'],
    ['B6','External replay candidate','Requires independent replay before stronger claim.']
  ];
  const presets = {
    software:'A proof-governed constellation should resolve a software repair task with fewer unsupported assumptions, clearer replay, and lower regression risk than simpler baselines.',
    assistant:'A proof-governed constellation should produce a more review-ready answer with source provenance, contradiction handling, risk ledger, and replay path.',
    web:'A proof-governed constellation should complete a browser/desktop workflow only when action traces, policy boundaries, and validator checks are complete.',
    policy:'A proof-governed constellation should outperform tool-use baselines while preserving policy constraints, escalation rules, and claim boundaries.',
    science:'A proof-governed constellation should convert a data/science objective into an executed, reproducible, risk-scored evidence bundle.',
    agijobs:'A proof-governed constellation should produce a settlement-grade AGI Jobs proof bundle with job spec, validation, cost/risk ledger, and Chronicle handoff.'
  };
  const gates = [
    ['Task manifest','objective, acceptance criteria, risk class'],
    ['Equal budget','same model/tool/time/human-review envelope'],
    ['Baseline ladder','single agent, fixed workflow, swarm, incumbent'],
    ['ProofBundle','trace, artifacts, hashes, verifier report'],
    ['Replay path','rerunnable or independently inspectable'],
    ['Cost/risk ledgers','latency, cost, safety, incidents, uncertainty'],
    ['Claim boundary','no empirical promotion beyond evidence'],
    ['Human review','review-ready, not self-authorized']
  ];
  const state = { ran:false, adversarial:false, docket:null };
  function hash(s){ let h=2166136261; for(let i=0;i<s.length;i++){h^=s.charCodeAt(i); h=Math.imul(h,16777619);} return ('00000000'+(h>>>0).toString(16)).slice(-8); }
  function vals(){ return { taskFamily:$('taskFamily').value, claim:$('claimText').value.trim(), taskCount:+$('taskCount').value, budget:+$('budget').value, baseline:+$('baseline').value, replay:+$('replay').value, validator:+$('validator').value, ledger:+$('ledger').value, safety:+$('safety').value, external:+$('external').value }; }
  function updateSliderLabels(){ document.querySelectorAll('.bb-sliders label').forEach(label=>{ const i=label.querySelector('input'), s=label.querySelector('span'); if(i&&s) s.textContent=i.value; }); }
  function scoreModel(v){
    const t = v.taskCount / 10, b = v.baseline/100, budget=v.budget/100, replay=v.replay/100, val=v.validator/100, ledger=v.ledger/100, safety=v.safety/100, external=v.external/100;
    const noise = n => ((parseInt(hash(JSON.stringify(v)+n),16)%17)-8)/100;
    const rows = baselines.map((x,i)=>{
      let verified = [0.30,0.46,0.50,0.58,0.70,0.78,0.82][i] + noise(i);
      let cost = [0.38,0.52,0.83,0.68,0.70,0.73,0.78][i] + Math.max(0,(1-budget))*0.25;
      let risk = [0.42,0.35,0.52,0.34,0.23,0.20,0.18][i] + (1-safety)*0.30;
      let overhead = [0.15,0.22,0.62,0.38,0.28,0.30,0.32][i];
      if(i>=4){ verified += replay*.13 + val*.10 + ledger*.06 + safety*.06; risk -= safety*.08 + val*.04; overhead -= ledger*.04; }
      if(i===5){ verified += .08; cost += .03; }
      if(i===6){ verified += external*.12; cost += .05; risk -= external*.05; overhead += .04; }
      verified = Math.max(0.05, Math.min(0.99, verified)); cost=Math.max(.1,Math.min(1,cost)); risk=Math.max(.02,Math.min(1,risk)); overhead=Math.max(.03,Math.min(1,overhead));
      const dreal = +(verified/(cost+.18) * (1-risk) * (1-overhead*.55) * (0.85+t*.03)).toFixed(3);
      return { id:x[0], name:x[1], note:x[2], verified:+verified.toFixed(3), cost:+cost.toFixed(3), risk:+risk.toFixed(3), overhead:+overhead.toFixed(3), dreal };
    });
    if(v.budget<60){ rows[4].dreal -= .08; rows[5].dreal -= .09; }
    const bestBaseline = rows.slice(0,4).sort((a,b)=>b.dreal-a.dreal)[0];
    const candidate = rows[5];
    const externalCandidate = rows[6];
    const hard = {
      taskManifest: v.taskCount>=3,
      equalBudget: v.budget>=80,
      baselineLadder: v.baseline>=62,
      proofBundle: v.ledger>=70 && v.validator>=65,
      replayPath: v.replay>=75,
      costRiskLedgers: v.ledger>=78 && v.safety>=70,
      claimBoundary: true,
      humanReview: true,
      externalReplay: v.external>=70
    };
    if(state.adversarial){ hard.externalReplay = hard.externalReplay && v.external>=82; hard.replayPath = hard.replayPath && v.replay>=82; }
    const allLocal = hard.taskManifest&&hard.equalBudget&&hard.baselineLadder&&hard.proofBundle&&hard.replayPath&&hard.costRiskLedgers&&hard.claimBoundary&&hard.humanReview;
    const delta = +(candidate.dreal - bestBaseline.dreal).toFixed(3);
    let outcome = 'NEEDS_BENCHMARK_RUN';
    let level = 'E0';
    if(!allLocal) { outcome='HOLD_FOR_MISSING_GATES'; level='E1'; }
    else if(delta <= 0) { outcome='BASELINE_WINS_REJECT_PROMOTION'; level='E2'; }
    else if(hard.externalReplay && externalCandidate.dreal > bestBaseline.dreal) { outcome='EXTERNAL_REPLAY_READY_FOR_REVIEW'; level='E5'; }
    else { outcome='LOCAL_BENCHMARK_DOCKET_READY'; level='E3'; }
    return { rows, bestBaseline, candidate, delta, outcome, level, gates:hard, dreal:candidate.dreal };
  }
  function renderRows(model){
    const max = Math.max(...model.rows.map(r=>r.dreal));
    $('baselineRows').innerHTML = model.rows.map(r=>`<div class="bb-row"><b>${r.id}</b><div><strong>${r.name}</strong><small>${r.note}</small><div class="bb-bar"><span style="width:${Math.round((r.dreal/max)*100)}%"></span></div></div><small>D=${r.dreal}</small><small>risk ${Math.round(r.risk*100)}%</small></div>`).join('');
  }
  function renderGates(model){
    const labels = [['taskManifest',gates[0]],['equalBudget',gates[1]],['baselineLadder',gates[2]],['proofBundle',gates[3]],['replayPath',gates[4]],['costRiskLedgers',gates[5]],['claimBoundary',gates[6]],['humanReview',gates[7]],['externalReplay',['External replay','required for stronger empirical claim']]];
    $('gateGrid').innerHTML = labels.map(([key,[name,note]])=>`<div class="bb-gate ${model.gates[key]?'pass':''}"><i></i><div><b>${name}</b><small>${note}</small></div><em>${model.gates[key]?'PASS':'HOLD'}</em></div>`).join('');
  }
  function makeDocket(){
    const v=vals(), m=scoreModel(v), id='BBD-'+hash(JSON.stringify(v)+Date.now()).toUpperCase();
    return { type:'BenchmarkEvidenceDocket', version:'v27-public-demo', docketId:id, generatedAt:new Date().toISOString(), productionUrl:'https://montrealai.github.io/goalos-agijobmanager-ascension/real-task-benchmark-bridge.html', boundary:{browserLocal:true,noUserDataWanted:true,noAccount:true,noCookies:true,noAnalytics:true,noStorage:true,noWallet:true,noNetwork:true,noTokenRoute:true,noTransactionBroadcast:true,noProductionAuthority:true,notEmpiricalSOTA:true,notExternalAudit:true}, claim:{text:v.claim, taskFamily:v.taskFamily, claimLevel:m.level, outcome:m.outcome}, equalBudgetInputs:{taskCount:v.taskCount,budgetDiscipline:v.budget,baselineStrength:v.baseline,replayCompleteness:v.replay,validatorIndependence:v.validator,costRiskLedgerQuality:v.ledger,safetyMargin:v.safety,externalReplayReadiness:v.external,adversarialMode:state.adversarial}, baselineResults:m.rows, bestBaseline:m.bestBaseline, candidate:m.candidate, candidateDelta:m.delta, promotionGates:m.gates, decision:m.outcome, claimBoundary:'Public local demonstration only. Stronger empirical claims require real tasks, equal-budget baselines, proof bundles, replay logs, cost/risk ledgers, validator reports, delayed outcomes, and independent review.' };
  }
  function render(){
    const docket = state.docket || makeDocket(); const m = scoreModel(vals()); renderRows(m); renderGates(m);
    $('docketJson').textContent = JSON.stringify(docket,null,2); $('verdictLabel').textContent=m.outcome; $('claimLevel').textContent=m.level; $('bestBaseline').textContent=m.bestBaseline.id+' '+m.bestBaseline.dreal; $('candidateDelta').textContent=(m.delta>0?'+':'')+m.delta; $('dreal').textContent=m.dreal; $('heroVerdict').textContent=m.outcome.replaceAll('_',' ');
    const text = m.outcome==='EXTERNAL_REPLAY_READY_FOR_REVIEW' ? 'The candidate clears local gates and has enough external replay readiness for human review. This still does not become a production claim without real evidence.' : m.outcome==='LOCAL_BENCHMARK_DOCKET_READY' ? 'The candidate clears local benchmark gates, but external replay is not yet sufficient for a stronger public empirical claim.' : m.outcome==='BASELINE_WINS_REJECT_PROMOTION' ? 'A baseline wins under the current assumptions. GoalOS would reject promotion instead of hiding the loss.' : 'One or more hard gates are missing. The claim must stay bounded.';
    $('verdictText').textContent=text;
  }
  function download(name,obj){ const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); URL.revokeObjectURL(a.href); a.remove(); }
  $('taskFamily').addEventListener('change',e=>{ $('claimText').value=presets[e.target.value]; if(state.ran){ state.docket=makeDocket(); render(); } });
  document.querySelectorAll('.bb-sliders input').forEach(i=>i.addEventListener('input',()=>{ updateSliderLabels(); if(state.ran){ state.docket=makeDocket(); render(); } }));
  $('runBridge').addEventListener('click',()=>{ state.ran=true; state.adversarial=false; state.docket=makeDocket(); render(); });
  $('runAdversary').addEventListener('click',()=>{ state.ran=true; state.adversarial=true; state.docket=makeDocket(); render(); });
  $('resetBridge').addEventListener('click',()=>{ state.ran=false; state.adversarial=false; state.docket=null; $('docketJson').textContent='Run the bridge to generate a BenchmarkEvidenceDocket.'; $('verdictLabel').textContent='WAITING_FOR_RUN'; $('verdictText').textContent='Run the bridge to see whether the claim can be promoted, held, quarantined, or rejected.'; ['bestBaseline','candidateDelta','dreal','claimLevel'].forEach(id=>$(id).textContent='—'); renderRows({rows:baselines.map((b,i)=>({id:b[0],name:b[1],note:b[2],dreal:0,risk:0})).map((r,i)=>({...r,dreal:+(.1+i*.03).toFixed(2)}))}); renderGates({gates:{}}); $('heroVerdict').textContent='WAITING'; });
  $('downloadDocket').addEventListener('click',()=>download('benchmark-evidence-docket-public-demo.json', state.docket || makeDocket()));
  $('copyBrief').addEventListener('click',async()=>{ const d=state.docket || makeDocket(); const brief=`Benchmark Bridge ${d.docketId}: ${d.claim.taskFamily} claim outcome ${d.decision}. Best baseline ${d.bestBaseline.id}=${d.bestBaseline.dreal}; GoalOS+Chronicle candidate=${d.candidate.dreal}; Δ=${d.candidateDelta}. Public demo only; no user data, no network, no wallet, no transaction.`; try{ await navigator.clipboard.writeText(brief); }catch(e){ $('verdictText').textContent=brief; } });
  function stars(){ const c=$('bbField'), ctx=c.getContext('2d'); let w,h,dots=[]; function resize(){ w=c.width=innerWidth; h=c.height=innerHeight; dots=Array.from({length:Math.min(180,Math.floor(w*h/11000))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.7+.35,v:Math.random()*.42+.09,a:Math.random()*.75+.2})); } addEventListener('resize',resize,{passive:true}); resize(); (function tick(){ ctx.clearRect(0,0,w,h); for(const d of dots){ d.y-=d.v; if(d.y<-12){d.y=h+12;d.x=Math.random()*w;} ctx.globalAlpha=d.a; const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*4); g.addColorStop(0,'rgba(114,255,217,.9)'); g.addColorStop(1,'rgba(114,255,217,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,d.r*4,0,Math.PI*2); ctx.fill(); } requestAnimationFrame(tick); })(); }
  updateSliderLabels(); renderRows({rows:baselines.map((b,i)=>({id:b[0],name:b[1],note:b[2],dreal:+(.1+i*.03).toFixed(2),risk:0}))}); renderGates({gates:{}}); stars();
})();
