import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { subject, body, replyTo } = await req.json();

    // Sanitize inputs — strip any HTML/script tags
    const sanitize = (str) => String(str || '').replace(/<[^>]*>/g, '');

    const admins = await base44.asServiceRole.entities.User.filter({ role: 'admin' });

    for (const admin of admins) {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: admin.email,
        from_name: 'TM Engineering Website',
        subject: sanitize(subject),
        body: sanitize(body) + (replyTo ? `\n\n---\nReply directly to customer: ${sanitize(replyTo)}` : ''),
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});