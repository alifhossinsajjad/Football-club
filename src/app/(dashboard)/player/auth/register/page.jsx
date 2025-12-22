"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/Checkbox";
import NextImage from "next/image";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Calendar,
  Globe,
  Phone,
  User,
  LogIn,
} from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import Image from "next/image";

export default function PlayerRegisterPage() {
  const theme = useSelector((state) => state.theme);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden py-12"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-4 max-w-2xl w-full px-6">
        {/* Logo */}
        <div className="">
          <Image
            src="/player/logo.png"
            alt="NextGen Pros"
            width={200}
            height={200}
            priority
            className="w-40 h-40 mx-auto"
          />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">
            Start Your Journey
          </h1>
          <p className="text-gray-400">
            Create your NextGen Pros player profile
          </p>
        </div>

        {/* Register Form Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl border"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            backdropFilter: "blur(20px)",
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <form className="space-y-6">
            {/* Name Row */}
            <div className="grid grid-cols-2 gap-6">
              <div className="relative">
                <div className="flex pb-2 items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>First Name *</span>
                </div>
                <Input
                  type="text"
                  placeholder="John"
                  className="h-14 rounded-xl"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
              <div className="relative">
                <div className="flex pb-2 items-center gap-2 text-sm">
                  <User className="w-4 h-4 text-gray-400" />
                  <span>Last Name *</span>
                </div>
                <Input
                  type="text"
                  placeholder="Doe"
                  className="h-14 rounded-xl"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span>Date of Birth *</span>
              </div>
              <Input
                type="text"
                placeholder="dd/mm/yyyy"
                className="h-14 rounded-xl"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            {/* Nationality */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Globe className="w-4 h-4 text-gray-400" />
                <span>Nationality *</span>
              </div>
              <Input
                type="text"
                placeholder="Select Nationality"
                className="h-14 rounded-xl"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            {/* Phone Number */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Phone className="w-4 h-4 text-gray-400" />
                <span>Phone Number *</span>
              </div>
              <Input
                type="tel"
                placeholder="+44 XXX XXX XXX"
                className="h-14 rounded-xl"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            {/* Email */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>Email Address *</span>
              </div>
              <Input
                type="email"
                placeholder="player@example.com"
                className="h-14 rounded-xl"
                defaultValue="player@example.com"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-gray-400" />
                <span>Password *</span>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-12 h-14 rounded-xl"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                 className="absolute right-4 top-12  text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              <p className="text-xs text-gray-400 mt-2">
                At least 8 characters with uppercase, lowercase and numbers
              </p>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-gray-400" />
                <span>Confirm Password *</span>
              </div>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                placeholder="••••••••"
                className="pr-12 h-14 rounded-xl"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-2/3 -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Create Account Button */}
            <Button
              variant="outline"
              className="w-full h-14 rounded-md text-lg font-semibold flex items-center justify-center gap-3"
              style={{ backgroundColor: theme.colors.primaryCyan }}
            >
              <LogIn className="w-5 h-5" />
              Create Account
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primaryCyan/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-4 text-gray-400"
                style={{ backgroundColor: theme.colors.backgroundCard }}
              >
                or continue with
              </span>
            </div>
          </div>

          {/* Social Signup */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12 rounded-xl flex items-center justify-center gap-3"
              style={{
                borderColor: `${theme.colors.primaryCyan}33`,
                backgroundColor: theme.colors.backgroundDark,
              }}
            >
              <NextImage
                src="/icons/google.png"
                alt="Google"
                width={24}
                height={24}
              />
              <span className="text-white">Google</span>
            </Button>
            <Button
              variant="outline"
              className="h-12 rounded-xl flex items-center justify-center gap-3"
              style={{
                borderColor: `${theme.colors.primaryCyan}33`,
                backgroundColor: theme.colors.backgroundDark,
              }}
            >
              <NextImage
                src="/icons/facebook.png"
                alt="Facebook"
                width={24}
                height={24}
              />
              <span className="text-white">Facebook</span>
            </Button>
          </div>
        </div>

        {/* Footer */}
        <p className="text-gray-500 text-sm">
          By creating an account, you agree to our{" "}
          <Link
            href="#"
            className="hover:underline"
            style={{ color: theme.colors.primaryCyan }}
          >
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link
            href="#"
            className="hover:underline"
            style={{ color: theme.colors.primaryCyan }}
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
