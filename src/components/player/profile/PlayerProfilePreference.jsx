import React from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function PlayerProfilePreference({ playerProfileData }) {
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
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base  font-bold text-white">Preferences</h3>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-4 flex flex-col gap-2">
        <p>
          <div className="text-gray-400 ">Preferred League</div> Premier
          League, Liga Bundesliga
        </p>
        <p>
          <div className="text-gray-400">Contract Status</div> Open to Offers
        </p>
        <p>
          <div className="text-gray-400">Availability</div> Available from
          Summer 2025
        </p>
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
