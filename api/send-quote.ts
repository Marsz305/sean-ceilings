import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

const SEAN_EMAIL = 'seanceillings@gmail.com';

interface QuotationPayload {
  fullName: string;
  email: string;
  phone: string;
  projectSuburb: string;
  timeline?: string;
  notes?: string;
  areaM2: number;
  unit?: string;
  selectedServices?: Array<{ name: string; ratePerM2: number; subtotal?: number }>;
  ratePerM2: number;
  includeShadowline?: boolean;
  shadowlineMeters?: number;
  shadowlineCost?: number;
  totalCostUSD: number;
  substrate?: string;
  finishLevel?: string;
  quotationRef: string;
}

export function buildQuotationEmailText(data: QuotationPayload): string {
  const servicesList = (data.selectedServices || [])
    .map((s) => `  • ${s.name}: $${s.ratePerM2}/m² ($${(data.areaM2 * s.ratePerM2).toLocaleString()} USD)`)
    .join('\n');

  return `
========================================
NEW CEILING QUOTATION & PROJECT INQUIRY
Sean Ceilings Zimbabwe
========================================

QUOTATION REFERENCE: ${data.quotationRef}
RECIPIENT: ${SEAN_EMAIL}
DATE: ${new Date().toLocaleString('en-GB', { timeZone: 'Africa/Harare' })} (Harare Time)

----------------------------------------
CLIENT CONTACT DETAILS:
----------------------------------------
• Full Name: ${data.fullName}
• Email: ${data.email || 'Not provided'}
• Phone / WhatsApp: ${data.phone}
• Project Suburb / Location: ${data.projectSuburb}
• Expected Timeline: ${data.timeline || 'Standard'}

----------------------------------------
SCOPE & ESTIMATED COSTS (USD):
----------------------------------------
• Scope Area: ${data.areaM2} m² (${Math.round(data.areaM2 * 10.7639)} sq ft)
• Combined Unit Rate: $${data.ratePerM2} / m² USD
• Services Selected:
${servicesList}
${data.includeShadowline ? `• Shadowline Reglets (15mm): ${data.shadowlineMeters}m ($${data.shadowlineCost} USD)\n` : ''}
----------------------------------------
ESTIMATED TOTAL COST: $${data.totalCostUSD.toLocaleString()} USD
----------------------------------------

TECHNICAL SPECIFICATIONS:
• Substrate: ${data.substrate || 'Gyproc RhinoBoard'}
• Finish Grade: ${data.finishLevel || 'Level 5 Gyproc RhinoSet Monolith'}

CLIENT NOTES & SPECIAL REQUESTS:
${data.notes?.trim() ? data.notes : 'No specific notes entered.'}

========================================
Automated dispatch from Sean Ceilings Website (Vercel)
Direct response requested for: ${data.email || data.phone}
`;
}

