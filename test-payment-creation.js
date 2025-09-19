async function testPaymentCreation() {
  console.log('Testing payment creation...');
  
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
    // Test creating a new payment record
    const testPaymentData = {
      order_id: `test-order-${Date.now()}`,
      amount: 1000,
      currency: 'TZS',
      buyer_email: 'test@caretheplanet.org',
      buyer_name: 'Test User',
      buyer_phone: '0754546567',
      status: 'pending'
    };

    console.log('Creating test payment:', testPaymentData);
    
    const { data, error } = await supabase
      .from('payments')
      .insert([testPaymentData])
      .select()
      .single();

    if (error) {
      console.error('❌ Payment creation failed:', error);
      return;
    }

    console.log('✅ Payment created successfully!');
    console.log('Created payment data:', JSON.stringify(data, null, 2));
    
    // Clean up - delete the test payment
    console.log('Cleaning up test payment...');
    const { error: deleteError } = await supabase
      .from('payments')
      .delete()
      .eq('order_id', testPaymentData.order_id);
      
    if (deleteError) {
      console.error('⚠️ Warning: Could not clean up test payment:', deleteError);
    } else {
      console.log('✅ Test payment cleaned up successfully');
    }
    
  } catch (error) {
    console.error('❌ Unexpected error in payment creation:', error.message);
  }
}

// Run the test
testPaymentCreation();