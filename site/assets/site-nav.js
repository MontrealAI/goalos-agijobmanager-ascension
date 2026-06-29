(()=>{
  const base = location.pathname.includes('/evidence/') ? '../' : '';
  const routes = [
    {title:'Start here',href:'start.html',cat:'Start',desc:'Friendly first path for non-technical visitors.'},
    {title:'Flight Deck',href:'ascension-flight-deck.html',cat:'Start',desc:'Guided journeys, audience filters, previews, and JourneyReceipt export.'},
    {title:'Experience Atlas',href:'experience-atlas.html',cat:'Start',desc:'Complete map of every page, demo, proof room, and operator surface.'},
    {title:'Demo Lab',href:'demo-lab.html',cat:'Start',desc:'Browser-local autonomous demos and public-safe docket exports.'},
    {title:'Mission Studio',href:'mission-studio.html',cat:'Start',desc:'Plain-language mission composer for public-safe proof packs.'},
    {title:'Proof Cards',href:'proof-cards.html',cat:'Start',desc:'Copyable explanations for stakeholders and reviewers.'},
    {title:'Proof-to-Action Theatre',href:'proof-to-action-theatre.html',cat:'Core proof loop',desc:'Objective to proof to governed decision state.'},
    {title:'Until-DONE Mission Control',href:'until-done-mission-control.html',cat:'Core proof loop',desc:'Run-to-completion state machine that stops at proof, not output.'},
    {title:'Trust Equation Simulator',href:'trust-equation-simulator.html',cat:'Core proof loop',desc:'AI Work = Output × Proof × Validation × Settlement × Reuse.'},
    {title:'Evidence Docket Composer',href:'evidence-docket-composer.html',cat:'Core proof loop',desc:'Build the proof room before the claim.'},
    {title:'Proof Constitution Simulator',href:'proof-constitution-simulator.html',cat:'Core proof loop',desc:'Aim, Act, Prove, Evolve as a protocol workbench.'},
    {title:'Proof Gradient Arena',href:'proof-gradient-arena.html',cat:'Selection',desc:'Score is advisory; gates are mandatory.'},
    {title:'Claim Boundary Firewall',href:'claim-boundary-firewall.html',cat:'Selection',desc:'Claims advance only when evidence survives the firewall.'},
    {title:'Replay & Falsification Gauntlet',href:'replay-falsification-gauntlet.html',cat:'Selection',desc:'Proof must remain replayable and challengeable.'},
    {title:'Real-Task Benchmark Bridge',href:'real-task-benchmark-bridge.html',cat:'Selection',desc:'Claims move through real tasks, baselines, and Benchmark Evidence Dockets.'},
    {title:'Chronicle Compounding Lab',href:'chronicle-compounding-lab.html',cat:'Compounding',desc:'Accepted proof becomes Chronicle memory and reusable capability.'},
    {title:'Sovereign Experience Stream',href:'sovereign-experience-stream.html',cat:'Compounding',desc:'Validated experience becomes governed learning.'},
    {title:'Proof-Backed Upgrade Foundry',href:'proof-backed-upgrade-foundry.html',cat:'Compounding',desc:'Proof-cleared artifacts earn rollback-ready upgrade rights.'},
    {title:'Artifact Passport',href:'proof-carrying-artifact-passport.html',cat:'Compounding',desc:'Reusable capability carries proof, scope, and rollback metadata.'},
    {title:'Ascension Inflow Control',href:'ascension-inflow-control.html',cat:'System control',desc:'Compute, data, tasks, incentives, feedback, governance, and tools stay in a productive band.'},
    {title:'Router Observatory',href:'proof-conditioned-router-observatory.html',cat:'System control',desc:'Select the smallest sufficient validator-bound agent constellation.'},
    {title:'Multi-Agent Institution',href:'multi-agent-institution.html',cat:'System control',desc:'From swarm activity to proof-governed institution.'},
    {title:'Coordination Lab',href:'coordination-lab.html',cat:'System control',desc:'Browser-local proof-governed coordination lab.'},
    {title:'Advanced Engine',href:'coordination-engine.html',cat:'System control',desc:'Advanced machine-readable coordination engine.'},
    {title:'Proof-Settlement Lifecycle',href:'proof-settlement-lifecycle.html',cat:'Settlement',desc:'Request → Escrow → Execute → Proof → Validate → Settle → Chronicle.'},
    {title:'MandateEpoch Clearinghouse',href:'mandate-epoch-clearinghouse.html',cat:'Settlement',desc:'Many proof receipts become challengeable settlement roots.'},
    {title:'Action Graph Handoff',href:'action-graph-handoff.html',cat:'Settlement',desc:'Governed decision state becomes scoped, rollback-ready action.'},
    {title:'Settlement Chamber',href:'operator-console.html',cat:'Operate',desc:'Default read-only public chamber for mission intent and docket export.'},
    {title:'Expert Console',href:'expert-console.html',cat:'Operate',desc:'Expert-only separated operating surface.'},
    {title:'Expert Mainnet Console',href:'expert-mainnet-console.html',cat:'Operate',desc:'Human-signed wallet operations only; separated from public pages.'},
    {title:'Evidence Docket',href:'evidence/',cat:'Evidence',desc:'Public evidence room and proof posture.'},
    {title:'Architecture',href:'architecture.html',cat:'Evidence',desc:'Separation of proof, presentation, execution, and authority.'},
    {title:'Verification',href:'verification.html',cat:'Evidence',desc:'Canonical identities, QA, production URL, and public boundary.'},
    {title:'Assurance',href:'assurance.html',cat:'Evidence',desc:'Final assurance posture and public claims boundary.'},
    {title:'Sovereign Machine Economy',href:'sovereign-machine-economy.html',cat:'Evidence',desc:'Implementation contract across the machine-work economy.'},
    {title:'Legal Boundary',href:'legal.html',cat:'Boundary',desc:'Data-zero, no-advice, no-custody, no-user-data posture.'},
    {title:'Privacy',href:'privacy.html',cat:'Boundary',desc:'No accounts, no analytics, no cookies, no intentional user-data collection.'},
    {title:'Terms',href:'terms.html',cat:'Boundary',desc:'Use boundary and third-party responsibility.'},
    {title:'Regulatory Boundary',href:'regulatory-boundary.html',cat:'Boundary',desc:'Investment, legal, tax, financial, and audit boundaries.'},
    {title:'Third-Party Responsibility',href:'third-party-responsibility.html',cat:'Boundary',desc:'Wallets, RPCs, platforms, transactions, and compliance remain third-party/operator responsibilities.'},
    {title:'AGIALPHA Boundary',href:'agialpha-token-boundary.html',cat:'Boundary',desc:'AGIALPHA is pre-existing, decentralized, third-party market only, and not available from the site.'}
  ];
  const quick = [
    ['Start','start.html'],['Flight Deck','ascension-flight-deck.html'],['Atlas','experience-atlas.html'],['Proof','proof-to-action-theatre.html'],['Docket','evidence-docket-composer.html'],['Settlement','proof-settlement-lifecycle.html'],['Legal','legal.html']
  ];
  const current = location.pathname.split('/').pop() || 'index.html';
  const href = r => base + r;
  document.documentElement.classList.add('g-nav-loading');
  const nav = document.createElement('div');
  nav.className='goalos-global-nav';
  nav.innerHTML = `<div class="g-nav-wrap"><a class="g-brand" href="${base}index.html"><span class="g-mark"></span><span><b>GoalOS AGIJobManager</b><small>Ascension public institution</small></span></a><nav class="g-quick" aria-label="GoalOS quick navigation">${quick.map((q,i)=>`<a ${q[1]===current?'aria-current="page"':''} class="${i===0?'g-primary':''}" href="${href(q[1])}">${q[0]}</a>`).join('')}</nav><div class="g-actions"><button class="g-menu-btn" type="button" data-g-open>Menu · all pages</button></div></div>`;
  document.body.prepend(nav);
  const drawer = document.createElement('div');
  drawer.className='g-drawer'; drawer.setAttribute('aria-hidden','true');
  const cats = ['All',...Array.from(new Set(routes.map(r=>r.cat)))];
  drawer.innerHTML = `<div class="g-drawer-panel" role="dialog" aria-modal="true" aria-label="Complete GoalOS navigation"><div class="g-drawer-head"><div><h2>Find the right proof surface.</h2><p>Every public page remains available. The menu groups the site by user intent: start, proof, selection, compounding, system control, settlement, evidence, operate, and boundary.</p></div><button class="g-close" type="button" data-g-close>Close</button></div><div class="g-controls"><input class="g-search" type="search" placeholder="Search demos, proof, settlement, evidence, legal…" aria-label="Search GoalOS pages"><div class="g-filter-row">${cats.map((c,i)=>`<button class="g-filter ${i===0?'active':''}" data-cat="${c}" type="button">${c}</button>`).join('')}</div></div><div class="g-link-grid"></div><div class="g-empty">No pages match this filter.</div></div>`;
  document.body.append(drawer);
  const grid = drawer.querySelector('.g-link-grid'), search = drawer.querySelector('.g-search'), empty = drawer.querySelector('.g-empty');
  let cat='All';
  function render(){
    const q=(search.value||'').toLowerCase().trim();
    const shown=routes.filter(r => (cat==='All'||r.cat===cat) && (!q || `${r.title} ${r.cat} ${r.desc}`.toLowerCase().includes(q)));
    grid.innerHTML = shown.map(r=>`<a class="g-link-card" href="${href(r.href)}"><div class="g-cat">${r.cat}</div><h3>${r.title}</h3><p>${r.desc}</p></a>`).join('');
    empty.classList.toggle('show',shown.length===0);
  }
  render();
  const open=()=>{drawer.classList.add('open'); drawer.setAttribute('aria-hidden','false'); search.focus();};
  const close=()=>{drawer.classList.remove('open'); drawer.setAttribute('aria-hidden','true');};
  document.querySelector('[data-g-open]').addEventListener('click',open);
  drawer.querySelector('[data-g-close]').addEventListener('click',close);
  drawer.addEventListener('click',e=>{if(e.target===drawer) close();});
  document.addEventListener('keydown',e=>{if(e.key==='Escape') close();});
  search.addEventListener('input',render);
  drawer.querySelectorAll('.g-filter').forEach(btn=>btn.addEventListener('click',()=>{cat=btn.dataset.cat;drawer.querySelectorAll('.g-filter').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render();}));
  document.body.classList.add('g-nav-enabled');
})();
