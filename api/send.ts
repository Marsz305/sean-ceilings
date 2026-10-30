import { Resend } from 'resend';

const RECEIVING_EMAIL = 'seanceillings@gmail.com';
const SENDER_EMAIL = 'carlmax1705@gmail.com';

// Handler for Vercel Serverless Function /api/send
export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        // keep as is
      }
    }

    const {
      name,
      fullName,
      email,
      phone,
      subject,
      message,
      notes,
      projectSuburb,
      timeline,
      areaM2,
      ratePerM2,
      totalCostUSD,
      quotationRef,
      selectedServices,
      includeShadowline,
      shadowlineMeters,
      shadowlineCost,
      substrate,
      finishLevel,
    } = body || {};

    const clientName = fullName || name || 'Valued Client';
    const clientEmail = email || '';
    const clientPhone = phone || 'Not specified';
    const ref = quotationRef || 'SC-' + Math.floor(100000 + Math.random() * 900000);
    const emailSubject = subject || `New Quotation & Project Inquiry [${ref}] - ${clientName} (${projectSuburb || 'Harare'})`;

    // Construct services HTML list if available
    const servicesHtml = Array.isArray(selectedServices) && selectedServices.length > 0
      ? selectedServices.map((s: any) => `
          <tr>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917;">${s.name}</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #d97706; font-family: monospace; font-weight: 600;">$${s.ratePerM2} / m²</td>
            <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917; font-family: monospace; font-weight: 700; text-align: right;">$${((areaM2 || 0) * s.ratePerM2).toLocaleString()} USD</td>
          </tr>
        `).join('')
      : '';

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${emailSubject}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f5f2eb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1917;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e5e0d8;">
    <tr>
      <td style="background-color: #121110; padding: 28px 32px; border-bottom: 3px solid #d97706;">
        <table width="100%">
          <tr>
            <td>
              <div style="color: #d97706; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; font-family: monospace;">Sean Ceilings Zimbabwe</div>
              <h1 style="color: #ffffff; margin: 6px 0 0 0; font-size: 22px; font-weight: 800;">New Project Quotation Request</h1>
            </td>
            <td style="text-align: right;">
              <span style="display: inline-block; background: #d97706; color: #ffffff; padding: 6px 12px; border-radius: 8px; font-family: monospace; font-size: 12px; font-weight: 700;">${ref}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="padding: 32px;">
        <div style="background: #faf8f5; border: 1px solid #e5e0d8; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h2 style="margin: 0 0 14px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #78716c; font-family: monospace;">Client Information</h2>
          <table width="100%" style="font-size: 13px; line-height: 1.6;">
            <tr>
              <td width="35%" style="color: #78716c; padding: 3px 0;">Client Name:</td>
              <td style="color: #1c1917; font-weight: 700; padding: 3px 0;">${clientName}</td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Phone / WhatsApp:</td>
              <td style="padding: 3px 0;"><a href="tel:${clientPhone}" style="color: #d97706; font-weight: 700; text-decoration: none;">${clientPhone}</a></td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Client Email:</td>
              <td style="padding: 3px 0;"><a href="mailto:${clientEmail}" style="color: #d97706; text-decoration: none;">${clientEmail || 'Not provided'}</a></td>
            </tr>
            ${projectSuburb ? `<tr><td style="color: #78716c; padding: 3px 0;">Project Location:</td><td style="color: #1c1917; font-weight: 600; padding: 3px 0;">${projectSuburb}</td></tr>` : ''}
            ${timeline ? `<tr><td style="color: #78716c; padding: 3px 0;">Target Timeline:</td><td style="color: #1c1917; padding: 3px 0;">${timeline}</td></tr>` : ''}
          </table>
        </div>

        ${servicesHtml ? `
        <h2 style="margin: 0 0 12px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #78716c; font-family: monospace;">Quotation Breakdown</h2>
        <table width="100%" cellspacing="0" cellpadding="0" style="border: 1px solid #e5e0d8; border-radius: 12px; overflow: hidden; margin-bottom: 24px;">
          <thead>
            <tr style="background: #faf8f5;">
              <th align="left" style="padding: 10px 12px; font-size: 11px; text-transform: uppercase; color: #78716c; font-family: monospace; border-bottom: 1px solid #e5e0d8;">Service Item</th>
              <th align="left" style="padding: 10px 12px; font-size: 11px; text-transform: uppercase; color: #78716c; font-family: monospace; border-bottom: 1px solid #e5e0d8;">Unit Rate</th>
              <th align="right" style="padding: 10px 12px; font-size: 11px; text-transform: uppercase; color: #78716c; font-family: monospace; border-bottom: 1px solid #e5e0d8;">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            ${servicesHtml}
            ${includeShadowline ? `
              <tr>
                <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917;">Shadowline Perimeter Reglets (15mm)</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #d97706; font-family: monospace; font-weight: 600;">${shadowlineMeters || 40}m @ $6/m</td>
                <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917; font-family: monospace; font-weight: 700; text-align: right;">$${shadowlineCost || 0} USD</td>
              </tr>
            ` : ''}
          </tbody>
          <tfoot>
            <tr style="background: #121110; color: #ffffff;">
              <td colspan="2" style="padding: 14px 16px; font-weight: 700; font-size: 14px;">Total Scope: ${areaM2 || 0} m²</td>
              <td align="right" style="padding: 14px 16px; font-weight: 800; font-size: 18px; color: #f59e0b; font-family: monospace;">$${(totalCostUSD || 0).toLocaleString()} USD</td>
            </tr>
          </tfoot>
        </table>
        ` : ''}

        ${(message || notes) ? `
        <div style="background: #faf8f5; border: 1px solid #e5e0d8; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 13px; color: #57534e;">
          <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #78716c; font-family: monospace;">Client Message / Specifications:</h3>
          <p style="margin: 0; line-height: 1.6; color: #1c1917;">${message || notes}</p>
        </div>
        ` : ''}

        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 10px 0;">
              <a href="https://wa.me/263${clientPhone.replace(/[^0-9]/g, '').replace(/^263|^0/, '')}" style="display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 13px; margin-right: 8px;">Reply via WhatsApp</a>
              ${clientEmail ? `<a href="mailto:${clientEmail}?subject=RE:%20Sean%20Ceilings%20Quotation%20[${ref}]" style="display: inline-block; background: #d97706; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 13px;">Reply via Email</a>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background: #faf8f5; padding: 18px 32px; border-top: 1px solid #e5e0d8; text-align: center; font-size: 11px; color: #78716c;">
        Sean Ceilings Zimbabwe &middot; Harare & Nationwide &middot; Contact: ${RECEIVING_EMAIL} &middot; +263 77 706 3455
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY environment variable is not defined on Vercel.');
      // Return 200 with notice so UX doesn't crash
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        message: 'Quotation received. Note: RESEND_API_KEY is not configured yet.',
        quotationRef: ref,
      }));
      return;
    }

    const resend = new Resend(apiKey);

    // Primary sender option from env or configured verified domain, fallback to onboarding@resend.dev
    const primaryFrom = process.env.RESEND_FROM || `Sean Ceilings <onboarding@resend.dev>`;
    const fallbackFrom = `Sean Ceilings <onboarding@resend.dev>`;

    let resendResult: any = null;
    let resendError: any = null;

    // Attempt 1: Try sending with primaryFrom
    try {
      const { data, error } = await resend.emails.send({
        from: primaryFrom,
        to: [RECEIVING_EMAIL],
        replyTo: clientEmail ? [clientEmail, SENDER_EMAIL] : [SENDER_EMAIL],
        subject: emailSubject,
        html: htmlContent,
      });

      if (error) {
        resendError = error;
      } else {
        resendResult = data;
      }
    } catch (err: any) {
      resendError = err;
    }

    // Attempt 2: If primary sender failed due to unverified domain, fallback to onboarding@resend.dev
    if (resendError && primaryFrom !== fallbackFrom) {
      try {
        const { data, error } = await resend.emails.send({
          from: fallbackFrom,
          to: [RECEIVING_EMAIL],
          replyTo: clientEmail ? [clientEmail, SENDER_EMAIL] : [SENDER_EMAIL],
          subject: emailSubject,
          html: htmlContent,
        });

        if (!error) {
          resendResult = data;
          resendError = null;
        } else {
          resendError = error;
        }
      } catch (err: any) {
        resendError = err;
      }
    }

    if (resendError) {
      console.error('Resend delivery failed:', resendError);
      res.statusCode = 200; // Return 200 with details so frontend confirmation displays
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        delivered: false,
        error: resendError.message || resendError,
        quotationRef: ref,
      }));
      return;
    }

    console.log(`[RESEND SUCCESS] Quotation ${ref} sent to ${RECEIVING_EMAIL}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      delivered: true,
      data: resendResult,
      quotationRef: ref,
      message: 'Email sent successfully via Resend!',
    }));

  } catch (error: any) {
    console.error('Server error in /api/send:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      error: error.message || 'Unable to send email.',
    }));
  }
}
