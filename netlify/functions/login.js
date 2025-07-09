const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');

const SUPABASE_URL = 'https://ixsfonqaixyiqxxjllka.supabase.co';
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  let email, password;
  try {
    ({ email, password } = JSON.parse(event.body || '{}'));
  } catch (e) {
    console.log('JSON parse error:', e);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  console.log('Login attempt:', { email, password });

  if (!email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Email and password required', email, password })
    };
  }

  // Cari user berdasarkan email
  const { data: user, error } = await supabase
    .from('users')
    .select('id, username, email, role, password')
    .eq('email', email)
    .maybeSingle();

  console.log('User query result:', { user, error });

  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error', detail: error.message })
    };
  }
  if (!user) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid credentials (user not found)' })
    };
  }

  // Bandingkan password input dengan hash di database
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return {
      statusCode: 401,
      body: JSON.stringify({ error: 'Invalid credentials (password mismatch)' })
    };
  }

  // Jangan kirim hash password ke frontend
  delete user.password;

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'Login successful', user })
  };
}; 