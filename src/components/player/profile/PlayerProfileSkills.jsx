import React from "react";
import { useSelector } from "react-redux";

export default function PlayerProfileSkills() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h2 className="text-xl font-bold text-white mb-4">Skills & Attributes</h2>
      <div className="space-y-4">
        {[
          { skill: "Pace", value: 92 },
          { skill: "Shooting", value: 88 },
          { skill: "Dribbling", value: 90 },
          { skill: "Passing", value: 85 },
          { skill: "Physical", value: 82 },
          { skill: "Technical", value: 89 },
        ].map(({ skill, value }) => (
          <div key={skill}>
            <div className="flex justify-between mb-1">
              <span className="text-white">{skill}</span>
              <span className="text-gray-400">{value}</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${value}%`,
                  backgroundColor: theme.colors.primaryCyan,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
