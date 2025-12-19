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
  
  // Centralized player profile data state
  const [playerProfileData, setPlayerProfileData] = useState({
    isEditing: false,
    isBoosting: false,
    isEditingProfile: false,
    // Add other profile data here as needed
    profile: {
      name: "John Doe",
      position: "Forward / Striker",
      location: "Manchester, United Kingdom",
      status: "Available",
      age: "17 years",
      height: "5'11 (180 cm)",
      weight: "165 lbs (75 kg)",
      nationality: "British",
      preferredFoot: "Right",
      dateOfBirth: "15/03/2008",
      jerseyNumber: "#10"
    }
  });

  const handleEditProfile = () => {
    setPlayerProfileData(prev => ({
      ...prev,
      isEditingProfile: true,
      isEditing: false,
      isBoosting: false
    }));
  };

  const handleBoostProfile = () => {
    setPlayerProfileData(prev => ({
      ...prev,
      isBoosting: true,
      isEditing: false,
      isEditingProfile: false
    }));
  };

  const handleEdit = () => {
    setPlayerProfileData(prev => ({
      ...prev,
      isEditing: true,
      isBoosting: false,
      isEditingProfile: false
    }));
  };

  const handleCancel = () => {
    setPlayerProfileData(prev => ({
      ...prev,
      isEditing: false,
      isBoosting: false,
      isEditingProfile: false
    }));
  };

  const handleBoost = () => {
    setPlayerProfileData(prev => ({
      ...prev,
      isBoosting: false,
      isEditing: false,
      isEditingProfile: false
    }));
    console.log("Boost Profile");
  };

  return (
    <div className="space-y-8 ">
      {/* Cover Photo with Trophies */}
      <PlayerProfileCover playerProfileData={playerProfileData} />
      {/* Profile Header Card */}
      <ProfileHeader playerProfileData={playerProfileData} />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <AboutPlayerProfile playerProfileData={playerProfileData} />
          {/* Career Statistics */}
          <CareerStatistics playerProfileData={playerProfileData} />
          {/* Skills & Attributes */}
          <PlayerProfileSkills playerProfileData={playerProfileData} />
          {/* Playing History */}
          <PlayerProfilePlayingHistory playerProfileData={playerProfileData} />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Contact Information */}
          <ContactInformation playerProfileData={playerProfileData} />

          {/* Social Media */}
          <SocialMedia playerProfileData={playerProfileData} />

          {/* Achievements */}
          <PlayerAchievements playerProfileData={playerProfileData} />

          {/* Profile Insights */}
          <PlayerProfileInsights playerProfileData={playerProfileData} />

          {/* Preferences */}
          <PlayerProfilePreference playerProfileData={playerProfileData} />
        </div>
      </div>

      {/* Highlights Videos */}
      <HighlightVideosSection playerProfileData={playerProfileData} />
    </div>
  );
}
