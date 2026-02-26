"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useAppSelector } from "@/redux/hooks";
import gsap from "gsap";
import Link from "next/link";

const navLinks = [
  { name: "Home", href: "#" },
  { name: "Membership", href: "#" },
  { name: "Academies", href: "#" },
  { name: "Clubs", href: "#" },
  { name: "Players", href: "/player" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useAppSelector((state) => state.theme);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(navRef.current, {
        y: -60,
        opacity: 0,
        duration: 0.9,
        ease: "power3.out",
      });
    });

    return () => ctx.revert(); // Cleanup for React 18 strict mode
  }, []);

  return (
    <nav ref={navRef} className="fixed top-8 left-0 right-0 w-full z-50 ">
      <div className="container mx-auto px-4 lg:px-6 relative  bg-white/10 backdrop-blur-md rounded-xl">
        <div className="flex items-center justify-between h-20 lg:h-24">
          {/* Logo - Left */}
          <div className="flex items-center">
            <Image
              src="/images/logo.png"
              alt="NextGen Pros Logo"
              width={150}
              height={40}
              className="w-[120px] lg:w-[150px] h-auto opacity-90 hover:opacity-100 transition-opacity"
              priority
            />
          </div>

          {/* Desktop Nav Links - Center */}
          <div className="hidden lg:flex absolute left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#B0B0B0] hover:text-white transition-colors font-medium text-[15px] whitespace-nowrap"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Desktop Right Section - Log in, Sign up, Language */}
          <div className="hidden lg:flex items-center gap-3">
            <Link href="/login">
            <Button variant="nav" size="default" className="px-6">
              Log in
            </Button>
            </Link>
            <Link href="/register">
              <Button variant="navFilled" size="default" className="px-6">
                Sign up
              </Button>
            </Link>
            <button className="flex items-center gap-1 px-3 py-2 rounded-md bg-[#00E5FF]/90 hover:bg-[#00cce6] transition-colors">
              <Globe className="w-4 h-4 text-black" />
              <span className="text-black font-medium text-sm">EN</span>
              <ChevronDown className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white/80 hover:text-white transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/10 bg-[#050B14]/95 backdrop-blur-md">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white/80 hover:text-[#00E5FF] text-base font-medium py-2 transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <div className="flex flex-col gap-3 pt-4">
                <Button variant="nav" size="default" className="w-full">
                  Log in
                </Button>
                <Button variant="navFilled" size="default" className="w-full">
                  Sign up
                </Button>
                <button className="flex items-center justify-center gap-2 w-full px-4 py-3 rounded-md bg-[#00E5FF]/90 hover:bg-[#00cce6] transition-colors">
                  <Globe className="w-4 h-4 text-black" />
                  <span className="text-black font-medium">English</span>
                  <ChevronDown className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
