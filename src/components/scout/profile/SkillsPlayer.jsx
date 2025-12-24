import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input"; // Custom Input

export default function SkillsPlayer({
  scoutPlayerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  // Get skills data from scoutPlayerProfileData or use defaults
  const initialSkills = scoutPlayerProfileData.skills || [
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
      value: parseInt(value) || 0,
    };

    setEditableSkills(updatedSkills);

    if (updatePlayerProfileData) {
      updatePlayerProfileData({ skills: updatedSkills });
    }
  };

  // Handle skill name changes
  const handleSkillNameChange = (index, name) => {
    const updatedSkills = [...editableSkills];
    updatedSkills[index] = {
      ...updatedSkills[index],
      skill: name,
    };

    setEditableSkills(updatedSkills);

    if (updatePlayerProfileData) {
      updatePlayerProfileData({ skills: updatedSkills });
    }
  };

  // Handle adding new skill
  const handleAddSkill = () => {
    const newSkill = { skill: "New Skill", value: 50 };
    const updatedSkills = [...editableSkills, newSkill];
    setEditableSkills(updatedSkills);
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ skills: updatedSkills });
    }
  };

  // Handle removing skill
  const handleRemoveSkill = (index) => {
    const updatedSkills = editableSkills.filter((_, i) => i !== index);
    setEditableSkills(updatedSkills);
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
          <div className="flex gap-2">
            <button
              onClick={handleAddSkill}
              className="p-2 rounded-full hover:bg-white/10 transition-colors"
              style={{ color: theme.colors.primaryCyan }}
              title="Add Skill"
            >
              <Plus className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <SquarePen className="w-4 h-4 text-gray-400" />
            </button>
          </div>
        )}
      </div>
      <div className="space-y-4">
        {editableSkills.map(({ skill, value }, index) => (
          <div key={index} className="group relative">
            <div className="flex justify-between mb-1 items-center">
              <div className="flex items-center gap-2 flex-1">
                {isEditing ? (
                  <>
                    <Input
                      value={skill}
                      onChange={(e) =>
                        handleSkillNameChange(index, e.target.value)
                      }
                      className="text-white flex-1 border-none"
                      style={{
                        backgroundColor: theme.colors.backgroundCard,
                      }}
                    />
                    <button
                      onClick={() => handleRemoveSkill(index)}
                      className="text-red-500 hover:text-red-400 p-1 opacity-0 group-hover:opacity-100 transition"
                      title="Remove"
                      style={{
                        backgroundColor: theme.colors.backgroundCard,
                      }}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </>
                ) : (
                  <span className="text-white">{skill}</span>
                )}
              </div>

              {isEditing ? (
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={value}
                  onChange={(e) => handleSkillChange(index, e.target.value)}
                  className="w-20 text-right "
                />
              ) : (
                <span className="text-gray-400 ml-4">{value}</span>
              )}
            </div>
            <div className="w-[99%] mx-2 bg-gray-800 rounded-full h-3  ">
              <div
                className="h-3 rounded-full  transition-all duration-300"
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
