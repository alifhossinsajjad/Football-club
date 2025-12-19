import { Eye, MessageSquare, SquarePen, Users } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function PlayerProfileInsights({ playerProfileData, isEditing, updatePlayerProfileData }) {
  const theme = useSelector((state) => state.theme);
  
  // Get insights data from playerProfileData or use defaults
  const initialInsights = playerProfileData.insights || {
    profileViews: 342,
    profileViewsChange: "+124 this week",
    scoutViews: 87,
    scoutViewsChange: "+35 this week",
    clubInterest: "16 clubs",
    clubInterestChange: "+8 new this month"
  };
  
  // Local state for editable insights
  const [editableInsights, setEditableInsights] = useState(initialInsights);
  
  // Handle insight changes
  const handleInsightChange = (field, value) => {
    const updatedInsights = {
      ...editableInsights,
      [field]: field.includes('Views') && !field.includes('Change') ? parseInt(value) || 0 : value
    };
    
    setEditableInsights(updatedInsights);
    
    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ insights: updatedInsights });
    }
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
              value={editableInsights.profileViews}
              onChange={(e) => handleInsightChange('profileViews', e.target.value)}
            />
          ) : (
            <span className="text-white font-medium">{initialInsights.profileViews}</span>
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
              value={editableInsights.profileViewsChange}
              onChange={(e) => handleInsightChange('profileViewsChange', e.target.value)}
            />
          ) : (
            initialInsights.profileViewsChange
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
              value={editableInsights.scoutViews}
              onChange={(e) => handleInsightChange('scoutViews', e.target.value)}
            />
          ) : (
            <span className="text-white font-medium">{initialInsights.scoutViews}</span>
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
              value={editableInsights.scoutViewsChange}
              onChange={(e) => handleInsightChange('scoutViewsChange', e.target.value)}
            />
          ) : (
            initialInsights.scoutViewsChange
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
              value={editableInsights.clubInterest}
              onChange={(e) => handleInsightChange('clubInterest', e.target.value)}
            />
          ) : (
            <span className="text-white font-medium">{initialInsights.clubInterest}</span>
          )}
        </div>
        <div className=" text-[#05DF72] ">
          {isEditing ? (
            <input
              type="text"
              className="bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={editableInsights.clubInterestChange}
              onChange={(e) => handleInsightChange('clubInterestChange', e.target.value)}
            />
          ) : (
            initialInsights.clubInterestChange
          )}
        </div>
      </div>
    </div>
  );
}
