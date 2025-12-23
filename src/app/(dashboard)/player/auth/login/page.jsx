"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import NextImage from "next/image";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/Checkbox";
import Image from "next/image";
import Link from "next/link";

export default function PlayerLoginPage() {
  const theme = useSelector((state) => state.theme);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden border "
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-4 max-w-lg w-full px-6">
        {/* Logo */}
        <div
          className="w-50 h-[152px] px-6   flex items-center justify-center gap-1 mx-auto"
          style={{
            borderColor: `${theme.colors.primaryCyan}1A`,
          }}
        >
          <Image
            src="/player/logo.png"
            alt="NextGen Pros"
            width={200}
            height={200}
            priority
            className="w-40 h-40"
          />
        </div>

        {/* Welcome Text */}
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Welcome Back</h1>
          <p className="text-gray-400">
            Sign in to access your player dashboard
          </p>
        </div>

        {/* Login Form Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl border"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            backdropFilter: "blur(20px)",
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <form className="space-y-6">
            {/* Email */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span>Email Address *</span>
              </div>
              <Input
                type="email"
                placeholder="Email Address"
                className=" h-14 rounded-xl"
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
                placeholder="Password"
                className=" pr-12 h-14 rounded-xl"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-2/3  -translate-y-1/2 text-gray-400 hover:text-white"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-3 cursor-pointer">
                <Checkbox id="remember" />
                <span className="text-gray-300 text-sm">Remember me</span>
              </label>
              <Link
                href="#"
                className="text-sm hover:underline"
                style={{
                  color: theme.colors.primaryCyan,
                }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              variant="outline"
              className="w-full h-14 rounded-md text-lg font-semibold flex items-center justify-center gap-3"
              style={{ backgroundColor: theme.colors.primaryCyan }}
            >
              <LogIn className="w-5 h-5" />
              Sign In
            </Button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-primaryCyan/20" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-4   text-gray-400"
                style={{ backgroundColor: theme.colors.backgroundCard }}
              >
                or continue with
              </span>
            </div>
          </div>

          {/* Social Login */}
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
          Protected by NextGen Pros. See our{" "}
          <Link
            href="#"
            className=" hover:underline"
            style={{ color: theme.colors.primaryCyan }}
          >
            Privacy Policy
          </Link>
        </p>
      </div>
    </div>
  );
}
