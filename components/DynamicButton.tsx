'use client';
import { useState, useEffect } from 'react';
import AnimatedButton from './AnimatedButton';
import { getButtonsBySection, Button } from '../utils/adminData';
import PaymentModal from './PaymentModal';

interface DynamicButtonProps {
  section: string;
  className?: string;
}

export default function DynamicButton({ section, className = '' }: DynamicButtonProps) {
  const [buttons, setButtons] = useState<Button[]>([]);
  const [paymentModal, setPaymentModal] = useState<{
    isOpen: boolean;
    amount: number;
    title: string;
    description: string;
  }>({
    isOpen: false,
    amount: 0,
    title: '',
    description: ''
  });

  useEffect(() => {
    const loadButtons = () => {
      const sectionButtons = getButtonsBySection(section);
      setButtons(sectionButtons);
    };

    loadButtons();

    // Listen for storage changes to update buttons in real-time
    const handleStorageChange = () => {
      loadButtons();
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorageChange', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorageChange', handleStorageChange);
    };
  }, [section]);

  if (buttons.length === 0) {
    return null;
  }

  return (
    <div className={`flex flex-col sm:flex-row gap-4 ${className}`}>
      {buttons.map((button) => (
        <AnimatedButton
          key={button.id}
          variant={button.variant}
          className="text-lg px-8 py-4"
          onClick={() => {
            // Check if this is a donation button
            if (button.text.toLowerCase().includes('donate') || button.text.toLowerCase().includes('give')) {
                       // Extract amount from button text or use default
         const amountMatch = button.text.match(/\d+/);
         const amount = amountMatch ? parseInt(amountMatch[0]) : 1000; // Default 1000 TZS
              
              setPaymentModal({
                isOpen: true,
                amount: amount,
                title: button.text,
                description: `Donation to CareThePlanet - ${button.text}`
              });
            } else if (button.url.startsWith('http')) {
              window.open(button.url, '_blank');
            } else if (button.url.startsWith('#')) {
              // Handle anchor links
              const element = document.querySelector(button.url);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            } else {
              // Handle internal navigation
              window.location.href = button.url;
            }
          }}
        >
          {button.text}
        </AnimatedButton>
      ))}
      
      {/* Payment Modal */}
      <PaymentModal
        isOpen={paymentModal.isOpen}
        onClose={() => setPaymentModal(prev => ({ ...prev, isOpen: false }))}
        amount={paymentModal.amount}
        title={paymentModal.title}
        description={paymentModal.description}
      />
    </div>
  );
} 