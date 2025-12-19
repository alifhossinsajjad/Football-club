import React from "react";
import { useSelector } from "react-redux";

export default function PlayerProfilePreference() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h3 className="text-base  font-bold text-white mb-4">Preferences</h3>
      <div className="space-y-4 flex flex-col gap-2">
        <p>
          <div className="text-gray-400 ">Preferred League</div> Premier
          League, Liga Bundesliga
        </p>
        <p>
          <div className="text-gray-400">Contract Status</div> Open to Offers
        </p>
        <p>
          <div className="text-gray-400">Availability</div> Available from
          Summer 2025
        </p>
      </div>
    </div>
  );
}
