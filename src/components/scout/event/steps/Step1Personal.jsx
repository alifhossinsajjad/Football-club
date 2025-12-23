"use client";

import { Input } from "@/components/ui/input";
import { Mail, Phone, User, CircleAlert } from "lucide-react";

export default function Step1Personal({ theme }) {
  return (
    <div
      className="rounded-xl p-10 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-white mb-8">
        Personal Information
      </h2>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input
          label="First Name *"
          icon={User}
          placeholder="First Name"
          className="h-14 rounded-xl"
        />

        <Input
          label="Last Name *"
          icon={User}
          placeholder="Last Name"
          className="h-14 rounded-xl"
        />

        <Input
          label="Email Address *"
          icon={Mail}
          type="email"
          defaultValue="scout@example.com"
          className="h-14 rounded-xl"
        />

        <Input
          label="Phone Number *"
          icon={Phone}
          type="tel"
          defaultValue="+34 XXX XXX XXX"
          className="h-14 rounded-xl"
        />
      </div>

      {/* Info box */}
      <div
        className="mt-8 p-6 rounded-xl border"
        style={{
          backgroundColor: `${theme.colors.backgroundDark}80`,
          borderColor: `${theme.colors.primaryCyan}22`,
        }}
      >
        <div className="text-sm text-gray-300 leading-relaxed flex gap-4">
          <CircleAlert
            className="w-6 h-6 mt-1"
            style={{ color: theme.colors.primaryCyan }}
          />
          <div>
            <div className="font-semibold text-white mb-1">
              Scout Event Registration
            </div>
            As a registered scout, you can attend this event free of charge.
            Please complete all registration steps to confirm your attendance.
          </div>
        </div>
      </div>
    </div>
  );
}
