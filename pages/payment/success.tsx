'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';

export default function PaymentSuccess() {
  const router = useRouter();
  const [paymentDetails, setPaymentDetails] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Get payment details from URL parameters
    const { orderId, amount, name, email, phone } = router.query;
    
    if (orderId) {
      setPaymentDetails({
        orderId: orderId,
        amount: amount,
        name: name,
        email: email,
        phone: phone
      });
    }
    
    setIsLoading(false);
  }, [router.query]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-eco-green mx-auto mb-4"></div>
          <p className="text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Payment Successful - CareThePlanet</title>
        <meta name="description" content="Thank you for your donation to CareThePlanet" />
      </Head>

      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="mb-8">
            <div className="text-6xl mb-4">🎉</div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Thank You for Your Donation!
            </h1>
            <p className="text-lg text-gray-600">
              Your generous contribution will help us make a difference in environmental conservation.
            </p>
          </div>

          {/* Payment Details */}
          {paymentDetails ? (
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Payment Details</h2>
              <div className="space-y-3 text-left">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID:</span>
                  <span className="font-mono text-gray-900">{paymentDetails.orderId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Amount:</span>
                  <span className="font-semibold text-eco-green">
                    {new Intl.NumberFormat('en-TZ', {
                      style: 'currency',
                      currency: 'TZS'
                    }).format(parseFloat(paymentDetails.amount || '0'))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Donor Name:</span>
                  <span className="font-semibold text-gray-900">{paymentDetails.name || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-semibold text-gray-900">{paymentDetails.email || 'N/A'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Phone:</span>
                  <span className="font-semibold text-gray-900">{paymentDetails.phone || 'N/A'}</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-8">
              <h2 className="text-xl font-semibold text-yellow-900 mb-4">Payment Completed</h2>
              <p className="text-yellow-800">
                Your payment has been processed successfully! If you have any questions about your donation, 
                please contact our support team.
              </p>
            </div>
          )}

          {/* Test Payment Notice */}
          {paymentDetails && paymentDetails.phone === '0754546567' && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8">
              <div className="flex items-center justify-center">
                <span className="text-yellow-800 text-sm font-medium">🧪 Test Payment Completed</span>
                <span className="ml-2 text-yellow-600 text-xs">
                  This was a simulated payment for testing purposes
                </span>
              </div>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">What Happens Next?</h3>
            <div className="text-left space-y-2 text-blue-800">
              <p>• You&apos;ll receive a confirmation email shortly</p>
              <p>• Our team will process your donation</p>
              <p>• We&apos;ll keep you updated on how your contribution is being used</p>
              <p>• Thank you for supporting environmental conservation!</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-eco-green hover:bg-eco-dark transition-colors duration-200"
            >
              Return to Homepage
            </Link>
            <Link
              href="/projects"
              className="inline-flex items-center px-6 py-3 border border-eco-green text-base font-medium rounded-md text-eco-green bg-white hover:bg-eco-pale transition-colors duration-200"
            >
              View Our Projects
            </Link>
          </div>
        </div>
      </div>
    </>
  );
} 