"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, Globe, ChevronDown } from "lucide-react";
import Image from "next/image";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { useRouter } from "next/navigation";

const navLinks = [
  { name: "Home", href: "#" },
  // { name: "Membership", href: "#" },
  { name: "Academies", href: "/scout/dashboard" },
  { name: "Clubs", href: "/club/dashboard" },
  { name: "Players", href: "/player/dashboard" },
];

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useSelector((state) => state.theme);
  const navRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -60,
      opacity: 0,
      duration: 0.9,
      ease: "power3.out",
    });
  }, []);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 max-w-[80vw] mx-auto z-50 bg-transparent backdrop-blur-lg"
    >
      <div
        className="max-w-[90vw] rounded-md mx-auto px-4  text-[#06A295]"
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.09), rgba(255,255,255,0.0001))",
          borderColor: "rgba(255,255,255,0.200)",
        }}
      >
        <div className="relative mt-12 ">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div
              className="flex items-center justify-center px-3 sm:px-4 md:px-5 lg:px-6 py-1.5 sm:py-2 md:py-2.5 w-full max-w-[200px] h-auto"
              style={{
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <Image
                src="/logo.png"
                alt={theme.platformName}
                width={100}
                height={18}
                className="w-[80px] sm:w-[100px] md:w-[120px] lg:w-[140px] h-auto"
                priority
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-white hover:text-primary transition-colors font-medium"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Buttons */}
            <div className="hidden lg:flex items-center gap-3">
              <Button
                onClick={() => router.push("/auth/login")}
                className="px-6 py-1.5 border border-purple-600 text-white bg-transparent rounded-full font-medium  text-sm transition w-28 text-center hover:bg-purple-500 hover:scale-105"
              >
                Log in
              </Button>
              <Button
                onClick={() => router.push("/auth/register-option")}
                className="px-6 py-1.5 border border-purple-600 text-white bg-transparent rounded-full font-medium transition w-28 text-center hover:bg-purple-500 hover:scale-105"
              >
                Sign up
              </Button>
              <button
                className="px-2 text-primary rounded-md transition w-12 h-8 flex items-center justify-center"
                style={{
                  backgroundColor: "#04B5A3",
                  backgroundImage: "none",
                }}
              >
                <Globe className="w-5 h-5 mr-1 text-black" />
                <ChevronDown className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Mobile Button */}
            <button
              className="lg:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
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
                <Button
                  onClick={() => router.push("/auth/login-option")}
                  variant="nav"
                  size="sm"
                  className="flex-1"
                >
                  Log in
                </Button>
                <Button
                  onClick={() => router.push("/auth/register-option")}
                  variant="navFilled"
                  size="sm"
                  className="flex-1"
                >
                  Sign up
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
