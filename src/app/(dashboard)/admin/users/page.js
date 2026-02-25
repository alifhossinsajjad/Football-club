"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import Link from "next/link";
import { Eye, Edit2, Trash2, UserPlus } from "lucide-react";

export default function UsersManagementPage() {
  const theme = useSelector((state) => state.theme);
  const [activeTab, setActiveTab] = useState("all");

  const tabs = [
    { id: "all", label: "All Users" },
    { id: "players", label: "Players" },
    { id: "clubs", label: "Clubs" },
    { id: "scouts", label: "Scouts" },
  ];

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Player",
      status: "Active",
      joined: "12/01/2025",
    },
    {
      id: 2,
      name: "FC Barcelona Youth",
      email: "youth@fcb.com",
      role: "Club",
      status: "Active",
      joined: "10/01/2025",
    },
    {
      id: 3,
      name: "Mike Scout",
      email: "mike@scout.com",
      role: "Scout",
      status: "Pending",
      joined: "15/01/2025",
    },
    {
      id: 4,
      name: "Sarah Player",
      email: "sarah@example.com",
      role: "Player",
      status: "Active",
      joined: "14/01/2025",
    },
    {
      id: 5,
      name: "Real Madrid Academy",
      email: "academy@realmadrid.com",
      role: "Club",
      status: "Active",
      joined: "08/01/2025",
    },
    {
      id: 6,
      name: "Carlos Scout",
      email: "carlos@scouting.com",
      role: "Scout",
      status: "Active",
      joined: "11/01/2025",
    },
  ];

  const getRoleBadgeStyle = (role) => {
    const styles = {
      Player: {
        backgroundColor: `${theme.colors.primaryCyan}33`,
        color: theme.colors.primaryCyan,
      },
      Club: {
        backgroundColor: `${theme.colors.primaryMagenta}33`,
        color: theme.colors.primaryMagenta,
      },
      Scout: {
        backgroundColor: `${theme.colors.neonAccent}33`,
        color: theme.colors.neonAccent,
      },
    };
    return styles[role] || styles.Player;
  };

  const getStatusStyle = (status) => {
    if (status === "Active") {
      return {
        backgroundColor: "rgba(0, 201, 80, 0.2)",
        color: "rgba(5, 223, 114, 1)",
      };
    } else if (status === "Pending") {
      return {
        backgroundColor: "rgba(253, 199, 0, 0.2)",
        color: "rgba(253, 199, 0, 1)",
      };
    }
  };

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
          Users Management
        </h1>

        <Link href="/admin/users/create">
          <button
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.colors.neonAccent,
            }}
          >
            <UserPlus className="w-5 h-5" />
            Add User
          </button>
        </Link>
      </div>

      {/* Tabs */}
      <div
        className="border-b mb-6"
        style={{
          borderColor: `${theme.colors.primaryCyan}1A`,
        }}
      >
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="relative px-6 py-4 text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  color: isActive ? "#FFFFFF" : "#9CA3AF",
                  borderBottom: isActive
                    ? `2px solid ${theme.colors.primaryCyan}`
                    : "2px solid transparent",
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Users Table */}
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
                  Name
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Email
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Role
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Status
                </th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">
                  Joined
                </th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-400">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t transition-colors hover:bg-opacity-50"
                  style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {user.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.email}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={getRoleBadgeStyle(user.role)}
                    >
                      {user.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={getStatusStyle(user.status)}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {user.joined}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/users/${user.id}`}>
                        <button
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: theme.colors.primaryCyan }}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <Link href={`/admin/users/${user.id}/edit`}>
                        <button
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: theme.colors.primaryMagenta }}
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      </Link>
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
