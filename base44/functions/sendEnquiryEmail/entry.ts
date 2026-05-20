import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const { subject, body, replyTo } = await req.json();

    // Get all admin users to notify them
    const users = await base44.asServiceRole.entities.User.filter({ role: 'admin' });

    if (users && users.length > 0) {
      for (const user of users) {
        await base44.asServiceRole.integrations.Core.SendEmail({
          to: user.email,
          from_name: 'TM Engineering Website',
          subject: subject,
          body: body + (replyTo ? `\n\n---\nReply directly to customer: ${replyTo}` : ''),
        });
      }
    }

    return Response.json({ success: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});