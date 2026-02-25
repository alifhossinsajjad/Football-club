"use client";

import { useState } from "react";
import ProfileCover from "@/components/scout/profile/ProfileCover";
import ProfileDetails from "@/components/scout/profile/ProfileDetails";
import AboutProfile from "@/components/scout/profile/AboutProfile";
import StatisticsPart from "@/components/scout/profile/StatisticsPart";
import SkillsPlayer from "@/components/scout/profile/SkillsPlayer";
import PlayHistory from "@/components/scout/profile/PlayHistory";
import ContactThePlayer from "@/components/scout/profile/ContactThePlayer";
import PlayerSocialMedia from "@/components/scout/profile/PlayerSocialMedia";
import AchievementList from "@/components/scout/profile/AchievementList";
import PlayersProfile from "@/components/scout/profile/PlayersProfile";
import HighlightVideo from "@/components/scout/profile/HighlightVideo";

export default function ScoutPlayerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Boost modal states
  const [boostStep, setBoostStep] = useState(0); // 0: closed, 1: duration, 2: payment, 3: success
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [boostData, setBoostData] = useState({});

  // Centralized player profile data state
  const [scoutPlayerProfileData, setScoutPlayerProfileData] = useState({
    // ... (your full data object from before)
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
      jerseyNumber: "#10",
    },

    coverImage: "/Scout/player-banner.png",
    profileImage: "/player/profile/profile.png",
  });

  const handleBoostProfile = () => {
    setBoostStep(1);
    setIsEditing(false);
  };

  const handleNextFromDuration = () => {
    if (!selectedDuration) return;

    setBoostData({
      duration: selectedDuration.months,
      price: selectedDuration.price,
      startDate: "1 Feb 2025",
      endDate: "1 Mar 2025",
    });
    setBoostStep(2);
  };

  const updatePlayerProfileData = (updates) => {
    setScoutPlayerProfileData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateProfileField = (field, value) => {
    setScoutPlayerProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      <ProfileCover
        scoutPlayerProfileData={scoutPlayerProfileData}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        updatePlayerProfileData={updatePlayerProfileData}
        onBoost={handleBoostProfile}
      />

      <ProfileDetails
        scoutPlayerProfileData={scoutPlayerProfileData}
        isEditing={isEditing}
        updateProfileField={updateProfileField}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AboutProfile
            scoutPlayerProfileData={scoutPlayerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          <StatisticsPart
            scoutPlayerProfileData={scoutPlayerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          <SkillsPlayer
            scoutPlayerProfileData={scoutPlayerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          <PlayHistory
            scoutPlayerProfileData={scoutPlayerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
        </div>

        <div className="space-y-8">
          <ContactThePlayer
            scoutPlayerProfileData={scoutPlayerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          <PlayerSocialMedia
            scoutPlayerProfileData={scoutPlayerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          <AchievementList
            scoutPlayerProfileData={scoutPlayerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          <PlayersProfile
            scoutPlayerProfileData={scoutPlayerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
        </div>
      </div>

      <HighlightVideo
        scoutPlayerProfileData={scoutPlayerProfileData}
        isEditing={isEditing}
        updatePlayerProfileData={updatePlayerProfileData}
      />
    </div>
  );
}
