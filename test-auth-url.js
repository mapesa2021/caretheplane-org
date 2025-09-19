async function testAuthEndpoint() {
  const url = 'https://vvawhrakoyrolvliwkwi.supabase.co/auth/v1/session';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YXdocmFrb3lyb2x2bGl3a3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyODc1MzcsImV4cCI6MjA3Mzg2MzUzN30.BdAqjCHq9tjgXDum9WwEvQhx_v2VEUcK4kWNzgWbsLM',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YXdocmFrb3lyb2x2bGl3a3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyODc1MzcsImV4cCI6MjA3Mzg2MzUzN30.BdAqjCHq9tjgXDum9WwEvQhx_v2VEUcK4kWNzgWbsLM'
  };

  try {
    console.log('Testing auth endpoint...');
    console.log('URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    
    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    
    const data = await response.json();
    console.log('Response data:', data);
    
    if (response.ok) {
      console.log('✅ Auth endpoint is accessible!');
    } else {
      console.log('❌ Auth endpoint request failed');
    }
  } catch (error) {
    console.error('❌ Error testing auth endpoint:', error.message);
  }
}

// Run the test
testAuthEndpoint();