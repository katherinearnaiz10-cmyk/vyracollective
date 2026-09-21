(()=>{
const main=document.querySelector('main');
const header=document.querySelector('.site-header');
if(!main||!header)return;

const hero=main.querySelector('.hero'); if(hero) hero.id='home';
const team=main.querySelector('.team-section'); if(team&&!team.id) team.id='team';
const tools=main.querySelector('.tools-section'); if(tools&&!tools.id) tools.id='tools';
const brands=main.querySelector('.brands-section'); if(brands&&!brands.id) brands.id='brands';
const meaning=main.querySelector('.meaning-section'); if(meaning&&!meaning.id) meaning.id='meaning';
const payment=main.querySelector('.payment-section'); if(payment&&!payment.id) payment.id='payment';

const sections=[...main.querySelectorAll(':scope > section')];
sections.forEach((section,i)=>{if(!section.id)section.id='screen-'+(i+1);section.classList.add('vyra-screen')});

// Keep the original top navigation. Remove the temporary left-side screen menu if present.
document.getElementById('vyraScreenMenu')?.remove();
document.querySelector('.vyra-screen-overlay')?.remove();
const oldMenu=header.querySelector('.menu-btn');if(oldMenu)oldMenu.style.removeProperty('display');
const nav=header.querySelector('.nav');if(nav)nav.style.removeProperty('display');

// Add the useful screen links to the same top navigation style.
const topLinks=[['#home','Home'],['#about','About'],['#team','Team'],['#services','Services'],['#work','Our Work'],['#tools','Tools'],['#experience','Experience']];
if(nav){
 const inquiry=nav.querySelector('a[href="#inquiry"]');
 topLinks.forEach(([href,label])=>{
   if(nav.querySelector(`a[href="${href}"]`))return;
   const a=document.createElement('a');a.href=href;a.textContent=label;
   if(inquiry)nav.insertBefore(a,inquiry);else nav.appendChild(a);
 });
}

function showScreen(id,push=true){
 const target=document.getElementById(id)||document.getElementById('home')||sections[0];
 if(!target)return;
 sections.forEach(s=>s.classList.toggle('vyra-active-screen',s===target));
 if(nav)nav.querySelectorAll('a[href^="#"]').forEach(a=>a.classList.toggle('active-screen-link',a.getAttribute('href')==='#'+target.id));
 window.scrollTo({top:0,left:0,behavior:'instant'});
 if(push&&location.hash!=='#'+target.id)history.pushState({screen:target.id},'','#'+target.id);
 nav?.classList.remove('open');
}

document.addEventListener('click',e=>{
 const a=e.target.closest('a[href^="#"]');if(!a)return;
 const id=a.getAttribute('href').slice(1);
 const target=document.getElementById(id);
 if(target&&sections.includes(target)){e.preventDefault();showScreen(id)}
});
window.addEventListener('popstate',()=>showScreen(location.hash.slice(1)||'home',false));
const footer=document.querySelector('.site-footer');if(footer)footer.classList.add('vyra-screen-footer');
showScreen(location.hash.slice(1)||'home',false);
})();