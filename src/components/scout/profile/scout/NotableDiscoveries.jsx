// 2. NotableDiscoveries.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { SquarePen, Plus, Trash2 } from "lucide-react";

export default function NotableDiscoveries({ discoveries, theme, isEditing, onUpdate }) {
  const [discoveriesState, setDiscoveriesState] = useState(discoveries || []);

  const handleDiscoveryChange = (index, field, value) => {
    const updatedDiscoveries = [...discoveriesState];
    updatedDiscoveries[index] = { ...updatedDiscoveries[index], [field]: value };
    setDiscoveriesState(updatedDiscoveries);
    if (onUpdate) {
      onUpdate(updatedDiscoveries);
    }
  };

  const addNewDiscovery = () => {
    const newDiscovery = {
      name: "",
      position: "",
      club: "",
      year: new Date().getFullYear().toString()
    };
    const updatedDiscoveries = [...discoveriesState, newDiscovery];
    setDiscoveriesState(updatedDiscoveries);
    if (onUpdate) {
      onUpdate(updatedDiscoveries);
    }
  };

  const removeDiscovery = (index) => {
    const updatedDiscoveries = discoveriesState.filter((_, i) => i !== index);
    setDiscoveriesState(updatedDiscoveries);
    if (onUpdate) {
      onUpdate(updatedDiscoveries);
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
          Notable Discoveries
        </h2>
        {isEditing && (
          <button 
            onClick={addNewDiscovery}
            className="p-2 rounded-full hover:bg-white/10 transition-colors"
          >
            <Plus className="w-4 h-4 text-gray-400" />
          </button>
        )}
      </div>

      <div className="space-y-4">
        {discoveriesState.map((player, i) => (
          <div
            key={i}
            className="flex justify-between items-center p-5 rounded-xl"
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <div className="flex-1">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={player.name}
                    onChange={(e) => handleDiscoveryChange(i, "name", e.target.value)}
                    placeholder="Player name"
                    className="w-full"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={player.position}
                      onChange={(e) => handleDiscoveryChange(i, "position", e.target.value)}
                      placeholder="Position"
                      className="flex-1"
                    />
                    <Input
                      value={player.year}
                      onChange={(e) => handleDiscoveryChange(i, "year", e.target.value)}
                      placeholder="Year"
                      className="w-20"
                    />
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-white font-medium">{player.name}</p>
                  <p className="text-sm text-gray-400">
                    {player.position} • Discovered {player.year}
                  </p>
                </>
              )}
            </div>
            <div>
              {isEditing ? (
                <div className="flex items-center gap-2">
                  <Input
                    value={player.club}
                    onChange={(e) => handleDiscoveryChange(i, "club", e.target.value)}
                    placeholder="Club"
                    className="text-primaryCyan font-medium mr-2"
                  />
                  <button 
                    onClick={() => removeDiscovery(i)}
                    className="text-red-500 hover:text-red-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <p className="text-primaryCyan font-medium">{player.club}</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
