"use client";

import { useSelector } from "react-redux";
import Link from "next/link";
import { Eye, Edit2, Trash2, Star } from "lucide-react";

export default function EventManagementPage() {
  const theme = useSelector((state) => state.theme);

  const events = [
    {
      id: 1,
      name: "Elite Youth Trial",
      date: "15/09/2025",
      location: "Madrid, Spain",
      fee: "€50",
      status: "Active",
      featured: true,
    },
    {
      id: 2,
      name: "Football Academy Showcase",
      date: "20/09/2025",
      location: "Barcelona, Spain",
      fee: "€75",
      status: "Active",
      featured: true,
    },
    {
      id: 3,
      name: "Talent Scouting Day",
      date: "25/09/2025",
      location: "Lisbon, Portugal",
      fee: "€40",
      status: "Pending",
      featured: false,
    },
  ];

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <h1
          className="text-3xl lg:text-4xl font-bold"
          style={{
            background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
            display: "inline-block",
          }}
        >
          Event Management
        </h1>

        <Link href="/admin/events/create">
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.colors.neonAccent,
            }}
          >
            + Add Event
          </button>
        </Link>
      </div>

      {/* Events Table */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: theme.colors.backgroundDark }}>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Event Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Date
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Location
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Fee
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Featured
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr
                  key={event.id}
                  className="border-t transition-colors hover:bg-opacity-50"
                  style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {event.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {event.date}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {event.location}
                  </td>
                  <td className="px-6 py-4 text-sm text-white font-semibold">
                    {event.fee}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={
                        event.status === "Active"
                          ? {
                              backgroundColor: "rgba(0, 201, 80, 0.2)",
                              color: "rgba(5, 223, 114, 1)",
                            }
                          : {
                              backgroundColor: "rgba(253, 199, 0, 0.2)",
                              color: "rgba(253, 199, 0, 1)",
                            }
                      }
                    >
                      {event.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <Star
                      className={`w-5 h-5 ${
                        event.featured ? "fill-current" : ""
                      }`}
                      style={{
                        color: event.featured
                          ? theme.colors.primaryCyan
                          : "#4B5563",
                      }}
                    />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/events/${event.id}`}>
                        <button
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: theme.colors.primaryCyan }}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: theme.colors.primaryMagenta }}
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        className="p-2 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20"
                        style={{ color: "#EF4444" }}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
