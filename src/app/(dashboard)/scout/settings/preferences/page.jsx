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
import Toggle from "@/components/ui/Toggle";
import { Languages } from "lucide-react";

export default function PreferencesPage() {
  const theme = useSelector((state) => state.theme);

  // Language & Timezone
  const [language, setLanguage] = useState("english");
  const [timezone, setTimezone] = useState("madrid");
  const [dateFormat, setDateFormat] = useState("dd/mm/yyyy");
  const [currency, setCurrency] = useState("usd");

  // Preferences state
  const [saveSearchHistory, setSaveSearchHistory] = useState(true);
  const [showEventRecommendations, setShowEventRecommendations] =
    useState(true);

  const handleSave = () => {
    console.log({
      language,
      timezone,
      dateFormat,
      currency,
      saveSearchHistory,
      showEventRecommendations,
    });
  };

  const cardStyle = {
    backgroundColor: theme?.colors?.backgroundDark,
    border: `1px solid ${theme?.colors?.primaryCyan}33`,
  };

  return (
    <div
      className="space-y-8 p-6 rounded-xl mt-12 border"
      style={{
        backgroundColor: theme?.colors?.backgroundCard,
        border: `1px solid ${theme?.colors?.primaryCyan}33`,
      }}
    >
      {/* Language & Region */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white flex gap-2 items-center">
          {" "}
          <Languages className="w-6 h-6" style={{ color: theme?.colors?.primaryCyan }} /> Language & Region
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Language Select */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Language
            </label>
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger style={cardStyle}>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent style={cardStyle}>
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
              <SelectTrigger style={cardStyle}>
                <SelectValue placeholder="Select timezone" />
              </SelectTrigger>
              <SelectContent style={cardStyle}>
                <SelectItem value="madrid">GMT+1 (Madrid)</SelectItem>
                <SelectItem value="london">GMT+0 (London)</SelectItem>
                <SelectItem value="newyork">GMT-5 (New York)</SelectItem>
                <SelectItem value="dubai">GMT+4 (Dubai)</SelectItem>
                <SelectItem value="tokyo">GMT+9 (Tokyo)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Date Format Select */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Date Format
            </label>
            <Select value={dateFormat} onValueChange={setDateFormat}>
              <SelectTrigger style={cardStyle}>
                <SelectValue placeholder="Select date format" />
              </SelectTrigger>
              <SelectContent style={cardStyle}>
                <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Currency Select */}
          <div>
            <label className="text-sm font-medium text-white mb-2 block">
              Currency
            </label>
            <Select value={currency} onValueChange={setCurrency}>
              <SelectTrigger style={cardStyle}>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent style={cardStyle}>
                <SelectItem value="usd">USD ($)</SelectItem>
                <SelectItem value="eur">EUR (€)</SelectItem>
                <SelectItem value="gbp">GBP (£)</SelectItem>
                <SelectItem value="bdt">BDT (৳)</SelectItem>
                <SelectItem value="jpy">JPY (¥)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Search Preferences */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white">Search Preferences</h2>

        <div className="space-y-4">
          {/* Save search history */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={cardStyle}
            onClick={() => setSaveSearchHistory(!saveSearchHistory)}
          >
            <div>
              <h3 className="text-white font-medium">Save search history</h3>
              <p className="text-sm text-gray-400">
                Remember your recent searches
              </p>
            </div>
            <Toggle
              checked={saveSearchHistory}
              onChange={setSaveSearchHistory}
              theme={theme}
            />
          </div>

          {/* Show event recommendations */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={cardStyle}
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

            <Toggle
              checked={showEventRecommendations}
              onChange={setShowEventRecommendations}
              theme={theme}
            />
          </div>
        </div>
      </div>

      {/* Save Button */}
      <Button
        variant="common"
        onClick={handleSave}
        className="w-full text-white font-medium py-6 text-lg"
        style={{
          backgroundColor: theme?.colors?.button,
          boxShadow: `0 4px 15px ${theme?.colors?.button}4d`,
        }}
      >
        Save Preferences
      </Button>
    </div>
  );
}
