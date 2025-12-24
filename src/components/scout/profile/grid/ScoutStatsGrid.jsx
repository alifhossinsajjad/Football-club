"use client";

import { Eye, Star, Calendar, MessageSquare } from "lucide-react";

export default function ScoutStatsGrid({ stats, theme }) {
  const {
    viewedPlayers = 342,
    viewedChange = "+48 this week",
    shortlistedPlayers = 28,
    activeShortlisted = 12,
    upcomingEvents = 6,
    nextEvent = "Sep 15",
    conversations = 15,
    unread = 5,
  } = stats || {};

  const cards = [
    {
      icon: Eye,
      title: "Players Viewed",
      value: viewedPlayers,
      subtitle: viewedChange,
      subtitleColor: "text-primaryCyan",
    },
    {
      icon: Star,
      title: "Shortlisted Players",
      value: shortlistedPlayers,
      subtitle: `${activeShortlisted} active`,
      subtitleColor: "text-primaryCyan",
    },
    {
      icon: Calendar,
      title: "Upcoming Events",
      value: upcomingEvents,
      subtitle: `Next: ${nextEvent}`,
      subtitleColor: "text-primaryCyan",
    },
    {
      icon: MessageSquare,
      title: "Active Conversations",
      value: conversations,
      subtitle: `${unread} unread`,
      subtitleColor: "text-primaryCyan",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className="rounded-xl p-6 border text-center transition-all hover:shadow-xl"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta flex items-center justify-center">
              <card.icon className="w-6 h-6 text-white" />
            </div>
          </div>
          <p className="text-4xl font-bold text-white mb-2">{card.value}</p>
          <p className="text-gray-400 text-sm mb-1">{card.title}</p>
          <p className={`text-sm font-medium ${card.subtitleColor}`}>
            {card.subtitle}
          </p>
        </div>
      ))}
    </div>
  );
}
