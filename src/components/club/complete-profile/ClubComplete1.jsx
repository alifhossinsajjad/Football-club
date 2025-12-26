"use client";

import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Info } from "lucide-react";

export default function ClubComplete1({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="p-8 rounded-2xl "
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Header */}
      <div className="text-center mb-8">
        <div
          className="w-16 h-16 rounded-full mx-auto flex items-center justify-center mb-4"
          style={{
            background: `linear-gradient(180deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
          }}
        >
          <Info className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-white">Organization Details</h2>
        <p className="text-gray-400 mt-1">
          Tell us about your club or academy.
        </p>
      </div>

      {/* Info box */}
      <div
        className="p-4  rounded-lg bg-[#2B7FFF1A] mb-6 flex border text-xs gap-4"
        style={{
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <Info className="w-8 h-8 text-[#2B7FFF]" />
        <p className="text-sm text-gray-300 mb-4">
          Official Information Required for Verification Purposes. This
          information will be used to verify your organization's legitimacy.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Full Address */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Full Address *
          </label>
          <Input
            placeholder="Street address, building number, district"
            className="h-12"
            value={formData.fullAddress || ""}
            onChange={(e) => updateFormData({ fullAddress: e.target.value })}
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          />
        </div>

        {/* Postal Code + Established Year */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Postal Code *
            </label>
            <Input
              placeholder="08028"
              className="h-12"
              value={formData.postalCode || ""}
              onChange={(e) => updateFormData({ postalCode: e.target.value })}
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Established Year *
            </label>
            <Input
              placeholder="1979"
              className="h-12"
              value={formData.establishedYear || ""}
              onChange={(e) =>
                updateFormData({ establishedYear: e.target.value })
              }
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            />
          </div>
        </div>

        {/* Registration Number + Tax ID */}
        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Registration Number *
            </label>
            <Input
              placeholder="Registration Number #"
              className="h-12"
              value={formData.registrationNumber || ""}
              onChange={(e) =>
                updateFormData({ registrationNumber: e.target.value })
              }
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            />
          </div>
          <div>
            <label className="text-sm text-gray-300 mb-2 block">
              Tax ID (Optional)
            </label>
            <Input
              placeholder="Tax Identification number"
              className="h-12"
              value={formData.taxId || ""}
              onChange={(e) => updateFormData({ taxId: e.target.value })}
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
