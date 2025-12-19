"use client";

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
import PlayerProfileSkills from "@/components/player/profile/PlayerProfileSkills";
import PlayerProfilePlayingHistory from "@/components/player/profile/PlayerProfilePlayingHistory";

import BoostDurationModal from "@/components/player/modals/profile/BoostDurationModal";
import BoostPaymentModal from "@/components/player/modals/profile/BoostPaymentModal";
import BoostSuccessModal from "@/components/player/modals/profile/BoostSuccessModal";

import { useState } from "react";

export default function PlayerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Boost modal states
  const [boostStep, setBoostStep] = useState(0); // 0: closed, 1: duration, 2: payment, 3: success
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [boostData, setBoostData] = useState({});

  // Centralized player profile data state
  const [playerProfileData, setPlayerProfileData] = useState({
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
    // ... rest of your data
    coverImage: "/player/profile/profileBanner.png",
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

  const handlePaymentSuccess = () => {
    setBoostStep(3);
  };

  const handleCloseBoost = () => {
    setBoostStep(0);
    setSelectedDuration(null);
  };

  const updatePlayerProfileData = (updates) => {
    setPlayerProfileData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateProfileField = (field, value) => {
    setPlayerProfileData((prev) => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value,
      },
    }));
  };

  return (
    <div className="space-y-8">
      <PlayerProfileCover
        playerProfileData={playerProfileData}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        updatePlayerProfileData={updatePlayerProfileData}
        onBoost={handleBoostProfile}
      />

      <ProfileHeader
        playerProfileData={playerProfileData}
        isEditing={isEditing}
        updateProfileField={updateProfileField}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AboutPlayerProfile
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          <CareerStatistics
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          <PlayerProfileSkills
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          <PlayerProfilePlayingHistory
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
        </div>

        <div className="space-y-8">
          <ContactInformation
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          <SocialMedia
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          <PlayerAchievements
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          {!isEditing && (
            <PlayerProfileInsights playerProfileData={playerProfileData} />
          )}
          <PlayerProfilePreference
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
        </div>
      </div>

      <HighlightVideosSection
        playerProfileData={playerProfileData}
        isEditing={isEditing}
        updatePlayerProfileData={updatePlayerProfileData}
      />

      {/* Boost Modals */}
      <BoostDurationModal
        isOpen={boostStep === 1}
        onClose={handleCloseBoost}
        onNext={handleNextFromDuration}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
      />

      <BoostPaymentModal
        isOpen={boostStep === 2}
        onClose={handleCloseBoost}
        onBack={() => setBoostStep(1)}
        onSuccess={handlePaymentSuccess}
        boostData={boostData}
      />

      <BoostSuccessModal isOpen={boostStep === 3} onClose={handleCloseBoost} />
    </div>
  );
}
