"use client";

import { Input } from "@/components/ui/input";
import { AlertCircle, Building, Trophy } from "lucide-react";
import { useSelector } from "react-redux";

export default function PlayerComplete2({ formData, updateFormData }) {
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
        <div className="p-4 rounded-lg bg-[#2B7FFF1A] flex text-xs gap-4">
          <AlertCircle className="w-8 h-8 text-[#2B7FFF]" />
          <p className="text-sm text-gray-300 mb-4">
            <strong>Required Information</strong>
            <br />
            You must provide accurate details about your current club/academy to
            complete registration.
          </p>
        </div>

        <div cl>
          <label className="text-sm text-gray-300 mb-2  flex gap-2">
            <Building className="w-4 h-4" /> Current Club / Academy *
          </label>
          <Input
            placeholder="e.g. FC Barcelona Youth Academy or 'none' if no agent"
            className="h-12"
            value={formData.club || ""}
            onChange={(e) => updateFormData({ club: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Agent (if applicable)
          </label>
          <Input
            placeholder="Agent name or 'none'"
            className="h-12"
            value={formData.agent || ""}
            onChange={(e) => updateFormData({ agent: e.target.value })}
          />
        </div>

        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Contract Valid Until *
          </label>
          <Input
            type="date"
            placeholder="dd/mm/yyyy"
            className="h-12"
            value={formData.contractValidUntil || ""}
            onChange={(e) =>
              updateFormData({ contractValidUntil: e.target.value })
            }
          />
        </div>
      </div>
    </div>
  );
}
