"use client";

import GradientTitle from "@/components/scout/reusable/GradientTitle";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import ClubSearchFilters from "@/components/ui/scout/ClubSearchFilters";
import ClubDirectoryCard from "@/components/ui/scout/cards/ClubDirectoryCard";

const mockClubs = [
  {
    id: 1,
    logo: "/clubs/barcelona.png",
    name: "FC Barcelona Youth",
    location: "Barcelona, Spain",
    playersCount: 156,
    established: 1979,
    recentAchievement: "UEFA Youth League Winners 2023",
  },
  {
    id: 2,
    logo: "/clubs/barcelona.png",
    name: "Chelsea FC Academy",
    location: "London, England",
    playersCount: 142,
    established: 1905,
    recentAchievement: "FA Youth Cup Winners 2022",
  },
  {
    id: 3,
    logo: "/clubs/barcelona.png",
    name: "AC Milan Primavera",
    location: "Milan, Italy",
    playersCount: 128,
    established: 1899,
    recentAchievement: "Primavera Champions 2023",
  },
  {
    id: 4,
    logo: "/clubs/barcelona.png",
    name: "Ajax Amsterdam Youth",
    location: "Amsterdam, Netherlands",
    playersCount: 134,
    established: 1900,
    recentAchievement: "Eredivisie U19 Champions",
  },
  {
    id: 5,
    logo: "/clubs/barcelona.png",
    name: "São Paulo FC Academy",
    location: "São Paulo, Brazil",
    playersCount: 168,
    established: 1930,
    recentAchievement: "Copa São Paulo Champions",
  },
  {
    id: 6,
    logo: "/clubs/barcelona.png",
    name: "Paris Saint-Germain Academy",
    location: "Paris, France",
    playersCount: 145,
    established: 1970,
    recentAchievement: "Coupe Gambardella Winners",
  },
];

export default function ClubDirectoryPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  return (
    <div className="space-y-8">
      {/* Header */}
      <GradientTitle text="Club Directory" />

      {/* Filters */}
      <ClubSearchFilters theme={theme} />

      {/* Clubs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockClubs.map((club) => (
          <ClubDirectoryCard
            key={club.id}
            logo={club.logo}
            name={club.name}
            image={club.logo}
            location={club.location}
            playersCount={club.playersCount}
            established={club.established}
            recentAchievement={club.recentAchievement}
            theme={theme}
            onViewDetails={() => router.push(`/scout/clubs/${club.id}`)}
          />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center">
        <Button
          variant="outline"
          className="px-12 py-4 rounded-sm text-lg font-medium"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan,
          }}
        >
          Load More Clubs
        </Button>
      </div>
    </div>
  );
}
