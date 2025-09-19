async function testUrl() {
  const url = 'https://vvawhrakoyrolvliwkwi.supabase.co/rest/v1/';
  const headers = {
    'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YXdocmFrb3lyb2x2bGl3a3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyODc1MzcsImV4cCI6MjA3Mzg2MzUzN30.BdAqjCHq9tjgXDum9WwEvQhx_v2VEUcK4kWNzgWbsLM',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ2YXdocmFrb3lyb2x2bGl3a3dpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyODc1MzcsImV4cCI6MjA3Mzg2MzUzN30.BdAqjCHq9tjgXDum9WwEvQhx_v2VEUcK4kWNzgWbsLM'
  };

  try {
    console.log('Testing URL directly...');
    console.log('URL:', url);
    
    const response = await fetch(url, {
      method: 'GET',
      headers: headers
    });
    
    console.log('Response status:', response.status);
    console.log('Response status text:', response.statusText);
    
    // Check for count in headers
    const count = response.headers.get('content-range');
    console.log('Content-Range header:', count);
    
    if (response.ok) {
      console.log('✅ URL is accessible!');
    } else {
      console.log('❌ URL request failed');
    }
  } catch (error) {
    console.error('❌ Error testing URL:', error.message);
  }
}

// Run the test
testUrl();