(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const presets = [
    {id:'mission-os-proof-run', title:'Mission OS proof run', claim:'GoalOS converts an objective into a governed decision state containing mission contract, claims matrix, verifier report, risk ledger, Evidence Docket, action graph, Chronicle entry, and reusable capability package.', trace:86, baseline:78, replay:82, validator:74, risk:72, boundary:90},
    {id:'agijobmanager-ascension-public-surface', title:'AGIJobManager Ascension public surface', claim:'AGIJobManager Ascension is a public proof institution around the deployed settlement contract, with a read-only chamber, Evidence Docket, verification page, legal boundary, token boundary, and separated Expert Console.', trace:84, baseline:70, replay:80, validator:72, risk:70, boundary:92},
    {id:'multi-agent-institution', title:'Proof-governed multi-agent institution', claim:'Large multi-agent systems coordinate to greater useful effect when bounded work, proof packets, verifier judgments, settlement decisions, Chronicle memory, and reusable capability are first-class state.', trace:78, baseline:72, replay:76, validator:70, risk:68, boundary:88},
    {id:'fragile-demo-claim', title:'Fragile demo claim', claim:'A polished demo proves the system works at production scale without baselines, external replay, delayed outcomes, or human review.', trace:42, baseline:18, replay:24, validator:30, risk:22, boundary:36}
  ];
  const steps = [
    ['GoalOSCommit','objective, success/failure criteria, constraints, budget, risk, evaluators'],
    ['RunCommitment','agent set, tools, policies, context roots, runtime boundary'],
    ['ProofPacket','trace root, output hash, eval results, cost, latency, signature bundle'],
    ['EvalAttestation','baseline, candidate, verdict, evaluator notes, challenge window'],
    ['SelectionCertificate','decision, scope, rollback target, monitor, challenge status'],
    ['ReplayReceipt','replay path, deterministic inputs, rerun verdict, deltas'],
    ['FalsificationReport','negative controls, broken assumptions, rejected claims, next proof']
  ];
  let state = null;
  function clamp(n){return Math.max(0,Math.min(100,Math.round(n)));}
  function populate(){
    const select=$('preset'); select.innerHTML='';
    presets.forEach(p=>{const o=document.createElement('option');o.value=p.id;o.textContent=p.title;select.appendChild(o);});
    select.addEventListener('change',()=>loadPreset(select.value));
    ['trace','baseline','replay','validator','risk','boundary'].forEach(id=>{
      const input=$(id), out=$(id+'Value'); input.addEventListener('input',()=>{out.textContent=input.value;});
    });
    loadPreset(presets[0].id);
    renderFlow(null);
  }
  function loadPreset(id){
    const p=presets.find(x=>x.id===id)||presets[0];
    $('claimText').value=p.claim;
    ['trace','baseline','replay','validator','risk','boundary'].forEach(k=>{ $(k).value=p[k]; $(k+'Value').textContent=p[k]; });
    ['attackBaseline','attackReplay','attackValidator','attackPrivacy','attackCost','attackDrift'].forEach(k=>$(k).checked=false);
    reset(false);
  }
  function readInputs(){
    return {
      preset:$('preset').value,
      claim:$('claimText').value.trim().slice(0,1200),
      trace:+$('trace').value,
      baseline:+$('baseline').value,
      replay:+$('replay').value,
      validator:+$('validator').value,
      risk:+$('risk').value,
      boundary:+$('boundary').value,
      attacks:{
        missingBaseline:$('attackBaseline').checked,
        brokenReplay:$('attackReplay').checked,
        validatorCollusion:$('attackValidator').checked,
        privateLeakage:$('attackPrivacy').checked,
        hiddenCost:$('attackCost').checked,
        silentDrift:$('attackDrift').checked
      }
    };
  }
  function evaluate(adversarial){
    const x=readInputs();
    if(adversarial){
      $('attackBaseline').checked=true; $('attackReplay').checked=true; $('attackDrift').checked=true;
      Object.assign(x.attacks,{missingBaseline:true,brokenReplay:true,silentDrift:true});
    }
    const penalties={
      missingBaseline:22,
      brokenReplay:30,
      validatorCollusion:24,
      privateLeakage:44,
      hiddenCost:20,
      silentDrift:32
    };
    let attackPenalty=0; Object.keys(x.attacks).forEach(k=>{ if(x.attacks[k]) attackPenalty += penalties[k]; });
    const proofIntegrity=clamp((x.trace*.22)+(x.baseline*.17)+(x.replay*.22)+(x.validator*.16)+(x.risk*.11)+(x.boundary*.12)-attackPenalty*.55);
    const replayability=clamp((x.trace*.32)+(x.replay*.42)+(x.baseline*.12)+(x.boundary*.14)-(x.attacks.brokenReplay?38:0)-(x.attacks.silentDrift?26:0));
    const falsifiability=clamp((x.baseline*.25)+(x.validator*.25)+(x.risk*.16)+(x.trace*.14)+(x.replay*.2)-(x.attacks.missingBaseline?32:0)-(x.attacks.validatorCollusion?25:0));
    const boundaryScore=clamp(x.boundary-(x.attacks.privateLeakage?55:0)-(x.attacks.hiddenCost?8:0));
    const gateDefs=[
      ['Trace root', x.trace>=65 && !x.attacks.silentDrift, x.attacks.silentDrift?'silent drift detected':'trace root and state continuity appear sufficient'],
      ['Baseline ladder', x.baseline>=60 && !x.attacks.missingBaseline, x.attacks.missingBaseline?'baseline removed by attack':'candidate compared against baseline ladder'],
      ['Replay path', x.replay>=65 && !x.attacks.brokenReplay, x.attacks.brokenReplay?'replay path broken':'rerun instructions and replay receipt available'],
      ['Validator independence', x.validator>=60 && !x.attacks.validatorCollusion, x.attacks.validatorCollusion?'collusion probe failed':'validator separation is adequate for demo'],
      ['Cost/risk ledger', x.risk>=55 && !x.attacks.hiddenCost, x.attacks.hiddenCost?'cost/risk ledger hidden':'risk, cost, and limitations recorded'],
      ['Public/private boundary', x.boundary>=70 && !x.attacks.privateLeakage, x.attacks.privateLeakage?'private-data leakage detected':'public-safe boundary preserved'],
      ['Challenge window', falsifiability>=62, falsifiability>=62?'negative controls are meaningful':'not enough falsification surface'],
      ['Human review stop', true, 'demo emits docket and stops at human review']
    ];
    const passCount=gateDefs.filter(g=>g[1]).length;
    let verdict='NEEDS_MORE_PROOF', posture='Review only';
    if(passCount>=8 && proofIntegrity>=75 && replayability>=75 && falsifiability>=70 && boundaryScore>=75){verdict='REPLAY_SURVIVED_PUBLIC_SAFE'; posture='Review-ready docket';}
    else if(boundaryScore<45 || x.attacks.privateLeakage){verdict='QUARANTINE_PRIVATE_APPENDIX'; posture='Quarantine';}
    else if(passCount<=4 || proofIntegrity<40){verdict='REJECT_STRONG_CLAIM'; posture='Reject strong claim';}
    const receipt={
      schema:'goalos.replay-falsification-gauntlet.v23',
      generatedAt:new Date().toISOString(),
      productionUrl:'https://montrealai.github.io/goalos-agijobmanager-ascension/replay-falsification-gauntlet.html',
      mode:adversarial?'adversarial-falsification':'standard-replay',
      claim:x.claim,
      nonClaims:['not factual certification','not external audit completion','not production activation','not fund authorization','not investment advice'],
      publicSafety:{noUserDataWanted:true,noNetwork:true,noWallet:true,noStorage:true,noTransactionBroadcast:true,noTokenRoute:true},
      inputs:{traceCompleteness:x.trace,baselineStrength:x.baseline,replayReadiness:x.replay,validatorIndependence:x.validator,costRiskAccounting:x.risk,publicPrivateBoundary:x.boundary,attacks:x.attacks},
      scores:{proofIntegrity,replayability,falsifiability,boundaryScore},
      gates:gateDefs.map(([name,pass,note])=>({name,pass,note})),
      verdict,
      recommendedPosture:posture,
      protocolObjects:['GoalOSCommit','RunCommitment','ProofPacket','EvalAttestation','SelectionCertificate','ReplayReceipt','FalsificationReport','ChronicleEntry'],
      chronicle:[]
    };
    receipt.chronicle=[
      `GoalOSCommit sealed for public-safe claim: ${x.claim.slice(0,90)}${x.claim.length>90?'…':''}`,
      'RunCommitment bounded to browser-local deterministic demonstration; no network, wallet, storage, or external action.',
      `ProofPacket scored: integrity ${proofIntegrity}/100, replayability ${replayability}/100, falsifiability ${falsifiability}/100.`,
      `${passCount}/8 gates passed under current replay and attack conditions.`,
      `Verdict recorded: ${verdict}. Human review remains required before any stronger claim.`
    ];
    return receipt;
  }
  function renderFlow(receipt){
    const flow=$('flow'); flow.innerHTML='';
    steps.forEach((s,i)=>{
      const d=document.createElement('div'); d.className='rg-step '+(!receipt?'': receipt.gates[Math.min(i,receipt.gates.length-1)]?.pass?'pass':'warn');
      d.innerHTML=`<b>${String(i+1).padStart(2,'0')} ${s[0]}</b><span>${s[1]}</span>`;
      flow.appendChild(d);
    });
    const stack=$('heroStack').querySelectorAll('.rg-chain-item');
    stack.forEach((el,i)=>{el.className='rg-chain-item '+(!receipt?(i===0?'active':''):(receipt.gates[Math.min(i,receipt.gates.length-1)]?.pass?'pass':'warn'));});
  }
  function render(receipt){
    state=receipt;
    const pass=receipt.gates.filter(g=>g.pass).length;
    const failed=receipt.gates.length-pass;
    const badge=$('verdictBadge'); badge.textContent=receipt.verdict.replaceAll('_',' '); badge.className='rg-verdict '+(receipt.verdict.includes('SURVIVED')?'pass':receipt.verdict.includes('REJECT')?'fail':'warn');
    $('heroVerdict').textContent=receipt.verdict.split('_')[0];
    $('heroReplay').textContent=receipt.scores.replayability;
    $('heroFaults').textContent=failed;
    $('heroOutcome').textContent=receipt.verdict.includes('SURVIVED')?'READY':receipt.verdict.includes('REJECT')?'FAIL':'REVIEW';
    $('verdictTitle').textContent= receipt.verdict.includes('SURVIVED') ? 'Replay survived. Human review remains.' : receipt.verdict.includes('QUARANTINE') ? 'Boundary failed. Quarantine required.' : receipt.verdict.includes('REJECT') ? 'Strong claim rejected.' : 'More proof required.';
    $('verdictText').textContent= receipt.recommendedPosture + ' · ' + pass + '/8 gates passed. The demo emits a review artifact and does not certify factual correctness.';
    $('mReplay').textContent=receipt.scores.replayability+'/100';
    $('mFalsify').textContent=receipt.scores.falsifiability+'/100';
    $('mIntegrity').textContent=receipt.scores.proofIntegrity+'/100';
    $('mPosture').textContent=receipt.recommendedPosture;
    renderFlow(receipt);
    $('baselineList').innerHTML=[
      ['B0 single-agent / report-only baseline', receipt.inputs.baselineStrength>=25],
      ['B1 fixed workflow baseline', receipt.inputs.baselineStrength>=45],
      ['B2 unstructured swarm baseline', receipt.inputs.baselineStrength>=60],
      ['B3 proof-governed GoalOS candidate', receipt.inputs.baselineStrength>=70]
    ].map(([t,ok])=>`<li><strong>${ok?'PASS':'OPEN'}</strong> ${t}</li>`).join('');
    $('replayFindings').innerHTML=receipt.gates.slice(0,4).map(g=>`<li><strong>${g.pass?'PASS':'FAIL'}</strong> ${g.name}: ${g.note}</li>`).join('');
    $('falsificationFindings').innerHTML=receipt.gates.slice(4).map(g=>`<li><strong>${g.pass?'PASS':'FAIL'}</strong> ${g.name}: ${g.note}</li>`).join('');
    $('chronicle').innerHTML=receipt.chronicle.map(x=>`<li>${x}</li>`).join('');
    $('receiptJson').textContent=JSON.stringify(receipt,null,2);
  }
  function run(adversarial){render(evaluate(adversarial));}
  function reset(showToast){
    state=null; $('verdictTitle').textContent='Awaiting replay.'; $('verdictText').textContent='Run the gauntlet to see whether the claim survives replay, baseline comparison, validator challenge, privacy boundary, and drift checks.'; $('verdictBadge').textContent='PENDING'; $('verdictBadge').className='rg-verdict'; $('mReplay').textContent='—'; $('mFalsify').textContent='—'; $('mIntegrity').textContent='—'; $('mPosture').textContent='—'; $('baselineList').innerHTML=''; $('replayFindings').innerHTML=''; $('falsificationFindings').innerHTML=''; $('chronicle').innerHTML=''; $('receiptJson').textContent='Run the replay gauntlet to generate a ReplayReceipt.'; $('heroVerdict').textContent='AWAITING DOCKET'; $('heroReplay').textContent='0'; $('heroFaults').textContent='7'; $('heroOutcome').textContent='PENDING'; renderFlow(null); if(showToast) toast('Gauntlet reset.');
  }
  function download(){
    if(!state) run(false);
    const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='goalos-replay-falsification-receipt-v23.json'; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},0);
  }
  async function copyBrief(){
    if(!state) run(false);
    const text=`GoalOS Replay & Falsification Gauntlet verdict: ${state.verdict}. Replayability ${state.scores.replayability}/100, falsifiability ${state.scores.falsifiability}/100, proof integrity ${state.scores.proofIntegrity}/100. Recommended posture: ${state.recommendedPosture}. Human review remains required.`;
    try{await navigator.clipboard.writeText(text);toast('Review brief copied.');}catch(e){toast('Copy unavailable in this browser.');}
  }
  function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),2200);}
  function particles(){
    const c=$('riseField'); if(!c) return; const ctx=c.getContext('2d'); let w=0,h=0,dots=[];
    function resize(){w=c.width=innerWidth*devicePixelRatio;h=c.height=innerHeight*devicePixelRatio;dots=Array.from({length:Math.min(120,Math.floor(innerWidth/13))},()=>({x:Math.random()*w,y:Math.random()*h,r:(Math.random()*1.6+.55)*devicePixelRatio,v:(Math.random()*0.45+0.16)*devicePixelRatio,a:Math.random()*0.55+0.17,hue:Math.random()<.76?170:48}));}
    function tick(){ctx.clearRect(0,0,w,h);for(const d of dots){d.y-=d.v;d.x+=Math.sin((d.y+d.r)*0.006)*0.22*devicePixelRatio;if(d.y<-30){d.y=h+30;d.x=Math.random()*w;}ctx.beginPath();ctx.fillStyle=`hsla(${d.hue},95%,70%,${d.a})`;ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.strokeStyle=`hsla(${d.hue},95%,70%,${d.a*.18})`;ctx.moveTo(d.x,d.y+d.r*8);ctx.lineTo(d.x,d.y+d.r*24);ctx.stroke();}requestAnimationFrame(tick);}
    addEventListener('resize',resize,{passive:true});resize();tick();
  }
  document.addEventListener('DOMContentLoaded',()=>{populate();particles();$('runReplay').addEventListener('click',()=>run(false));$('quickReplay').addEventListener('click',()=>run(false));$('runFalsification').addEventListener('click',()=>run(true));$('reset').addEventListener('click',()=>reset(true));$('downloadReceipt').addEventListener('click',download);$('copyBrief').addEventListener('click',copyBrief);});
})();
