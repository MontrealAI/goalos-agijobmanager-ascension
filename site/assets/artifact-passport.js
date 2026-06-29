(() => {
  const $ = id => document.getElementById(id);
  const fields = ['proof','provenance','attest','transfer','scope','deps','rollback','boundary','challenge'];
  const gateDefs = [
    ['immutableVersion','Immutable version hash','Artifact identity is stable and hash-addressed.'],
    ['sourceProvenance','Source provenance','Origin, authorship, lineage, and claim boundary are recorded.'],
    ['proofHistory','Proof history','ProofPackets or public demo equivalents support the artifact.'],
    ['validatorAttestations','Validator attestations','Evaluator or validator evidence is strong enough for review.'],
    ['scopeAuthorized','Scope authorized','Reuse is constrained by domain, risk class, and receiver posture.'],
    ['dependencyIntegrity','Dependency integrity','Dependencies, assumptions, and tool boundaries are legible.'],
    ['privacyBoundary','Public/private boundary','Public proof is separated from private intelligence.'],
    ['rollbackTarget','Rollback target','The receiving institution can revert or quarantine.'],
    ['challengeWindow','Challenge window','Reviewers have a meaningful opportunity to challenge.'],
    ['humanReview','Human review','Final adoption remains a human or institutional decision.']
  ];
  const presets = {
    capability:'A reusable GoalOS capability package that converts a public-safe mission objective into a claims matrix, verifier report, Evidence Docket, action graph, Chronicle entry, and review brief.',
    workflow:'A repeatable public-safe workflow for moving a high-stakes objective from uncertainty into a governed decision state without exposing private intelligence.',
    tool:'A bounded tool contract that documents allowed actions, prohibited actions, expected observations, rollback path, and evidence output.',
    policy:'A scoped policy artifact that specifies claim boundaries, approval rules, evaluator requirements, risk class, and rollback obligations.',
    eval:'An evaluation artifact that compares candidate output against baselines, adversarial checks, cost/risk ledgers, and replay readiness.',
    router:'A proof-conditioned router that selects agents, role contracts, validators, stopping rules, and escalation paths under budget and risk constraints.',
    context_recipe:'A context recipe that preserves source provenance, freshness, redaction, replay path, and public/private separation for a mission family.',
    plan:'A rollback-ready plan artifact with objective, success criteria, failure criteria, constraints, allowed tools, and proof requirements.',
    goal:'A signed institutional aim object with scope, authority, risk, evaluators, data boundary, rollback obligations, and claim boundary.'
  };
  const state = { ran:false, stress:false, passport:null };
  function hash(s){ let h=2166136261; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619); } return (h>>>0).toString(16).padStart(8,'0'); }
  function vals(){ const v={artifactClass:$('artifactClass').value, summary:$('artifactSummary').value.trim(), receiverPosture:$('receiverPosture').value}; fields.forEach(f=>v[f]=+$(`${f}`).value); return v; }
  function updateLabels(){ document.querySelectorAll('.ap-sliders label').forEach(l=>{ const i=l.querySelector('input'), s=l.querySelector('span'); if(i&&s) s.textContent=i.value; }); }
  function compute(v){
    const score = Math.round((v.proof*.14 + v.provenance*.12 + v.attest*.12 + v.transfer*.10 + v.scope*.12 + v.deps*.10 + v.rollback*.12 + v.boundary*.13 + v.challenge*.05));
    const gates = {
      immutableVersion:true,
      sourceProvenance:v.provenance>=70,
      proofHistory:v.proof>=72,
      validatorAttestations:v.attest>=68,
      scopeAuthorized:v.scope>=78,
      dependencyIntegrity:v.deps>=70,
      privacyBoundary:v.boundary>=82,
      rollbackTarget:v.rollback>=76,
      challengeWindow:v.challenge>=62,
      humanReview:true
    };
    if(state.stress){ gates.dependencyIntegrity = gates.dependencyIntegrity && v.deps>=82; gates.challengeWindow = gates.challengeWindow && v.challenge>=74; gates.privacyBoundary = gates.privacyBoundary && v.boundary>=90; }
    const passCount = Object.values(gates).filter(Boolean).length;
    let level = 'L0';
    if(gates.sourceProvenance && gates.proofHistory) level='L1';
    if(level==='L1' && gates.validatorAttestations) level='L2';
    if(level==='L2' && gates.rollbackTarget) level='L3';
    if(level==='L3' && gates.challengeWindow) level='L4';
    if(level==='L4' && gates.scopeAuthorized && gates.privacyBoundary) level='L5';
    if(level==='L5' && v.transfer>=78 && v.receiverPosture==='cross') level='L6';
    let outcome='HOLD_FOR_MISSING_EVIDENCE';
    if(passCount<7) outcome='REJECT_REUSE_RIGHT';
    else if(!gates.privacyBoundary) outcome='QUARANTINE_PRIVATE_APPENDIX';
    else if(!gates.rollbackTarget) outcome='SANDBOX_ONLY_ROLLBACK_REQUIRED';
    else if(level==='L6' && score>=84) outcome='CROSS_INSTITUTION_REUSE_READY_FOR_REVIEW';
    else if(level==='L5') outcome='CANARY_REUSE_READY_FOR_HUMAN_REVIEW';
    else if(level==='L4') outcome='ATTESTABLE_BUT_SCOPE_LIMITED';
    else outcome='HOLD_FOR_MISSING_EVIDENCE';
    const leak = Math.max(0,100-v.boundary + (state.stress?8:0));
    return {score,gates,passCount,level,outcome,leak};
  }
  function makePassport(){
    const v=vals(), c=compute(v), seed=JSON.stringify(v)+state.stress, artifactId='PCA-'+v.artifactClass.toUpperCase().replace(/[^A-Z]/g,'').slice(0,8)+'-'+hash(seed).toUpperCase();
    const versionHash='0x'+hash(seed+'version')+hash(seed+'scope')+hash(seed+'proof')+hash(seed+'rollback');
    return {type:'ProofCarryingArtifactPassport',version:'v29-public-demo',artifactId,versionHash,generatedAt:new Date().toISOString(),productionUrl:'https://montrealai.github.io/goalos-agijobmanager-ascension/proof-carrying-artifact-passport.html',artifact:{class:v.artifactClass,summary:v.summary,receiverPosture:v.receiverPosture,selectionStatus:c.outcome,conformanceLevel:c.level},proofHistory:{proofHistory:v.proof,sourceProvenance:v.provenance,evaluatorAttestations:v.attest,transferEvidence:v.transfer,dependencyIntegrity:v.deps,replayPath:'public-demo-replay-path',evidenceDocket:'public-safe illustrative docket only'},scope:{scopeControl:v.scope,authorizedScope:v.receiverPosture,canaryRequired:c.level==='L5'||c.level==='L6',crossInstitutionCandidate:c.level==='L6'},rollback:{rollbackReadiness:v.rollback,rollbackTarget:'previous accepted version or quarantine state',monitoringCondition:'hold if evidence, safety, or privacy boundary degrades'},boundary:{browserLocal:true,noUserDataWanted:true,noAccount:true,noForms:true,noCookies:true,noAnalytics:true,noStorage:true,noWallet:true,noNetwork:true,noTokenRoute:true,noTransactionBroadcast:true,noProductionAuthority:true,publicPrivateBoundary:v.boundary,privateLeakageRisk:c.leak},challenge:{challengeWindowClearance:v.challenge,stressMode:state.stress},gates:c.gates,score:c.score,outcome:c.outcome,claimBoundary:'This browser-local passport demonstrates the proof-carrying artifact standard. It is not an external audit, production activation, factual certification, or authorization to reuse private data.'};
  }
  function renderGates(c){ $('gateGrid').innerHTML=gateDefs.map(([key,name,note])=>`<div class="ap-gate ${c.gates[key]?'pass':''}"><i></i><div><b>${name}</b><small>${note}</small></div><em>${c.gates[key]?'PASS':'HOLD'}</em></div>`).join(''); }
  function render(){ const p=state.passport||makePassport(), c=compute(vals()); renderGates(c); $('passportJson').textContent=JSON.stringify(p,null,2); $('artifactId').textContent=p.artifactId; $('versionHash').textContent=p.versionHash.slice(0,18)+'…'; $('selectionStatus').textContent=c.outcome; $('reuseRight').textContent=c.outcome.includes('REUSE')?'SCOPED':'HELD'; $('outcomeLabel').textContent=c.outcome; $('passportScore').textContent=c.score; $('conformanceLevel').textContent=c.level; $('scopeMode').textContent=vals().receiverPosture.toUpperCase(); $('leakRisk').textContent=c.leak+'%'; $('heroOutcome').textContent=c.outcome.replaceAll('_',' '); $('heroLevel').textContent=c.level; $('heroReuse').textContent=Math.max(0,Math.min(100,c.score-(c.leak/2))).toFixed(0)+'%'; $('heroMeter').style.width=c.score+'%'; const msg = c.outcome==='CROSS_INSTITUTION_REUSE_READY_FOR_REVIEW' ? 'The artifact has enough proof, scope, rollback, and public/private separation to be considered for cross-institutional human review.' : c.outcome==='CANARY_REUSE_READY_FOR_HUMAN_REVIEW' ? 'The artifact can be considered for canary reuse, but cross-institutional reuse still requires stronger transfer evidence.' : c.outcome==='QUARANTINE_PRIVATE_APPENDIX' ? 'The public/private boundary is weak. Keep the artifact quarantined until sensitive traces are separated.' : c.outcome==='REJECT_REUSE_RIGHT' ? 'Too many gates are missing. GoalOS rejects the reuse right instead of letting unproven capability propagate.' : 'The artifact remains held for more evidence, attestation, scope control, or challenge clearance.'; $('outcomeText').textContent=msg; }
  function download(name,obj){ const blob=new Blob([JSON.stringify(obj,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click(); URL.revokeObjectURL(a.href); a.remove(); }
  $('artifactClass').addEventListener('change',e=>{ $('artifactSummary').value=presets[e.target.value]; if(state.ran){ state.passport=makePassport(); render(); } });
  fields.forEach(f=>$(f).addEventListener('input',()=>{ updateLabels(); if(state.ran){ state.passport=makePassport(); render(); }}));
  $('receiverPosture').addEventListener('change',()=>{ if(state.ran){ state.passport=makePassport(); render(); }});
  $('issuePassport').addEventListener('click',()=>{ state.ran=true; state.stress=false; state.passport=makePassport(); render(); });
  $('stressPassport').addEventListener('click',()=>{ state.ran=true; state.stress=true; state.passport=makePassport(); render(); });
  $('resetPassport').addEventListener('click',()=>{ state.ran=false; state.stress=false; state.passport=null; $('passportJson').textContent='Issue a passport to generate a ProofCarryingArtifactPassport.'; ['artifactId','versionHash','reuseRight','passportScore','conformanceLevel','scopeMode','leakRisk'].forEach(id=>$(id).textContent='—'); $('selectionStatus').textContent='WAITING'; $('outcomeLabel').textContent='WAITING_FOR_RUN'; $('outcomeText').textContent='Issue a passport to see whether the artifact may be reused, held for review, canaried, sandboxed, or rejected.'; $('heroOutcome').textContent='WAITING'; $('heroLevel').textContent='L0'; $('heroReuse').textContent='0%'; $('heroMeter').style.width='0%'; renderGates({gates:{}}); });
  $('downloadPassport').addEventListener('click',()=>download('proof-carrying-artifact-passport-public-demo.json',state.passport||makePassport()));
  $('copyBrief').addEventListener('click',async()=>{ const p=state.passport||makePassport(); const brief=`Artifact Passport ${p.artifactId}: ${p.artifact.class} outcome ${p.outcome}; conformance ${p.artifact.conformanceLevel}; score ${p.score}; reuse right ${p.outcome}. Public demo only; no user data, no network, no wallet, no transaction.`; try{await navigator.clipboard.writeText(brief)}catch(e){$('outcomeText').textContent=brief;} });
  function stars(){ const c=$('apField'), ctx=c.getContext('2d'); let w,h,dots=[]; function resize(){ w=c.width=innerWidth; h=c.height=innerHeight; dots=Array.from({length:Math.min(190,Math.floor(w*h/10500))},()=>({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.7+.35,v:Math.random()*.45+.08,a:Math.random()*.75+.2})); } addEventListener('resize',resize,{passive:true}); resize(); (function tick(){ ctx.clearRect(0,0,w,h); for(const d of dots){ d.y-=d.v; if(d.y<-12){d.y=h+12;d.x=Math.random()*w;} ctx.globalAlpha=d.a; const g=ctx.createRadialGradient(d.x,d.y,0,d.x,d.y,d.r*4); g.addColorStop(0,'rgba(114,255,217,.88)'); g.addColorStop(1,'rgba(114,255,217,0)'); ctx.fillStyle=g; ctx.beginPath(); ctx.arc(d.x,d.y,d.r*4,0,Math.PI*2); ctx.fill(); } requestAnimationFrame(tick); })(); }
  updateLabels(); renderGates({gates:{}}); stars();
})();
