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
    ['Canva','https://www.google.com/s2/favicons?domain=canva.com&sz=128'],
    ['CapCut','https://www.google.com/s2/favicons?domain=capcut.com&sz=128'],
    ['Adobe Premiere Pro','https://www.google.com/s2/favicons?domain=adobe.com&sz=128'],
    ['Meta Business Suite','https://cdn.simpleicons.org/meta']
  ]},
  {title:'Project & Communication',tools:[
    ['Trello','https://cdn.simpleicons.org/trello'],
    ['Slack','https://www.google.com/s2/favicons?domain=slack.com&sz=128'],
    ['GitHub','https://cdn.simpleicons.org/github'],
    ['Netlify','https://cdn.simpleicons.org/netlify']
  ]},
  {title:'Google Workspace',tools:[
    ['Gmail','https://www.gstatic.com/images/branding/product/2x/gmail_2020q4_48dp.png'],
    ['Google Drive','https://www.gstatic.com/images/branding/product/2x/drive_2020q4_48dp.png'],
    ['Google Docs','https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_document_x64.png'],
    ['Google Sheets','https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_spreadsheet_x64.png'],
    ['Google Slides','https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_1_presentation_x64.png'],
    ['Google Forms','https://ssl.gstatic.com/docs/doclist/images/mediatype/icon_2_form_x64.png'],
    ['Google Calendar','https://www.gstatic.com/images/branding/product/2x/calendar_2020q4_48dp.png'],
    ['Google Meet','https://www.gstatic.com/images/branding/product/2x/meet_2020q4_48dp.png'],
    ['Google Chat','https://www.gstatic.com/images/branding/product/2x/chat_2020q4_48dp.png']
  ]},
  {title:'AI & Technology',tools:[
    ['ChatGPT Pro','https://www.google.com/s2/favicons?domain=chatgpt.com&sz=128'],
    ['Gemini Pro','https://cdn.simpleicons.org/googlegemini'],
    ['Higgsfield AI','https://www.google.com/s2/favicons?domain=higgsfield.ai&sz=128'],
    ['ElevenLabs','https://cdn.simpleicons.org/elevenlabs']
  ]}
];
const toolsSection=document.createElement('section');
toolsSection.id='tools';toolsSection.className='section tools-section';
toolsSection.innerHTML=`<div class="section-head tools-head"><div><span class="section-kicker">TOOLS & TECHNOLOGY</span><h2>Powered by the tools we trust.</h2></div><p>The platforms we use to create, collaborate, communicate and deliver quality work for our clients.</p></div><div class="tool-groups">${toolGroups.map(group=>`<div class="tool-group"><div class="tool-group-title">${group.title}</div><div class="tools-grid">${group.tools.map(([name,logo])=>`<div class="tool-card"><div class="tool-logo-wrap"><img src="${logo}" alt="${name} logo" loading="lazy"></div><span>${name}</span></div>`).join('')}</div></div>`).join('')}</div>`;
const brandsSection=document.querySelector('.brands-section');if(brandsSection)brandsSection.before(toolsSection);
const toolsStyle=document.createElement('style');toolsStyle.textContent=`.tools-section{background:transparent}.tools-head{margin-bottom:38px}.tool-groups{display:grid;gap:34px}.tool-group-title{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#7b8296;margin:0 0 14px}.tools-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}.tool-card{min-height:138px;padding:20px 12px;border-radius:20px;background:rgba(255,255,255,.68);border:1px solid rgba(255,255,255,.9);box-shadow:0 12px 36px rgba(7,23,93,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;text-align:center;transition:transform .25s ease,box-shadow .25s ease}.tool-card:hover{transform:translateY(-7px);box-shadow:0 20px 48px rgba(7,23,93,.13)}.tool-logo-wrap{width:58px;height:58px;border-radius:16px;background:#fff;display:grid;place-items:center;padding:9px;box-shadow:0 7px 20px rgba(7,23,93,.08)}.tool-logo-wrap img{width:40px;height:40px;object-fit:contain}.tool-card span{font-size:12px;font-weight:800;color:#172044;line-height:1.35}@media(max-width:1050px){.tools-grid{grid-template-columns:repeat(4,1fr)}}@media(max-width:700px){.tools-grid{grid-template-columns:repeat(3,1fr);gap:10px}.tool-card{min-height:120px;padding:15px 8px}.tool-logo-wrap{width:50px;height:50px}.tool-logo-wrap img{width:34px;height:34px}}@media(max-width:430px){.tools-grid{grid-template-columns:repeat(2,1fr)}}`;document.head.appendChild(toolsStyle);

