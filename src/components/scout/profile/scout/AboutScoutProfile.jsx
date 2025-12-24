import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { SquarePen } from "lucide-react";

export default function AboutScoutProfile({ playerProfileData, isEditing, updateScoutProfileData }) {
  const theme = useSelector((state) => state.theme);

  // about text
  const initialAboutText =
    playerProfileData.profile.about ||
    "Highly experienced and dedicated professional football scout with over 20 years in talent identification and player development. Specialized in youth scouting, technical analysis, and international talent discovery. Successfully identified and recommended numerous players who have gone on to play at the highest levels of European football. Known for meticulous attention to detail, strong networking capabilities, and an exceptional eye for raw talent.";

  const [aboutText, setAboutText] = useState(initialAboutText);

  const handleAboutChange = (e) => {
    const value = e.target.value;
    setAboutText(value);
    if (updateScoutProfileData) {
      updateScoutProfileData({ profile: { ...playerProfileData.profile, about: value } });
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
          value={aboutText}
          onChange={handleAboutChange}
          className="w-full p-3 rounded-lg text-white bg-[#1a2238] border border-[#00c4cc]33 focus:outline-none focus:ring-2 focus:ring-[#00c4cc]"
          rows="6"
        />
      ) : (
        <p className="text-gray-300 leading-relaxed">{initialAboutText}</p>
      )}
    </div>
  );
}
