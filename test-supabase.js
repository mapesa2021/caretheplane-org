async function testSupabaseConnection() {
  console.log('Testing Supabase connection...')
  
  // Load environment variables
  const dotenv = await import('dotenv')
  await dotenv.config({ path: '.env.local' })

  // Get Supabase URL and key from environment variables
  const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
  const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
    console.error('❌ Supabase environment variables not found. Check your .env.local file.')
    return
  }

  // Create Supabase client
  const { createClient } = await import('@supabase/supabase-js')
  const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

  try {
    // Test connection by querying a table
    const { data, error } = await supabase
      .from('blog_posts')
      .select('count()', { count: 'exact', head: true })

    if (error) {
      console.error('❌ Supabase connection failed:', error)
      return
    }

    console.log('✅ Successfully connected to Supabase!')
    if (data && data.count !== undefined) {
      console.log(`Found ${data.count} blog posts`)
    } else {
      console.log('Retrieved data, but count is undefined')
    }
  } catch (error) {
    console.error('❌ Unexpected error:', error.message)
  }
}

// Run the test
testSupabaseConnection()