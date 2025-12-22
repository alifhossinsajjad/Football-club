"use client ";
import { Input } from "@/components/ui/input";
import React from "react";
import { useSelector } from "react-redux";

export default function Step1() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-8">
        Personal Information
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Input placeholder="First Name" />
        <Input placeholder="Last Name" />
        <Input placeholder="Email Address" />
        <Input placeholder="Phone Number" />
        <Input type="date" placeholder="Date of Birth" />
      </div>
      <div className="mt-6 p-4 rounded-lg bg-backgroundDark/50">
        <p className="text-sm text-gray-300">
          Age Requirement: This event requires participants to be between 16-18
          years old. Please ensure your age meets this requirement.
        </p>
      </div>
    </div>
  );
}
