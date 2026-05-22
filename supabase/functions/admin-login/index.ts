const corsHeaders = {
  'Access-Control-Allow-Headers': 'apikey, content-type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Origin': '*'
};

Deno.serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed.' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const hcaptchaSecret = Deno.env.get('HCAPTCHA_SECRET_KEY');
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!hcaptchaSecret || !supabaseUrl || !supabaseAnonKey) {
    return new Response(JSON.stringify({ error: 'Admin login is not configured.' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const body = await request.json().catch(() => ({}));
  const email = typeof body.email === 'string' ? body.email.trim() : '';
  const password = typeof body.password === 'string' ? body.password : '';
  const hcaptchaToken = typeof body.hcaptchaToken === 'string' ? body.hcaptchaToken : '';

  if (!email || !password || !hcaptchaToken) {
    return new Response(JSON.stringify({ error: 'Email, password, and hCaptcha are required.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const hcaptchaBody = new URLSearchParams({
    secret: hcaptchaSecret,
    response: hcaptchaToken
  });
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim();
  if (forwardedFor) hcaptchaBody.set('remoteip', forwardedFor);

  const hcaptchaResponse = await fetch('https://hcaptcha.com/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: hcaptchaBody
  });
  const hcaptchaResult = await hcaptchaResponse.json().catch(() => ({}));

  if (!hcaptchaResult.success) {
    return new Response(JSON.stringify({ error: 'hCaptcha verification failed.' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const authResponse = await fetch(`${supabaseUrl}/auth/v1/token?grant_type=password`, {
    method: 'POST',
    headers: {
      apikey: supabaseAnonKey,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  if (!authResponse.ok) {
    return new Response(JSON.stringify({ error: 'Sign in failed.' }), {
      status: 401,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  return new Response(await authResponse.text(), {
    status: 200,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' }
  });
});
