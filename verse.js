(()=>{
const verse=['Whatever you do, work at it with all your heart, as working for the Lord, not for human masters.','Colossians 3:23 (NIV)'];
const track=document.getElementById('verseTrack'),shell=document.getElementById('verseShell'),bar=document.getElementById('verseBar'),panel=document.getElementById('versePanel'),close=document.getElementById('verseClose');
if(!track||!shell||!bar||!panel||!close)return;
const esc=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[m]));
const item=`<span class="verse-item"><span aria-hidden="true">▱</span><span class="verse-label">VERSE OF THE DAY</span><span class="verse-divider">|</span><span class="verse-copy">“${esc(verse[0])}”</span><span class="verse-ref">— ${esc(verse[1]).toUpperCase()}</span><span class="verse-star">✦</span></span>`;
track.innerHTML=item+item+item+item;
document.getElementById('verseFullText').textContent='“'+verse[0]+'”';
document.getElementById('verseFullRef').textContent='— '+verse[1].toUpperCase();
document.getElementById('verseAccessible').textContent='Verse of the Day: '+verse[0]+' — '+verse[1];
function setOpen(open){shell.classList.toggle('is-open',open);bar.setAttribute('aria-expanded',String(open));panel.setAttribute('aria-hidden',String(!open));}
bar.addEventListener('click',()=>setOpen(!shell.classList.contains('is-open')));
close.addEventListener('click',e=>{e.stopPropagation();setOpen(false);bar.focus()});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&shell.classList.contains('is-open'))setOpen(false)});
})();