import { Input } from "@/components/ui/input";
import React from "react";
import { useSelector } from "react-redux";

export default function Step2() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="rounded-xl p-8 space-y-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h2 className="text-2xl font-bold text-white">
        Emergency Contact & Medical Information
      </h2>
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input placeholder="Full name" />
          <Input placeholder="Relationship" />
          <Input placeholder="Emergency Phone" />
        </div>
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Medical Information
        </h3>
        <textarea
          className="w-full p-4 rounded-lg resize-none"
          rows="4"
          placeholder="List any medical conditions (e.g. asthma, diabetes). Leave blank if none."
          style={{
            backgroundColor: theme.colors.backgroundDark,
            border: `1px solid ${theme.colors.primaryCyan}33`,
            color: "white",
          }}
        />
        <textarea
          className="w-full p-4 rounded-lg resize-none mt-4"
          rows="3"
          placeholder="Allergies (Leave blank if none)"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            border: `1px solid ${theme.colors.primaryCyan}33`,
            color: "white",
          }}
        />
        <div className="mt-4 p-4 rounded-lg bg-backgroundDark/50">
          <p className="text-sm text-gray-300">
            Medical Clearance Required: All participants must provide a medical
            clearance certificate before the event. This will be requested via
            email after registration.
          </p>
        </div>
      </div>
    </div>
  );
}
