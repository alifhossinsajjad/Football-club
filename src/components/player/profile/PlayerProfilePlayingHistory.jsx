import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen, Plus, X, Trash, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input"; // Custom Input
import { Button } from "@/components/ui/button";

export default function PlayerProfilePlayingHistory({
  playerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  // Get history data from playerProfileData or use defaults
  const initialHistory = playerProfileData.playingHistory || [
    {
      club: "Manchester United Youth Academy",
      years: "2023 - Present",
      note: "Forward",
      description: "FA Youth Cup Runner-up 2024",
    },
    {
      club: "England U-18 National Team",
      years: "2024 - Present",
      note: "Forward",
      description: "8 Caps, 5 Goals",
    },
    {
      club: "City Football Academy",
      years: "2020 - 2023",
      note: "Forward",
      description: "Regional Champions 2020",
    },
  ];

  // Local state for editable history
  const [editableHistory, setEditableHistory] = useState(initialHistory);

  // Handle history item changes
  const handleHistoryChange = (index, field, value) => {
    const updatedHistory = [...editableHistory];
    updatedHistory[index] = {
      ...updatedHistory[index],
      [field]: value,
    };

    setEditableHistory(updatedHistory);

    if (updatePlayerProfileData) {
      updatePlayerProfileData({ playingHistory: updatedHistory });
    }
  };

  // Handle adding new history
  const handleAddHistory = () => {
    const newHistory = {
      club: "New Club/Team Name",
      years: "Period (e.g. 2021 - Present)",
      note: "Role/Position",
      description: "Achievements",
    };
    const updatedHistory = [...editableHistory, newHistory];
    setEditableHistory(updatedHistory);
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ playingHistory: updatedHistory });
    }
  };

  // Handle removing history
  const handleRemoveHistory = (index) => {
    const updatedHistory = editableHistory.filter((_, i) => i !== index);
    setEditableHistory(updatedHistory);
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ playingHistory: updatedHistory });
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
        <h2 className="text-xl font-bold text-white">Playing History</h2>
        {isEditing && (
          <Button
            onClick={handleAddHistory}
            className="rounded-full"
            style={{ backgroundColor: theme.colors.primaryCyan }}
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Entry
          </Button>
        )}
      </div>
      <div className="space-y-6">
        {editableHistory.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg relative group"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              border: `1px solid ${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="space-y-3 ">
              {/* Club Name */}
              <div className="flex gap-4 ">
                {isEditing ? (
                  <>
                    <Input
                      background={theme.colors.backgroundCard}
                      value={item.club}
                      onChange={(e) =>
                        handleHistoryChange(index, "club", e.target.value)
                      }
                      className="font-medium text-white text-lg"
                    />
                    {/* Delete button - right side, visible on hover in edit mode */}
                    <button
                      onClick={() => handleRemoveHistory(index)}
                      className=" text-red-500 bg-[#FF00001A]  hover:text-red-400 p-3 rounded-lg opacity-0 group-hover:opacity-100 transition"
                      title="Remove"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </>
                ) : (
                  <p className="font-medium text-white text-lg">{item.club}</p>
                )}
              </div>

              {/* Years & Role Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  {isEditing ? (
                    <Input
                      background={theme.colors.backgroundCard}
                      value={item.years}
                      onChange={(e) =>
                        handleHistoryChange(index, "years", e.target.value)
                      }
                      className="text-sm"
                      placeholder="Period (e.g. 2021 - Present)"
                    />
                  ) : (
                    <p
                      className="text-sm"
                      style={{ color: theme.colors.primaryCyan }}
                    >
                      {item.years}
                    </p>
                  )}
                </div>
                <div>
                  {isEditing ? (
                    <Input
                      background={theme.colors.backgroundCard}
                      value={item.note}
                      onChange={(e) =>
                        handleHistoryChange(index, "note", e.target.value)
                      }
                      className="text-sm text-gray-400"
                      placeholder="Role/Position"
                    />
                  ) : (
                    <p className="text-sm text-gray-400">{item.note}</p>
                  )}
                </div>
              </div>

              {/* Description / Achievements */}
              <div>
                {isEditing ? (
                  <Input
                    background={theme.colors.backgroundCard}
                    value={item.description}
                    onChange={(e) =>
                      handleHistoryChange(index, "description", e.target.value)
                    }
                    className="text-sm text-gray-400"
                    placeholder="Achievements"
                  />
                ) : item.description ? (
                  <p className="text-sm text-gray-400">{item.description}</p>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
