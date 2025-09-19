import { NextApiRequest, NextApiResponse } from 'next';
import { paymentService } from '../../../lib/database';
import { ZENOPAY_CONFIG } from '../../../lib/zenopay';

// ZenoPay Webhook Payload Interface
interface ZenoWebhookPayload {
  order_id: string;
  amount: string;
  payment_status: 'COMPLETED' | 'FAILED' | 'PENDING';
  transid: string;
  channel: string;
  reference: string;
  msisdn: string;
  creation_date: string;
  [key: string]: any;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ 
      success: false, 
      message: 'Method not allowed' 
    });
  }

  try {
    console.log('📞 ZenoPay webhook received:', {
      headers: req.headers,
      body: req.body,
      timestamp: new Date().toISOString()
    });

    // Verify webhook authentication
    const receivedApiKey = req.headers['x-api-key'];
    if (receivedApiKey !== ZENOPAY_CONFIG.API_KEY) {
      console.error('❌ Invalid API key in webhook:', receivedApiKey);
      return res.status(401).json({ 
        success: false, 
        message: 'Unauthorized - Invalid API key' 
      });
    }

    const webhookData: ZenoWebhookPayload = req.body;
    
    // Validate required webhook fields
    if (!webhookData.order_id || !webhookData.payment_status) {
      console.error('❌ Missing required webhook fields:', webhookData);
      return res.status(400).json({ 
        success: false, 
        message: 'Missing required fields: order_id and payment_status' 
      });
    }

    const { order_id, payment_status, amount, transid, channel, reference, msisdn, creation_date } = webhookData;

    console.log('💰 Processing payment webhook:', {
      order_id,
      payment_status,
      amount,
      transid,
      channel,
      reference
    });

    // Only process COMPLETED payments (as per ZenoPay docs)
    if (payment_status === 'COMPLETED') {
      try {
        // Find payment record in database
        const existingPayment = await paymentService.getByOrderId(order_id);
        
        if (!existingPayment) {
          console.error('❌ Payment record not found for order:', order_id);
          return res.status(404).json({ 
            success: false, 
            message: 'Payment record not found' 
          });
        }

        // Update payment with callback data
        const callbackData = {
          payment_status,
          amount,
          transid,
          channel,
          reference,
          msisdn,
          creation_date,
          webhook_received_at: new Date().toISOString(),
          raw_webhook_data: webhookData
        };

        await paymentService.updateWithCallback(order_id, callbackData);
        
        // Update payment status to completed
        await paymentService.updateStatus(order_id, 'completed', {
          zeno_transaction_id: transid,
          zeno_reference: reference,
          zeno_channel: channel,
          completed_at: new Date().toISOString()
        });

        console.log('✅ Payment completed successfully:', {
          order_id,
          transid,
          reference,
          amount,
          channel
        });

        return res.status(200).json({ 
          success: true, 
          message: 'Payment completed and recorded successfully',
          order_id
        });
        
      } catch (dbError: any) {
        console.error('❌ Database error processing webhook:', dbError);
        return res.status(500).json({ 
          success: false, 
          message: 'Database error processing payment callback',
          error: dbError.message
        });
      }
    } else {
      // Handle non-completed payments
      console.log('⚠️ Payment not completed:', {
        order_id,
        payment_status,
        message: 'Webhook received but payment not completed'
      });
      
      // Update payment status if it failed
      if (payment_status === 'FAILED') {
        try {
          await paymentService.updateStatus(order_id, 'failed', {
            failure_reason: 'Payment failed as reported by ZenoPay',
            failed_at: new Date().toISOString(),
            webhook_data: webhookData
          });
        } catch (dbError) {
          console.error('❌ Error updating failed payment status:', dbError);
        }
      }
      
      return res.status(200).json({ 
        success: true, 
        message: `Webhook received - payment status: ${payment_status}`,
        order_id
      });
    }
    
  } catch (error: any) {
    console.error('❌ Webhook processing error:', error);
    
    return res.status(500).json({ 
      success: false, 
      message: 'Internal server error processing webhook',
      error: error.message
    });
  }
} 