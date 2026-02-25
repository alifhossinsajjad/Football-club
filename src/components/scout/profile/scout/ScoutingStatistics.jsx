"use client";

import {
  Eye,
  Star,
  Trophy,
  TrendingUp,
  Building2,
  Globe,
  Target,
  Award,
  Briefcase,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";

export default function ScoutingStatistics({
  stats,
  theme,
  isEditing,
  onUpdate,
  isLoading = false,
}) {
  const {
    scouted = "1,200+",
    recommended = 145,
    successRate = 89,
    clubsWorked = "61%",
    internationalCoverage = 25,
  } = stats || {};

  const [statsState, setStatsState] = useState({
    scouted,
    recommended,
    successRate,
    clubsWorked,
    internationalCoverage,
  });

  // Sync with external stats changes
  useEffect(() => {
    setStatsState({
      scouted,
      recommended,
      successRate,
      clubsWorked,
      internationalCoverage,
    });
  }, [scouted, recommended, successRate, clubsWorked, internationalCoverage]);

  const handleStatChange = (field, value) => {
    const updatedStats = { ...statsState, [field]: value };
    setStatsState(updatedStats);
    onUpdate?.(updatedStats);
  };

  const items = [
    {
      field: "scouted",
      icon: Target,
      label: "Players Scouted",
      value: statsState.scouted,
    },
    {
      field: "recommended",
      icon: Star,
      label: "Players Recommended",
      value: statsState.recommended,
    },
    {
      field: "successRate",
      icon: Trophy,
      label: "Success Rate (%)",
      value: statsState.successRate,
    },
    {
      field: "clubsWorked",
      icon: Award,
      label: "Clubs Worked With",
      value: statsState.clubsWorked,
    },
    {
      field: "internationalCoverage",
      icon: Briefcase,
      label: "International Coverage",
      value: statsState.internationalCoverage,
    },
  ];

  if (isLoading) {
    return (
      <div
        className="rounded-xl p-8 border animate-pulse"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="h-8 bg-gray-700 rounded w-48 mb-8"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-40 bg-gray-700 rounded-xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-white">Scouting Statistics</h2>
        {/* {isEditing && (
          <button
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Edit statistics"
          >
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )} */}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2  gap-6">
        {items.map((item) => (
          <div
            key={item.field}
            className="rounded-xl p-2 text-left transition-all hover:shadow-lg hover:-translate-y-1 duration-300"
            style={{
              background: isEditing
                ? ""
                : `linear-gradient(135deg, ${theme.colors.primaryCyan}15, ${theme.colors.primaryMagenta}15)`,
            }}
          >
            {isEditing ? (
              <>
                <label className="text-sm  text-[#99A1AF]">{item.label}</label>
                <Input
                  value={item.value}
                  onChange={(e) => handleStatChange(item.field, e.target.value)}
                  className="text-sm  mt-2   bg-transparent border focus:outline-none focus:ring-2 focus:ring-offset-0 rounded-md px-4 py-6"
                  aria-label={`Edit ${item.label}`}
                  style={{
                    backgroundColor: `#1A2049`,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </>
            ) : (
              <>
                <div className="w-16 h-16 rounded-full flex items-center justify-center">
                  <item.icon
                    className="w-8 h-8 text-white"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                </div>
                <p className="text-2xl  mb-2 ml-4">
                  <p className="text-[#99A1AF] text-sm mb-2">{item.label}</p>
                  {item.value}
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
