"use client";

import { Checkbox } from "@/components/ui/Checkbox";
import { AlertCircle, Check, Lock } from "lucide-react";
import { useSelector } from "react-redux";

export default function PlayerComplete4({ formData, updateFormData }) {
  const theme = useSelector((state) => state.theme);

  return (
    <>
      <div className="text-center mb-8 ">
        <div
          className="w-20 h-20 rounded-full p-4 mx-auto flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(180deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
          }}
        >
          <Lock className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Privacy & Consent
        </h2>
        <p className="text-gray-400">Review and accept our terms to continue</p>
      </div>

      <div
        className="space-y-6 p-4 rounded-lg border"
        style={{
          backgroundColor: theme.colors.backgroundDark,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="p-6 rounded-xl bg-backgroundDark/50">
          <h4 className="text-white font-semibold mb-4">
            Data Processing & Publishing Consent
          </h4>
          <h4 className="text-gray-400 text-sm mb-4">
            By proceeding, you agree that NextGen Pros may:
          </h4>
          <div className="ml-4">
            <ul className="space-y-2 text-gray-300 text-sm">
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4"
                  style={{
                    color: theme.colors.primaryCyan,
                  }}
                />{" "}
                We collect and store your personal information securely
              </div>
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4"
                  style={{
                    color: theme.colors.primaryCyan,
                  }}
                />{" "}
                Display your profile information to clubs, scouts and academies
              </div>
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4"
                  style={{
                    color: theme.colors.primaryCyan,
                  }}
                />{" "}
                Publish your photos and videos on your profile
              </div>
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4"
                  style={{
                    color: theme.colors.primaryCyan,
                  }}
                />{" "}
                Use your content for platform marketing purposes (with
                attribution)
              </div>
              <div className="flex items-center gap-2">
                <Check
                  className="w-4 h-4"
                  style={{
                    color: theme.colors.primaryCyan,
                  }}
                />{" "}
                Share your performance statistics with interested parties
              </div>
            </ul>
          </div>
        </div>

        <div className="p-4 rounded-lg bg-[#2B7FFF1A] flex text-xs gap-4">
          <Checkbox
            checked={formData.privacyConsent || false}
            onChange={(checked) => updateFormData({ privacyConsent: checked })}
            className="mt-1"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <p className="text-sm text-gray-300 mb-4 max-w-sm">
            I consent to NextGen Pros processing and publishing my information,
            photos, and videos for profile and marketing purposes.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-backgroundDark/50">
          <p className="text-sm text-gray-300">
            <strong>Your Privacy Matters</strong>
            <br />
            We never sell your data. You can control your visibility settings at
            any time. Read our{" "}
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
  );
}
