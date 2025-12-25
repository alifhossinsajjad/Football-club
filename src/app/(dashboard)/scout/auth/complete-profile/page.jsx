"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/player/Progress";
import { CheckCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import ScoutComplete1 from "@/components/scout/complete-profile/ScoutComplete1";
import ScoutComplete2 from "@/components/scout/complete-profile/ScoutComplete2";
import ScoutComplete3 from "@/components/scout/complete-profile/ScoutComplete3";
import ScoutComplete4 from "@/components/scout/complete-profile/ScoutComplete4";

export default function PlayerOnboardingPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({});
  const totalSteps = 4;

  const progress = (step / totalSteps) * 100;

  const updateFormData = (newData) => {
    setFormData((prev) => ({ ...prev, ...newData }));
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else if (totalSteps === step) {
      // Complete registration and redirect to player dashboard
      router.push("/player/dashboard");
    }
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden p-4">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-backgroundDark to-backgroundCard" />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Progress Bar */}
        <div className="mb-8 text-center">
          <p className="text-gray-400 text-sm mb-2">
            Step {step} of {totalSteps}
          </p>
          <Progress value={progress} className="h-2" />
          <p className="text-gray-400 text-sm mt-2">
            {Math.round(progress)}% Complete
          </p>
        </div>

        {/* Main Card */}
        <div
          className="rounded-2xl p-8 shadow-2xl border"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          {/* Step 1: Complete Your Profile */}
          {step === 1 && (
            <ScoutComplete1
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {/* Step 2: Sports Commitment */}
          {step === 2 && (
            <ScoutComplete2
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {/* Step 3: Parent / Guardian Consent */}
          {step === 3 && (
            <ScoutComplete3
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {/* Step 4: Privacy & Consent */}
          {step === 4 && (
            <ScoutComplete4
              formData={formData}
              updateFormData={updateFormData}
            />
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={handleBack}
              className="rounded-sm px-8"
            >
              ← Back
            </Button>

            <Button
              variant="common"
              onClick={handleNext}
              className="rounded-sm px-8"
              disabled={step < totalSteps ? false : formData.privacyConsent}
            >
              {step === totalSteps ? "Complete Registration" : "Continue →"}
            </Button>
          </div>

          <p className="text-center text-yellow-400 text-sm flex justify-center gap-3 items-center mt-6">
            <CheckCircle className="w-4 h-4" /> Please complete all required
            fields to continue
          </p>
        </div>
      </div>
    </div>
  );
}
