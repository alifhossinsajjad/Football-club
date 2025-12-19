import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import PlayerTitle from "../playerTitle";
import {
  Calendar,
  Flag,
  MapPin,
  Ruler,
  Weight,
  Upload,
  SquarePen,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input"; // Custom Input
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/player/select"; // Your custom Select
import { Button } from "@/components/ui/button";

export default function ProfileHeader({
  playerProfileData,
  isEditing,
  updateProfileField,
}) {
  const theme = useSelector((state) => state.theme);
  const profileData = playerProfileData.profile;
  const fileInputRef = useRef(null);

  // Local state for editable fields
  const [editableProfileData, setEditableProfileData] = useState(profileData);

  // Handle input changes
  const handleInputChange = (field, value) => {
    setEditableProfileData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (updateProfileField) {
      updateProfileField(field, value);
    }
  };

  // Handle profile image change
  const handleProfileImageChange = (e) => {
    const file = e.target.files[0];
    if (file && updateProfileField) {
      const reader = new FileReader();
      reader.onload = (event) => {
        updateProfileField("profileImage", event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return isEditing ? (
    <div className="relative px-6 xl:px-20">
      <div
        className="rounded-2xl p-6 lg:p-8 border -mt-32 lg:-mt-48"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Profile Photo */}
          <div className="relative flex flex-col items-center">
            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-transparent">
              <Image
                alt={profileData.name}
                width={400}
                height={400}
                src={
                  playerProfileData.profileImage ||
                  "/player/profile/profile.png"
                }
                className="w-full h-full object-cover"
              />
            </div>

            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              accept="image/*"
              onChange={handleProfileImageChange}
            />

            {isEditing && (
              <Button
                variant="ghost"
                onClick={triggerFileInput}
                className="relative -bottom-3  -translate-x-1/5 flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  color: theme.colors.primaryCyan,
                }}
              >
                <Upload className="w-4 h-4" />
                Upload Photo
              </Button>
            )}

            {isEditing && (
              <p className="text-xs text-gray-400 text-center mt-6 max-w-xs">
                Please upload a recent, high-quality portrait photo (clear face,
                no sunglasses/caps, minimum 800x800px).
              </p>
            )}
          </div>

          {/* Main Info */}
          <div className="flex-1 text-white flex flex-col gap-6">
            {/* Name & Position */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Full Name</p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <PlayerTitle title={profileData.name} />
                )}
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Position</p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.position}
                    onChange={(e) =>
                      handleInputChange("position", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-xl font-medium">{profileData.position}</p>
                )}
              </div>
            </div>

            {/* Location & Availability */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Location</p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.location}
                    onChange={(e) =>
                      handleInputChange("location", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    {profileData.location}
                  </p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">
                  Availability Status
                </p>
                {isEditing ? (
                  <Select
                    value={editableProfileData.status}
                    onValueChange={(value) =>
                      handleInputChange("status", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Available">Available</SelectItem>
                      <SelectItem value="Not Available">
                        Not Available
                      </SelectItem>
                      <SelectItem value="Open to Offers">
                        Open to Offers
                      </SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <div
                    className="px-4 py-3 rounded-lg text-sm font-medium inline-block"
                    style={{
                      backgroundColor: `${theme.colors.primaryCyan}20`,
                      color: theme.colors.primaryCyan,
                    }}
                  >
                    {profileData.status}
                  </div>
                )}
              </div>
            </div>

            {/* Personal Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> Date of Birth
                </p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                  />
                ) : (
                  <p className="font-medium">{profileData.dateOfBirth}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Ruler className="w-4 h-4" /> Height (cm)
                </p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                  />
                ) : (
                  <p className="font-medium">{profileData.height}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Weight className="w-4 h-4" /> Weight (kg)
                </p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.weight}
                    onChange={(e) =>
                      handleInputChange("weight", e.target.value)
                    }
                  />
                ) : (
                  <p className="font-medium">{profileData.weight}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2 flex items-center gap-2">
                  <Flag className="w-4 h-4" /> Nationality
                </p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                  />
                ) : (
                  <p className="font-medium">{profileData.nationality}</p>
                )}
              </div>
            </div>

            {/* Preferred Foot & Jersey Number */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2">Preferred Foot</p>
                {isEditing ? (
                  <Select
                    value={editableProfileData.preferredFoot}
                    onValueChange={(value) =>
                      handleInputChange("preferredFoot", value)
                    }
                  >
                    <SelectTrigger className="h-12">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Right">Right</SelectItem>
                      <SelectItem value="Left">Left</SelectItem>
                      <SelectItem value="Both">Both</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  <p className="font-medium">{profileData.preferredFoot}</p>
                )}
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Jersey Number</p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.jerseyNumber}
                    onChange={(e) =>
                      handleInputChange("jerseyNumber", e.target.value)
                    }
                  />
                ) : (
                  <p className="font-medium">{profileData.jerseyNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="relative   px-6 xl:px-20">
      <div
        className="rounded-2xl p-6 lg:p-8 border -mt-32 lg:-mt-48"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Profile Photo */}
          <div className=" ">
            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full  overflow-hidden relative">
              <Image
                alt={profileData.name}
                width={400}
                height={400}
                src={
                  playerProfileData.profileImage ||
                  "/player/profile/profile.png"
                }
                className="w-full h-full object-cover"
              />
              {/* Hidden file input for profile image */}
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={handleProfileImageChange}
              />
              {isEditing && (
                <div
                  className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full cursor-pointer"
                  onClick={triggerFileInput}
                >
                  <button className="p-2 rounded-full bg-white/20 backdrop-blur-sm">
                    <SquarePen className="w-6 h-6 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1 text-white">
            <div className="flex items-start justify-between mb-6">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-2xl font-bold text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 mb-2"
                    value={editableProfileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                  />
                ) : (
                  <PlayerTitle title={profileData.name} />
                )}
                {isEditing ? (
                  <input
                    type="text"
                    className="text-xl text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 mb-2"
                    value={editableProfileData.position}
                    onChange={(e) =>
                      handleInputChange("position", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-xl text-gray-300">
                    {profileData.position}
                  </p>
                )}
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <input
                      type="text"
                      className="text-base text-gray-500 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                      value={editableProfileData.location}
                      onChange={(e) =>
                        handleInputChange("location", e.target.value)
                      }
                    />
                  </div>
                ) : (
                  <p className="text-base text-gray-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {profileData.location}
                  </p>
                )}
              </div>
              {isEditing ? (
                <input
                  type="text"
                  className="px-4 py-2 rounded-sm text-sm font-medium bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                  style={{
                    backgroundColor: `${theme.colors.backgroundDark}`,
                    color: theme.colors.primaryCyan,
                  }}
                  value={editableProfileData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                />
              ) : (
                <div
                  className="px-4 py-2 rounded-sm text-sm font-medium"
                  style={{
                    backgroundColor: `${theme.colors.backgroundDark}`,
                    color: theme.colors.primaryCyan,
                  }}
                >
                  {profileData.status}
                </div>
              )}
            </div>

            {/* Personal Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-3 2xl:grid-cols-4 gap-6 text-left">
              <div
                className="text-left p-4 rounded-md flex flex-col  gap-2 "
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <p className="text-gray-400 text-base items-center flex gap-2">
                  <span>
                    <Calendar className="w-4 h-4" />
                  </span>{" "}
                  Age
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-base bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                ) : (
                  <p className="text-base ">{profileData.age}</p>
                )}
              </div>
              <div
                className="text-left p-4 rounded-md flex flex-col  gap-2 "
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <p className="text-gray-400 text-base items-center flex gap-2">
                  {" "}
                  <span>
                    <Ruler className="w-4 h-4" />
                  </span>{" "}
                  Height
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-base bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.height}
                    onChange={(e) =>
                      handleInputChange("height", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-base ">{profileData.height}</p>
                )}
              </div>
              <div
                className="text-left p-4 rounded-md flex flex-col  gap-2 "
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <p className="text-gray-400 text-base items-center flex gap-2">
                  <span>
                    <Weight className="w-4 h-4" />
                  </span>{" "}
                  Weight
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-base bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.weight}
                    onChange={(e) =>
                      handleInputChange("weight", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-base ">{profileData.weight}</p>
                )}
              </div>
              <div
                className="text-left p-4 rounded-md flex flex-col  gap-2 "
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <p className="text-gray-400 text-base items-center flex gap-2">
                  <span>
                    <Flag className="w-4 h-4" />
                  </span>{" "}
                  Nationality
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-base bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.nationality}
                    onChange={(e) =>
                      handleInputChange("nationality", e.target.value)
                    }
                  />
                ) : (
                  <p className="text-base   gap-2">{profileData.nationality}</p>
                )}
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-8 text-left text-base">
              <div>
                <p className="text-gray-400 ">Preferred Foot</p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.preferredFoot}
                    onChange={(e) =>
                      handleInputChange("preferredFoot", e.target.value)
                    }
                  />
                ) : (
                  <p>{profileData.preferredFoot}</p>
                )}
              </div>
              <div>
                <p className="text-gray-400 ">Date of Birth</p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.dateOfBirth}
                    onChange={(e) =>
                      handleInputChange("dateOfBirth", e.target.value)
                    }
                  />
                ) : (
                  <p>{profileData.dateOfBirth}</p>
                )}
              </div>
              <div>
                <p className="text-gray-400 ">Jersey Number</p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-white bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.jerseyNumber}
                    onChange={(e) =>
                      handleInputChange("jerseyNumber", e.target.value)
                    }
                  />
                ) : (
                  <p>{profileData.jerseyNumber}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
