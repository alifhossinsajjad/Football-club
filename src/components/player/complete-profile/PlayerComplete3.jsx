"use client";

import { Input } from "@/components/ui/input";
import { AlertCircle, CircleAlert, CircleX, Shield, User } from "lucide-react";
import { useSelector } from "react-redux";

export default function PlayerComplete3({ formData, updateFormData }) {
  const theme = useSelector((state) => state.theme);

  return (
    <div>
      <div className="text-center mb-8">
        <div
          className="w-20 h-20 rounded-full  mx-auto flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(180deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
          }}
        >
          <User className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">
          Parent / Guardian Consent
        </h2>
        <p className="text-gray-400">Required for players under 18 years old</p>
      </div>

      <div className="space-y-6">
        <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
          <p className="text-red-400 font-medium mb-2">
            ⚠️ REGISTRATION BLOCKED
          </p>
          <p className="text-sm text-gray-300">
            You are under 18 years old - to continue registration, parent or
            guardian must provide following electronic consent.
          </p>
          <div
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
            className="p-4 mt-4 rounded-lg"
          >
            <h1>Required to proceed:</h1>
            <ul className="text-sm text-gray-300 mt-3 space-y-1 ">
              <h1 className="flex gap-2 items-center">
                <CircleX className="w-4 h-4 text-red-500" /> Parent/Guardian
                Full Name
              </h1>
              <h1 className="flex gap-2 items-center">
                <CircleX className="w-4 h-4 text-red-500" /> Parent/Guardian
                Email
              </h1>
              <h1 className="flex gap-2 items-center">
                <CircleX className="w-4 h-4 text-red-500" /> Parent/Guardian
                Phone Number
              </h1>
              <h1 className="flex gap-2 items-center">
                <CircleX className="w-4 h-4 text-red-500" /> Parent/Guardian
                Digital Signature
              </h1>
            </ul>
          </div>
          <p className="text-sm  mt-4 flex  gap-4 text-red-500">
            <CircleAlert className="w-4 h-4 " /> You cannot complete
            registration without parent/guardian consent.
          </p>
        </div>

        <div className="p-4 rounded-lg bg-[#2B7FFF1A] flex text-xs gap-4">
          <AlertCircle className="w-8 h-8 text-[#2B7FFF]" />
          <p className="text-sm text-gray-300 mb-4">
            <strong>Required Information</strong>
            <br />
            You must provide accurate details about your current club/academy to
            complete registration.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Input
            placeholder="Parent/Guardian First Name"
            value={formData.parentFirstName || ""}
            onChange={(e) =>
              updateFormData({ parentFirstName: e.target.value })
            }
          />
          <Input
            placeholder="Parent/Guardian Last Name"
            value={formData.parentLastName || ""}
            onChange={(e) => updateFormData({ parentLastName: e.target.value })}
          />
        </div>

        <Input
          placeholder="Parent/Guardian Email"
          value={formData.parentEmail || ""}
          onChange={(e) => updateFormData({ parentEmail: e.target.value })}
        />
        <Input
          placeholder="Parent/Guardian Phone Number"
          value={formData.parentPhone || ""}
          onChange={(e) => updateFormData({ parentPhone: e.target.value })}
        />

        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Parent/Guardian Digital Signature *
          </label>
          <div className="h-32 rounded-lg border-2 border-dashed border-primaryCyan/50 flex items-center justify-center">
            <p className="text-gray-400">Click to sign</p>
          </div>
        </div>

        <div
          className="p-4 rounded-lg  flex text-xs gap-4 border-2"
          style={{
            background: `linear-gradient(180deg, ${theme.colors.primaryCyan}10, ${theme.colors.primaryMagenta}10)`,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="text-sm text-gray-300 mb-4">
            <strong className="flex items-center gap-1 text-base">
              <Shield className="w-6 h-6 text-[#2B7FFF]" />
              Parent/Guardian Declaration
            </strong>
            <br />
            By providing the above information and signature, I confirm that I
            am the parent/guardian of the player and give consent for the
            registration on the NextGen Pros platform.I.
          </div>
        </div>
      </div>
    </div>
  );
}
