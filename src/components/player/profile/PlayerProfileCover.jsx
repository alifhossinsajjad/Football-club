import { Button } from "@/components/ui/button";
import { SquarePen, Upload } from "lucide-react";
import React from "react";
import { useSelector } from "react-redux";

export default function PlayerProfileCover() {
  const theme = useSelector((state) => state.theme);
  return (
    <div className="relative rounded-xl overflow-hidden">
      <img
        src="/player/profile/profileBanner.png"
        alt="Cover"
        className="w-full h-64 lg:h-96 object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/1 to-transparent" />

      {/* Action Buttons */}
      <div className="absolute top-4 right-4 flex gap-3">
        <Button
          className="rounded-md bg-white hover:bg-white/90 transition-all"
          variant="outline"
          style={{
            color: theme.colors.primaryCyan,
          }}
        >
          <SquarePen className="w-4 h-4 mr-2" /> Edit Profile
        </Button>
        <Button
          variant="outline"
          className="rounded-md"
          style={{ backgroundColor: theme.colors.primaryCyan }}
        >
          <Upload className="w-4 h-4 mr-2" />
          Boost Profile
        </Button>
      </div>
    </div>
  );
}
