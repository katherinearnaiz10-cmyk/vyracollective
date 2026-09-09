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

// VYRA Tools & Technology section
const toolGroups=[
  {title:'Creative & Content',tools:[
    ['Canva','canva.com'],['CapCut','capcut.com'],['Adobe Premiere Pro','adobe.com'],['Meta Business Suite','business.facebook.com']
  ]},
  {title:'Project & Communication',tools:[
    ['Trello','trello.com'],['Slack','slack.com'],['GitHub','github.com'],['Netlify','netlify.com']
  ]},
  {title:'Google Workspace',tools:[
    ['Gmail','mail.google.com'],['Google Drive','drive.google.com'],['Google Docs','docs.google.com'],['Google Sheets','sheets.google.com'],['Google Slides','slides.google.com'],['Google Forms','forms.google.com'],['Google Calendar','calendar.google.com'],['Google Meet','meet.google.com'],['Google Chat','chat.google.com']
  ]},
  {title:'AI & Technology',tools:[
    ['ChatGPT Pro','chatgpt.com'],['Gemini Pro','gemini.google.com'],['Higgsfield AI','higgsfield.ai'],['ElevenLabs','elevenlabs.io']
  ]}
];

const toolsSection=document.createElement('section');
toolsSection.id='tools';
toolsSection.className='section tools-section';
toolsSection.innerHTML=`
  <div class="section-head tools-head">
    <div><span class="section-kicker">TOOLS & TECHNOLOGY</span><h2>Powered by the tools we trust.</h2></div>
    <p>The platforms we use to create, collaborate, communicate and deliver quality work for our clients.</p>
  </div>
  <div class="tool-groups">
    ${toolGroups.map(group=>`<div class="tool-group"><div class="tool-group-title">${group.title}</div><div class="tools-grid">${group.tools.map(([name,domain])=>`<div class="tool-card"><div class="tool-logo-wrap"><img src="https://www.google.com/s2/favicons?domain=${domain}&sz=128" alt="${name} logo" loading="lazy"></div><span>${name}</span></div>`).join('')}</div></div>`).join('')}
  </div>`;

const brandsSection=document.querySelector('.brands-section');
if(brandsSection) brandsSection.before(toolsSection);

const toolsStyle=document.createElement('style');
toolsStyle.textContent=`
.tools-section{background:transparent}.tools-head{margin-bottom:38px}.tool-groups{display:grid;gap:34px}.tool-group-title{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#7b8296;margin:0 0 14px}.tools-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}.tool-card{min-height:138px;padding:20px 12px;border-radius:20px;background:rgba(255,255,255,.68);border:1px solid rgba(255,255,255,.9);box-shadow:0 12px 36px rgba(7,23,93,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;text-align:center;transition:transform .25s ease,box-shadow .25s ease}.tool-card:hover{transform:translateY(-7px);box-shadow:0 20px 48px rgba(7,23,93,.13)}.tool-logo-wrap{width:58px;height:58px;border-radius:16px;background:#fff;display:grid;place-items:center;padding:9px;box-shadow:0 7px 20px rgba(7,23,93,.08)}.tool-logo-wrap img{width:40px;height:40px;object-fit:contain}.tool-card span{font-size:12px;font-weight:800;color:#172044;line-height:1.35}@media(max-width:1050px){.tools-grid{grid-template-columns:repeat(4,1fr)}}@media(max-width:700px){.tools-grid{grid-template-columns:repeat(3,1fr);gap:10px}.tool-card{min-height:120px;padding:15px 8px}.tool-logo-wrap{width:50px;height:50px}.tool-logo-wrap img{width:34px;height:34px}}@media(max-width:430px){.tools-grid{grid-template-columns:repeat(2,1fr)}}`;
document.head.appendChild(toolsStyle);

// Smooth scroll-reveal transitions for VYRA sections and cards.
const motionTargets=document.querySelectorAll(`
  main > .section:not(.hero),
  .team-card,
  .service-group,
  .service-card,
  .video-card,
  .graphic-card,
  .logo-wall > div,
  .tool-card,
  .meaning-card
`);

motionTargets.forEach((el,index)=>{
  el.classList.add('scroll-reveal');
  if(el.matches('.team-card,.service-card,.video-card,.graphic-card,.logo-wall > div,.tool-card')){
    el.style.setProperty('--reveal-delay',`${(index%4)*70}ms`);
  }
});

if('IntersectionObserver' in window){
  const revealObserver=new IntersectionObserver((entries,observer)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },{threshold:.12,rootMargin:'0px 0px -55px 0px'});
  motionTargets.forEach(el=>revealObserver.observe(el));
}else{
  motionTargets.forEach(el=>el.classList.add('is-visible'));
}
