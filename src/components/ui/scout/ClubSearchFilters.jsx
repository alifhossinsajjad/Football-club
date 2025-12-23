"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectTrigger,
} from "../player/select";

export default function ClubSearchFilters({ theme }) {
  const [country, setCountry] = useState("All Countries");
  const [clubType, setClubType] = useState("All Types");
  const [sortBy, setSortBy] = useState("Relevance");
  const [searchQuery, setSearchQuery] = useState("");

  const countries = [
    "All Countries",
    "Spain",
    "England",
    "Italy",
    "Netherlands",
    "Brazil",
    "France",
  ];

  const clubTypes = [
    "All Types",
    "Youth Academy",
    "Professional Academy",
    "Reserve Team",
  ];

  const sortOptions = [
    "Relevance",
    "Players Count",
    "Established Year",
    "Recent Achievement",
  ];

  const resetFilters = () => {
    setCountry("All Countries");
    setClubType("All Types");
    setSortBy("Relevance");
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
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
        <div>
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
        </div>

        {/* Club Type */}
        <div>
          <Select value={clubType} onValueChange={setClubType}>
            <SelectTrigger className="h-12 rounded-lg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {clubTypes.map((t) => (
                <SelectItem key={t} value={t}>
                  {t}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Sort By */}
        <div>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="h-12 rounded-lg">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((s) => (
                <SelectItem key={s} value={s}>
                  {s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

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
