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

  cards.forEach((card,index)=>{
    card.classList.add('film-frame'); card.dataset.filmIndex=index;
    const poster=card.querySelector('img');
    const preview=document.createElement('video');
    preview.className='film-preview'; preview.src=card.dataset.video; preview.muted=true; preview.playsInline=true; preview.preload='metadata';
    if(poster?.src) preview.poster=poster.src;
    poster?.insertAdjacentElement('afterend',preview);
    let timer;
    const stop=()=>{clearTimeout(timer);preview.pause();try{preview.currentTime=0}catch(e){}};
    card.addEventListener('mouseenter',()=>{if(window.matchMedia('(hover:hover)').matches){preview.currentTime=0;preview.play().catch(()=>{});timer=setTimeout(stop,5500)}});
    card.addEventListener('mouseleave',stop);
    card.addEventListener('focus',()=>{preview.currentTime=0;preview.play().catch(()=>{});timer=setTimeout(stop,5500)});
    card.addEventListener('blur',stop);
  });

  // Film-strip navigation, dots and centered active frame.
  const controls=document.createElement('div'); controls.className='film-controls';
  controls.innerHTML=`<button class="film-arrow film-prev" type="button" aria-label="Previous video">←</button><div class="film-dots" aria-label="Video position"></div><button class="film-arrow film-next" type="button" aria-label="Next video">→</button>`;
  videoPanel.appendChild(controls);
  const dots=controls.querySelector('.film-dots');
  cards.forEach((card,i)=>{const dot=document.createElement('button');dot.type='button';dot.className='film-dot';dot.setAttribute('aria-label',`Go to video ${i+1}`);dot.addEventListener('click',()=>card.scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'}));dots.appendChild(dot)});
  const dotEls=[...dots.children];
  const setActive=i=>{cards.forEach((c,n)=>c.classList.toggle('film-active',n===i));dotEls.forEach((d,n)=>d.classList.toggle('active',n===i))}; setActive(0);
  const nearest=()=>{const box=videoGrid.getBoundingClientRect(),center=box.left+box.width/2;let best=0,dist=Infinity;cards.forEach((c,i)=>{const r=c.getBoundingClientRect(),d=Math.abs(r.left+r.width/2-center);if(d<dist){dist=d;best=i}});setActive(best);return best};
  let scrollTimer; videoGrid.addEventListener('scroll',()=>{clearTimeout(scrollTimer);scrollTimer=setTimeout(nearest,80)},{passive:true});
  controls.querySelector('.film-prev').addEventListener('click',()=>{const i=nearest();cards[Math.max(0,i-1)].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})});
  controls.querySelector('.film-next').addEventListener('click',()=>{const i=nearest();cards[Math.min(cards.length-1,i+1)].scrollIntoView({behavior:'smooth',block:'nearest',inline:'center'})});

  // Smooth slide + blur + fade category transition.
  tabs.forEach(tab=>tab.addEventListener('click',e=>{
    const target=document.getElementById(tab.dataset.target), current=document.querySelector('#work .portfolio-panel.active');
    if(!target||target===current) return; e.stopImmediatePropagation(); tabs.forEach(t=>t.classList.toggle('active',t===tab));
    if(current){current.classList.add('portfolio-leaving');setTimeout(()=>{current.classList.remove('active','portfolio-leaving');target.classList.add('active','portfolio-entering');requestAnimationFrame(()=>requestAnimationFrame(()=>target.classList.remove('portfolio-entering')))},260)}else target.classList.add('active');
  }),true);

  // Custom PLAY / VIEW glass cursor inspired by the approved reference.
  const actionCursor=document.createElement('div'); actionCursor.className='portfolio-action-cursor'; actionCursor.setAttribute('aria-hidden','true'); document.body.appendChild(actionCursor);
  document.addEventListener('mousemove',e=>{actionCursor.style.left=e.clientX+'px';actionCursor.style.top=e.clientY+'px'},{passive:true});
  document.addEventListener('mouseover',e=>{const v=e.target.closest('#videos .video-card'),g=e.target.closest('#graphics .graphic-card');if(v||g){actionCursor.textContent=v?'PLAY':'VIEW';actionCursor.classList.add('show');document.body.classList.add('portfolio-cursor-on')}});
  document.addEventListener('mouseout',e=>{if(e.target.closest('#videos .video-card,#graphics .graphic-card')){actionCursor.classList.remove('show');document.body.classList.remove('portfolio-cursor-on')}});

  const style=document.createElement('style'); style.textContent=`
  #work{overflow:hidden} #work .tabs{position:relative;z-index:4;margin:0 auto 34px;width:max-content;padding:4px;border:1px solid rgba(185,221,255,.18);border-radius:999px;background:rgba(2,9,34,.38);backdrop-filter:blur(14px)}
  #work .tab{min-width:170px;border-radius:999px!important;transition:.3s!important} #work .tab.active{border-color:rgba(241,201,120,.8)!important;box-shadow:0 0 20px rgba(241,201,120,.18),inset 0 0 14px rgba(241,201,120,.06)!important;color:#fff0bf!important}
  #work .portfolio-panel{transform-origin:50% 20%;transition:opacity .42s cubic-bezier(.22,.8,.22,1),transform .42s cubic-bezier(.22,.8,.22,1),filter .42s ease}
  #work .portfolio-panel.portfolio-leaving{display:block!important;opacity:0;transform:translateX(-38px) scale(.985);filter:blur(9px);pointer-events:none} #work .portfolio-panel.portfolio-entering{opacity:0;transform:translateX(42px) scale(.985);filter:blur(10px)}
  #videos.cinema-panel{position:relative;padding:30px 0 8px;background:linear-gradient(180deg,rgba(1,8,31,.35),rgba(4,16,55,.2));border-top:1px solid rgba(185,221,255,.12);border-bottom:1px solid rgba(185,221,255,.12)}
  #videos.cinema-panel:before,#videos.cinema-panel:after{content:'';position:absolute;left:0;right:0;height:14px;z-index:3;pointer-events:none;background:repeating-linear-gradient(90deg,rgba(6,25,61,.96) 0 14px,transparent 14px 24px);border-top:1px solid rgba(139,201,255,.25);border-bottom:1px solid rgba(139,201,255,.16);box-shadow:0 0 12px rgba(139,201,255,.12)} #videos.cinema-panel:before{top:5px} #videos.cinema-panel:after{bottom:54px}
  #videos .film-strip{display:flex!important;gap:16px!important;overflow-x:auto;overflow-y:hidden;padding:14px calc(50% - 190px) 25px;scroll-snap-type:x mandatory;scrollbar-width:none;perspective:1300px} #videos .film-strip::-webkit-scrollbar{display:none}
  #videos .film-frame{position:relative!important;flex:0 0 380px!important;width:380px!important;min-height:250px;scroll-snap-align:center;overflow:hidden;border:1px solid rgba(185,221,255,.22)!important;border-radius:12px!important;background:#030c2a!important;box-shadow:0 14px 38px rgba(0,0,0,.32);opacity:.72;transform:scale(.94);transition:transform .36s cubic-bezier(.2,.8,.2,1),opacity .36s,border-color .36s,box-shadow .36s;isolation:isolate}
  #videos .film-frame.wide{grid-column:auto!important} #videos .film-frame.film-active,#videos .film-frame:hover{opacity:1;transform:translateY(-4px) scale(1.02);border-color:rgba(241,201,120,.88)!important;box-shadow:0 22px 54px rgba(0,0,0,.42),0 0 24px rgba(241,201,120,.2),inset 0 0 20px rgba(185,221,255,.05)}
  #videos .film-frame>img,#videos .film-preview{width:100%!important;height:195px!important;object-fit:cover!important;display:block;transition:opacity .28s,transform .6s} #videos .film-preview{position:absolute;inset:0 0 auto;z-index:1;opacity:0;background:#020923} #videos .film-frame:hover .film-preview,#videos .film-frame:focus .film-preview{opacity:1;transform:scale(1.035)} #videos .film-frame:hover>img{opacity:0} #videos .film-frame>.play{z-index:3;transition:.25s} #videos .film-frame:hover>.play{opacity:0;transform:scale(.75)}
  #videos .film-frame>div{position:relative!important;z-index:3!important;padding:14px 16px 16px!important;background:linear-gradient(180deg,rgba(4,14,55,.91),rgba(3,9,38,.99))!important;text-align:left} #videos .film-frame b{color:#fff!important} #videos .film-frame small{color:#b9ddff!important}
  #videos .film-frame:after{content:'PREVIEW • CLICK TO WATCH';position:absolute;top:12px;right:12px;z-index:4;padding:6px 9px;border-radius:999px;background:rgba(3,10,45,.72);border:1px solid rgba(241,201,120,.42);backdrop-filter:blur(10px);color:#fff0bf;font:800 8px/1 Manrope,sans-serif;letter-spacing:.1em;opacity:0;transform:translateY(-5px);transition:.25s} #videos .film-frame:hover:after{opacity:1;transform:none}
  .film-controls{height:50px;display:flex;align-items:center;justify-content:center;gap:20px;position:relative;z-index:5}.film-arrow{width:36px;height:36px;border-radius:50%!important;border:1px solid rgba(241,201,120,.38)!important;background:rgba(3,11,40,.62)!important;color:#fff0bf!important;font-size:18px!important;display:grid;place-items:center;transition:.25s!important}.film-arrow:hover{border-color:#f1c978!important;box-shadow:0 0 18px rgba(241,201,120,.22)!important;transform:scale(1.08)}.film-dots{display:flex;gap:8px}.film-dot{width:6px!important;height:6px!important;min-width:6px!important;padding:0!important;border:0!important;border-radius:50%!important;background:rgba(185,221,255,.28)!important;transition:.25s!important}.film-dot.active{background:#f1c978!important;box-shadow:0 0 8px rgba(241,201,120,.7);transform:scale(1.35)}
  .portfolio-action-cursor{position:fixed;z-index:99999;width:58px;height:58px;border-radius:50%;display:grid;place-items:center;pointer-events:none;transform:translate(-50%,-50%) scale(.55);opacity:0;background:rgba(3,12,44,.72);border:1px solid rgba(241,201,120,.85);box-shadow:0 0 22px rgba(241,201,120,.3),inset 0 0 14px rgba(185,221,255,.1);backdrop-filter:blur(10px);color:#fff0bf;font:800 10px/1 Manrope,sans-serif;letter-spacing:.08em;transition:opacity .18s,transform .18s}.portfolio-action-cursor.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
  @media(pointer:fine){body.portfolio-cursor-on .vyra-cursor{opacity:0!important}body.portfolio-cursor-on #work .video-card,body.portfolio-cursor-on #work .graphic-card{cursor:none!important}}
  #mediaModal.open{backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px)} #mediaModal .modal-content{border:1px solid rgba(241,201,120,.35);box-shadow:0 30px 100px rgba(0,0,0,.55),0 0 50px rgba(185,221,255,.08);background:rgba(4,13,50,.72);backdrop-filter:blur(22px);-webkit-backdrop-filter:blur(22px)}
  @media(max-width:700px){#work .tabs{width:100%;display:flex}#work .tab{min-width:0;flex:1}#videos .film-strip{padding-left:9vw;padding-right:9vw}#videos .film-frame{flex-basis:82vw!important;width:82vw!important}#videos .film-frame>img,#videos .film-preview{height:180px!important}.portfolio-action-cursor{display:none}#videos.cinema-panel:after{bottom:54px}}
  @media(prefers-reduced-motion:reduce){#work .portfolio-panel,#videos .film-frame,#videos .film-preview{transition:none!important}}
  `; document.head.appendChild(style);
})();
