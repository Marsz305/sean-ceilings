import { Resend } from 'resend';

const RECEIVING_EMAIL = 'seanceillings@gmail.com';
const VERIFIED_FROM = 'Sean Ceilings <noreply@seanceillings.co.zw>';
const OWNER_FALLBACK_REPLY = 'marerec402@gmail.com';

// In-memory sliding-window IP rate limiter
interface RateLimitEntry {
  timestamps: number[];
}
const rateLimitMap = new Map<string, RateLimitEntry>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 6; // Max 6 quote submissions per IP per 10m

// Clean up stale IP records every 15 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, entry] of rateLimitMap.entries()) {
    entry.timestamps = entry.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (entry.timestamps.length === 0) {
      rateLimitMap.delete(ip);
    }
  }
}, 15 * 60 * 1000);

function sanitizeText(input: any, maxLength = 200): string {
  if (typeof input !== 'string') return '';
  return input
    .slice(0, maxLength)
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
    .trim();
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

const EMAIL_REGEX = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

// Handler for Vercel Serverless Function /api/send
export default async function handler(req: any, res: any) {
  // Security response headers
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
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

  // 1. IP Rate Limiting Check
  const clientIp = (
    req.headers['x-forwarded-for']?.split(',')[0]?.trim() ||
    req.headers['x-real-ip'] ||
    req.socket?.remoteAddress ||
    '127.0.0.1'
  );

  const now = Date.now();
  const ipData = rateLimitMap.get(clientIp) || { timestamps: [] };
  ipData.timestamps = ipData.timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (ipData.timestamps.length >= MAX_REQUESTS_PER_WINDOW) {
    res.statusCode = 429;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      error: 'Security rate limit reached. Please wait a few minutes before submitting another quote.',
    }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === 'string') {
      try {
        body = JSON.parse(body);
      } catch {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Malformed JSON payload.' }));
        return;
      }
    }

    if (!body || typeof body !== 'object') {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ success: false, error: 'Invalid payload.' }));
      return;
    }

    // 2. Honeypot Bot Trap: Automated bots fill hidden fields
    if (body.website_hp || body.company_role_hp || body.security_token_hp) {
      console.warn(`[BOT BLOCKED] Spambot honeypot triggered from IP ${clientIp}`);
      // Pretend success so bot doesn't retry with altered payloads
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: true,
        delivered: true,
        message: 'Quotation received.',
      }));
      return;
    }

    // Record submission for rate limiter
    ipData.timestamps.push(now);
    rateLimitMap.set(clientIp, ipData);

    // 3. Sanitization & Input Length Guards
    const clientName = sanitizeText(body.fullName || body.name, 100) || 'Valued Client';
    const rawEmail = sanitizeText(body.email, 150);
    const clientPhone = sanitizeText(body.phone, 50) || 'Not specified';
    const projectSuburb = sanitizeText(body.projectSuburb, 120) || 'Harare';
    const timeline = sanitizeText(body.timeline, 80) || 'Within 2-4 weeks';
    const rawNotes = sanitizeText(body.notes || body.message, 2500);
    const substrate = sanitizeText(body.substrate, 80) || 'Gyproc RhinoBoard';
    const finishLevel = sanitizeText(body.finishLevel, 80) || 'Level 5 Gyproc RhinoSet Monolith';

    // Validate email format if provided
    let clientEmail = '';
    if (rawEmail) {
      if (!EMAIL_REGEX.test(rawEmail)) {
        res.statusCode = 400;
        res.setHeader('Content-Type', 'application/json');
        res.end(JSON.stringify({ success: false, error: 'Invalid email address format.' }));
        return;
      }
      clientEmail = rawEmail;
    }

    const rawArea = Number(body.areaM2);
    const areaM2 = Number.isFinite(rawArea) && rawArea > 0 && rawArea < 100000 ? Math.round(rawArea) : 120;
    const rawRate = Number(body.ratePerM2);
    const ratePerM2 = Number.isFinite(rawRate) && rawRate > 0 && rawRate < 500 ? rawRate : 17;
    const rawTotal = Number(body.totalCostUSD);
    const totalCostUSD = Number.isFinite(rawTotal) && rawTotal > 0 ? rawTotal : areaM2 * ratePerM2;

    const ref = 'SC-' + Math.floor(100000 + Math.random() * 900000);
    const emailSubject = `Ceiling Quotation [${ref}] - ${clientName} (${projectSuburb}) - $${totalCostUSD.toLocaleString()} USD`;

    // Construct services list safely with escaping
    const selectedServices = Array.isArray(body.selectedServices) ? body.selectedServices : [];
    const servicesHtml = selectedServices.length > 0
      ? selectedServices.map((s: any) => {
          const sName = escapeHtml(sanitizeText(s.name, 100));
          const sRate = Number(s.ratePerM2) || 0;
          const sSubtotal = (areaM2 * sRate).toLocaleString();
          return `
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917;">${sName}</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #d97706; font-family: monospace; font-weight: 600;">$${sRate} / m²</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917; font-family: monospace; font-weight: 700; text-align: right;">$${sSubtotal} USD</td>
            </tr>
          `;
        }).join('')
      : '';

    const servicesText = selectedServices.length > 0
      ? selectedServices.map((s: any) => `  • ${sanitizeText(s.name, 100)}: $${Number(s.ratePerM2) || 0}/m² ($${((areaM2) * (Number(s.ratePerM2) || 0)).toLocaleString()} USD)`).join('\n')
      : '';

    // Plain text content for email
    const textContent = `
========================================
NEW CEILING QUOTATION & PROJECT INQUIRY
Sean Ceilings Zimbabwe
========================================

QUOTATION REFERENCE: ${ref}
RECIPIENT: ${RECEIVING_EMAIL}
DATE: ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Harare' })} (Harare Time)

----------------------------------------
CLIENT CONTACT DETAILS:
----------------------------------------
• Full Name: ${clientName}
• Email: ${clientEmail || 'Not provided'}
• Phone / WhatsApp: ${clientPhone}
• Project Suburb / Location: ${projectSuburb}
• Expected Timeline: ${timeline}

----------------------------------------
SCOPE & ESTIMATED COSTS (USD):
----------------------------------------
• Scope Area: ${areaM2} m² (${Math.round(areaM2 * 10.7639)} sq ft)
• Combined Unit Rate: $${ratePerM2} / m² USD
• Services Selected:
${servicesText}
----------------------------------------
ESTIMATED TOTAL COST: $${totalCostUSD.toLocaleString()} USD
----------------------------------------

TECHNICAL SPECIFICATIONS:
• Substrate: ${substrate}
• Finish Grade: ${finishLevel}

CLIENT NOTES & SPECIAL REQUESTS:
${rawNotes || 'No additional notes provided.'}

========================================
Automated dispatch from Sean Ceilings Verified System
Direct response requested for: ${clientEmail || clientPhone}
`;

    // 4. HTML Email Content with Full HTML Escaping
    const escName = escapeHtml(clientName);
    const escEmail = escapeHtml(clientEmail);
    const escPhone = escapeHtml(clientPhone);
    const escSuburb = escapeHtml(projectSuburb);
    const escTimeline = escapeHtml(timeline);
    const escNotes = escapeHtml(rawNotes);
    const cleanPhoneDigits = clientPhone.replace(/[^0-9]/g, '').replace(/^263|^0/, '');

    const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>${escapeHtml(emailSubject)}</title>
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
              <td style="color: #1c1917; font-weight: 700; padding: 3px 0;">${escName}</td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Phone / WhatsApp:</td>
              <td style="padding: 3px 0;"><a href="tel:${escPhone}" style="color: #d97706; font-weight: 700; text-decoration: none;">${escPhone}</a></td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Client Email:</td>
              <td style="padding: 3px 0;"><a href="mailto:${escEmail}" style="color: #d97706; text-decoration: none;">${escEmail || 'Not provided'}</a></td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Project Location:</td>
              <td style="color: #1c1917; font-weight: 600; padding: 3px 0;">${escSuburb}</td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Target Timeline:</td>
              <td style="color: #1c1917; padding: 3px 0;">${escTimeline}</td>
            </tr>
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
          </tbody>
          <tfoot>
            <tr style="background: #121110; color: #ffffff;">
              <td colspan="2" style="padding: 14px 16px; font-weight: 700; font-size: 14px;">Total Scope: ${areaM2} m²</td>
              <td align="right" style="padding: 14px 16px; font-weight: 800; font-size: 18px; color: #f59e0b; font-family: monospace;">$${totalCostUSD.toLocaleString()} USD</td>
            </tr>
          </tfoot>
        </table>
        ` : ''}

        ${escNotes ? `
        <div style="background: #faf8f5; border: 1px solid #e5e0d8; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 13px; color: #57534e;">
          <h3 style="margin: 0 0 8px 0; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; color: #78716c; font-family: monospace;">Client Message / Specifications:</h3>
          <p style="margin: 0; line-height: 1.6; color: #1c1917; white-space: pre-wrap;">${escNotes}</p>
        </div>
        ` : ''}

        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 10px 0;">
              ${cleanPhoneDigits ? `<a href="https://wa.me/263${cleanPhoneDigits}" style="display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 13px; margin-right: 8px;">Reply via WhatsApp</a>` : ''}
              ${clientEmail ? `<a href="mailto:${escEmail}?subject=RE:%20Sean%20Ceilings%20Quotation%20[${ref}]" style="display: inline-block; background: #d97706; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 13px;">Reply via Email</a>` : ''}
            </td>
          </tr>
        </table>
      </td>
    </tr>
    <tr>
      <td style="background: #faf8f5; padding: 18px 32px; border-top: 1px solid #e5e0d8; text-align: center; font-size: 11px; color: #78716c;">
        Sean Ceilings Zimbabwe &middot; Harare & Nationwide &middot; Official Inquiries: ${RECEIVING_EMAIL} &middot; +263 77 706 3455
      </td>
    </tr>
  </table>
</body>
</html>
    `;

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      console.warn('RESEND_API_KEY environment variable is not defined on Vercel.');
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: false,
        delivered: false,
        error: 'RESEND_API_KEY environment variable is not set on this server.',
        quotationRef: ref,
      }));
      return;
    }

    const resend = new Resend(apiKey);
    const fromAddress = process.env.RESEND_FROM || VERIFIED_FROM;
    const replyToAddress = clientEmail ? [clientEmail, OWNER_FALLBACK_REPLY] : [OWNER_FALLBACK_REPLY];

    const { data: resendData, error: resendError } = await resend.emails.send({
      from: fromAddress,
      to: [RECEIVING_EMAIL],
      replyTo: replyToAddress,
      subject: emailSubject,
      html: htmlContent,
      text: textContent,
    });

    if (resendError) {
      console.error('Resend delivery error:', resendError);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({
        success: false,
        error: resendError.message || resendError,
        quotationRef: ref,
      }));
      return;
    }

    console.log(`[RESEND SUCCESS] Quotation ${ref} sent from ${fromAddress} to ${RECEIVING_EMAIL}`);
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: true,
      delivered: true,
      data: resendData,
      quotationRef: ref,
      message: 'Email sent successfully via Resend!',
    }));

  } catch (error: any) {
    console.error('Server error in /api/send:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({
      success: false,
      error: 'An internal error occurred while processing the quotation.',
    }));
  }
}
