const menuBtn=document.querySelector('.menu-btn'), nav=document.querySelector('.nav');
menuBtn.addEventListener('click',()=>{nav.classList.toggle('open');menuBtn.setAttribute('aria-expanded',nav.classList.contains('open'))});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const tabs=document.querySelectorAll('.tab');
tabs.forEach(tab=>tab.addEventListener('click',()=>{tabs.forEach(t=>t.classList.remove('active'));document.querySelectorAll('.portfolio-panel').forEach(p=>p.classList.remove('active'));tab.classList.add('active');document.getElementById(tab.dataset.target).classList.add('active')}));
const modal=document.getElementById('mediaModal'), modalContent=modal.querySelector('.modal-content');
function openModal(html){modalContent.innerHTML=html;modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModal(){const v=modal.querySelector('video');if(v)v.pause();modal.classList.remove('open');modal.setAttribute('aria-hidden','true');modalContent.innerHTML='';document.body.style.overflow=''}
document.querySelectorAll('.video-card').forEach(card=>card.addEventListener('click',()=>openModal(`<video controls autoplay playsinline src="${card.dataset.video}" aria-label="${card.dataset.title}"></video>`)));
document.querySelectorAll('.graphic-card').forEach(card=>card.addEventListener('click',()=>openModal(`<img src="${card.dataset.image}" alt="Graphic design sample">`)));
modal.querySelector('.modal-close').addEventListener('click',closeModal);modal.addEventListener('click',e=>{if(e.target===modal)closeModal()});document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

// VYRA guiding verse — directly below “Rise with purpose. Win together.”
const heroTitle=document.querySelector('.hero-copy h1');
if(heroTitle){
  const verse=document.createElement('div');
  verse.className='hero-verse';
  verse.innerHTML=`<p>“Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.”</p><span>— Colossians 3:23</span>`;
  heroTitle.insertAdjacentElement('afterend',verse);

  const style=document.createElement('style');
  style.textContent=`
    .hero-verse{max-width:650px;margin:-4px 0 24px;padding:17px 20px;border-left:3px solid #c7a25d;background:rgba(255,255,255,.65);border-radius:0 14px 14px 0}
    .hero-verse p{margin:0 0 7px;font-family:'Playfair Display',serif;font-size:17px;line-height:1.55;color:#07175d;font-style:italic}
    .hero-verse span{font-size:11px;font-weight:800;letter-spacing:.1em;color:#68708a;text-transform:uppercase}
    @media(max-width:620px){.hero-verse{margin-top:-6px;padding:14px 16px}.hero-verse p{font-size:15px}}
  `;
  document.head.appendChild(style);
}
