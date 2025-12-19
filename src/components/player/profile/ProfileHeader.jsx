import React, { useState } from "react";
import { useSelector } from "react-redux";
import PlayerTitle from "../playerTitle";
import { Calendar, Flag, MapPin, Ruler, SquarePen, Weight } from "lucide-react";
import Image from "next/image";

export default function ProfileHeader({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;
  
  // Local state for editable fields
  const [profileData, setProfileData] = useState(playerProfileData.profile);
  
  // Handler for updating profile data
  const handleProfileChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };
  
  return (
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
                alt="John Doe"
                width={400}
                height={400}
                src="/player/profile/profile.png"
                className="w-full h-full object-cover"
              />
              {isEditing && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
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
                    value={profileData.name}
                    onChange={(e) => handleProfileChange('name', e.target.value)}
                  />
                ) : (
                  <PlayerTitle title={profileData.name} />
                )}
                {isEditing ? (
                  <input
                    type="text"
                    className="text-xl text-gray-300 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 mb-2"
                    value={profileData.position}
                    onChange={(e) => handleProfileChange('position', e.target.value)}
                  />
                ) : (
                  <p className="text-xl text-gray-300">{profileData.position}</p>
                )}
                {isEditing ? (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    <input
                      type="text"
                      className="text-base text-gray-500 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                    />
                  </div>
                ) : (
                  <p className="text-base text-gray-500 flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {profileData.location}
                  </p>
                )}
              </div>
              <div
                className="px-4 py-2 rounded-sm text-sm font-medium"
                style={{
                  backgroundColor: `${theme.colors.backgroundDark}`,
                  color: theme.colors.primaryCyan,
                }}
              >
                {profileData.status}
              </div>
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
                    value={profileData.age}
                    onChange={(e) => handleProfileChange('age', e.target.value)}
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
                    value={profileData.height}
                    onChange={(e) => handleProfileChange('height', e.target.value)}
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
                    value={profileData.weight}
                    onChange={(e) => handleProfileChange('weight', e.target.value)}
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
                    value={profileData.nationality}
                    onChange={(e) => handleProfileChange('nationality', e.target.value)}
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
                    value={profileData.preferredFoot}
                    onChange={(e) => handleProfileChange('preferredFoot', e.target.value)}
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
                    value={profileData.dateOfBirth}
                    onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
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
                    value={profileData.jerseyNumber}
                    onChange={(e) => handleProfileChange('jerseyNumber', e.target.value)}
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
