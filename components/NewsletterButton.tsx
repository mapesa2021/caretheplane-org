'use client';
import { useState, useEffect } from 'react';
import { getButtonsBySection, Button } from '../utils/adminData';

interface NewsletterButtonProps {
  className?: string;
}

export default function NewsletterButton({ className = '' }: NewsletterButtonProps) {
  const [buttons, setButtons] = useState<Button[]>([]);

  useEffect(() => {
    const loadButtons = () => {
      const newsletterButtons = getButtonsBySection('newsletter');
      setButtons(newsletterButtons);
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
  }, []);

  if (buttons.length === 0) {
    // Fallback to default newsletter button
    return (
      <button
        type="submit"
        className={`w-full bg-white text-[#1abc9c] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${className}`}
      >
        Subscribe to Newsletter
      </button>
    );
  }

  return (
    <>
      {buttons.map((button) => (
        <button
          key={button.id}
          type="submit"
          className={`w-full bg-white text-[#1abc9c] font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors duration-200 ${className}`}
          onClick={() => {
            if (button.url && button.url !== '#') {
              if (button.url.startsWith('http')) {
                window.open(button.url, '_blank');
              } else {
                window.location.href = button.url;
              }
            }
          }}
        >
          {button.text}
        </button>
      ))}
    </>
  );
} 