"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/player/select";
import { Trophy, ChevronLeft, ChevronRight } from "lucide-react";

const rangeOptions = ["0-10", "11-25", "26-50", "51-100", "100+"];

export default function ClubComplete3({
  formData,
  updateFormData,
  onNext,
  onBack,
}) {
  const theme = useSelector((state) => state.theme);

  const [playersDiscovered, setPlayersDiscovered] = useState(
    formData.playersDiscovered || ""
  );
  const [contractsSigned, setContractsSigned] = useState(
    formData.contractsSigned || ""
  );
  const [notableDiscoveries, setNotableDiscoveries] = useState(
    formData.notableDiscoveries || ""
  );
  const [clubAffiliations, setClubAffiliations] = useState(
    formData.clubAffiliations || ""
  );

  // Required fields
  const isComplete = playersDiscovered && contractsSigned;

  const handleContinue = () => {
    if (isComplete) {
      updateFormData({
        playersDiscovered,
        contractsSigned,
        notableDiscoveries,
        clubAffiliations,
      });
      onNext();
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="text-center mb-10">
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
          }}
        >
          <Trophy className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Experience & Track Record
        </h2>
        <p className="text-gray-400 text-base">
          Share your scouting achievements
        </p>
      </div>

      {/* Main Form Card */}
      {/* Players Discovered & Contracts Signed */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Label className="text-gray-400 text-sm mb-4 block">
            Players Discovered *
          </Label>
          <Select
            value={playersDiscovered}
            onValueChange={setPlayersDiscovered}
          >
            <SelectTrigger
              className="h-14 text-base"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}66`,
                color: "white",
              }}
            >
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent
              style={{ borderColor: `${theme.colors.primaryCyan}66` }}
            >
              {rangeOptions.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="text-gray-400 text-sm mb-4 block">
            Contracts Signed *
          </Label>
          <Select
            value={contractsSigned}
            onValueChange={setContractsSigned}
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <SelectTrigger
              className="h-14 text-base"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}66`,
                color: "white",
              }}
            >
              <SelectValue placeholder="Select Range" />
            </SelectTrigger>
            <SelectContent>
              {rangeOptions.map((range) => (
                <SelectItem key={range} value={range}>
                  {range}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Notable Discoveries */}
      <div>
        <Label className="text-gray-400 text-sm mb-4 pt-4 block">
          Notable Discoveries (Optional)
        </Label>
        <Textarea
          placeholder="List any notable players you've discovered or worked with"
          value={notableDiscoveries}
          onChange={(e) => setNotableDiscoveries(e.target.value)}
          className="min-h-32 resize-none text-base"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}66`,
            color: "white",
            placeholder: { color: "#9ca3af" },
          }}
        />
      </div>

      {/* Club Affiliations */}
      <div>
        <Label className="text-gray-400 text-sm mb-4 block pt-4">
          Club Affiliations (Optional)
        </Label>
        <Textarea
          placeholder="List clubs you've worked with or have relationships with"
          value={clubAffiliations}
          onChange={(e) => setClubAffiliations(e.target.value)}
          className="min-h-32 resize-none text-base"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}66`,
            color: "white",
          }}
        />
      </div>
    </div>
  );
}
