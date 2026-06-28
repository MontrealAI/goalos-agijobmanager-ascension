
(function(){
  'use strict';
  const policy={networkRequests:0,walletCalls:0,externalActions:0,storageWrites:0,userDataWanted:false};
  const gates=['ProofValid','EvalPass','RiskWithinBound','RollbackReady','CanaryReady','ScopeAuthorized','ChallengeWindowCleared'];
  const candidates={};
  const baseCandidates=[
    {id:'fast-output',name:'Fast persuasive output',summary:'Looks complete, but proof, eval, risk, rollback, and challenge gates fail.',qualityDelta:82,transfer:28,verifiedValue:36,evidenceIntegrity:22,costDelta:18,risk:67,coordinationOverhead:22,rollbackDebt:74,gates:{ProofValid:false,EvalPass:false,RiskWithinBound:false,RollbackReady:false,CanaryReady:true,ScopeAuthorized:true,ChallengeWindowCleared:false}},
    {id:'specialist-swarm',name:'Specialist swarm proposal',summary:'High capability, but canary and challenge gates are unresolved.',qualityDelta:77,transfer:62,verifiedValue:68,evidenceIntegrity:70,costDelta:55,risk:46,coordinationOverhead:64,rollbackDebt:31,gates:{ProofValid:true,EvalPass:true,RiskWithinBound:true,RollbackReady:true,CanaryReady:false,ScopeAuthorized:true,ChallengeWindowCleared:false}},
    {id:'verified-capability',name:'Verified capability package',summary:'Balanced, replayable, evaluated, scoped, canary-ready, and rollback-ready.',qualityDelta:71,transfer:84,verifiedValue:79,evidenceIntegrity:92,costDelta:33,risk:21,coordinationOverhead:26,rollbackDebt:12,gates:{ProofValid:true,EvalPass:true,RiskWithinBound:true,RollbackReady:true,CanaryReady:true,ScopeAuthorized:true,ChallengeWindowCleared:true}},
    {id:'high-novelty',name:'High-novelty breakthrough candidate',summary:'High possible value; novelty raises the proof burden and blocks promotion until eval/risk/challenge clear.',qualityDelta:91,transfer:77,verifiedValue:85,evidenceIntegrity:64,costDelta:47,risk:58,coordinationOverhead:48,rollbackDebt:45,gates:{ProofValid:true,EvalPass:false,RiskWithinBound:false,RollbackReady:true,CanaryReady:false,ScopeAuthorized:false,ChallengeWindowCleared:false}}
  ];
  baseCandidates.forEach(c=>candidates[c.id]=structuredClone(c));
  let active='verified-capability', result=null;
  const $=id=>document.getElementById(id);
  const clamp=n=>Math.max(0,Math.min(100,Math.round(n)));
  const score=c=>{
    const s=.22*c.qualityDelta+.18*c.transfer+.20*c.verifiedValue+.20*c.evidenceIntegrity-.08*c.costDelta-.06*c.risk-.04*c.coordinationOverhead-.02*c.rollbackDebt;
    return clamp(s);
  };
  const gatesPass=c=>gates.every(g=>!!c.gates[g]);
  const scoreStatus=c=>gatesPass(c)&&score(c)>=62?'PROMOTE':gatesPass(c)?'CANARY':'REJECT';
  const hash=s=>{let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return '0x'+(h>>>0).toString(16).padStart(8,'0')};
  function current(){return candidates[active]}
  function renderCandidateButtons(){
    const box=$('candidateButtons'); if(!box) return;
    box.innerHTML=Object.values(candidates).map(c=>`<button type="button" data-id="${c.id}" class="${c.id===active?'active':''}"><span class="tag">${gatesPass(c)?'gate-cleared':'blocked'}</span><br>${c.name}</button>`).join('');
    box.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>{active=b.dataset.id; loadSliders(current()); render();}));
  }
  function loadSliders(c){['qualityDelta','transfer','verifiedValue','evidenceIntegrity','costDelta','risk','coordinationOverhead','rollbackDebt'].forEach(k=>{const el=$(k); if(el) el.value=c[k]; const out=$(k+'Out'); if(out) out.textContent=c[k];});}
  function applySliders(){const c=current();['qualityDelta','transfer','verifiedValue','evidenceIntegrity','costDelta','risk','coordinationOverhead','rollbackDebt'].forEach(k=>{const el=$(k); if(el){c[k]=Number(el.value); const out=$(k+'Out'); if(out) out.textContent=c[k];}}); c.gates.ProofValid=c.evidenceIntegrity>=60; c.gates.EvalPass=c.qualityDelta>=60&&c.verifiedValue>=55; c.gates.RiskWithinBound=c.risk<=45; c.gates.RollbackReady=c.rollbackDebt<=35; c.gates.CanaryReady=c.costDelta<=60&&c.coordinationOverhead<=55; c.gates.ScopeAuthorized=c.risk<=60&&c.evidenceIntegrity>=55; c.gates.ChallengeWindowCleared=c.evidenceIntegrity>=75&&c.risk<=35;}
  function buildCertificate(c){
    const status=scoreStatus(c), s=score(c), passed=gates.filter(g=>c.gates[g]);
    return {
      type:'SelectionCertificate', release:'v19-proof-gradient-arena', generatedAt:new Date().toISOString(), candidate:{id:c.id,name:c.name,proofHash:hash(JSON.stringify(c)),summary:c.summary}, advisoryScore:s, decision:status,
      hardGates:gates.map(g=>({gate:g,status:c.gates[g]?'PASS':'FAIL'})),
      selectionLaw:'Score is advisory; gates are mandatory. High score cannot bypass proof validity, eval pass, risk threshold, rollback readiness, canary readiness, scope authorization, or challenge clearance.',
      proofGradient:{qualityDelta:c.qualityDelta,transfer:c.transfer,verifiedValue:c.verifiedValue,evidenceIntegrity:c.evidenceIntegrity,costDelta:c.costDelta,risk:c.risk,coordinationOverhead:c.coordinationOverhead,rollbackDebt:c.rollbackDebt},
      rollbackTarget:status==='PROMOTE'?'previous active artifact + controlled canary rollback':'none; candidate rejected or held for more evidence',
      humanAuthority:'Required before any production action', publicSafetyBoundary:policy, passedGates:passed.length, failedGates:gates.length-passed.length,
      publicPrivateBoundary:{public:['candidate id','proof hash placeholder','eval verdict','gate status','selection decision','rollback target','claim boundary'],private:['private prompts','customer data','raw traces','privileged approvals','internal workpapers']}
    };
  }
  function buildDocket(cert){return {type:'EvidenceDocket6.1', title:'Proof Gradient Arena public-safe docket', release:'v19-proof-gradient-arena', claim:'Only proof-gated candidates can earn promotion.', nonClaims:['No factual certification','No external audit opinion','No wallet operation','No Mainnet transaction','No user-data collection'], manifest:{productionUrl:location.href.split('#')[0], networkRequests:0,walletCalls:0,externalActions:0,userDataWanted:false}, selectionCertificate:cert, replayPath:'Open proof-gradient-arena.html, choose the same candidate, run Selection Gate, compare generated certificate.', claimBoundary:'This is a local demonstration of GoalOS selection logic, not a production promotion.', privateAppendix:'None collected. Do not enter personal or confidential data.'};}
  function render(){
    applySliders(); const c=current(); renderCandidateButtons(); const s=score(c), status=scoreStatus(c);
    $('candidateName').textContent=c.name; $('candidateSummary').textContent=c.summary; $('score').textContent=s; $('scoreRing').style.setProperty('--pct',s);
    $('decisionTitle').textContent=status==='PROMOTE'?'Promote to canary-ready capability.':status==='CANARY'?'Hold for scoped canary review.':'Reject or return for evidence.';
    $('decisionCopy').textContent=status==='PROMOTE'?'The candidate clears every hard gate. A SelectionCertificate can be exported for review; production action still requires human authority.':status==='CANARY'?'The score is acceptable, but promotion waits for policy-scoped evidence and review.':'The candidate may look attractive, but a hard gate failed. GoalOS blocks propagation.';
    $('gateGrid').innerHTML=gates.map(g=>`<div class="gate ${c.gates[g]?'pass':'fail'}"><span>${g.replace(/([A-Z])/g,' $1').trim()}</span><i>${c.gates[g]?'PASS':'FAIL'}</i></div>`).join('');
    $('matrix').innerHTML=`<div><span>Quality delta</span><b>${c.qualityDelta}</b></div><div><span>Transfer</span><b>${c.transfer}</b></div><div><span>Verified value</span><b>${c.verifiedValue}</b></div><div><span>Evidence integrity</span><b>${c.evidenceIntegrity}</b></div><div><span>Cost delta</span><b>-${c.costDelta}</b></div><div><span>Risk</span><b>-${c.risk}</b></div><div><span>Coordination overhead</span><b>-${c.coordinationOverhead}</b></div><div><span>Rollback debt</span><b>-${c.rollbackDebt}</b></div>`;
    const cert=buildCertificate(c); result={certificate:cert,docket:buildDocket(cert)};
    const trace=[`Candidate selected: ${c.name}`,`Advisory score: ${s}/100`,`Hard gates passed: ${cert.passedGates}/${gates.length}`,`Decision: ${status}`,status==='PROMOTE'?'SelectionCertificate emitted for human review.':'Propagation blocked; more evidence required.','External actions: 0 · Wallet calls: 0 · Network requests: 0'];
    $('trace').innerHTML=trace.map((t,i)=>`<p>${String(i+1).padStart(2,'0')} · ${t}</p>`).join('');
    renderOrbit(c); renderObjects(cert);
    $('downloadCertificate').disabled=false; $('downloadDocket').disabled=false; $('copyBrief').disabled=false;
  }
  function renderOrbit(c){gates.forEach((g,i)=>{const el=$('node'+i); if(el){el.textContent=g.replace(/[a-z]/g,'').slice(0,4)||String(i+1); el.className='gate-node '+(c.gates[g]?'pass':'fail')+' node-'+String.fromCharCode(97+i); el.title=g+' '+(c.gates[g]?'PASS':'FAIL');}})}
  function renderObjects(cert){
    const objects={GoalOSCommit:{objective:$('mission')?.value||'Select the safest reusable capability.',successCriteria:['hard gates pass','advisory score meets threshold','human review remains final authority'],claimBoundary:'browser-local demonstration'},ProofPacket:{candidate:cert.candidate,proofHash:cert.candidate.proofHash,evidenceIntegrity:cert.proofGradient.evidenceIntegrity,networkRequests:0},EvalAttestation:{verdict:cert.decision,hardGateResults:cert.hardGates,evaluator:'local deterministic demo'},SelectionCertificate:cert,RollbackReceipt:{rollbackTarget:cert.rollbackTarget,status:cert.decision==='PROMOTE'?'ready':'not applicable'}};
    const tabs=$('objectTabs'); const view=$('objectView');
    if(!tabs||!view) return; const keys=Object.keys(objects); tabs.innerHTML=keys.map((k,i)=>`<button type="button" data-k="${k}" class="${i===0?'active':''}">${k}</button>`).join('');
    const show=k=>{tabs.querySelectorAll('button').forEach(b=>b.classList.toggle('active',b.dataset.k===k)); view.textContent=JSON.stringify(objects[k],null,2)}; tabs.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>show(b.dataset.k))); show(keys[0]);
  }
  function download(name,obj){const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},0)}
  function copyBrief(){const cert=result?.certificate||buildCertificate(current()); const text=`GoalOS Proof Gradient Arena: ${cert.candidate.name}. Decision: ${cert.decision}. Hard gates passed: ${cert.passedGates}/${gates.length}. Advisory score: ${cert.advisoryScore}/100. Boundary: no wallet, no network, no user data, no external action.`; if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text); else window.prompt('Copy brief',text);}
  function initCanvas(){const canvas=$('gradientField'); if(!canvas) return; const ctx=canvas.getContext('2d'); let w,h,d=[]; function resize(){w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;d=Array.from({length:90},()=>({x:Math.random()*w,y:h+Math.random()*h,v:(.28+Math.random()*1.1)*devicePixelRatio,r:(1+Math.random()*2.4)*devicePixelRatio,a:.28+Math.random()*.55}))} addEventListener('resize',resize,{passive:true}); resize(); function frame(){ctx.clearRect(0,0,w,h); d.forEach(p=>{p.y-=p.v; // d.y-=p.v ascendant particle invariant
      if(p.y<-30){p.y=h+30;p.x=Math.random()*w} const grd=ctx.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r*5); grd.addColorStop(0,`rgba(105,255,218,${p.a})`); grd.addColorStop(1,'rgba(105,255,218,0)'); ctx.fillStyle=grd; ctx.fillRect(p.x-p.r*5,p.y-p.r*5,p.r*10,p.r*10);}); requestAnimationFrame(frame)} frame();}
  document.addEventListener('DOMContentLoaded',()=>{initCanvas(); renderCandidateButtons(); loadSliders(current()); ['qualityDelta','transfer','verifiedValue','evidenceIntegrity','costDelta','risk','coordinationOverhead','rollbackDebt'].forEach(k=>$(k)?.addEventListener('input',render)); $('runGate')?.addEventListener('click',render); $('resetGate')?.addEventListener('click',()=>{Object.keys(candidates).forEach(k=>candidates[k]=structuredClone(baseCandidates.find(c=>c.id===k))); active='verified-capability'; loadSliders(current()); render();}); $('downloadCertificate')?.addEventListener('click',()=>download('goalos-selection-certificate-v19.json',result?.certificate||buildCertificate(current()))); $('downloadDocket')?.addEventListener('click',()=>download('goalos-proof-gradient-docket-v19.json',result?.docket||buildDocket(buildCertificate(current())))); $('copyBrief')?.addEventListener('click',copyBrief); render();});
})();
