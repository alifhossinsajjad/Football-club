"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Bell, Smartphone, MessageSquare, Mail, Phone } from "lucide-react";
import Toggle from "@/components/ui/Toggle";
import NotificationItem from "@/components/ui/notification/NotificationItem";
import NotificationSection from "@/components/ui/notification/NotificationSection";

export default function NotificationsPage() {
  const theme = useSelector((state) => state.theme);

  // Email Notifications
  const [newPlayerMatches, setNewPlayerMatches] = useState(true);
  const [eventUpdates, setEventUpdates] = useState(true);
  const [playerProfileViews, setPlayerProfileViews] = useState(false);
  const [messageNotifications, setMessageNotifications] = useState(true);
  const [weeklySummary, setWeeklySummary] = useState(true);
  const [platformUpdates, setPlatformUpdates] = useState(false);

  // Push Notifications
  const [instantMessages, setInstantMessages] = useState(true);
  const [eventReminders, setEventReminders] = useState(true);
  const [shortlistUpdates, setShortlistUpdates] = useState(false);

  // SMS Notifications
  const [securityAlerts, setSecurityAlerts] = useState(true);
  const [loginVerification, setLoginVerification] = useState(true);

  const handleSave = () => {
    console.log("Notification settings saved");
    // Add toast or success feedback here if needed
  };

  return (
    <div
      className="space-y-8  min-h-screen mt-12"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      {/* Email Notifications */}
      <NotificationSection
        icon={Mail}
        title="Email Notifications"
        theme={theme}
      >
        <div className="space-y-6">
          <NotificationItem
            title="New Player Matches"
            description="Get notified when new players match your search criteria"
            checked={newPlayerMatches}
            onChange={setNewPlayerMatches}
            theme={theme}
          />
          <NotificationItem
            title="Event Updates"
            description="Receive updates about upcoming scouting events"
            checked={eventUpdates}
            onChange={setEventUpdates}
            theme={theme}
          />
          <NotificationItem
            title="Player Profile Views"
            description="Know when players view your profile"
            checked={playerProfileViews}
            onChange={setPlayerProfileViews}
            theme={theme}
          />
          <NotificationItem
            title="Message Notifications"
            description="Get notified about new messages"
            checked={messageNotifications}
            onChange={setMessageNotifications}
            theme={theme}
          />
          <NotificationItem
            title="Weekly Summary"
            description="Receive a weekly summary of your activity"
            checked={weeklySummary}
            onChange={setWeeklySummary}
            theme={theme}
          />
          <NotificationItem
            title="Platform Updates"
            description="Stay informed about new features and updates"
            checked={platformUpdates}
            onChange={setPlatformUpdates}
            theme={theme}
          />
        </div>
      </NotificationSection>

      {/* Push Notifications */}
      <NotificationSection icon={Bell} title="Push Notifications" theme={theme}>
        <div className="space-y-6">
          <NotificationItem
            title="Instant Messages"
            description="Real-time notifications for new messages"
            checked={instantMessages}
            onChange={setInstantMessages}
            theme={theme}
          />
          <NotificationItem
            title="Event Reminders"
            description="Reminders 24 hours before scouting events"
            checked={eventReminders}
            onChange={setEventReminders}
            theme={theme}
          />
          <NotificationItem
            title="Shortlist Updates"
            description="When shortlisted players update their profiles"
            checked={shortlistUpdates}
            onChange={setShortlistUpdates}
            theme={theme}
          />
        </div>
      </NotificationSection>

      {/* SMS Notifications */}
      <NotificationSection icon={Phone} title="SMS Notifications" theme={theme}>
        <div className="space-y-6">
          <NotificationItem
            title="Security Alerts"
            description="Important security notifications"
            checked={securityAlerts}
            onChange={setSecurityAlerts}
            theme={theme}
          />
          <NotificationItem
            title="Login Verification"
            description="Two-factor authentication codes"
            checked={loginVerification}
            onChange={setLoginVerification}
            theme={theme}
          />
        </div>
      </NotificationSection>
    </div>
  );
}
