"use client";

import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import {
  Eye,
  Calendar,
  Users,
  MessageSquare,
  MapPin,
  ExternalLink,
} from "lucide-react";

export default function ClubDashboardPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const stats = [
    {
      icon: Eye,
      label: "Profile Views",
      value: "1,842",
      change: "+156 this week",
      changeColor: "#05DF72",
    },
    {
      icon: Calendar,
      label: "Active Events",
      value: "8",
      change: "3 upcoming",
      changeColor: theme.colors.primaryCyan,
    },
    {
      icon: Users,
      label: "Player Applications",
      value: "234",
      change: "52 pending",
      changeColor: theme.colors.primaryCyan,
    },
    {
      icon: MessageSquare,
      label: "Messages",
      value: "45",
      change: "12 unread",
      changeColor: theme.colors.primaryCyan,
    },
  ];

  const activeEvents = [
    {
      id: 1,
      name: "Youth Trial - Summer 2025",
      date: "15/09/2025",
      location: "Barcelona, Spain",
      registrations: 45,
      capacity: 100,
      featured: true,
    },
    {
      id: 2,
      name: "Academy Showcase",
      date: "20/09/2025",
      location: "Barcelona, Spain",
      registrations: 67,
      capacity: 80,
      featured: false,
    },
    {
      id: 3,
      name: "Talent Scouting Day",
      date: "25/09/2025",
      location: "Madrid, Spain",
      registrations: 23,
      capacity: 50,
      featured: false,
    },
  ];

  const recentMessages = [
    {
      id: 1,
      name: "FC Barcelona Youth",
      message: "We are interested in your profile...",
      time: "2h ago",
      avatar: "/club-main-club-1.png",
      unread: true,
    },
    {
      id: 2,
      name: "Mike Scout",
      message: "Great highlight reel! Would love to...",
      time: "5h ago",
      avatar: "/club-main-club-2.png",
      unread: true,
    },
    {
      id: 3,
      name: "Real Madrid Academy",
      message: "Thank you for your interest...",
      time: "1d ago",
      avatar: "/club-main-club-3.png",
      unread: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold mb-1">
          {/* <span className="text-white">Welcome Back, </span> */}
          <span
            style={{
              backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Welcome Back, FC Barcelona Youth
          </span>
        </h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="border rounded-lg p-6 transition-all hover:border-opacity-60"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    backgroundColor: `${theme.colors.primaryCyan}15`,
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
              <p
                className="text-sm font-medium"
                style={{ color: stat.changeColor }}
              >
                {stat.change}
              </p>
            </div>
          );
        })}
      </div>

      {/* Your Active Events */}
      <div
        className="border rounded-lg p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Your Active Events</h2>
          <button
            onClick={() => router.push("/club/event-management/create")}
            className="px-4 py-2 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
            style={{ backgroundColor: theme.colors.neonAccent, color: "white" }}
          >
            + Create Event
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {activeEvents.map((event) => (
            <div
              key={event.id}
              className="border rounded-lg p-6 transition-all hover:border-opacity-60"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}1A`,
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <h3 className="text-lg font-bold text-white flex-1">
                  {event.name}
                </h3>
                {event.featured && (
                  <div className="flex-shrink-0">
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="#00E5FF"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                )}
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <Calendar className="w-4 h-4" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <MapPin className="w-4 h-4" />
                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mb-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">Registrations</span>
                  <span className="text-white font-semibold">
                    {event.registrations}/{event.capacity}
                  </span>
                </div>
                <div
                  className="h-2 rounded-full overflow-hidden"
                  style={{ backgroundColor: `${theme.colors.primaryCyan}20` }}
                >
                  <div
                    className="h-full rounded-full transition-all"
                    style={{
                      width: `${(event.registrations / event.capacity) * 100}%`,
                      background: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                    }}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() =>
                    router.push(`/club/event-management/${event.id}`)
                  }
                  className="flex-1 py-2 px-4 rounded-lg border font-semibold text-sm transition-all hover:opacity-80"
                  style={{
                    borderColor: theme.colors.primaryCyan,
                    color: theme.colors.primaryCyan,
                  }}
                >
                  View Details
                </button>
                <button
                  onClick={() =>
                    router.push(`/club/event-management/${event.id}/edit`)
                  }
                  className="p-2 rounded-lg border transition-all hover:opacity-80"
                  style={{
                    borderColor: theme.colors.primaryCyan,
                    backgroundColor: "transparent",
                  }}
                >
                  <ExternalLink
                    className="w-5 h-5"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Messages */}
      <div
        className="border rounded-lg p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <h2 className="text-xl font-bold text-white mb-6">Recent Messages</h2>

        <div className="space-y-4">
          {recentMessages.map((message) => (
            <div
              key={message.id}
              className="flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-opacity-60 cursor-pointer"
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
              onClick={() => router.push("/club/messaging")}
            >
              <div className="relative flex-shrink-0">
                <img
                  src={message.avatar}
                  alt={message.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {message.unread && (
                  <span
                    className="absolute top-0 right-0 w-3 h-3 rounded-full border-2"
                    style={{
                      backgroundColor: theme.colors.primaryMagenta,
                      borderColor: theme.colors.backgroundDark,
                    }}
                  />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-white font-semibold text-sm mb-1">
                  {message.name}
                </h3>
                <p className="text-gray-400 text-sm truncate">
                  {message.message}
                </p>
              </div>

              <div className="flex-shrink-0 text-right">
                <p className="text-gray-500 text-xs">{message.time}</p>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push("/club/messaging")}
          className="w-full mt-6 py-3 rounded-lg border font-semibold text-sm transition-all hover:bg-opacity-10"
          style={{
            borderColor: `${theme.colors.primaryCyan}40`,
            color: theme.colors.primaryCyan,
          }}
        >
          View All Messages
        </button>
      </div>

      {/* Footer */}
      <div className="text-center py-6">
        <p className="text-gray-500 text-xs">
          © 2025 NextGen Pros. All rights reserved.
        </p>
      </div>
    </div>
  );
}
