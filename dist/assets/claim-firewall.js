(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const presets = [
    {
      id:'proof-settled-public-claim',
      title:'Proof-settled public claim',
      claim:'GoalOS AGIJobManager Ascension is a public proof institution that separates website presentation, Evidence Docket review, Expert Console authority, and on-chain settlement identity.',
      claims:['Repository source is separate from the Mainnet contract','Public pages are default-deny and do not broadcast transactions','Expert operation is separated behind explicit human gates'],
      sources:['Canonical address manifest','Public site route map','Legal/Data-Zero boundary','Expert Console transaction posture'],
      baseline:'Prior page mixed explanation and operation in a denser console.',
      riskClass:'medium'
    },
    {
      id:'governed-decision-state',
      title:'Governed decision state',
      claim:'A GoalOS mission should produce a governed decision state rather than a static report: claim matrix, provenance, contradiction register, verifier report, risk ledger, action graph, Chronicle, and capability package.',
      claims:['Decision support requires evidence, not only generated text','Contradictions and risks remain visible','Action only follows review-ready proof'],
      sources:['Mission Contract','Claims Matrix','Verifier Mesh','Risk Ledger','Chronicle Entry'],
      baseline:'Report-only output has weaker replay and action discipline.',
      riskClass:'low'
    },
    {
      id:'multi-agent-institution',
      title:'Multi-agent institution',
      claim:'Large multi-agent systems coordinate better when agent work is bounded, evidenced, validated, remembered, and settled under human review instead of optimized for raw activity.',
      claims:['Bounded jobs reduce vague swarm behavior','Validator gates prevent unsupported propagation','Chronicle memory preserves only accepted work'],
      sources:['Agent roster','Job manifest','ProofBundle summary','SelectionCertificate','Chronicle trace'],
      baseline:'Unstructured swarm with no verifier mesh or settlement memory.',
      riskClass:'medium'
    },
    {
      id:'safety-boundary',
      title:'Safety-boundary claim',
      claim:'A public GoalOS proof page should expose non-claims and safety boundaries: no user data wanted, no analytics, no wallet auto-connect, no token availability from the site, and no production authority without human confirmation.',
      claims:['No intentional user data collection','No investment or token availability posture','No public wallet or Mainnet broadcast surface'],
      sources:['Privacy page','Terms page','AGIALPHA token boundary','Legal shield policy','Final assurance docket'],
      baseline:'A generic demo site without explicit legal, privacy, or authority boundary.',
      riskClass:'high'
    }
  ];
  const gates = [
    ['claimBounded','Claim bounded','Claim is narrow and falsifiable'],
    ['provenance','Source provenance','Public-safe source pointers exist'],
    ['support','Evidence support','Evidence is sufficient for the stated claim'],
    ['contradiction','Contradictions handled','Known alternatives are surfaced'],
    ['risk','Risk classed','Residual risk is visible and bounded'],
    ['replay','Replay path','A reviewer can inspect or rerun the path'],
    ['boundary','Public/private boundary','Private intelligence is not exposed'],
    ['humanReview','Human review','Final authority remains with reviewer']
  ];
  let state = null;
  function clamp(n,min,max){return Math.max(min,Math.min(max,n));}
  function slug(){return 'CBF-'+new Date().toISOString().replace(/[-:.TZ]/g,'').slice(0,14);}
  function currentPreset(){return presets.find(p=>p.id===$('preset').value)||presets[0];}
  function updateSliderLabels(){['provenance','support','contradiction','replay','risk'].forEach(id=>$(id+'Value').textContent=$(id).value);}
  function populate(){
    $('preset').innerHTML = presets.map(p=>`<option value="${p.id}">${p.title}</option>`).join('');
    $('claim').value = presets[0].claim;
    $('preset').addEventListener('change',()=>{$('claim').value=currentPreset().claim; reset(false);});
    ['provenance','support','contradiction','replay','risk'].forEach(id=>$(id).addEventListener('input',updateSliderLabels));
    updateSliderLabels(); renderInitial();
  }
  function score(){
    const p=currentPreset();
    const provenance=+$('provenance').value, support=+$('support').value, contradiction=+$('contradiction').value, replay=+$('replay').value, risk=+$('risk').value;
    const proofIntegrity=Math.round((provenance*.25)+(support*.3)+(contradiction*.15)+(replay*.2)+((100-risk)*.1));
    const publicationReadiness=Math.round((support*.24)+(provenance*.2)+(contradiction*.18)+(replay*.22)+((100-risk)*.16));
    const g={
      claimBounded:$('claim').value.trim().length>60 && $('claim').value.trim().length<900,
      provenance:provenance>=68,
      support:support>=72,
      contradiction:contradiction>=62,
      risk:risk<=48,
      replay:replay>=66,
      boundary:true,
      humanReview:true
    };
    const pass=Object.values(g).filter(Boolean).length;
    let verdict='NEEDS_MORE_EVIDENCE';
    if(pass===8 && proofIntegrity>=76) verdict='PUBLISH_PUBLIC_SAFE_DOCKET';
    if(risk>68) verdict='QUARANTINE_PRIVATE_APPENDIX';
    if(support<40 || provenance<35) verdict='REJECT_STRONG_CLAIM';
    const recommended = verdict==='PUBLISH_PUBLIC_SAFE_DOCKET'?'publish docket for review':verdict==='QUARANTINE_PRIVATE_APPENDIX'?'quarantine and human review':verdict==='REJECT_STRONG_CLAIM'?'reject or restate claim':'gather more evidence';
    return {p,provenance,support,contradiction,replay,risk,proofIntegrity,publicationReadiness,g,pass,fail:8-pass,verdict,recommended,claim:$('claim').value.trim(),id:slug()};
  }
  function run(adversarial=false){
    const s=score();
    if(adversarial){
      s.contradiction=clamp(s.contradiction-18,0,100); s.risk=clamp(s.risk+14,0,100); s.replay=clamp(s.replay-8,0,100);
      s.g.contradiction=s.contradiction>=62; s.g.risk=s.risk<=48; s.g.replay=s.replay>=66;
      s.pass=Object.values(s.g).filter(Boolean).length; s.fail=8-s.pass;
      s.proofIntegrity=Math.round((s.provenance*.25)+(s.support*.3)+(s.contradiction*.15)+(s.replay*.2)+((100-s.risk)*.1));
      s.publicationReadiness=Math.round((s.support*.24)+(s.provenance*.2)+(s.contradiction*.18)+(s.replay*.22)+((100-s.risk)*.16));
      s.verdict=s.risk>68?'QUARANTINE_PRIVATE_APPENDIX':s.pass===8&&s.proofIntegrity>=76?'PUBLISH_PUBLIC_SAFE_DOCKET':'NEEDS_MORE_EVIDENCE';
      s.recommended=s.verdict==='PUBLISH_PUBLIC_SAFE_DOCKET'?'publish docket for review':s.verdict==='QUARANTINE_PRIVATE_APPENDIX'?'quarantine and human review':'gather more evidence';
    }
    state=s; render(s); toast(adversarial?'Adversarial pass completed.':'Verifier Mesh completed.');
  }
  function renderInitial(){
    $('gates').innerHTML=gates.map(([key,title,body])=>`<div class="gate"><b>${title}</b><span>${body}</span></div>`).join('');
    $('claimsMatrix').innerHTML='<li><strong>Awaiting claim.</strong> Choose a preset and run the firewall.</li>';
    $('verifierFindings').innerHTML='<li><strong>Verifier Mesh idle.</strong> No publication decision has been made.</li>';
    $('riskReplay').innerHTML='<li><strong>Risk state pending.</strong> No replay path has been generated.</li>';
    $('chronicle').innerHTML='<li><strong>Created.</strong> Claim Boundary Firewall loaded in local browser session.</li>';
  }
  function render(s){
    $('heroPass').textContent=s.pass; $('heroFail').textContent=s.fail; $('heroDebt').textContent=100-s.publicationReadiness;
    $('proofIntegrity').textContent=s.proofIntegrity+'%'; $('readiness').textContent=s.publicationReadiness+'%';
    $('boundary').textContent=s.g.boundary?'PUBLIC-SAFE':'REVISE'; $('action').textContent=s.recommended;
    const isPass=s.verdict==='PUBLISH_PUBLIC_SAFE_DOCKET', isReject=s.verdict==='REJECT_STRONG_CLAIM'||s.verdict==='QUARANTINE_PRIVATE_APPENDIX';
    $('heroStatus').textContent=isPass?'DOCKET READY':isReject?'HUMAN REVIEW':'MORE EVIDENCE';
    $('verdictBadge').textContent=s.verdict.replaceAll('_',' '); $('verdictBadge').className='ec-verdict '+(isPass?'pass':isReject?'fail':'');
    $('verdictTitle').textContent=isPass?'Docket ready for institutional review.':isReject?'The firewall blocks strong publication.':'More evidence required before publication.';
    $('verdictText').textContent=isPass?'The claim is narrow, evidence-supported, contradiction-aware, risk-classed, replayable, and public/private bounded. Human review remains final.':isReject?'The claim should be restated, quarantined, or rejected before public promotion.':'The system returns to evidence gathering before a strong public claim is allowed.';
    $('gates').innerHTML=gates.map(([key,title,body])=>`<div class="gate ${s.g[key]?'pass':'fail'}"><b>${title}</b><span>${s.g[key]?'PASS · ': 'OPEN · '}${body}</span></div>`).join('');
    document.querySelectorAll('.ec-node').forEach((n,i)=>{const k=['claimBounded','provenance','contradiction','risk','replay','humanReview'][i]; n.classList.toggle('pass',!!s.g[k]); n.classList.toggle('fail',!s.g[k]);});
    $('claimsMatrix').innerHTML=s.p.claims.map((c,i)=>`<li><strong>Claim ${i+1}.</strong> ${escapeHtml(c)}<br><small>Evidence required before strong public use.</small></li>`).join('');
    $('verifierFindings').innerHTML=[
      `<strong>Source provenance:</strong> ${s.provenance}% · ${s.g.provenance?'sufficient':'needs stronger source chain'}`,
      `<strong>Evidence support:</strong> ${s.support}% · ${s.g.support?'supported for demo claim':'insufficient for strong claim'}`,
      `<strong>Contradiction coverage:</strong> ${s.contradiction}% · ${s.g.contradiction?'contradictions surfaced':'unresolved contradiction debt'}`
    ].map(x=>`<li>${x}</li>`).join('');
    $('riskReplay').innerHTML=[
      `<strong>Risk:</strong> ${s.risk}% residual · ${s.g.risk?'within publication corridor':'requires quarantine or human escalation'}`,
      `<strong>Replay:</strong> ${s.replay}% · ${s.g.replay?'review path available':'replay path incomplete'}`,
      `<strong>Boundary:</strong> public summary only; private traces and sensitive materials excluded.`
    ].map(x=>`<li>${x}</li>`).join('');
    const docket=makeDocket(s); $('docketJson').textContent=JSON.stringify(docket,null,2);
    $('chronicle').innerHTML=docket.chronicle.map(e=>`<li><strong>${e.stage}.</strong> ${escapeHtml(e.note)}</li>`).join('');
    $('orbit').classList.add('pulse'); setTimeout(()=>$('orbit').classList.remove('pulse'),800);
  }
  function makeDocket(s){
    return {
      schema:'GoalOS.ClaimBoundaryFirewall.v22',
      docketId:s.id,
      generatedAt:new Date().toISOString(),
      locality:'browser-local demonstration; no network request; no storage; no wallet; no transaction',
      claim:s.claim,
      preset:s.p.id,
      riskClass:s.p.riskClass,
      baseline:s.p.baseline,
      publicPrivateBoundary:{public:['claim summary','gate outcomes','scores','source classes','non-claims','review path'],privateExcluded:['personal data','customer data','private prompts','raw confidential traces','wallet secrets','private keys']},
      claimsMatrix:s.p.claims.map((claim,i)=>({id:`C${i+1}`,claim,evidenceRequired:'public-safe evidence pointer or reproducible demo artifact',status:s.g.support?'supported-for-demo':'insufficient'})),
      sourceProvenance:s.p.sources.map((source,i)=>({id:`S${i+1}`,source,publicSafe:true})),
      gateResults:Object.fromEntries(gates.map(([key,title])=>[key,{label:title,pass:!!s.g[key]}])),
      metrics:{sourceProvenance:s.provenance,evidenceSupport:s.support,contradictionCoverage:s.contradiction,replayReadiness:s.replay,residualRisk:s.risk,proofIntegrity:s.proofIntegrity,publicationReadiness:s.publicationReadiness},
      verdict:s.verdict,
      recommendedAction:s.recommended,
      nonClaims:['No factual certification','No external audit completion','No production activation','No user-data collection','No investment advice','No token availability from this site','No wallet operation','No Mainnet transaction'],
      chronicle:[
        {stage:'Commit',note:'Claim converted into a reviewable GoalOS publication object.'},
        {stage:'Prove',note:'Evidence posture, source classes, contradiction coverage, replay readiness, and risk state were evaluated.'},
        {stage:'Gate',note:`Selection verdict: ${s.verdict.replaceAll('_',' ')}.`},
        {stage:'Boundary',note:'Private intelligence and sensitive data remain outside the public docket.'},
        {stage:'Review',note:'Human review remains the final authority before public reliance or external action.'}
      ]
    };
  }
  function download(){
    const docket=state?makeDocket(state):makeDocket(score());
    const blob=new Blob([JSON.stringify(docket,null,2)],{type:'application/json'});
    const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=(docket.docketId||'claim-boundary-firewall')+'.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); toast('Docket JSON prepared.');
  }
  function copyBrief(){
    const s=state||score();
    const brief=`GoalOS Claim Boundary Firewall: ${s.verdict.replaceAll('_',' ')}. Claim: ${s.claim} Recommended action: ${s.recommended}. Boundary: public-safe demo only; no user data, wallet operation, transaction, factual certification, or external audit claim.`;
    if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(brief).then(()=>toast('Review brief copied.')).catch(()=>fallbackCopy(brief)); else fallbackCopy(brief);
  }
  function fallbackCopy(text){const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();toast('Review brief copied.');}
  function reset(show=true){state=null; $('verdictTitle').textContent='Awaiting docket review.'; $('verdictText').textContent='Run the firewall to see whether the claim can be published, quarantined, revised, or rejected.'; $('verdictBadge').textContent='PENDING'; $('verdictBadge').className='ec-verdict'; $('heroStatus').textContent='AWAITING CLAIM'; $('heroPass').textContent='0'; $('heroFail').textContent='8'; $('heroDebt').textContent='64'; $('proofIntegrity').textContent='—'; $('readiness').textContent='—'; $('boundary').textContent='—'; $('action').textContent='—'; document.querySelectorAll('.ec-node').forEach(n=>n.classList.remove('pass','fail')); $('docketJson').textContent='Run the Verifier Mesh to generate a docket.'; renderInitial(); if(show) toast('Firewall reset.');}
  function escapeHtml(s){return String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function toast(msg){const old=document.querySelector('.toast'); if(old) old.remove(); const d=document.createElement('div'); d.className='toast'; d.textContent=msg; document.body.appendChild(d); setTimeout(()=>d.remove(),2600);}
  function particles(){
    const canvas=$('ascendField'); if(!canvas) return; const ctx=canvas.getContext('2d'); let w,h,dots=[];
    function resize(){w=canvas.width=innerWidth*devicePixelRatio;h=canvas.height=innerHeight*devicePixelRatio;dots=Array.from({length:90},()=>({x:Math.random()*w,y:Math.random()*h,r:(Math.random()*1.9+0.6)*devicePixelRatio,v:(Math.random()*0.42+0.16)*devicePixelRatio,a:Math.random()*0.55+0.18,hue:Math.random()<.75?170:48}));}
    function tick(){ctx.clearRect(0,0,w,h);for(const d of dots){d.y-=d.v;d.x+=Math.sin((d.y+d.r)*0.006)*0.22*devicePixelRatio;if(d.y<-30){d.y=h+30;d.x=Math.random()*w;}ctx.beginPath();ctx.fillStyle=`hsla(${d.hue},95%,70%,${d.a})`;ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();ctx.beginPath();ctx.strokeStyle=`hsla(${d.hue},95%,70%,${d.a*.18})`;ctx.moveTo(d.x,d.y+d.r*8);ctx.lineTo(d.x,d.y+d.r*22);ctx.stroke();}requestAnimationFrame(tick);}
    addEventListener('resize',resize,{passive:true});resize();tick();
  }
  document.addEventListener('DOMContentLoaded',()=>{populate();particles();$('runCourt').addEventListener('click',()=>run(false));$('quickRunTop').addEventListener('click',()=>run(false));$('adversarialPass').addEventListener('click',()=>run(true));$('resetCourt').addEventListener('click',()=>reset(true));$('downloadDocket').addEventListener('click',download);$('copyBrief').addEventListener('click',copyBrief);});
})();
