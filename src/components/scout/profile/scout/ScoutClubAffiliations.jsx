// ClubAffiliations.jsx
"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function ScoutClubAffiliations({
  affiliations: initialAffiliations,
  isEditing,
  onUpdate,
  theme,
}) {
  const [affiliations, setAffiliations] = useState(initialAffiliations || []);
  const [newClub, setNewClub] = useState("");

  const addAffiliation = () => {
    if (newClub.trim()) {
      const updated = [...affiliations, newClub.trim()];
      setAffiliations(updated);
      setNewClub("");
      if (onUpdate) onUpdate(updated);
    }
  };

  const removeAffiliation = (index) => {
    const updated = affiliations.filter((_, i) => i !== index);
    setAffiliations(updated);
    if (onUpdate) onUpdate(updated);
  };

  return (
    <div
      className="rounded-xl p-8 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Club Affiliations</h2>

      <div className="space-y-4">
        {affiliations.map((club, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-5 rounded-xl"
            style={{
              background: `linear-gradient(180deg, ${theme.colors.primaryCyan}11, ${theme.colors.primaryMagenta}11)`,
            }}
          >
            <p className="text-white text-sm">{club}</p>
            {isEditing && (
              <button
                onClick={() => removeAffiliation(index)}
                className="text-red-400 hover:text-red-300 text-sm font-medium"
              >
                Remove
              </button>
            )}
          </div>
        ))}

        {affiliations.length === 0 && !isEditing && (
          <p className="text-center text-gray-500 py-4">
            No club affiliations listed yet.
          </p>
        )}
      </div>

      {isEditing && (
        <div className="mt-6 flex gap-3">
          <Input
            value={newClub}
            onChange={(e) => setNewClub(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addAffiliation()}
            placeholder="Add new club affiliation..."
            className="flex-1 h-12 rounded-lg"
          />
          <Button
            onClick={addAffiliation}
            className="rounded-lg px-8"
            style={{ backgroundColor: theme.colors.primaryCyan }}
          >
            Add
          </Button>
        </div>
      )}
    </div>
  );
}
