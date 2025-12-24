import { Facebook, Instagram, SquarePen, Twitter, Youtube } from "lucide-react";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input"; // Custom Input

export default function PlayerSocialMedia({
  scoutPlayerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  const initialSocialMedia = scoutPlayerProfileData.socialMedia || {
    instagram: "@johndoe_10",
    twitter: "@johndoe_10",
    facebook: "John Doe",
    youtube: "John Doe Football",
  };

  const [editableSocialMedia, setEditableSocialMedia] =
    useState(initialSocialMedia);

  const handleSocialMediaChange = (platform, value) => {
    const updatedSocialMedia = {
      ...editableSocialMedia,
      [platform]: value,
    };

    setEditableSocialMedia(updatedSocialMedia);

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
      <div className="space-y-6 text-base">
        <div className="flex items-center gap-3">
          <Instagram className="w-5 h-5 text-pink-500" />
          {isEditing ? (
            <Input
              value={editableSocialMedia.instagram}
              onChange={(e) =>
                handleSocialMediaChange("instagram", e.target.value)
              }
            />
          ) : (
            <span className="text-gray-300">
              {initialSocialMedia.instagram}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Twitter
            className="w-5 h-5"
            style={{ color: theme.colors.primaryCyan }}
          />
          {isEditing ? (
            <Input
              value={editableSocialMedia.twitter}
              onChange={(e) =>
                handleSocialMediaChange("twitter", e.target.value)
              }
            />
          ) : (
            <span className="text-gray-300">{initialSocialMedia.twitter}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Facebook className="w-5 h-5 text-blue-600" />
          {isEditing ? (
            <Input
              value={editableSocialMedia.facebook}
              onChange={(e) =>
                handleSocialMediaChange("facebook", e.target.value)
              }
            />
          ) : (
            <span className="text-gray-300">{initialSocialMedia.facebook}</span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <Youtube className="w-5 h-5 text-red-600" />
          {isEditing ? (
            <Input
              value={editableSocialMedia.youtube}
              onChange={(e) =>
                handleSocialMediaChange("youtube", e.target.value)
              }
            />
          ) : (
            <span className="text-gray-300">{initialSocialMedia.youtube}</span>
          )}
        </div>
      </div>
    </div>
  );
}
