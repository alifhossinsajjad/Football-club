"use client";

import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/player/select";
import { ShieldCheck, Info, ChevronDown, AlertCircle } from "lucide-react";

export default function ClubComplete1({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const theme = useSelector((state) => state.theme);

  const specializations = [
    "Youth Scouting",
    "Professional Scouting",
    "International Scouting",
    "Technical Analysis",
    "Performance Analysis",
    "Player Representation",
  ];

  const toggleSpecialization = (value) => {
    const exists = formData.specialization?.includes(value);
    updateFormData({
      specialization: exists
        ? formData.specialization.filter((v) => v !== value)
        : [...(formData.specialization || []), value],
    });
  };

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
          <ShieldCheck className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-white">
          Professional Credentials
        </h2>
        <p className="text-gray-400 mt-1">
          Tell us about your professional qualifications
        </p>
      </div>

      {/* Info box */}
      <div
        className="p-4  rounded-lg bg-[#2B7FFF1A] mb-6 flex border text-xs gap-4"
        style={{
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <AlertCircle className="w-8 h-8 text-[#2B7FFF]" />
        <p className="text-sm text-gray-300 mb-4">
          <strong>Professional Verification</strong>
          <br />
          This information will be verified to ensure the credibility of our
          scouting network.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* License Type */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            License Type *
          </label>
          <Select
            value={formData.licenseType || ""}
            onValueChange={(value) => updateFormData({ licenseType: value })}
          >
            <SelectTrigger
              className="w-full h-12 rounded-md border border-gray-700 text-gray-400 px-4"
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            >
              <SelectValue placeholder="Select License Type" />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: theme.colors.primaryCyan + "33",
              }}
            >
              <SelectItem value="FIFA" style={{ color: 'white' }}>FIFA</SelectItem>
              <SelectItem value="National" style={{ color: 'white' }}>National Federation</SelectItem>
              <SelectItem value="Club" style={{ color: 'white' }}>Club License</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* License Number + Agency */}
        <div className="grid grid-cols-2 gap-6">
          <Input
            placeholder="License Number (e.g. FIFA-12345)"
            className="h-12"
            value={formData.licenseNumber || ""}
            onChange={(e) => updateFormData({ licenseNumber: e.target.value })}
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          />
          <Input
            placeholder="Agency Name (if applicable)"
            className="h-12"
            value={formData.agencyName || ""}
            onChange={(e) => updateFormData({ agencyName: e.target.value })}
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          />
        </div>

        {/* Agency Affiliation */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Agency Affiliation
          </label>
          <Select
            value={formData.affiliation || ""}
            onValueChange={(value) => updateFormData({ affiliation: value })}
          >
            <SelectTrigger
              className="w-full h-12 rounded-md border border-gray-700 text-gray-400 px-4"
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            >
              <SelectValue placeholder="Select Affiliation" />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: theme.colors.primaryCyan + "33",
              }}
            >
              <SelectItem value="Independent" style={{ color: 'white' }}>Independent</SelectItem>
              <SelectItem value="Agency" style={{ color: 'white' }}>Agency</SelectItem>
              <SelectItem value="Club" style={{ color: 'white' }}>Club</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Specialization */}
        <div>
          <label className="text-sm text-gray-300 mb-3 block">
            Specialization * (Select all that apply)
          </label>

          <div className="grid grid-cols-2 gap-4">
            {specializations.map((item) => {
              const active = formData.specialization?.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleSpecialization(item)}
                  className="h-12 rounded-lg text-sm border transition"
                  style={{
                    backgroundColor: active
                      ? theme.colors.primaryCyan
                      : "transparent",
                    borderColor: active ? theme.colors.primaryCyan : "#374151",
                    color: active ? "#000" : "#9ca3af",
                  }}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
