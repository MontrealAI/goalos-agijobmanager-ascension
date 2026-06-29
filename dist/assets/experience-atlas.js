const demos = [
  {title:'Start here',href:'start.html',cat:'Start',level:'Beginner',time:'2 min',desc:'A friendly first path for normal users.'},
  {title:'Ascension Flight Deck',href:'ascension-flight-deck.html',cat:'Start',level:'All users',time:'5 min',desc:'Guided journeys, preview frame, audience filters, and JourneyReceipt export.'},
  {title:'Demo Lab',href:'demo-lab.html',cat:'Start',level:'Beginner',time:'4 min',desc:'Run autonomous local proof flights and export public-safe dockets.'},
  {title:'Mission Studio',href:'mission-studio.html',cat:'Start',level:'All users',time:'4 min',desc:'Compose a public-safe objective into a local proof pack.'},
  {title:'Proof Cards',href:'proof-cards.html',cat:'Start',level:'All users',time:'2 min',desc:'Stakeholder-ready copy cards for the core doctrine.'},
  {title:'Proof-to-Action Theatre',href:'proof-to-action-theatre.html',cat:'Proof loop',level:'All users',time:'4 min',desc:'Objective becomes proof, then governed decision state.'},
  {title:'Until-DONE Mission Control',href:'until-done-mission-control.html',cat:'Proof loop',level:'All users',time:'5 min',desc:'The mission loops until evidence, risk, action, and Chronicle gates are complete.'},
  {title:'Trust Equation Simulator',href:'trust-equation-simulator.html',cat:'Proof loop',level:'All users',time:'4 min',desc:'Watch trusted work collapse when proof is zero.'},
  {title:'Evidence Docket Composer',href:'evidence-docket-composer.html',cat:'Proof loop',level:'All users',time:'5 min',desc:'Build the evidence room before promoting a claim.'},
  {title:'Proof Constitution Simulator',href:'proof-constitution-simulator.html',cat:'Proof loop',level:'Advanced',time:'5 min',desc:'Aim, Act, Prove, Evolve as an interactive object lifecycle.'},
  {title:'Proof Gradient Arena',href:'proof-gradient-arena.html',cat:'Selection',level:'All users',time:'5 min',desc:'A high score cannot bypass hard gates.'},
  {title:'Claim Boundary Firewall',href:'claim-boundary-firewall.html',cat:'Selection',level:'All users',time:'4 min',desc:'Strong claims must survive evidence boundaries.'},
  {title:'Replay & Falsification Gauntlet',href:'replay-falsification-gauntlet.html',cat:'Selection',level:'Advanced',time:'6 min',desc:'Challenge proof through replay, adversarial probes, and falsification.'},
  {title:'Real-Task Benchmark Bridge',href:'real-task-benchmark-bridge.html',cat:'Selection',level:'Advanced',time:'5 min',desc:'Public claims move through baselines, tasks, replay, and benchmark dockets.'},
  {title:'Chronicle Compounding Lab',href:'chronicle-compounding-lab.html',cat:'Compounding',level:'All users',time:'5 min',desc:'Proof-cleared work becomes Chronicle memory and reusable capability.'},
  {title:'Sovereign Experience Stream',href:'sovereign-experience-stream.html',cat:'Compounding',level:'Advanced',time:'5 min',desc:'Validated experience becomes governed learning and policy update candidates.'},
  {title:'Proof-Backed Upgrade Foundry',href:'proof-backed-upgrade-foundry.html',cat:'Compounding',level:'Advanced',time:'5 min',desc:'Artifacts earn canary and rollback-ready upgrade rights.'},
  {title:'Artifact Passport',href:'proof-carrying-artifact-passport.html',cat:'Compounding',level:'Advanced',time:'5 min',desc:'Reusable capability travels with provenance, proof, scope, and rollback.'},
  {title:'Ascension Inflow Control',href:'ascension-inflow-control.html',cat:'System control',level:'All users',time:'5 min',desc:'Tune the inflows that keep an institution productive without overheating.'},
  {title:'Router Observatory',href:'proof-conditioned-router-observatory.html',cat:'System control',level:'Advanced',time:'6 min',desc:'Select the smallest sufficient validator-bound constellation.'},
  {title:'Multi-Agent Institution',href:'multi-agent-institution.html',cat:'System control',level:'All users',time:'5 min',desc:'A swarm becomes an institution when proof decides what survives.'},
  {title:'Coordination Lab',href:'coordination-lab.html',cat:'System control',level:'Advanced',time:'5 min',desc:'Browser-local proof-governed coordination lab.'},
  {title:'Advanced Coordination Engine',href:'coordination-engine.html',cat:'System control',level:'Advanced',time:'7 min',desc:'Advanced machine-readable engine for proof-governed coordination.'},
  {title:'Proof-Settlement Lifecycle',href:'proof-settlement-lifecycle.html',cat:'Settlement',level:'All users',time:'5 min',desc:'Request, Escrow, Execute, Proof, Validate, Settle, Chronicle.'},
  {title:'MandateEpoch Clearinghouse',href:'mandate-epoch-clearinghouse.html',cat:'Settlement',level:'Advanced',time:'5 min',desc:'Batch many proof receipts into challengeable settlement roots.'},
  {title:'Action Graph Handoff',href:'action-graph-handoff.html',cat:'Settlement',level:'Advanced',time:'5 min',desc:'Governed decision state becomes scoped, rollback-ready action.'},
  {title:'Settlement Chamber',href:'operator-console.html',cat:'Operate',level:'Operator',time:'4 min',desc:'Read-only public chamber for mission intent and unsigned docket export.'},
  {title:'Expert Console',href:'expert-console.html',cat:'Operate',level:'Expert',time:'4 min',desc:'Separated expert surface for bounded operator review.'},
  {title:'Expert Mainnet Console',href:'expert-mainnet-console.html',cat:'Operate',level:'Expert',time:'8 min',desc:'Separated human-signed wallet operations only.'},
  {title:'Evidence Docket',href:'evidence/',cat:'Evidence',level:'All users',time:'3 min',desc:'Public proof room and Evidence Docket posture.'},
  {title:'Architecture',href:'architecture.html',cat:'Evidence',level:'All users',time:'4 min',desc:'Separation of contract, website, evidence, expert console, and authority.'},
  {title:'Verification',href:'verification.html',cat:'Evidence',level:'All users',time:'3 min',desc:'Canonical identities, QA, production URL, and publish boundary.'},
  {title:'Assurance',href:'assurance.html',cat:'Evidence',level:'Advanced',time:'4 min',desc:'Assurance docket, capability contract, and boundary checks.'},
  {title:'Sovereign Machine Economy',href:'sovereign-machine-economy.html',cat:'Evidence',level:'Advanced',time:'5 min',desc:'Shared implementation contract across machine-work surfaces.'},
  {title:'Legal Boundary',href:'legal.html',cat:'Boundary',level:'All users',time:'2 min',desc:'Data-zero, no-advice, no-custody, no-user-data posture.'},
  {title:'Privacy',href:'privacy.html',cat:'Boundary',level:'All users',time:'2 min',desc:'No accounts, no cookies, no analytics, no intentional user-data collection.'},
  {title:'Terms',href:'terms.html',cat:'Boundary',level:'All users',time:'2 min',desc:'Terms and third-party responsibility.'},
  {title:'Regulatory Boundary',href:'regulatory-boundary.html',cat:'Boundary',level:'All users',time:'3 min',desc:'Investment, legal, tax, financial, and audit boundary.'},
  {title:'Third-Party Responsibility',href:'third-party-responsibility.html',cat:'Boundary',level:'All users',time:'2 min',desc:'Wallets, RPCs, markets, and compliance remain third-party/operator responsibility.'},
  {title:'AGIALPHA Boundary',href:'agialpha-token-boundary.html',cat:'Boundary',level:'All users',time:'2 min',desc:'AGIALPHA is pre-existing, decentralized, third-party market only, and not available from this site.'}
];
let cat='All';
const library=document.querySelector('#library'), search=document.querySelector('#search'), empty=document.querySelector('#empty');
if(!library || !search || !empty){ throw new Error('Experience Atlas controls missing'); }
const cats=['All',...Array.from(new Set(demos.map(d=>d.cat)))];
const filters=document.querySelector('#filters');
filters.innerHTML=cats.map((c,i)=>`<button class="filter ${i===0?'active':''}" type="button" data-cat="${c}">${c}</button>`).join('');
function render(){const q=(search.value||'').toLowerCase().trim();const shown=demos.filter(d=>(cat==='All'||d.cat===cat)&&(!q||`${d.title} ${d.cat} ${d.level} ${d.desc}`.toLowerCase().includes(q)));library.innerHTML=shown.map(d=>`<a class="demo-card" href="${d.href}"><div class="cat">${d.cat}</div><h3>${d.title}</h3><p>${d.desc}</p><div class="meta"><span>${d.level}</span><span>${d.time}</span></div></a>`).join('');empty.classList.toggle('show',shown.length===0);}
filters.querySelectorAll('.filter').forEach(b=>b.addEventListener('click',()=>{cat=b.dataset.cat;filters.querySelectorAll('.filter').forEach(x=>x.classList.remove('active'));b.classList.add('active');render();}));
search.addEventListener('input',render);render();
document.querySelector('#copyAtlas').addEventListener('click',async()=>{const text=`GoalOS AGIJobManager Ascension Experience Atlas\n${location.href}\n\nBest path: Flight Deck → Proof-to-Action → Evidence Docket → Settlement Lifecycle → Legal Boundary`;try{await navigator.clipboard.writeText(text);document.querySelector('#copyAtlas').textContent='Copied';setTimeout(()=>document.querySelector('#copyAtlas').textContent='Copy atlas brief',1200);}catch{document.querySelector('#copyAtlas').textContent='Copy failed';setTimeout(()=>document.querySelector('#copyAtlas').textContent='Copy atlas brief',1200);}});
document.querySelector('#downloadAtlas').addEventListener('click',()=>{const blob=new Blob([JSON.stringify({receiptType:'GoalOSExperienceAtlasReceipt',generatedAt:new Date().toISOString(),site:'GoalOS AGIJobManager Ascension',posture:['browser-local','public-safe','no-account','no-wallet','no-user-data-wanted'],routes:demos},null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='goalos-agijobmanager-experience-atlas.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000);});
