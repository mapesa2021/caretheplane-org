async function testSupabaseConnection() {
  console.log('Testing Supabase connection with detailed error analysis...');
  
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

  console.log('✅ Environment variables loaded successfully');
  console.log('Supabase URL:', SUPABASE_URL);
  
  // Create Supabase client
  const { createClient } = await import('@supabase/supabase-js');
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

  try {
    // Add timeout to prevent hanging
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    // Test connection by querying a table
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count()', { count: 'exact', head: true })
      .abortSignal(controller.signal);
    
    clearTimeout(timeoutId);
    
    if (error) {
      console.error('❌ Supabase connection failed:', error);
      console.log('\nDetailed error analysis:');
      
      if (!error.message) {
        console.log('Empty error message detected - this typically indicates a network-level issue such as:');
        console.log('1. CORS restrictions blocking the request');
        console.log('2. Network firewall or security policy blocking the connection');
        console.log('3. Supabase project configuration issue');
        console.log('4. Invalid API key format');
        
        // Test direct URL access to check if it's a client vs network issue
        console.log('\nTesting direct URL access...');
        const url = `${SUPABASE_URL}/rest/v1/blog_posts`;
        const headers = {
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': `Bearer ${SUPABASE_ANON_KEY}`
        };
        
        try {
          const response = await fetch(url, { 
            method: 'GET', 
            headers: headers,
            signal: controller.signal
          });
          
          console.log(`Direct URL response status: ${response.status} ${response.statusText}`);
          if (response.headers.get('content-range')) {
            console.log(`Content-Range header present: ${response.headers.get('content-range')}`);
          }
        } catch (fetchError) {
          console.error('Direct URL fetch error:', fetchError.message);
        }
      }
      
      return;
    }

    console.log('✅ Successfully connected to Supabase!');
    if (data && data.count !== undefined) {
      console.log(`Found ${data.count} blog posts`);
    } else {
      console.log('Retrieved data, but count is undefined');
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message);
    
    // Check for network errors
    if (error.name === 'AbortError') {
      console.log('Request timed out - possible network connectivity issue');
    }
  }
}

// Run the test
testSupabaseConnection();