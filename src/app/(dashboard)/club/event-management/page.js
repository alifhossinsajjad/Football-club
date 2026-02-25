"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Eye, Pencil, Trash2, Star } from "lucide-react";

export default function EventManagementPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const events = [
    {
      id: 1,
      name: "Youth Trial - Summer 2025",
      date: "15/09/2025",
      location: "Barcelona, Spain",
      fee: "€50",
      registrations: 45,
      status: "Active",
      featured: true,
    },
    {
      id: 2,
      name: "Academy Showcase",
      date: "20/09/2025",
      location: "Barcelona, Spain",
      fee: "€75",
      registrations: 67,
      status: "Active",
      featured: false,
    },
    {
      id: 3,
      name: "Talent Scouting Day",
      date: "25/09/2025",
      location: "Madrid, Spain",
      fee: "€40",
      registrations: 23,
      status: "Pending",
      featured: false,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-4">
        <h1
          className="text-2xl lg:text-3xl font-bold"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Event Management
        </h1>

        <button
          onClick={() => router.push("/club/event-management/create")}
          className="px-6 py-2.5 rounded-lg font-semibold text-sm transition-all hover:opacity-90 flex items-center gap-2"
          style={{ backgroundColor: theme.colors.neonAccent }}
        >
          <span className="text-xl leading-none">+</span>
          <span className="text-white">Create Event</span>
        </button>
      </div>

      {/* Events Table */}
      <div
        className="border rounded-lg overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        {/* Table Header */}
        <div
          className="grid grid-cols-12 gap-4 p-4 border-b text-sm font-semibold text-gray-400"
          style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
        >
          <div className="col-span-3">Event Name</div>
          <div className="col-span-2">Date</div>
          <div className="col-span-2">Location</div>
          <div className="col-span-1">Fee</div>
          <div className="col-span-1">Registrations</div>
          <div className="col-span-1">Status</div>
          <div className="col-span-1">Featured</div>
          <div className="col-span-1">Actions</div>
        </div>

        {/* Table Body */}
        <div
          className="divide-y"
          style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
        >
          {events.map((event) => (
            <div
              key={event.id}
              className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-opacity-50 transition-all"
              style={{
                backgroundColor: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${theme.colors.backgroundDark}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
            >
              {/* Event Name */}
              <div className="col-span-3">
                <p className="text-white font-medium text-sm">{event.name}</p>
              </div>

              {/* Date */}
              <div className="col-span-2">
                <p className="text-gray-300 text-sm">{event.date}</p>
              </div>

              {/* Location */}
              <div className="col-span-2">
                <p className="text-gray-300 text-sm">{event.location}</p>
              </div>

              {/* Fee */}
              <div className="col-span-1">
                <p className="text-white font-semibold text-sm">{event.fee}</p>
              </div>

              {/* Registrations */}
              <div className="col-span-1">
                <p
                  className="text-sm font-bold"
                  style={{ color: theme.colors.primaryCyan }}
                >
                  {event.registrations}
                </p>
              </div>

              {/* Status */}
              <div className="col-span-1">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor:
                      event.status === "Active"
                        ? "rgba(5, 223, 114, 0.2)"
                        : "rgba(255, 193, 7, 0.2)",
                    color: event.status === "Active" ? "#05DF72" : "#FFC107",
                  }}
                >
                  {event.status}
                </span>
              </div>

              {/* Featured */}
              <div className="col-span-1 flex justify-center">
                <button
                  className="transition-transform hover:scale-110"
                  onClick={() => {}}
                >
                  <Star
                    className="w-5 h-5"
                    style={{
                      color: event.featured ? "#FDC700" : "#6B7280",
                      fill: event.featured ? "#FDC700" : "none",
                    }}
                  />
                </button>
              </div>

              {/* Actions */}
              <div className="col-span-1 flex items-center gap-2">
                <button
                  onClick={() =>
                    router.push(`/club/event-management/${event.id}`)
                  }
                  className="p-1.5 rounded-lg transition-all hover:bg-opacity-80"
                  style={{ backgroundColor: `${theme.colors.primaryCyan}20` }}
                >
                  <Eye
                    className="w-4 h-4"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                </button>

                <button
                  onClick={() =>
                    router.push(`/club/event-management/${event.id}/edit`)
                  }
                  className="p-1.5 rounded-lg transition-all hover:bg-opacity-80"
                  style={{ backgroundColor: `${theme.colors.primaryCyan}20` }}
                >
                  <Pencil
                    className="w-4 h-4"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                </button>

                <button
                  onClick={() => {}}
                  className="p-1.5 rounded-lg transition-all hover:bg-opacity-80"
                  style={{ backgroundColor: "rgba(255, 100, 103, 0.2)" }}
                >
                  <Trash2 className="w-4 h-4" style={{ color: "#FF6467" }} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
