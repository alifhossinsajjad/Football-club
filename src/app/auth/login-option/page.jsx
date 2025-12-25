"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";
import { User, Shield, Trophy } from "lucide-react";

const userTypes = [
  {
    type: "player",
    title: "I'm a Player",
    description: "Create a profile to showcase your talent and get discovered",
    icon: Trophy,
    gradient: "from-cyan-500 to-blue-600",
  },
  {
    type: "scout",
    title: "I'm a Scout / Agent",
    description: "Discover and connect with promising young talents",
    icon: Shield,
    gradient: "from-purple-500 to-pink-600",
  },
  {
    type: "club",
    title: "I'm a Club / Academy",
    description: "Find and recruit the next generation of football stars",
    icon: User,
    gradient: "from-green-500 to-teal-600",
  },
];

export default function LoginOption() {
  const router = useRouter();
  const theme = useSelector((state) => state.theme);

  const handleSelect = (type) => {
    // You can store the selected user type in Redux, localStorage, or context if needed
    // For now, we'll just redirect to the appropriate login/signup flow
    if (type === "player") {
      router.push("/player/auth/login");
    } else if (type === "scout") {
      router.push("/scout/auth/login");
    } else if (type === "club") {
      router.push("/club/auth/login");
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
        {/* Logo & Title */}
        <div className="text-center mb-12">
          <h1
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            style={{ color: theme.colors.primaryCyan }}
          >
            {theme.platformName || "NextGen Pros"}
          </h1>
          <p className="text-xl text-gray-300">
            Choose how you'd like to join the platform
          </p>
        </div>

        {/* User Type Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {userTypes.map((option) => (
            <button
              key={option.type}
              onClick={() => handleSelect(option.type)}
              className="group relative overflow-hidden rounded-2xl p-8 text-left transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                border: `1px solid ${theme.colors.primaryCyan}33`,
              }}
            >
              {/* Gradient Overlay on Hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity"
                style={{
                  background: `linear-gradient(to bottom right, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                }}
              />

              <div className="relative z-10">
                {/* Icon with Gradient Background */}
                <div
                  className="w-20 h-20 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg"
                  style={{
                    background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
                    backgroundImage: `linear-gradient(135deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                  }}
                >
                  <option.icon className="w-10 h-10 text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white text-center mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-400 text-center leading-relaxed">
                  {option.description}
                </p>

                {/* CTA Arrow */}
                <div className="mt-8 text-center">
                  <span
                    className="inline-block text-lg font-medium group-hover:translate-x-2 transition-transform"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    Continue →
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Footer Note */}
        <p className="text-center text-gray-500 mt-12 text-sm">
          Already have an account?{" "}
          <button
            onClick={() => router.push("/auth/login")}
            className="underline hover:text-white transition"
            style={{ color: theme.colors.primaryCyan }}
          >
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}
