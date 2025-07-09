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

  let username, email, password;
  try {
    ({ username, email, password } = JSON.parse(event.body || '{}'));
  } catch (e) {
    console.log('JSON parse error:', e);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON in request body' })
    };
  }

  console.log('Register attempt:', { username, email });

  if (!username || !email || !password) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Username, email, and password required', username, email, password })
    };
  }

  // Cek apakah email sudah terdaftar
  const { data: existing, error: findError } = await supabase
    .from('users')
    .select('id')
    .eq('email', email)
    .maybeSingle();
  console.log('Existing user query:', { existing, findError });
  if (findError) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Database error', detail: findError.message })
    };
  }
  if (existing) {
    return {
      statusCode: 409,
      body: JSON.stringify({ error: 'Email already registered' })
    };
  }

  // Hash password sebelum simpan
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert user baru
  const { data, error } = await supabase
    .from('users')
    .insert([{ username, email, password: hashedPassword, role: 'user' }])
    .select()
    .maybeSingle();
  console.log('Insert user result:', { data, error });
  if (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to register user', detail: error.message })
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ success: true, message: 'Registration successful', user: { username, email, role: 'user' } })
  };
}; 