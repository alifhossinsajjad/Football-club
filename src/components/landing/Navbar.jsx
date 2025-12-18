'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe } from 'lucide-react';

const navLinks = [
  { name: 'Home', href: '#' },
  { name: 'Membership', href: '#' },
  { name: 'Academies', href: '#' },
  { name: 'Clubs', href: '#' },
  { name: 'Players', href: '/player' },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 max-w-6xl mx-auto z-50 bg-transparent backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">

          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="font-display text-sm font-bold tracking-wider">
              <span className="text-foreground">NEXTGEN</span>
              <br />
              <span className="text-primary">PROS</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-muted-foreground hover:text-primary transition-colors text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop Buttons */}
          <div className="hidden lg:flex items-center gap-3">
            <Button variant="nav" size="sm">Log in</Button>
            <Button variant="navFilled" size="sm">Sign up</Button>
            <Button variant="ghost" size="icon" className="text-primary">
              <Globe className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile Button */}
          <button
            className="lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary text-sm font-medium"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex gap-3 pt-4">
                <Button variant="nav" size="sm" className="flex-1">Log in</Button>
                <Button variant="navFilled" size="sm" className="flex-1">Sign up</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
