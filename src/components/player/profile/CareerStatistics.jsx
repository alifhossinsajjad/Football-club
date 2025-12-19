import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function CareerStatistics({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
  // Local state for editable statistics
  const [stats, setStats] = useState({
    matches: 28,
    goals: 19,
    assists: 12,
    minutes: 2340
  });
  
  // Handler for updating stats
  const handleStatChange = (stat, value) => {
    setStats(prev => ({
      ...prev,
      [stat]: value
    }));
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
        <h2 className="text-xl font-bold text-white">
          Career Statistics (2024/25 Season)
        </h2>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          className="text-center p-4 rounded-lg"
          style={{ backgroundColor: theme.colors.backgroundDark }}
        >
          <div
            className="text-3xl font-bold"
            style={{ color: theme.colors.primaryCyan }}
          >
            {isEditing ? (
              <input
                type="number"
                className="text-3xl font-bold bg-transparent text-center w-full focus:outline-none border-b border-cyan-500"
                value={stats.matches}
                onChange={(e) => handleStatChange('matches', parseInt(e.target.value) || 0)}
              />
            ) : (
              stats.matches
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">Matches</p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            color: theme.colors.primaryCyan,
          }}
        >
          <div className="text-3xl font-bold ">
            {isEditing ? (
              <input
                type="number"
                className="text-3xl font-bold bg-transparent text-center w-full focus:outline-none border-b border-cyan-500"
                value={stats.goals}
                onChange={(e) => handleStatChange('goals', parseInt(e.target.value) || 0)}
              />
            ) : (
              stats.goals
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">Goals</p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            color: theme.colors.primaryCyan,
          }}
        >
          <div className="text-3xl font-bold ">
            {isEditing ? (
              <input
                type="number"
                className="text-3xl font-bold bg-transparent text-center w-full focus:outline-none border-b border-cyan-500"
                value={stats.assists}
                onChange={(e) => handleStatChange('assists', parseInt(e.target.value) || 0)}
              />
            ) : (
              stats.assists
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">Assists</p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            color: theme.colors.primaryCyan,
          }}
        >
          <div
            className="text-3xl font-bold"
            style={{ color: theme.colors.primaryCyan }}
          >
            {isEditing ? (
              <input
                type="number"
                className="text-3xl font-bold bg-transparent text-center w-full focus:outline-none border-b border-cyan-500"
                value={stats.minutes}
                onChange={(e) => handleStatChange('minutes', parseInt(e.target.value) || 0)}
              />
            ) : (
              stats.minutes.toLocaleString()
            )}
          </div>
          <p className="text-sm text-gray-400 mt-2">Minutes</p>
        </div>
      </div>
    </div>
  );
}
