"use client";

import { useSelector } from "react-redux";
import { CheckCircle } from "lucide-react";

export default function AccountFeatures({ userType }) {
  const theme = useSelector((state) => state.theme);

  const features = {
    player: [
      "Access to scout network",
      "Profile showcase",
      "Event registration",
      "Direct messaging",
      "Training content",
    ],
    club: [
      "Create events",
      "Scout players",
      "Manage academy",
      "Recruitment tools",
      "Analytics dashboard",
    ],
    scout: [
      "Player discovery",
      "Advanced search",
      "Contact players",
      "Create reports",
      "Event access",
    ],
  };

  const titles = {
    player: "Player Account Features",
    club: "Club Account Features",
    scout: "Scout Account Features",
  };

  return (
    <div
      className="rounded-lg border p-6"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h3 className="text-lg font-semibold text-white mb-4">
        {titles[userType]}
      </h3>

      <div className="space-y-3">
        {features[userType].map((feature, index) => (
          <div key={index} className="flex items-center gap-3">
            <CheckCircle
              className="w-5 h-5 flex-shrink-0"
              style={{ color: "rgba(5, 223, 114, 1)" }}
            />
            <span className="text-gray-300 text-sm">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}