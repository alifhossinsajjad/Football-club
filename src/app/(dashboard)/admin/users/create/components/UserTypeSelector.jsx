"use client";

import { useSelector } from "react-redux";
import { User, Building2, Target, CheckCircle } from "lucide-react";

export default function UserTypeSelector({ selectedType, onTypeChange }) {
  const theme = useSelector((state) => state.theme);

  const userTypes = [
    {
      id: "player",
      icon: User,
      title: "Player",
      description: "Young talent looking for opportunities",
    },
    {
      id: "club",
      icon: Building2,
      title: "Club/Academy",
      description: "Football club or training academy",
    },
    {
      id: "scout",
      icon: Target,
      title: "Scout/Agent",
      description: "Talent scout or player agent",
    },
  ];

  return (
    <div
      className="rounded-lg border p-6 mb-8"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h3 className="text-xl font-semibold text-white mb-6">
        Select User Type
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {userTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;

          return (
            <button
              key={type.id}
              onClick={() => onTypeChange(type.id)}
              className="rounded-lg border p-6 text-left transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: isSelected
                  ? theme.colors.primaryCyan
                  : `${theme.colors.primaryCyan}33`,
              }}
            >
              <Icon
                className="w-8 h-8 mb-3"
                style={{ color: theme.colors.primaryCyan }}
              />
              <h4 className="text-lg font-semibold text-white mb-1">
                {type.title}
              </h4>
              <p className="text-gray-400 text-sm mb-3">{type.description}</p>
              {isSelected && (
                <div
                  className="flex items-center gap-2 text-sm"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Selected</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}