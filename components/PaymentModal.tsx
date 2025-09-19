'use client';
import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { generateReference, formatAmount } from '../lib/zenopay';

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
  title: string;
  description: string;
}

export default function PaymentModal({ 
  isOpen, 
  onClose, 
  amount, 
  title, 
  description 
}: PaymentModalProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    customerName: '',
    customerEmail: '',
    customerPhone: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setPaymentStatus('processing');
    setErrorMessage('');

    try {
      const orderId = generateReference();
      
      // Directly initiate payment with ZenoPay (no database dependency)
      const paymentRequest = {
        orderId,
        amount,
        currency: 'TZS',
        buyerEmail: formData.customerEmail,
        buyerName: formData.customerName,
        buyerPhone: formData.customerPhone
      };

      console.log('🚀 Initiating payment:', paymentRequest);

      const paymentResponse = await fetch('/api/payment/initiate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(paymentRequest),
      });

      console.log('📞 Payment response status:', paymentResponse.status);
      
      if (!paymentResponse.ok) {
        const errorText = await paymentResponse.text();
        console.error('❌ Payment response error:', errorText);
        throw new Error(`Payment API error (${paymentResponse.status}): ${errorText}`);
      }

      const result = await paymentResponse.json();

      console.log('💳 Payment API response:', result);

      if (result.success) {
        setPaymentStatus('success');
        
        // Check if this is a test phone number for immediate redirect
        if (formData.customerPhone === '0754546567') {
          // For test payments, redirect after 3 seconds (matching backend simulation)
          setTimeout(() => {
            window.location.href = `/payment/success?orderId=${orderId}&amount=${amount}&name=${encodeURIComponent(formData.customerName)}&email=${encodeURIComponent(formData.customerEmail)}&phone=${encodeURIComponent(formData.customerPhone)}`;
          }, 3000);
        } else {
          // For real payments, redirect immediately (ZenoPay will handle the flow)
          window.location.href = `/payment/success?orderId=${orderId}&amount=${amount}&name=${encodeURIComponent(formData.customerName)}&email=${encodeURIComponent(formData.customerEmail)}&phone=${encodeURIComponent(formData.customerPhone)}`;
        }
      } else {
        console.error('❌ Payment initiation failed:', result);
        throw new Error(result.message || result.error || 'Payment initiation failed');
      }
    } catch (error) {
      console.error('❌ Payment error:', error);
      setPaymentStatus('error');
      
      let errorMessage = 'An unexpected error occurred';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'string') {
        errorMessage = error;
      }
      
      // Provide more specific error messages
      if (errorMessage.includes('Failed to fetch') || errorMessage.includes('network')) {
        errorMessage = 'Network error: Please check your internet connection and try again';
      } else if (errorMessage.includes('create payment record')) {
        errorMessage = 'Database connection issue: Please try again or contact support';
      }
      
      setErrorMessage(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      {/* Modal Content */}
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
          </div>
        </div>

        {/* Content based on payment status */}
        {paymentStatus === 'idle' && (
          <>
            {/* Payment Info */}
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-2">{title}</h3>
              <p className="text-gray-600 text-sm mb-3">{description}</p>
              <div className="text-2xl font-bold text-eco-green">
                {formatAmount(amount)} TZS
              </div>
            </div>

            {/* Test Mode Indicator */}
            {(formData.customerPhone === '0754546567' || 
              formData.customerPhone === '+255754546567' || 
              formData.customerPhone === '255754546567') && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mx-6 mt-4">
                <div className="flex items-center">
                  <span className="text-yellow-800 text-sm font-medium">🧪 Test Mode Active</span>
                  <span className="ml-2 text-yellow-600 text-xs">
                    Using test phone number - payment will be simulated
                  </span>
                </div>
              </div>
            )}

            {/* Payment Form */}
            <form onSubmit={handleSubmit} className="px-6 py-4 space-y-4">
              <div>
                <label htmlFor="customerName" className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="customerName"
                  name="customerName"
                  required
                  value={formData.customerName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="customerEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="customerEmail"
                  name="customerEmail"
                  required
                  value={formData.customerEmail}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                  placeholder="Enter your email address"
                />
              </div>

              <div>
                <label htmlFor="customerPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="customerPhone"
                  name="customerPhone"
                  required
                  value={formData.customerPhone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-eco-green focus:border-transparent"
                  placeholder="07XXXXXXXX or +2557XXXXXXXX"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Accepts: 07XXXXXXXX, 06XXXXXXXX, +2557XXXXXXXX, 2557XXXXXXXX
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-3 px-4 rounded-md font-medium transition-colors duration-200 ${
                  isSubmitting
                    ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                    : 'bg-eco-green text-white hover:bg-eco-dark'
                }`}
              >
                {isSubmitting ? 'Processing...' : `Donate ${formatAmount(amount)} TZS`}
              </button>
            </form>
          </>
        )}

        {/* Processing State */}
        {paymentStatus === 'processing' && (
          <div className="px-6 py-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Processing Payment</h3>
            <p className="text-gray-600">
              {(formData.customerPhone === '0754546567' || 
                formData.customerPhone === '+255754546567' || 
                formData.customerPhone === '255754546567')
                ? '🧪 Simulating test payment... Please wait 3 seconds.'
                : 'Initiating payment with ZenoPay...'
              }
            </p>
          </div>
        )}

        {/* Success State */}
        {paymentStatus === 'success' && (
          <div className="px-6 py-8 text-center">
            <div className="text-5xl mb-4">🎉</div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Payment Initiated!</h3>
            <p className="text-gray-600">
              {formData.customerPhone === '0754546567' 
                ? 'Test payment simulation started. Redirecting to success page...'
                : 'Redirecting to ZenoPay payment page...'
              }
            </p>
          </div>
        )}

        {/* Error State */}
        {paymentStatus === 'error' && (
          <div className="px-6 py-8 text-center">
            <div className="text-5xl mb-4">❌</div>
            <h3 className="text-lg font-semibold text-red-900 mb-2">Payment Failed</h3>
            <p className="text-gray-600 mb-4">{errorMessage}</p>
            <button
              onClick={() => setPaymentStatus('idle')}
              className="px-4 py-2 bg-eco-green text-white rounded-md hover:bg-eco-dark transition-colors duration-200"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
} 