<?php
// ZenoPay Proxy for CareThePlanet - Static Hosting
// This file handles ZenoPay API calls to avoid CORS issues

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit();
}

// ZenoPay Configuration
$ZENOPAY_API_KEY = 'ArtYqYpjmi8UjbWqxhCe7SLqpSCbws-_7vjudTuGR91PT6pmWX85lapiuq7xpXsJ2BkPZ9gkxDEDotPgtjdV6g';
$ZENOPAY_URL = 'https://zenoapi.com/api/payments/mobile_money_tanzania';

// Get the input data
$input = json_decode(file_get_contents('php://input'), true);

// Validate required fields
if (!isset($input['order_id']) || !isset($input['buyer_email']) || 
    !isset($input['buyer_name']) || !isset($input['buyer_phone']) || 
    !isset($input['amount'])) {
    
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Missing required fields',
        'error' => 'order_id, buyer_email, buyer_name, buyer_phone, and amount are required'
    ]);
    exit();
}

// Validate phone number format (Tanzania)
$phone = $input['buyer_phone'];
if (!preg_match('/^(\+?255|0)?[67]\d{8}$/', $phone)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid phone number format',
        'error' => 'Please provide a valid Tanzanian phone number'
    ]);
    exit();
}

// Normalize phone number to 07XXXXXXXX format
if (strpos($phone, '+') === 0) {
    $phone = substr($phone, 1);
}
if (strpos($phone, '255') === 0) {
    $phone = '0' . substr($phone, 3);
} elseif (!strpos($phone, '0') === 0) {
    $phone = '0' . $phone;
}

// Check for test phone number
if ($phone === '0754546567') {
    // Simulate test payment
    sleep(2); // Simulate API delay
    echo json_encode([
        'status' => 'success',
        'resultcode' => '000',
        'message' => 'Test payment - Request in progress. You will receive a callback shortly',
        'order_id' => $input['order_id'],
        'isTestPayment' => true
    ]);
    exit();
}

// Prepare data for ZenoPay
$payload = [
    'order_id' => $input['order_id'],
    'buyer_email' => $input['buyer_email'],
    'buyer_name' => $input['buyer_name'],
    'buyer_phone' => $phone,
    'amount' => intval($input['amount'])
];

// Initialize cURL
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $ZENOPAY_URL);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_TIMEOUT, 30);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'x-api-key: ' . $ZENOPAY_API_KEY
]);

// Execute the request
$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
$curlError = curl_error($ch);
curl_close($ch);

// Handle cURL errors
if ($curlError) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Failed to connect to payment service',
        'error' => 'Network error: ' . $curlError
    ]);
    exit();
}

// Handle HTTP errors
if ($httpCode !== 200) {
    http_response_code($httpCode);
    echo json_encode([
        'success' => false,
        'message' => 'Payment service error',
        'error' => 'HTTP ' . $httpCode . ': ' . $response
    ]);
    exit();
}

// Parse and return the response
$responseData = json_decode($response, true);
if ($responseData === null) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'message' => 'Invalid response from payment service',
        'error' => 'Failed to parse response'
    ]);
    exit();
}

// Return the ZenoPay response
echo json_encode($responseData);
?>