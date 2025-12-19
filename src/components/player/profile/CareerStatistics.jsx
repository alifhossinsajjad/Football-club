import React from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function CareerStatistics({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
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
      
      {isEditing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <SquarePen className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
