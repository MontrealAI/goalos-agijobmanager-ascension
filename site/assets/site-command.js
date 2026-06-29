(() => {
  const entries = [
    ['navigation-atlas.html','Navigation Atlas','Complete guided map for every demo and user path.'],
    ['start.html','Start','Friendly first-run guide.'],
    ['ascension-flight-deck.html','Ascension Flight Deck','Guided demo launcher and JourneyReceipt export.'],
    ['proof-to-action-theatre.html','Proof-to-Action Theatre','Objective becomes evidence, decision state, and action.'],
    ['trust-equation-simulator.html','Trust Equation','Why proof turns output into institutional work.'],
    ['until-done-mission-control.html','Until-DONE','State machine that runs until proof is complete.'],
    ['evidence-docket-composer.html','Evidence Docket Composer','Build the proof room before the claim.'],
    ['proof-settlement-lifecycle.html','Proof-Settlement Lifecycle','Request, proof, validate, settle, chronicle.'],
    ['proof-gradient-arena.html','Proof Gradient Arena','Score is advisory; gates are mandatory.'],
    ['chronicle-compounding-lab.html','Chronicle Lab','Accepted proof becomes institutional memory.'],
    ['proof-conditioned-router-observatory.html','Router Observatory','Route the institution, not the swarm.'],
    ['proof-carrying-artifact-passport.html','Artifact Passport','Reusable capability carries proof.'],
    ['mandate-epoch-clearinghouse.html','MandateEpoch','Clear many proof receipts with challenge windows.'],
    ['real-task-benchmark-bridge.html','Benchmark Bridge','Architecture becomes evidence through benchmarks.'],
    ['claim-boundary-firewall.html','Claim Firewall','Evidence decides what can be said publicly.'],
    ['replay-falsification-gauntlet.html','Replay Gauntlet','Proof must survive replay and challenge.'],
    ['legal.html','Legal Boundary','Data-zero, no-advice, no-custody posture.'],
    ['agialpha-token-boundary.html','AGIALPHA Boundary','Token is not available from this site.'],
    ['expert-mainnet-console.html','Expert Mainnet Console','Separated expert-only wallet surface.']
  ];
  const paths = [
    ['First-time visitor','Start → Flight Deck → Proof Theatre → Trust Equation','5 min'],
    ['Executive proof path','Evidence Docket → Until-DONE → Action Graph → Settlement','8 min'],
    ['Builder/operator path','Router → Artifact Passport → Upgrade Foundry → Benchmark','12 min'],
    ['Risk boundary path','Claim Firewall → Replay Gauntlet → Legal → Assurance','10 min']
  ];
  const base = (() => {
    const scripts = [...document.scripts];
    const me = scripts.find(s => (s.getAttribute('src') || '').includes('site-command.js'));
    if (!me) return '';
    const src = me.getAttribute('src') || '';
    return src.slice(0, Math.max(0, src.indexOf('assets/site-command.js')));
  })();
  if (document.querySelector('.goalos-command-launcher')) return;
  const button = document.createElement('button');
  button.className = 'goalos-command-launcher';
  button.type = 'button';
  button.textContent = 'Explore site';
  const overlay = document.createElement('div');
  overlay.className = 'goalos-command';
  overlay.setAttribute('aria-hidden','true');
  overlay.innerHTML = `<div class="goalos-command-panel" role="dialog" aria-label="GoalOS site command center"><div class="goalos-command-head"><div><div class="goalos-command-kicker">GoalOS AGIJobManager Ascension</div><h2 class="goalos-command-title">Site Command Center</h2></div><button class="goalos-command-close" type="button">Close</button></div><div class="goalos-command-body"><input class="goalos-command-search" type="search" placeholder="Search demos, proof, evidence, settlement, legal…" aria-label="Search site demos"><div class="goalos-command-kicker">Recommended paths</div><div class="goalos-command-paths"></div><div class="goalos-command-kicker">Quick launch</div><div class="goalos-command-grid"></div></div><div class="goalos-command-footer">Browser-local navigation. No account, no wallet, no tracking. <a href="${base}navigation-atlas.html">Open full Navigation Atlas</a>.</div></div>`;
  document.body.append(button, overlay);
  const grid = overlay.querySelector('.goalos-command-grid');
  const pathBox = overlay.querySelector('.goalos-command-paths');
  const search = overlay.querySelector('.goalos-command-search');
  const render = () => {
    const term = search.value.trim().toLowerCase();
    grid.innerHTML = '';
    entries.filter(x => !term || `${x[1]} ${x[2]}`.toLowerCase().includes(term)).forEach(([href,title,summary]) => {
      const a = document.createElement('a');
      a.className = 'goalos-command-card';
      a.href = base + href;
      a.innerHTML = `<strong>${title}</strong><span>${summary}</span>`;
      grid.appendChild(a);
    });
  };
  paths.forEach(([name,route,time]) => {
    const div = document.createElement('div');
    div.className = 'goalos-command-path';
    div.innerHTML = `<b>${name}</b><span>${route}</span><br><small>${time}</small>`;
    pathBox.appendChild(div);
  });
  render();
  const open = () => { overlay.classList.add('open'); overlay.setAttribute('aria-hidden','false'); setTimeout(() => search.focus(), 30); };
  const close = () => { overlay.classList.remove('open'); overlay.setAttribute('aria-hidden','true'); button.focus(); };
  button.addEventListener('click', open);
  overlay.querySelector('.goalos-command-close').addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  search.addEventListener('input', render);
  window.addEventListener('keydown', e => { if (e.key === 'Escape' && overlay.classList.contains('open')) close(); if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); open(); } });
})();
