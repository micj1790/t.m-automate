import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

const sanitize = (str) => String(str || '').replace(/<[^>]*>/g, '').trim();

function buildHtml({ type, fields, message, replyTo }) {
  const isQuote = type === 'quote';
  const title = isQuote ? '📋 New Quote Request' : '📩 New Contact Enquiry';
  const color = isQuote ? '#1d4ed8' : '#0f766e';

  const rows = fields
    .filter(f => f.value)
    .map(f => `
      <tr>
        <td style="padding:8px 12px;background:#f1f5f9;color:#64748b;font-size:12px;font-weight:600;white-space:nowrap;border-bottom:1px solid #e2e8f0;width:140px">${f.label}</td>
        <td style="padding:8px 12px;color:#0f172a;font-size:14px;border-bottom:1px solid #e2e8f0">${sanitize(f.value)}</td>
      </tr>`)
    .join('');

  return `
<!DOCTYPE html>
<html>
<body style="margin:0;padding:0;background:#f8fafc;font-family:Arial,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8fafc;padding:32px 16px">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08)">
        <!-- Header -->
        <tr><td style="background:${color};padding:24px 32px">
          <img src="https://media.base44.com/images/public/69fefc1890408637f331f461/1749f5854_new_logo-removebg-preview.png" alt="T.M Engineering" height="48" style="display:block;margin-bottom:12px" />
          <h1 style="margin:0;color:#ffffff;font-size:20px;font-weight:700">${title}</h1>
          <p style="margin:4px 0 0;color:rgba(255,255,255,0.75);font-size:13px">Received via tmengineering.co.za</p>
        </td></tr>
        <!-- Details Table -->
        <tr><td style="padding:24px 32px 8px">
          <p style="margin:0 0 12px;font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em">Contact Details</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="border-radius:8px;overflow:hidden;border:1px solid #e2e8f0">
            ${rows}
          </table>
        </td></tr>
        <!-- Message -->
        <tr><td style="padding:16px 32px 24px">
          <p style="margin:0 0 8px;font-size:13px;font-weight:700;color:#475569;text-transform:uppercase;letter-spacing:0.05em">${isQuote ? 'Project Details' : 'Message'}</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:16px;font-size:14px;color:#0f172a;line-height:1.6;white-space:pre-wrap">${sanitize(message)}</div>
        </td></tr>
        <!-- Reply CTA -->
        ${replyTo ? `<tr><td style="padding:0 32px 24px">
          <a href="mailto:${sanitize(replyTo)}" style="display:inline-block;background:${color};color:#fff;text-decoration:none;padding:10px 20px;border-radius:8px;font-size:14px;font-weight:600">Reply to ${sanitize(replyTo)}</a>
        </td></tr>` : ''}
        <!-- Footer -->
        <tr><td style="background:#f1f5f9;padding:16px 32px;border-top:1px solid #e2e8f0">
          <p style="margin:0;font-size:11px;color:#94a3b8">T.M Engineering (Pty) Ltd · 10 Susan Street, Strijdom Park, Randburg · 011 791 1562</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { subject, body, replyTo, type, fields, message } = await req.json();

    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });

    const htmlBody = (fields && message)
      ? buildHtml({ type: type || 'contact', fields, message, replyTo })
      : sanitize(body) + (replyTo ? `\n\n---\nReply to: ${sanitize(replyTo)}` : '');

    for (const admin of admins) {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: admin.email,
        from_name: 'TM Engineering Website',
        subject: sanitize(subject),
        body: htmlBody,
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});