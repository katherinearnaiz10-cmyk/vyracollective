// Clean up remote-support tools without creating duplicate cards.
(()=>{
  if(window.__vyraRemoteToolsLoaded)return;
  window.__vyraRemoteToolsLoaded=true;

  const cleanRemoteTools=()=>{
    const cards=[...document.querySelectorAll('#tools .tool-card')];

    // Keep only the first AnyDesk card already present in the Tools section.
    const anydeskCards=cards.filter(card=>
      (card.querySelector('span')?.textContent||'').trim().toLowerCase()==='anydesk'
    );
    anydeskCards.slice(1).forEach(card=>card.remove());

    // Chrome Remote Desktop must never appear in the VYRA Tools section.
    [...document.querySelectorAll('#tools .tool-card')].forEach(card=>{
      const name=(card.querySelector('span')?.textContent||'').trim().toLowerCase();
      if(name.includes('chrome remote desktop')) card.remove();
    });
  };

  // Run immediately and keep watching because the Tools section can be rendered
  // after this script loads or re-rendered by the portal.
  cleanRemoteTools();
  const observer=new MutationObserver(()=>cleanRemoteTools());
  observer.observe(document.documentElement,{childList:true,subtree:true});

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
  screenCss.href='screen-nav.css?v=2';
  document.head.appendChild(screenCss);
  const screenScript=document.createElement('script');
  screenScript.src='screen-nav.js?v=2';
  screenScript.defer=true;
  document.body.appendChild(screenScript);
})();
