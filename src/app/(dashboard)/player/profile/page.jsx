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
import { useState } from "react";
import PlayerProfileSkills from "@/components/player/profile/PlayerProfileSkills";
import PlayerProfilePlayingHistory from "@/components/player/profile/PlayerProfilePlayingHistory";

export default function PlayerProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isBoosting, setIsBoosting] = useState(false);
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  // Centralized player profile data state
  const [playerProfileData, setPlayerProfileData] = useState({
    profile: {
      name: "Sourav Debnath",
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
    about: "Highly skilled and dedicated forward with exceptional technical abilities and a strong goal-scoring record. Known for excellent ball control, pace, and tactical awareness. Currently playing for Manchester United Youth Academy and representing England U-18 National Team. Passionate about developing my skills and pursuing a professional career in football at the highest level.",
    statistics: {
      matches: 28,
      goals: 19,
      assists: 12,
      minutes: 2340
    },
    skills: [
      { skill: "Pace", value: 92 },
      { skill: "Shooting", value: 88 },
      { skill: "Dribbling", value: 90 },
      { skill: "Passing", value: 85 },
      { skill: "Physical", value: 82 },
      { skill: "Technical", value: 89 },
    ],
    playingHistory: [
      {
        club: "Manchester United Youth Academy",
        years: "2023 - Present",
        note: "Forward",
        description: "FA Youth Cup Runner-up 2024",
      },
      {
        club: "England U-18 National Team",
        years: "2024 - Present",
        note: "Forward",
        description: "8 Caps, 5 Goals",
      },
      {
        club: "City Football Academy",
        years: "2020 - 2023",
        note: "Forward",
        description: "Regional Champions 2020",
      },
    ],
    contact: {
      email: "sourav.debnath@email.com",
      phone: "+44 7700 900000"
    },
    socialMedia: {
      instagram: "@souravdebnath_10",
      twitter: "@souravdebnath_10",
      facebook: "@souravdebnath_10",
      youtube: "Sourav Debnath Football"
    },
    achievements: [
      "Player of the Month - March 2025",
      "Top Scorer U-18 League 2024",
      "England Youth Call-Up 2024",
      "FA Youth Cup Finalist 2024",
      "Academy Player of the Year 2023",
    ],
    insights: {
      profileViews: 342,
      profileViewsChange: "+124 this week",
      scoutViews: 87,
      scoutViewsChange: "+35 this week",
      clubInterest: "16 clubs",
      clubInterestChange: "+8 new this month"
    },
    preferences: {
      preferredLeague: "Premier League, Liga Bundesliga",
      contractStatus: "Open to Offers",
      availability: "Available from Summer 2025"
    },
    videos: [
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
    ],
    coverImage: "/player/profile/profileBanner.png",
    profileImage: "/player/profile/profile.png"
  });

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
    setIsEditing(!isEditing);
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

  // Function to update profile data
  const updatePlayerProfileData = (updates) => {
    setPlayerProfileData(prev => ({
      ...prev,
      ...updates
    }));
  };

  // Function to update nested profile data
  const updateProfileField = (field, value) => {
    setPlayerProfileData(prev => ({
      ...prev,
      profile: {
        ...prev.profile,
        [field]: value
      }
    }));
  };

  return (
    <div className="space-y-8 ">
      {/* Cover Photo with Trophies */}
      <PlayerProfileCover
        playerProfileData={playerProfileData}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        updatePlayerProfileData={updatePlayerProfileData}
      />
      {/* Profile Header Card */}
      <ProfileHeader
        playerProfileData={playerProfileData}
        isEditing={isEditing}
        updateProfileField={updateProfileField}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <AboutPlayerProfile
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          {/* Career Statistics */}
          <CareerStatistics
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          {/* Skills & Attributes */}
          <PlayerProfileSkills
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
          {/* Playing History */}
          <PlayerProfilePlayingHistory
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
        </div>

        {/* Right Sidebar */}
        <div className="space-y-8">
          {/* Contact Information */}
          <ContactInformation
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          {/* Social Media */}
          <SocialMedia
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          {/* Achievements */}
          <PlayerAchievements
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          {/* Profile Insights */}
          <PlayerProfileInsights
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />

          {/* Preferences */}
          <PlayerProfilePreference
            playerProfileData={playerProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updatePlayerProfileData}
          />
        </div>
      </div>

      {/* Highlights Videos */}
      <HighlightVideosSection
        playerProfileData={playerProfileData}
        isEditing={isEditing}
        updatePlayerProfileData={updatePlayerProfileData}
      />
    </div>
  );
}
