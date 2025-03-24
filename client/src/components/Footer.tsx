import React from 'react';
import Logo from './Logo';

const links = [
  {
    title: 'Features',
    href: '#',
  },
  {
    title: 'Solution',
    href: '#',
  },
  {
    title: 'Customers',
    href: '#',
  },
  {
    title: 'Help',
    href: '#',
  },
  {
    title: 'About',
    href: '#',
  },
  {
    title: 'Privacy Policy',
    href: '/privacy-policy',
  },
  {
    title: 'Terms of Service',
    href: '#',
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-neutral-200 py-4">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-3">
        <div className="flex items-center">
          <Logo size="footer" variant="default" className="mr-2" />
          <p className="text-xs text-neutral-500">
            © {new Date().getFullYear()} CSD. All rights reserved.
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <a href="/privacy-policy" className="text-xs text-neutral-500 hover:text-primary transition-colors">
            Privacy Policy
          </a>
          <a href="/terms" className="text-xs text-neutral-500 hover:text-primary transition-colors">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}; 