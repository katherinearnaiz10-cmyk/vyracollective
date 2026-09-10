// VYRA Collective — PayMongo Hosted Checkout bridge
// Secret key stays in Netlify environment variable PAYMONGO_SECRET_KEY.

const allowedOrigin = 'https://katherinearnaiz10-cmyk.github.io';

exports.handler = async (event) => {
  const headers = {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, headers, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method not allowed' }) };

  try {
    const secret = process.env.PAYMONGO_SECRET_KEY;
    if (!secret) throw new Error('PayMongo secret key is not configured.');

    const body = JSON.parse(event.body || '{}');
    const amount = Number(body.amount);
    const description = String(body.description || 'VYRA Collective Service').slice(0, 120);
    const reference = String(body.reference || `VYRA-${Date.now()}`).slice(0, 60);

    // Amount is sent in PHP pesos by the VYRA frontend and converted to centavos here.
    if (!Number.isFinite(amount) || amount < 20 || amount > 1000000) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid payment amount.' }) };
    }

    const payload = {
      data: {
        attributes: {
          line_items: [{
            name: description,
            amount: Math.round(amount * 100),
            currency: 'PHP',
            quantity: 1
          }],
          payment_method_types: ['card'],
          success_url: 'https://katherinearnaiz10-cmyk.github.io/vyracollective/?payment=success#payment',
          cancel_url: 'https://katherinearnaiz10-cmyk.github.io/vyracollective/?payment=cancelled#payment',
          reference_number: reference,
          send_email_receipt: true,
          show_description: true,
          show_line_items: true
        }
      }
    };

    const response = await fetch('https://api.paymongo.com/v2/checkout_sessions', {
      method: 'POST',
      headers: {
        Authorization: `Basic ${Buffer.from(`${secret}:`).toString('base64')}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (!response.ok) {
      console.error('PayMongo error', response.status, data);
      return { statusCode: response.status, headers, body: JSON.stringify({ error: 'Unable to create secure checkout.', details: data.errors || null }) };
    }

    const checkoutUrl = data?.data?.attributes?.checkout_url;
    if (!checkoutUrl) throw new Error('PayMongo did not return a checkout URL.');

    return { statusCode: 200, headers, body: JSON.stringify({ checkout_url: checkoutUrl }) };
  } catch (error) {
    console.error(error);
    return { statusCode: 500, headers, body: JSON.stringify({ error: 'Unable to start payment checkout.' }) };
  }
};
