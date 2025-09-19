import axios from 'axios';

// ZenoPay Configuration - Based on Official Documentation
export const ZENOPAY_CONFIG = {
  API_KEY: process.env.ZENOPAY_API_KEY || 'ArtYqYpjmi8UjbWqxhCe7SLqpSCbws-_7vjudTuGR91PT6pmWX85lapiuq7xpXsJ2BkPZ9gkxDEDotPgtjdV6g',
  BASE_URL: 'https://zenoapi.com',
  ENDPOINTS: {
    MOBILE_MONEY: '/api/payments/mobile_money_tanzania',
    ORDER_STATUS: '/api/payments/order-status'
  }
};

// ZenoPay Payment Request - Exact API Format
export interface ZenoPaymentRequest {
  order_id: string;
  buyer_email: string;
  buyer_name: string;
  buyer_phone: string;
  amount: number;
  webhook_url?: string;
}

// ZenoPay Success Response
export interface ZenoPaymentResponse {
  status: string;
  resultcode: string;
  message: string;
  order_id: string;
}

// ZenoPay Error Response
export interface ZenoErrorResponse {
  status: string;
  message: string;
}

// Order Status Response
export interface ZenoOrderStatusResponse {
  reference: string;
  resultcode: string;
  result: string;
  message: string;
  data: Array<{
    order_id: string;
    creation_date: string;
    amount: string;
    payment_status: string;
    transid: string;
    channel: string;
    reference: string;
    msisdn: string;
  }>;
}

// Internal Payment Response
export interface PaymentResponse {
  success: boolean;
  orderId?: string;
  message: string;
  data?: any;
  error?: string;
}

// ZenoPay Service - Based on Official Documentation
export class ZenoPayService {
  private apiKey: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = ZENOPAY_CONFIG.API_KEY;
    this.baseUrl = ZENOPAY_CONFIG.BASE_URL;
  }

  // Initiate Mobile Money Payment - Exact API Implementation
  async initiatePayment(paymentData: ZenoPaymentRequest): Promise<PaymentResponse> {
    try {
      console.log('🚀 Initiating ZenoPay payment:', {
        order_id: paymentData.order_id,
        amount: paymentData.amount,
        buyer_phone: paymentData.buyer_phone
      });

      const response = await axios.post(
        `${this.baseUrl}${ZENOPAY_CONFIG.ENDPOINTS.MOBILE_MONEY}`,
        paymentData,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': this.apiKey,
          },
          timeout: 30000
        }
      );

      console.log('✅ ZenoPay API Response:', response.data);

      // Check for success response format
      if (response.data.status === 'success' && response.data.resultcode === '000') {
        return {
          success: true,
          orderId: response.data.order_id,
          message: response.data.message || 'Payment initiated successfully',
          data: response.data
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Payment initiation failed',
          error: `Status: ${response.data.status}, Code: ${response.data.resultcode || 'unknown'}`,
          data: response.data
        };
      }
    } catch (error: any) {
      console.error('❌ ZenoPay payment error:', error);
      
      if (error.response) {
        return {
          success: false,
          message: 'ZenoPay API error',
          error: error.response.data?.message || 'API request failed',
          data: error.response.data
        };
      } else if (error.request) {
        return {
          success: false,
          message: 'Network error',
          error: 'Unable to connect to ZenoPay servers'
        };
      } else {
        return {
          success: false,
          message: 'Payment initiation failed',
          error: error.message || 'Unknown error'
        };
      }
    }
  }

  // Check Order Status - Official API Implementation
  async checkOrderStatus(orderId: string): Promise<PaymentResponse> {
    try {
      console.log('🔍 Checking order status for:', orderId);

      const response = await axios.get(
        `${this.baseUrl}${ZENOPAY_CONFIG.ENDPOINTS.ORDER_STATUS}?order_id=${orderId}`,
        {
          headers: {
            'x-api-key': this.apiKey,
          },
          timeout: 15000
        }
      );

      console.log('📊 Order status response:', response.data);

      if (response.data.result === 'SUCCESS' && response.data.data?.length > 0) {
        const orderData = response.data.data[0];
        return {
          success: true,
          orderId: orderData.order_id,
          message: `Payment status: ${orderData.payment_status}`,
          data: {
            status: orderData.payment_status,
            amount: orderData.amount,
            transactionId: orderData.transid,
            channel: orderData.channel,
            reference: orderData.reference,
            createdAt: orderData.creation_date
          }
        };
      } else {
        return {
          success: false,
          message: response.data.message || 'Order not found',
          error: 'Unable to fetch order status'
        };
      }
    } catch (error: any) {
      console.error('❌ Order status check error:', error);
      return {
        success: false,
        message: 'Failed to check order status',
        error: error.message || 'Unknown error'
      };
    }
  }
}

// Create singleton instance
export const zenoPayService = new ZenoPayService();

// Utility function to format amount
export const formatAmount = (amount: number, currency: string = 'TZS'): string => {
  return new Intl.NumberFormat('en-TZ', {
    style: 'currency',
    currency: currency,
  }).format(amount);
};

// Generate unique reference - UUID format like ZenoPay examples
export const generateReference = (): string => {
  const timestamp = Date.now().toString(36);
  const randomPart = Math.random().toString(36).substring(2, 15);
  return `${timestamp}-${randomPart}-${Math.random().toString(36).substring(2, 8)}`;
};

// Tanzania Phone Number Utilities - ZenoPay Format
export const TANZANIA_PHONE_REGEX = /^(\+?255|0)?[67]\d{8}$/;

export const isValidTanzaniaPhone = (phone: string): boolean => {
  return TANZANIA_PHONE_REGEX.test(phone);
};

// Normalize phone to ZenoPay format (07XXXXXXXX)
export const normalizePhoneForZenoPay = (phone: string): string => {
  let normalized = phone.replace(/\s+/g, ''); // Remove spaces
  
  // Remove + if present
  if (normalized.startsWith('+')) {
    normalized = normalized.substring(1);
  }
  
  // Convert 255 prefix to 0 prefix (ZenoPay format)
  if (normalized.startsWith('255')) {
    normalized = '0' + normalized.substring(3);
  }
  
  // Ensure it starts with 0 for ZenoPay
  if (!normalized.startsWith('0')) {
    normalized = '0' + normalized;
  }
  
  return normalized;
};

export const formatTanzaniaPhoneForDisplay = (phone: string): string => {
  const cleaned = phone.replace(/\s+/g, '');
  
  if (cleaned.startsWith('0') && cleaned.length === 10) {
    return `+255 ${cleaned.substring(1, 2)} ${cleaned.substring(2, 5)} ${cleaned.substring(5, 8)} ${cleaned.substring(8)}`;
  }
  
  if (cleaned.startsWith('255') && cleaned.length === 12) {
    return `+255 ${cleaned.substring(3, 4)} ${cleaned.substring(4, 7)} ${cleaned.substring(7, 10)} ${cleaned.substring(10)}`;
  }
  
  return phone; // Return original if can't format
}; 