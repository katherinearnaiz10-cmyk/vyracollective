(()=>{
const main=document.querySelector('main');
const header=document.querySelector('.site-header');
if(!main||!header)return;

// Give every major section a stable screen id.
const hero=main.querySelector('.hero'); if(hero) hero.id='home';
const team=main.querySelector('.team-section'); if(team&&!team.id) team.id='team';
const tools=main.querySelector('.tools-section'); if(tools&&!tools.id) tools.id='tools';
const brands=main.querySelector('.brands-section'); if(brands&&!brands.id) brands.id='brands';
const meaning=main.querySelector('.meaning-section'); if(meaning&&!meaning.id) meaning.id='meaning';
const payment=main.querySelector('.payment-section'); if(payment&&!payment.id) payment.id='payment';

const sections=[...main.querySelectorAll(':scope > section')];
sections.forEach((section,i)=>{
  if(!section.id) section.id='screen-'+(i+1);
  section.classList.add('vyra-screen');
});

// Replace the desktop link row with a single upper-left menu trigger.
let trigger=document.getElementById('vyraScreenMenu');
if(!trigger){
 trigger=document.createElement('button');
 trigger.id='vyraScreenMenu';
 trigger.className='vyra-screen-menu';
 trigger.type='button';
 trigger.setAttribute('aria-label','Open VYRA menu');
 trigger.setAttribute('aria-expanded','false');
 trigger.innerHTML='<span></span><span></span><span></span>';
 header.prepend(trigger);
}
const oldMenu=header.querySelector('.menu-btn'); if(oldMenu) oldMenu.style.display='none';
const oldNav=header.querySelector('.nav'); if(oldNav) oldNav.style.display='none';

const labels={home:'Home',about:'About VYRA',team:'Meet the Team',services:'Services',work:'Our Work',tools:'Tools & Technology',brands:'Creative Experience',experience:'Professional Experience',meaning:'The VYRA Mark',payment:'Pay Invoice',inquiry:'Work With Us'};
const order=['home','about','team','services','work','tools','brands','experience','meaning','payment','inquiry'];
const available=order.filter(id=>document.getElementById(id));

const overlay=document.createElement('div');
overlay.className='vyra-screen-overlay';
overlay.setAttribute('aria-hidden','true');
overlay.innerHTML=`<div class="vyra-menu-panel"><div class="vyra-menu-kicker">VYRA COLLECTIVE</div><nav>${available.map((id,i)=>`<button type="button" data-screen="${id}"><small>${String(i+1).padStart(2,'0')}</small><span>${labels[id]}</span></button>`).join('')}</nav><div class="vyra-menu-tagline">Rise with purpose. Win together.</div></div>`;
document.body.appendChild(overlay);

function closeMenu(){overlay.classList.remove('open');overlay.setAttribute('aria-hidden','true');trigger.setAttribute('aria-expanded','false');document.body.classList.remove('vyra-menu-open')}
function openMenu(){overlay.classList.add('open');overlay.setAttribute('aria-hidden','false');trigger.setAttribute('aria-expanded','true');document.body.classList.add('vyra-menu-open')}
trigger.addEventListener('click',()=>overlay.classList.contains('open')?closeMenu():openMenu());
overlay.addEventListener('click',e=>{if(e.target===overlay)closeMenu()});
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeMenu()});

function showScreen(id,push=true){
 const target=document.getElementById(id)||document.getElementById('home')||sections[0];
 if(!target)return;
 sections.forEach(s=>s.classList.toggle('vyra-active-screen',s===target));
 document.querySelectorAll('.vyra-screen-overlay [data-screen]').forEach(b=>b.classList.toggle('active',b.dataset.screen===target.id));
 window.scrollTo({top:0,left:0,behavior:'instant'});
 if(push&&location.hash!=='#'+target.id) history.pushState({screen:target.id},'', '#'+target.id);
 closeMenu();
}

overlay.querySelectorAll('[data-screen]').forEach(b=>b.addEventListener('click',()=>showScreen(b.dataset.screen)));

// Any existing internal CTA now switches screens instead of scrolling through the page.
document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#"]');
 if(!a)return;
 const id=a.getAttribute('href').slice(1);
 if(document.getElementById(id)&&sections.includes(document.getElementById(id))){e.preventDefault();showScreen(id)}
});
window.addEventListener('popstate',()=>showScreen(location.hash.slice(1)||'home',false));

// Hide footer on internal screens to preserve the single-screen presentation.
const footer=document.querySelector('.site-footer');if(footer)footer.classList.add('vyra-screen-footer');
showScreen(location.hash.slice(1)||'home',false);
})();