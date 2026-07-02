(()=>{
  if(window.__GOALOS_ASK_CONCIERGE_V62__) return; window.__GOALOS_ASK_CONCIERGE_V62__=true;
  const data=window.GOALOS_ASK_DATA||{routes:[],intents:[],routeCount:0};
  const ROUTES=Array.isArray(data.routes)?data.routes:[];
  const INTENTS=Array.isArray(data.intents)?data.intents:[];
  const POSTURE=data.posture||{};
  const stop=new Set('the a an and or to of in on for with this that what where how why is are be do does can it me my our your goalos agi ai page site show find open go take route explain please about from live autonomous question answer chat window'.split(' '));
  const aliasMap={
    docket:['evidence','proof','claims','replay','verifier','risk'],
    proof:['evidence','verification','docket','claim','replay','validator'],
    settlement:['escrow','proofbundle','validate','chronicle','job','work'],
    rsi:['recursive','invention','move37','move','37','target','emit','filter','atlas','eval','promote','dossier'],
    asi:['superintelligence','horizon','council','authority','firewall','capacity'],
    token:['agialpha','wallet','market','mainnet','boundary'],
    privacy:['data','cookies','analytics','storage','forms','gdpr'],
    loop:['restart','trace','contract','state','disk','harness','bottleneck'],
    start:['begin','new','overview','concierge','command'],
    pages:['routes','catalog','index','missing','all'],
    legal:['boundary','terms','privacy','regulatory','third','party'],
    lean:['proof','verification','theorem','build','replay','evidence']
  };
  const doctrine={
    start:'Start with the Experience Command or Concierge. They are the clearest front doors: one explains what the institution is, the other routes you by intent.',
    proof:'A proof path starts with a public-safe claim, then moves through claims matrix, provenance, verifier report, risk ledger, replay path, and Evidence Docket.',
    settlement:'Settlement is never a vibe. The public demo shows Request → Escrow → Execute → Proof → Validate → Settle → Chronicle, without moving funds.',
    loop:'A loop becomes trustworthy only when roles are separated, state is written down, traces can be read, restarts are possible, and proof gates decide what survives.',
    rsi:'RSI pages show deterministic invention governance. Search may allocate attention, but evidence, baselines, replay, risk, and persistence decide outcomes.',
    asi:'ASI/superintelligence pages are governance-horizon demos, not achievement claims. Higher capability pressure narrows authority and raises the evidence burden.',
    legal:'Boundary pages explain the default-deny posture: no user data wanted, no tracking, no public wallet connection, no token sale, no regulated-service claim.',
    agialpha:'AGIALPHA is treated as an existing third-party market token boundary. This site does not sell, broker, custody, route, recommend, or make it available.',
    all:'The complete route index and command center are the route recovery layer. They exist so no preserved page becomes invisible.'
  };
  const norm=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const basePrefix=()=>/\/evidence\//.test(location.pathname)?'../':'';
  const linkFor=href=>href&&href.startsWith('http')?href:basePrefix()+href;
  function terms(q){const base=norm(q).split(' ').filter(t=>t&&!stop.has(t)); const out=new Set(base); for(const t of base){(aliasMap[t]||[]).forEach(a=>out.add(a));} return [...out];}
  function routeText(r){return norm([r.title,r.href,r.group,r.audience,r.description,r.outputArtifact,r.boundary].join(' '));}
  function scoreRoute(q,r){const ts=terms(q); const text=routeText(r); const title=norm(r.title); const href=norm(r.href); let score=0; for(const t of ts){ if(text.includes(t)) score+=1; if(title.includes(t)) score+=2.8; if(href.includes(t)) score+=1.8; if(norm(r.group).includes(t)) score+=1.1; } if(title&&norm(q).includes(title)) score+=10; if(norm(q).includes(href.replace(/ html$/,''))) score+=6; return ts.length?score/Math.sqrt(ts.length):0; }
  function intentScores(q){const nq=norm(q); return INTENTS.map(it=>{let s=0; for(const k of it.keywords||[]){const nk=norm(k); if(nk&&nq.includes(nk)) s+=3+nk.split(' ').length*.4; } const t=terms(q); for(const word of t){ if(norm([it.id,it.label,it.answer].join(' ')).includes(word)) s+=.55; } return {...it,_score:s};}).filter(it=>it._score>0).sort((a,b)=>b._score-a._score); }
  function topRoutes(q,forced){const seeded=[]; (forced||[]).forEach(h=>{const r=ROUTES.find(x=>x.href===h); if(r&&!seeded.find(y=>y.href===r.href)) seeded.push(r);}); const ranked=ROUTES.map(r=>({route:r,score:scoreRoute(q,r)})).filter(x=>x.score>0).sort((a,b)=>b.score-a.score); for(const x of ranked){ if(!seeded.find(r=>r.href===x.route.href)) seeded.push(x.route); if(seeded.length>=6) break; } if(!seeded.length){['experience-command.html','ask-goalos.html','complete-route-index.html','command-center.html','canonical-proof-institution.html'].forEach(h=>{const r=ROUTES.find(x=>x.href===h); if(r) seeded.push(r);}); } return seeded.slice(0,6); }
  function buildAnswer(q){const intents=intentScores(q); const primary=intents[0]; const routes=topRoutes(q, primary&&primary.routes); const confidence=Math.max(0.18, Math.min(0.97, ((primary?primary._score:0)+routes.length*.6)/10)); const pid=(primary&&primary.id)||'all'; let answer=(primary&&primary.answer)||'I can route this through the public proof institution. The safest next step is to inspect the matching proof page, evidence room, boundary, or route index.'; let mode='route'; if(/\b(open|go to|take me to|route me to|show me)\b/i.test(q)) mode='navigate'; if(/\b(why|how|explain|what is|what are)\b/i.test(q)) mode='explain'; const routeNames=routes.slice(0,3).map(r=>r.title).join(', '); const bullets=[doctrine[pid]||doctrine.all, 'Best next route: '+(routes[0]?.title||'Experience Command')+'.', 'I do not send this question to a server, store it, connect a wallet, approve tokens, or claim production authority.']; const receipt={receiptType:'GoalOSQuestionRoutingReceipt',version:'v62-sovereign-router',query:q,mode,primaryIntent:primary?primary.id:'fallback',confidence:Number(confidence.toFixed(2)),routes:routes.map(r=>({title:r.title,href:r.href,group:r.group,outputArtifact:r.outputArtifact||''})),boundary:{browserLocal:true,networkRequests:false,storage:false,walletCalls:false,analytics:false,userDataRetained:false,productionAuthority:false},routeCount:data.routeCount||ROUTES.length,generatedAt:new Date().toISOString()}; return {answer,bullets,routes,confidence,mode,routeNames,receipt}; }
  function cardHTML(routes){return '<div class="goalos-ask__routes">'+routes.map((r,i)=>'<a href="'+linkFor(r.href)+'"><small>'+esc(r.group||('Route '+(i+1)))+'</small><strong>'+esc(r.title)+'</strong><span>'+esc(r.description||'Open this public-safe route.')+'</span><em>'+esc(r.outputArtifact||'public route')+'</em></a>').join('')+'</div>';}
  function receiptBlob(receipt){return new Blob([JSON.stringify(receipt,null,2)],{type:'application/json'});}
  function install(){
    const box=document.createElement('div'); box.className='goalos-ask goalos-ask--v62';
    box.innerHTML='<button class="goalos-ask__button" type="button" aria-expanded="false">Ask GoalOS</button><section class="goalos-ask__panel" role="dialog" aria-label="Ask GoalOS autonomous question router"><div class="goalos-ask__head"><div><small>local proof concierge · v62</small><b>Ask GoalOS</b><span>answers locally, routes precisely</span></div><button class="goalos-ask__close" type="button" aria-label="Close Ask GoalOS">×</button></div><div class="goalos-ask__status"><b>'+esc(String(data.routeCount||ROUTES.length))+'</b><span>routes indexed</span><b>0</b><span>network calls</span><b>0</b><span>stored questions</span></div><div class="goalos-ask__quick"><button type="button" data-q="I am new. Where should I start?">Start</button><button type="button" data-q="How do I build an Evidence Docket?">Evidence</button><button type="button" data-q="Open Loop to RSI Control Room">Loop → RSI</button><button type="button" data-q="Explain the AGIALPHA boundary">AGIALPHA</button><button type="button" data-q="Find all pages">All pages</button></div><div class="goalos-ask__log" aria-live="polite"></div><div class="goalos-ask__tools"><button type="button" data-copy>Copy answer</button><button type="button" data-download>Download receipt</button><a href="'+linkFor('ask-goalos.html')+'">Full console</a></div><div class="goalos-ask__composer"><textarea class="goalos-ask__input" aria-label="Ask a public-site question" placeholder="Ask: Where do I start? How do I inspect proof? What page explains RSI?" rows="1"></textarea><button class="goalos-ask__send" type="button">Ask</button></div><div class="goalos-ask__boundary">Local only: no account, no network request, no wallet, no analytics, no cookies, no browser storage, no user data retained.</div></section>';
    document.body.appendChild(box);
    const openBtn=box.querySelector('.goalos-ask__button'),panel=box.querySelector('.goalos-ask__panel'),closeBtn=box.querySelector('.goalos-ask__close'),log=box.querySelector('.goalos-ask__log'),input=box.querySelector('.goalos-ask__input'),send=box.querySelector('.goalos-ask__send');
    let last=null;
    function show(){panel.classList.add('open');openBtn.setAttribute('aria-expanded','true'); if(!log.dataset.seeded){bot('Ask a public-site question. I will answer from local route/proof data, show the strongest pages, and open a page only when you explicitly ask me to route you. In other words, it navigates only when the visitor explicitly asks.'); log.dataset.seeded='1';} setTimeout(()=>input.focus(),20);} function hide(){panel.classList.remove('open');openBtn.setAttribute('aria-expanded','false');}
    function add(kind,html){const m=document.createElement('div');m.className='goalos-ask__msg '+kind;m.innerHTML=html;log.appendChild(m);log.scrollTop=log.scrollHeight;return m;}
    function bot(text,routes,extra){add('assistant','<div>'+esc(text)+'</div>'+(extra?'<ul>'+extra.map(x=>'<li>'+esc(x)+'</li>').join('')+'</ul>':'')+(routes?cardHTML(routes):''));}
    function ask(q){q=(q||input.value||'').trim(); if(!q) return; add('user',esc(q)); input.value=''; last=buildAnswer(q); const confidence=Math.round(last.confidence*100); bot(last.answer,last.routes,[last.bullets[0],'Confidence '+confidence+'%. Best route: '+(last.routes[0]?.title||'Experience Command')+'.',last.bullets[2]]); if(last.mode==='navigate'&&last.routes&&last.routes[0]) setTimeout(()=>{location.href=linkFor(last.routes[0].href)},560);}
    openBtn.addEventListener('click',()=>panel.classList.contains('open')?hide():show()); closeBtn.addEventListener('click',hide); send.addEventListener('click',()=>ask()); input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask();}}); box.querySelectorAll('[data-q]').forEach(b=>b.addEventListener('click',()=>{show();ask(b.getAttribute('data-q'))}));
    box.querySelector('[data-copy]').addEventListener('click',()=>{ if(!last) return bot('Ask a question first, then I can copy the local answer summary.'); const text=[last.answer,...last.bullets,'Routes: '+last.routes.map(r=>r.title+' ('+r.href+')').join('; ')].join('\n'); if(navigator.clipboard&&navigator.clipboard.writeText) navigator.clipboard.writeText(text).catch(()=>{}); bot('Answer summary prepared for copying. Nothing was sent anywhere.'); });
    box.querySelector('[data-download]').addEventListener('click',()=>{ const receipt=(last&&last.receipt)||buildAnswer('Where should I start?').receipt; const a=document.createElement('a'); a.href=URL.createObjectURL(receiptBlob(receipt)); a.download='goalos-question-routing-receipt-v62.json'; a.click(); setTimeout(()=>URL.revokeObjectURL(a.href),1000); });
    document.addEventListener('keydown',e=>{if(e.key==='Escape')hide(); if((e.ctrlKey||e.metaKey)&&e.shiftKey&&e.key.toLowerCase()==='k'){e.preventDefault();show();}});
  }
  window.GOALOS_ASK_ROUTER_V62={buildAnswer,topRoutes,intentScores,posture:POSTURE};
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install); else install();
})();
