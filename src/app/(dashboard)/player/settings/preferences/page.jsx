"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/Checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/player/select";

export default function PreferencesPage() {
  const theme = useSelector((state) => state.theme);

  // Language & Timezone
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("madrid");

  // Preferences state
  const [saveSearchHistory, setSaveSearchHistory] = useState(true);
  const [showEventRecommendations, setShowEventRecommendations] =
    useState(true);

  const handleSave = () => {
    console.log("Preferences saved");
  };

  return (
    <div
      className="space-y-8 p-6 rounded-xl"
      style={{
        backgroundColor: theme.colors.backgroundCard,
      }}
    >
      {/* Language & Region */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Language & Region</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language Select */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                }}
              >
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              >
                <SelectItem value="english">English</SelectItem>
                <SelectItem value="spanish">Spanish</SelectItem>
                <SelectItem value="french">French</SelectItem>
                <SelectItem value="german">German</SelectItem>
                <SelectItem value="portuguese">Portuguese</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Timezone Select */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Timezone
            </label>
            <Select value={timezone} onValueChange={setTimezone}>
              <SelectTrigger
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                }}
              >
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              >
                <SelectItem value="madrid">GMT+1 (Madrid)</SelectItem>
                <SelectItem value="london">GMT+0 (London)</SelectItem>
                <SelectItem value="newyork">GMT-5 (New York)</SelectItem>
                <SelectItem value="dubai">GMT+4 (Dubai)</SelectItem>
                <SelectItem value="tokyo">GMT+9 (Tokyo)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Search Preferences */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">
          Search Preferences
        </h2>

        <div className="space-y-4">
          {/* Save search history */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setSaveSearchHistory(!saveSearchHistory)}
          >
            <div>
              <h3 className="text-white font-medium">Save search history</h3>
              <p className="text-sm text-gray-400">
                Remember your recent searches
              </p>
            </div>
            <Checkbox
              checked={saveSearchHistory}
              onCheckedChange={setSaveSearchHistory}
            />
          </div>

          {/* Show event recommendations */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() =>
              setShowEventRecommendations(!showEventRecommendations)
            }
          >
            <div>
              <h3 className="text-white font-medium">
                Show event recommendations
              </h3>
              <p className="text-sm text-gray-400">
                Get personalized event suggestions
              </p>
            </div>
            <Checkbox
              checked={showEventRecommendations}
              onCheckedChange={setShowEventRecommendations}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="pt-8">
        <Button
          variant="common"
          onClick={handleSave}
          className="w-full  text-white font-medium py-6 text-lg"
          style={{
            backgroundImage: "none",
            boxShadow: "0 4px 15px rgba(0, 229, 255, 0.3)",
          }}
        >
          Save Preferences
        </Button>
      </div>
    </div>
  );
}
