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
toolsSection.id='tools';
toolsSection.className='section tools-section';
toolsSection.innerHTML=`
  <div class="section-head tools-head">
    <div><span class="section-kicker">TOOLS & TECHNOLOGY</span><h2>Powered by the tools we trust.</h2></div>
    <p>The platforms we use to create, collaborate, communicate and deliver quality work for our clients.</p>
  </div>
  <div class="tool-groups">
    ${toolGroups.map(group=>`<div class="tool-group"><div class="tool-group-title">${group.title}</div><div class="tools-grid">${group.tools.map(([name,logo])=>`<div class="tool-card"><div class="tool-logo-wrap"><img src="${logo}" alt="${name} logo" loading="lazy"></div><span>${name}</span></div>`).join('')}</div></div>`).join('')}
  </div>`;

const brandsSection=document.querySelector('.brands-section');
if(brandsSection) brandsSection.before(toolsSection);

const toolsStyle=document.createElement('style');
toolsStyle.textContent=`
.tools-section{background:transparent}.tools-head{margin-bottom:38px}.tool-groups{display:grid;gap:34px}.tool-group-title{font-size:11px;font-weight:800;letter-spacing:.16em;text-transform:uppercase;color:#7b8296;margin:0 0 14px}.tools-grid{display:grid;grid-template-columns:repeat(6,1fr);gap:14px}.tool-card{min-height:138px;padding:20px 12px;border-radius:20px;background:rgba(255,255,255,.68);border:1px solid rgba(255,255,255,.9);box-shadow:0 12px 36px rgba(7,23,93,.07);backdrop-filter:blur(16px);-webkit-backdrop-filter:blur(16px);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:13px;text-align:center;transition:transform .25s ease,box-shadow .25s ease}.tool-card:hover{transform:translateY(-7px);box-shadow:0 20px 48px rgba(7,23,93,.13)}.tool-logo-wrap{width:58px;height:58px;border-radius:16px;background:#fff;display:grid;place-items:center;padding:9px;box-shadow:0 7px 20px rgba(7,23,93,.08)}.tool-logo-wrap img{width:40px;height:40px;object-fit:contain}.tool-card span{font-size:12px;font-weight:800;color:#172044;line-height:1.35}@media(max-width:1050px){.tools-grid{grid-template-columns:repeat(4,1fr)}}@media(max-width:700px){.tools-grid{grid-template-columns:repeat(3,1fr);gap:10px}.tool-card{min-height:120px;padding:15px 8px}.tool-logo-wrap{width:50px;height:50px}.tool-logo-wrap img{width:34px;height:34px}}@media(max-width:430px){.tools-grid{grid-template-columns:repeat(2,1fr)}}`;
document.head.appendChild(toolsStyle);

// VYRA Pay Invoice — secure payment handoff UI.
const paymentNav=document.createElement('a');
paymentNav.href='#payment';
paymentNav.textContent='Pay Invoice';
const inquiryNav=nav.querySelector('a[href="#inquiry"]');
if(inquiryNav) nav.insertBefore(paymentNav,inquiryNav); else nav.appendChild(paymentNav);
paymentNav.addEventListener('click',()=>nav.classList.remove('open'));

const paymentSection=document.createElement('section');
paymentSection.id='payment';
paymentSection.className='section payment-section';
paymentSection.innerHTML=`
  <div class="payment-shell">
    <div class="payment-copy">
      <span class="section-kicker">SECURE PAYMENTS</span>
      <h2>Pay your VYRA invoice.</h2>
      <p>Enter your invoice number, then continue to VYRA's secure payment checkout.</p>
      <div class="payment-trust"><span>🔒 Secure checkout</span><span>✓ Card</span><span>✓ QR payment</span></div>
    </div>
    <div class="payment-card">
      <label for="vyraInvoiceNumber">Invoice Number</label>
      <input id="vyraInvoiceNumber" type="text" placeholder="VYRA-001" autocomplete="off" maxlength="40">
      <div class="payment-method-title">Choose payment method</div>
      <div class="payment-methods">
        <button class="payment-method" type="button" data-pay-method="card"><span class="payment-icon">💳</span><span><strong>Card Payment</strong><small>Credit or debit card</small></span></button>
        <button class="payment-method" type="button" data-pay-method="qr"><span class="payment-icon">▣</span><span><strong>QR Payment</strong><small>Scan and pay securely</small></span></button>
      </div>
      <p id="paymentMessage" class="payment-message">Payment checkout will be activated after VYRA's merchant account is connected.</p>
      <div class="payment-safe">VYRA does not collect or store your card number, CVV, PIN, password or OTP on this website.</div>
    </div>
  </div>`;
