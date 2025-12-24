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
import BoostDurationModal from "@/components/player/modals/profile/BoostDurationModal";
import BoostPaymentModal from "@/components/player/modals/profile/BoostPaymentModal";
import BoostSuccessModal from "@/components/player/modals/profile/BoostSuccessModal";

export default function ScoutProfilePage() {
  const [isEditing, setIsEditing] = useState(false);

  // Boost modal states
  const [boostStep, setBoostStep] = useState(0);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [boostData, setBoostData] = useState({});

  // Centralized scout profile data state
  const [scoutProfileData, setScoutProfileData] = useState({
    profile: {
      name: "Roberto Martinez",
      position: "Senior Scout - Youth Development",
      location: "Madrid, Spain",
      status: "Active",
      age: "45 years",
      height: "6'0 (183 cm)",
      weight: "180 lbs (82 kg)",
      nationality: "Spanish",
      preferredFoot: "Right",
      dateOfBirth: "01/05/1979",
      jerseyNumber: "-",
    },

    coverImage: "/scout/stadium-banner.png",
    profileImage: "/scout/roberto.jpg",
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

  const updateScoutProfileData = (updates) => {
    setScoutProfileData((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const updateProfileField = (field, value) => {
    setScoutProfileData((prev) => ({
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
        scoutPlayerProfileData={scoutProfileData}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        updatePlayerProfileData={updateScoutProfileData}
        onBoost={handleBoostProfile}
      />

      <ProfileDetails
        scoutPlayerProfileData={scoutProfileData}
        isEditing={isEditing}
        updateProfileField={updateProfileField}
        setIsEditing={setIsEditing}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AboutProfile
            scoutPlayerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />
          <StatisticsPart
            scoutPlayerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />

          <SkillsPlayer
            scoutPlayerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />

          <PlayHistory
            scoutPlayerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />
        </div>

        <div className="space-y-8">
          <ContactThePlayer
            scoutPlayerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />

          <PlayerSocialMedia
            scoutPlayerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />

          <AchievementList
            scoutPlayerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />

          <PlayersProfile
            scoutPlayerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />
        </div>
      </div>

      <HighlightVideo
        scoutPlayerProfileData={scoutProfileData}
        isEditing={isEditing}
        updatePlayerProfileData={updateScoutProfileData}
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
