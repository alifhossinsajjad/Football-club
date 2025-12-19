import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function SocialMedia() {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h3 className="text-lg font-bold text-white mb-4">Social Media</h3>
      <div className="space-y-4 text-base">
        <div className="flex items-center gap-3">
          <Instagram className="w-5 h-5 text-[#FF0000]" />
          <span className="text-gray-300">@johndoe_10</span>
        </div>
        <div className="flex items-center gap-3">
          <Twitter
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <span className="text-gray-300">@johndoe_10</span>
        </div>
        <div className="flex items-center gap-3">
          <Facebook
            className="w-5 h-5 text-gray-400"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <span className="text-gray-300">@johndoe_10</span>
        </div>
        <div className="flex items-center gap-3">
          <Youtube className="w-5 h-5 text-[#FF0000]" />
          <span className="text-gray-300">John Doe Football</span>
        </div>
      </div>
    </div>
  );
}
