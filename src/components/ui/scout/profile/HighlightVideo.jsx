"use client";

import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Upload, Play, Plus, Trash2, SquarePen } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Input } from "@/components/ui/input"; // Custom Input

export default function HighlightVideo({
  scoutPlayerProfileData,
  isEditing,
  updatePlayerProfileData,
}) {
  const theme = useSelector((state) => state.theme);

  // Get video data from scoutPlayerProfileData or use defaults
  const initialVideos = scoutPlayerProfileData.videos || [
    {
      id: 1,
      src: "/player/profile/highlight1.jpg",
      alt: "Season Highlights 2024/25 - Part 1",
      title: "Season Highlights 2024/25 - Part 1",
      duration: "3:45 minutes",
    },
    {
      id: 2,
      src: "/player/profile/highlight2.jpg",
      alt: "Season Highlights 2024/25 - Part 2",
      title: "Season Highlights 2024/25 - Part 2",
      duration: "3:45 minutes",
    },
  ];

  // Local state for editable videos
  const [editableVideos, setEditableVideos] = useState(initialVideos);

  // Handle video changes
  const handleVideoChange = (id, field, value) => {
    const updatedVideos = editableVideos.map((video) =>
      video.id === id ? { ...video, [field]: value } : video
    );

    setEditableVideos(updatedVideos);

    // Update the parent state
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ videos: updatedVideos });
    }
  };

  // Handle adding new video
  const handleAddVideo = () => {
    const newVideo = {
      id: Date.now(),
      src: "/player/profile/highlight1.jpg", // Default placeholder
      alt: "New Video",
      title: "New Video",
      duration: "0:00 minutes",
    };
    const updatedVideos = [...editableVideos, newVideo];
    setEditableVideos(updatedVideos);
    if (updatePlayerProfileData) {
      updatePlayerProfileData({ videos: updatedVideos });
    }
  };

  // Handle removing video
  const handleRemoveVideo = (id) => {
    const updatedVideos = editableVideos.filter((v) => v.id !== id);
    setEditableVideos(updatedVideos);
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
        <h2 className="text-xl text-white flex items-center gap-2">
          Highlight Videos
        </h2>
        {isEditing && (
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleAddVideo}
              className="p-2  hover:bg-white/10 transition-colors text-green-500"
              title="Add Video"
            >
              <Upload className="w-4 h-4" /> Upload Video
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {editableVideos.map((video) => (
          <div
            key={video.id}
            className="relative group cursor-pointer rounded-lg overflow-hidden"
          >
            {isEditing && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveVideo(video.id);
                }}
                className="absolute top-2 right-2 z-10 text-red-500 bg-black/50 hover:bg-black/70 rounded-full p-1"
                title="Remove"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <Image
              width={400}
              height={400}
              src={video.src}
              alt={video.alt}
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
              <Play className="w-16 h-16 text-white" />
            </div>
            <div className="mt-3">
              {isEditing ? (
                <Input
                  value={video.title}
                  onChange={(e) =>
                    handleVideoChange(video.id, "title", e.target.value)
                  }
                  className="font-medium text-white"
                />
              ) : (
                <p className="text-white font-medium">{video.title}</p>
              )}
              {isEditing ? (
                <Input
                  value={video.duration}
                  onChange={(e) =>
                    handleVideoChange(video.id, "duration", e.target.value)
                  }
                  className="text-sm text-gray-400 mt-2"
                />
              ) : (
                <p className="text-sm text-gray-400 mt-2">{video.duration}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
