"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { showSuccessToast } from "@/components/ui/toast";

export default function NotificationsPage() {
  const theme = useSelector((state) => state.theme);

  // Email Notifications state
  const [newMessageNotifications, setNewMessageNotifications] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [profileViews, setProfileViews] = useState(false);
  const [newsUpdates, setNewsUpdates] = useState(true);

  // Push Notifications state
  const [enablePush, setEnablePush] = useState(true);
  const [soundNotifications, setSoundNotifications] = useState(true);

  const handleSave = () => {
    // Save logic here (e.g., dispatch to store or API)
    showSuccessToast("Notification settings saved successfully!");
  };

  const handleCancel = () => {
    // Reset to initial/default values
    setNewMessageNotifications(true);
    setEventReminders(true);
    setProfileViews(false);
    setNewsUpdates(true);
    setEnablePush(true);
    setSoundNotifications(true);
  };

  // Reusable Toggle Switch (matches your app's cyan theme)
  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
      style={{
        backgroundColor: checked ? theme.colors.primaryCyan : "#374151",
      }}
    >
      <span
        aria-hidden="true"
        className={`pointer-events-none mt-0.5  inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
          checked ? "translate-x-5 " : "translate-x-0"
        }`}
      />
    </button>
  );

  return (
    <div
      className="space-y-8 p-6 "
      style={{
        backgroundColor: theme.colors.backgroundCard,
      }}
    >
      {/* Email Notifications */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">
          Email Notifications
        </h2>

        <div className="space-y-4">
          {/* New message notifications */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setNewMessageNotifications(!newMessageNotifications)}
          >
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-white font-medium">
                  New message notifications
                </h3>
                <p className="text-sm text-gray-400">
                  Get notified when you receive new messages
                </p>
              </div>
            </div>
            <Toggle
              checked={newMessageNotifications}
              onChange={setNewMessageNotifications}
            />
          </div>

          {/* Event reminders */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setEventReminders(!eventReminders)}
          >
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-white font-medium">Event reminders</h3>
                <p className="text-sm text-gray-400">
                  Receive reminders for upcoming events
                </p>
              </div>
            </div>
            <Toggle checked={eventReminders} onChange={setEventReminders} />
          </div>

          {/* Profile views */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setProfileViews(!profileViews)}
          >
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-white font-medium">Profile views</h3>
                <p className="text-sm text-gray-400">
                  Know when clubs or scouts view your profile
                </p>
              </div>
            </div>
            <Toggle checked={profileViews} onChange={setProfileViews} />
          </div>

          {/* News & updates */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setNewsUpdates(!newsUpdates)}
          >
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-white font-medium">News & updates</h3>
                <p className="text-sm text-gray-400">
                  Receive platform news and training content
                </p>
              </div>
            </div>
            <Toggle checked={newsUpdates} onChange={setNewsUpdates} />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div>
        <h2 className="text-xl font-bold text-white mb-6">
          Push Notifications
        </h2>

        <div className="space-y-4">
          {/* Enable push notifications */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setEnablePush(!enablePush)}
          >
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-white font-medium">
                  Enable push notifications
                </h3>
                <p className="text-sm text-gray-400">
                  Receive real-time notifications
                </p>
              </div>
            </div>
            <Toggle checked={enablePush} onChange={setEnablePush} />
          </div>

          {/* Sound for notifications */}
          <div
            className="flex items-center justify-between p-5 rounded-lg border cursor-pointer hover:opacity-90 transition-all"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
            onClick={() => setSoundNotifications(!soundNotifications)}
          >
            <div className="flex items-start gap-4">
              <div>
                <h3 className="text-white font-medium">
                  Sound for notifications
                </h3>
                <p className="text-sm text-gray-400">
                  Play sound when notifications arrive
                </p>
              </div>
            </div>
            <Toggle
              checked={soundNotifications}
              onChange={setSoundNotifications}
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
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
}
