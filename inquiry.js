(()=>{
  const form=document.getElementById('vyraInquiryForm');
  if(form){
    const submit=form.querySelector('.inquiry-submit');
    const status=document.getElementById('inquiryStatus');
    const success=document.getElementById('inquirySuccess');
    const formCard=document.getElementById('inquiryFormCard');
    const firstName=document.getElementById('successFirstName');
    const inquiryApi='https://ptzurrebwksuvuakgvym.supabase.co/functions/v1/website-inquiry';
    let sending=false;
    form.addEventListener('submit',async(e)=>{
      e.preventDefault();if(sending)return;if(!form.reportValidity())return;
      sending=true;if(submit){submit.disabled=true;submit.textContent='SENDING...'}if(status){status.textContent='';status.classList.remove('error')}
      try{
        const fd=new FormData(form);
        const payload={
          full_name:String(fd.get('full_name')||''),email:String(fd.get('email')||''),company:String(fd.get('company')||''),website:String(fd.get('website')||''),
          services:fd.getAll('services').map(String),budget:String(fd.get('budget')||''),goals:String(fd.get('goals')||'')
        };
        // Save first to VYRA's own system/pipeline.
        const dbResponse=await fetch(inquiryApi,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(payload)});
        if(!dbResponse.ok)throw new Error('VYRA pipeline save failed');
        // Keep Formspree delivery as the team email notification/fallback copy.
        const mailResponse=await fetch(form.action,{method:'POST',body:fd,headers:{Accept:'application/json'}});
        if(!mailResponse.ok)console.warn('Inquiry saved to VYRA, but email notification did not complete.');
        const name=payload.full_name.trim();if(firstName)firstName.textContent=(name.split(/\s+/)[0]||'THERE').toUpperCase();
        if(formCard)formCard.hidden=true;if(success){success.hidden=false;success.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'})}form.reset();
      }catch(err){if(status){status.textContent='We couldn’t send your inquiry just now. Please check your connection and try again.';status.classList.add('error')}}finally{sending=false;if(submit){submit.disabled=false;submit.textContent='SEND MY INQUIRY →'}}
    });
  }

  const nav=document.querySelector('.site-header .nav');
  if(nav && !nav.querySelector('.employee-login-link')){
    const link=document.createElement('a');link.href='employee-login.html';link.className='employee-login-link';link.textContent='Employee Login';
    const cta=nav.querySelector('a[href="#inquiry"]');if(cta)nav.insertBefore(link,cta);else nav.appendChild(link);
    link.addEventListener('click',()=>nav.classList.remove('open'));
    const style=document.createElement('style');style.textContent='.employee-login-link{display:inline-flex!important;align-items:center;justify-content:center;gap:7px;padding:9px 14px!important;border:1px solid rgba(255,255,255,.28);border-radius:999px;text-decoration:none;white-space:nowrap;font-size:12px!important;font-weight:800!important;letter-spacing:.04em;transition:.2s ease}.employee-login-link:before{content:"🔒";font-size:11px}.employee-login-link:hover{background:rgba(255,255,255,.1);transform:translateY(-1px)}';document.head.appendChild(style);
  }
})();