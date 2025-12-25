import React, { useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Calendar,
  Flag,
  MapPin,
  Ruler,
  Weight,
  Upload,
  SquarePen,
  CalendarRange,
  Users,
  Trophy,
  Plus,
} from "lucide-react";
import Image from "next/image";
import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import PlayerTitle from "@/components/player/playerTitle";
import ChatModal from "@/components/ui/modals/ChatModal";

export default function ScoutProfileHeader({
  playerProfileData,
  isEditing,
  updateProfileField,
  showMessageButton = false,
}) {
  const theme = useSelector((state) => state.theme);
  const profileData = playerProfileData.profile;
  const fileInputRef = useRef(null);
  const [messageModalOpen, setMessageModalOpen] = useState(false);

  // Local state for editable fields
  const [editableProfileData, setEditableProfileData] = useState(profileData);
  console.log(editableProfileData);

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
            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-green-500">
              <Image
                alt={profileData.name}
                width={400}
                height={400}
                src={editableProfileData.image}
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
                className="relative -bottom-3 -translate-x-1/5 flex items-center gap-2 px-4 py-2 rounded-sm text-sm font-medium whitespace-nowrap"
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
            <div className="grid grid-cols-1  gap-6">
              <div>
                <p className="text-sm text-gray-400 mb-2 cols">Full Name</p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    style={{
                      backgroundColor: `#1A2049`,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                ) : (
                  <PlayerTitle title={profileData.name} />
                )}
              </div>

              <div>
                <p className="text-sm text-gray-400 mb-2">Professional Title</p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.role}
                    onChange={(e) =>
                      handleInputChange("position", e.target.value)
                    }
                    style={{
                      backgroundColor: `#1A2049`,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                ) : (
                  <p className="text-xl font-medium">{profileData.role}</p>
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
                    style={{
                      backgroundColor: `#1A2049`,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                ) : (
                  <p className="text-lg flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-gray-400" />
                    {profileData.location}
                  </p>
                )}
              </div>
              {/* Preferred Foot & Jersey Number */}
              <div className="">
                <p className="text-sm text-gray-400 mb-2">Experience</p>
                {isEditing ? (
                  <Input
                    value={editableProfileData.experience}
                    onChange={(e) =>
                      handleInputChange("jerseyNumber", e.target.value)
                    }
                    className="w-full"
                    style={{
                      backgroundColor: `#1A2049`,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
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
                src={playerProfileData.image || "/Scout/martinez.png"}
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
          <div className="flex-1 text-white max-w-lg mx-auto">
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
                    {profileData.role}
                  </p>
                )}
              </div>
            </div>

            {/* Personal Stats Grid */}
            <div className="grid grid-cols-2  gap-6 text-left">
              <div className="text-left   rounded-md flex   gap-2 ">
                <p className="text-gray-400 justify-center text-base items-center flex gap-2">
                  <MapPin
                    className="w-6 h-6"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-base bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                ) : (
                  <div className="text-base flex ">
                    <div className="">
                      <p className="text-sm mt-1 text-gray-400">Location</p>
                      <p className="text-base ">{profileData.location}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-left   rounded-md flex   gap-2 ">
                <p className="text-gray-400 justify-center text-base items-center flex gap-2">
                  <CalendarRange
                    className="w-6 h-6"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-base bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                ) : (
                  <div className="text-base flex ">
                    <div className="">
                      <p className="text-sm mt-1 text-gray-400">Joined</p>
                      <p className="text-base ">{profileData.joined}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-left   rounded-md flex   gap-2 ">
                <p className="text-gray-400 justify-center text-base items-center flex gap-2">
                  <Users
                    className="w-6 h-6"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-base bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                ) : (
                  <div className="text-base flex ">
                    <div className="">
                      <p className="text-sm mt-1 text-gray-400">Connection</p>
                      <p className="text-base ">{profileData.connections}</p>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-left   rounded-md flex   gap-2 ">
                <p className="text-gray-400 justify-center text-base items-center flex gap-2">
                  <Trophy
                    className="w-6 h-6"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  />
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    className="text-base bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                    value={editableProfileData.age}
                    onChange={(e) => handleInputChange("age", e.target.value)}
                  />
                ) : (
                  <div className="text-base flex ">
                    <div className="">
                      <p className="text-sm mt-1 text-gray-400">Experience</p>
                      <p className="text-base ">
                        {profileData.experience} Years
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Send Message && Add To Network Button */}

            {showMessageButton && (
              <div className="mt-6 flex gap-12">
                <Button
                  variant="common"
                  onClick={() => setMessageModalOpen(true)}
                  className="rounded-sm px-7 py-4 text-base font-normal"
                >
                  Send Message
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsEditing(!isEditing)}
                  className="rounded-md px-7 py-4 text-base font-normal"
                >
                  Add To Network
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
      {messageModalOpen && (
        <ChatModal
          isOpen={messageModalOpen}
          onClose={() => setMessageModalOpen(false)}
          player={playerProfileData.profile}
        />
      )}
    </div>
  );
}
