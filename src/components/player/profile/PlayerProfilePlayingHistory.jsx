import React, { useState } from "react";
import { useSelector } from "react-redux";
import { SquarePen } from "lucide-react";

export default function PlayerProfilePlayingHistory({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
  // Local state for editable history
  const [history, setHistory] = useState([
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
  ]);
  
  // Handler for updating history items
  const handleHistoryChange = (index, field, value) => {
    const updatedHistory = [...history];
    updatedHistory[index][field] = value;
    setHistory(updatedHistory);
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
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-6 ">
        {history.map((item, index) => (
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
                {isEditing ? (
                  <input
                    type="text"
                    className="font-medium text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={item.club}
                    onChange={(e) => handleHistoryChange(index, 'club', e.target.value)}
                  />
                ) : (
                  <p className="font-medium text-white">{item.club}</p>
                )}
                {item.years && (
                  isEditing ? (
                    <input
                      type="text"
                      className="text-sm text-gray-400 py-1 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                      style={{
                        color: theme.colors.primaryCyan,
                      }}
                      value={item.years}
                      onChange={(e) => handleHistoryChange(index, 'years', e.target.value)}
                    />
                  ) : (
                    <p
                      className="text-sm  text-gray-400 py-1"
                      style={{
                        color: theme.colors.primaryCyan,
                      }}
                    >
                      {item.years}
                    </p>
                  )
                )}
              </div>
              {item.note && (
                isEditing ? (
                  <input
                    type="text"
                    className="text-sm text-gray-400 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={item.note}
                    onChange={(e) => handleHistoryChange(index, 'note', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-400">{item.note}</p>
                )
              )}
              {item.description && (
                isEditing ? (
                  <input
                    type="text"
                    className="text-sm text-gray-400 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={item.description}
                    onChange={(e) => handleHistoryChange(index, 'description', e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-400">{item.description}</p>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
