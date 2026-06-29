(function(){
  const DATA={
    primaryLinks:[
      ['Start','start.html'],['Atlas','experience-atlas.html'],['Flight Deck','ascension-flight-deck.html'],['Until-DONE','until-done-mission-control.html'],['Evidence','evidence-docket-composer.html'],['Settlement','proof-settlement-lifecycle.html'],['Console','operator-console.html'],['Legal','legal.html']
    ],
    groups:[
      ['Start here','The shortest route for non-technical users.',[['Start','start.html','Friendly guided entry point.'],['Experience Atlas','experience-atlas.html','Complete site map and journey launcher.'],['Flight Deck','ascension-flight-deck.html','Guided demo launcher with live previews.'],['Demo Lab','demo-lab.html','Autonomous browser-local proof demos.'],['Mission Studio','mission-studio.html','Compose a public-safe local proof pack.'],['Proof Cards','proof-cards.html','Copyable stakeholder explanations.']]],
      ['Core proof loop','The essential GoalOS doctrine as runnable public demos.',[['Trust Equation Simulator','trust-equation-simulator.html','Output × Proof × Validation × Settlement × Reuse.'],['Proof-to-Action Theatre','proof-to-action-theatre.html','Objective to Evidence Docket to governed decision state.'],['Until-DONE Mission Control','until-done-mission-control.html','GoalOS runs until proof is complete.'],['Evidence Docket Composer','evidence-docket-composer.html','Build the proof room before the claim.'],['Proof Constitution Simulator','proof-constitution-simulator.html','Aim → Act → Prove → Evolve, with gates.'],['Proof Gradient Arena','proof-gradient-arena.html','Score is advisory; gates are mandatory.']]],
      ['Memory, learning, and reuse','How accepted proof becomes capability and portable institutional memory.',[['Chronicle Compounding Lab','chronicle-compounding-lab.html','Verified work becomes institutional memory.'],['Sovereign Experience Stream','sovereign-experience-stream.html','Proof becomes governed learning only after gates.'],['Artifact Passport','proof-carrying-artifact-passport.html','Reusable capability carries its evidence.'],['Upgrade Foundry','proof-backed-upgrade-foundry.html','Canary, rollback, and upgrade-right ceremony.'],['Action Graph Handoff','action-graph-handoff.html','Proof becomes scoped action—or stops.']]],
      ['Coordination and institutions','Why GoalOS is not more agents, but better proof loops.',[['Multi-Agent Institution','multi-agent-institution.html','From swarm to proof-governed institution.'],['Coordination Lab','coordination-lab.html','Browser-local institution lab.'],['Coordination Engine','coordination-engine.html','Advanced coordination architecture.'],['Router Observatory','proof-conditioned-router-observatory.html','Route work by evidence, risk, validators, tools, and replay.'],['Inflow Control','ascension-inflow-control.html','Regulated inflows sustain verified work.'],['Sovereign Machine Economy','sovereign-machine-economy.html','System-level machine economy route.']]],
      ['Claims, replay, benchmarks','Evidence-first public truth and falsification surfaces.',[['Claim Boundary Firewall','claim-boundary-firewall.html','Claims survive evidence or remain bounded.'],['Replay Gauntlet','replay-falsification-gauntlet.html','Replay, challenge, falsify, or review.'],['Benchmark Bridge','real-task-benchmark-bridge.html','Public claim to benchmark evidence docket.'],['MandateEpoch','mandate-epoch-clearinghouse.html','Many proof receipts become public roots and challenge windows.'],['Evidence Hub','evidence/','Public evidence route.'],['Verification','verification.html','Verification and public posture.']]],
      ['Settlement, consoles, architecture','Read-only public surfaces plus separated expert operations.',[['Proof-Settlement Lifecycle','proof-settlement-lifecycle.html','Request → Escrow → Execute → Proof → Validate → Settle → Chronicle.'],['Operator Console','operator-console.html','Default read-only chamber.'],['Expert Console','expert-console.html','Separated advanced surface.'],['Expert Mainnet Console','expert-mainnet-console.html','Human-signed wallet operations only.'],['Architecture','architecture.html','Separation of proof, presentation, and execution.'],['Assurance','assurance.html','Final assurance and invariant checks.']]],
      ['Legal, privacy, token boundaries','Public-safe operating boundaries.',[['Legal','legal.html','Data-Zero and legal boundary.'],['Privacy','privacy.html','No user data wanted.'],['Terms','terms.html','Terms of use.'],['Regulatory Boundary','regulatory-boundary.html','No advice, no offer, no production authority.'],['Third-Party Responsibility','third-party-responsibility.html','Users/operators own their third-party surfaces.'],['AGIALPHA Boundary','agialpha-token-boundary.html','AGIALPHA is not available from this website.']]]
    ]
  };
  function rootPrefix(){return location.pathname.includes('/evidence/')?'../':''}
  function href(h){return rootPrefix()+h}
  function buildPanel(){
    if(document.querySelector('.goalos-nav-shell')) return;
    const shell=document.createElement('div'); shell.className='goalos-nav-shell'; shell.setAttribute('aria-hidden','true');
    shell.innerHTML=`<div class="goalos-nav-backdrop" data-close></div><section class="goalos-nav-panel" role="dialog" aria-modal="true" aria-label="GoalOS navigation atlas"><div class="goalos-nav-head"><div><h2 class="goalos-nav-title">Find the right proof path.</h2><p class="goalos-nav-sub">Every page remains available. This atlas compresses the site into clear routes for users, builders, operators, reviewers, and advanced readers.</p></div><button class="goalos-nav-close" data-close>Close</button></div><div class="goalos-search"><input id="goalosNavSearch" type="search" placeholder="Search demos, evidence, settlement, legal, router, proof…" autocomplete="off"></div><div class="goalos-nav-content"><div class="goalos-nav-grid"></div><div class="goalos-nav-empty">No matching page. Try “proof”, “settlement”, “legal”, “router”, “docket”, or “console”.</div></div></section>`;
    const grid=shell.querySelector('.goalos-nav-grid');
    DATA.groups.forEach(([title,desc,links])=>{
      const group=document.createElement('div'); group.className='goalos-nav-group'; group.dataset.groupText=(title+' '+desc+' '+links.flat().join(' ')).toLowerCase();
      group.innerHTML=`<h3>${title}</h3><p>${desc}</p><div class="goalos-nav-links"></div>`;
      const box=group.querySelector('.goalos-nav-links');
      links.forEach(([label,url,summary])=>{const a=document.createElement('a'); a.href=href(url); a.dataset.linkText=(label+' '+summary).toLowerCase(); a.innerHTML=`<strong>${label}</strong><span>${summary}</span>`; box.appendChild(a);});
      grid.appendChild(group);
    });
    document.body.appendChild(shell);
    const input=shell.querySelector('#goalosNavSearch');
    input.addEventListener('input',()=>filter(shell,input.value));
    shell.addEventListener('click',e=>{if(e.target.matches('[data-close]')) closeNav();});
    document.addEventListener('keydown',e=>{if(e.key==='Escape') closeNav(); if(e.key==='/' && !/input|textarea|select/i.test(document.activeElement?.tagName||'')){e.preventDefault(); openNav();}});
  }
  function filter(shell,term){
    const q=(term||'').trim().toLowerCase(); let visible=0;
    shell.querySelectorAll('.goalos-nav-group').forEach(group=>{
      let groupVisible=!q || group.dataset.groupText.includes(q); let linkVisible=0;
      group.querySelectorAll('a').forEach(a=>{const ok=!q || a.dataset.linkText.includes(q) || group.dataset.groupText.includes(q); a.style.display=ok?'grid':'none'; if(ok) linkVisible++;});
      group.style.display=(groupVisible||linkVisible)?'block':'none'; if(groupVisible||linkVisible) visible++;
    });
    shell.querySelector('.goalos-nav-empty').style.display=visible?'none':'block';
  }
  function openNav(){buildPanel(); const shell=document.querySelector('.goalos-nav-shell'); shell.classList.add('open'); shell.setAttribute('aria-hidden','false'); setTimeout(()=>shell.querySelector('input')?.focus(),20);}
  function closeNav(){const shell=document.querySelector('.goalos-nav-shell'); if(shell){shell.classList.remove('open'); shell.setAttribute('aria-hidden','true');}}
  function enhanceLegacyNav(){
    document.querySelectorAll('.navlinks').forEach(nav=>{
      nav.dataset.goalosEnhanced='true';
      nav.innerHTML='';
      DATA.primaryLinks.forEach(([label,url])=>{const a=document.createElement('a'); a.href=href(url); a.textContent=label; nav.appendChild(a);});
      const b=document.createElement('button'); b.className='goalos-nav-button'; b.type='button'; b.innerHTML='All pages <span class="goalos-nav-hotkey">/</span>'; b.addEventListener('click',openNav); nav.appendChild(b);
    });
    document.querySelectorAll('.mobile-nav').forEach(sel=>{sel.innerHTML=''; DATA.primaryLinks.forEach(([label,url])=>{const o=document.createElement('option'); o.value=href(url); o.textContent=label; sel.appendChild(o);});});
    if(!document.querySelector('.goalos-floating-atlas')){const f=document.createElement('button'); f.className='goalos-floating-atlas'; f.type='button'; f.textContent='Atlas'; f.addEventListener('click',openNav); document.body.appendChild(f);}
  }
  window.GoalOSNavigation={open:openNav,data:DATA};
  document.addEventListener('DOMContentLoaded',()=>{buildPanel(); enhanceLegacyNav();});
})();
