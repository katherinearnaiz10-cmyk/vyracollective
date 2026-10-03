// VYRA remote-support tools cleanup
(()=>{
  if(window.__vyraRemoteToolsLoaded)return;
  window.__vyraRemoteToolsLoaded=true;

  const cleanRemoteTools=()=>{
    const tools=document.querySelector('#tools');
    if(!tools)return;

    const cards=[...tools.querySelectorAll('.tool-card')];
    const textOf=card=>(card.textContent||'').replace(/\s+/g,' ').trim().toLowerCase();

    // Chrome Remote Desktop must never appear anywhere in the Tools section.
    cards.forEach(card=>{
      const text=textOf(card);
      if(text.includes('chrome remote desktop') || text.includes('chrome remote') || text.includes('remote desktop')){
        card.remove();
      }
    });

    // Keep only one AnyDesk card.
    const remaining=[...tools.querySelectorAll('.tool-card')];
    const anydeskCards=remaining.filter(card=>textOf(card).includes('anydesk'));
    anydeskCards.slice(1).forEach(card=>card.remove());
  };

  const start=()=>{
    cleanRemoteTools();
    const observer=new MutationObserver(()=>cleanRemoteTools());
    observer.observe(document.documentElement,{childList:true,subtree:true});
  };

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start);
  else start();
})();
