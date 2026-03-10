// app/scout/scout-directory/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, RotateCw, MapPin, MessageCircle, ChevronDown } from "lucide-react";

const fakeScouts = [
  {
    id: 1,
    name: "Roberto Martinez",
    title: "Senior Scout - Youth Development",
    location: "Madrid, Spain",
    specializations: ["Youth Scouting", "Technical Analysis", "Player Dev"],
    experience: 15,
    connections: 234,
    country: "Spain",
    region: "Europe",
  },
  {
    id: 2,
    name: "Sarah Williams",
    title: "International Scout",
    location: "London, England",
    specializations: ["International Scouting", "Position-based"],
    experience: 12,
    connections: 189,
    country: "England",
    region: "Europe",
  },
  {
    id: 3,
    name: "Carlos Mendes",
    title: "South American Scout",
    location: "São Paulo, Brazil",
    specializations: ["Youth Scouting", "Talent ID"],
    experience: 10,
    connections: 156,
    country: "Brazil",
    region: "South America",
  },
  {
    id: 4,
    name: "Emma Thompson",
    title: "European Scout Network",
    location: "Amsterdam, Netherlands",
    specializations: ["International Scouting", "Youth Development"],
    experience: 8,
    connections: 142,
    country: "Netherlands",
    region: "Europe",
  },
  {
    id: 5,
    name: "Ahmed Al-Rashid",
    title: "Middle East & Africa Scout",
    location: "Dubai, UAE",
    specializations: ["Youth Scouting", "Technical Analysis"],
    experience: 11,
    connections: 167,
    country: "UAE",
    region: "Middle East & Africa",
  },
  {
    id: 6,
    name: "Lisa Chen",
    title: "Asian Football Scout",
    location: "Tokyo, Japan",
    specializations: ["Youth Scouting", "Technical Analysis"],
    experience: 9,
    connections: 128,
    country: "Japan",
    region: "Asia",
  },
];

const COUNTRIES = ["All Countries", "Spain", "England", "Brazil", "Netherlands", "UAE", "Japan"];
const REGIONS = ["All Regions", "Europe", "South America", "Asia", "Middle East & Africa"];
const SPECS = ["All Specializations", "Youth Scouting", "Technical Analysis", "International Scouting", "Talent ID", "Player Dev", "Position-based", "Youth Development"];

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}

const FilterSelect = ({ label, value, onChange, options }: FilterSelectProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">{label}</label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#2DD4BF] transition-colors cursor-pointer pr-8"
      >
        {options.map((o) => (
          <option key={o} value={o} className="bg-[#0a1622]">{o}</option>
        ))}
      </select>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
        <ChevronDown size={14} />
      </span>
    </div>
  </div>
);

