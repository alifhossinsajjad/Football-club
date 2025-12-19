import { Button } from "@/components/ui/button";
import { SquarePen, Upload } from "lucide-react";
import React, { useRef } from "react";
import { useSelector } from "react-redux";

export default function PlayerProfileCover({
  playerProfileData,
  setIsEditing,
  isEditing,
  updatePlayerProfileData
}) {
  const theme = useSelector((state) => state.theme);
  const fileInputRef = useRef(null);
  
  // Get cover image from playerProfileData or use default
  const coverImage = playerProfileData.coverImage || "/player/profile/profileBanner.png";

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

  // Trigger file input click
  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="relative rounded-xl overflow-hidden">
      <img
        src={coverImage}
        alt="Cover"
        className="w-full h-64 lg:h-96 object-cover"
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
      <div className="absolute top-4 right-4 flex gap-3">
        <Button
          className="rounded-md bg-white hover:bg-white/90 transition-all"
          variant="outline"
          style={{
            color: theme.colors.primaryCyan,
          }}
          onClick={() => setIsEditing(!isEditing)}
        >
          <SquarePen className="w-4 h-4 mr-2" />{" "}
          {isEditing ? "Save Changes" : "Edit Profile"}
        </Button>
        <Button
          variant="outline"
          className="rounded-md"
          style={{ backgroundColor: theme.colors.primaryCyan }}
          onClick={() => console.log("Boost Profile clicked")}
        >
          <Upload className="w-4 h-4 mr-2" />
          Boost Profile
        </Button>
      </div>

      {/* Edit overlay for cover photo */}
      {isEditing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl cursor-pointer" onClick={triggerFileInput}>
          <div className="text-center">
            <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm mb-2">
              <SquarePen className="w-6 h-6 text-white" />
            </button>
            <p className="text-white text-sm">Click to change cover image</p>
          </div>
        </div>
      )}
    </div>
  );
}
