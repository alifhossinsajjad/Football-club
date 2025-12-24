import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input"; // Custom Input

export default function CareerStatistics({
  playerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  // Get statistics from playerProfileData or use defaults
  const initialStats = playerProfileData.statistics || {
    matches: 28,
    goals: 19,
    assists: 12,
    minutes: 2340,
  };

  // Local state for editable fields
  const [editableStats, setEditableStats] = useState(initialStats);

  // Handle stat changes
  const handleStatChange = (stat, value) => {
    const updatedStats = {
      ...editableStats,
      [stat]: parseInt(value) || 0,
    };

    setEditableStats(updatedStats);

    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ statistics: updatedStats });
    }
  };

  return (
    <div
      className="p-6 rounded-xl border relative"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-start mb-6">
        <h2 className="text-xl  text-white">
          Career Statistics (2024/25 Season)
        </h2>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Matches */}
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: isEditing
              ? theme.colors.backgroundCard
              : theme.colors.backgroundDark,
          }}
        >
          <div
            className="text-4xl  mb-2"
            style={{ color: theme.colors.primaryCyan }}
          >
            {isEditing ? (
              <Input
                type="number"
                value={editableStats.matches}
                onChange={(e) => handleStatChange("matches", e.target.value)}
                className="text-lg text-white rounded-lg  "
              />
            ) : (
              initialStats.matches
            )}
          </div>
          <p className="text-sm text-gray-400">Matches</p>
        </div>

        {/* Goals */}
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: isEditing
              ? theme.colors.backgroundCard
              : theme.colors.backgroundDark,
          }}
        >
          <div className="text-4xl  mb-2 text-white" style={{ color: theme.colors.primaryCyan }}>
            {isEditing ? (
              <Input
                type="number"
                value={editableStats.goals}
                onChange={(e) => handleStatChange("goals", e.target.value)}
                className="text-lg  rounded-lg  "
                style={{
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            ) : (
              initialStats.goals
            )}
          </div>
          <p className="text-sm text-gray-400">Goals</p>
        </div>

        {/* Assists */}
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: isEditing
              ? theme.colors.backgroundCard
              : theme.colors.backgroundDark,
          }}
        >
          <div className="text-4xl  mb-2 text-white" style={{ color: theme.colors.primaryCyan }}>
            {isEditing ? (
              <Input
                type="number"
                value={editableStats.assists}
                onChange={(e) => handleStatChange("assists", e.target.value)}
                className="text-lg  rounded-lg  "
              />
            ) : (
              initialStats.assists
            )}
          </div>
          <p className="text-sm text-gray-400">Assists</p>
        </div>

        {/* Minutes */}
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: isEditing
              ? theme.colors.backgroundCard
              : theme.colors.backgroundDark,
          }}
        >
          <div
            className="text-4xl  mb-2"
            style={{ color: theme.colors.primaryCyan }}
          >
            {isEditing ? (
              <Input
                type="number"
                value={editableStats.minutes}
                onChange={(e) => handleStatChange("minutes", e.target.value)}
                className="text-lg  rounded-lg"
              />
            ) : (
              initialStats.minutes.toLocaleString()
            )}
          </div>
          <p className="text-sm text-gray-400">Minutes</p>
        </div>
      </div>
    </div>
  );
}
