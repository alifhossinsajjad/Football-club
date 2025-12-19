"use client";

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Upload, Play } from "lucide-react";
import Image from "next/image";

export default function HighlightVideosSection() {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="p-6 rounded-xl border max-w-6xl"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl  text-white flex items-center gap-2">
          Highlight Videos
        </h2>
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
    </div>
  );
}
