/* VYRA GLASS CURSOR */
(()=>{
  const fine=window.matchMedia('(pointer:fine) and (min-width:769px)');
  if(!fine.matches)return;
  const cursor=document.createElement('div');
  cursor.className='vyra-cursor is-hidden';
  cursor.setAttribute('aria-hidden','true');
  document.body.appendChild(cursor);
  let x=-100,y=-100,cx=-100,cy=-100,raf;
  const draw=()=>{cx+=(x-cx)*.22;cy+=(y-cy)*.22;cursor.style.transform=`translate3d(${cx}px,${cy}px,0) translate(-50%,-50%)`;raf=requestAnimationFrame(draw)};
  draw();
  document.addEventListener('mousemove',e=>{x=e.clientX;y=e.clientY;cursor.classList.remove('is-hidden')},{passive:true});
  document.addEventListener('mouseover',e=>{if(e.target.closest('a,button,input,select,textarea,label,[role="button"],.service-card,.team-card,.graphic-card,.video-card,.logo-wall>div'))cursor.classList.add('is-hover')});
  document.addEventListener('mouseout',e=>{if(e.target.closest('a,button,input,select,textarea,label,[role="button"],.service-card,.team-card,.graphic-card,.video-card,.logo-wall>div'))cursor.classList.remove('is-hover')});
  document.addEventListener('mousedown',()=>cursor.classList.add('is-click'));
  document.addEventListener('mouseup',()=>cursor.classList.remove('is-click'));
  document.addEventListener('mouseleave',()=>cursor.classList.add('is-hidden'));
  document.addEventListener('mouseenter',()=>cursor.classList.remove('is-hidden'));
  window.addEventListener('blur',()=>cursor.classList.add('is-hidden'));
})();

// Load the secure PayMongo card checkout UI after the main VYRA payment section is created.
(()=>{const s=document.createElement('script');s.src='card-payment.js';s.defer=true;document.body.appendChild(s)})();

// Load VYRA cinematic portfolio interactions.
(()=>{const s=document.createElement('script');s.src='portfolio-upgrade.js';s.defer=true;document.body.appendChild(s)})();
