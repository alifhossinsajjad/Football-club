// ScoutDirectoryPage.jsx
"use client";

import GradientTitle from "@/components/scout/reusable/GradientTitle";
import ScoutSearchFilters from "@/components/ui/scout/Filters/ScoutSearchFilters";
import ScoutDirectoryCard from "@/components/ui/scout/cards/ScoutDirectoryCard";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const mockScouts = [
  {
    id: 1,
    image: "/scout/roberto.png",
    name: "Roberto Martinez",
    role: "Senior Scout - Youth Development",
    countries: "Spain, Portugal",
    specializations: ["Youth Scouting", "Technical Analysis"],
    experience: 15,
    connections: 234,
  },
  {
    id: 2,
    image: "/scout/sarah.png",
    name: "Sarah Williams",
    role: "International Scout",
    countries: "England, Germany, France",
    specializations: ["International Scouting", "Position-based"],
    experience: 12,
    connections: 189,
  },
  {
    id: 3,
    image: "/scout/roberto.png",
    name: "Carlos Mendes",
    role: "South American Scout",
    countries: "Brazil, Argentina, Uruguay",
    specializations: ["Youth Scouting", "Talent ID"],
    experience: 10,
    connections: 156,
  },
  {
    id: 4,
    image: "/scout/roberto.png",
    name: "Emma Thompson",
    role: "European Scout Network",
    countries: "Netherlands, Belgium, Scandinavia",
    specializations: ["International Scouting", "Youth Development"],
    experience: 8,
    connections: 142,
  },
  {
    id: 5,
    image: "/scout/roberto.png",
    name: "Ahmed Al-Rashid",
    role: "Middle East & Africa Scout",
    countries: "UAE, Egypt, Nigeria",
    specializations: ["Youth Scouting", "Technical Analysis"],
    experience: 11,
    connections: 167,
  },
  {
    id: 6,
    image: "/scout/roberto.png",
    name: "Lisa Chen",
    role: "Asian Football Scout",
    countries: "China, Japan, South Korea",
    specializations: ["Youth Scouting", "Technical Analysis"],
    experience: 9,
    connections: 128,
  },
];

export default function ScoutDirectoryPage() {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <GradientTitle text="Scout Directory" />

      {/* Filters */}
      <ScoutSearchFilters theme={theme} />

      {/* Scouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockScouts.map((scout) => (
          <ScoutDirectoryCard key={scout.id} scout={scout} theme={theme} />
        ))}
      </div>

      {/* Load More */}
      <div className="flex justify-center mt-12">
        <Button
          variant="outline"
          className="px-12 py-4 rounded-md text-lg font-medium"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan,
            border: `1px solid ${theme.colors.primaryCyan}33`,
          }}
        >
          Load More Scouts
        </Button>
      </div>
    </div>
  );
}
