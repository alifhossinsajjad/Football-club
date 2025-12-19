import { Eye, MessageSquare, Users } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function PlayerProfileInsights() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="p-6 rounded-xl border text-base"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h3 className=" font-bold text-white mb-4">Profile Insights</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Profile Views</span>
          </div>
          <span className="text-white font-medium">342</span>
        </div>
        <div
          className="  text-[#05DF72]  border-b-2 pb-4 "
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          +124 this week
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Scout Views</span>
          </div>
          <span className="text-white font-medium">87</span>
        </div>
        <div
          className="  text-[#05DF72]  border-b-2 pb-4 "
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          +35 this week
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Club Interest</span>
          </div>
          <span className="text-white font-medium">16 clubs</span>
        </div>
        <div className=" text-[#05DF72] ">+8 new this month</div>
      </div>
    </div>
  );
}
