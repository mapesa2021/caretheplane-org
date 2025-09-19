import { NextApiRequest, NextApiResponse } from 'next';
import { ZenoPayService, normalizePhoneForZenoPay, isValidTanzaniaPhone, generateReference } from '../../../lib/zenopay';
import { paymentService } from '../../../lib/database';

interface PaymentRequest {
  amount: number;
  currency: string;
  buyerEmail: string;
  buyerName: string;
  buyerPhone: string;
  orderId: string;
}

interface PaymentResponse {
  success: boolean;
  orderId?: string;
  message: string;
  data?: any;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<PaymentResponse>) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { amount, currency, buyerEmail, buyerName, buyerPhone, orderId }: PaymentRequest = req.body;

    // Validate required fields
    if (!amount || !buyerEmail || !buyerName || !buyerPhone || !orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        error: 'All fields (amount, buyerEmail, buyerName, buyerPhone, orderId) are required'
      });
    }

    // Validate amount
    if (amount <= 0 || amount > 10000000) { // Max 10M TZS
      return res.status(400).json({
        success: false,
        message: 'Invalid amount',
        error: 'Amount must be between 1 and 10,000,000 TZS'
      });
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(buyerEmail)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid email format',
        error: 'Please provide a valid email address'
      });
    }

    // Validate and normalize phone number for ZenoPay
    if (!isValidTanzaniaPhone(buyerPhone)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid phone number',
        error: 'Please provide a valid Tanzanian phone number (format: 07XXXXXXXX or +255XXXXXXXXX)'
      });
    }

    const normalizedPhone = normalizePhoneForZenoPay(buyerPhone);
    
    // Check for test phone number
    const isTestPhone = normalizedPhone === '0754546567';
    
    console.log('🚀 Payment initiation request:', {
      orderId,
      amount,
      currency,
      buyerEmail,
      buyerName,
      originalPhone: buyerPhone,
      normalizedPhone,
      isTestPhone,
      timestamp: new Date().toISOString()
    });

    // Test phone simulation
    if (isTestPhone) {
      console.log('🧪 Test payment detected - simulating success');
      
      // Simulate delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const testResponse: PaymentResponse = {
        success: true,
        orderId,
        message: 'Test payment initiated successfully',
        data: {
          status: 'success',
          resultcode: '000',
          message: 'Test payment - Request in progress. You will receive a callback shortly',
          order_id: orderId,
          isTestPayment: true
        }
      };
      
      console.log('✅ Test payment response:', testResponse);
      return res.status(200).json(testResponse);
    }

    // Initialize ZenoPay service
    const zenoPayService = new ZenoPayService();
    
    // Prepare ZenoPay request
    const zenoRequest = {
      order_id: orderId,
      buyer_email: buyerEmail,
      buyer_name: buyerName,
      buyer_phone: normalizedPhone,
      amount: amount,
      // webhook_url: `${req.headers.origin || 'https://yourdomain.com'}/api/payment/callback` // Optional webhook
    };

    console.log('💳 Calling ZenoPay API with:', zenoRequest);

    // Call ZenoPay API
    const zenoResponse = await zenoPayService.initiatePayment(zenoRequest);
    
    if (zenoResponse.success) {
      console.log('✅ Payment initiated successfully:', {
        orderId,
        amount,
        currency,
        buyerEmail,
        timestamp: new Date().toISOString()
      });

      return res.status(200).json({
        success: true,
        orderId: zenoResponse.orderId,
        message: zenoResponse.message,
        data: zenoResponse.data
      });
    } else {
      console.log('❌ Payment initiation failed:', zenoResponse);
      
      return res.status(400).json({
        success: false,
        message: zenoResponse.message,
        error: zenoResponse.error,
        data: zenoResponse.data
      });
    }

  } catch (error: any) {
    console.error('❌ Payment initiation error:', error);

    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message || 'An unexpected error occurred'
    });
  }
} 