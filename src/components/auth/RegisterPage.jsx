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
import { useRouter } from "next/navigation";

export default function RegisterPageComponent({
  role,
  logo,
  welcomeTitle = "Start Your Journey",
  welcomeSubtitle = "Create your NextGen Pros account",
  onSubmit,
}) {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    nationality: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.dob ||
      !formData.nationality ||
      !formData.phone ||
      !formData.email ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setError("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // For now, using mock registration
      // In a real app, you would call your registration API here
      console.log(`Registration attempt for ${role} with data:`, formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Redirect to complete profile based on role
      if (role === "Player") {
        router.push("/player/auth/complete-profile");
      } else if (role === "Scout") {
        router.push("/scout/auth/complete-profile");
      } else {
        router.push("/admin/auth/complete-profile");
      }
    } catch (err) {
      setError(err.message || "An error occurred during registration");
    } finally {
      setLoading(false);
    }
  };

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
            src={logo}
            alt={`${role} Logo`}
            width={200}
            height={200}
            priority
            className="w-40 h-40 mx-auto"
          />
        </div>

        {/* Title */}
        <div>
          <h1 className="text-2xl font-bold text-white mb-2">{welcomeTitle}</h1>
          <p className="text-gray-400">{welcomeSubtitle}</p>
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
          <form className="space-y-6" onSubmit={handleSubmit}>
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
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
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
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div className="relative">
              <div className="flex pb-2 items-center gap-2 text-sm">
                {/* <Calendar className="w-4 h-4 text-gray-400" /> */}
                <span>Date of Birth *</span>
              </div>
              <div className="relative">
                <Input
                  type="date"
                  className="h-14 rounded-xl appearance-none  pr-12"
                  value={formData.dob}
                  onChange={(e) =>
                    setFormData({ ...formData, dob: e.target.value })
                  }
                />

                <Calendar
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer"
                  style={{ color: theme.colors.primaryCyan }}
                  onClick={() =>
                    document.querySelector('input[type="date"]').showPicker()
                  }
                />
              </div>
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
                value={formData.nationality}
                onChange={(e) =>
                  setFormData({ ...formData, nationality: e.target.value })
                }
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
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
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
                placeholder="example@domain.com"
                className="h-14 rounded-xl"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
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
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
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
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
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
              variant="common"
              type="submit"
              disabled={loading}
              className="w-full h-14 rounded-md text-lg font-semibold flex items-center justify-center gap-3"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Creating Account...
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  Create Account
                </>
              )}
            </Button>

            {error && (
              <div className="text-red-500 text-sm text-center mt-2">
                {error}
              </div>
            )}
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
              variant="common"
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
        <p className="text-gray-500 text-sm max-w-sm md:max-w-md mx-auto">
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