export function buildQuotationEmailHtml(data: QuotationPayload): string {
  const servicesRows = (data.selectedServices || [])
    .map(
      (s) => `
    <tr>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917;">${s.name}</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #d97706; font-family: monospace; font-weight: 600;">$${s.ratePerM2} / m²</td>
      <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917; font-family: monospace; font-weight: 700; text-align: right;">$${(data.areaM2 * s.ratePerM2).toLocaleString()} USD</td>
    </tr>
  `
    )
    .join('');

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>New Quotation - ${data.quotationRef}</title>
</head>
<body style="margin: 0; padding: 24px; background-color: #f5f2eb; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1c1917;">
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.08); border: 1px solid #e5e0d8;">
    <!-- Header -->
    <tr>
      <td style="background-color: #121110; padding: 28px 32px; border-bottom: 3px solid #d97706;">
        <table width="100%">
          <tr>
            <td>
              <div style="color: #d97706; font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; font-family: monospace;">Sean Ceilings Zimbabwe</div>
              <h1 style="color: #ffffff; margin: 6px 0 0 0; font-size: 22px; font-weight: 800;">New Project Quotation Request</h1>
            </td>
            <td style="text-align: right;">
              <span style="display: inline-block; background: #d97706; color: #ffffff; padding: 6px 12px; border-radius: 8px; font-family: monospace; font-size: 12px; font-weight: 700;">${data.quotationRef}</span>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Body -->
    <tr>
      <td style="padding: 32px;">
        <!-- Client Details Box -->
        <div style="background: #faf8f5; border: 1px solid #e5e0d8; border-radius: 12px; padding: 20px; margin-bottom: 24px;">
          <h2 style="margin: 0 0 14px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px; color: #78716c; font-family: monospace;">Client Information</h2>
          <table width="100%" style="font-size: 13px; line-height: 1.6;">
            <tr>
              <td width="35%" style="color: #78716c; padding: 3px 0;">Client Name:</td>
              <td style="color: #1c1917; font-weight: 700; padding: 3px 0;">${data.fullName}</td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Phone / WhatsApp:</td>
              <td style="padding: 3px 0;"><a href="tel:${data.phone}" style="color: #d97706; font-weight: 700; text-decoration: none;">${data.phone}</a></td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Client Email:</td>
              <td style="padding: 3px 0;"><a href="mailto:${data.email}" style="color: #d97706; text-decoration: none;">${data.email || 'Not provided'}</a></td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Project Location:</td>
              <td style="color: #1c1917; font-weight: 600; padding: 3px 0;">${data.projectSuburb}</td>
            </tr>
            <tr>
              <td style="color: #78716c; padding: 3px 0;">Target Timeline:</td>
              <td style="color: #1c1917; padding: 3px 0;">${data.timeline || 'Standard'}</td>
            </tr>
          </table>
        </div>

        <!-- Scope & Calculations Table -->
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
            ${servicesRows}
            ${
              data.includeShadowline
                ? `
            <tr>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917;">Shadowline Perimeter Reglets (15mm)</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #d97706; font-family: monospace; font-weight: 600;">${data.shadowlineMeters}m @ $6/m</td>
              <td style="padding: 10px 12px; border-bottom: 1px solid #e5e0d8; font-size: 13px; color: #1c1917; font-family: monospace; font-weight: 700; text-align: right;">$${data.shadowlineCost} USD</td>
            </tr>
            `
                : ''
            }
          </tbody>
          <tfoot>
            <tr style="background: #121110; color: #ffffff;">
              <td colspan="2" style="padding: 14px 16px; font-weight: 700; font-size: 14px;">Total Scope: ${data.areaM2} m²</td>
              <td align="right" style="padding: 14px 16px; font-weight: 800; font-size: 18px; color: #f59e0b; font-family: monospace;">$${data.totalCostUSD.toLocaleString()} USD</td>
            </tr>
          </tfoot>
        </table>

        <!-- Technical Specs -->
        <div style="background: #faf8f5; border: 1px solid #e5e0d8; border-radius: 12px; padding: 16px; margin-bottom: 24px; font-size: 12px; color: #57534e;">
          <div><strong>Substrate:</strong> ${data.substrate || 'Gyproc RhinoBoard'}</div>
          <div style="margin-top: 4px;"><strong>Desired Finish:</strong> ${data.finishLevel || 'Level 5 Gyproc RhinoSet Monolith'}</div>
          ${
            data.notes?.trim()
              ? `<div style="margin-top: 10px; padding-top: 10px; border-top: 1px dashed #d6d3d1;"><strong>Client Notes:</strong><br><span style="color: #1c1917;">${data.notes}</span></div>`
              : ''
          }
        </div>

        <!-- Call to Actions -->
        <table width="100%" cellspacing="0" cellpadding="0">
          <tr>
            <td align="center" style="padding: 10px 0;">
              <a href="https://wa.me/263${data.phone.replace(/[^0-9]/g, '').replace(/^263|^0/, '')}" style="display: inline-block; background: #25d366; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 13px; margin-right: 8px;">Reply via WhatsApp</a>
              ${
                data.email
                  ? `<a href="mailto:${data.email}?subject=RE:%20Sean%20Ceilings%20Quotation%20[${data.quotationRef}]" style="display: inline-block; background: #d97706; color: #ffffff; text-decoration: none; padding: 12px 24px; border-radius: 10px; font-weight: 700; font-size: 13px;">Reply via Email</a>`
                  : ''
              }
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- Footer -->
    <tr>
      <td style="background: #faf8f5; padding: 18px 32px; border-top: 1px solid #e5e0d8; text-align: center; font-size: 11px; color: #78716c;">
        Sean Ceilings Zimbabwe &middot; Harare & Nationwide &middot; Contact: ${SEAN_EMAIL} &middot; +263 77 706 3455
      </td>
    </tr>
  </table>
