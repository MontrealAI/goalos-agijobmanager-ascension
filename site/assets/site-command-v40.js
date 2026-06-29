(()=>{
  const CATALOG = [
    {title:'Home',href:'index.html',group:'Start here',why:'The public front door: identity, posture, and the proof-settlement institution.'},
    {title:'Experience Concierge',href:'experience-concierge.html',group:'Start here',why:'Friendly guide that launches the right GoalOS demonstration.'},
    {title:'Experience Hub',href:'experience-hub.html',group:'Start here',why:'The clean public front door for all user paths.'},
    {title:'Command Center',href:'command-center.html',group:'Start here',why:'Complete catalog and route map.'},
    {title:'Ascension Flight Deck',href:'ascension-flight-deck.html',group:'Start here',why:'Guided journeys and same-origin preview for the best demonstrations.'},
    {title:'Trust Equation Simulator',href:'trust-equation-simulator.html',group:'Core idea',why:'Proof, validation, settlement, and reuse turn output into trusted work.'},
    {title:'Until-DONE Mission Control',href:'until-done-mission-control.html',group:'Core idea',why:'Objective → Mission Contract → Evidence Docket → Governed Decision State → DONE.'},
    {title:'Proof-to-Action Theatre',href:'proof-to-action-theatre.html',group:'Core idea',why:'The shortest demonstration of output becoming proof-backed decision state.'},
    {title:'Proof Gradient Arena',href:'proof-gradient-arena.html',group:'Core idea',why:'Score is advisory; gates are mandatory.'},
    {title:'Evidence Docket Composer',href:'evidence-docket-composer.html',group:'Evidence & claims',why:'Build the proof room before the claim.'},
    {title:'Claim Boundary Firewall',href:'claim-boundary-firewall.html',group:'Evidence & claims',why:'Promote, revise, quarantine, or reject claims based on evidence.'},
    {title:'Replay & Falsification Gauntlet',href:'replay-falsification-gauntlet.html',group:'Evidence & claims',why:'Challenge, replay, and falsify before stronger claims advance.'},
    {title:'Evidence Room',href:'evidence/',group:'Evidence & claims',why:'Public-safe Evidence Docket and review surfaces.'},
    {title:'Proof Constitution Simulator',href:'proof-constitution-simulator.html',group:'Protocol & gates',why:'Aim → Act → Prove → Evolve as an interactive constitutional workbench.'},
    {title:'Chronicle Compounding Lab',href:'chronicle-compounding-lab.html',group:'Protocol & gates',why:'Only proof-cleared work becomes institutional memory.'},
    {title:'Sovereign Experience Stream',href:'sovereign-experience-stream.html',group:'Protocol & gates',why:'Proof events become governed learning only after replay, validation, and review.'},
    {title:'Proof-Backed Upgrade Foundry',href:'proof-backed-upgrade-foundry.html',group:'Protocol & gates',why:'Artifacts earn scoped upgrade rights only with canary, rollback, and human review.'},
    {title:'Router Observatory',href:'proof-conditioned-router-observatory.html',group:'Coordination & routing',why:'Route the institution, not the swarm.'},
    {title:'Multi-Agent Institution',href:'multi-agent-institution.html',group:'Coordination & routing',why:'Large multi-agent systems coordinate when they become proof-governed institutions.'},
    {title:'Coordination Lab',href:'coordination-lab.html',group:'Coordination & routing',why:'Compare swarm activity and proof-governed coordination.'},
    {title:'Coordination Engine',href:'coordination-engine.html',group:'Coordination & routing',why:'Technical engine for coordination law and proof-governed routing.'},
    {title:'Ascension Inflow Control',href:'ascension-inflow-control.html',group:'Work economy',why:'Verified work survives inside governed bands of inflow.'},
    {title:'Proof-Settlement Lifecycle',href:'proof-settlement-lifecycle.html',group:'Work economy',why:'Request → Escrow → Execute → Proof → Validate → Settle → Chronicle.'},
    {title:'MandateEpoch Clearinghouse',href:'mandate-epoch-clearinghouse.html',group:'Work economy',why:'Many proof receipts clear through roots, challenge windows, and Chronicle handoff.'},
    {title:'Real-Task Benchmark Bridge',href:'real-task-benchmark-bridge.html',group:'Work economy',why:'Public claims must pass real-task baselines and benchmark evidence.'},
    {title:'Artifact Passport',href:'proof-carrying-artifact-passport.html',group:'Capability reuse',why:'Reusable capability carries proof, scope, rollback, and lineage.'},
    {title:'Action Graph Handoff',href:'action-graph-handoff.html',group:'Capability reuse',why:'Proof becomes scoped action or stops.'},
    {title:'Mission Studio',href:'mission-studio.html',group:'Capability reuse',why:'Compose a local proof-pack from a public-safe objective.'},
    {title:'Proof Cards',href:'proof-cards.html',group:'Capability reuse',why:'Copyable proof-language for stakeholders.'},
    {title:'Architecture',href:'architecture.html',group:'Assurance & boundaries',why:'Separation of proof, presentation, action, and human authority.'},
    {title:'Verification',href:'verification.html',group:'Assurance & boundaries',why:'Canonical identities and generated-publication verification.'},
    {title:'Assurance',href:'assurance.html',group:'Assurance & boundaries',why:'Final assurance, capability lock, and public/expert separation.'},
    {title:'Legal Boundary',href:'legal.html',group:'Assurance & boundaries',why:'Data-zero, no-advice, no-investment, and third-party responsibility posture.'},
    {title:'AGIALPHA Boundary',href:'agialpha-token-boundary.html',group:'Assurance & boundaries',why:'AGIALPHA is pre-existing public-market, not available from this site or MontrealAI.'},
    {title:'Privacy',href:'privacy.html',group:'Assurance & boundaries',why:'No user data wanted.'},
    {title:'Terms',href:'terms.html',group:'Assurance & boundaries',why:'Public-safe website use terms.'},
    {title:'Regulatory Boundary',href:'regulatory-boundary.html',group:'Assurance & boundaries',why:'Public demonstration, not advice or regulated service.'},
    {title:'Third-Party Responsibility',href:'third-party-responsibility.html',group:'Assurance & boundaries',why:'Users/operators are responsible for their external systems and decisions.'},
    {title:'Read-Only Console',href:'operator-console.html',group:'Consoles',why:'Public read-only chamber and unsigned intent export.'},
    {title:'Expert Console',href:'expert-console.html',group:'Consoles',why:'Separated expert surface with explicit boundaries.'},
    {title:'Expert Mainnet Console',href:'expert-mainnet-console.html',group:'Consoles',why:'Human-signed wallet operations only; never public auto-connect.'},
    {title:'Sovereign Machine Economy',href:'sovereign-machine-economy.html',group:'Consoles',why:'Sovereign economy route and institutional economy posture.'},
    {title:'Navigation Atlas',href:'navigation-atlas.html',group:'All pages',why:'Complete page index, guided journeys, preview, and receipt export.'},
    {title:'Site Atlas',href:'site-atlas.html',group:'All pages',why:'Complete public route atlas.'}
  ];
  function q(s,r=document){return r.querySelector(s)}
  function install(){
    if(window.__GOALOS_V40_COMMAND__) return;
    window.__GOALOS_V40_COMMAND__ = true;
    // v40 deliberately does not inject a top navigation bar. Native page headers remain the only top nav.
    const box = document.createElement('div');
    box.className = 'v39-command v40-command';
    box.innerHTML = '<button type="button" aria-expanded="false" aria-label="Open Site Command">Site Command</button><div class="v39-panel v40-panel" role="dialog" aria-label="GoalOS Site Command"><b>All pages · Site Command</b><p class="v40-help">Search every public-safe route. This floating guide replaces stacked top menus.</p><input placeholder="Search demos, proof rooms, boundaries…" aria-label="Search GoalOS pages"><div data-list></div></div>';
    document.body.appendChild(box);
    const button=q('button',box), panel=q('.v39-panel',box), input=q('input',box), list=q('[data-list]',box);
    function render(term=''){
      const t=(term||'').toLowerCase();
      const filtered = CATALOG.filter(p=>!t || (p.title+' '+p.group+' '+p.why).toLowerCase().includes(t)).slice(0,80);
      list.innerHTML = filtered.map(p=>`<a href="${p.href}"><small>${p.group}</small><strong>${p.title}</strong><span>${p.why}</span></a>`).join('') || '<p>No route matched. Try “proof”, “legal”, “settlement”, “router”, or “trust”.</p>';
    }
    function openPanel(){panel.classList.add('open');button.setAttribute('aria-expanded','true');render(input.value);setTimeout(()=>input.focus(),20)}
    function closePanel(){panel.classList.remove('open');button.setAttribute('aria-expanded','false')}
    button.addEventListener('click',()=>panel.classList.contains('open')?closePanel():openPanel());
    input.addEventListener('input',()=>render(input.value));
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closePanel(); if((e.metaKey||e.ctrlKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openPanel();}});
    render('');
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install); else install();
})();
