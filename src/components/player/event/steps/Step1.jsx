"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Mail, Phone, User, Calendar, CircleAlert } from "lucide-react";

export default function Step1({ event }) {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="rounded-xl p-8 border"
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
          placeholder="Sourav"
          className="h-14 rounded-xl"
        />

        <Input
          label="Last Name *"
          icon={User}
          placeholder="Debnath"
          className="h-14 rounded-xl"
        />

        <Input
          label="Email Address *"
          icon={Mail}
          type="email"
          placeholder="example@email.com"
          className="h-14 rounded-xl"
        />

        <Input
          label="Phone Number *"
          icon={Phone}
          type="tel"
          placeholder="01XXXXXXXXX"
          className="h-14 rounded-xl"
        />

        <Input
          label="Date of Birth *"
          icon={Calendar}
          type="date"
          className="h-14 rounded-xl md:col-span-2"
        />
      </div>

      {/* Info box */}
      <div
        className="mt-6 p-4 rounded-lg border"
        style={{
          backgroundColor: `${theme.colors.backgroundDark}80`,
          borderColor: `${theme.colors.primaryCyan}22`,
        }}
      >
        <div className="text-sm text-gray-400 leading-relaxed flex gap-4">
          <CircleAlert
            className="w-12 md:w-5 md:h-5 md:mt-1 "
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <div >
            <div className="font-semibold text-white leading-relaxed">Age Requirement</div> This
            event requires participants to be between{" "}
            <span className="text-primaryCyan font-medium ">16-18 years</span>{" "}
            old. Please ensure your age meets this requirement.
          </div>
        </div>
      </div>
    </div>
  );
}
