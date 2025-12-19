import { Eye, MessageSquare, SquarePen, Users } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function PlayerProfileInsights({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
  // Local state for editable insights
  const [insights, setInsights] = useState({
    profileViews: 342,
    profileViewsChange: "+124 this week",
    scoutViews: 87,
    scoutViewsChange: "+35 this week",
    clubInterest: "16 clubs",
    clubInterestChange: "+8 new this month"
  });
  
  // Handler for updating insights
  const handleInsightChange = (field, value) => {
    setInsights(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
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
          {isEditing ? (
            <input
              type="number"
              className="text-white font-medium bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 text-right"
              value={insights.profileViews}
              onChange={(e) => handleInsightChange('profileViews', parseInt(e.target.value) || 0)}
            />
          ) : (
            <span className="text-white font-medium">{insights.profileViews}</span>
          )}
        </div>
        <div
          className="  text-[#05DF72]  border-b-2 pb-4 "
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          {isEditing ? (
            <input
              type="text"
              className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={insights.profileViewsChange}
              onChange={(e) => handleInsightChange('profileViewsChange', e.target.value)}
            />
          ) : (
            insights.profileViewsChange
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Scout Views</span>
          </div>
          {isEditing ? (
            <input
              type="number"
              className="text-white font-medium bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 text-right"
              value={insights.scoutViews}
              onChange={(e) => handleInsightChange('scoutViews', parseInt(e.target.value) || 0)}
            />
          ) : (
            <span className="text-white font-medium">{insights.scoutViews}</span>
          )}
        </div>
        <div
          className="  text-[#05DF72]  border-b-2 pb-4 "
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          {isEditing ? (
            <input
              type="text"
              className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={insights.scoutViewsChange}
              onChange={(e) => handleInsightChange('scoutViewsChange', e.target.value)}
            />
          ) : (
            insights.scoutViewsChange
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-gray-300">Club Interest</span>
          </div>
          {isEditing ? (
            <input
              type="text"
              className="text-white font-medium bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 text-right"
              value={insights.clubInterest}
              onChange={(e) => handleInsightChange('clubInterest', e.target.value)}
            />
          ) : (
            <span className="text-white font-medium">{insights.clubInterest}</span>
          )}
        </div>
        <div className=" text-[#05DF72] ">
          {isEditing ? (
            <input
              type="text"
              className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={insights.clubInterestChange}
              onChange={(e) => handleInsightChange('clubInterestChange', e.target.value)}
            />
          ) : (
            insights.clubInterestChange
          )}
        </div>
      </div>
    </div>
  );
}
