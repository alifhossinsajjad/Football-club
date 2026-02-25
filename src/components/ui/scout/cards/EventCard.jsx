"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Euro, Map, MapPin, User, Users } from "lucide-react";

export default function EventCard({
  image,
  title,
  type,
  date,
  time,
  location,
  organizer,
  entryFee,
  spots,
  totalSpots,
  featured = false,
  onRegister,
  onViewDetails,
  organizerLogo,
  duration,
  theme,
}) {
  return (
    <div
      className="rounded-xl overflow-hidden border transition-all hover:shadow-2xl relative"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Event Image */}
      <div className="relative h-64">
        {/* Padding Wrapper */}
        <div className="h-full p-4">
          {/* Rounded + Clip Wrapper */}
          <div className="relative h-full rounded-2xl overflow-hidden">
            <Image src={image} alt={title} fill className="object-cover" />

            {/* Featured Badge */}
            {featured && (
              <div className="absolute top-4 right-4 z-10 px-6 py-1 rounded-full text-sm font-medium text-white bg-[#00E5FF]">
                Featured
              </div>
            )}

            {/* Type Badge */}
            <div
              className="absolute top-4 left-4 px-4 py-1 rounded-full text-sm font-medium"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                color: theme.colors.primaryCyan,
              }}
            >
              {type}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <h3 className="text-xl font-bold text-white">{title}</h3>

        <div className="flex gap-2 items-center border-b pb-4">
          <Image
            src={organizerLogo}
            alt={organizer}
            height={200}
            width={200}
            className="w-16 h-16 rounded-full"
          />
          <div className="">
            <p
              className={`text-md font-medium text-[${theme.colors.primaryCyan}]`}
            >
              {organizer}
            </p>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-gray-400" />
              <p className="text-xs text-gray-400">{location}</p>
            </div>
          </div>
        </div>

        <div className=" text-sm text-gray-300 flex  gap-8">
          <div>
            <p className="flex gap-2 ">
              <Calendar
                className="w-4 h-4"
                style={{
                  color: theme.colors.primaryCyan,
                }}
              />
              <p>Date and Time</p>
            </p>
            <p className="text-base py-2">{date}</p>
            <p className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-gray-400" /> {time}
            </p>
          </div>
          <div>
            <div className="flex gap-2 items-center ">
              <Euro className="w-4 h-4 text-[#dde004] font-bold " />
              <p className=""> Entry Fee</p>
            </div>
            <p className="flex items-center gap-2 text-base py-2">
              {" "}
              {entryFee}
            </p>
          </div>
        </div>

        {/* Entry Fee & Spots */}
        <div className="flex flex-col gap-2">
          <div className="flex ">
            <Users className="w-4 h-4 text-gray-400 inline-block mr-2" />
            <p className="text-xs text-gray-400">
              {totalSpots - spots} / {totalSpots} Scout Registered
            </p>
          </div>
          <div className="">
            <p className="text-xs text-gray-400">Location</p>
            <p
              className="text-base "
              style={{
                color: theme.colors.primaryCyan,
              }}
            >
              {location}
            </p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="common"
            onClick={onRegister}
            className="w-1/2 rounded-lg py-3 font-medium"
          >
            Register Now
          </Button>
          <Button
            onClick={onViewDetails}
            variant="outline"
            className="px-6 rounded-lg w-1/2"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