const ctaSection=document.querySelector('.cta-section');
if(ctaSection) ctaSection.before(paymentSection); else document.querySelector('main').appendChild(paymentSection);

const paymentStyle=document.createElement('style');
paymentStyle.textContent=`
.payment-section{padding:70px 5vw!important;background:linear-gradient(135deg,rgba(255,255,255,.07),rgba(255,255,255,.018))!important;border:1px solid rgba(255,255,255,.16);box-shadow:0 18px 50px rgba(0,0,0,.22),inset 0 1px 0 rgba(255,255,255,.16);backdrop-filter:blur(17px) saturate(120%);-webkit-backdrop-filter:blur(17px) saturate(120%);overflow:hidden}.payment-shell{display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:center;max-width:1100px;margin:auto}.payment-copy h2{font-size:clamp(38px,5vw,68px);line-height:1;margin:12px 0 20px;color:#fff}.payment-copy p{color:rgba(255,255,255,.78);max-width:500px;line-height:1.7}.payment-trust{display:flex;flex-wrap:wrap;gap:9px;margin-top:25px}.payment-trust span{padding:9px 13px;border:1px solid rgba(255,255,255,.18);border-radius:999px;background:rgba(255,255,255,.06);color:#fff;font-size:11px;font-weight:800}.payment-card{background:linear-gradient(145deg,rgba(255,255,255,.96),rgba(255,255,255,.84));border:1px solid #fff;border-radius:24px;padding:30px;box-shadow:0 20px 55px rgba(0,0,0,.28)}.payment-card label,.payment-method-title{display:block;color:#07175d;font-size:11px;font-weight:800;letter-spacing:.1em;text-transform:uppercase;margin-bottom:9px}.payment-card input{width:100%;box-sizing:border-box;border:1px solid rgba(7,23,93,.18);border-radius:14px;padding:15px 16px;font:inherit;font-weight:700;color:#07175d;background:#fff;outline:none;margin-bottom:24px}.payment-card input:focus{border-color:#07175d;box-shadow:0 0 0 3px rgba(7,23,93,.08)}.payment-methods{display:grid;grid-template-columns:1fr 1fr;gap:12px}.payment-method{border:1px solid rgba(7,23,93,.14);border-radius:16px;background:#fff;padding:17px;display:flex;align-items:center;gap:12px;text-align:left;cursor:pointer;transition:.2s ease}.payment-method:hover{transform:translateY(-3px);border-color:#07175d;box-shadow:0 12px 25px rgba(7,23,93,.10)}.payment-icon{font-size:25px}.payment-method strong{display:block;color:#07175d;font-size:13px}.payment-method small{display:block;color:#69718b;margin-top:3px}.payment-message{margin:18px 0 0;padding:12px 14px;border-radius:12px;background:#f3f5fb;color:#4d5877;font-size:12px;line-height:1.5}.payment-message.error{background:#fff0f0;color:#8d2525}.payment-safe{margin-top:14px;color:#70788e;font-size:10px;line-height:1.55}.payment-section .section-kicker{color:#fff!important}@media(max-width:800px){.payment-shell{grid-template-columns:1fr;gap:28px}.payment-section{padding:48px 20px!important}.payment-methods{grid-template-columns:1fr}.payment-card{padding:22px}}`;
document.head.appendChild(paymentStyle);

document.querySelectorAll('.payment-method').forEach(button=>button.addEventListener('click',()=>{
  const invoice=document.getElementById('vyraInvoiceNumber').value.trim();
  const message=document.getElementById('paymentMessage');
  if(!invoice){message.textContent='Please enter your VYRA invoice number first.';message.classList.add('error');document.getElementById('vyraInvoiceNumber').focus();return;}
  message.classList.remove('error');
  message.textContent=`${button.dataset.payMethod==='card'?'Card':'QR'} checkout for ${invoice} is ready to be connected to VYRA's secure merchant payment link.`;
}));

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
  .meaning-card,
  .payment-card
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
