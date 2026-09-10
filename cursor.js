// Load VYRA cinematic portfolio interactions.
(()=>{const s=document.createElement('script');s.src='portfolio-upgrade.js';s.defer=true;document.body.appendChild(s)})();

// Temporarily remove the Pay Invoice navigation tab and payment details from the live page.
(()=>{
  const hidePayment=()=>{
    document.querySelectorAll('a[href="#payment"]').forEach(el=>el.remove());
    document.querySelectorAll('#payment,.payment-section').forEach(el=>el.remove());
  };
  hidePayment();
  let tries=0;
  const timer=setInterval(()=>{hidePayment();if(++tries>100)clearInterval(timer)},100);
})();

// Add AnyDesk and Chrome Remote Desktop directly to the existing Tools & Technology grid.
(()=>{
  const addRemoteTools=()=>{
    const groups=[...document.querySelectorAll('#tools .tool-group')];
    if(!groups.length)return false;
    const projectGroup=groups.find(g=>/Project & Communication/i.test(g.querySelector('.tool-group-title')?.textContent||''))||groups[1]||groups[0];
    const grid=projectGroup?.querySelector('.tools-grid');
    if(!grid)return false;
    if(grid.querySelector('[data-vyra-remote="anydesk"]'))return true;

    const cards=[
      {id:'anydesk',name:'AnyDesk',icon:'https://www.google.com/s2/favicons?domain=anydesk.com&sz=128'},
      {id:'chrome-remote',name:'Chrome Remote Desktop',icon:'https://www.google.com/s2/favicons?domain=remotedesktop.google.com&sz=128'}
    ];

    cards.forEach(tool=>{
      const card=document.createElement('div');
      card.className='tool-card';
      card.dataset.vyraRemote=tool.id;
      card.innerHTML=`<div class="tool-logo-wrap"><img src="${tool.icon}" alt="${tool.name} icon"></div><span>${tool.name}</span>`;
      grid.appendChild(card);
    });
    return true;
  };

  let tries=0;
  const timer=setInterval(()=>{
    tries++;
    if(addRemoteTools()||tries>100)clearInterval(timer);
  },100);
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addRemoteTools,{once:true});
  else addRemoteTools();
})();
