"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

const primaryRegions = [
  "Spain",
  "England",
  "Germany",
  "France",
  "Italy",
  "Portugal",
  "Netherlands",
  "Brazil",
  "Argentina",
  "USA",
  "Africa",
  "Asia",
];

const secondaryRegions = [
  "Belgium",
  "Croatia",
  "Serbia",
  "Poland",
  "Turkey",
  "Mexico",
  "Colombia",
  "Uruguay",
  "Other",
];

const ageGroups = [
  "U-12",
  "U-14",
  "U-16",
  "U-18",
  "U-21",
  "U-23",
  "Senior",
  "All Ages",
];

const positions = [
  "Goalkeeper",
  "Defender",
  "Midfielder",
  "Forward",
  "Winger",
  "Striker",
  "All Positions",
];

const languages = [
  "English",
  "Spanish",
  "Portuguese",
  "French",
  "German",
  "Italian",
  "Dutch",
  "Arabic",
  "Other",
];

export default function ClubComplete2({ formData, updateFormData, onNext }) {
  const theme = useSelector((state) => state.theme);

  const [primaryFocus, setPrimaryFocus] = useState(
    formData.primaryRegions || []
  );
  const [secondaryFocus, setSecondaryFocus] = useState(
    formData.secondaryRegions || []
  );
  const [ageFocus, setAgeFocus] = useState(formData.ageGroups || []);
  const [positionFocus, setPositionFocus] = useState(formData.positions || []);
  const [spokenLanguages, setSpokenLanguages] = useState(
    formData.languages || []
  );

  // Required: at least one primary region and one age group
  const isComplete =
    primaryFocus.length > 0 && ageFocus.length > 0 && positionFocus.length > 0;

  const toggleSelection = (array, setter, value) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handleContinue = () => {
    if (isComplete) {
      updateFormData({
        primaryRegions: primaryFocus,
        secondaryRegions: secondaryFocus,
        ageGroups: ageFocus,
        positions: positionFocus,
        languages: spokenLanguages,
      });
      onNext();
    }
  };

  const BadgeToggle = ({ label, selected, onClick }) => (
    <Button
      variant="outline"
      className="py-3 px-6 text-base font-medium  cursor-pointer rounded-lg transition-all"
      style={{
        backgroundColor: selected
          ? `${theme.colors.primaryCyan}33`
          : theme.colors.backgroundDark,
        borderColor: selected
          ? `${theme.colors.primaryCyan}30`
          : `${theme.colors.primaryCyan}22`,
        color: "white",
        borderWidth: "2px",
      }}
      onClick={onClick}
    >
      {label}
    </Button>
  );

  return (
    <div className="max-w-6xl mx-auto">
      {/* Header */}
      <div className="text-center ">
        <div
          className="w-20 h-20 rounded-full mx-auto flex items-center justify-center mb-6"
          style={{
            background: `linear-gradient(135deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
          }}
        >
          <Globe className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Scouting Focus Areas
        </h2>
        <p className="text-gray-400 text-lg">
          Define your scouting regions and target profiles
        </p>
      </div>

      {/* Main Form Card */}
      <div className="rounded-2xl p-8 space-y-10">
        {/* Primary Scouting Regions */}
        <div>
          <Label className="text-gray-300 text-sm mb-4 flex items-center gap-2">
            Primary Scouting Regions * (Where you actively scout)
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
            {primaryRegions.map((region) => (
              <BadgeToggle
                key={region}
                label={region}
                selected={primaryFocus.includes(region)}
                onClick={() =>
                  toggleSelection(primaryFocus, setPrimaryFocus, region)
                }
              />
            ))}
          </div>
        </div>

        {/* Secondary Regions */}
        <div>
          <Label className="text-gray-300 text-sm  mb-4">
            Secondary Regions (Optional)
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3  mt-2 gap-4">
            {secondaryRegions.map((region) => (
              <BadgeToggle
                key={region}
                label={region}
                selected={secondaryFocus.includes(region)}
                onClick={() =>
                  toggleSelection(secondaryFocus, setSecondaryFocus, region)
                }
              />
            ))}
          </div>
        </div>

        {/* Age Group Focus */}
        <div>
          <Label className="text-gray-300 text-sm  mb-4">
            Age Group Focus *
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {ageGroups.map((age) => (
              <BadgeToggle
                key={age}
                label={age}
                selected={ageFocus.includes(age)}
                onClick={() => toggleSelection(ageFocus, setAgeFocus, age)}
              />
            ))}
          </div>
        </div>

        {/* Position Focus */}
        <div>
          <Label className="text-gray-300 text-sm  mb-4">
            Position Focus *
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
            {positions.map((pos) => (
              <BadgeToggle
                key={pos}
                label={pos}
                selected={positionFocus.includes(pos)}
                onClick={() =>
                  toggleSelection(positionFocus, setPositionFocus, pos)
                }
              />
            ))}
          </div>
        </div>

        {/* Languages Spoken */}
        <div>
          <Label className="text-gray-300 text-sm  mb-4">
            Languages Spoken (Helpful for scouting)
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
            {languages.map((lang) => (
              <BadgeToggle
                key={lang}
                label={lang}
                selected={spokenLanguages.includes(lang)}
                onClick={() =>
                  toggleSelection(spokenLanguages, setSpokenLanguages, lang)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
