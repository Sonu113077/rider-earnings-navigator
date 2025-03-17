
import React from 'react';
import { Mail } from 'lucide-react';

interface FloatingContactButtonProps {
  email: string;
}

const FloatingContactButton = ({ email }: FloatingContactButtonProps) => {
  return (
    <a
      href={`mailto:${email}`}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-12 h-12 rounded-full bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 transition-all duration-300 hover:scale-110"
      aria-label="Contact us"
      title="Contact us"
    >
      <Mail size={20} />
    </a>
  );
};

export default FloatingContactButton;
