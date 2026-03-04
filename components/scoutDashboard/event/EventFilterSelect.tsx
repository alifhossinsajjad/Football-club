"use client";

import { ChevronDown, Search, RotateCw } from "lucide-react";
import React from "react";

interface EventFiltersProps {
  country: string;
  setCountry: (value: string) => void;
  eventType: string;
  setEventType: (value: string) => void;
  date: string;
  setDate: (value: string) => void;
  search: string;
  setSearch: (value: string) => void;
  onReset: () => void;
  countries: string[];        // options for country dropdown
  eventTypes: string[];        // options for event type dropdown
}

const EventFilters: React.FC<EventFiltersProps> = ({
  country,
  setCountry,
  eventType,
  setEventType,
  date,
  setDate,
  search,
  setSearch,
  onReset,
  countries,
  eventTypes,
}) => {
  return (
    <div className="bg-[#12143A] border border-[#00E5FF]/40 rounded-xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-white">Search Filters</p>
        <button
          onClick={onReset}
          className="flex items-center gap-1.5 text-xs font-medium text-[#2DD4BF] border border-[#2DD4BF]/40 rounded-lg px-3 py-1.5 hover:bg-[#2DD4BF]/10 transition-colors"
        >
          <RotateCw size={14} /> Reset Filters
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Country Select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">
            Country
          </label>
          <div className="relative">
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full appearance-none bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#2DD4BF] transition-colors cursor-pointer pr-8"
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c} value={c} className="bg-[#0a1622]">
                  {c}
                </option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
              <ChevronDown size={14} />
            </span>
          </div>
        </div>

        {/* Event Type Select */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">
            Type
          </label>
          <div className="relative">
            <select
              value={eventType}
              onChange={(e) => setEventType(e.target.value)}
              className="w-full appearance-none bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#2DD4BF] transition-colors cursor-pointer pr-8"
            >
              <option value="">All Types</option>
              {eventTypes.map((t) => (
                <option key={t} value={t} className="bg-[#0a1622]">
                  {t}
                </option>
              ))}
            </select>
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
              <ChevronDown size={14} />
            </span>
          </div>
        </div>

        {/* Date Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">
            Date
          </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#2DD4BF] transition-colors"
          />
        </div>

        {/* Search Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">
            Search
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
              <Search size={14} />
            </span>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name..."
              className="w-full bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 pl-8 text-sm text-[#C8D8E8] placeholder-[#4A6480] focus:outline-none focus:border-[#2DD4BF] transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventFilters;