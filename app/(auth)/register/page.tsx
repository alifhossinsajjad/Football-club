"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { IoFootballOutline } from "react-icons/io5";
import { SiHtmlacademy } from "react-icons/si";
import { FaUserTie } from "react-icons/fa";

import gsap from "gsap";
import { useAppSelector } from "@/redux/hooks";

const RegisterPage = () => {
  const theme = useAppSelector((state) => state.theme);
  const { platformName, colors } = theme;

  const headerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!headerRef.current) return;

    // Animate header
    gsap.fromTo(
      headerRef.current,
      { opacity: 0, y: -40 },
      { opacity: 1, y: 0, duration: 0.8 }
    );

    // Animate all cards using class selector
    gsap.fromTo(
      ".role-card",
      { opacity: 0, y: 60 },
      { opacity: 1, y: 0, duration: 0.8, stagger: 0.2 }
    );
  }, []);

  const cardStyle = {
    backgroundColor: `${colors.backgroundCard}dd`,
    border: `1px solid ${colors.primaryCyan}40`,
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-4"
      style={{ backgroundColor: colors.backgroundCard }}
    >
      {/* Header */}
      <div ref={headerRef} className="text-center mb-14">
        <h1
          className="text-5xl font-bold"
          style={{ color: colors.primaryCyan }}
        >
          Join {platformName}
        </h1>
        <p className="mt-3 text-gray-400">
          Select your role to continue registration
        </p>
      </div>

      {/* Role Cards */}
      <div className="grid md:grid-cols-3 gap-8 w-full max-w-6xl">
        {/* Player */}
        <div
          className="role-card rounded-2xl p-8 text-center transition hover:scale-105"
          style={cardStyle}
        >
          <IoFootballOutline
            size={60}
            className="mx-auto mb-4"
            color={colors.primaryCyan}
          />
          <h2 className="text-xl font-semibold mb-3 text-white">Player</h2>
          <p className="text-gray-400 mb-6">
            Create your football profile and get discovered.
          </p>
          <Link
            href="/register/playerRegister"
            className="px-6 py-2 rounded-full text-black font-medium"
            style={{ backgroundColor: colors.primaryCyan }}
          >
            Register as Player
          </Link>
        </div>

        {/* Scout */}
        <div
          className="role-card rounded-2xl p-8 text-center transition hover:scale-105"
          style={cardStyle}
        >
          <FaUserTie
            size={60}
            className="mx-auto mb-4"
            color={colors.primaryCyan}
          />
          <h2 className="text-xl font-semibold mb-3 text-white">
            Scout / Agent
          </h2>
          <p className="text-gray-400 mb-6">
            Discover and connect with talented players.
          </p>
          <Link
            href="/register/scoutRegister"
            className="px-6 py-2 rounded-full text-black font-medium"
            style={{ backgroundColor: colors.primaryCyan }}
          >
            Register as Scout
          </Link>
        </div>

        {/* Club */}
        <div
          className="role-card rounded-2xl p-8 text-center transition hover:scale-105"
          style={cardStyle}
        >
          <SiHtmlacademy
            size={60}
            className="mx-auto mb-4"
            color={colors.primaryCyan}
          />
          <h2 className="text-xl font-semibold mb-3 text-white">
            Club / Academy
          </h2>
          <p className="text-gray-400 mb-6">
            Manage players and build your academy network.
          </p>
          <Link
            href="/register/clubRegister"
            className="px-6 py-2 rounded-full text-black font-medium"
            style={{ backgroundColor: colors.primaryCyan }}
          >
            Register as Club
          </Link>
        </div>
      </div>

      {/* Login Redirect */}
      <div className="mt-12 text-gray-400">
        Already have an account?{" "}
        <Link
          href="/login"
          className="underline"
          style={{ color: colors.primaryCyan }}
        >
          Login here
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;