"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/player/select";
import { Search, Calendar } from "lucide-react";

export default function EventSearchFilters({ theme, onFilterChange }) {
  const [eventType, setEventType] = useState("All Types");
  const [location, setLocation] = useState("All Locations");
  const [sortBy, setSortBy] = useState("date");
  const [searchQuery, setSearchQuery] = useState("");

  const eventTypes = [
    "All Types",
    "Trial",
    "Showcase",
    "Tournament",
    "Workshop",
  ];

  const sortOptions = [
    { value: "date", label: "Date (Oldest First)" },
    { value: "date-desc", label: "Date (Newest First)" },
    { value: "spots", label: "Available Spots (Lowest First)" },
    { value: "spots-desc", label: "Available Spots (Highest First)" },
    { value: "title", label: "Title (A-Z)" },
  ];

  const locations = [
    "All Locations",
    "Spain",
    "England",
    "Italy",
    "Portugal",
    "Brazil",
    "France",
  ];

  useEffect(() => {
    onFilterChange({
      eventType,
      location,
      sortBy,
      searchQuery,
    });
  }, [eventType, location, sortBy, searchQuery]);

  const resetFilters = () => {
    setEventType("All Types");
    setLocation("All Locations");
    setSortBy("date");
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
          className="px-6 py-2 rounded-lg text-sm font-medium"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan,
            border: `1px solid ${theme.colors.primaryCyan}33`,
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Event Type */}
        <Select value={eventType} onValueChange={setEventType}>
          <SelectTrigger className="h-12 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {eventTypes.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location */}
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="h-12 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {locations.map((l) => (
              <SelectItem key={l} value={l}>
                {l}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Sort By */}
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="h-12 rounded-lg">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-12 h-12 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}
