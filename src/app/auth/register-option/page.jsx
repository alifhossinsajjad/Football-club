"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { User, Shield, Trophy } from "lucide-react";

const userTypes = [
  {
    type: "player",
    title: "I'm a Player",
    description:
      "Create a profile to showcase your talent and get discovered by clubs & scouts",
    icon: Trophy,
  },
  {
    type: "scout",
    title: "I'm a Scout / Agent",
    description:
      "Discover promising young talents and build professional connections",
    icon: Shield,
  },
  {
    type: "club",
    title: "I'm a Club / Academy",
    description: "Find and recruit the next generation of football stars",
    icon: User,
  },
];

export default function RegisterOption() {
  const router = useRouter();
  const theme = useSelector((state) => state.theme);

  const handleSelect = (type) => {
    // Redirect to role-specific registration flow
    if (type === "player") {
      router.push("/player/auth/register");
    } else if (type === "scout") {
      router.push("/scout/auth/register");
    } else if (type === "club") {
      router.push("/club/auth/register");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-6"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      <div className="max-w-4xl w-full">
        {/* Header */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ color: theme.colors.primaryCyan }}
          >
            {theme.platformName || "NextGen Pros"}
          </h1>
          <p className="text-2xl text-gray-300 font-medium">Join as a...</p>
          <p className="text-lg text-gray-400 mt-3">
            Select your role to start your registration
          </p>
        </div>

        {/* User Type Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((option) => (
            <button
              key={option.type}
              onClick={() => handleSelect(option.type)}
              className="group relative overflow-hidden rounded-2xl p-10 text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                border: `1px solid ${theme.colors.primaryCyan}33`,
              }}
            >
              {/* Hover Gradient Overlay */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                style={{
                  background: `linear-gradient(135deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                }}
              />

              <div className="relative z-10">
                {/* Role Icon */}
                <div
                  className="w-24 h-24 rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-2xl"
                  style={{
                    backgroundImage: `linear-gradient(135deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                  }}
                >
                  <option.icon className="w-12 h-12 text-white" />
                </div>

                {/* Title & Description */}
                <h3 className="text-2xl font-bold text-white mb-4">
                  {option.title}
                </h3>
                <p className="text-gray-400 leading-relaxed px-4">
                  {option.description}
                </p>

                {/* Continue Arrow */}
                <div className="mt-10">
                  <span
                    className="inline-flex items-center text-lg font-semibold group-hover:translate-x-3 transition-transform duration-300"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    Get Started <span className="ml-2">→</span>
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Link */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            Already have an account?{" "}
            <button
              onClick={() => router.push("/auth/login")}
              className="font-medium underline hover:text-white transition"
              style={{ color: theme.colors.primaryCyan }}
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
