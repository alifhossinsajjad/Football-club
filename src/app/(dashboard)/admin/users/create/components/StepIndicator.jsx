"use client";

import { useSelector } from "react-redux";
import { Check } from "lucide-react";

export default function StepIndicator({ currentStep, steps }) {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="rounded-lg border p-6 mb-8"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex items-center justify-between mb-6">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = currentStep > stepNumber;
          const isActive = currentStep === stepNumber;

          return (
            <div key={stepNumber} className="flex items-center flex-1">
              <div className="flex flex-col items-center flex-1">
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-2 transition-all"
                  style={{
                    background:
                      isCompleted || isActive
                        ? `linear-gradient(180deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`
                        : theme.colors.backgroundDark,
                    border:
                      !isCompleted && !isActive
                        ? `1px solid ${theme.colors.primaryCyan}33`
                        : "none",
                  }}
                >
                  {isCompleted ? (
                    <Check className="w-6 h-6 text-white" />
                  ) : (
                    <span
                      className="text-lg font-bold"
                      style={{ color: isActive ? "#FFFFFF" : "#6B7280" }}
                    >
                      {stepNumber}
                    </span>
                  )}
                </div>
                <div>
                  <p
                    className="text-xs font-medium text-center"
                    style={{
                      color: isActive || isCompleted ? "#FFFFFF" : "#6B7280",
                    }}
                  >
                    Step {stepNumber}
                  </p>
                  <p
                    className="text-xs text-center"
                    style={{ color: "#6B7280" }}
                  >
                    {step}
                  </p>
                </div>
              </div>
              {index < steps.length - 1 && (
                <div
                  className="flex-1 h-1 mx-4"
                  style={{
                    background: isCompleted
                      ? theme.colors.primaryCyan
                      : theme.colors.backgroundDark,
                  }}
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}