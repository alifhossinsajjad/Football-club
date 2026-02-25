"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import { GiTrophy } from "react-icons/gi";
import { IoFootballOutline } from "react-icons/io5";
import { SiHtmlacademy, SiMagento } from "react-icons/si";
import { useSelector } from "react-redux";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const RegisterPage = () => {
  const theme = useSelector((state) => state.theme);
  const { platformName, colors } = theme;

  // Refs for animations
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const footerRef = useRef(null);

  useEffect(() => {
    // Header animation
    gsap.fromTo(
      headerRef.current,
      {
        opacity: 0,
        y: -50,
      },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power3.out",
      },
    );

    // Cards animation with stagger
    gsap.fromTo(
      cardsRef.current,
      {
        opacity: 0,
        y: 100,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "back.out(1.2)",
        scrollTrigger: {
          trigger: cardsRef.current[0],
          start: "top 80%",
          toggleActions: "play none none reverse",
        },
      },
    );

    // Footer animation
    gsap.fromTo(
      footerRef.current,
      {
        opacity: 0,
        y: 30,
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 1,
        ease: "power2.out",
      },
    );

    // Hover animations for cards
    cardsRef.current.forEach((card, index) => {
      if (!card) return;

      const icon = card.querySelector(".icon-wrapper");
      const button = card.querySelector(".get-started-btn");

      card.addEventListener("mouseenter", () => {
        gsap.to(card, {
          scale: 1.05,
          y: -10,
          boxShadow: `0 20px 40px ${colors.primaryCyan}40`,
          borderColor:
            index === 0
              ? colors.primaryCyan
              : index === 1
                ? colors.primaryMagenta
                : colors.neonAccent,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(icon, {
          scale: 1.1,
          rotate: 5,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(button, {
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });
      });

      card.addEventListener("mouseleave", () => {
        gsap.to(card, {
          scale: 1,
          y: 0,
          boxShadow: "none",
          borderColor: "#374151",
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(icon, {
          scale: 1,
          rotate: 0,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(button, {
          scale: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });
      });
    });

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, [colors]);

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundColor: colors.backgroundDark,
      }}
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20 animate-pulse"
          style={{
            background: `radial-gradient(circle, ${colors.primaryCyan} 0%, transparent 70%)`,
            top: "-10%",
            right: "-10%",
            animation: "float 20s infinite",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-20"
          style={{
            background: `radial-gradient(circle, ${colors.primaryMagenta} 0%, transparent 70%)`,
            bottom: "-10%",
            left: "-10%",
            animation: "float 15s infinite reverse",
          }}
        />
        <div
          className="absolute w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{
            background: `radial-gradient(circle, ${colors.neonAccent} 0%, transparent 70%)`,
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            animation: "pulse 10s infinite",
          }}
        />
      </div>

      {/* Header */}
      <div ref={headerRef} className="text-center pt-16 pb-12 relative z-10">
        <h1
          className="text-6xl font-bold mb-3 tracking-tight"
          style={{
            color: colors.neonAccent,
            textShadow: `0 0 30px ${colors.neonAccent}80`,
          }}
        >
          {platformName}
        </h1>
        <h2 className="text-3xl text-gray-300 mb-2 font-light">Join as a...</h2>
        <p className="text-gray-400 text-lg">
          Select your role to start your registration
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
        {/* Player Card */}
        <div
          ref={(el) => (cardsRef.current[0] = el)}
          className="rounded-3xl p-6 flex flex-col items-center text-center border transition-all duration-500 hover:scale-105 backdrop-blur-sm group h-full"
          style={{
            backgroundColor: `${colors.backgroundCard}`,
            borderColor: `${colors.primaryCyan}30`,
          }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 relative"
            style={{
              background: `${colors.primaryCyan}20`,
            }}
          >
            <IoFootballOutline
              className="w-12 h-12"
              style={{ color: colors.primaryCyan }}
            />
          </div>

          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: colors.primaryCyan }}
          >
            I'm a Player
          </h3>

          <p className="text-gray-400 mb-6 text-base leading-relaxed flex-grow">
            Create a profile to showcase your talents and get discovered by
            clubs & scouts
          </p>

          <Link
            href="/register/playerRegister"
            className="w-full py-3 px-4 rounded-xl font-semibold text-center text-base transition-all duration-300 hover:opacity-90"
            style={{
              color: "white",
            }}
          >
            Get Started →
          </Link>
        </div>

        {/* Scout/Agent Card */}
        <div
          ref={(el) => (cardsRef.current[1] = el)}
          className="rounded-3xl p-6 flex flex-col items-center text-center border transition-all duration-500 hover:scale-105 backdrop-blur-sm group h-full"
          style={{
            backgroundColor: `${colors.backgroundCard}`,
            borderColor: `${colors.primaryMagenta}30`,
          }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 relative"
            style={{
              background: `${colors.primaryMagenta}20`,
            }}
          >
            <SiMagento
              className="w-12 h-12"
              style={{ color: colors.primaryMagenta }}
            />
          </div>

          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: colors.primaryMagenta }}
          >
            I'm a Scout
          </h3>

          <p className="text-gray-400 mb-6 text-base leading-relaxed flex-grow">
            Discover promising young talents and build professional connections
          </p>

          <Link
            href="/register/scoutRegister"
            className="w-full py-3 px-4 rounded-xl font-semibold text-center text-base transition-all duration-300 hover:opacity-90"
            style={{
              color: "white",
            }}
          >
            Get Started →
          </Link>
        </div>

        {/* Club/Academy Card */}
        <div
          ref={(el) => (cardsRef.current[2] = el)}
          className="rounded-3xl p-6 flex flex-col items-center text-center border transition-all duration-500 hover:scale-105 backdrop-blur-sm group h-full"
          style={{
            backgroundColor: `${colors.backgroundCard}`,
            borderColor: `${colors.neonAccent}30`,
          }}
        >
          <div
            className="w-24 h-24 rounded-full flex items-center justify-center mb-4 relative"
            style={{
              background: `${colors.neonAccent}20`,
            }}
          >
            <SiHtmlacademy
              className="w-12 h-12"
              style={{ color: colors.neonAccent }}
            />
          </div>

          <h3
            className="text-2xl font-bold mb-3"
            style={{ color: colors.neonAccent }}
          >
            I'm a Club
          </h3>

          <p className="text-gray-400 mb-6 text-base leading-relaxed flex-grow">
            Find and recruit the next generation of football stars
          </p>

          <Link
            href="/register/academyRegister"
            className="w-full py-3 px-4 rounded-xl font-semibold text-center text-base transition-all duration-300 hover:opacity-90 "
            style={{
              color: "white",
            }}
          >
            Get Started →
          </Link>
        </div>
      </div>

      {/* Sign In Link */}
      <div ref={footerRef} className="text-center mt-12 pb-16 relative z-10">
        <p className="text-gray-400 text-lg">
          Already have an account?{" "}
          <Link
            href="/login"
            style={{ color: colors.primaryCyan }}
            className="font-semibold hover:underline hover:underline-offset-4 transition-all duration-300"
          >
            Sign in here
          </Link>
        </p>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translate(0, 0);
          }
          25% {
            transform: translate(-20px, 20px);
          }
          50% {
            transform: translate(20px, -20px);
          }
          75% {
            transform: translate(20px, 20px);
          }
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.1;
            transform: translate(-50%, -50%) scale(1);
          }
          50% {
            opacity: 0.2;
            transform: translate(-50%, -50%) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;
