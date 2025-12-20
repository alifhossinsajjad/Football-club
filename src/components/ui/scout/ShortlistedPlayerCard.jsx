import React from "react";
import { Star } from "lucide-react";

export default function ShortlistedPlayerCard({
  image = "/placeholder.png",
  title = "Unknown",
  role = "-",
  nationality = "-",
  nationFlag = "",
  age = "-",
  theme = {
    colors: {
      backgroundDark: "#0B0D2C",
      primaryCyan: "#04B5A3",
    },
  },
}) {
  return (
    <div
      className="border rounded-lg p-4 space-y-5 hover:opacity-80 transition-all"
      style={{
        backgroundColor: theme.colors.backgroundDark,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* image and title */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-15 h-15 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={title}
            />
          </div>
          <div>
            <h3 className="text-white font-bold">{title}</h3>
            <p className="text-gray-400">{role}</p>
          </div>
        </div>
        <Star className="text-[#00E5FF] w-5 h-5" />
      </div>

      {/* nationality */}
      <div className="flex justify-between items-center text-gray-300">
        <p>Nationality:</p>
        <p>
          {nationFlag} {nationality}
        </p>
      </div>

      {/* age */}
      <div className="flex justify-between items-center text-gray-300">
        <p>Age:</p>
        <p>{age}</p>
      </div>

      {/* button */}
      <div
        className="rounded-md py-2 text-center cursor-pointer hover:opacity-90"
        style={{
          backgroundColor: theme.colors.primaryCyan,
        }}
      >
        <button className="text-white text-sm font-semibold">View Full Profile</button>
      </div>
    </div>
  );
}
