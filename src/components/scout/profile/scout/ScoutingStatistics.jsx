// 1. ScoutingStatistics.jsx
"use client";

import { Eye, Star, Trophy, TrendingUp, Building2 } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";

export default function ScoutingStatistics({ stats, theme, isEditing, onUpdate }) {
  const {
    scouted = "1,200+",
    recommended = 145,
    placements = 89,
    successRate = "61%",
    clubsWorked = 25,
  } = stats || {};

  const [statsState, setStatsState] = useState({
    scouted,
    recommended,
    placements,
    successRate,
    clubsWorked
  });

  const handleStatChange = (field, value) => {
    const updatedStats = { ...statsState, [field]: value };
    setStatsState(updatedStats);
    if (onUpdate) {
      onUpdate(updatedStats);
    }
  };

  const items = [
    { field: "scouted", icon: Eye, label: "Players Scouted", value: statsState.scouted },
    { field: "recommended", icon: Star, label: "Recommended", value: statsState.recommended },
    { field: "placements", icon: Trophy, label: "Pro Placements", value: statsState.placements },
    { field: "successRate", icon: TrendingUp, label: "Success Rate", value: statsState.successRate },
    { field: "clubsWorked", icon: Building2, label: "Clubs Worked With", value: statsState.clubsWorked },
  ];

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">
          Scouting Statistics
        </h2>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((item, i) => (
          <div
            key={i}
            className="rounded-xl p-6 text-center transition-all hover:shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primaryCyan}15, ${theme.colors.primaryMagenta}15)`,
            }}
          >
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta mx-auto mb-4 flex items-center justify-center">
              <item.icon className="w-6 h-6 text-white" />
            </div>
            {isEditing ? (
              <Input
                value={item.value}
                onChange={(e) => handleStatChange(item.field, e.target.value)}
                className="text-4xl font-bold text-primaryCyan mb-2 text-center"
              />
            ) : (
              <p className="text-4xl font-bold text-primaryCyan mb-2">
                {item.value}
              </p>
            )}
            <p className="text-gray-400 text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
