// Add VYRA remote-support tools without changing the existing Tools & Technology setup.
(()=>{
  // Prevent multiple copies of this loader from adding duplicate cards.
  if(window.__vyraRemoteToolsLoaded)return;
  window.__vyraRemoteToolsLoaded=true;

  const tools=[
    ['anydesk','AnyDesk','https://www.google.com/s2/favicons?domain=anydesk.com&sz=128']
  ];

  const removeDuplicateAnyDesk=()=>{
    const cards=[...document.querySelectorAll('#tools .tool-card')].filter(card=>
      (card.querySelector('span')?.textContent||'').trim().toLowerCase()==='anydesk'
    );
    // Keep exactly one AnyDesk card on the entire Tools section.
    cards.slice(1).forEach(card=>card.remove());
    return cards[0]||null;
  };

  const addRemoteTools=()=>{
    const groups=[...document.querySelectorAll('#tools .tool-group')];
    if(!groups.length)return false;

    // First clean any duplicate cards anywhere in the Tools section.
    const existing=removeDuplicateAnyDesk();

    const projectGroup=groups.find(g=>/Project & Communication/i.test(g.querySelector('.tool-group-title')?.textContent||''))||groups[1]||groups[0];
    const grid=projectGroup?.querySelector('.tools-grid');
    if(!grid)return false;

    // Remove all Chrome Remote Desktop cards.
    [...document.querySelectorAll('#tools .tool-card')].forEach(card=>{
      const name=card.querySelector('span')?.textContent.trim().toLowerCase()||'';
      if(name==='chrome remote desktop')card.remove();
    });

    // Add AnyDesk only if there is no existing card anywhere in Tools.
    if(!existing && ![...document.querySelectorAll('#tools .tool-card')].some(card=>
      (card.querySelector('span')?.textContent||'').trim().toLowerCase()==='anydesk'
    )){
      const [id,name,logo]=tools[0];
      const card=document.createElement('div');
      card.className='tool-card';
      card.dataset.vyraRemoteTool=id;
      card.innerHTML=`<div class="tool-logo-wrap"><img src="${logo}" alt="${name} logo" loading="lazy"></div><span>${name}</span>`;
      grid.appendChild(card);
    }

    // Final cleanup in case another loader injected a duplicate during rendering.
    removeDuplicateAnyDesk();
    return true;
  };

  const runCleanup=()=>addRemoteTools();
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
