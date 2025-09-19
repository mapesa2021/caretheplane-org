import { NextApiRequest, NextApiResponse } from 'next';
import { ZenoPayService } from '../../../lib/zenopay';
import { paymentService } from '../../../lib/database';

interface PaymentStatusRequest {
  orderId: string;
}

interface PaymentStatusResponse {
  success: boolean;
  orderId?: string;
  status?: string;
  message: string;
  data?: any;
  error?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<PaymentStatusResponse>) {
  if (req.method !== 'GET') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    const { orderId } = req.query as { orderId: string };

    if (!orderId) {
      return res.status(400).json({
        success: false,
        message: 'Missing order ID',
        error: 'Order ID is required as query parameter'
      });
    }

    console.log('🔍 Checking payment status for order:', orderId);

    try {
      // First, check our database for payment record
      const localPayment = await paymentService.getByOrderId(orderId);
      
      if (!localPayment) {
        return res.status(404).json({
          success: false,
          message: 'Payment not found',
          error: 'No payment record found for this order ID'
        });
      }

      // If payment is already completed or failed in our database, return that status
      if (localPayment.status === 'completed' || localPayment.status === 'failed') {
        console.log('✅ Payment status from database:', localPayment.status);
        
        return res.status(200).json({
          success: true,
          orderId,
          status: localPayment.status,
          message: `Payment ${localPayment.status}`,
          data: {
            orderId: localPayment.order_id,
            amount: localPayment.amount,
            currency: localPayment.currency,
            status: localPayment.status,
            createdAt: localPayment.created_at,
            updatedAt: localPayment.updated_at,
            callbackData: localPayment.callback_data,
            zenoPayResponse: localPayment.zeno_pay_response
          }
        });
      }

      // If payment is pending, check with ZenoPay for updated status
      console.log('📞 Checking with ZenoPay for order status:', orderId);
      
      const zenoPayService = new ZenoPayService();
      const zenoStatus = await zenoPayService.checkOrderStatus(orderId);
      
      if (zenoStatus.success && zenoStatus.data) {
        const zenoData = zenoStatus.data;
        
        // Update our database if ZenoPay shows the payment is completed
        if (zenoData.status === 'COMPLETED' && localPayment.status === 'pending') {
          console.log('✅ Payment completed - updating database');
          
          await paymentService.updateStatus(orderId, 'completed', {
            zeno_transaction_id: zenoData.transactionId,
            zeno_reference: zenoData.reference,
            zeno_channel: zenoData.channel,
            status_check_completed_at: new Date().toISOString()
          });
          
          return res.status(200).json({
            success: true,
            orderId,
            status: 'completed',
            message: 'Payment completed',
            data: {
              orderId,
              amount: zenoData.amount,
              status: 'completed',
              transactionId: zenoData.transactionId,
              reference: zenoData.reference,
              channel: zenoData.channel,
              createdAt: zenoData.createdAt
            }
          });
        } else {
          // Return current status from ZenoPay
          return res.status(200).json({
            success: true,
            orderId,
            status: zenoData.status?.toLowerCase() || 'pending',
            message: zenoStatus.message,
            data: zenoData
          });
        }
      } else {
        // ZenoPay status check failed, return database status
        console.log('⚠️ ZenoPay status check failed, returning database status');
        
        return res.status(200).json({
          success: true,
          orderId,
          status: localPayment.status,
          message: 'Payment status from database (ZenoPay check failed)',
          data: {
            orderId: localPayment.order_id,
            amount: localPayment.amount,
            status: localPayment.status,
            zenoError: zenoStatus.error
          }
        });
      }
      
    } catch (dbError: any) {
      console.error('❌ Database error checking payment status:', dbError);
      
      return res.status(500).json({
        success: false,
        message: 'Database error',
        error: 'Unable to check payment status in database'
      });
    }

  } catch (error: any) {
    console.error('❌ Payment status check error:', error);
    
    return res.status(500).json({
      success: false,
      message: 'Internal server error',
      error: error.message || 'An unexpected error occurred'
    });
  }
} 