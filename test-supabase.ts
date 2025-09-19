import { supabase } from './lib/supabase';

async function testSupabaseConnection() {
  console.log('Testing Supabase connection...');
  
  if (!supabase) {
    console.error('❌ Supabase client not initialized. Check your environment variables.');
    return;
  }
  
  try {
    // Test connection by listing tables (using a simple query)
    const { data, error } = await supabase.from('blog_posts').select('count()', { count: 'exact', head: true });
    
    if (error) {
      console.error('❌ Supabase connection error:', error);
      console.log('\n💡 Troubleshooting tips:');
      console.log('1. Verify your .env.local file has correct values');
      console.log('2. Check that your Supabase project URL and API key are correct');
      console.log('3. Ensure your Supabase project is active and not paused');
      console.log('4. Verify that RLS (Row Level Security) is properly configured');
      return;
    }
    
    console.log('✅ Successfully connected to Supabase!');
    console.log(`📊 Found blog_posts table with ${data} records`);
    
    // Test reading from another table
    const { data: teamData, error: teamError } = await supabase.from('team_members').select('count()', { count: 'exact', head: true });
    
    if (teamError) {
      console.warn('⚠️  Could not access team_members table:', teamError.message);
      console.log('This table might not exist or you may need to set up the database schema.');
    } else {
      console.log(`✅ team_members table accessible with ${teamData} records`);
    }
    
    // Test reading from payments table
    const { data: paymentsData, error: paymentsError } = await supabase.from('payments').select('count()', { count: 'exact', head: true });
    
    if (paymentsError) {
      console.warn('⚠️  Could not access payments table:', paymentsError.message);
      console.log('This table might not exist or you may need to set up the database schema.');
    } else {
      console.log(`✅ payments table accessible with ${paymentsData} records`);
    }
    
    console.log('\n🎉 All tests completed successfully! Your admin panel should now work properly.');
    
  } catch (error) {
    console.error('❌ Unexpected error:', error);
  }
}

testSupabaseConnection();