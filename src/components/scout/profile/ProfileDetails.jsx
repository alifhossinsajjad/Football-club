import React, { useRef } from "react";
import { useSelector } from "react-redux";

import { Calendar, Flag, MapPin, Ruler, SquarePen, Weight } from "lucide-react";
import Image from "next/image";

import PlayerTitle from "@/components/player/playerTitle";

export default function ProfileDetails({
  scoutPlayerProfileData,
  isEditing,
  updateProfileField,
  setIsEditing,
}) {
  const theme = useSelector((state) => state.theme);
  const profileData = scoutPlayerProfileData?.profile || {};
  const fileInputRef = useRef(null);

  return (
    <div className="relative px-6 xl:px-20">
      <div
        className="rounded-2xl  p-6 lg:p-8 border -mt-32 lg:-mt-38"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Profile Photo */}
          <div className="">
            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full  overflow-hidden relative">
              <Image
                alt={profileData.name}
                width={400}
                height={400}
                src={
                  scoutPlayerProfileData.profileImage ||
                  "/scout/roberto.jpg"
                }
                className="w-full h-full object-cover"
              />
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                accept="image/*"
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = (event) => {
                      if (updateProfileField) {
                        updateProfileField('profileImage', event.target.result);
                      }
                    };
                    reader.readAsDataURL(file);
                  }
                }}
                onClick={(event) => {
                  // Prevent re-rendering issue
                  event.target.value = null;
                }}
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="text-center">
                    <button 
                      className="p-2 rounded-full bg-white/20 backdrop-blur-sm mb-1"
                    >
                      <SquarePen className="w-4 h-4 text-white" />
                    </button>
                    <p className="text-white text-xs">Change photo</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1 text-white">
            <div className="flex flex-col md:flex-row items-start justify-between mb-6">
              <div>
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.name}
                    onChange={(e) => updateProfileField('name', e.target.value)}
                    className="text-2xl md:text-4xl font-bold text-white bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full"
                  />
                ) : (
                  <PlayerTitle title={profileData.name} />
                )}

                <p className=" text-basemd:text-xl text-gray-300">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.position}
                      onChange={(e) => updateProfileField('position', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full text-gray-300"
                    />
                  ) : (
                    profileData.position
                  )}
                </p>

                <p className="text-base text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => updateProfileField('location', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full ml-1"
                    />
                  ) : (
                    profileData.location
                  )}
                </p>
              </div>
              {/* available */}
              <div
                className="px-4 py-2 rounded-sm text-sm font-medium"
                style={{
                  backgroundColor: `${theme.colors.backgroundDark}`,
                  color: theme.colors.primaryCyan,
                }}
              >
                {isEditing ? (
                  <input
                    type="text"
                    value={profileData.status}
                    onChange={(e) => updateProfileField('status', e.target.value)}
                    className="bg-transparent focus:outline-none w-full"
                  />
                ) : (
                  profileData.status
                )}
              </div>
            </div>

            {/* Personal Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4  gap-6 text-left ">
              <div
                className="text-left p-4 rounded-md flex flex-col  gap-2 "
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <p className="text-gray-400 text-xs md:text-base items-center flex gap-2">
                  <span>
                    <Calendar className="w-4 h-4" />
                  </span>
                  Age
                </p>

                <p className="text-xs md:text-base">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.age}
                      onChange={(e) => updateProfileField('age', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full"
                    />
                  ) : (
                    profileData.age
                  )}
                </p>
              </div>
              <div
                className="text-left p-4 rounded-md flex flex-col  gap-2 "
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <p className="text-gray-400 text-xs md:text-base items-center flex gap-2">
                  {" "}
                  <span>
                    <Ruler className="w-4 h-4" />
                  </span>{" "}
                  Height
                </p>

                <p className="text-xs md:text-base">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.height}
                      onChange={(e) => updateProfileField('height', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full"
                    />
                  ) : (
                    profileData.height
                  )}
                </p>
              </div>
              <div
                className="text-left p-4 rounded-md flex flex-col  gap-2 "
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <p className="text-gray-400 text-xs md:text-base items-center flex gap-2">
                  <span>
                    <Weight className="w-4 h-4" />
                  </span>{" "}
                  Weight
                </p>

                <p className="text-xs md:text-base ">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.weight}
                      onChange={(e) => updateProfileField('weight', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full"
                    />
                  ) : (
                    profileData.weight
                  )}
                </p>
              </div>
              <div
                className="text-left p-4 rounded-md flex flex-col  gap-2 "
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <p className="text-gray-400 text-xs md:text-base items-center flex gap-2">
                  <span>
                    <Flag className="w-4 h-4" />
                  </span>{" "}
                  Nationality
                </p>

                <p className="text-xs md:text-base gap-2">
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.nationality}
                      onChange={(e) => updateProfileField('nationality', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full"
                    />
                  ) : (
                    profileData.nationality
                  )}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-8 text-left text-base">
              <div className="text-xs md:text-base">
                <p className="text-[#ffffff66] ">Preferred Foot</p>

                <p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.preferredFoot}
                      onChange={(e) => updateProfileField('preferredFoot', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full"
                    />
                  ) : (
                    profileData.preferredFoot
                  )}
                </p>
              </div>
              <div className="text-xs md:text-base">
                <p className="text-gray-400 ">Date of Birth</p>

                <p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.dateOfBirth}
                      onChange={(e) => updateProfileField('dateOfBirth', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full"
                    />
                  ) : (
                    profileData.dateOfBirth
                  )}
                </p>
              </div>
              <div className="text-xs md:text-base">
                <p className="text-gray-400 ">Jersey Number</p>

                <p>
                  {isEditing ? (
                    <input
                      type="text"
                      value={profileData.jerseyNumber}
                      onChange={(e) => updateProfileField('jerseyNumber', e.target.value)}
                      className="bg-transparent border-b border-gray-500 focus:outline-none focus:border-primaryCyan w-full"
                    />
                  ) : (
                    profileData.jerseyNumber
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
