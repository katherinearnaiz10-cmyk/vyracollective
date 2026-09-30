// Add VYRA remote-support tools without changing the existing Tools & Technology setup.
(()=>{
  const tools=[
    ['anydesk','AnyDesk','https://www.google.com/s2/favicons?domain=anydesk.com&sz=128'],
    ['chrome-remote','Chrome Remote Desktop','https://www.google.com/s2/favicons?domain=remotedesktop.google.com&sz=128']
  ];

  const addRemoteTools=()=>{
    const groups=[...document.querySelectorAll('#tools .tool-group')];
    if(!groups.length)return false;
    const projectGroup=groups.find(g=>/Project & Communication/i.test(g.querySelector('.tool-group-title')?.textContent||''))||groups[1]||groups[0];
    const grid=projectGroup?.querySelector('.tools-grid');
    if(!grid)return false;

    // Remove duplicate cards, regardless of whether they came from the HTML or this script.
    tools.forEach(([id,name,logo])=>{
      const cards=[...grid.querySelectorAll('.tool-card')].filter(card=>
        card.querySelector('span')?.textContent.trim().toLowerCase()===name.toLowerCase()
      );
      cards.slice(1).forEach(card=>card.remove());
      if(!cards.length){
        const card=document.createElement('div');
        card.className='tool-card';
        card.dataset.vyraRemoteTool=id;
        card.innerHTML=`<div class="tool-logo-wrap"><img src="${logo}" alt="${name} logo" loading="lazy"></div><span>${name}</span>`;
        grid.appendChild(card);
      }
    });
    return true;
  };

  if(!addRemoteTools()){
    const observer=new MutationObserver(()=>{
      if(addRemoteTools()) observer.disconnect();
    });
    observer.observe(document.documentElement,{childList:true,subtree:true});
    setTimeout(()=>observer.disconnect(),8000);
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
