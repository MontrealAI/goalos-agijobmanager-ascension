(function(){
  'use strict';
  const $ = id => document.getElementById(id);
  const clamp = (n,min=0,max=100)=>Math.max(min,Math.min(max,n));
  const inflows = [
    ['compute','Compute','Search, simulation, execution, verification throughput.'],
    ['data','Data','Fresh, provenance-bound information that keeps work grounded.'],
    ['tasks','Tasks','External gradients with success criteria and stop conditions.'],
    ['incentives','Incentives','Selection pressure for useful verified contribution.'],
    ['feedback','Feedback','Validator, red-team, test, incident, and delayed-outcome signals.'],
    ['governance','Governance','Policy, permissions, review, rollback, and legal/safety boundaries.'],
    ['tools','Tools','Actuation channels that turn plans into external work and external risk.']
  ];
  const scenarios = {
    balanced:{compute:72,data:78,tasks:76,incentives:66,feedback:84,governance:88,tools:58},
    overheated:{compute:96,data:54,tasks:94,incentives:92,feedback:38,governance:34,tools:88},
    stale:{compute:66,data:24,tasks:42,incentives:45,feedback:22,governance:72,tools:39},
    ungoverned:{compute:86,data:70,tasks:82,incentives:88,feedback:44,governance:18,tools:95},
    bureaucratic:{compute:42,data:64,tasks:36,incentives:28,feedback:72,governance:98,tools:24}
  };
  const state = {...scenarios.balanced};
  let history = [];
  function initSliders(){
    const box = $('sliders');
    box.innerHTML = inflows.map(([key,name,desc])=>`<div class="slider-card"><label for="${key}"><span>${name}</span><b id="${key}Value">${state[key]}</b></label><small>${desc}</small><input id="${key}" min="0" max="100" value="${state[key]}" type="range" aria-label="${name} inflow"></div>`).join('');
    inflows.forEach(([key])=>$(key).addEventListener('input', e=>{state[key]=Number(e.target.value); update(false);}));
  }
  function metrics(){
    const c=state.compute,d=state.data,t=state.tasks,i=state.incentives,f=state.feedback,g=state.governance,tools=state.tools;
    const rawOutput = clamp(.28*c+.15*d+.18*t+.12*i+.1*f+.05*g+.22*tools,0,100);
    const proof = clamp(.18*d+.28*f+.34*g+.12*t+.08*c,0,100);
    const validation = clamp(.42*f+.34*g+.14*d+.1*t,0,100);
    const settlement = clamp(.28*i+.3*validation+.26*g+.16*proof,0,100);
    const reuse = clamp(.32*proof+.24*validation+.24*f+.2*d,0,100);
    const risk = clamp(8 + .34*tools + .2*i + .12*c + .1*t - .32*g - .18*f - .08*d,0,100);
    const proofDebt = clamp(rawOutput - proof + Math.max(0,risk-45)*.4 + Math.max(0,tools-g)*.25,0,100);
    const entropy = clamp(.22*c+.16*t+.18*i+.2*tools+.1*d-.08*g+.14*(100-Math.abs(g-70)),0,100);
    const entropyPenalty = Math.abs(entropy-56)*.55;
    const trusted = clamp(rawOutput*(proof/100)*(validation/100)*(settlement/100)*(reuse/100),0,100);
    const verified = clamp((trusted*2.15) - risk*.25 - proofDebt*.28 - entropyPenalty*.18 + 32,0,100);
    let regime = 'NEEDS_REBALANCE', seal='seal-warn', phrase='The institution has useful activity, but proof, risk, feedback, or entropy is outside the ideal band.';
    if(c<22||t<22){regime='INERT_QUEUE'; seal='seal-fail'; phrase='The system lacks enough compute or task gradient to organize into verified work.';}
    else if(d<32||f<32){regime='STALE_SELF_REFERENCE'; seal='seal-fail'; phrase='Data or feedback is too weak. The system may keep producing output while verified value decays.';}
    else if(g<35&&tools>68){regime='UNGOVERNED_ACTUATION'; seal='seal-fail'; phrase='Tool access outruns governance. External action must not move faster than proof, scope, and rollback.';}
    else if(entropy>78&&risk>38){regime='CHAOTIC_SWARM'; seal='seal-fail'; phrase='Activity is high, but coordination entropy and risk have moved beyond proof control.';}
    else if(g>92&&c<55&&t<55){regime='BUREAUCRATIC_STALL'; seal='seal-warn'; phrase='Governance is high but the work gradient is too weak. Review exists, but not enough verified production.';}
    else if(verified>72&&risk<25&&proofDebt<24&&entropy>35&&entropy<74){regime='SUSTAINED_ASCENSION'; seal='seal-pass'; phrase='The institution is producing verified work while keeping risk, proof debt, and entropy inside the governed band.';}
    return {rawOutput,proof,validation,settlement,reuse,risk,proofDebt,entropy,verified,regime,seal,phrase};
  }
  function update(animated){
    inflows.forEach(([key])=>{ if($(key)){ $(key+'Value').textContent = state[key]; if($(key).value != state[key]) $(key).value = state[key]; }});
    const m=metrics();
    $('regimeTitle').textContent=m.regime;
    $('proofSeal').className = m.seal;
    $('proofSeal').textContent = m.seal==='seal-pass' ? 'PROOF-GATED' : (m.seal==='seal-fail' ? 'HARD-STOP' : 'REVIEW');
    $('verifiedMetric').textContent=Math.round(m.verified);
    $('riskMetric').textContent=Math.round(m.risk);
    $('debtMetric').textContent=Math.round(m.proofDebt);
    $('entropyMetric').textContent=Math.round(m.entropy);
    $('diagnosis').textContent=m.phrase;
    if(!history.length || !animated) simulate(40,false);
    drawChart();
    renderTrace();
    renderDocket();
  }
  function simulate(n=40, drift=true){
    history=[];
    let local={...state};
    for(let step=1; step<=n; step++){
      const old={...state};
      Object.assign(state,local);
      const m=metrics();
      history.push({step,verified:m.verified,risk:m.risk,debt:m.proofDebt,entropy:m.entropy,regime:m.regime});
      Object.assign(state,old);
      if(drift){
        const correction = m.regime==='SUSTAINED_ASCENSION'?0:1;
        local.feedback=clamp(local.feedback + correction*1.5 - Math.max(0,local.feedback-86)*.06);
        local.governance=clamp(local.governance + correction*1.25 - Math.max(0,local.governance-92)*.07);
        local.tools=clamp(local.tools - (m.risk>45?1.4:0) + (m.verified>78?.25:0));
        local.data=clamp(local.data + (m.regime==='STALE_SELF_REFERENCE'?2.2:.2));
        local.compute=clamp(local.compute + (m.regime==='INERT_QUEUE'?1.6:0));
      }
    }
    $('cycleCount').textContent=`${n} cycles`;
  }
  function drawChart(){
    const cv=$('stateCanvas'), ctx=cv.getContext('2d'), W=cv.width,H=cv.height;
    ctx.clearRect(0,0,W,H);
    const grad=ctx.createLinearGradient(0,0,W,H); grad.addColorStop(0,'rgba(93,248,223,.12)'); grad.addColorStop(1,'rgba(169,140,255,.08)'); ctx.fillStyle=grad; ctx.fillRect(0,0,W,H);
    ctx.strokeStyle='rgba(255,255,255,.08)'; ctx.lineWidth=1;
    for(let x=0;x<W;x+=62){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,H);ctx.stroke();}
    for(let y=0;y<H;y+=45){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(W,y);ctx.stroke();}
    const series=[['verified','#5df8df','Verified work'],['risk','#ff7cab','Risk'],['debt','#ffe989','Proof debt'],['entropy','#86b7ff','Entropy']];
    series.forEach(([key,color])=>{
      ctx.beginPath(); ctx.strokeStyle=color; ctx.lineWidth=key==='verified'?4:2.2;
      history.forEach((p,idx)=>{const x=30+idx*(W-60)/Math.max(1,history.length-1); const y=H-26-(p[key]/100)*(H-60); if(idx)ctx.lineTo(x,y); else ctx.moveTo(x,y);});
      ctx.stroke();
    });
    ctx.font='700 12px ui-sans-serif,system-ui';
    series.forEach(([,,label],i)=>{ctx.fillStyle=series[i][1];ctx.fillText(label,22+i*126,24);});
  }
  function renderTrace(){
    const m=metrics();
    const trace=[
      ['COMMIT',`Inflow vector committed: C${state.compute}/D${state.data}/T${state.tasks}/I${state.incentives}/F${state.feedback}/G${state.governance}/Tools${state.tools}.`],
      ['EVALUATE',`Verified work index ${Math.round(m.verified)}; risk ${Math.round(m.risk)}; proof debt ${Math.round(m.proofDebt)}; entropy ${Math.round(m.entropy)}.`],
      ['REGIME',`${m.regime}: ${m.phrase}`],
      ['BOUNDARY','No external action. No wallet. No data collection. Public-safe demonstration docket only.'],
      ['DECISION',m.regime==='SUSTAINED_ASCENSION'?'Human review can inspect the docket; no production authority is granted.':'Human review should rebalance inflows before any stronger claim.']
    ];
    $('trace').innerHTML=trace.map(([k,v],idx)=>`<li><code>${String(idx+1).padStart(2,'0')} · ${k}</code><span>${v}</span></li>`).join('');
  }
  function docket(){
    const m=metrics();
    return {
      docket:'GoalOS Ascension Inflow Control Room',
      version:'v21-public-demo',
      status:'PUBLIC_SAFE_SIMULATION',
      claim:'Regulated inflow plus proof gates can sustain higher trusted work than raw ungoverned activity in this browser-local demonstration.',
      nonClaims:['not factual certification','not external audit','not investment advice','not legal advice','not wallet operation','not Mainnet transaction','not production authority'],
      inflows:{...state},
      metrics:{verifiedWork:Math.round(m.verified),risk:Math.round(m.risk),proofDebt:Math.round(m.proofDebt),productiveEntropy:Math.round(m.entropy),proofIntegrity:Math.round(m.proof),validation:Math.round(m.validation),settlement:Math.round(m.settlement),reuse:Math.round(m.reuse)},
      regime:m.regime,
      boundary:{noAccount:true,noCookies:true,noAnalytics:true,noStorage:true,noWallet:true,noNetwork:true,noTokenRoute:true,noTransaction:true,noUserDataWanted:true},
      protocolObjects:['GoalOSCommit','RunCommitment','ProofPacket','EvalAttestation','SelectionCertificate','ChronicleEntry','EvidenceDocket'],
      review:'HUMAN_REVIEW_REQUIRED',
      generatedAt:new Date().toISOString()
    };
  }
  function renderDocket(){ $('docketPreview').textContent=JSON.stringify(docket(),null,2); }
  function download(name,text,type='application/json'){
    const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([text],{type})); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},300);
  }
  function copyText(text){ navigator.clipboard && navigator.clipboard.writeText(text); }
  function field(){
    const cv=$('inflowField'),ctx=cv.getContext('2d'); let w,h,dots=[];
    function resize(){w=cv.width=innerWidth*devicePixelRatio;h=cv.height=innerHeight*devicePixelRatio;dots=Array.from({length:Math.min(120,Math.floor(innerWidth/12))},()=>({x:Math.random()*w,y:Math.random()*h,v:(.25+Math.random()*.75)*devicePixelRatio,r:(1+Math.random()*2.4)*devicePixelRatio,a:.25+Math.random()*.55}));}
    function tick(){ctx.clearRect(0,0,w,h); for(const d of dots){d.y-=d.v; if(d.y<0){d.y=h+20;d.x=Math.random()*w;} ctx.beginPath(); ctx.fillStyle=`rgba(93,248,223,${d.a})`; ctx.arc(d.x,d.y,d.r,0,Math.PI*2); ctx.fill(); ctx.beginPath(); ctx.strokeStyle=`rgba(93,248,223,${d.a*.22})`; ctx.moveTo(d.x,d.y+d.r*6);ctx.lineTo(d.x,d.y+d.r*18);ctx.stroke();} requestAnimationFrame(tick);} resize(); addEventListener('resize',resize); tick();
  }
  document.querySelectorAll('[data-scenario]').forEach(b=>b.addEventListener('click',()=>{Object.assign(state,scenarios[b.dataset.scenario]); update(true);}));
  $('runCycle').addEventListener('click',()=>{simulate(40,true); update(true);});
  $('runBalanced').addEventListener('click',()=>{Object.assign(state,scenarios.balanced); simulate(40,true); update(true);});
  $('runStress').addEventListener('click',()=>{Object.assign(state,scenarios.ungoverned); simulate(40,true); update(true);});
  $('downloadDocket').addEventListener('click',()=>download('goalos-ascension-inflow-docket-v21.json',JSON.stringify(docket(),null,2)));
  $('copyBrief').addEventListener('click',()=>{const m=metrics(); copyText(`GoalOS Ascension Inflow Control Room: ${m.regime}. Verified work ${Math.round(m.verified)}, risk ${Math.round(m.risk)}, proof debt ${Math.round(m.proofDebt)}, productive entropy ${Math.round(m.entropy)}. Public-safe browser-local demo only; no wallet, no user data, no network request, no production authority.`);});
  initSliders(); field(); simulate(40,false); update(false);
})();
