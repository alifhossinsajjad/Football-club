import React from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function PlayerProfilePlayingHistory({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
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
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-6 ">
        {[
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
        ].map((item) => (
          <div
            key={item.club}
            className="flex items-center justify-between py-3 border-b last:border-0 p-4  rounded-md"
            style={{
              borderColor: `${theme.colors.primaryCyan}33`,
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <div className="flex flex-col gap-2 w-full">
              <div className="flex justify-between  ">
                <p className="font-medium text-white">{item.club}</p>
                {item.years && (
                  <p
                    className="text-sm  text-gray-400 py-1"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  >
                    {item.years}
                  </p>
                )}
              </div>
              {item.note && (
                <p className="text-sm text-gray-400">{item.note}</p>
              )}
              {item.description && (
                <p className="text-sm text-gray-400">{item.description}</p>
              )}
            </div>
          </div>
        ))}
      </div>
      
      {isEditing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <SquarePen className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
