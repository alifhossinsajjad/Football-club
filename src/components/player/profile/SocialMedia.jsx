import { Facebook, Instagram, SquarePen, Twitter, Youtube } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function SocialMedia({ playerProfileData, isEditing, updatePlayerProfileData }) {
  const theme = useSelector((state) => state.theme);
  
  // Get social media data from playerProfileData or use defaults
  const initialSocialMedia = playerProfileData.socialMedia || {
    instagram: "@souravdebnath_10",
    twitter: "@souravdebnath_10",
    facebook: "@souravdebnath_10",
    youtube: "Sourav Debnath Football"
  };
  
  // Local state for editable social media
  const [editableSocialMedia, setEditableSocialMedia] = useState(initialSocialMedia);
  
  // Handle social media changes
  const handleSocialMediaChange = (platform, value) => {
    const updatedSocialMedia = {
      ...editableSocialMedia,
      [platform]: value
    };
    
    setEditableSocialMedia(updatedSocialMedia);
    
    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ socialMedia: updatedSocialMedia });
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
        <h3 className="text-lg font-bold text-white">Social Media</h3>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>
      <div className="space-y-4 text-base">
        <div className="flex items-center gap-3">
          <Instagram className="w-5 h-5 text-[#FF0000]" />
          {isEditing ? (
            <input
              type="text"
              className="text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={editableSocialMedia.instagram}
              onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
            />
          ) : (
            <span className="text-gray-300">{initialSocialMedia.instagram}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Twitter
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          {isEditing ? (
            <input
              type="text"
              className="text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={editableSocialMedia.twitter}
              onChange={(e) => handleSocialMediaChange('twitter', e.target.value)}
            />
          ) : (
            <span className="text-gray-300">{initialSocialMedia.twitter}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Facebook
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          {isEditing ? (
            <input
              type="text"
              className="text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={editableSocialMedia.facebook}
              onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
            />
          ) : (
            <span className="text-gray-300">{initialSocialMedia.facebook}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Youtube className="w-5 h-5 text-[#FF0000]" />
          {isEditing ? (
            <input
              type="text"
              className="text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
              value={editableSocialMedia.youtube}
              onChange={(e) => handleSocialMediaChange('youtube', e.target.value)}
            />
          ) : (
            <span className="text-gray-300">{initialSocialMedia.youtube}</span>
          )}
        </div>
      </div>
    </div>
  );
}
