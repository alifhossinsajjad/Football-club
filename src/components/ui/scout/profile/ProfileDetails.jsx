import React from "react";
import { useSelector } from "react-redux";

import { Calendar, Flag, MapPin, Ruler, Weight } from "lucide-react";
import Image from "next/image";

import PlayerTitle from "@/components/player/playerTitle";

export default function ProfileDetails({ scoutPlayerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const profileData = scoutPlayerProfileData?.profile || {};

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
                  "/player/profile/profile.png"
                }
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1 text-white">
            <div className="flex flex-col md:flex-row items-start justify-between mb-6">
              <div>
                <PlayerTitle title={profileData.name} />

                <p className=" text-basemd:text-xl text-gray-300">
                  {profileData.position}
                </p>

                <p className="text-base text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> {profileData.location}
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
                {profileData.status}
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

                <p className="text-xs md:text-base">{profileData.age}</p>
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

                <p className="text-xs md:text-base">{profileData.height}</p>
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

                <p className="text-xs md:text-base ">{profileData.weight}</p>
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
                  {profileData.nationality}
                </p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-8 text-left text-base">
              <div className="text-xs md:text-base">
                <p className="text-[#ffffff66] ">Preferred Foot</p>

                <p>{profileData.preferredFoot}</p>
              </div>
              <div className="text-xs md:text-base">
                <p className="text-gray-400 ">Date of Birth</p>

                <p>{profileData.dateOfBirth}</p>
              </div>
              <div className="text-xs md:text-base">
                <p className="text-gray-400 ">Jersey Number</p>

                <p>{profileData.jerseyNumber}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
