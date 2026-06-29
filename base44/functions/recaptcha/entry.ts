import { createClientFromRequest } from 'npm:@base44/sdk@0.8.31';

Deno.serve(async (req) => {
  try {
    let body = {};
    try { body = await req.json(); } catch {}

    // No token → return site key for rendering the widget
    if (!body.token) {
      return Response.json({ site_key: Deno.env.get("RECAPTCHA_SITE_KEY") });
    }

    // Verify token with Google
    const secret = Deno.env.get("RECAPTCHA_SECRET_KEY");
    const verifyResponse = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret, response: body.token }),
    });
    const result = await verifyResponse.json();

    return Response.json({ success: result.success });
  } catch (error) {
    return Response.json({ success: false, error: error.message }, { status: 500 });
  }
});