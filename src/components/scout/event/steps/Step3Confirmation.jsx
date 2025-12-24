"use client";

import { Button } from "@/components/ui/button";
import {
  Check,
  User,
  Briefcase,
  Shield,
  Lock,
  Phone,
  CircleAlert,
} from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import Link from "next/link";

export default function Step3Confirmation({ event, theme }) {
  // Fallback data (replace later with real form state)
  const personal = {
    firstName: "John",
    lastName: "Doe",
    email: "scout@example.com",
    phone: "+34 XXX XXX XXX",
  };

  const professional = {
    organization: "Elite Scout Agency",
    region: "Europe",
    specialization: "Youth Development",
    experience: "10+ years",
  };

  return (
    <div
      className="space-y-8 pt-12 border rounded-sm p-6"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Success Icon */}
      <div className="flex justify-center mb-8">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta flex items-center justify-center">
          <Button className="w-24 h-24 rounded-full text-5xl">
            <Check className="w-20 h-20 text-white" />
          </Button>
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Review Your Registration
        </h2>
        <p className="text-gray-400 max-w-lg mx-auto text-base">
          Please review all information before confirming
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-auto">
        {/* Personal Info */}
        <div
          className="rounded-xl p-8 border"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <h4 className="text-white font-semibold mb-6 flex items-center gap-3">
            <User
              className="w-6 h-6"
              style={{ color: theme.colors.primaryCyan }}
            />
            Personal Info
          </h4>
          <div className="space-y-3 text-gray-300">
            <p>
              <div className="text-gray-400">Name</div>
              {personal.firstName} {personal.lastName}
            </p>
            <p>
              <div className="text-gray-400">Email</div>
              {personal.email}
            </p>
            <p>
              <div className="text-gray-400">Phone</div>
              {personal.phone}
            </p>
          </div>
        </div>

        {/* Professional Info */}
        <div
          className="rounded-xl p-8 border"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <h4 className="text-white font-semibold mb-6 flex items-center gap-3">
            <Phone
              className="w-6 h-6"
              style={{ color: theme.colors.primaryCyan }}
            />
            Professional Info
          </h4>
          <div className="space-y-3 text-gray-300">
            <p>
              <div className="text-gray-400">Organization</div>
              {professional.organization}
            </p>
            <p>
              <div className="text-gray-400">Region</div>
              {professional.region}
            </p>
            <p>
              <div className="text-gray-400">Specialization</div>
              {professional.specialization}
            </p>
            <p>
              <div className="text-gray-400">Experience</div>
              {professional.experience}
            </p>
          </div>
        </div>
      </div>

      {/* Agreements */}
      <div className="mx-auto space-y-6">
        <label
          className="flex items-center gap-4 cursor-pointer hover:border p-4 rounded-md"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <Checkbox className="w-5 h-5" />
          <span className="text-gray-300 text-base leading-relaxed">
            I agree to the{" "}
            <Link
              href="#"
              className="underline"
              style={{ color: theme.colors.primaryCyan }}
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <Link
              href="#"
              className="underline"
              style={{ color: theme.colors.primaryCyan }}
            >
              Privacy Policy
            </Link>
          </span>
        </label>

        <label
          className="flex items-center gap-4 cursor-pointer hover:border p-4 rounded-md"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <Checkbox className="w-5 h-5" />
          <span className="text-gray-300 text-base leading-relaxed">
            I acknowledge that I will adhere to the professional code of conduct
            while attending this event
          </span>
        </label>
        <label
          className="flex items-center gap-4 cursor-pointer hover:border  p-4 rounded-md "
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <CircleAlert
            className="w-12 md:w-5 md:h-5 md:mt-1 "
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <div className="text-gray-400">
            <div className="font-semibold text-white leading-relaxed">
              Free Event Registration
            </div>
            As a verified scout, you can attend this event at no cost. A
            confirmation email with event details and access credentials will be
            sent to your registered email address.
          </div>
        </label>
      </div>
    </div>
  );
}
