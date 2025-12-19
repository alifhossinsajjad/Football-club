import { Eye, MessageSquare, SquarePen, Users } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function PlayerProfileInsights({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
  return (
    <div
      className="p-6 rounded-xl border text-base relative"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className=" font-bold text-white">Profile Insights</h3>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
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
