"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Users, Calendar, Trophy, MapPin, MessageSquare } from "lucide-react";
import { useState } from "react";
import ClubInteractionModal from "../modals/ClubInteractionModal";

export default function ClubDirectoryCard({
  logo,
  name,
  location,
  playersCount,
  established,
  recentAchievement,
  onViewDetails,
  image,
  theme,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div
      className="rounded-xl p-6 border space-y-6 transition-all hover:shadow-xl"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Club Logo & Name */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-lg overflow-hidden border-2 border-primaryCyan/30">
            <Image
              src={logo}
              alt={name}
              width={80}
              height={80}
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">{name}</h3>
            <p className="text-gray-400 flex items-center gap-2 text-sm">
              <MapPin className="w-4 h-4" />
              {location}
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center gap-3 text-gray-300">
          <Users
            className="w-5 h-5 "
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <div>
            <p className="text-gray-400">Players</p>
            <p className="font-medium text-white">{playersCount}</p>
          </div>
        </div>
        <div className="flex items-center gap-3 text-gray-300">
          <Calendar
            className="w-5 h-5"
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <div>
            <p className="text-gray-400">Established</p>
            <p className="font-medium text-white">{established}</p>
          </div>
        </div>
      </div>

      {/* Recent Achievement */}
      <div>
        <p className="text-gray-400 text-sm mb-2">Recent Achievement</p>
        <p className="text-white flex items-center gap-2">
          <Trophy className="w-5 h-5 text-yellow-500" />
          {recentAchievement}
        </p>
      </div>

      {/* View Details Button */}

      <div className="flex gap-3 pt-4">
        <Button
          variant="outline"
          onClick={onViewDetails}
          className="flex-1 py-3 rounded-lg font-medium text-white transition-all"
          style={{ backgroundColor: theme.colors.primaryCyan }}
        >
          View Profile
        </Button>
        <button
          onClick={() => setIsModalOpen(true)}
          className="p-3 rounded-lg border-2 transition-all"
          style={{ borderColor: `${theme.colors.primaryCyan}33` }}
        >
          <MessageSquare
            className="w-5 h-5"
            style={{ color: theme.colors.primaryCyan }}
          />
        </button>
      </div>
      {isModalOpen && (
        <ClubInteractionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          club={{
            name: name,
            image: image,
            status: "Active now",
          }}
          theme={theme}
        />
      )}
    </div>
  );
}
