import { Award, SquarePen } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function PlayerAchievements({ playerProfileData, isEditing, updatePlayerProfileData }) {
  const theme = useSelector((state) => state.theme);
  
  // Get achievements data from playerProfileData or use defaults
  const initialAchievements = playerProfileData.achievements || [
    "Player of the Month - March 2025",
    "Top Scorer U-18 League 2024",
    "England Youth Call-Up 2024",
    "FA Youth Cup Finalist 2024",
    "Academy Player of the Year 2023",
  ];
  
  // Local state for editable achievements
  const [editableAchievements, setEditableAchievements] = useState(initialAchievements);
  
  // Handle achievement changes
  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...editableAchievements];
    updatedAchievements[index] = value;
    
    setEditableAchievements(updatedAchievements);
    
    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ achievements: updatedAchievements });
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
        <h3 className="text-xl  text-white flex items-center gap-2">
          <Award
            className="w-5 h-5"
            style={{ color: theme.colors.primaryCyan }}
          />
          Achievements
        </h3>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-3">
        {editableAchievements.map((ach, index) => (
          <div key={index} className="flex items-start gap-3">
            <div
              className="w-2 h-2 mt-2 rounded-full  flex-shrink-0"
              style={{
                backgroundColor: theme.colors.primaryCyan,
              }}
            />
            {isEditing ? (
              <input
                type="text"
                className="text-base text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 w-full"
                value={ach}
                onChange={(e) => handleAchievementChange(index, e.target.value)}
              />
            ) : (
              <p className="text-base text-gray-300">{ach}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
