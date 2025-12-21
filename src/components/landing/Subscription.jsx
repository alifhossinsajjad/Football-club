"use client";

import { Check, Crown } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function Subscription() {
  const theme = useSelector((state) => state.theme);

  const features = [
    "ExclusWe scout network access",
    "Refined direct messaging system",
    "Exclusive scout & agent network access",
    "Newsletter with prerid-jrn training content and priority event",
    "Full access to all events with direct contact options",
    "Enabled player profile creation with info & videos to get noticed by clubs",
  ];

  return (
    <div className="flex items-center justify-center px-4 py-10 sm:py-14">
      <div
        className=" px-4 sm:px-6 md:px-10 py-4 sm:py-6 md:py-10 rounded-md"
        style={{
          background:
            "linear-gradient(163deg, rgba(0, 229, 255, 0.10) 1.74%, rgba(156, 39, 176, 0.10) 82.99%)",
          backgroundColor: theme.colors.backgroundCard,
        }}
      >
        <div className="mx-auto w-full max-w-sm sm:max-w-md backdrop-blur-sm rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-700/50 bg-[#171D36]">
          {/* Icon */}
          <div className="flex justify-center mb-4 sm:mb-6">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center shadow-lg"
              style={{
                background: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
              }}
            >
              <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
          </div>

          {/* Title */}
          <h1
            className="text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold mb-3 sm:mb-4 text-center"
            style={{
              backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            GO PRO
          </h1>

          {/* Subtitle */}
          <p className="text-center text-slate-300 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 leading-relaxed">
            Unlock premium features and accelerate your football career with
            NextGen Pro membership.
          </p>

          {/* Features */}
          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full border border-cyan/50 flex items-center justify-center mt-1">
                  <Check className="w-3 h-3 text-landing-number" />
                </div>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {feature}
                </p>
              </div>
            ))}
          </div>

          {/* Pricing */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-2">
            <h2 className="text-3xl sm:text-4xl font-bold text-white">
              $9.99/year
            </h2>
            <button
              className="px-5 sm:px-6 py-2 text-sm sm:text-base font-semibold rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{
                background: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
              }}
            >
              Save 50%
            </button>
          </div>

          {/* Original Price */}
          <p className="text-center text-slate-400 text-xs sm:text-sm mb-5 sm:mb-6">
            (introductory offer usually €19.99/year)
          </p>

          {/* CTA */}
          <div className="flex flex-col items-center gap-2">
            <button
              className="w-28 sm:w-32 py-2 text-sm sm:text-base font-semibold text-white rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
              style={{ backgroundColor: theme.colors.primaryCyan }}
            >
              Sign Up
            </button>

            <p className="text-center text-cyan-400 text-xs sm:text-sm hover:text-cyan-300 cursor-pointer transition-colors">
              Have a promo code?
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
