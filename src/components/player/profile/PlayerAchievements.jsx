import { Award, SquarePen, Plus, X, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";

export default function PlayerAchievements({
  playerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  const initialAchievements = playerProfileData.achievements || [
    "Player of the Month - March 2025",
    "Top Scorer U-18 League 2024",
    "England Youth Call-Up 2024",
    "FA Youth Cup Finalist 2024",
    "Academy Player of the Year 2023",
  ];

  const [editableAchievements, setEditableAchievements] =
    useState(initialAchievements);

  const handleAchievementChange = (index, value) => {
    const updatedAchievements = [...editableAchievements];
    updatedAchievements[index] = value;

    setEditableAchievements(updatedAchievements);

    if (updatePlayerProfileData) {
      updatePlayerProfileData({ achievements: updatedAchievements });
    }
  };

  const handleAddAchievement = () => {
    const updatedAchievements = [...editableAchievements, ""];
    setEditableAchievements(updatedAchievements);
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ achievements: updatedAchievements });
    }
  };

  const handleRemoveAchievement = (index) => {
    const updatedAchievements = editableAchievements.filter(
      (_, i) => i !== index
    );
    setEditableAchievements(updatedAchievements);
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
        <h3 className="text-xl text-white flex items-center gap-2">
          <Award
            className="w-5 h-5"
            style={{ color: theme.colors.primaryCyan }}
          />
          Achievements
        </h3>
        {isEditing && (
          <div className="flex gap-2">
            <button
              onClick={handleAddAchievement}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              style={{ color: theme.colors.primaryCyan }}
              title="Add Achievement"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <SquarePen className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-3">
        {editableAchievements.map((ach, index) => (
          <div key={index} className="flex items-start gap-3 group">
            <div
              className="w-2 h-2 mt-2 rounded-full flex-shrink-0"
              style={{
                backgroundColor: theme.colors.primaryCyan,
              }}
            />
            {isEditing ? (
              <div className="flex-1 flex gap-2 items-center">
                <Input
                  value={ach}
                  onChange={(e) =>
                    handleAchievementChange(index, e.target.value)
                  }
                  placeholder="Achievement title"
                />
                <button
                  onClick={() => handleRemoveAchievement(index)}
                  className=" text-red-500 bg-[#FF00001A]  hover:text-red-400 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition"
                  title="Remove"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <p className="text-base text-gray-300">{ach}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
