(()=>{
const main=document.querySelector('main');
const header=document.querySelector('.site-header');
if(!main||!header)return;

const hero=main.querySelector('.hero'); if(hero) hero.id='home';
const sections=[...main.querySelectorAll(':scope > section')];
sections.forEach((section,i)=>{if(!section.id)section.id='screen-'+(i+1);section.classList.add('vyra-screen')});

// Keep ONLY the original header tabs: About, Services, Our Work, Experience, Let's Work Together.
document.getElementById('vyraScreenMenu')?.remove();
document.querySelector('.vyra-screen-overlay')?.remove();
const menuBtn=header.querySelector('.menu-btn');if(menuBtn)menuBtn.style.removeProperty('display');
const nav=header.querySelector('.nav');if(nav){
 nav.style.removeProperty('display');
 nav.querySelectorAll('a').forEach(a=>{
   const href=a.getAttribute('href');
   if(!['#about','#services','#work','#experience','#inquiry'].includes(href))a.remove();
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