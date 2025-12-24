// 3. ScoutingRegions.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen, Plus, Trash2 } from "lucide-react";

// Function to get flag emoji based on country name
function getFlagEmoji(country) {
  const countryFlagMap = {
    "England": "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
    "Spain": "🇪🇸",
    "Germany": "🇩🇪",
    "France": "🇫🇷",
    "Portugal": "🇵🇹",
  };
  
  return countryFlagMap[country] || "🌍"; // Default globe emoji if country not found
}

export default function ScoutingRegions({ regions, theme, isEditing, onUpdate }) {
  const [regionsState, setRegionsState] = useState(regions || []);

  const handleRegionChange = (index, field, value) => {
    const updatedRegions = [...regionsState];
    updatedRegions[index] = { ...updatedRegions[index], [field]: value };
    setRegionsState(updatedRegions);
    if (onUpdate) {
      onUpdate(updatedRegions);
    }
  };

  const addNewRegion = () => {
    const newRegion = {
      country: "",
      coverage: "",
      years: 0
    };
    const updatedRegions = [...regionsState, newRegion];
    setRegionsState(updatedRegions);
    if (onUpdate) {
      onUpdate(updatedRegions);
    }
  };

  const removeRegion = (index) => {
    const updatedRegions = regionsState.filter((_, i) => i !== index);
    setRegionsState(updatedRegions);
    if (onUpdate) {
      onUpdate(updatedRegions);
    }
  };

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">
          Scouting Regions
        </h2>
        {isEditing && (
          <button 
            onClick={addNewRegion}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {regionsState.map((region, i) => (
          <div key={i} className="text-center">
            <div className="flex justify-center mb-3">
              <span className="text-4xl">{getFlagEmoji(region.country)}</span>
            </div>
            {isEditing ? (
              <div className="space-y-2">
                <Input
                  value={region.country}
                  onChange={(e) => handleRegionChange(i, "country", e.target.value)}
                  placeholder="Country"
                  className="text-center"
                />
                <Input
                  value={region.coverage}
                  onChange={(e) => handleRegionChange(i, "coverage", e.target.value)}
                  placeholder="Coverage"
                  className="text-center"
                />
                <Input
                  value={region.years}
                  onChange={(e) => handleRegionChange(i, "years", parseInt(e.target.value))}
                  placeholder="Years"
                  className="text-center"
                />
              </div>
            ) : (
              <>
                <p className="text-white font-medium mb-2">{region.country}</p>
                <p className="text-sm text-gray-400">{region.coverage}</p>
                <p className="text-primaryCyan font-medium">{region.years} years</p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
