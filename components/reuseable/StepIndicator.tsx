"use client";

import React from "react";

interface Props {
  step: number;
}

const StepIndicator = ({ step }: Props) => {
  const totalSteps = 4;
  const percentage = (step / totalSteps) * 100;
  
  const steps = [
    { num: 1, label: "Basic" },
    { num: 2, label: "Player" },
    { num: 3, label: "Parent" },
    { num: 4, label: "Privacy" },
  ];

  return (
    <div className="mb-8">
      {/* Percentage Display */}
      <div className="flex justify-between items-end mb-3">
        <div className="text-sm font-medium text-gray-300">Registration Progress</div>
        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 animate-pulse">
          {percentage}%
        </div>
      </div>

      {/* Progress Bar Container */}
      <div className="relative h-3 bg-[#1a2332] rounded-full overflow-hidden mb-4">
        {/* Animated Progress Bar */}
        <div 
          className="absolute top-0 left-0 h-full rounded-full transition-all duration-700 ease-out"
          style={{ width: `${percentage}%` }}
        >
          {/* Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600" />
          
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-[8px] opacity-70" />
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>

      {/* Step Labels */}
      <div className="flex justify-between">
        {steps.map((item) => (
          <div
            key={item.num}
            className={`flex flex-col items-center transition-all duration-300 ${
              step >= item.num ? "scale-110" : "scale-100"
            }`}
          >
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                step > item.num
                  ? "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg shadow-green-500/50"
                  : step === item.num
                  ? "bg-gradient-to-r from-cyan-400 to-blue-500 text-white shadow-lg shadow-cyan-500/50 scale-110 animate-pulse"
                  : "bg-[#1a2332] text-gray-500 border border-gray-700"
              }`}
            >
              {step > item.num ? (
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              ) : (
                item.num
              )}
            </div>
            <span
              className={`text-xs mt-1 transition-all duration-300 ${
                step >= item.num ? "text-cyan-400 font-medium" : "text-gray-500"
              }`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StepIndicator;
