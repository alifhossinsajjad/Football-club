import { Button } from "@/components/ui/button";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

export default function ProfileCover({
  scoutPlayerProfileData,

  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);
  const fileInputRef = useRef(null);
  const router = useRouter();
  // Get cover image from playerProfileData or use default
  const coverImage =
    scoutPlayerProfileData.coverImage || "/player/profile/profileBanner.png";

  // Handle cover image change
  const handleCoverImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        // Update the parent state with new cover image
        if (updatePlayerProfileData) {
          updatePlayerProfileData({ coverImage: event.target.result });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      <img
        src={coverImage}
        alt="Cover"
        className="w-full h-64 lg:h-96 object-cover object-top"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/5 via-black/1 to-transparent" />

      {/* Hidden file input for cover image */}
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/*"
        onChange={handleCoverImageChange}
      />

      {/* Action Buttons */}
      <div className="absolute top-4 left-4 flex gap-3 z-20">
        <Button
          className={`rounded-md hover:opacity-80 text-white transition-all`}
          variant="outline"
          style={{
            backgroundColor: theme.colors.backgroundDark,
          }}
          onClick={() => router.push("/scout/player-discovery")}
        >
          <ChevronLeft
            style={{ color: theme.colors.primaryCyan }}
            className="w-4 text-white h-4 mr-2"
          />
          Back to Directory
        </Button>
      </div>
    </div>
  );
}
