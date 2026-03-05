"use client";

import { Check } from "lucide-react";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export default function Stepper({ steps, currentStep }: StepperProps) {
  return (
    <div className="relative flex justify-between items-start mb-12 px-2 md:px-10">
      {/* Background line */}
      <div className="absolute top-5 left-0 w-full h-[1px] bg-white/10 -z-0 hidden md:block" />

      {/* Progress line */}
      <div
        className="absolute top-5 left-0 h-[1px] bg-[#00E5FF] transition-all duration-500 -z-0 hidden md:block"
        style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
      />

      {steps.map((label, index) => {
        const isCompleted = index < currentStep;
        const isActive = index === currentStep;

        return (
          <div key={label} className="flex flex-col items-center relative z-10 flex-1">
            {/* Step Circle */}
            <div
              className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 border-2
                ${
                  isCompleted || isActive
                    ? "bg-[#00E5FF] border-[#00E5FF] text-black shadow-[0_0_15px_rgba(0,229,255,0.4)]"
                    : "bg-[#0A0F1D] border-white/10 text-white/40"
                }`}
            >
              {isCompleted ? <Check className="w-5 h-5 stroke-[3px]" /> : index + 1}
            </div>

            {/* Label */}
            <span
              className={`mt-3 text-[13px] font-medium whitespace-nowrap transition-colors duration-300
                ${isCompleted || isActive ? "text-white" : "text-white/40"}`}
            >
              {label}
            </span>
          </div>
        );
      })}
    </div>
  );
}