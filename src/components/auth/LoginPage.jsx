"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/Checkbox";
import Image from "next/image";
import Link from "next/link";

export default function LoginPageComponent({
  role, // "Player", "Scout", "Club", "Admin"
  logo,
  welcomeTitle = "Welcome Back",
  welcomeSubtitle = "Sign in to access your dashboard",
}) {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Fully mock credentials - no API, no delays
  const mockCredentials = {
    Player: {
      email: "player@example.com",
      password: "player123",

      dashboard: "/player/dashboard",
    },
    Scout: {
      email: "scout@example.com",
      password: "scout456",
      dashboard: "/scout/dashboard",
    },
    Club: {
      email: "club@example.com",
      password: "club789",
      dashboard: "/club/dashboard",
    },
    Admin: {
      email: "admin@example.com",
      password: "admin101",
      dashboard: "/admin/dashboard",
    },
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const normalizedEmail = email.trim().toLowerCase();
    const normalizedPassword = password.trim();

    // 🔍 Check all roles one by one
    for (const key in mockCredentials) {
      const creds = mockCredentials[key];

      if (
        normalizedEmail === creds.email.toLowerCase() &&
        normalizedPassword === creds.password
      ) {
        router.push(creds.dashboard);
        return; // ✅ stop immediately when matched
      }
    }

    //  If no match found after checking all
    setError("Invalid credentials. Use the test credentials shown below.");
    setLoading(false);
  };

  // Social login also uses mock data - instantly logs in as the current role
  const handleSocialLogin = (provider) => {
    setLoading(true);
    setError("");

    const roleCredentials = mockCredentials[role];
    if (roleCredentials) {
      router.push(roleCredentials.dashboard);
    } else {
      router.push("/player/dashboard"); // fallback
    }

    setLoading(false);
  };

  const currentMock = mockCredentials[role] || { email: "", password: "" };

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      {/* Main Content */}
      <div className="relative z-10 text-center space-y-4 max-w-lg w-full px-6">
        {/* Logo */}
        <div className="h-[152px] flex items-center justify-center mx-auto">
          <Image
            src={logo}
            alt={`${role} Logo`}
            width={200}
            height={200}
            priority
            className="w-40 h-40 object-contain"
          />
        </div>

        {/* Welcome Text */}
        <div className="pb-4">
          <h1 className="text-2xl font-bold text-white mb-2">{welcomeTitle}</h1>
          <p className="text-gray-400">{welcomeSubtitle}</p>
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
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Email */}
            <div>
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-white">Email Address *</span>
              </div>
              <Input
                type="email"
                placeholder="Enter email"
                className="h-14 rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                <Lock className="w-4 h-4 text-gray-400" />
                <span className="text-white">Password *</span>
              </div>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="pr-12 h-14 rounded-xl"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-12 text-gray-400 hover:text-white"
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
                style={{ color: theme.colors.primaryCyan }}
              >
                Forgot Password?
              </Link>
            </div>

            {/* Sign In Button */}
            <Button
              variant="common"
              className="w-full h-14 rounded-md text-lg font-semibold flex items-center justify-center gap-3"
              type="submit"
              disabled={loading}
              style={{ backgroundColor: theme.colors.button }}
            >
              {loading ? (
                <>Signing In...</>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Sign In
                </>
              )}
            </Button>

            {error && (
              <div className="text-red-400 text-sm text-center mt-4 p-3 bg-red-900/20 rounded-lg">
                {error}
              </div>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full border-t"
                style={{ borderColor: `${theme.colors.primaryCyan}33` }}
              />
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

          {/* Social Login (Mock - Instant Login) */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="outline"
              className="h-12 rounded-xl flex items-center justify-center gap-3"
              style={{
                borderColor: `${theme.colors.primaryCyan}33`,
                backgroundColor: theme.colors.backgroundDark,
              }}
              onClick={() => handleSocialLogin("google")}
              disabled={loading}
            >
              <Image
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
              onClick={() => handleSocialLogin("facebook")}
              disabled={loading}
            >
              <Image
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
        <p className="text-gray-500 text-sm mt-8">
          Protected by NextGen Pros. See our{" "}
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
