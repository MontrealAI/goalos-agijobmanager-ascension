(()=>{
  const ROUTES=[
    ["Home", "index.html", "Start here", "The public front door for GoalOS AGIJobManager Ascension: identity, posture, proof-settlement institution, and guided paths."],
    ["Canonical Proof Institution", "canonical-proof-institution.html", "Start here", "Final public proof-institution command room: route integrity, proof doctrine, public-safe boundary, documentation spine, and next best user paths in one place."],
    ["Ask GoalOS Concierge", "ask-goalos.html", "Start here", "Browser-local question router that answers public-site questions instantly and routes visitors to the right proof page, console, evidence room, legal boundary, or route index without sending data anywhere."],
    ["Experience Command", "experience-command.html", "Start here", "The single command-grade route for every preserved demo, proof room, loop theatre, RSI console, ASI-horizon boundary, legal page, archive, and evidence surface."],
    ["Complete Route Index", "complete-route-index.html", "Start here", "Single public-safe route recovery index for every preserved page, demo, proof room, legal boundary, console, atlas, and archive route."],
    ["Experience Concierge", "experience-concierge.html", "Start here", "Guides each visitor to the right proof path by intent."],
    ["Experience Hub", "experience-hub.html", "Start here", "Role-based journeys for proof, settlement, architecture, and boundaries."],
    ["Command Center", "command-center.html", "Start here", "Complete searchable catalog of public routes and proof surfaces."],
    ["Guided Start", "start.html", "Start here", "Clean first-click path from objective to proof demos."],
    ["Ascension Flight Deck", "ascension-flight-deck.html", "Start here", "Guided launcher for the strongest proof paths, with audience filters and same-origin preview."],
    ["Archive v36 Ascension Chamber", "archive-v36-ascension-chamber.html", "Archive", "Preserved historical chamber view for release continuity."],
    ["Archive v37 Pre-Navigation Final", "archive-v37-pre-navigation-final.html", "Archive", "Preserved pre-navigation public site state for release continuity."],
    ["AGIALPHA Boundary", "agialpha-token-boundary.html", "Assurance & boundaries", "States AGIALPHA is not available from the site and is not sold, offered, custodied, brokered, routed, redeemed, market-made, or recommended."],
    ["Legal Boundary", "legal.html", "Assurance & boundaries", "Plain-language legal and data-zero boundary."],
    ["Privacy", "privacy.html", "Assurance & boundaries", "States no user data wanted, no analytics, no cookies, no forms, and no browser storage."],
    ["Regulatory Boundary", "regulatory-boundary.html", "Assurance & boundaries", "Clarifies no investment, financial, legal, or regulated-service posture."],
    ["Terms", "terms.html", "Assurance & boundaries", "Use boundaries and disclaimers for public demos."],
    ["Third-Party Responsibility", "third-party-responsibility.html", "Assurance & boundaries", "Places third-party wallet, market, RPC, tax, sanctions, securities, privacy, and jurisdiction responsibility on users/operators."],
    ["Action Graph Handoff", "action-graph-handoff.html", "Capability reuse", "Turns governed decisions into scoped action graphs with handoff and rollback boundaries."],
    ["Mission Studio", "mission-studio.html", "Capability reuse", "Plain-language mission drafting surface for public-safe mission packages."],
    ["Until-DONE Mission Control", "until-done-mission-control.html", "Capability reuse", "Demonstrates run-to-completion: GoalOS stops at proof, not at output."],
    ["Expert Console", "expert-console.html", "Consoles", "Separated expert surface with explicit human authority boundaries."],
    ["Expert Mainnet Console", "expert-mainnet-console.html", "Consoles", "Separated Mainnet operations chamber requiring deliberate human wallet authority if used."],
    ["Operator Console", "operator-console.html", "Consoles", "Read-only operator posture for reviewing proof-state surfaces."],
    ["Coordination Engine", "coordination-engine.html", "Coordination & routing", "Explains the proof-gated coordination engine behind multi-agent institutional work."],
    ["Coordination Lab", "coordination-lab.html", "Coordination & routing", "Compares swarm, fixed crew, and institution coordination under proof gates."],
    ["Multi-Agent Institution", "multi-agent-institution.html", "Coordination & routing", "Shows why large systems coordinate best as proof-governed institutions, not swarms."],
    ["Claim Firewall", "claim-boundary-firewall.html", "Evidence & claims", "Blocks overclaims and separates architecture claims from empirical claims."],
    ["Evidence Docket Composer", "evidence-docket-composer.html", "Evidence & claims", "Turns a claim into a public/private evidence room with replay and risk gates."],
    ["Evidence Docket Court", "evidence-docket-court.html", "Evidence & claims", "Courtroom metaphor for evaluating claims against evidence, risk, and replay."],
    ["Evidence Room", "evidence/index.html", "Evidence & claims", "Persistent evidence entrypoint and public-safe proof context for Evidence Dockets, proof rooms, claim boundaries, and review paths."],
    ["Replay Gauntlet", "replay-falsification-gauntlet.html", "Evidence & claims", "Stress-tests proof claims against replay, contradiction, risk, and rollback defects."],
    ["Documentation", "docs.html", "Guide", "Documentation entrypoint for users who want the public repo, proof doctrine, route map, and implementation guidance."],
    ["ASI Proof Horizon Console", "asi-proof-horizon-console.html", "Loop & RSI", "A browser-local control room showing how a restartable loop becomes RSI governance, then enters an ASI-horizon proof firewall with evidence, baselines, containment, council review, rollback, and Chronicle gates."],
    ["Day-Scale Loop Observatory", "day-scale-loop-observatory.html", "Loop & RSI", "Shows how a long-running agent loop becomes a restartable, trace-readable, proof-gated institution instead of a fragile prompt session."],
    ["From Loop to RSI", "loop-to-rsi-sovereign-governance.html", "Loop & RSI", "Shows how a long-running agent loop becomes AGI Alpha RSI: deterministic invention governance with target, emit, filter, atlas, test-plan, eval, insert, promote, replay integrity, ECI, Move-37 skepticism, and dossier export."],
    ["From Loop to RSI", "loop-to-rsi.html", "Loop & RSI", "Shows how long-running agent loops become deterministic RSI governance: target, emit, filter, atlas, test-plan, eval, insert, promote, Move-37 dossier, and outcome authority by evidence."],
    ["Loop → RSI → ASI Governance Console", "loop-to-rsi-to-asi-superintelligence.html", "Loop & RSI", "A public-safe console showing how restartable loops become RSI governance and how future ASI-class capability remains inside proof, replay, baseline, persistence, risk, council, and human authority gates."],
    ["Loop → RSI → ASI Governance Corridor", "loop-to-asi-governance-corridor.html", "Loop & RSI", "Companion corridor view for capability pressure, proof gates, containment, council review, and human-boundary discipline."],
    ["Loop → RSI Control Room", "loop-to-rsi-control-room.html", "Loop & RSI", "Browser-local control room showing how long-running loops become deterministic RSI governance: contract, separated roles, ECI, baselines, Move-37 gates, replay, dossier, and Chronicle."],
    ["Loop Contract Theatre", "loop-contract-theatre.html", "Loop & RSI", "Contract-first long-running loop demonstration: separated roles, virtual disk state, restart, trace reading, proof scoring, harness reduction, and LoopReceipt export."],
    ["Loop Evidence Reactor", "loop-evidence-reactor.html", "Loop & RSI", "Shows long-running agent loops as proof-gated state machines: contract, virtual disk, crash/restart, trace reading, harness deletion, bottleneck exposure, and LoopDocket export."],
    ["Loop Operating Room", "loop-operating-room.html", "Loop & RSI", "Turns long-running agent work into a proof-governed loop: contract, roles, traces, restarts, evaluator scores, Evidence Docket, Chronicle, and bottleneck visibility."],
    ["Superintelligence Proof Governance Console", "superintelligence-proof-governance-console.html", "Loop & RSI", "A browser-local GoalOS control room for the Loop → RSI → ASI horizon: evidence contact, baselines, replay, Move-37 stress, council review, capacity allocation, and human boundary gates."],
    ["Artifact Passport", "proof-carrying-artifact-passport.html", "Protocol & gates", "Shows how accepted proof becomes portable, reusable capability with lineage and rollback metadata."],
    ["Chronicle Lab", "chronicle-compounding-lab.html", "Protocol & gates", "Demonstrates accepted proof entering Chronicle and becoming reusable capability."],
    ["Proof Cards", "proof-cards.html", "Protocol & gates", "Compact cards for proof doctrine, boundaries, and public-safe claims."],
    ["Proof Constitution Simulator", "proof-constitution-simulator.html", "Protocol & gates", "Makes Aim -> Act -> Prove -> Evolve visible through protocol objects and gates."],
    ["Proof Gradient Arena", "proof-gradient-arena.html", "Protocol & gates", "Shows proof, eval, risk, canary, rollback, scope, and challenge gates selecting what may propagate."],
    ["Proof-to-Action Theatre", "proof-to-action-theatre.html", "Protocol & gates", "The cleanest objective -> proof -> governed decision state walkthrough."],
    ["Router Observatory", "proof-conditioned-router-observatory.html", "Protocol & gates", "Shows proof-conditioned routing: choose the smallest sufficient constellation under cost/risk/proof constraints."],
    ["Trust Equation Simulator", "trust-equation-simulator.html", "Protocol & gates", "Shows why output becomes institutional work only after proof, validation, settlement, and reuse."],
    ["Upgrade Foundry", "proof-backed-upgrade-foundry.html", "Protocol & gates", "Demonstrates proof-backed upgrade rights: no propagation without proof, eval, rollback, and scope."],
    ["Architecture", "architecture.html", "Reference", "Explains separation of proof, presentation, execution, public pages, schemas, and expert surfaces."],
    ["Assurance", "assurance.html", "Reference", "Assurance posture, automation checks, and public-safe invariants."],
    ["Demo Lab", "demo-lab.html", "Reference", "Legacy demo entry surface retained for preservation."],
    ["Verification", "verification.html", "Reference", "Explains verification scripts, build checks, and claim-boundary tests."],
    ["Experience Atlas", "experience-atlas.html", "Start here", "Advanced journey map for demos, proof rooms, and boundary pages."],
    ["Experience Stream", "sovereign-experience-stream.html", "Start here", "Shows how validated work becomes governed experience for future routing and memory."],
    ["Navigation Atlas", "navigation-atlas.html", "Start here", "Navigation topology and recommended route paths."],
    ["Site Atlas", "site-atlas.html", "Start here", "Static map of every public route and status group."],
    ["Benchmark Bridge", "real-task-benchmark-bridge.html", "Work economy", "Maps public-safe demos to real-task benchmark requirements and falsification."],
    ["Inflow Control", "ascension-inflow-control.html", "Work economy", "Shows why compute, tasks, data, incentives, feedback, governance, and tools need regulated inflow."],
    ["MandateEpoch Clearinghouse", "mandate-epoch-clearinghouse.html", "Work economy", "Shows how high-volume proof receipts can be batched, quarantined, and cleared without exposing private work."],
    ["Proof-Settlement Lifecycle", "proof-settlement-lifecycle.html", "Work economy", "Walks through Request -> Escrow -> Execute -> Proof -> Validate -> Settle -> Chronicle."],
    ["Sovereign Machine Economy", "sovereign-machine-economy.html", "Work economy", "Shows integrated Meta-Agentic cognition, Alpha Node runtime, AGI Jobs work OS, and settlement route."],
  ];
  function install(){
    if(window.__GOALOS_SITE_COMMAND_V60__) return; window.__GOALOS_SITE_COMMAND_V60__=true;
    const box=document.createElement('div'); box.className='goalos-site-command';
    box.innerHTML='<button class="goalos-site-command__button" type="button" aria-expanded="false">Site Command</button><div class="goalos-site-command__panel" role="dialog" aria-label="GoalOS Site Command"><b>Site Command</b><p class="goalos-site-command__help">Search every public-safe route or open Ask GoalOS for a guided answer.</p><div class="goalos-site-command__quick"><a href="ask-goalos.html">Ask</a><a href="experience-command.html">Command</a><a href="experience-concierge.html">Concierge</a><a href="complete-route-index.html">All pages</a></div><input aria-label="Search GoalOS pages" placeholder="Search proof, loop, RSI, evidence, legal…"><div data-list></div></div>';
    document.body.appendChild(box);
    const button=box.querySelector('button'), panel=box.querySelector('.goalos-site-command__panel'), input=box.querySelector('input'), list=box.querySelector('[data-list]');
    const prefix=/\/evidence\//.test(location.pathname)?'../':'';
    const render=()=>{const t=(input.value||'').toLowerCase(); const rows=ROUTES.filter(r=>!t || (r.join(' ')).toLowerCase().includes(t)).slice(0,120); list.innerHTML=rows.map(([title,href,group,why])=>'<a href="'+(href.startsWith('http')?href:prefix+href)+'"><small>'+group+'</small><strong>'+title+'</strong><span>'+why+'</span></a>').join('')||'<p>No route matched. Try Ask GoalOS.</p>';};
    const open=()=>{panel.classList.add('open');button.setAttribute('aria-expanded','true');render();setTimeout(()=>input.focus(),20)}; const close=()=>{panel.classList.remove('open');button.setAttribute('aria-expanded','false')};
    button.addEventListener('click',()=>panel.classList.contains('open')?close():open()); input.addEventListener('input',render); document.addEventListener('keydown',e=>{if(e.key==='Escape')close(); if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();open();}}); render();
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install); else install();
})();
