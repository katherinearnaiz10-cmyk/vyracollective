(()=>{
  const form=document.getElementById('vyraInquiryForm');
  if(!form)return;
  const submit=form.querySelector('.inquiry-submit');
  const status=document.getElementById('inquiryStatus');
  const success=document.getElementById('inquirySuccess');
  const formCard=document.getElementById('inquiryFormCard');
  const firstName=document.getElementById('successFirstName');
  let sending=false;

  form.addEventListener('submit',async(e)=>{
    e.preventDefault();
    if(sending)return;
    if(!form.reportValidity())return;
    sending=true;
    submit.disabled=true;
    submit.textContent='SENDING...';
    status.textContent='';status.classList.remove('error');
    try{
      const response=await fetch(form.action,{method:'POST',body:new FormData(form),headers:{Accept:'application/json'}});
      if(!response.ok)throw new Error('Submission failed');
      const name=form.elements.full_name.value.trim();
      firstName.textContent=(name.split(/\s+/)[0]||'THERE').toUpperCase();
      formCard.hidden=true;
      success.hidden=false;
      success.scrollIntoView({behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'center'});
      form.reset();
    }catch(err){
      status.textContent='We couldn’t send your inquiry just now. Please check your connection and try again.';
      status.classList.add('error');
    }finally{
      sending=false;submit.disabled=false;submit.textContent='SEND MY INQUIRY →';
    }
  });
})();