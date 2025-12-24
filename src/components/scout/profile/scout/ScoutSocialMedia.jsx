"use client";

import { Instagram, Twitter, Facebook, Youtube, SquarePen } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function ScoutSocialMedia({ playerProfileData, isEditing, updatePlayerProfileData }) {
  const theme = useSelector((state) => state.theme);

  const socialMedia = playerProfileData?.profile?.socialMedia || {
    instagram: "@mthompson_scout",
    twitter: "@MThompsonScout",
    facebook: "Michael Thompson",
    youtube: "MT Scouting Analysis",
    linkedin: "Scout Profile",
  };

  const [socialData, setSocialData] = useState(socialMedia);

  const platforms = [
    {
      icon: Instagram,
      color: "text-pink-500",
      iconColor: "#E4405F",
      bg: "bg-pink-500/20",
      field: "instagram",
      placeholder: "Instagram handle",
    },
    {
      icon: Twitter,
      color: "text-cyan-400",
      iconColor: "#1DA1F2",
      bg: "bg-cyan-400/20",
      field: "twitter",
      placeholder: "Twitter handle",
    },
    {
      icon: Facebook,
      color: "text-blue-600",
      iconColor: "#4267B2",
      bg: "bg-blue-600/20",
      field: "facebook",
      placeholder: "Facebook handle",
    },
    {
      icon: Youtube,
      color: "text-red-600",
      iconColor: "#FF0000",
      bg: "bg-red-600/20",
      field: "youtube",
      placeholder: "YouTube handle",
    },
    {
      icon: SquarePen, // Using SquarePen as placeholder for LinkedIn
      color: "text-blue-500",
      iconColor: "#0077B5",
      bg: "bg-blue-500/20",
      field: "linkedin",
      placeholder: "LinkedIn profile",
    },
  ];

  const handleSocialChange = (field, value) => {
    const updatedSocial = { ...socialData, [field]: value };
    setSocialData(updatedSocial);
    
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ 
        profile: { 
          ...playerProfileData.profile, 
          socialMedia: updatedSocial 
        } 
      });
    }
  };

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h2 className="text-2xl font-bold text-primaryCyan mb-6">Social Media</h2>

      <div className="space-y-5">
        {platforms.map((platform, i) => (
          <div
            key={i}
            className="flex items-center gap-5 shadow-lg border py-4 rounded-lg"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div
              className="w-20 h-12 rounded-xl flex items-center justify-center  "
              style={{ backgroundColor: platform.bg }}
            >
              <platform.icon
                className="w-10 h-10 "
                style={{ color: platform.iconColor }}
              />
            </div>
            {isEditing ? (
              <Input
                value={socialData[platform.field]}
                onChange={(e) => handleSocialChange(platform.field, e.target.value)}
                placeholder={platform.placeholder}
                className="text-gray-300 font-medium text-lg bg-transparent border-0 focus:ring-0"
              />
            ) : (
              <span className="text-gray-300 font-medium text-lg">
                {socialData[platform.field]}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
