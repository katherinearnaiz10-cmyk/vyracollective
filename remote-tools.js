// Clean up remote-support tools without creating duplicate cards.
(()=>{
  if(window.__vyraRemoteToolsLoaded)return;
  window.__vyraRemoteToolsLoaded=true;

  const cleanRemoteTools=()=>{
    const cards=[...document.querySelectorAll('#tools .tool-card')];

    // Keep only the first AnyDesk card that already exists in the Tools section.
    const anydeskCards=cards.filter(card=>
      (card.querySelector('span')?.textContent||'').trim().toLowerCase()==='anydesk'
    );
    anydeskCards.slice(1).forEach(card=>card.remove());

    // Remove Chrome Remote Desktop cards entirely.
    [...document.querySelectorAll('#tools .tool-card')].forEach(card=>{
      const name=(card.querySelector('span')?.textContent||'').trim().toLowerCase();
      if(name==='chrome remote desktop')card.remove();
    });

    return true;
  };

  const runCleanup=()=>cleanRemoteTools();
  if(!runCleanup()){
    const observer=new MutationObserver(runCleanup);
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),12000);
  }

  // Keep Blessing's public team name consistent across the VYRA website.
  const updateBlessingName=()=>{
    document.querySelectorAll('#team .team-card').forEach(card=>{
      const heading=card.querySelector('h3');
      const image=card.querySelector('img');
      if(heading && heading.textContent.trim()==='Blessing Chisom Onyeka') heading.textContent='Blessing Chisom Eze';
      if(image && image.alt.trim()==='Blessing Chisom Onyeka') image.alt='Blessing Chisom Eze';
    });
  };
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',updateBlessingName);
  else updateBlessingName();

  // Load the VYRA screen-by-screen navigation layer.
  const screenCss=document.createElement('link');
  screenCss.rel='stylesheet';
  screenCss.href='screen-nav.css?v=1';
  document.head.appendChild(screenCss);
  const screenScript=document.createElement('script');
  screenScript.src='screen-nav.js?v=1';
  screenScript.defer=true;
  document.body.appendChild(screenScript);
})();
