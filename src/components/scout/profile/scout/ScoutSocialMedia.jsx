"use client";

import { Instagram, Twitter, Facebook, Youtube } from "lucide-react";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function ScoutSocialMedia({
  playerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  const socialMedia = playerProfileData?.profile?.socialMedia || {
    instagram: "@mthompson_scout",
    twitter: "@MThompsonScout",
    facebook: "Michael Thompson",
    youtube: "MT Scouting Analysis",
  };

  const [socialData, setSocialData] = useState(socialMedia);

  const platforms = [
    {
      name: "Instagram",
      icon: Instagram,
      iconColor: "#E4405F",
      field: "instagram",
      placeholder: "Instagram handle",
    },
    {
      name: "Twitter",
      icon: Twitter,
      iconColor: "#1DA1F2",
      field: "twitter",
      placeholder: "Twitter handle",
    },
    {
      name: "Facebook",
      icon: Facebook,
      iconColor: "#4267B2",
      field: "facebook",
      placeholder: "Facebook profile",
    },
    {
      name: "YouTube",
      icon: Youtube,
      iconColor: "#FF0000",
      field: "youtube",
      placeholder: "YouTube channel",
    },
  ];

  const handleSocialChange = (field, value) => {
    const updated = { ...socialData, [field]: value };
    setSocialData(updated);

    updatePlayerProfileData?.({
      profile: {
        ...playerProfileData.profile,
        socialMedia: updated,
      },
    });
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

      <div className="space-y-6">
        {platforms.map((platform, i) => (
          <div key={i}>
            {/* EDIT MODE */}
            {isEditing ? (
              <>
                {/* LABEL WITH ICON */}
                <div className="flex items-center gap-2 mb-2">
                  <platform.icon
                    className="w-4 h-4"
                    style={{ color: platform.iconColor }}
                  />
                  <label className="text-sm text-gray-400">
                    {platform.name}
                  </label>
                </div>

                {/* INPUT */}
                <Input
                  value={socialData[platform.field]}
                  onChange={(e) =>
                    handleSocialChange(platform.field, e.target.value)
                  }
                  placeholder={platform.placeholder}
                  className="text-gray-300 bg-transparent"
                />
              </>
            ) : (
              /* VIEW MODE */
              <div
                className="flex items-center gap-5 shadow-lg border py-4 px-5 rounded-lg"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              >
                <div className="w-16 flex items-center justify-center">
                  <platform.icon
                    className="w-8 h-8"
                    style={{ color: platform.iconColor }}
                  />
                </div>

                <span className="text-gray-300 font-medium text-lg">
                  {socialData[platform.field]}
                </span>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
