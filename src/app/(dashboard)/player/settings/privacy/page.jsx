"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/Checkbox";
import { MoveRight, Shield } from "lucide-react";

export default function PrivacySettingsPage() {
  const theme = useSelector((state) => state.theme);

  // Local state for checkboxes
  const [visibilityClubs, setVisibilityClubs] = useState(true);
  const [visibilityScouts, setVisibilityScouts] = useState(false);
  const [showAgePublicly, setShowAgePublicly] = useState(true);
  const [showContactPublicly, setShowContactPublicly] = useState(false);
  const [allowDirectMessages, setAllowDirectMessages] = useState(true);

  const handleSave = () => {
    console.log("Privacy settings saved");
  };

  return (
    <div
      className="space-y-8 p-6 rounded-xl"
      style={{
        backgroundColor: theme.colors.backgroundCard,
      }}
    >
      {/* Profile Visibility */}
      <div>
        <h2 className="text-xl  font-bold text-white mb-6">
          Profile Visibility
        </h2>

        <div className="space-y-4">
          {/* Make profile visible to clubs */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-white font-medium">
                  Make my profile visible to clubs
                </h3>
                <p className="text-sm text-gray-400">
                  Allow clubs to view your complete profile
                </p>
              </div>
            </div>
            <Checkbox
              checked={visibilityClubs}
              onCheckedChange={setVisibilityClubs}
            />
          </div>

          {/* Make profile visible to scouts */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-white font-medium">
                  Make my profile visible to scouts
                </h3>
                <p className="text-sm text-gray-400">
                  Allow scouts to discover your profile
                </p>
              </div>
            </div>
            <Checkbox
              checked={visibilityScouts}
              onCheckedChange={setVisibilityScouts}
            />
          </div>

          {/* Show age publicly */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-white font-medium">Show my age publicly</h3>
                <p className="text-sm text-gray-400">
                  Display your age on your profile
                </p>
              </div>
            </div>
            <Checkbox
              checked={showAgePublicly}
              onCheckedChange={setShowAgePublicly}
            />
          </div>
        </div>
      </div>

      {/* Contact Privacy */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Contact Privacy</h2>

        <div className="space-y-4">
          {/* Show contact details publicly */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-white font-medium">
                  Show contact details publicly
                </h3>
                <p className="text-sm text-gray-400">
                  Display email and phone on your profile
                </p>
              </div>
            </div>
            <Checkbox
              checked={showContactPublicly}
              onCheckedChange={setShowContactPublicly}
            />
          </div>

          {/* Allow direct messages */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center gap-4">
              <div>
                <h3 className="text-white font-medium">
                  Allow direct messages
                </h3>
                <p className="text-sm text-gray-400">
                  Receive messages from clubs and scouts
                </p>
              </div>
            </div>
            <Checkbox
              checked={allowDirectMessages}
              onCheckedChange={setAllowDirectMessages}
            />
          </div>
        </div>
      </div>

      {/* Data & Privacy */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Data & Privacy</h2>

        <div
          className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
          onClick={() => {
            console.log("Download data requested");
          }}
        >
          <div className="flex items-center gap-4">
            <Shield
              className="w-6 h-6"
              style={{ color: theme.colors.primaryCyan }}
            />
            <div>
              <h3 className="text-white font-medium">Download My Data</h3>
              <p className="text-sm text-gray-400">
                Export all your personal data
              </p>
            </div>
          </div>
          <h1
            className="text-sm font-medium"
            style={{
              color: `${theme.colors.primaryCyan}`,
            }}
          >
            Download
          </h1>
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
          Save Privacy Settings
        </Button>
      </div>
    </div>
  );
}
