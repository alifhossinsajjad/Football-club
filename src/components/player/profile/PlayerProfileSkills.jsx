import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function PlayerProfileSkills({ playerProfileData, isEditing, updatePlayerProfileData }) {
  const theme = useSelector((state) => state.theme);
  
  // Get skills data from playerProfileData or use defaults
  const initialSkills = playerProfileData.skills || [
    { skill: "Pace", value: 92 },
    { skill: "Shooting", value: 88 },
    { skill: "Dribbling", value: 90 },
    { skill: "Passing", value: 85 },
    { skill: "Physical", value: 82 },
    { skill: "Technical", value: 89 },
  ];
  
  // Local state for editable skills
  const [editableSkills, setEditableSkills] = useState(initialSkills);
  
  // Handle skill value changes
  const handleSkillChange = (index, value) => {
    const updatedSkills = [...editableSkills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      value: parseInt(value) || 0
    };
    
    setEditableSkills(updatedSkills);
    
    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ skills: updatedSkills });
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
        <h2 className="text-xl font-bold text-white">Skills & Attributes</h2>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-4">
        {editableSkills.map(({ skill, value }, index) => (
          <div key={skill}>
            <div className="flex justify-between mb-1">
              <span className="text-white">{skill}</span>
              {isEditing ? (
                <input
                  type="number"
                  min="0"
                  max="100"
                  className="text-gray-400 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 w-12 text-right"
                  value={value}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                />
              ) : (
                <span className="text-gray-400">{value}</span>
              )}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3">
              <div
                className="h-3 rounded-full"
                style={{
                  width: `${value}%`,
                  backgroundColor: theme.colors.primaryCyan,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
