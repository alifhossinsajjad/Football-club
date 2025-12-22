"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { User, HeartPulse, Phone, CircleAlert } from "lucide-react";

export default function Step2({ event }) {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="rounded-xl p-8 space-y-10 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Emergency Contact */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-6">
          Emergency Contact
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            label="Full Name"
            icon={User}
            placeholder="Enter full name"
            className="h-14 rounded-xl"
          />

          <Input
            label="Relationship"
            placeholder="Father / Mother / Guardian"
            className="h-14 rounded-xl"
          />

          <Input
            label="Emergency Phone"
            icon={Phone}
            type="tel"
            placeholder="01XXXXXXXXX"
            className="h-14 rounded-xl md:col-span-2"
          />
        </div>
      </div>

      {/* Medical Information */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-6">
          Medical Information
        </h3>

        <div className="space-y-4">
          <textarea
            rows={4}
            placeholder="List any medical conditions (e.g., asthma, diabetes). Leave blank if none."
            className="w-full rounded-xl p-4 text-sm text-gray-300 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primaryCyan/40 transition"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              border: `1px solid ${theme.colors.primaryCyan}33`,
            }}
          />

          <textarea
            rows={3}
            placeholder="Allergies (leave blank if none)"
            className="w-full rounded-xl p-4 text-sm text-gray-300 placeholder:text-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-primaryCyan/40 transition"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              border: `1px solid ${theme.colors.primaryCyan}33`,
            }}
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
            <div>
              <div className="font-semibold text-white leading-relaxed">
                Medical Clearance Required
              </div>{" "}
              All participants must provide a medical clearance certificate
              before the event. This will be requested via email after
              registration.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
