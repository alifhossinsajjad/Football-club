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
import { User, AlertCircle } from "lucide-react";

export default function ClubComplete2({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const theme = useSelector((state) => state.theme);

  const roles = [
    "Club President",
    "Sporting Director",
    "Head Scout",
    "Academy Director",
    "Other",
  ];

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
          <User className="w-8 h-8 text-white" />
        </div>

        <h2 className="text-2xl font-bold text-white">
          Primary Contact Person
        </h2>
        <p className="text-gray-400 mt-1">
          Who should we contact regarding your organization?
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
          <strong>Important Contact Information</strong>
          <br />
          This person will be the main point of contact for account management,
          player inquiries, and platform communications.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Full Name *
          </label>
          <Input
            placeholder="Contact Person's full name"
            className="h-12"
            value={formData.fullName || ""}
            onChange={(e) => updateFormData({ fullName: e.target.value })}
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          />
        </div>

        {/* Role/Position */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Role/Position *
          </label>
          <Select
            value={formData.role || ""}
            onValueChange={(value) => updateFormData({ role: value })}
          >
            <SelectTrigger
              className="w-full h-12 rounded-md border border-gray-700 text-gray-400 px-4"
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            >
              <SelectValue placeholder="Select Role" />
            </SelectTrigger>
            <SelectContent
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: theme.colors.primaryCyan + "33",
              }}
            >
              {roles.map((role) => (
                <SelectItem key={role} value={role} style={{ color: "white" }}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Email Address */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Email Address *
          </label>
          <Input
            placeholder="contact@yourclub.com"
            className="h-12"
            value={formData.email || ""}
            onChange={(e) => updateFormData({ email: e.target.value })}
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          />
          <p className="text-xs text-gray-400 mt-1">
            This must be your club's organization email
          </p>
        </div>

        {/* Phone Number */}
        <div>
          <label className="text-sm text-gray-300 mb-2 block">
            Phone Number *
          </label>
          <Input
            placeholder="+34 XXX XXX XXX"
            className="h-12"
            value={formData.phoneNumber || ""}
            onChange={(e) => updateFormData({ phoneNumber: e.target.value })}
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          />
        </div>
      </div>
    </div>
  );
}
