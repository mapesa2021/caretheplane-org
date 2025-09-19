'use client';
import { useState, useEffect } from 'react';
import { getButtonsBySection, Button } from '../utils/adminData';

interface ProjectButtonProps {
  projectId: string;
  className?: string;
}

export default function ProjectButton({ projectId, className = '' }: ProjectButtonProps) {
  const [buttons, setButtons] = useState<Button[]>([]);

  useEffect(() => {
    const loadButtons = () => {
      const projectButtons = getButtonsBySection('projects');
      // Filter buttons based on project ID (assuming project-specific buttons)
      const filteredButtons = projectButtons.filter(button => 
        button.id.includes(projectId) || button.url.includes(projectId)
      );
      setButtons(filteredButtons);
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
  }, [projectId]);

  if (buttons.length === 0) {
    // Fallback to default "Learn More" button
    return (
      <button 
        className={`text-eco-green font-semibold hover:text-eco-dark transition-colors duration-200 ${className}`}
        onClick={() => {
          // Default behavior - could be customized
          console.log(`Learn more about ${projectId}`);
        }}
      >
        Learn More →
      </button>
    );
  }

  return (
    <>
      {buttons.map((button) => (
        <button
          key={button.id}
          className={`text-eco-green font-semibold hover:text-eco-dark transition-colors duration-200 ${className}`}
          onClick={() => {
            if (button.url.startsWith('http')) {
              window.open(button.url, '_blank');
            } else if (button.url.startsWith('#')) {
              const element = document.querySelector(button.url);
              if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
              }
            } else {
              window.location.href = button.url;
            }
          }}
        >
          {button.text}
        </button>
      ))}
    </>
  );
} 