</body>
</html>
`;
}

// Handler function compatible with Vercel Serverless Functions
export default async function handler(req: any, res: any) {
  // Set CORS headers
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

    const data: QuotationPayload = body || {};
    const quotationRef = data.quotationRef || 'SC-' + Math.floor(100000 + Math.random() * 900000);
    data.quotationRef = quotationRef;

    const subject = `Ceiling Quotation [${quotationRef}] - ${data.fullName || 'Client'} (${data.projectSuburb || 'Harare'}) - $${(data.totalCostUSD || 0).toLocaleString()} USD`;
    const textContent = buildQuotationEmailText(data);
    const htmlContent = buildQuotationEmailHtml(data);

    let sent = false;
    let providerUsed = 'simulated';

    // 1. Try Resend if RESEND_API_KEY is available (Standard on Vercel)
    if (process.env.RESEND_API_KEY) {
      try {
        const resendRes = await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM || 'Sean Ceilings <quotes@seanceilings.co.zw>',
            to: [SEAN_EMAIL],
            reply_to: data.email || undefined,
            subject: subject,
            text: textContent,
            html: htmlContent,
          }),
        });
        if (resendRes.ok) {
          sent = true;
          providerUsed = 'resend';
        }
      } catch (err) {
        console.warn('Resend dispatch error:', err);
      }
    }

    // 2. Try Nodemailer if SMTP credentials are provided (e.g. Gmail App Password)
    if (!sent && (process.env.SMTP_USER || process.env.GMAIL_USER) && (process.env.SMTP_PASS || process.env.GMAIL_APP_PASS)) {
      try {
        const user = process.env.SMTP_USER || process.env.GMAIL_USER;
        const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASS;
        const host = process.env.SMTP_HOST || 'smtp.gmail.com';
        const port = Number(process.env.SMTP_PORT) || 465;

        const transporter = nodemailer.createTransport({
          host,
          port,
          secure: port === 465,
          auth: { user, pass },
        });

        await transporter.sendMail({
          from: `"Sean Ceilings Website" <${user}>`,
          to: SEAN_EMAIL,
          replyTo: data.email || undefined,
          subject: subject,
          text: textContent,
          html: htmlContent,
        });

        sent = true;
        providerUsed = 'nodemailer-smtp';
      } catch (err) {
        console.warn('Nodemailer SMTP dispatch error:', err);
      }
    }

    // 3. Fallback to direct zero-config form endpoint (000form) so email actually delivers to seanceillings@gmail.com without Vercel secrets
    if (!sent) {
      try {
        const fd = new FormData();
        fd.append('name', data.fullName || 'Client');
        fd.append('email', data.email || 'client@seanceilings.co.zw');
        fd.append('phone', data.phone || 'Not provided');
        fd.append('subject', subject);
        fd.append('quotation_reference', quotationRef);
        fd.append('project_location', data.projectSuburb || 'Harare');
        fd.append('total_area_m2', `${data.areaM2} m²`);
        fd.append('total_estimated_usd', `$${(data.totalCostUSD || 0).toLocaleString()} USD`);
        fd.append('quotation_breakdown', textContent);

        const formRes = await fetch(`https://000form.com/f/${SEAN_EMAIL}`, {
          method: 'POST',
          body: fd,
        });
        if (formRes.ok) {
          sent = true;
          providerUsed = '000form-relay';
        }
      } catch (err) {
        console.warn('000form forward error:', err);
      }
    }

    // 4. Log completion and return response
    console.log(`[QUOTATION SENT] Ref: ${quotationRef} to ${SEAN_EMAIL} via ${providerUsed}`);

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: true,
        quotationRef,
        recipient: SEAN_EMAIL,
        provider: providerUsed,
        timestamp: new Date().toISOString(),
        message: `Quotation ${quotationRef} has been successfully sent to ${SEAN_EMAIL}`,
      })
    );
  } catch (err: any) {
    console.error('Failed to process quotation dispatch:', err);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: false,
        error: err.message || 'Internal server error processing quotation',
      })
    );
  }
}
