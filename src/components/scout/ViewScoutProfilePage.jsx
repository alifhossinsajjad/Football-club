// ScoutProfilePage.jsx (Scout Profile View)
"use client";

import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
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
import { useState } from "react";

export default function ViewScoutProfilePage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const { id } = useParams();

  // Mock scout data
  const scout = {
    id: id || "1",
    name: "Roberto Martinez",
    role: "Senior Scout - Youth Development",
    image: "/scout/roberto.png",
    coverImage: "/scout/stadium-banner.png",
    location: "Madrid, Spain",
    joined: "January 2020",
    connections: 334,
    experience: 15,
    viewedPlayers: 342,
    viewedChange: "+48 this week",
    shortlistedPlayers: 28,
    activeShortlisted: 12,
    upcomingEvents: 6,
    nextEvent: "Sep 15",
    conversations: 15,
    unread: 5,
    about:
      "Highly experienced and dedicated professional football scout with over 20 years in talent identification and player development. Specialized in youth scouting, technical analysis, and international talent discovery. Successfully identified and recommended numerous players who have gone on to play at the highest levels of European football. Known for meticulous attention to detail, strong networking capabilities, and an exceptional eye for raw talent.",
    specializations: [
      "Youth Scouting",
      "Technical Analysis",
      "Player Development",
      "International Scouting",
    ],
    contact: {
      email: "r.martinez@footballpros.com",
      phone: "+34 7700 900000",
      website: "www.robertomscout.com",
    },
  };

  // State for editing and boost functionality (similar to player profile)
  const [isEditing, setIsEditing] = useState(false);

  // Boost modal states
  const [boostStep, setBoostStep] = useState(0); // 0: closed, 1: duration, 2: payment, 3: success
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [boostData, setBoostData] = useState({});

  // Centralized scout profile data state
  const [scoutProfileData, setScoutProfileData] = useState({
    profile: {
      name: scout.name,
      position: scout.role,
      location: scout.location,
      status: "Active",
      age: "45 years",
      height: "6'0 (183 cm)",
      weight: "180 lbs (82 kg)",
      nationality: "Spanish",
      preferredFoot: "Right",
      dateOfBirth: "01/05/1979",
      jerseyNumber: "-",
    },

    coverImage: scout.coverImage,
    profileImage: scout.image,
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
    </div>
  );
}
