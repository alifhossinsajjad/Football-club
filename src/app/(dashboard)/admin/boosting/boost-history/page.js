"use client"

import { useState } from "react"
import { useSelector } from "react-redux"

export default function BoostHistoryPage() {
  const theme = useSelector((state) => state.theme)

  const [history, setHistory] = useState([
    {
      id: 1,
      type: "Player",
      profileName: "Carlos Ramirez",
      duration: "1 Month",
      startDate: "2024-12-15",
      endDate: "2025-01-15",
      revenue: 30,
      status: "Completed",
    },
    {
      id: 2,
      type: "Event",
      profileName: "Winter Training Camp",
      duration: "Until Event",
      startDate: "2024-12-01",
      endDate: "2024-12-20",
      revenue: 20,
      status: "Completed",
    },
    {
      id: 3,
      type: "Player",
      profileName: "Isabella Costa",
      duration: "1 Month",
      startDate: "2024-11-20",
      endDate: "2024-12-20",
      revenue: 30,
      status: "Completed",
    },
  ])

  const getTypeStyle = (type) => {
    if (type === "Player") {
      return {
        backgroundColor: `${theme.colors.primaryCyan}33`,
        color: theme.colors.primaryCyan,
      }
    } else if (type === "Event") {
      return {
        backgroundColor: `${theme.colors.primaryMagenta}33`,
        color: theme.colors.primaryMagenta,
      }
    }
  }

  const getStatusStyle = (status) => {
    if (status === "Completed") {
      return {
        backgroundColor: "rgba(107, 114, 128, 0.2)",
        color: "#9CA3AF",
      }
    }
  }

  return (
    <div className="w-full">
      {/* Table Container */}
      <div
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                }}
              >
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Profile/Event Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Duration</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Start Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">End Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Revenue</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {history.map((item) => (
                <tr
                  key={item.id}
                  className="border-t transition-colors hover:bg-opacity-50"
                  style={{
                    borderColor: `${theme.colors.primaryCyan}1A`,
                  }}
                >
                  {/* Type Badge */}
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={getTypeStyle(item.type)}
                    >
                      {item.type}
                    </span>
                  </td>

                  {/* Profile/Event Name */}
                  <td className="px-6 py-4 text-sm text-white font-medium">{item.profileName}</td>

                  {/* Duration */}
                  <td className="px-6 py-4 text-sm text-gray-300">{item.duration}</td>

                  {/* Start Date */}
                  <td className="px-6 py-4 text-sm text-gray-300">{item.startDate}</td>

                  {/* End Date */}
                  <td className="px-6 py-4 text-sm text-gray-300">{item.endDate}</td>

                  {/* Revenue */}
                  <td className="px-6 py-4">
                    <span className="text-sm font-semibold" style={{ color: "#05DF72" }}>
                      €{item.revenue}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={getStatusStyle(item.status)}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State (if no history) */}
        {history.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No boost history available</p>
          </div>
        )}
      </div>
    </div>
  )
}
