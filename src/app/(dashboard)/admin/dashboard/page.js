"use client";

import { useSelector } from "react-redux";
import { Users, Calendar, DollarSign, TrendingUp } from "lucide-react";

export default function DashboardPage() {
  const theme = useSelector((state) => state.theme);

  const stats = [
    {
      id: 1,
      icon: Users,
      label: "Total Users",
      value: "12,456",
      change: "+12%",
      isPositive: true,
      gradientId: "gradient-users",
    },
    {
      id: 2,
      icon: Calendar,
      label: "Active Events",
      value: "48",
      change: "+8%",
      isPositive: true,
      gradientId: "gradient-calendar",
    },
    {
      id: 3,
      icon: DollarSign,
      label: "Monthly Revenue",
      value: "€24,890",
      change: "+23%",
      isPositive: true,
      gradientId: "gradient-dollar",
    },
    {
      id: 4,
      icon: TrendingUp,
      label: "Subscriptions",
      value: "3,842",
      change: "+15%",
      isPositive: true,
      gradientId: "gradient-trending",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      title: "New user registered",
      subtitle: "John Doe (Player)",
      time: "5 minutes ago",
    },
    {
      id: 2,
      title: "Event published",
      subtitle: "FC Barcelona Youth",
      time: "1 hour ago",
    },
    {
      id: 3,
      title: "Subscription purchased",
      subtitle: "Sarah Player",
      time: "2 hours ago",
    },
    {
      id: 4,
      title: "Profile updated",
      subtitle: "Mike Scout",
      time: "3 hours ago",
    },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Hidden SVG for Gradients */}
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          {stats.map((stat) => (
            <linearGradient
              key={stat.gradientId}
              id={stat.gradientId}
              x1="0%"
              y1="0%"
              x2="100%"
              y2="100%"
            >
              <stop offset="0%" stopColor={theme.colors.primaryCyan} />
              <stop offset="100%" stopColor={theme.colors.primaryMagenta} />
            </linearGradient>
          ))}
        </defs>
      </svg>

      {/* Page Title */}
      <h1
        className="text-3xl lg:text-4xl font-bold mb-8"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          color: "transparent",
          display: "inline-block",
        }}
      >
        Dashboard Overview
      </h1>

      {/* Stats Grid - Updated Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.id}
              className="rounded-lg border p-6 transition-all hover:scale-[1.02]"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              {/* Icon and Change Badge */}
              <div className="flex items-start justify-between mb-4">
                {/* Icon with Gradient Background */}
                <div
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: `linear-gradient(180deg, ${theme.colors.primaryCyan}33 0%, ${theme.colors.primaryMagenta}33 100%)`,
                  }}
                >
                  <Icon
                    className="w-6 h-6"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                </div>

                {/* Change Badge */}
                <span
                  className="text-xs font-semibold px-2 py-1 rounded"
                  style={{
                    backgroundColor: stat.isPositive
                      ? "rgba(5, 223, 114, 0.2)"
                      : "rgba(239, 68, 68, 0.2)",
                    color: stat.isPositive
                      ? "rgba(5, 223, 114, 1)"
                      : "rgba(239, 68, 68, 1)",
                  }}
                >
                  {stat.change}
                </span>
              </div>

              {/* Label */}
              <p className="text-gray-400 text-sm mb-2">{stat.label}</p>

              {/* Value */}
              <p className="text-white text-2xl lg:text-3xl font-bold">
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Recent Activity Section */}
      <div
        className="rounded-lg border p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <h2 className="text-xl lg:text-2xl font-semibold text-white mb-6">
          Recent Activity
        </h2>

        <div className="space-y-4">
          {recentActivities.map((activity, index) => (
            <div
              key={activity.id}
              className={`rounded-lg p-4 transition-all hover:scale-[1.01] ${
                index !== recentActivities.length - 1 ? "mb-3" : ""
              }`}
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium mb-1">
                    {activity.title}
                  </p>
                  <p className="text-gray-400 text-sm">{activity.subtitle}</p>
                </div>
                <p className="text-gray-500 text-sm whitespace-nowrap ml-4">
                  {activity.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}