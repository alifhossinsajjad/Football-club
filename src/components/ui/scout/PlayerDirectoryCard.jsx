"use client";

import React, { useState } from "react";
import { MessageSquare, Star } from "lucide-react";
import Image from "next/image";
import PlayerInteractionModal from "./modals/PlayerInteractionModal";
import { Button } from "../button";

export default function PlayerDirectoryCard({
  image = "/placeholder.png",
  name = "Unknown",
  position = "-",
  nationality = "-",
  flag = "",
  age = "-",
  rating = "-",
  highlightVideo = null,
  currentClub = "-",
  onViewProfile,
  theme = {
    colors: {
      backgroundCard: "#0F1129",
      backgroundDark: "#0B0D2C",
      primaryCyan: "#04B5A3",
    },
  },
}) {
  const hasHighlightVideo = highlightVideo && highlightVideo !== "null";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div
      className="rounded-xl p-6 border space-y-4 transition-all hover:shadow-xl"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Header: Image, Name, Position, Star */}
      <div className="flex justify-between items-start">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primaryCyan/50">
            <Image
              src={image}
              alt={name}
              width={64}
              height={64}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h3 className="text-white font-bold text-lg">{name}</h3>
            <p className="text-gray-400 text-sm">{position}</p>
          </div>
        </div>
        <Star className="w-6 h-6 text-primaryCyan fill-primaryCyan" />
      </div>

      {/* Nationality */}
      <div className="flex justify-between text-gray-300">
        <span>Nationality:</span>
        <span className="flex items-center gap-2">
          {flag && <span className="text-2xl">{flag}</span>}
          {nationality}
        </span>
      </div>

      {/* Age */}
      <div className="flex justify-between text-gray-300">
        <span>Age:</span>
        <span>{age}</span>
      </div>

      {/* Rating */}
      <div className="flex justify-between text-gray-300">
        <span>Rating:</span>
        <span className="text-primaryCyan font-bold">{rating}/100</span>
      </div>

      {/* Highlight Video */}
      <div className="flex justify-between text-gray-300">
        <span>Highlight Video:</span>
        {hasHighlightVideo ? (
          <span className="text-green-400 font-medium">Available</span>
        ) : (
          <span className="text-gray-500">Not available</span>
        )}
      </div>

      {/* Current Club */}
      <div className="flex justify-between text-gray-300">
        <span>Current Club:</span>
        <span className="text-[#05DF72]">{currentClub}</span>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-4">
        <Button
          variant="common"
          onClick={onViewProfile}
          className="flex-1 py-3 rounded-lg font-medium text-white transition-all"
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
        <PlayerInteractionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          player={{
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
