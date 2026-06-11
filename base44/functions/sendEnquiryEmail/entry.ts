import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const { subject, body, replyTo } = await req.json();

    // The list of recipients
    const recipients = ['peter@tmeng.co.za', 'sales@tmeng.co.za', 'Trevor@tmeng.co.za'];

    for (const email of recipients) {
      await base44.asServiceRole.integrations.Core.SendEmail({
        to: email,
        from_name: 'TM Engineering Website',
        subject: subject,
        body: body + (replyTo ? `\n\n---\nReply directly to customer: ${replyTo}` : ''),
      });
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});