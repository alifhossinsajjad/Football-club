import { Award } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function PlayerAchievements() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h3 className="text-xl  text-white mb-4 flex items-center gap-2">
        <Award
          className="w-5 h-5"
          style={{ color: theme.colors.primaryCyan }}
        />
        Achievements
      </h3>
      <div className="space-y-3">
        {[
          "Player of the Month - March 2025",
          "Top Scorer U-18 League 2024",
          "England Youth Call-Up 2024",
          "FA Youth Cup Finalist 2024",
          "Academy Player of the Year 2023",
        ].map((ach) => (
          <div key={ach} className="flex items-start gap-3">
            <div
              className="w-2 h-2 mt-2 rounded-full  flex-shrink-0"
              style={{
                backgroundColor: theme.colors.primaryCyan,
              }}
            />
            <p className="text-base text-gray-300">{ach}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
