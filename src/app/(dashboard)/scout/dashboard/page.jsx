"use client";

import { useSelector } from "react-redux";
import {
  Eye,
  MessageSquare,
  Calendar,
  Globe,
  FileVideo,
  CheckCircle,
  XCircle,
  Plus,
} from "lucide-react";
import StateCard from "@/components/ui/player/StateCard";
import MessageItem from "@/components/ui/player/MessageItem";
import EventItem from "@/components/ui/player/EventItem";
import { Button } from "@/components/ui/button";
import GradientTitle from "@/components/scout/reusable/GradientTitle";

export default function ScoutDashboard() {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Welcome Header */}
      <div>
        <GradientTitle text="Welcome Back, Mike!"/>
      </div>

      {/* Profile Completeness */}
      <div
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Profile Completeness
          </h2>
          <span className="text-2xl font-bold text-white">80%</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-4 mb-4">
          <div
            className="bg-cyan-500 h-4 rounded-full"
            style={{ width: "80%" }}
          ></div>
        </div>
        <p className="text-sm text-gray-400 mb-4">
          Complete your profile to increase visibility to clubs and scouts
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-300">Basic Info</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-gray-300">Profile Photo</span>
          </div>
          <div className="flex items-center gap-2">
            <XCircle className="w-5 h-5 text-red-500" />
            <span className="text-gray-300">Highlight Video</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
        <StateCard
          icon={Eye}
          title="Profile Views"
          value="342"
          subtitle="+124 this week"
          theme={theme}
        />
        <StateCard
          icon={MessageSquare}
          title="Messages"
          value="12"
          subtitle="3 unread"
          theme={theme}
        />
        <StateCard
          icon={Calendar}
          title="Events Registered"
          value="5"
          subtitle="2 upcoming"
          theme={theme}
        />
      </div>

      {/* Upcoming Events */}
      <div
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <Calendar
              className="w-5 h-5"
              style={{ color: theme.colors.primaryCyan }}
            />
            Upcoming Events
          </h2>
        </div>
        <div className="space-y-4">
          <EventItem
            logo="/player/dashboard/Elite.png"
            title="Elite Youth Trial"
            location="Madrid, Spain"
            date="19/09/2025"
            time="10:00 AM"
            theme={theme}
          />
          <EventItem
            logo="/player/dashboard/Fcb.png"
            title="Football Academy Showcase"
            location="Barcelona, Spain"
            date="20/09/2025"
            time="2:00 PM"
            theme={theme}
          />
        </div>
        <div className="px-4">
          <Button
            variant="outline"
            size="icon"
            className="flex items-center gap-2 w-full"
          >
            <span className=""> View All Events</span>
          </Button>
        </div>
      </div>

      {/* Recent Messages */}
      <div
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white flex items-center gap-3">
            <MessageSquare
              className="w-5 h-5"
              style={{ color: theme.colors.primaryCyan }}
            />
            Recent Messages
          </h2>
        </div>
        <div className="space-y-4">
          <MessageItem
            logo="/player/dashboard/Elite.png"
            name="FC Barcelona Youth"
            message="We are interested in your profile..."
            time="2h ago"
            unread={true}
            theme={theme}
          />
          <MessageItem
            logo="/player/dashboard/mike.png"
            name="Mike Scout"
            message="Great highlight reel! Would love to..."
            time="5h ago"
            unread={true}
            theme={theme}
          />
          <MessageItem
            logo="/player/dashboard/Elite.png"
            name="Real Madrid Academy"
            message="Thank you for your interest..."
            time="1d ago"
            unread={false}
            theme={theme}
          />
        </div>
        <div className="px-4 pt-6">
          <Button
            variant="outline"
            size="icon"
            className="flex items-center gap-2 w-full"
          >
            <span className=""> View All Messages</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
