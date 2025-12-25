"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Plus, Trash2 } from "lucide-react";
import Image from "next/image";

// Flag helper
function getFlagEmoji(country) {
  const map = {
    England: "/flags/england.png",
    Spain: "/flags/spain.png",
    Germany: "/flags/germany.png",
    France: "/flags/france.png",
    Portugal: "/flags/portugal.png",
  };
  return map[country] || "🌍";
}

export default function ScoutingRegions({
  regions = [],
  theme,
  isEditing,
  onUpdate,
}) {
  const [regionsState, setRegionsState] = useState(regions);

  const handleChange = (index, field, value) => {
    const updated = [...regionsState];
    updated[index] = { ...updated[index], [field]: value };
    setRegionsState(updated);
    onUpdate?.(updated);
  };

  const addRegion = () => {
    const updated = [...regionsState, { country: "", coverage: "", years: "" }];
    setRegionsState(updated);
    onUpdate?.(updated);
  };

  const removeRegion = (index) => {
    const updated = regionsState.filter((_, i) => i !== index);
    setRegionsState(updated);
    onUpdate?.(updated);
  };

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-white">Scouting Regions</h2>

        {isEditing && (
          <button
            onClick={addRegion}
            className="p-2 rounded-full hover:bg-white/10 transition"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      {/* GRID */}
      <div
        className={` ${
          isEditing ? "" : "grid"
        } grid-cols-1 md:grid-cols-2 gap-4 space-y-4`}
      >
        {regionsState.map((region, i) => (
          <div
            key={i}
            className="rounded-xl border p-4 bg-[#1A2049] "
            style={{
              borderColor: `${theme.colors.primaryCyan}22`,
            }}
          >
            {/* VIEW MODE */}
            {!isEditing && (
              <div className="flex items-center justify-between ">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">
                    <Image
                      src={getFlagEmoji(region.country)}
                      alt={region.country}
                      width={24}
                      height={24}
                    ></Image>
                  </span>

                  <div>
                    <p className="text-white font-medium">{region.country}</p>
                    <p className="text-xs text-gray-400">{region.coverage}</p>
                  </div>
                </div>

                <p
                  className="text-sm font-medium"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  {region.years} years
                </p>
              </div>
            )}

            {/* EDIT MODE */}
            {isEditing && (
              <div className="grid grid-cols-3 gap-4 ">
                <Input
                  value={region.country}
                  onChange={(e) => handleChange(i, "country", e.target.value)}
                  placeholder="Country"
                  className="p-5 "
                />

                <Input
                  value={region.coverage}
                  onChange={(e) => handleChange(i, "coverage", e.target.value)}
                  placeholder="Coverage"
                  className="p-5 "
                />

                <Input
                  type="number"
                  value={region.years}
                  onChange={(e) =>
                    handleChange(i, "years", Number(e.target.value))
                  }
                  placeholder="Years"
                  className="p-5 "
                />

                <button
                  onClick={() => removeRegion(i)}
                  className="flex items-center gap-2 text-sm text-red-400 hover:text-red-500 transition "
                >
                  <Trash2 className="w-4 h-4" />
                  Remove Region
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
