(()=>{
const section=document.getElementById('story');if(!section)return;
const voice=document.getElementById('storyVoice'),button=document.getElementById('storyPlay'),bar=document.getElementById('storyProgressBar'),clock=document.getElementById('storyTime');
const lines=[...section.querySelectorAll('.story-line')],pops=[...section.querySelectorAll('.story-pop')];
let raf=null,audioCtx=null,master=null,oscillators=[];
const cues=[0,12,27,42,58,73];
function fmt(s){s=Math.max(0,Math.floor(s||0));return `${Math.floor(s/60)}:${String(s%60).padStart(2,'0')}`}
function setLine(t){let i=0;for(let n=0;n<cues.length;n++)if(t>=cues[n])i=n;lines.forEach((el,n)=>el.classList.toggle('active',n===i))}
function setPops(t){const ranges=[[18,28],[49,61]];pops.forEach((p,i)=>{const show=t>=ranges[i][0]&&t<ranges[i][1];p.classList.toggle('show',show);const v=p.querySelector('video');if(show&&v.paused){v.play().catch(()=>{})}else if(!show&&!v.paused)v.pause()})}
function draw(){const t=voice.currentTime,d=voice.duration||87.67;setLine(t);setPops(t);bar.style.width=`${Math.min(100,t/d*100)}%`;clock.textContent=`${fmt(t)} / ${fmt(d)}`;if(!voice.paused)raf=requestAnimationFrame(draw)}
function musicStart(){try{if(!audioCtx){audioCtx=new (window.AudioContext||window.webkitAudioContext)();master=audioCtx.createGain();master.gain.value=.018;master.connect(audioCtx.destination);[110,164.81,220].forEach((f,i)=>{const o=audioCtx.createOscillator(),g=audioCtx.createGain();o.type=i===1?'triangle':'sine';o.frequency.value=f;g.gain.value=i===1?.12:.08;o.connect(g);g.connect(master);o.start();oscillators.push(o)})}if(audioCtx.state==='suspended')audioCtx.resume()}catch(e){}}
function musicPause(){if(audioCtx&&audioCtx.state==='running')audioCtx.suspend()}
button.addEventListener('click',async()=>{if(voice.paused){if(voice.ended||voice.currentTime>=87)voice.currentTime=0;musicStart();try{await voice.play();button.textContent='❚❚ Pause Story';button.setAttribute('aria-pressed','true');draw()}catch(e){button.textContent='▶ Hear Our Story'}}else{voice.pause();musicPause();button.textContent='▶ Continue Story';button.setAttribute('aria-pressed','false');cancelAnimationFrame(raf)}});
voice.addEventListener('loadedmetadata',()=>{clock.textContent=`0:00 / ${fmt(voice.duration)}`});
voice.addEventListener('ended',()=>{musicPause();button.textContent='↻ Play Again';button.setAttribute('aria-pressed','false');pops.forEach(p=>{p.classList.remove('show');p.querySelector('video').pause()});bar.style.width='100%';clock.textContent=`${fmt(voice.duration)} / ${fmt(voice.duration)}`});
voice.addEventListener('pause',()=>cancelAnimationFrame(raf));
setLine(0);draw();
})();
