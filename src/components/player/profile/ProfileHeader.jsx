import React from "react";
import { useSelector } from "react-redux";
import PlayerTitle from "../playerTitle";
import { Calendar, Flag, MapPin, Ruler, Weight } from "lucide-react";
import Image from "next/image";

export default function ProfileHeader() {
  const theme = useSelector((state) => state.theme);
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
            <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full  overflow-hidden">
              <Image
                alt="John Doe"
                width={400}
                height={400}
                src="/player/profile/profile.png"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Main Info */}
          <div className="flex-1 text-white">
            <div className="flex items-start justify-between mb-6">
              <div>
                <PlayerTitle title="John Doe" />
                <p className="text-xl text-gray-300">Forward / Striker</p>
                <p className="text-base text-gray-500 flex items-center gap-2">
                  <MapPin className="w-4 h-4" /> Manchester, United Kingdom
                </p>
              </div>
              <div
                className="px-4 py-2 rounded-sm text-sm font-medium"
                style={{
                  backgroundColor: `${theme.colors.backgroundDark}`,
                  color: theme.colors.primaryCyan,
                }}
              >
                Available
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
                <p className="text-base ">17 years</p>
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
                <p className="text-base ">5'11" (180 cm)</p>
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
                <p className="text-base ">165 lbs (75 kg)</p>
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
                <p className="text-base   gap-2">British</p>
              </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 xl:grid-cols-3 gap-6 mt-8 text-left text-base">
              <div>
                <p className="text-gray-400 ">Preferred Foot</p>
                <p>Right</p>
              </div>
              <div>
                <p className="text-gray-400 ">Date of Birth</p>
                <p>15/03/2008</p>
              </div>
              <div>
                <p className="text-gray-400 ">Jersey Number</p>
                <p>#10</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