export default function ScoutDirectoryPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const scoutsPerPage = 6;

  const [countryFilter, setCountryFilter] = useState("All Countries");
  const [regionFilter, setRegionFilter] = useState("All Regions");
  const [specFilter, setSpecFilter] = useState("All Specializations");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredScouts = fakeScouts.filter((scout) => {
    const matchSearch =
      scout.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scout.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchCountry = countryFilter === "All Countries" || scout.country === countryFilter;
    const matchRegion = regionFilter === "All Regions" || scout.region === regionFilter;
    const matchSpec =
      specFilter === "All Specializations" ||
      scout.specializations.includes(specFilter);
    return matchSearch && matchCountry && matchRegion && matchSpec;
  });

  const indexOfLast = currentPage * scoutsPerPage;
  const indexOfFirst = indexOfLast - scoutsPerPage;
  const currentScouts = filteredScouts.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(filteredScouts.length / scoutsPerPage);

  const handleReset = () => {
    setCountryFilter("All Countries");
    setRegionFilter("All Regions");
    setSpecFilter("All Specializations");
    setSearchTerm("");
    setCurrentPage(1);
  };

  return (
    <div className="text-white min-h-screen">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2 inline-block pb-2 bg-gradient-to-r from-[#2DD4BF] to-[#9C27B0] bg-clip-text text-transparent">
          Scout Directory
        </h1>
        <p className="text-sm text-[#4A6480]">Find and connect with experienced football scouts worldwide</p>
      </div>

      {/* Search Filters */}
      <div className="bg-[#12143A] border border-[#2DD4BF]/30 rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-white">Search Filters</p>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-[#2DD4BF] border border-[#2DD4BF]/40 rounded-lg px-3 py-1.5 hover:bg-[#2DD4BF]/10 transition-colors"
          >
            <RotateCw size={14} /> Reset Filters
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FilterSelect label="Country" value={countryFilter} onChange={setCountryFilter} options={COUNTRIES} />
          <FilterSelect label="Region" value={regionFilter} onChange={setRegionFilter} options={REGIONS} />
          <FilterSelect label="Specialization" value={specFilter} onChange={setSpecFilter} options={SPECS} />

          {/* Search input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">Search Name</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
                <Search size={14} />
              </span>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
                placeholder="Search scouts..."
                className="w-full bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 pl-8 text-sm text-[#C8D8E8] placeholder-[#2a4060] focus:outline-none focus:border-[#2DD4BF] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scouts Grid */}
      {currentScouts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm font-semibold text-white mb-1">No scouts found</p>
          <p className="text-xs text-[#4A6480] mb-4">Try adjusting your filters</p>
          <button
            onClick={handleReset}
            className="text-xs text-[#2DD4BF] border border-[#2DD4BF]/40 rounded-lg px-4 py-2 hover:bg-[#2DD4BF]/10 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {currentScouts.map((scout) => (
            <div
              key={scout.id}
              className="bg-[#12143A] border border-[#2DD4BF]/30 rounded-xl p-5 transition-all duration-200 hover:shadow-[0_0_20px_rgba(45,212,191,0.06)] flex flex-col"
            >
              {/* Avatar + Name */}
              <div className="flex items-start gap-3 mb-4">
                <div className="relative flex-shrink-0">
                  <Image
                    src="/images/njr.jpg"
                    alt={scout.name}
                    width={52}
                    height={52}
                    className="rounded-full object-cover border-2 border-[#1d3a55]"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-[#2DD4BF] rounded-full border-2 border-[#12143A]" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-white truncate">{scout.name}</p>
                  <p className="text-[11px] text-[#4A6480] mt-0.5 truncate">{scout.title}</p>
                  <p className="text-[11px] text-[#2DD4BF] flex items-center gap-1 mt-1">
                    <MapPin size={11} /> {scout.location}
                  </p>
                </div>
              </div>

              {/* Specializations */}
              <div className="mb-4">
                <p className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider mb-2">Specializations</p>
                <div className="flex flex-wrap gap-1.5">
                  {scout.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-medium text-[#2DD4BF] bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 px-2.5 py-1 rounded-md"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#0a1622] rounded-lg p-3 border border-[#1d3a55]">
                  <p className="text-[10px] text-[#4A6480] uppercase tracking-wider mb-1">Experience</p>
                  <p className="text-sm font-bold text-[#C8D8E8]">{scout.experience} yrs</p>
                </div>
                <div className="bg-[#0a1622] rounded-lg p-3 border border-[#1d3a55]">
                  <p className="text-[10px] text-[#4A6480] uppercase tracking-wider mb-1">Connections</p>
                  <p className="text-sm font-bold text-[#C8D8E8]">{scout.connections}</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-auto">
                <Link
                  href={`/scout/scoutDirectory/${scout.id}`}
                  className="flex-1 py-2 rounded-lg bg-[#2DD4BF] hover:bg-[#26b8a8] text-white text-xs font-semibold transition-all duration-200 text-center"
                >
                  View Profile
                </Link>
                <button className="w-9 h-9 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center hover:bg-[#2DD4BF] hover:text-[#0a1218] transition-all duration-200 flex-shrink-0">
                  <MessageCircle size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 rounded-lg border border-[#2DD4BF]/40 text-[#2DD4BF] text-sm font-semibold hover:bg-[#2DD4BF]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-[#4A6480]">Page {currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 rounded-lg border border-[#2DD4BF]/40 text-[#2DD4BF] text-sm font-semibold hover:bg-[#2DD4BF]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}