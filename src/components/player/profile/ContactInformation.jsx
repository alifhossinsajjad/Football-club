import { Mail, Phone } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function ContactInformation() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h3 className="text-lg font-bold text-white mb-4">Contact Information</h3>
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <Mail
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <span className="text-gray-300">john.doe@email.com</span>
        </div>
        <div className="flex items-center gap-3">
          <Phone
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <span className="text-gray-300">+44 7700 900000</span>
        </div>
      </div>
    </div>
  );
}
