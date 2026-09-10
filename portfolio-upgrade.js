// VYRA cinematic portfolio upgrade
(() => {
  const work=document.querySelector('#work');
  const videoPanel=document.querySelector('#videos');
  const videoGrid=videoPanel?.querySelector('.video-grid');
  const tabs=[...document.querySelectorAll('#work .tab')];
  if(!work||!videoPanel||!videoGrid) return;

  videoPanel.classList.add('cinema-panel');
  videoGrid.classList.add('film-strip');
  const cards=[...videoGrid.querySelectorAll('.video-card')];

  // Replace static thumbnails visually with real muted video previews.
  cards.forEach((card,index)=>{
    card.classList.add('film-frame');
    card.style.setProperty('--film-index',index);
    const poster=card.querySelector('img');
    const preview=document.createElement('video');
    preview.className='film-preview';
    preview.src=card.dataset.video;
    preview.muted=true;
    preview.playsInline=true;
    preview.preload='metadata';
    if(poster?.src) preview.poster=poster.src;
    poster?.insertAdjacentElement('afterend',preview);
    let timer;
    const stop=()=>{clearTimeout(timer);preview.pause();try{preview.currentTime=0}catch(e){}};
    card.addEventListener('mouseenter',()=>{
      if(window.matchMedia('(hover:hover)').matches){
        preview.currentTime=0;
        const p=preview.play();if(p?.catch)p.catch(()=>{});
        timer=setTimeout(stop,5500);
      }
    });
    card.addEventListener('mouseleave',stop);
    card.addEventListener('focus',()=>{preview.currentTime=0;preview.play().catch(()=>{});timer=setTimeout(stop,5500)});
    card.addEventListener('blur',stop);
  });

  // Smooth slide + blur + fade category transition.
  tabs.forEach(tab=>tab.addEventListener('click',e=>{
    const target=document.getElementById(tab.dataset.target);
    const current=document.querySelector('#work .portfolio-panel.active');
    if(!target||target===current) return;
    e.stopImmediatePropagation();
    tabs.forEach(t=>t.classList.toggle('active',t===tab));
    if(current){
      current.classList.add('portfolio-leaving');
      setTimeout(()=>{
        current.classList.remove('active','portfolio-leaving');
        target.classList.add('active','portfolio-entering');
        requestAnimationFrame(()=>requestAnimationFrame(()=>target.classList.remove('portfolio-entering')));
      },260);
    } else target.classList.add('active');
  }),true);

  const style=document.createElement('style');
  style.textContent=`
  #work{overflow:hidden}
  #work .tabs{position:relative;z-index:4;margin-bottom:30px}
  #work .portfolio-panel{transform-origin:50% 20%;transition:opacity .42s cubic-bezier(.22,.8,.22,1),transform .42s cubic-bezier(.22,.8,.22,1),filter .42s ease}
  #work .portfolio-panel.portfolio-leaving{display:block!important;opacity:0;transform:translateX(-38px) scale(.985);filter:blur(9px);pointer-events:none}
  #work .portfolio-panel.portfolio-entering{opacity:0;transform:translateX(42px) scale(.985);filter:blur(10px)}
  #videos.cinema-panel{position:relative;padding:24px 0 28px}
  #videos.cinema-panel:before,#videos.cinema-panel:after{content:'';position:absolute;left:0;right:0;height:11px;z-index:2;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(241,201,120,.8) 0 13px,transparent 13px 24px);opacity:.48;filter:drop-shadow(0 0 6px rgba(241,201,120,.24))}
  #videos.cinema-panel:before{top:2px}#videos.cinema-panel:after{bottom:5px}
  #videos .film-strip{display:flex!important;grid-template-columns:none!important;gap:18px!important;overflow-x:auto;overflow-y:hidden;padding:16px 4vw 24px;scroll-snap-type:x proximity;scrollbar-width:thin;scrollbar-color:rgba(241,201,120,.55) rgba(255,255,255,.06);perspective:1200px}
  #videos .film-strip::-webkit-scrollbar{height:7px}#videos .film-strip::-webkit-scrollbar-track{background:rgba(255,255,255,.05);border-radius:20px}#videos .film-strip::-webkit-scrollbar-thumb{background:linear-gradient(90deg,#9dcfff,#f1c978);border-radius:20px}
  #videos .film-frame{position:relative!important;flex:0 0 clamp(260px,31vw,390px)!important;width:clamp(260px,31vw,390px)!important;min-height:245px;scroll-snap-align:center;overflow:hidden;border:1px solid rgba(185,221,255,.25)!important;border-radius:18px!important;background:linear-gradient(145deg,rgba(7,23,93,.88),rgba(3,10,45,.94))!important;box-shadow:0 18px 45px rgba(0,0,0,.3),inset 0 1px rgba(255,255,255,.12);transition:transform .35s cubic-bezier(.2,.8,.2,1),border-color .35s,box-shadow .35s;isolation:isolate}
  #videos .film-frame.wide{grid-column:auto!important}
  #videos .film-frame:hover{transform:translateY(-9px) scale(1.025);border-color:rgba(241,201,120,.78)!important;box-shadow:0 24px 58px rgba(0,0,0,.38),0 0 28px rgba(241,201,120,.18),inset 0 0 22px rgba(185,221,255,.08)}
  #videos .film-frame>img,#videos .film-preview{width:100%!important;height:190px!important;object-fit:cover!important;display:block;transition:opacity .28s,transform .6s}
  #videos .film-preview{position:absolute;inset:0 0 auto 0;z-index:1;opacity:0;background:#020923}
  #videos .film-frame:hover .film-preview,#videos .film-frame:focus .film-preview{opacity:1}
  #videos .film-frame:hover>img{opacity:0}
  #videos .film-frame:hover .film-preview{transform:scale(1.035)}
  #videos .film-frame>.play{z-index:3;transition:opacity .25s,transform .25s}
  #videos .film-frame:hover>.play{opacity:0;transform:scale(.75)}
  #videos .film-frame>div{position:relative!important;z-index:3!important;padding:15px 17px 17px!important;background:linear-gradient(180deg,rgba(4,14,55,.9),rgba(3,9,38,.98))!important;text-align:left}
  #videos .film-frame b{color:#fff!important}#videos .film-frame small{color:#b9ddff!important}
  #videos .film-frame:after{content:'PREVIEW  •  CLICK TO WATCH';position:absolute;top:13px;right:13px;z-index:4;padding:6px 9px;border-radius:999px;background:rgba(3,10,45,.66);border:1px solid rgba(241,201,120,.38);backdrop-filter:blur(10px);color:#fff0bf;font:800 8px/1 Manrope,sans-serif;letter-spacing:.1em;opacity:0;transform:translateY(-5px);transition:.25s}
  #videos .film-frame:hover:after{opacity:1;transform:none}
  #mediaModal.open{backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)}
  #mediaModal .modal-content{border:1px solid rgba(241,201,120,.35);box-shadow:0 30px 100px rgba(0,0,0,.55),0 0 50px rgba(185,221,255,.08);background:rgba(4,13,50,.72);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px)}
  @media(max-width:700px){#videos .film-strip{padding-left:18px;padding-right:18px}#videos .film-frame{flex-basis:82vw!important;width:82vw!important}#videos .film-frame>img,#videos .film-preview{height:180px!important}}
  @media(prefers-reduced-motion:reduce){#work .portfolio-panel,#videos .film-frame,#videos .film-preview{transition:none!important}}
  `;
  document.head.appendChild(style);
})();
