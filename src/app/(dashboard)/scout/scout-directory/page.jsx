// ScoutDirectoryPage.jsx
"use client";

import { useState } from "react";
import GradientTitle from "@/components/scout/reusable/GradientTitle";
import ScoutSearchFilters from "@/components/ui/scout/Filters/ScoutSearchFilters";
import ScoutDirectoryCard from "@/components/ui/scout/cards/ScoutDirectoryCard";
import { Button } from "@/components/ui/button";
import { useSelector } from "react-redux";

const mockScouts = [
  {
    id: 1,
    image: "/scout/martinez.png",
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
  
  const [country, setCountry] = useState("All Countries");
  const [region, setRegion] = useState("All Regions");
  const [specialization, setSpecialization] = useState("All Specializations");
  const [searchQuery, setSearchQuery] = useState("");

  const countries = [
    "All Countries",
    "Spain",
    "England",
    "Germany",
    "France",
    "Brazil",
    "Italy",
    "Portugal",
  ];
  
  const regions = [
    "All Regions",
    "Europe",
    "South America",
    "Africa",
    "Asia",
    "North America",
  ];
  
  const specializations = [
    "All Specializations",
    "Youth Scouting",
    "Technical Analysis",
    "International Scouting",
    "Talent ID",
    "Position-based",
  ];

  const resetFilters = () => {
    setCountry("All Countries");
    setRegion("All Regions");
    setSpecialization("All Specializations");
    setSearchQuery("");
  };

  // Filter scouts based on selected criteria
  const filteredScouts = mockScouts.filter(scout => {
    // Filter by country
    if (country !== "All Countries") {
      const scoutCountries = scout.countries.split(',').map(c => c.trim());
      if (!scoutCountries.includes(country)) {
        return false;
      }
    }
    
    // Filter by specialization
    if (specialization !== "All Specializations" && 
        !scout.specializations.includes(specialization)) {
      return false;
    }
    
    // Filter by region - we'll map countries to regions
    if (region !== "All Regions") {
      const regionCountries = {
        "Europe": ["Spain", "England", "Germany", "France", "Italy", "Portugal", "Netherlands", "Belgium", "Scandinavia"],
        "South America": ["Brazil", "Argentina", "Uruguay"],
        "Africa": ["Egypt", "Nigeria"],
        "Asia": ["China", "Japan", "South Korea", "UAE"],
        "North America": ["USA", "Mexico"],
      };
      
      const regionCountryList = regionCountries[region] || [];
      const scoutCountries = scout.countries.split(',').map(c => c.trim());
      
      if (!scoutCountries.some(scoutCountry => 
        regionCountryList.includes(scoutCountry)
      )) {
        return false;
      }
    }
    
    // Filter by search query
    if (searchQuery && 
        !scout.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !scout.role.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !scout.countries.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <GradientTitle text="Scout Directory" />

      {/* Filters */}
      <ScoutSearchFilters 
        theme={theme} 
        filters={{ country, region, specialization, searchQuery }}
        onFilterChange={({ country: newCountry, region: newRegion, specialization: newSpecialization, searchQuery: newSearchQuery }) => {
          setCountry(newCountry);
          setRegion(newRegion);
          setSpecialization(newSpecialization);
          setSearchQuery(newSearchQuery);
        }}
      />

      {/* Scouts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredScouts.length > 0 ? (
          filteredScouts.map((scout) => (
            <ScoutDirectoryCard key={scout.id} scout={scout} theme={theme} />
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-400 text-lg">No scouts found matching your criteria</p>
          </div>
        )}
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
