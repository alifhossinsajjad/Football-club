"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/Checkbox";
import { Eye, EyeOff, Laptop, Lock, Smartphone, X } from "lucide-react";
import Toggle from "@/components/ui/Toggle";

export default function AccountSecurityPage() {
  const theme = useSelector((state) => state.theme);

  // Password change form state
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Privacy toggles state (matching the screenshot exactly)
  const [profileVisibility, setProfileVisibility] = useState(true);
  const [contactRequests, setContactRequests] = useState(true);
  const [showOnlineStatus, setShowOnlineStatus] = useState(false);
  const [activityHistory, setActivityHistory] = useState(true);

  const handleUpdatePassword = () => {
    console.log("Password update requested");
  };

  const handleSignOutOthers = () => {
    console.log("Sign out all other sessions");
  };

  // State to toggle password visibility
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <section>
      {/* Change Password Section */}
      <div
        className="space-y-8 p-6 mt-12 border rounded-xl"
        style={{
          backgroundColor: theme?.colors?.backgroundCard || "#1F2937",
          borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
        }}
      >
        <div className="space-y-6">
          <span className="text-2xl font-bold flex items-center gap-2 text-white">
            <Lock
              className="w-6 h-6"
              style={{
                color: theme?.colors?.primaryCyan || "#04B5A3"
              }}
            />
            <span className="pt-1">Change Password</span>
          </span>

          <div className="space-y-4">
            {/* Current Password */}
            <div className="relative">
              <Label htmlFor="current" className="text-gray-400">
                Current Password
              </Label>
              <Input
                id="current"
                type={showCurrent ? "text" : "password"}
                placeholder="Enter current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className="mt-2 bg-transparent border-gray-700 text-white placeholder-gray-600 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowCurrent(!showCurrent)}
                className="absolute right-3 top-[70%] py-4 -translate-y-1/2 text-gray-400"
              >
                {showCurrent ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* New Password */}
            <div className="relative">
              <Label htmlFor="new" className="text-gray-400">
                New Password
              </Label>
              <Input
                id="new"
                type={showNew ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="mt-2 bg-transparent border-gray-700 text-white placeholder-gray-600 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowNew(!showNew)}
                className="absolute right-3 top-[50%] -translate-y-1/2 text-gray-400"
              >
                {showNew ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              <p className="text-sm text-gray-500 mt-1">
                Must be at least 8 characters with uppercase, lowercase, and
                numbers
              </p>
            </div>

            {/* Confirm Password */}
            <div className="relative">
              <Label htmlFor="confirm" className="text-gray-400">
                Confirm New Password
              </Label>
              <Input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                placeholder="Confirm new password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-2 bg-transparent border-gray-700 text-white placeholder-gray-600 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-[50%] -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <Button
              variant="outline"
              onClick={handleUpdatePassword}
              className="w-full py-6 text-lg font-medium text-white"
              style={{
                backgroundColor: theme?.colors?.button || "#04B5A3",
                boxShadow: `0 4px 20px ${theme?.colors?.button || "#04B5A3"}4d`,
              }}
            >
              Update Password
            </Button>
          </div>
        </div>
      </div>
      {/* Privacy Settings Section */}
      <div
        className="space-y-8 p-6 mt-12 border rounded-xl "
        style={{
          backgroundColor: theme?.colors?.backgroundCard || "#1F2937",
          borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
        }}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Privacy Settings</h2>

          <div className="space-y-4">
            {/* Profile Visibility */}
            <div
              className="flex items-center justify-between p-5 rounded-lg border"
              style={{
                backgroundColor: theme?.colors?.backgroundDark || "#111827",
                borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
              }}
            >
              <div>
                <h3 className="text-white font-medium">Profile Visibility</h3>
                <p className="text-sm text-gray-400">
                  Allow others to view your profile
                </p>
              </div>

              <Toggle
                checked={profileVisibility}
                onChange={setProfileVisibility}
                theme={theme}
              />
            </div>

            {/* Contact Requests */}
            <div
              className="flex items-center justify-between p-5 rounded-lg border"
              style={{
                backgroundColor: theme?.colors?.backgroundDark || "#111827",
                borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
              }}
            >
              <div>
                <h3 className="text-white font-medium">Contact Requests</h3>
                <p className="text-sm text-gray-400">
                  Allow players and clubs to message you
                </p>
              </div>

              <Toggle
                checked={contactRequests}
                onChange={setContactRequests}
                theme={theme}
              />
            </div>

            {/* Show Online Status */}
            <div
              className="flex items-center justify-between p-5 rounded-lg border"
              style={{
                backgroundColor: theme?.colors?.backgroundDark || "#111827",
                borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
              }}
            >
              <div>
                <h3 className="text-white font-medium">Show Online Status</h3>
                <p className="text-sm text-gray-400">
                  Let others see when you're active
                </p>
              </div>
              <Toggle
                checked={showOnlineStatus}
                onChange={setShowOnlineStatus}
                theme={theme}
              />
            </div>

            {/* Activity History */}
            <div
              className="flex items-center justify-between p-5 rounded-lg border"
              style={{
                backgroundColor: theme?.colors?.backgroundDark || "#111827",
                borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
              }}
            >
              <div>
                <h3 className="text-white font-medium">Activity History</h3>
                <p className="text-sm text-gray-400">
                  Track your platform activity and player views
                </p>
              </div>

              <Toggle
                checked={activityHistory}
                onChange={setActivityHistory}
                theme={theme}
              />
            </div>
          </div>
        </div>
      </div>
      {/* Active Sessions Section */}
      <div
        className="space-y-8 p-6 mt-12 border rounded-xl "
        style={{
          backgroundColor: theme?.colors?.backgroundCard || "#1F2937",
          borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
        }}
      >
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white">Active Sessions</h2>

          <div className="space-y-4">
            {/* Current Session */}
            <div
              className="flex items-center justify-between p-5 rounded-lg border relative"
              style={{
                backgroundColor: theme?.colors?.backgroundDark || "#111827",
                borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00E5FF33] rounded-lg flex items-center justify-center">
                  <Laptop className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-white ">
                    MacBook Pro{" "}
                    <span
                      style={{
                        backgroundColor: theme?.colors?.greenBg || "#10B981"
                      }}
                      className="px-2 py-1 text-xs rounded-lg"
                    >
                      Current
                    </span>
                  </p>
                  <p className="text-sm text-gray-400">
                    London, UK • Active now
                  </p>
                </div>
              </div>
              <span className="text-green-400 text-sm font-medium">Active</span>
            </div>

            {/* Other Session */}
            <div
              className="flex items-center justify-between p-5 rounded-lg border relative"
              style={{
                backgroundColor: theme?.colors?.backgroundDark || "#111827",
                borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
              }}
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#00E5FF33] rounded-lg flex items-center justify-center">
                  <Smartphone className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <p className="text-white font-medium">Chrome on Windows</p>
                  <p className="text-sm text-gray-400">
                    Manchester, UK • 3 days ago
                  </p>
                </div>
              </div>
              <Button variant="outline" className="absolute top-4 right-4">
                <X className="w-5 h-5 text-red-500 hover:text-red-300 border border-red-500 " />
              </Button>
            </div>
          </div>

          <Button
            variant="outline"
            onClick={handleSignOutOthers}
            className="w-full py-6 text-md  text-[#FF6467] border border-red-500  hover:bg-red-400 hover:text-white"
          >
            Sign Out All Other Sessions
          </Button>
        </div>
      </div>
    </section>
  );
}