// Text-only VYRA cinematic story with browser voice-over.
const story=document.createElement('section');
story.id='story';story.className='vyra-story';
story.innerHTML=`<div class="story-glass"><div class="story-kicker">MEET VYRA</div><div class="story-stage" aria-live="polite"><div class="story-line active">MORE THAN A SERVICE.<br><em>A TEAM BEHIND YOUR VISION.</em></div></div><div class="story-actions"><button class="story-play" type="button">WATCH OUR STORY <span>▶</span></button><button class="story-skip" type="button">SKIP INTRO</button></div><div class="story-progress"><i></i></div><div class="story-note">Approx. 70 seconds · Voice starts after play</div></div>`;
const hero=document.querySelector('.hero');if(hero)hero.after(story);
const storyStyle=document.createElement('style');storyStyle.textContent=`.vyra-story{padding:72px 7vw;background:#07175d;color:#fff;position:relative;overflow:hidden}.vyra-story:before,.vyra-story:after{content:"";position:absolute;border-radius:50%;filter:blur(70px);pointer-events:none}.vyra-story:before{width:420px;height:420px;background:rgba(199,162,93,.12);top:-180px;right:-100px}.vyra-story:after{width:360px;height:360px;background:rgba(255,255,255,.06);bottom:-190px;left:-100px}.story-glass{position:relative;z-index:1;min-height:620px;border:1px solid rgba(255,255,255,.20);border-radius:34px;background:rgba(255,255,255,.055);backdrop-filter:blur(18px);-webkit-backdrop-filter:blur(18px);box-shadow:0 28px 80px rgba(0,0,0,.18);padding:48px;display:flex;flex-direction:column;justify-content:space-between}.story-kicker{font:800 11px/1 Manrope,Arial,sans-serif;letter-spacing:.22em;color:#c7a25d}.story-stage{display:grid;place-items:center;text-align:center;min-height:390px;padding:30px}.story-line{font-family:"Playfair Display",serif;font-size:clamp(44px,7vw,104px);font-weight:700;line-height:.94;letter-spacing:-.035em;opacity:0;transform:translateY(28px);transition:opacity .65s ease,transform .65s ease}.story-line.active{opacity:1;transform:none}.story-line em{font-style:normal;color:rgba(255,255,255,.62)}.story-actions{display:flex;align-items:center;gap:12px;justify-content:center;flex-wrap:wrap}.story-play,.story-skip{font-family:Manrope,Arial,sans-serif;font-weight:800;letter-spacing:.08em;border-radius:999px;padding:14px 22px;cursor:pointer}.story-play{border:1px solid #fff;background:#fff;color:#07175d}.story-skip{border:1px solid rgba(255,255,255,.28);background:rgba(255,255,255,.06);color:#fff}.story-progress{height:2px;background:rgba(255,255,255,.15);margin-top:24px;overflow:hidden}.story-progress i{display:block;height:100%;width:0;background:#c7a25d}.story-note{text-align:center;font:600 11px/1.4 Manrope,Arial,sans-serif;letter-spacing:.08em;color:rgba(255,255,255,.55);margin-top:12px}@media(max-width:620px){.vyra-story{padding:38px 5vw}.story-glass{min-height:520px;padding:26px 18px;border-radius:24px}.story-stage{min-height:320px;padding:18px 4px}.story-line{font-size:clamp(38px,13vw,62px)}}@media(prefers-reduced-motion:reduce){.story-line{transition:none}}`;document.head.appendChild(storyStyle);
const storyStage=story.querySelector('.story-stage'),storyPlay=story.querySelector('.story-play'),storySkip=story.querySelector('.story-skip'),storyBar=story.querySelector('.story-progress i');
const storyScenes=[
 {t:0,text:'YOUR VISION.<br><em>OUR CRAFT.</em>'},
 {t:8,text:'VYRA<br><em>COLLECTIVE</em>'},
 {t:17,text:'VIDEO EDITING.<br><em>SOCIAL MEDIA.<br>GRAPHIC DESIGN.<br>ADMIN SUPPORT.</em>'},
 {t:31,text:'ONE TEAM.<br><em>DIFFERENT STRENGTHS.<br>ONE VISION.</em>'},
 {t:43,text:'LISTEN.<br>CREATE.<br><em>SUPPORT. DELIVER. GROW.</em>'},
 {t:54,text:'GOD AT THE CENTER.<br><em>PEOPLE AT THE HEART.</em>'},
 {t:62,text:'VICTORIOUS.<br><em>YET RISING.<br>ALWAYS.</em>'},
 {t:70,text:'YOUR VISION.<br><em>THE RIGHT TEAM BEHIND IT.</em>'}
];
const storyScript='Every growing business begins with a vision. Bringing that vision to life takes the right people, working together. Welcome to VYRA Collective, a creative and virtual support team built to help businesses create, connect, and move forward. From compelling video edits and social media management, to graphic design and reliable customer administrative support, we bring different skills together under one team. Great work happens when the right people bring their strengths together. We learn your vision, understand your brand, and work alongside you to turn ideas into meaningful results. At the heart of VYRA is a simple belief: God at the center. People at the heart. Excellence in the work. Victory together. We are Victorious. Yet Rising. Always. Your vision deserves the right team behind it. Welcome to VYRA Collective.';
let storyTimers=[],storyRunning=false;
function setStoryText(html){const old=storyStage.querySelector('.story-line');if(old){old.classList.remove('active');setTimeout(()=>{storyStage.innerHTML=`<div class="story-line">${html}</div>`;requestAnimationFrame(()=>storyStage.firstElementChild.classList.add('active'))},260)}}
function clearStory(){storyTimers.forEach(clearTimeout);storyTimers=[];window.speechSynthesis&&speechSynthesis.cancel();storyRunning=false;storyPlay.innerHTML='WATCH OUR STORY <span>▶</span>';storyBar.style.transition='none';storyBar.style.width='0'}
function chooseVoice(){const voices=speechSynthesis.getVoices();return voices.find(v=>/female|samantha|victoria|zira|ava|susan|karen|moira/i.test(v.name)&&/^en/i.test(v.lang))||voices.find(v=>/^en/i.test(v.lang))||null}
function playStory(){clearStory();storyRunning=true;storyPlay.textContent='REPLAY STORY ↻';storyScenes.forEach(s=>storyTimers.push(setTimeout(()=>setStoryText(s.text),s.t*1000)));storyBar.style.transition='width 72s linear';requestAnimationFrame(()=>storyBar.style.width='100%');if('speechSynthesis'in window){const u=new SpeechSynthesisUtterance(storyScript);u.lang='en-US';u.rate=.94;u.pitch=1.03;const v=chooseVoice();if(v)u.voice=v;u.onend=()=>{storyRunning=false};speechSynthesis.speak(u)}}
storyPlay.addEventListener('click',playStory);storySkip.addEventListener('click',()=>{clearStory();document.querySelector('#about')?.scrollIntoView({behavior:'smooth'})});

// Smooth scroll-reveal transitions for VYRA sections and cards.
const motionTargets=document.querySelectorAll(`main > .section:not(.hero),.team-card,.service-group,.service-card,.video-card,.graphic-card,.logo-wall > div,.tool-card,.meaning-card`);
motionTargets.forEach((el,index)=>{el.classList.add('scroll-reveal');if(el.matches('.team-card,.service-card,.video-card,.graphic-card,.logo-wall > div,.tool-card'))el.style.setProperty('--reveal-delay',`${(index%4)*70}ms`)});
if('IntersectionObserver'in window){const revealObserver=new IntersectionObserver((entries,observer)=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{threshold:.12,rootMargin:'0px 0px -55px 0px'});motionTargets.forEach(el=>revealObserver.observe(el))}else{motionTargets.forEach(el=>el.classList.add('is-visible'))}
