"use client";

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Upload, Play, SquarePen } from "lucide-react";
import Image from "next/image";

export default function HighlightVideosSection({ playerProfileData }) {
  const theme = useSelector((state) => state.theme);
  const { isEditing } = playerProfileData;

  return (
    <div
      className="p-6 rounded-xl border max-w-6xl relative"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl  text-white flex items-center gap-2">
          Highlight Videos
        </h2>
        {isEditing && (
          <button className="p-2 rounded-full hover:bg-white/10 transition-colors">
            <SquarePen className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6  ">
        {/* Video 1 */}
        <div className="relative group cursor-pointer rounded-lg overflow-hidden">
          <Image
            width={400}
            height={400}
            src="/player/profile/highlight1.jpg"
            alt="Season Highlights 2024/25 - Part 1"
            className="w-full object-cover"
          />
          <div className="absolute inset-0  flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Play className="w-16 h-16 text-white" />
          </div>
          <div className="mt-3">
            <p className="text-white font-medium">
              Season Highlights 2024/25 - Part 1
            </p>
            <p className="text-sm text-gray-400">3:45 minutes</p>
          </div>
        </div>

        {/* Video 2 */}
        <div className="relative group cursor-pointer rounded-lg overflow-hidden">
          <Image
            width={400}
            height={400}
            src="/player/profile/highlight2.jpg"
            alt="Season Highlights 2024/25 - Part 2"
            className="w-full object-cover"
          />
          <div className="absolute inset-0  flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <Play className="w-16 h-16 text-white" />
          </div>
          <div className="mt-3">
            <p className="text-white font-medium">
              Season Highlights 2024/25 - Part 2
            </p>
            <p className="text-sm text-gray-400">3:45 minutes</p>
          </div>
        </div>
      </div>
      
      {isEditing && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-xl opacity-0 hover:opacity-100 transition-opacity">
          <button className="p-3 rounded-full bg-white/20 backdrop-blur-sm">
            <SquarePen className="w-6 h-6 text-white" />
          </button>
        </div>
      )}
    </div>
  );
}
