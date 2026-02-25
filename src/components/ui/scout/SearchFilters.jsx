"use client";
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function SearchFilters({ theme, onFilterChange, filters: propFilters }) {
  const [filters, setFilters] = useState({
    position: propFilters?.position || "All Positions",
    nationality: propFilters?.nationality || "All Countries",
    ageRange: propFilters?.ageRange || "All Ages",
    searchName: propFilters?.searchName || "",
  });

  const [openDropdown, setOpenDropdown] = useState(null);

  // Update local state when propFilters change
  useEffect(() => {
    setFilters({
      position: propFilters?.position || "All Positions",
      nationality: propFilters?.nationality || "All Countries",
      ageRange: propFilters?.ageRange || "All Ages",
      searchName: propFilters?.searchName || "",
    });
  }, [propFilters]);

  const positions = [
    "All Positions",
    "Goalkeeper",
    "Defender",
    "Midfielder",
    "Forward",
  ];

  const nationalities = [
    "All Countries",
    "Argentina",
    "Brazil",
    "England",
    "France",
    "Germany",
    "Italy",
    "Portugal",
    "Spain",
  ];

  const ageRanges = ["All Ages", "16-20", "21-25", "26-30", "31-35", "36+"];

  const colors = theme?.colors || {
    primaryCyan: theme.colors.primaryCyan,
    primaryMagenta: "#9C27B0",
    backgroundDark: theme.colors.backgroundDark,
    backgroundCard: theme.colors.backgroundCard,
    neonAccent: "#14F1D9",
  };

  const handleFilterChange = (filterName, value) => {
    const newFilters = { ...filters, [filterName]: value };
    setFilters(newFilters);
    setOpenDropdown(null);
    
    if (onFilterChange) {
      onFilterChange(newFilters);
    }
  };

  const resetFilters = () => {
    const resetFilterValues = {
      position: "All Positions",
      nationality: "All Countries",
      ageRange: "All Ages",
      searchName: "",
    };
    setFilters(resetFilterValues);
    
    if (onFilterChange) {
      onFilterChange(resetFilterValues);
    }
  };

  const Dropdown = ({ label, value, options, filterName }) => (
    <div className="relative flex-1 min-w-[200px]">
      <label className="block text-sm font-medium mb-2 text-gray-300">
        {label}
      </label>
      <button
        onClick={() =>
          setOpenDropdown(openDropdown === filterName ? null : filterName)
        }
        style={{ backgroundColor: colors.backgroundDark }}
        className="w-full px-4 py-3 rounded-lg text-left flex items-center justify-between border border-gray-700 hover:border-gray-600 transition-colors"
      >
        <span className="text-white">{value}</span>
        <ChevronDown
          className={`w-5 h-5 transition-transform ${
            openDropdown === filterName ? "rotate-180" : ""
          }`}
          style={{ color: colors.neonAccent }}
        />
      </button>

      {openDropdown === filterName && (
        <div
          style={{ backgroundColor: colors.backgroundCard }}
          className="absolute z-10 w-full mt-2 rounded-lg border border-gray-700 shadow-xl max-h-60 overflow-y-auto"
        >
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleFilterChange(filterName, option)}
              className={`w-full px-4 py-3 text-left hover:bg-opacity-80 transition-colors ${
                value === option ? "bg-opacity-50" : ""
              }`}
              style={{
                backgroundColor:
                  value === option
                    ? colors.primaryCyan + "20"
                    : theme.colors.backgroundDark,
                color: value === option ? colors.neonAccent : "white",
              }}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div
      style={{ backgroundColor: colors.backgroundCard }}
      className="p-6 rounded-xl border border-gray-800"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h2 className="text-xl font-semibold text-white">Search Filters</h2>
        <button
          onClick={resetFilters}
          className="px-4 py-2 text-[#00E5FF] border border-[#00E5FF] rounded-lg  hover:opacity-80 transition-colors flex items-center gap-2 w-fit"
        >
          Reset Filters
        </button>
      </div>

      {/* Filters Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Dropdown
          label="Position"
          value={filters.position}
          options={positions}
          filterName="position"
        />

        <Dropdown
          label="Nationality"
          value={filters.nationality}
          options={nationalities}
          filterName="nationality"
        />

        <Dropdown
          label="Age Range"
          value={filters.ageRange}
          options={ageRanges}
          filterName="ageRange"
        />

        {/* Search Input */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Search Name
          </label>
          <input
            type="text"
            value={filters.searchName}
            onChange={(e) => {
              const newFilters = { ...filters, searchName: e.target.value };
              setFilters(newFilters);
              
              if (onFilterChange) {
                onFilterChange(newFilters);
              }
            }}
            placeholder="Search by name..."
            style={{ backgroundColor: colors.backgroundCard }}
            className="w-full px-4 py-3 rounded-lg border border-gray-700 focus:border-gray-600 focus:outline-none text-white placeholder-gray-500 transition-colors"
          />
        </div>
      </div>
    </div>
  );
}
