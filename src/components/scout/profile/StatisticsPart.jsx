import React from "react";
import { useSelector } from "react-redux";

export default function StatisticsPart({ scoutPlayerProfileData }) {
  const theme = useSelector((state) => state.theme);

  // Get statistics from scoutPlayerProfileData or use defaults
  const initialStats = scoutPlayerProfileData.statistics || {
    matches: 28,
    goals: 19,
    assists: 12,
    minutes: 2340,
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
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Matches */}
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.backgroundDark,
          }}
        >
          <div
            className="text-lg md:text-3xl font-semibold mb-2"
            style={{ color: theme.colors.statNeon }}
          >
            {initialStats.matches}
          </div>
          <p className="text-sm text-gray-400">Matches</p>
        </div>

        {/* Goals */}
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.backgroundDark,
          }}
        >
          <div
            style={{ color: theme.colors.statNeon }}
            className="text-lg md:text-3xl font-semibold mb-2"
          >
            {initialStats.goals}
          </div>
          <p className="text-sm text-gray-400">Goals</p>
        </div>

        {/* Assists */}
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.backgroundDark,
          }}
        >
          <div
            style={{ color: theme.colors.statNeon }}
            className="text-lg md:text-3xl font-semibold mb-2"
          >
            {initialStats.assists}
          </div>
          <p className="text-sm text-gray-400">Assists</p>
        </div>

        {/* Minutes */}
        <div
          className="text-center p-6 rounded-xl"
          style={{
            backgroundColor: theme.colors.backgroundDark,
          }}
        >
          <div
            className="text-lg md:text-3xl font-semibold mb-2"
            style={{ color: theme.colors.statNeon }}
          >
            {initialStats.minutes.toLocaleString()}
          </div>
          <p className="text-sm text-gray-400">Minutes</p>
        </div>
      </div>
    </div>
  );
}
