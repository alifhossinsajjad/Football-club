'use client';

import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Menu, X, Globe, ChevronDown } from 'lucide-react';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import gsap from 'gsap';

const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'Membership', href: '#' },
    { name: 'Academies', href: '#' },
    { name: 'Clubs', href: '#' },
    { name: 'Players', href: '/player' },
];

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const theme = useSelector(state => state.theme);
    const navRef = useRef(null);

    /* ✅ GSAP Animation */
    useEffect(() => {
        gsap.from(navRef.current, {
            y: -60,
            opacity: 0,
            duration: 0.9,
            ease: 'power3.out',
        });
    }, []);

    return (
        <nav
            ref={navRef}
            className="fixed top-0 left-0 right-0 max-w-6xl mx-auto z-50 bg-transparent backdrop-blur-sm"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.22)' }}
        >
            <div className="container mx-auto px-4">
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
                                className="text-[#73A5AB] hover:text-primary transition-colors font-medium"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className="hidden lg:flex items-center gap-3">
                        <button className="px-6 py-1.5 border border-[#084559] text-white bg-transparent rounded-full font-medium transition w-28 text-center">
                            Log in
                        </button>
                        <button className="px-6 py-1.5 border border-[#084559] text-white bg-transparent rounded-full font-medium transition w-28 text-center">
                            Sign up
                        </button>
                        <button
                            className="px-2 text-primary rounded-md transition w-12 h-8 flex items-center justify-center"
                            style={{
                                backgroundColor: '#04B5A3',
                                backgroundImage: 'none',
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
