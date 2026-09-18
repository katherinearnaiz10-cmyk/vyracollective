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

// Official VYRA Collective social links.
(()=>{
  const addSocials=()=>{
    const footer=document.querySelector('footer');
    if(!footer||footer.querySelector('.vyra-social-links'))return !!footer;
    const socials=document.createElement('div');
    socials.className='vyra-social-links';
    socials.setAttribute('aria-label','VYRA Collective social media');
    socials.innerHTML=`<span>Follow VYRA</span><a href="https://www.facebook.com/profile.php?id=61594408973587" target="_blank" rel="noopener noreferrer" aria-label="VYRA Collective on Facebook">Facebook</a><a href="https://www.instagram.com/vyracollectiveph/" target="_blank" rel="noopener noreferrer" aria-label="VYRA Collective on Instagram">Instagram</a>`;
    footer.appendChild(socials);
    if(!document.getElementById('vyra-social-style')){
      const style=document.createElement('style');style.id='vyra-social-style';style.textContent=`.vyra-social-links{display:flex;align-items:center;gap:12px;flex-wrap:wrap}.vyra-social-links>span{font-size:10px;font-weight:800;letter-spacing:.13em;text-transform:uppercase;opacity:.65}.vyra-social-links a{display:inline-flex;align-items:center;justify-content:center;padding:8px 13px;border:1px solid rgba(255,255,255,.22);border-radius:999px;color:inherit;text-decoration:none;font-size:12px;font-weight:700;transition:.2s ease}.vyra-social-links a:hover{transform:translateY(-2px);border-color:#e7c979;color:#e7c979}@media(max-width:700px){.vyra-social-links{justify-content:center;width:100%}}`;document.head.appendChild(style);
    }
    return true;
  };
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',addSocials,{once:true});else addSocials();
})();
