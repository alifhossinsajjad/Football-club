import React from "react";
import { useSelector } from "react-redux";

export default function AboutProfile({ scoutPlayerProfileData }) {
  const theme = useSelector((state) => state.theme);

  // about text
  const initialAboutText = scoutPlayerProfileData.about;

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
      </div>

      <p className="text-gray-300 leading-relaxed">{initialAboutText}</p>
    </div>
  );
}
