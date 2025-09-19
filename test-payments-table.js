async function testPaymentsTable() {
  console.log('Testing payments table connection...');
  
  // Load environment variables
  const dotenv = await import('dotenv');
  await dotenv.config({ path: '.env.local' });

  // Get Supabase URL and key from environment variables
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase environment variables not found. Check your .env.local file.');
    return;
  }

  // Create Supabase client with the same configuration as our app
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    },
    global: {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
      }
    }
  });

  try {
    // Test retrieving from payments table
    const { data, error } = await supabase
      .from('payments')
      .select('*')
      .limit(1);

    if (error) {
      console.error('❌ Payments table connection failed:', error);
      return;
    }

    console.log('✅ Payments table connection successful!');
    if (data && data.length > 0) {
      console.log(`Retrieved ${data.length} payment(s) successfully`);
      console.log('Sample data:', JSON.stringify(data[0], null, 2));
    } else {
      console.log('No payments found in database (this is okay if no donations have been made yet)');
    }
  } catch (error) {
    console.error('❌ Unexpected error in payments table connection:', error.message);
  }
}

// Run the test
testPaymentsTable();