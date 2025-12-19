"use client";

import { useSelector } from "react-redux";
import {
  Lock,
  Mail,
  Globe,
  Trash2,
  LogOut,
  Smartphone,
  Monitor,
  ArrowRight,
  MoveRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AccountSettingsPage() {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="space-y-8 p-6 rounded-xl "
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}`,
      }}
    >
      {/* Account Actions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Account Actions</h2>

        <div className="space-y-4">
          {/* Change Password */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center gap-4">
              <Lock
                className="w-6 h-6"
                style={{ color: theme.colors.primaryCyan }}
              />
              <div>
                <h3 className="text-white font-medium">Change Password</h3>
                <p className="text-sm text-gray-400">
                  Update your account password
                </p>
              </div>
            </div>
            <div className="text-gray-500">
              <MoveRight className="w-5 h-5" />
            </div>
          </div>

          {/* Email Preferences */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center gap-4">
              <Mail
                className="w-6 h-6"
                style={{ color: theme.colors.primaryCyan }}
              />
              <div>
                <h3 className="text-white font-medium">Email Preferences</h3>
                <p className="text-sm text-gray-400">
                  Manage your email settings
                </p>
              </div>
            </div>
            <div className="text-gray-500">
              <MoveRight className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">Active Sessions</h2>

        <div className="space-y-4">
          {/* Current Session */}
          <div
            className="p-5 rounded-lg border"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-white font-medium">Chrome on Windows</h3>
                  <p className="text-sm text-gray-400">Madrid, Spain</p>
                </div>
              </div>
            </div>
            <div className="">
              <span className="text-sm  text-[#05DF72]">Current session</span>
            </div>
          </div>

          {/* Other Session */}
          <div
            className="p-5 rounded-lg border"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div>
                  <h3 className="text-white font-medium">Safari on iPhone</h3>
                  <p className="text-sm text-gray-400">Barcelona, Spain</p>
                </div>
              </div>
              <button className="text-sm font-medium text-red-500 hover:text-red-400 transition-colors">
                Revoke
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Account */}
      <div>
        <div
          className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center gap-4">
            <Trash2 className="w-6 h-6 text-red-500" />
            <div>
              <h3 className="text-white font-medium">Delete Account</h3>
              <p className="text-sm text-gray-400">
                Permanently delete your account and data
              </p>
            </div>
          </div>
          <div className="text-red-500">
            <MoveRight className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Save Button */}

      <div className="pt-8">
        <Button
          onClick={() => {
            console.log("Save button clicked");
          }}
          className="w-full rounded-full text-white font-medium py-6 text-lg"
          style={{
            backgroundColor: theme.colors.primaryCyan,
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
