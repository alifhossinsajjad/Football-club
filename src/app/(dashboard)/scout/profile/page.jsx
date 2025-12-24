"use client";

import { useState } from "react";
import ContactInformation from "@/components/player/profile/ContactInformation";
import PlayerAchievements from "@/components/player/profile/PlayerAchievements";
import PlayerProfilePreference from "@/components/player/profile/PlayerProfilePreference";
import ScoutStatsGrid from "@/components/scout/profile/grid/ScoutStatsGrid";
import { useSelector } from "react-redux";
import ScoutProfileHeader from "@/components/scout/profile/scout/ScoutProfileHeader";
import ScoutProfileCover from "@/components/scout/profile/scout/ScoutProfileCover";
import AboutScoutProfile from "@/components/scout/profile/scout/AboutScoutProfile";
import ScoutSocialMedia from "@/components/scout/profile/scout/ScoutSocialMedia";
import ScoutingStatistics from "@/components/scout/profile/scout/ScoutingStatistics";
import NotableDiscoveries from "@/components/scout/profile/scout/NotableDiscoveries";
import ScoutingRegions from "@/components/scout/profile/scout/ScoutingRegions";
import ScoutProfessionalHistory from "@/components/scout/profile/scout/ScoutProfessionalHistory";
import ScoutLanguages from "@/components/scout/profile/scout/ScoutLanguages";
import ScoutClubAffiliations from "@/components/scout/profile/scout/ScoutClubAffiliations";

export default function ScoutProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const theme = useSelector((state) => state.theme);

  // Boost modal states
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [boostData, setBoostData] = useState({});

  // Centralized scout profile data state
  const [scoutProfileData, setScoutProfileData] = useState({
    profile: {
      name: "Roberto Martinez",
      role: "Senior Scout - Youth Development",
      image: "/Scout/martinez.png",
      coverImage: "/stadium/stadium-banner.jpg",
      age: 45,
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
      socialMedia: {
        instagram: "@rmscout",
        twitter: "@RMartinezScout",
        linkedin: "Roberto Martinez",
        youtube: "MT Scouting Analysis",
      },
      languages: ["English", "Spanish", "French", "Portuguese", "German"],
      stats: {
        scouted: "1,200+",
        recommended: 145,
        placements: 89,
        successRate: "61%",
        clubsWorked: 25,
      },
      notableDiscoveries: [
        {
          name: "Carlos Fernandez",
          position: "Midfielder U17",
          club: "Real Madrid",
          year: 2018,
        },
        {
          name: "Lucas Silva",
          position: "Forward U16",
          club: "Barcelona",
          year: 2019,
        },
        {
          name: "Miguel Torres",
          position: "Defender U18",
          club: "Atletico Madrid",
          year: 2020,
        },
        {
          name: "James Wilson",
          position: "Midfielder U17",
          club: "Manchester United",
          year: 2021,
        },
        {
          name: "Pierre Dubois",
          position: "Forward U18",
          club: "PSG",
          year: 2022,
        },
      ],
      regions: [
        { country: "England", coverage: "Full Coverage", years: 20 },
        { country: "Spain", coverage: "Full Coverage", years: 15 },
        { country: "Germany", coverage: "Partial Coverage", years: 12 },
        { country: "France", coverage: "Full Coverage", years: 18 },
        { country: "Portugal", coverage: "Full Coverage", years: 10 },
      ],
      history: [
        {
          club: "Manchester United Youth Academy",
          role: "Senior Scout",
          period: "2021 - Present",
          current: true,
        },
        {
          club: "Liverpool FC",
          role: "Youth Development Scout",
          period: "2018 - 2021",
        },
        {
          club: "England U-18 National Team",
          role: "Talent Scout",
          period: "2015 - 2018",
        },
        {
          club: "City Football Academy",
          role: "Regional Scout",
          period: "2012 - 2015",
        },
        {
          club: "Chelsea FC Academy",
          role: "Junior Scout",
          period: "2008 - 2012",
        },
      ],
      achievements: [
        "Scout of the Year - Premier League Youth Development 2024",
        "Discovered 5 players who went on to represent national teams",
        "Successfully identified talent for 25+ professional clubs",
        "Top 10 Most Influential Scouts in Europe - 2023",
        "Excellence in Youth Development Award - 2022",
      ],
      affiliations: [
        "Manchester United Youth Academy",
        "Liverpool FC",
        "Real Madrid Academy",
        "Barcelona La Masia",
        "Chelsea FC Academy",
      ],
    },
    coverImage: "/scout/stadium-banner.png",
    profileImage: "/scout/roberto.jpg",
  });

  const handleNextFromDuration = () => {
    if (!selectedDuration) return;

    setBoostData({
      duration: selectedDuration.months,
      price: selectedDuration.price,
      startDate: "1 Feb 2025",
      endDate: "1 Mar 2025",
    });
  };

  const handlePaymentSuccess = () => {};

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
      <ScoutProfileCover
        playerProfileData={scoutProfileData}
        setIsEditing={setIsEditing}
        isEditing={isEditing}
        updatePlayerProfileData={updateScoutProfileData}
      />

      <ScoutProfileHeader
        playerProfileData={scoutProfileData}
        isEditing={isEditing}
        updateProfileField={updateProfileField}
      />

    {isEditing ||  <ScoutStatsGrid
        stats={{
          viewedPlayers: 342,
          viewedChange: "+48 this week",
          shortlistedPlayers: 28,
          activeShortlisted: 12,
          upcomingEvents: 6,
          nextEvent: "Sep 15",
          conversations: 15,
          unread: 5,
        }}
        theme={theme}
      />}

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <AboutScoutProfile
            playerProfileData={scoutProfileData}
            isEditing={isEditing}
            updateScoutProfileData={updateScoutProfileData}
          />
          <ScoutingStatistics
            stats={scoutProfileData.profile.stats}
            isEditing={isEditing}
            onUpdate={(updated) => updateProfileField('stats', updated)}
            theme={theme}
          />
          <NotableDiscoveries
            discoveries={scoutProfileData.profile.notableDiscoveries}
            isEditing={isEditing}
            onUpdate={(updated) => updateProfileField('notableDiscoveries', updated)}
            theme={theme}
          />
          <ScoutingRegions
            regions={scoutProfileData.profile.regions}
            isEditing={isEditing}
            onUpdate={(updated) => updateProfileField('regions', updated)}
            theme={theme}
          />

          <ScoutProfessionalHistory
            history={scoutProfileData.profile.history}
            isEditing={isEditing}
            onUpdate={(updated) => updateProfileField('history', updated)}
            theme={theme}
          />
        </div>

        <div className="space-y-8">
          <ContactInformation
            playerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />
          <ScoutSocialMedia
            playerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />
          <ScoutLanguages
            languages={scoutProfileData.profile.languages}
            isEditing={isEditing}
            onUpdate={(updated) => updateProfileField('languages', updated)}
            theme={theme}
          />
          <ScoutClubAffiliations
            affiliations={scoutProfileData.profile.affiliations}
            isEditing={isEditing}
            onUpdate={(updated) => updateProfileField('affiliations', updated)}
            theme={theme}
          />
          <PlayerProfilePreference
            playerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />
          <PlayerAchievements
            playerProfileData={scoutProfileData}
            isEditing={isEditing}
            updatePlayerProfileData={updateScoutProfileData}
          />
        </div>
      </div>
    </div>
  );
}
