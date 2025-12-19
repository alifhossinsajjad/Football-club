import React from "react";
import { useSelector } from "react-redux";

export default function CareerStatistics() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="p-6 rounded-xl border "
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h2 className="text-xl font-bold text-white mb-6">
        Career Statistics (2024/25 Season)
      </h2>
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
        <div
          className="text-center p-4 rounded-lg"
          style={{ backgroundColor: theme.colors.backgroundDark }}
        >
          <div
            className="text-3xl font-bold"
            style={{ color: theme.colors.primaryCyan }}
          >
            28
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
          <div className="text-3xl font-bold ">19</div>
          <p className="text-sm text-gray-400 mt-2">Goals</p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            color: theme.colors.primaryCyan,
          }}
        >
          <div className="text-3xl font-bold ">12</div>
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
            2,340
          </div>
          <p className="text-sm text-gray-400 mt-2">Minutes</p>
        </div>
      </div>
    </div>
  );
}
