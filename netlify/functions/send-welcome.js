exports.handler = async function(event, context) {
  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json'
  };

  try {
    const { name, email } = JSON.parse(event.body);

    if (!email) {
      return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email is required' }) };
    }

    const firstName = (name || 'Collective Member').split(' ')[0];

    const emailText = `Dear ${firstName},

Thank you for being here.

What you just did — raising your hand and saying I want this — is the first step toward skin that reflects how you actually feel inside. We built RevelleCare for exactly this moment.

This fall, we will open our doors in Ontario and British Columbia, bringing Canada's first prescription compounded skincare formulated specifically for the skin changes of perimenopause and menopause. No more adapting products designed for someone else's biology. No more being told it's just aging.

You will be among the very first to know when we launch — with priority access before we open to the public.

Until then, we will be in touch with the science behind why your skin changes during this transition, what makes our formulations different, and how our care process works. No spam. No noise. Just the information you deserve.

Revelle is the moment a woman wakes up, looks in the mirror, and recognizes herself again.

That moment is coming. We are building it for you.

With gratitude,

Michele Lunney
Founder & CEO, RevelleCare Inc.
michele@revellecare.com
revellecare.com`;

    const emailHtml = `<div style="font-family: Georgia, serif; max-width: 600px; margin: 0 auto; padding: 40px 20px; color: #2C2C2C; background: #FDFCFA;">
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">Dear ${firstName},</p>
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">Thank you for being here.</p>
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">What you just did &mdash; raising your hand and saying <em>I want this</em> &mdash; is the first step toward skin that reflects how you actually feel inside. We built RevelleCare for exactly this moment.</p>
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">This fall, we will open our doors in Ontario and British Columbia, bringing Canada&rsquo;s first prescription compounded skincare formulated specifically for the skin changes of perimenopause and menopause. No more adapting products designed for someone else&rsquo;s biology. No more being told it&rsquo;s just aging.</p>
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">You will be among the very first to know when we launch &mdash; with priority access before we open to the public.</p>
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 20px;">Until then, we will be in touch with the science behind why your skin changes during this transition, what makes our formulations different, and how our care process works. No spam. No noise. Just the information you deserve.</p>
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 30px; font-style: italic; color: #0E6B68;">Revelle is the moment a woman wakes up, looks in the mirror, and recognizes herself again.</p>
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 30px;">That moment is coming. We are building it for you.</p>
      <p style="font-size: 17px; line-height: 1.7; margin-bottom: 5px;">With gratitude,</p>
      <p style="font-size: 17px; line-height: 1.5; margin-bottom: 5px;"><strong>Mich&egrave;le Lunney</strong></p>
      <p style="font-size: 15px; line-height: 1.5; color: #666; margin-bottom: 2px;">Founder &amp; CEO, RevelleCare Inc.</p>
      <p style="font-size: 15px; line-height: 1.5; color: #666; margin-bottom: 2px;"><a href="mailto:michele@revellecare.com" style="color: #0E6B68;">michele@revellecare.com</a></p>
      <p style="font-size: 15px; line-height: 1.5; color: #666;"><a href="https://revellecare.com" style="color: #0E6B68;">revellecare.com</a></p>
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #E8E4DC; text-align: center;">
        <p style="font-size: 12px; color: #999;">You are receiving this because you joined The Collective at revellecare.com</p>
      </div>
    </div>`;

    // Send welcome email to new member
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'Michele Lunney, RevelleCare <onboarding@resend.dev>',
        to: [email],
        reply_to: 'michele@revellecare.com',
        subject: "Welcome to The Collective \u2014 You're in.",
        text: emailText,
        html: emailHtml
      })
    });

    const result = await response.json();

    if (!response.ok) {
      console.error('Resend error:', result);
      return { statusCode: 500, headers, body: JSON.stringify({ error: 'Failed to send email', details: result }) };
    }

    // Notify Michele of new signup
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: 'RevelleCare Collective <onboarding@resend.dev>',
        to: ['michele@revellecare.com'],
        reply_to: 'michele@revellecare.com',
        subject: `New Collective Member: ${name || 'Unknown'} (${email})`,
        text: `New Collective signup:\n\nName: ${name || 'Not provided'}\nEmail: ${email}\nTime: ${new Date().toISOString()}`
      })
    });

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ success: true, id: result.id })
    };

  } catch (err) {
    console.error('Function error:', err);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: err.message })
    };
  }
};
