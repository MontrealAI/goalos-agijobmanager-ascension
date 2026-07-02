(()=>{
  const FALLBACK=[
    ['Home','index.html','Start here','Public front door and proof-settlement institution summary.'],
    ['Complete Route Index','complete-route-index.html','Start here','Every preserved public route in one index.'],
    ['Evidence Docket Composer','evidence-docket-composer.html','Evidence & claims','Build the public proof room before the claim.'],
    ['Loop Contract Theatre','loop-contract-theatre.html','Loop & RSI','Contract-first loop with restart, trace, and proof scoring.'],
    ['Loop to RSI Control Room','loop-to-rsi-control-room.html','Loop & RSI','Deterministic RSI governance from loop state.'],
    ['Superintelligence Proof Governance Console','superintelligence-proof-governance-console.html','Loop & RSI','ASI horizon as governance boundary, not achievement claim.'],
    ['Legal Boundary','legal.html','Assurance & boundaries','No user data, no wallet, no regulated-service posture.']
  ];
  const routes = (window.GOALOS_ROUTE_CATALOG && window.GOALOS_ROUTE_CATALOG.pages ? window.GOALOS_ROUTE_CATALOG.pages.map(p=>[p.title,p.href,p.group||p.section,p.description||p.why]) : FALLBACK);
  const groups=['All',...Array.from(new Set(routes.map(r=>r[2]||'Reference'))).sort()];
  let active='All';
  const search=document.querySelector('[data-route-search]');
  const list=document.querySelector('[data-routes]');
  const filters=document.querySelector('[data-filters]');
  const clear=document.querySelector('[data-clear]');
  const count=document.querySelector('[data-route-count]');
  if(count) count.textContent=String(routes.length);
  function renderFilters(){filters.innerHTML=groups.map(g=>`<button type="button" class="${g===active?'active':''}" data-group="${g}">${g}</button>`).join('');}
  function render(){
    const q=(search?.value||'').toLowerCase();
    const rows=routes.filter(([title,href,group,desc])=>(active==='All'||group===active)&&(!q||[title,href,group,desc].join(' ').toLowerCase().includes(q))).slice(0,96);
    list.innerHTML=rows.map(([title,href,group,desc])=>`<a class="ec-route" href="${href}"><small>${group}</small><strong>${title}</strong><span>${desc}</span></a>`).join('') || '<p>No route matched. Try evidence, loop, RSI, legal, settlement, or proof.</p>';
  }
  filters?.addEventListener('click',e=>{const b=e.target.closest('button[data-group]'); if(!b)return; active=b.dataset.group; renderFilters(); render();});
  search?.addEventListener('input',render); clear?.addEventListener('click',()=>{if(search)search.value='';active='All';renderFilters();render();});
  document.querySelector('[data-export]')?.addEventListener('click',()=>{
    const receipt={receiptType:'GoalOSExperienceCommandReceipt',version:'v58',routeCount:routes.length,publicSafe:true,noWallet:true,noUserDataWanted:true,generatedAt:new Date().toISOString(),routes:routes.map(([title,href,group,description])=>({title,href,group,description}))};
    const blob=new Blob([JSON.stringify(receipt,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='goalos-experience-command-receipt-v58.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000);
  });
  renderFilters(); render();
})();
