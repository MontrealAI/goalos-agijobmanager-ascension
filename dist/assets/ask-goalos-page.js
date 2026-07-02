(()=>{
  const data=window.GOALOS_ASK_DATA||{routes:[],routeCount:0};
  const esc=s=>String(s||'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const router=()=>window.GOALOS_ASK_ROUTER_V62;
  function cards(routes){return '<div class="ask-chat-routes">'+(routes||[]).map(r=>'<a href="'+esc(r.href)+'"><small>'+esc(r.group||'Route')+'</small><strong>'+esc(r.title)+'</strong><span>'+esc(r.description||'Open this route.')+'</span><em>'+esc(r.outputArtifact||'public route')+'</em></a>').join('')+'</div>'}
  function receiptDownload(receipt){const blob=new Blob([JSON.stringify(receipt,null,2)],{type:'application/json'});const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download='goalos-full-console-routing-receipt-v62.json';a.click();setTimeout(()=>URL.revokeObjectURL(a.href),900)}
  function install(){
    const tx=document.querySelector('[data-ask-transcript]'),input=document.querySelector('[data-ask-input]'),send=document.querySelector('[data-ask-send]'),meter=document.querySelector('[data-ask-confidence]'),intent=document.querySelector('[data-ask-intent]'),routeList=document.querySelector('[data-ask-route-list]');
    if(!tx||!input||!send)return; let last=null;
    function add(cls,html){const m=document.createElement('div');m.className='ask-chat-msg '+cls;m.innerHTML=html;tx.appendChild(m);tx.scrollTop=tx.scrollHeight;}
    function render(out){const pct=Math.round(out.confidence*100); if(meter) meter.style.setProperty('--ask-confidence',pct+'%'); if(intent) intent.textContent=(out.receipt.primaryIntent||'fallback').replace(/-/g,' ')+' · '+pct+'%'; if(routeList) routeList.innerHTML=cards(out.routes); add('assistant','<div>'+esc(out.answer)+'</div><ul>'+out.bullets.map(b=>'<li>'+esc(b)+'</li>').join('')+'</ul>'+cards(out.routes));}
    function ask(q){q=(q||input.value||'').trim();if(!q)return;add('user',esc(q));input.value='';const r=router(); last=(r&&r.buildAnswer?r.buildAnswer(q):null); if(!last){add('assistant','Ask GoalOS is loading the local route engine. Try again in a moment.');return;} render(last); if(last.mode==='navigate'&&last.routes[0])setTimeout(()=>{location.href=last.routes[0].href},620)}
    send.addEventListener('click',()=>ask());input.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();ask()}});document.querySelectorAll('[data-ask-question]').forEach(b=>b.addEventListener('click',()=>ask(b.getAttribute('data-ask-question'))));document.querySelector('[data-ask-export]')?.addEventListener('click',()=>receiptDownload((last&&last.receipt)||(router()?.buildAnswer('Where should I start?').receipt)||{}));document.querySelector('[data-ask-copy]')?.addEventListener('click',()=>{if(!last)return;const text=[last.answer,...last.bullets,'Routes: '+last.routes.map(r=>r.title+' — '+r.href).join('; ')].join('\n'); if(navigator.clipboard&&navigator.clipboard.writeText)navigator.clipboard.writeText(text).catch(()=>{});});
    add('assistant','Ask any public-site question. I answer locally, explain the route, and point you to the strongest proof page. No query leaves the browser.');
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install);else install();
})();
