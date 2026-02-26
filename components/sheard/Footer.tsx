"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Youtube,
  InstagramIcon,
} from "lucide-react";
import Logo from "../reuseable/Logo";

const Footer = () => {
  return (
    <footer className="bg-[#07142b] text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo Section */}
          <div>
            <div className="mb-4">
              <Logo/>
            </div>

            <p className="text-sm mb-6">
              Connecting the next generation of football talent with
              opportunities worldwide.
            </p>

            <div className="flex gap-4">
              <InstagramIcon className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition" />
              <Twitter className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition" />
              <Youtube className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition" />
              <Facebook className="w-5 h-5 cursor-pointer hover:text-cyan-400 transition" />
            </div>
          </div>

          {/* other sections remain same */}
          {/* Platforms */}
          <div>
            <h3 className="text-white font-semibold mb-4">Platforms</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="/" className="hover:text-cyan-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/membership"
                  className="hover:text-cyan-400 transition"
                >
                  Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources Links</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-cyan-400 transition">
                  Player Directory
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition">
                  Agents & Scouts Directory
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link href="#" className="hover:text-cyan-400 transition">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-cyan-400 transition">
                  Community
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© 2025 NextGen Pros. All rights reserved.</p>

          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="#" className="hover:text-cyan-400 transition">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-cyan-400 transition">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
