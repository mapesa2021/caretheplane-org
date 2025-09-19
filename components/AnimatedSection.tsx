import { ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

const AnimatedSection = ({ children, delay = 0, className = '' }: AnimatedSectionProps) => {
  return (
    <div
      className={className}
    >
      {children}
    </div>
  );
};

export default AnimatedSection; 