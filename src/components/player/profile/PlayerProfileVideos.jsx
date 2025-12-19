"use client";

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Upload, Play, SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function HighlightVideosSection({ playerProfileData, isEditing, updatePlayerProfileData }) {
  const theme = useSelector((state) => state.theme);
  
  // Get video data from playerProfileData or use defaults
  const initialVideos = playerProfileData.videos || [
    {
      id: 1,
      src: "/player/profile/highlight1.jpg",
      alt: "Season Highlights 2024/25 - Part 1",
      title: "Season Highlights 2024/25 - Part 1",
      duration: "3:45 minutes"
    },
    {
      id: 2,
      src: "/player/profile/highlight2.jpg",
      alt: "Season Highlights 2024/25 - Part 2",
      title: "Season Highlights 2024/25 - Part 2",
      duration: "3:45 minutes"
    }
  ];
  
  // Local state for editable videos
  const [editableVideos, setEditableVideos] = useState(initialVideos);
  
  // Handle video changes
  const handleVideoChange = (id, field, value) => {
    const updatedVideos = editableVideos.map(video => 
      video.id === id ? { ...video, [field]: value } : video
    );
    
    setEditableVideos(updatedVideos);
    
    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ videos: updatedVideos });
    }
  };

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
        {editableVideos.map((video) => (
          <div key={video.id} className="relative group cursor-pointer rounded-lg overflow-hidden">
            <Image
              width={400}
              height={400}
              src={video.src}
              alt={video.alt}
              className="w-full object-cover"
            />
            <div className="absolute inset-0  flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Play className="w-16 h-16 text-white" />
            </div>
            <div className="mt-3">
              {isEditing ? (
                <input
                  type="text"
                  className="text-white font-medium bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 w-full"
                  value={video.title}
                  onChange={(e) => handleVideoChange(video.id, 'title', e.target.value)}
                />
              ) : (
                <p className="text-white font-medium">{video.title}</p>
              )}
              {isEditing ? (
                <input
                  type="text"
                  className="text-sm text-gray-400 bg-transparent border-b border-gray-600 focus:outline-none focus:border-cyan-500 w-full"
                  value={video.duration}
                  onChange={(e) => handleVideoChange(video.id, 'duration', e.target.value)}
                />
              ) : (
                <p className="text-sm text-gray-400">{video.duration}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
