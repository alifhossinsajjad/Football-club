"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Building, Globe, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";

const additionalFacilities = [
  "Indoor Training Facilities",
  "Medical Staff & Facilities",
  "Physiotherapy & Rehab Unit",
];

const ageGroups = [
  "U-8",
  "U-10",
  "U-12",
  "U-14",
  "U-16",
  "U-18",
  "U-21",
  "Senior",
];

const trainingPrograms = [
  "Technical Skills",
  "Tactical Gaming",
  "Physical Conditioning",
  "Goalkeeper Training",
  "Mental Coaching",
];

export default function ClubComplete3({ formData, updateFormData, onNext }) {
  const theme = useSelector((state) => state.theme);

  const [numberOfPitches, setNumberOfPitches] = useState(
    formData.numberOfPitches || ""
  );
  const [additionalFocus, setAdditionalFocus] = useState(
    formData.additionalFacilities || []
  );
  const [ageFocus, setAgeFocus] = useState(formData.ageGroups || []);
  const [programFocus, setProgramFocus] = useState(
    formData.trainingPrograms || []
  );
  const [website, setWebsite] = useState(formData.website || "");
  const [instagram, setInstagram] = useState(formData.instagram || "");
  const [twitter, setTwitter] = useState(formData.twitter || "");

  // Required: number of pitches, at least one age group and one program
  const isComplete =
    numberOfPitches !== "" && ageFocus.length > 0 && programFocus.length > 0;

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
        numberOfPitches,
        additionalFacilities: additionalFocus,
        ageGroups: ageFocus,
        trainingPrograms: programFocus,
        website,
        instagram,
        twitter,
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
          <Building className="w-10 h-10 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-3">
          Facilities & Programs
        </h2>
        <p className="text-gray-400 text-lg">
          Tell us about your facilities, training programs
        </p>
      </div>

      {/* Main Form Card */}
      <div className="rounded-2xl p-8 space-y-10">
        {/* Number of Training Pitches */}
        <div>
          <Label className="text-gray-300 text-sm mb-4 flex items-center gap-2">
            Number of Training Pitches *
          </Label>
          <Input
            placeholder=""
            className="h-12"
            value={numberOfPitches}
            onChange={(e) => setNumberOfPitches(e.target.value)}
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          />
        </div>

        {/* Additional Training Facilities */}
        <div>
          <Label className="text-gray-300 text-sm  mb-4">
            Additional Training Facilities
          </Label>
          <div className="grid grid-cols-2 md:grid-cols-3  gap-4">
            {additionalFacilities.map((facility) => (
              <BadgeToggle
                key={facility}
                label={facility}
                selected={additionalFocus.includes(facility)}
                onClick={() =>
                  toggleSelection(additionalFocus, setAdditionalFocus, facility)
                }
              />
            ))}
          </div>
        </div>

        {/* Age Group Focus */}
        <div>
          <Label className="text-gray-300 text-sm  mb-4">
            Age Groups We Work With (that apply)
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

        {/* Training Programs */}
        <div>
          <Label className="text-gray-300 text-sm  mb-4">
            Training Programs We Offer
          </Label>
          <div className="grid grid-cols-1 gap-4 mt-2">
            {trainingPrograms.map((program) => (
              <BadgeToggle
                key={program}
                label={program}
                selected={programFocus.includes(program)}
                onClick={() =>
                  toggleSelection(programFocus, setProgramFocus, program)
                }
              />
            ))}
          </div>
        </div>

        {/* Social Media */}
        <div>
          <Label className="text-gray-300 text-sm  mb-4">
            Social Media (Optional)
          </Label>
          <div className="space-y-4 mt-2">
            <div className="relative">
              <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="https://yourclub.com"
                className="h-12 pl-10"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              />
            </div>
            <div className="relative">
              <Instagram className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="https://instagram.com/yourclub"
                className="h-12 pl-10"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              />
            </div>
            <div className="relative">
              <Twitter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="https://twitter.com/yourclub"
                className="h-12 pl-10"
                value={twitter}
                onChange={(e) => setTwitter(e.target.value)}
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
