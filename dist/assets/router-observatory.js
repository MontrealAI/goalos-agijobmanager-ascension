const controls=[
  ["evidenceDensity","Evidence density",72], ["taskSeparability","Task separability",62], ["validatorAvailability","Validator availability",78], ["auditabilityNeed","Auditability need",68], ["costPressure","Cost pressure",44], ["riskPressure","Risk pressure",38], ["toolComplexity","Tool complexity",52], ["replayReadiness","Replay readiness",70]
];
const routers=[
  {id:"R0",name:"Heuristic Hamiltonian baseline",best:"auditability and sparse evidence",contract:"transparent fallback; strong for auditors and deterministic replay"},
  {id:"R1",name:"Natural-language workflow router",best:"open-ended decomposition",contract:"role graph, subtasks, access graph, worker calls"},
  {id:"R2",name:"Evidence-state lightweight router",best:"high-volume structured tasks",contract:"compact evidence-state features to agent-role-tool-validator choices"},
  {id:"R3",name:"Evolutionary coordinator",best:"sparse terminal validator rewards",contract:"derivative-free search over routing parameters"},
  {id:"R4",name:"Reinforcement-learned coordinator",best:"stable domains with many validated episodes",contract:"long-horizon tool/cost/risk tradeoff learning"},
  {id:"R5",name:"Hybrid proof-conditioned router",best:"mixed, high-value, or high-risk work",contract:"selects R0-R4 by task, cost, risk, validators, and evidence density"}
];
const sliderBox=document.getElementById('sliders');
const values={};
for(const [id,label,val] of controls){values[id]=val;const el=document.createElement('div');el.className='slider';el.innerHTML=`<div class="row"><span>${label}</span><strong id="${id}Val">${val}</strong></div><input id="${id}" type="range" min="0" max="100" value="${val}" aria-label="${label}">`;sliderBox.appendChild(el);}
const ladder=document.getElementById('routerLadder');
routers.forEach(r=>{const div=document.createElement('div');div.className='router-item';div.innerHTML=`<b>${r.id}</b> · ${r.name}<br><small>${r.best}</small>`;ladder.appendChild(div);});
const state={stress:false,receipt:null};
function value(id){return Number(document.getElementById(id).value)}
function clamp(n){return Math.max(0,Math.min(100,n))}
function route(){
  for(const [id] of controls){values[id]=value(id);document.getElementById(id+'Val').textContent=values[id];}
  const family=document.getElementById('taskFamily').value;
  const riskClass=document.getElementById('riskClass').value;
  const objective=document.getElementById('objective').value.trim()||'Public-safe proof-conditioned routing mission.';
  let chosen='R0';
  if(values.evidenceDensity>70 && values.taskSeparability>68 && values.costPressure>55) chosen='R2';
  if(values.taskSeparability<45 && values.toolComplexity>52) chosen='R1';
  if(values.validatorAvailability<45 || values.evidenceDensity<45) chosen='R0';
  if(values.evidenceDensity>65 && values.validatorAvailability>70 && values.toolComplexity>68 && values.riskPressure<55) chosen='R3';
  if(values.evidenceDensity>82 && values.replayReadiness>80 && values.riskPressure<45 && values.costPressure<60) chosen='R4';
  if(riskClass==='high' || values.riskPressure>64 || state.stress || (values.toolComplexity>72 && values.auditabilityNeed>66)) chosen='R5';
  const router=routers.find(r=>r.id===chosen);
  const proofScore=(values.evidenceDensity+values.validatorAvailability+values.replayReadiness+values.auditabilityNeed)/4;
  const risk=(values.riskPressure+values.toolComplexity+(state.stress?22:0))/3;
  const overhead=(100-values.taskSeparability+values.toolComplexity+values.costPressure)/3;
  const verified=clamp(62 + proofScore*.24 - risk*.18 - overhead*.08);
  const gates=[
    ['Proof bundle required', proofScore>=58], ['Validator set assigned', values.validatorAvailability>=52], ['Tool scope bounded', values.toolComplexity<=82 || chosen==='R5'], ['Replay path exists', values.replayReadiness>=55], ['Risk within routing budget', risk<68], ['Stopping rule explicit', true], ['Escalation rule explicit', values.auditabilityNeed>=35], ['Public/private boundary preserved', true]
  ];
  const pass=gates.every(g=>g[1]);
  const disposition=pass?`${chosen}_ROUTE_READY_FOR_HUMAN_REVIEW`:`${chosen}_HELD_FOR_MORE_PROOF`;
  const roles = chosen==='R0' ? ['Planner','Worker','Verifier'] : chosen==='R1' ? ['Planner','Retriever','Worker','Verifier','Reviewer'] : chosen==='R2' ? ['Router','Worker','Verifier','Memory'] : chosen==='R3' ? ['Coordinator','Variant worker','Verifier','Red team','Archive'] : chosen==='R4' ? ['Policy router','Worker','Verifier','Reward ledger','Replay'] : ['Hybrid router','Planner','Worker','Verifier','Risk reviewer','Human reviewer'];
  const receipt={
    object:'GoalOSProofConditionedRoutingReceipt', version:'v30', disposition, productionAuthority:false, publicSafe:true,
    mission:{family,riskClass,auditMode:document.getElementById('auditMode').value,objective},
    router:{id:chosen,name:router.name,bestUse:router.best,contract:router.contract},
    selectedRoles:roles,
    accessGraph:{tools:'bounded read-only / sandbox-first demo tools', externalActions:0, walletConnection:false, networkRequests:false},
    validators:['schema','proof-bundle','policy-boundary','replay','risk','human-review'],
    gates:Object.fromEntries(gates),
    metrics:{verifiedWork:Number((verified/100).toFixed(2)),risk:Number((risk/100).toFixed(2)),coordinationOverhead:Number((overhead/100).toFixed(2)),proofScore:Number((proofScore/100).toFixed(2))},
    stoppingRule:'stop when evidence docket, validator report, risk ledger, action graph, and human-review boundary are complete',
    escalationRule:'escalate if proof is missing, replay fails, risk exceeds budget, tool scope expands, or private data boundary is uncertain',
    claimBoundary:'local demonstration only; no user data wanted; no wallet; no transaction; no empirical SOTA claim',
    generatedAt:new Date().toISOString()
  };
  state.receipt=receipt;
  document.getElementById('routerName').textContent=`${chosen} · ${router.name}`;
  document.getElementById('verifiedWork').textContent=receipt.metrics.verifiedWork.toFixed(2);
  document.getElementById('riskScore').textContent=receipt.metrics.risk.toFixed(2);
  document.getElementById('coordinationCost').textContent=receipt.metrics.coordinationOverhead.toFixed(2);
  document.getElementById('decision').textContent=disposition.replaceAll('_',' ');
  document.getElementById('gateList').innerHTML=gates.map(([name,ok])=>`<div class="gate ${ok?'pass':'fail'}"><span>${name}</span><b>${ok?'PASS':'HOLD'}</b></div>`).join('');
  document.getElementById('routerReceipt').textContent=JSON.stringify(receipt,null,2);
  document.getElementById('chronicle').innerHTML=[
    `Mission manifest sealed for ${family}.`,
    `${chosen} selected because evidence=${values.evidenceDensity}, separability=${values.taskSeparability}, validators=${values.validatorAvailability}, risk=${Math.round(risk)}.`,
    `Role contracts issued: ${roles.join(' → ')}.`,
    `${gates.filter(g=>g[1]).length}/${gates.length} gates passed; disposition ${disposition}.`,
    `Human review remains final authority. No external action occurred.`
  ].map(x=>`<li>${x}</li>`).join('');
}
function download(){ if(!state.receipt) route(); const blob=new Blob([JSON.stringify(state.receipt,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='goalos-proof-conditioned-routing-receipt-v30.json'; a.click(); URL.revokeObjectURL(a.href); }
document.getElementById('runRouter').addEventListener('click',()=>{state.stress=false;route();});
document.getElementById('stressRouter').addEventListener('click',()=>{state.stress=true;route();});
document.getElementById('downloadReceipt').addEventListener('click',download);
for(const [id] of controls) document.getElementById(id).addEventListener('input',route);
route();
const canvas=document.getElementById('routerStars'),ctx=canvas.getContext('2d');let dots=[];
function resize(){canvas.width=innerWidth;canvas.height=innerHeight;dots=Array.from({length:95},()=>({x:Math.random()*canvas.width,y:Math.random()*canvas.height,v:.22+Math.random()*.88,r:Math.random()*1.7+.35,a:Math.random()*.65+.15}));}
function draw(){ctx.clearRect(0,0,canvas.width,canvas.height);for(const d of dots){d.y-=d.v;if(d.y<-20){d.y=canvas.height+20;d.x=Math.random()*canvas.width;}ctx.beginPath();ctx.fillStyle=`rgba(${100+Math.random()*80},255,220,${d.a})`;ctx.shadowColor='rgba(101,255,212,.8)';ctx.shadowBlur=10;ctx.arc(d.x,d.y,d.r,0,Math.PI*2);ctx.fill();}requestAnimationFrame(draw)}
if(!matchMedia('(prefers-reduced-motion: reduce)').matches){resize();addEventListener('resize',resize);draw();}
