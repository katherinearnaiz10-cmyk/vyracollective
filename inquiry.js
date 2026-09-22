(()=>{
  const form=document.getElementById('vyraInquiryForm');
  if(form){
    const submit=form.querySelector('button[type="submit"]');
    const formCard=document.getElementById('inquiryFormCard');
    const inquiryApi='https://ptzurrebwksuvuakgvym.supabase.co/functions/v1/website-inquiry';
    let sending=false;
    let status=document.getElementById('inquiryStatus');
    if(!status){status=document.createElement('div');status.id='inquiryStatus';status.style.cssText='margin-top:12px;font-size:13px;line-height:1.5';form.appendChild(status)}
    let success=document.getElementById('inquirySuccess');
    if(!success&&formCard){success=document.createElement('div');success.id='inquirySuccess';success.hidden=true;success.style.cssText='padding:32px;border:1px solid rgba(255,255,255,.18);border-radius:18px;text-align:center';success.innerHTML='<span class="section-kicker">INQUIRY RECEIVED</span><h3 style="font-size:30px;margin:10px 0">Thank you, <span id="successFirstName">THERE</span>!</h3><p>We received your inquiry. The VYRA team will review your project details and get back to you soon.</p>';formCard.insertAdjacentElement('afterend',success)}
    form.addEventListener('submit',async(e)=>{
      e.preventDefault();if(sending||!form.reportValidity())return;sending=true;
      if(submit){submit.disabled=true;submit.textContent='SENDING...'}status.textContent='Sending your inquiry…';status.style.color='';
      try{
        const fd=new FormData(form);const payload={full_name:String(fd.get('full_name')||''),email:String(fd.get('email')||''),company:String(fd.get('company')||''),website:String(fd.get('website')||''),services:fd.getAll('services').map(String),budget:String(fd.get('budget')||''),message:String(fd.get('message')||''),goals:String(fd.get('message')||'')};
        // Deliver the inquiry through Formspree and save a copy to VYRA Supabase. Either successful channel is enough to accept the inquiry.
        const [dbResult,mailResult]=await Promise.allSettled([
          fetch(inquiryApi,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)}).then(async r=>{if(!r.ok){let x={};try{x=await r.json()}catch(_){}throw new Error(x.error||'Database save failed')}return r}),
          fetch(form.action,{method:'POST',body:fd,headers:{Accept:'application/json'}}).then(r=>{if(!r.ok)throw new Error('Email delivery failed');return r})
        ]);
        if(dbResult.status==='rejected'&&mailResult.status==='rejected')throw new Error('Both inquiry channels failed');
        if(dbResult.status==='rejected')console.warn('Supabase copy failed; inquiry was delivered by email.',dbResult.reason);
        if(mailResult.status==='rejected')console.warn('Email notification failed; inquiry was saved in VYRA.',mailResult.reason);
        const first=document.getElementById('successFirstName');if(first)first.textContent=(payload.full_name.trim().split(/\s+/)[0]||'THERE').toUpperCase();
        form.reset();formCard.hidden=true;success.hidden=false;success.scrollIntoView({behavior:'smooth',block:'center'});
      }catch(err){console.error(err);status.textContent='We couldn’t send your inquiry. Please try again.';status.style.color='#ffd4d4'}finally{sending=false;if(submit){submit.disabled=false;submit.textContent='Send Inquiry'}}
    });
  }
  const nav=document.querySelector('.site-header .nav');if(nav&&!nav.querySelector('.employee-login-link')){const link=document.createElement('a');link.href='employee-login.html';link.className='employee-login-link';link.textContent='Employee Login';const cta=nav.querySelector('a[href="#inquiry"]');cta?nav.insertBefore(link,cta):nav.appendChild(link);link.addEventListener('click',()=>nav.classList.remove('open'));const style=document.createElement('style');style.textContent='.employee-login-link{display:inline-flex!important;align-items:center;justify-content:center;gap:7px;padding:9px 14px!important;border:1px solid rgba(255,255,255,.28);border-radius:999px;text-decoration:none;white-space:nowrap;font-size:12px!important;font-weight:800!important;letter-spacing:.04em;transition:.2s ease}.employee-login-link:before{content:"🔒";font-size:11px}.employee-login-link:hover{background:rgba(255,255,255,.1);transform:translateY(-1px)}';document.head.appendChild(style)}
})();