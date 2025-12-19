"use client";

import { useSelector } from "react-redux";
import ProfileHeader from "@/components/player/profile/ProfileHeader";
import AboutPlayerProfile from "@/components/player/profile/AboutPlayerProfile";
import CareerStatistics from "@/components/player/profile/CareerStatistics";
import SocialMedia from "@/components/player/profile/SocialMedia";
import ContactInformation from "@/components/player/profile/ContactInformation";
import PlayerAchievements from "@/components/player/profile/PlayerAchievements";
import PlayerProfileInsights from "@/components/player/profile/PlayerProfileInsights";
import PlayerProfilePreference from "@/components/player/profile/PlayerProfilePreference";
import HighlightVideosSection from "@/components/player/profile/PlayerProfileVideos";
import PlayerProfileCover from "@/components/player/profile/PlayerProfileCover";
import { useState } from "react";
import PlayerProfileSkills from "@/components/player/profile/PlayerProfileSkills";
import PlayerProfilePlayingHistory from "@/components/player/profile/PlayerProfilePlayingHistory";

export default function PlayerProfilePage() {
  const theme = useSelector((state) => state.theme);
  const [isEditing, setIsEditing] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  const handleEditProfile = () => {
    setIsEditingProfile(true);
    setIsEditing(false);
    setIsBoosting(false);
  };

  const handleBoostProfile = () => {
    setIsBoosting(true);
    setIsEditing(false);
    setIsEditingProfile(false);
  };
  const handleEdit = () => {
    setIsEditing(true);
    setIsBoosting(false);
    setIsEditingProfile(false);
  };
  const handleCancel = () => {
    setIsEditing(false);
    setIsBoosting(false);
    setIsEditingProfile(false);
  };
  const handleBoost = () => {
    setIsBoosting(false);
    setIsEditing(false);
    setIsEditingProfile(false);
    console.log("Boost Profile");
  };

  return (
    <div className="space-y-8 ">
      {/* Cover Photo with Trophies */}
      <PlayerProfileCover isEditing={isEditing} />
      {/* Profile Header Card */}
      <ProfileHeader isEditing={isEditing} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <AboutPlayerProfile isEditing={isEditing} />
          {/* Career Statistics */}
          <CareerStatistics isEditing={isEditing} />
          {/* Skills & Attributes */}
          <PlayerProfileSkills isEditing={isEditing} />
          {/* Playing History */}
          <PlayerProfilePlayingHistory isEditing={isEditing} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Contact Information */}
          <ContactInformation isEditing={isEditing} />

          {/* Social Media */}
          <SocialMedia isEditing={isEditing} />

          {/* Achievements */}
          <PlayerAchievements isEditing={isEditing} />

          {/* Profile Insights */}
          <PlayerProfileInsights isEditing={isEditing} />

          {/* Preferences */}
          <PlayerProfilePreference isEditing={isEditing} />
        </div>
      </div>

      {/* Highlights Videos */}
      <HighlightVideosSection isEditing={isEditing} />
    </div>
  );
}
