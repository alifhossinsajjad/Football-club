import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function PlayerProfilePreference({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
  // Local state for editable preferences
  const [preferences, setPreferences] = useState({
    preferredLeague: "Premier League, Liga Bundesliga",
    contractStatus: "Open to Offers",
    availability: "Available from Summer 2025"
  });
  
  // Handler for updating preferences
  const handlePreferenceChange = (field, value) => {
    setPreferences(prev => ({
      ...prev,
      [field]: value
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
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base  font-bold text-white">Preferences</h3>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-4 flex flex-col gap-2">
        <div>
          <div className="text-gray-400 ">Preferred League</div>
          {isEditing ? (
            <input
              type="text"
              className="text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 w-full"
              value={preferences.preferredLeague}
              onChange={(e) => handlePreferenceChange('preferredLeague', e.target.value)}
            />
          ) : (
            <p>{preferences.preferredLeague}</p>
          )}
        </div>
        <div>
          <div className="text-gray-400">Contract Status</div>
          {isEditing ? (
            <input
              type="text"
              className="text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 w-full"
              value={preferences.contractStatus}
              onChange={(e) => handlePreferenceChange('contractStatus', e.target.value)}
            />
          ) : (
            <p>{preferences.contractStatus}</p>
          )}
        </div>
        <div>
          <div className="text-gray-400">Availability</div>
          {isEditing ? (
            <input
              type="text"
              className="text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 w-full"
              value={preferences.availability}
              onChange={(e) => handlePreferenceChange('availability', e.target.value)}
            />
          ) : (
            <p>{preferences.availability}</p>
          )}
        </div>
      </div>
    </div>
  );
}
