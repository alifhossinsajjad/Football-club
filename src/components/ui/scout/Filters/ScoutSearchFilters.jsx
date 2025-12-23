"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/player/select";
import { Search } from "lucide-react";

export default function ScoutSearchFilters({ theme }) {
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

  return (
    <div
      className="p-6 rounded-xl border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Search Filters</h2>
        <button
          onClick={resetFilters}
          className="px-6 py-2 rounded-lg text-sm font-medium transition-colors"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan,
            border: `1px solid ${theme.colors.primaryCyan}33`,
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Filters Row */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Country */}
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className="h-12 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {countries.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Region */}
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger className="h-12 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Specialization */}
        <Select value={specialization} onValueChange={setSpecialization}>
          <SelectTrigger className="h-12 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {specializations.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
