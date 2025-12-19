import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";
import { Input } from "@/components/ui/input"; // Custom Input

export default function PlayerProfilePreference({
  playerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  // Get preferences data from playerProfileData or use defaults
  const initialPreferences = playerProfileData.preferences || {
    preferredLeague: "Premier League, Liga Bundesliga",
    contractStatus: "Open to Offers",
    availability: "Available from Summer 2025",
  };

  // Local state for editable preferences
  const [editablePreferences, setEditablePreferences] =
    useState(initialPreferences);

  // Handle preference changes
  const handlePreferenceChange = (field, value) => {
    const updatedPreferences = {
      ...editablePreferences,
      [field]: value,
    };

    setEditablePreferences(updatedPreferences);

    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ preferences: updatedPreferences });
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
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-base font-bold text-white">Preferences</h3>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-6 flex flex-col gap-2">
        <div>
          <div className="text-gray-400 mb-2">Preferred League</div>
          {isEditing ? (
            <Input
              value={editablePreferences.preferredLeague}
              onChange={(e) =>
                handlePreferenceChange("preferredLeague", e.target.value)
              }
            />
          ) : (
            <p className="text-white">{initialPreferences.preferredLeague}</p>
          )}
        </div>
        <div>
          <div className="text-gray-400 mb-2">Contract Status</div>
          {isEditing ? (
            <Input
              value={editablePreferences.contractStatus}
              onChange={(e) =>
                handlePreferenceChange("contractStatus", e.target.value)
              }
            />
          ) : (
            <p className="text-white">{initialPreferences.contractStatus}</p>
          )}
        </div>
        <div>
          <div className="text-gray-400 mb-2">Availability</div>
          {isEditing ? (
            <Input
              value={editablePreferences.availability}
              onChange={(e) =>
                handlePreferenceChange("availability", e.target.value)
              }
            />
          ) : (
            <p className="text-white">{initialPreferences.availability}</p>
          )}
        </div>
      </div>
    </div>
  );
}
