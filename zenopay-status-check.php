<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow GET requests for status checks
if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get order_id from query parameters
$orderId = $_GET['order_id'] ?? '';

if (empty($orderId)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing order_id parameter']);
    exit();
}

// ZenoPay API configuration
$zenoPayApiUrl = 'https://api.zenopay.me/api/v1/transactions/status';
$zenoPayApiKey = 'zpk_prod_9d4b8e4a-f2c8-4d5e-b1a7-8c9f2e3d4a5b'; // Replace with your actual API key

// Check if this is a test payment (phone number 0754546567)
// For test payments, simulate the status check
if (strpos($orderId, 'test') !== false || $orderId === 'test_payment') {
    // Simulate test payment completion after some time
    $testResponse = [
        'payment_status' => 'COMPLETED',
        'order_id' => $orderId,
        'amount' => '10000',
        'currency' => 'TZS',
        'transaction_id' => 'TEST_' . $orderId,
        'payment_method' => 'TEST_MPESA',
        'message' => 'Test payment completed successfully'
    ];
    
    echo json_encode($testResponse);
    exit();
}

// For real payments, check with ZenoPay API
try {
    // Prepare the request to ZenoPay status endpoint
    $statusData = [
        'order_id' => $orderId
    ];
    
    $curl = curl_init();
    
    curl_setopt_array($curl, [
        CURLOPT_URL => $zenoPayApiUrl,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_ENCODING => '',
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 30,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => 'POST',
        CURLOPT_POSTFIELDS => json_encode($statusData),
        CURLOPT_HTTPHEADER => [
            'Content-Type: application/json',
            'Authorization: Bearer ' . $zenoPayApiKey,
            'Accept: application/json'
        ],
    ]);
    
    $response = curl_exec($curl);
    $httpCode = curl_getinfo($curl, CURLINFO_HTTP_CODE);
    $curlError = curl_error($curl);
    
    curl_close($curl);
    
    // Check for cURL errors
    if ($curlError) {
        throw new Exception('Request failed: ' . $curlError);
    }
    
    // Check HTTP response code
    if ($httpCode !== 200) {
        throw new Exception('API request failed with status: ' . $httpCode);
    }
    
    // Parse the response
    $result = json_decode($response, true);
    
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception('Invalid JSON response from ZenoPay API');
    }
    
    // Check if the response indicates success
    if (isset($result['status']) && $result['status'] === 'success') {
        // Payment status successful - return the status
        $statusResponse = [
            'payment_status' => $result['payment_status'] ?? 'PENDING',
            'order_id' => $orderId,
            'amount' => $result['amount'] ?? '',
            'currency' => $result['currency'] ?? 'TZS',
            'transaction_id' => $result['transaction_id'] ?? '',
            'payment_method' => $result['payment_method'] ?? '',
            'message' => $result['message'] ?? 'Status check successful'
        ];
        
        echo json_encode($statusResponse);
    } else {
        // API returned an error
        $errorMessage = $result['message'] ?? 'Unknown error from ZenoPay API';
        throw new Exception($errorMessage);
    }
    
} catch (Exception $e) {
    // Log the error (in production, log to a file)
    error_log('ZenoPay Status Check Error: ' . $e->getMessage());
    
    // Return error response
    http_response_code(500);
    echo json_encode([
        'error' => 'Failed to check payment status',
        'message' => $e->getMessage(),
        'payment_status' => 'ERROR'
    ]);
}
?>