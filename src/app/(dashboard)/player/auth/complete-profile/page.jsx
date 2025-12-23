"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  User,
  Hash,
  Ruler,
  Weight,
  MapPin,
  Globe,
  Calendar,
  Trophy,
  Lock,
} from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { Progress } from "@/components/ui/player/Progress";

export default function PlayerOnboardingPage() {
  const theme = useSelector((state) => state.theme);
  const [step, setStep] = useState(1);
  const totalSteps = 4;

  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) setStep(step + 1);
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
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta mx-auto flex items-center justify-center mb-6">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Complete Your Profile
                </h2>
                <p className="text-gray-400">
                  Tell us about your football profile
                </p>
              </div>

              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Hash className="w-4 h-4" />
                      Player Position *
                    </label>
                    <Input placeholder="Preferred Position" className="h-12" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Ruler className="w-4 h-4" />
                      Height (cm) *
                    </label>
                    <Input placeholder="Height" className="h-12" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <Weight className="w-4 h-4" />
                      Weight (kg) *
                    </label>
                    <Input placeholder="Weight" className="h-12" />
                  </div>
                  <div>
                    <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                      <MapPin className="w-4 h-4" />
                      City *
                    </label>
                    <Input placeholder="City" className="h-12" />
                  </div>
                </div>

                <div>
                  <label className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                    <Globe className="w-4 h-4" />
                    Country *
                  </label>
                  <Input placeholder="Country" className="h-12" />
                </div>
              </div>
            </>
          )}

          {/* Step 2: Sports Commitment */}
          {step === 2 && (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta mx-auto flex items-center justify-center mb-6">
                  <Trophy className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Sports Commitment
                </h2>
                <p className="text-gray-400">
                  Tell us about your current club situation
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-backgroundDark/50 border border-primaryCyan/20">
                  <p className="text-sm text-gray-300 mb-4">
                    <strong>Required Information</strong>
                    <br />
                    You must provide accurate details about your current
                    club/academy to complete registration.
                  </p>
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Current Club / Academy *
                  </label>
                  <Input
                    placeholder="e.g. FC Barcelona Youth Academy or 'none' if no agent"
                    className="h-12"
                  />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Agent (if applicable)
                  </label>
                  <Input placeholder="Agent name or 'none'" className="h-12" />
                </div>

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Contract Valid Until *
                  </label>
                  <Input
                    type="date"
                    placeholder="dd/mm/yyyy"
                    className="h-12"
                  />
                </div>
              </div>
            </>
          )}

          {/* Step 3: Parent / Guardian Consent */}
          {step === 3 && (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta mx-auto flex items-center justify-center mb-6">
                  <User className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Parent / Guardian Consent
                </h2>
                <p className="text-gray-400">
                  Required for players under 18 years old
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                  <p className="text-red-400 font-medium mb-2">
                    ⚠️ REGISTRATION BLOCKED
                  </p>
                  <p className="text-sm text-gray-300">
                    You are under 18 years old - to continue registration,
                    parent or guardian must provide following electronic
                    consent.
                  </p>
                  <ul className="text-sm text-gray-300 mt-3 space-y-1">
                    <li>• Parent/Guardian Full Name</li>
                    <li>• Parent/Guardian Email</li>
                    <li>• Parent/Guardian Phone Number</li>
                    <li>• Parent/Guardian Digital Signature</li>
                  </ul>
                  <p className="text-sm text-gray-300 mt-4">
                    You cannot complete registration without parent/guardian
                    consent.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <Input placeholder="Parent/Guardian First Name" />
                  <Input placeholder="Parent/Guardian Last Name" />
                </div>

                <Input placeholder="Parent/Guardian Email" />
                <Input placeholder="Parent/Guardian Phone Number" />

                <div>
                  <label className="text-sm text-gray-300 mb-2 block">
                    Parent/Guardian Digital Signature *
                  </label>
                  <div className="h-32 rounded-lg border-2 border-dashed border-primaryCyan/50 flex items-center justify-center">
                    <p className="text-gray-400">Click to sign</p>
                  </div>
                </div>

                <div className="p-4 rounded-lg bg-backgroundDark/50">
                  <p className="text-sm text-gray-300">
                    <strong>Parent/Guardian Declaration</strong>
                    <br />
                    By providing the above information and signature, I confirm
                    that I am the parent/guardian of the player and give consent
                    for the registration on the NextGen Pros platform.
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Step 4: Privacy & Consent */}
          {step === 4 && (
            <>
              <div className="text-center mb-8">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta mx-auto flex items-center justify-center mb-6">
                  <Lock className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Privacy & Consent
                </h2>
                <p className="text-gray-400">
                  Review and accept our terms to continue
                </p>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-xl bg-backgroundDark/50">
                  <h4 className="text-white font-semibold mb-4">
                    Data Processing & Publishing Consent
                  </h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>
                      • We collect and store your personal information securely
                    </li>
                    <li>
                      • Display your profile information to clubs, scouts and
                      academies
                    </li>
                    <li>• Publish your photos and videos on your profile</li>
                    <li>
                      • Use your content for platform marketing purposes (with
                      attribution)
                    </li>
                    <li>
                      • Share your performance statistics with interested
                      parties
                    </li>
                  </ul>
                </div>

                <label className="flex items-start gap-4 cursor-pointer">
                  <Checkbox />
                  <span className="text-gray-300 text-sm leading-relaxed">
                    I consent to NextGen Pros processing and publishing my
                    information, photos, and videos for profile and marketing
                    purposes.
                  </span>
                </label>

                <div className="p-4 rounded-lg bg-backgroundDark/50">
                  <p className="text-sm text-gray-300">
                    <strong>Your Privacy Matters</strong>
                    <br />
                    We never sell your data. You can control your visibility
                    settings at any time. Read our{" "}
                    <a href="#" className="text-primaryCyan underline">
                      Privacy Policy
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primaryCyan underline">
                      Terms of Service
                    </a>
                    .
                  </p>
                </div>
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-12">
            <Button
              variant="outline"
              onClick={handleBack}
              className="rounded-full px-8"
            >
              ← Back
            </Button>

            <Button
              onClick={handleNext}
              className="rounded-full px-8"
              style={{ backgroundColor: theme.colors.primaryCyan }}
              disabled={step === totalSteps}
            >
              {step === totalSteps ? "Complete Registration" : "Continue →"}
            </Button>
          </div>

          <p className="text-center text-yellow-400 text-sm mt-6">
            ⚠️ Please complete all required fields to continue
          </p>
        </div>
      </div>
    </div>
  );
}
