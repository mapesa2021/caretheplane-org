'use client';
import { useState } from 'react';
import { addNewsletterSubscriber } from '../utils/adminData';

export default function NewsletterForm() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      setMessage('Please enter a valid email address');
      return;
    }

    setStatus('loading');
    setMessage('');

    try {
      const success = addNewsletterSubscriber(email, 'homepage');
      
      if (success) {
        setStatus('success');
        setMessage('Thank you for subscribing! You\'ll receive updates soon.');
        setEmail('');
      } else {
        setStatus('error');
        setMessage('This email is already subscribed to our newsletter.');
      }
    } catch (error) {
      setStatus('error');
      setMessage('Something went wrong. Please try again.');
    }

    // Clear success/error message after 5 seconds
    setTimeout(() => {
      setStatus('idle');
      setMessage('');
    }, 5000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <input
          type="email"
          placeholder="Enter your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50"
          required
          disabled={status === 'loading'}
        />
      </div>
      
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full bg-white text-[#1abc9c] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe to Newsletter'}
      </button>

      {message && (
        <div className={`text-sm p-3 rounded-lg ${
          status === 'success' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {message}
        </div>
      )}
    </form>
  );
} 