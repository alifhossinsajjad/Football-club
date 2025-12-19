import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function AboutPlayerProfile({
  playerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  // Get about text from playerProfileData or use default
  const initialAboutText =
    playerProfileData.about ||
    "Highly skilled and dedicated forward with exceptional technical " +
      "abilities and a strong goal-scoring record. Known for excellent ball " +
      "control, pace, and tactical awareness. Currently playing for Manchester " +
      "United Youth Academy and representing England U-18 National Team. " +
      "Passionate about developing my skills and pursuing a professional career " +
      "in football at the highest level.";

  // Local state for editable field
  const [editableAboutText, setEditableAboutText] = useState(initialAboutText);

  // Handle textarea changes
  const handleTextareaChange = (e) => {
    const newValue = e.target.value;
    setEditableAboutText(newValue);

    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ about: newValue });
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
        <h2 className="text-xl font-bold text-white">About</h2>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {isEditing ? (
        <textarea
          className="w-full p-3 rounded-md text-gray-300 leading-relaxed"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
          value={editableAboutText}
          onChange={handleTextareaChange}
          rows={6}
        />
      ) : (
        <p className="text-gray-300 leading-relaxed">{initialAboutText}</p>
      )}
    </div>
  );
}
