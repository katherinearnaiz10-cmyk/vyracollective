// Add VYRA remote-support tools without changing the existing Tools & Technology setup.
(()=>{
  const addRemoteTools=()=>{
    const groups=[...document.querySelectorAll('#tools .tool-group')];
    if(!groups.length)return false;
    if(document.querySelector('#tools [data-vyra-remote-tool="anydesk"]'))return true;
    const projectGroup=groups.find(g=>/Project & Communication/i.test(g.querySelector('.tool-group-title')?.textContent||''))||groups[1]||groups[0];
    const grid=projectGroup?.querySelector('.tools-grid');
    if(!grid)return false;
    const tools=[
      ['anydesk','AnyDesk','https://www.google.com/s2/favicons?domain=anydesk.com&sz=128'],
      ['chrome-remote','Chrome Remote Desktop','https://www.google.com/s2/favicons?domain=remotedesktop.google.com&sz=128']
    ];
    tools.forEach(([id,name,logo])=>{
      const card=document.createElement('div');
      card.className='tool-card';
      card.dataset.vyraRemoteTool=id;
      card.innerHTML=`<div class="tool-logo-wrap"><img src="${logo}" alt="${name} logo" loading="lazy"></div><span>${name}</span>`;
      grid.appendChild(card);
    });
    return true;
  };
  if(addRemoteTools())return;
  const observer=new MutationObserver(()=>{if(addRemoteTools())observer.disconnect()});
  observer.observe(document.documentElement,{childList:true,subtree:true});
  setTimeout(()=>observer.disconnect(),8000);
})();
