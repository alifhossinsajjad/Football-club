"use client";

import { useSelector } from "react-redux";
import { useRouter, useParams } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Eye,
  CheckCircle,
  Clock,
  Mail,
  Phone,
  Search,
} from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ViewEventPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const params = useParams();

  const stats = [
    {
      icon: Eye,
      label: "Event Views",
      value: "842",
      change: "+23% this week",
      changeColor: "#05DF72",
    },
    {
      icon: Users,
      label: "Total Registrations",
      value: "45",
      change: "45% filled",
      changeColor: theme.colors.primaryCyan,
    },
    {
      icon: CheckCircle,
      label: "Confirmed",
      value: "38",
      change: "84% confirmed",
      changeColor: theme.colors.primaryCyan,
    },
    {
      icon: Clock,
      label: "Pending",
      value: "7",
      change: "Awaiting confirmation",
      changeColor: theme.colors.primaryCyan,
    },
  ];

  const participants = [
    {
      id: 1,
      name: "John Doe",
      position: "Midfielder",
      age: "19 years old",
      avatar: "/registered-1.jpg",
      registeredDate: "2 days ago",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Sarah Player",
      position: "Forward",
      age: "18 years old",
      avatar: "/registered-2.jpg",
      registeredDate: "3 days ago",
      status: "Confirmed",
    },
    {
      id: 3,
      name: "Mike Johnson",
      position: "Defender",
      age: "20 years old",
      avatar: "/registered-3.jpg",
      registeredDate: "5 days ago",
      status: "Pending",
    },
    {
      id: 4,
      name: "Emma Garcia",
      position: "Goalkeeper",
      age: "17 years old",
      avatar: "/registered-4.jpg",
      registeredDate: "1 week ago",
      status: "Confirmed",
    },
  ];

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: theme.colors.backgroundDark }}
    >
      {/* Header */}
      <div className="mb-6">
        <button
          onClick={() => router.push("/club/event-management")}
          className="flex items-center gap-2 mb-6 transition-opacity hover:opacity-80"
          style={{ color: theme.colors.primaryCyan }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Events</span>
        </button>

        <div
          className="border rounded-lg p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
            <div className="flex-1">
              <h1
                className="text-2xl lg:text-3xl font-bold mb-4"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Youth Trial - Summer 2025
              </h1>

              <div className="flex flex-wrap gap-2 mb-4">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: "rgba(5, 223, 114, 0.2)",
                    color: "#05DF72",
                  }}
                >
                  Active
                </span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1"
                  style={{
                    backgroundColor: `${theme.colors.primaryCyan}20`,
                    color: theme.colors.primaryCyan,
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Featured Event
                </span>
              </div>
            </div>

            <button
              onClick={() =>
                router.push(`/club/event-management/${params.id}/edit`)
              }
              className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90"
              style={{
                backgroundColor: theme.colors.neonAccent,
                color: "white",
              }}
            >
              Edit Event
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div
              className="flex items-center gap-3 p-4 rounded-lg"
              style={{ backgroundColor: theme.colors.backgroundDark }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.primaryCyan}20` }}
              >
                <Calendar
                  className="w-6 h-6"
                  style={{ color: theme.colors.primaryCyan }}
                />
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Event Date</p>
                <p className="text-white font-semibold">15/09/2025</p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-lg"
              style={{ backgroundColor: theme.colors.backgroundDark }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.primaryCyan}20` }}
              >
                <MapPin
                  className="w-6 h-6"
                  style={{ color: theme.colors.primaryCyan }}
                />
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Location</p>
                <p className="text-white font-semibold">Barcelona, Spain</p>
              </div>
            </div>

            <div
              className="flex items-center gap-3 p-4 rounded-lg"
              style={{ backgroundColor: theme.colors.backgroundDark }}
            >
              <div
                className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ backgroundColor: `${theme.colors.primaryCyan}20` }}
              >
                <Users
                  className="w-6 h-6"
                  style={{ color: theme.colors.primaryCyan }}
                />
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Registrations</p>
                <p className="text-white font-semibold">45 Players</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="border rounded-lg p-6"
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Registered Participants */}
          <div
            className="border rounded-lg p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-white">
                Registered Participants
              </h2>
              <div className="relative w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search registrants..."
                  className="pl-10"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`,
                  }}
                />
              </div>
            </div>

            <div className="space-y-4">
              {participants.map((participant) => (
                <div
                  key={participant.id}
                  className="flex items-center gap-4 p-4 rounded-lg transition-all hover:bg-opacity-60"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                  }}
                >
                  <img
                    src={participant.avatar}
                    alt={participant.name}
                    className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {participant.name}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {participant.position} • {participant.age}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 flex-shrink-0">
                    <div className="text-right">
                      <p className="text-gray-500 text-xs mb-1">Registered</p>
                      <p className="text-gray-400 text-xs">
                        {participant.registeredDate}
                      </p>
                    </div>

                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor:
                          participant.status === "Confirmed"
                            ? `${theme.colors.neonAccent}20`
                            : "rgba(255, 193, 7, 0.2)",
                        color:
                          participant.status === "Confirmed"
                            ? theme.colors.neonAccent
                            : "#FFC107",
                      }}
                    >
                      {participant.status}
                    </span>

                    <button
                      className="p-2 rounded-lg transition-all hover:bg-opacity-80"
                      style={{
                        backgroundColor: `${theme.colors.primaryCyan}20`,
                      }}
                    >
                      <Eye
                        className="w-4 h-4"
                        style={{ color: theme.colors.primaryCyan }}
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button
              className="w-full mt-6 py-3 rounded-lg border font-semibold text-sm transition-all hover:bg-opacity-10"
              style={{
                borderColor: `${theme.colors.primaryCyan}40`,
                color: theme.colors.primaryCyan,
              }}
            >
              Load More Registrants
            </button>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Event Details */}
          <div
            className="border rounded-lg p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6">Event Details</h2>

            <div className="space-y-4">
              <div>
                <p className="text-gray-400 text-sm mb-2">Registration Fee</p>
                <p
                  className="text-2xl font-bold"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  €50
                </p>
              </div>

              <div
                className="pt-4 border-t"
                style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
              >
                <p className="text-gray-400 text-sm mb-2">Event Time</p>
                <p className="text-white font-semibold">10:00 AM - 4:00 PM</p>
              </div>

              <div
                className="pt-4 border-t"
                style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
              >
                <p className="text-gray-400 text-sm mb-2">Age Group</p>
                <p className="text-white font-semibold">16-21 years</p>
              </div>

              <div
                className="pt-4 border-t"
                style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
              >
                <p className="text-gray-400 text-sm mb-2">Capacity</p>
                <p className="text-white font-semibold">100 participants</p>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div
            className="border rounded-lg p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <h2 className="text-xl font-bold text-white mb-6">
              Contact Information
            </h2>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${theme.colors.primaryCyan}20` }}
                >
                  <Mail
                    className="w-5 h-5"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Email</p>
                  <p className="text-white text-sm font-medium">
                    contact@fcbarcelona.com
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: `${theme.colors.primaryCyan}20` }}
                >
                  <Phone
                    className="w-5 h-5"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                </div>
                <div>
                  <p className="text-gray-400 text-xs mb-1">Phone</p>
                  <p className="text-white text-sm font-medium">
                    +34 902 189 900
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 mt-6">
        <p className="text-gray-500 text-xs">
          © 2025 NextGen Pros. All rights reserved.
        </p>
      </div>
    </div>
  );
}
