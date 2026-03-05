"use client";

type StepperProps = {
  steps: string[];
  currentStep: number;
};

export default function Stepper({
  steps,
  currentStep,
}: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-8">
      {steps.map((label, index) => {
        const isActive = index <= currentStep;

        return (
          <div key={label} className="flex-1 text-center relative">
            {/* Circle */}
            <div
              className={`h-8 w-8 mx-auto rounded-full flex items-center justify-center text-sm font-bold transition
                ${
                  isActive
                    ? "bg-teal-400 text-black"
                    : "bg-[#1C2B40] text-gray-400"
                }`}
            >
              {index + 1}
            </div>

            {/* Label */}
            <p className="text-xs mt-2 text-gray-400">
              {label}
            </p>

            {/* Line */}
            {index !== steps.length - 1 && (
              <div className="absolute top-4 left-1/2 w-full h-[2px] bg-[#1C2B40] -z-10" />
            )}
          </div>
        );
      })}
    </div>
  );
}