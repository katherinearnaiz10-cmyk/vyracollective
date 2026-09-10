/* VYRA secure card checkout — card details are entered only on PayMongo */
(()=>{
  const ENDPOINT='https://vyra-collective-payments.netlify.app/.netlify/functions/create-checkout';

  const mount=()=>{
    const card=document.querySelector('#payment .payment-card');
    if(!card || document.getElementById('vyraCardCheckout')) return;

    const wrap=document.createElement('div');
    wrap.id='vyraCardCheckout';
    wrap.className='vyra-card-checkout';
    wrap.innerHTML=`
      <div class="card-divider"><span>OR PAY BY CARD</span></div>
      <div class="card-checkout-head">
        <strong>Visa / Mastercard</strong>
        <small>Secure checkout powered by PayMongo</small>
      </div>
      <form id="vyraCardForm">
        <label>Invoice / Reference Number
          <input id="vyraReference" maxlength="60" placeholder="e.g. VYRA-001" required>
        </label>
        <label>Amount (PHP)
          <input id="vyraAmount" type="number" min="20" step="0.01" inputmode="decimal" placeholder="Enter the confirmed invoice amount" required>
        </label>
        <label>Service / Package
          <select id="vyraDescription" required>
            <option value="">Select service</option>
            <option>Package 1</option><option>Package 2</option><option>Package 3</option>
            <option>Video Editor</option><option>Graphic Artist</option>
            <option>Social Media Manager</option><option>Customer Support</option>
          </select>
        </label>
        <button class="vyra-card-button" type="submit">CONTINUE TO SECURE CARD PAYMENT →</button>
        <p id="vyraCardStatus" class="card-status" role="status" aria-live="polite"></p>
      </form>
      <p class="card-security">🔒 You will enter your card number, expiry date and CVV on PayMongo's secure checkout page — never on VYRA's website.</p>`;
    card.appendChild(wrap);

    const style=document.createElement('style');
    style.textContent=`.vyra-card-checkout{margin-top:24px;padding-top:4px}.card-divider{display:flex;align-items:center;gap:12px;margin:20px 0}.card-divider:before,.card-divider:after{content:'';height:1px;background:rgba(7,23,93,.12);flex:1}.card-divider span{font-size:10px;font-weight:900;letter-spacing:.12em;color:#07175d}.card-checkout-head{margin-bottom:14px}.card-checkout-head strong{display:block;color:#07175d;font-size:14px}.card-checkout-head small{color:#747d94;font-size:10px}.vyra-card-checkout form{display:grid;gap:11px}.vyra-card-checkout label{display:grid;gap:6px;color:#07175d;font-size:10px;font-weight:800}.vyra-card-checkout input,.vyra-card-checkout select{width:100%;box-sizing:border-box;border:1px solid rgba(7,23,93,.16);border-radius:12px;background:#fff;color:#172044;padding:12px 13px;font:inherit;font-size:12px;outline:none}.vyra-card-checkout input:focus,.vyra-card-checkout select:focus{border-color:#07175d;box-shadow:0 0 0 3px rgba(7,23,93,.08)}.vyra-card-button{border:0;border-radius:13px;background:#07175d;color:#fff;padding:14px 16px;font-size:10px;font-weight:900;letter-spacing:.05em;cursor:pointer}.vyra-card-button:disabled{opacity:.55;cursor:wait}.card-status{min-height:15px;margin:0;color:#8a2432;font-size:10px}.card-security{margin:10px 0 0;color:#70788e;font-size:9.5px;line-height:1.5}`;
    document.head.appendChild(style);

    const form=wrap.querySelector('#vyraCardForm');
    form.addEventListener('submit',async e=>{
      e.preventDefault();
      const button=form.querySelector('button');
      const status=wrap.querySelector('#vyraCardStatus');
      const amount=Number(wrap.querySelector('#vyraAmount').value);
      const reference=wrap.querySelector('#vyraReference').value.trim();
      const description=wrap.querySelector('#vyraDescription').value;
      if(!reference || !description || !Number.isFinite(amount) || amount<20){status.textContent='Please check the invoice number, service and amount.';return;}
      button.disabled=true;button.textContent='OPENING SECURE CHECKOUT…';status.textContent='';
      try{
        const res=await fetch(ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({amount,reference,description:`VYRA Collective — ${description}`})});
        const data=await res.json();
        if(!res.ok || !data.checkout_url) throw new Error(data.error||'Checkout unavailable');
        window.location.href=data.checkout_url;
      }catch(err){
        status.textContent='Card checkout could not be started. Please try again or contact VYRA.';
        button.disabled=false;button.textContent='CONTINUE TO SECURE CARD PAYMENT →';
      }
    });

    const params=new URLSearchParams(location.search);
    if(params.get('payment')==='success') wrap.querySelector('#vyraCardStatus').textContent='Payment completed. Thank you!';
    if(params.get('payment')==='cancelled') wrap.querySelector('#vyraCardStatus').textContent='Payment was cancelled. No charge was made.';
  };

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(mount,0)); else setTimeout(mount,0);
})();
