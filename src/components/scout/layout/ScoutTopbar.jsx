"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import {
  Search,
  Bell,
  ChevronDown,
  User,
  Settings,
  LogOut,
} from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function ScoutTopBar() {
  const theme = useSelector((state) => state.theme);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Mock scout data - replace with real data from Redux/auth later
  const scoutName = "Roberto Martinez";
  const scoutInitials = "RM";

  const toggleDropdown = () => setIsDropdownOpen((prev) => !prev);

  return (
    <header
      className="fixed top-0 left-0 lg:left-64 right-0 h-20 border-b flex items-center justify-between px-4 lg:px-8 z-50"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}1A`,
      }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          <input
            type="search"
            placeholder="Search players, clubs, events..."
            className="w-full h-12 pl-11 pr-5 rounded-xl text-white placeholder:text-gray-500 focus:outline-none transition-all duration-200"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              border: `1px solid ${theme.colors.primaryCyan}33`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primaryCyan;
              e.target.style.boxShadow = `0 0 0 3px ${theme.colors.primaryCyan}40`;
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${theme.colors.primaryCyan}33`;
              e.target.style.boxShadow = "none";
            }}
          />
        </div>
      </div>

      {/* Right Side: Notifications + Scout Dropdown */}
      <div className="flex items-center gap-4 lg:gap-6">
        {/* Notifications */}
        <button
          aria-label="Notifications"
          className="relative p-3 rounded-xl transition-all duration-200 hover:bg-gray-800/50"
        >
          <Bell className="w-5 h-5 lg:w-6 lg:h-6 text-gray-300" />
          <span
            className="absolute top-2 right-2 w-2.5 h-2.5 rounded-full ring-2 ring-backgroundCard"
            style={{ backgroundColor: theme.colors.primaryMagenta }}
            aria-hidden="true"
          />
        </button>

        {/* Scout Avatar + Dropdown Trigger */}
        <div className="relative dropdown-container">
          <button
            onClick={toggleDropdown}
            className="flex items-center gap-3 rounded-xl p-2 transition-all duration-200 hover:bg-gray-800/50 focus:outline-none"
            aria-label="Scout menu"
            aria-expanded={isDropdownOpen}
          >
            <Avatar className="w-10 h-10 lg:w-12 lg:h-12">
              <AvatarImage src="/Scout/martinez.png" alt={scoutName} />
              <AvatarFallback className="bg-gradient-to-br from-cyan-500 to-magenta-500 text-white font-bold text-lg">
                {scoutInitials}
              </AvatarFallback>
            </Avatar>

            <div className="hidden lg:block text-left">
              <p className="text-sm font-semibold text-white">{scoutName}</p>
              <p className="text-xs text-gray-400">Talent Scout</p>
            </div>

            <ChevronDown
              className={`w-4 h-4 text-gray-400 transition-transform duration-200 hidden lg:block ${
                isDropdownOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div
              className="absolute right-0 mt-3 w-64 rounded-2xl shadow-2xl overflow-hidden border z-50"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
              onClick={() => setIsDropdownOpen(false)} // Close on menu item click
            >
              {/* Scout Header */}
              <div
                className="px-5 py-4 border-b"
                style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
              >
                <p className="font-semibold text-white text-lg">{scoutName}</p>
                <p className="text-sm text-gray-400">Talent Scout</p>
              </div>

              {/* Menu Items */}
              <div className="py-2">
                <a
                  href="/scout/profile"
                  className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800/50 transition-colors"
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </a>

                <a
                  href="/scout/settings"
                  className="flex items-center gap-3 px-5 py-3 text-gray-300 hover:bg-gray-800/50 transition-colors"
                >
                  <Settings className="w-5 h-5" />
                  <span>Settings</span>
                </a>

                <hr
                  className="my-2"
                  style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                />

                <button
                  onClick={() => {
                    // Add real logout logic later (clear session, etc.)
                    window.location.href = "/login?role=Scout";
                  }}
                  className="w-full flex items-center gap-3 px-5 py-3 text-red-400 hover:bg-red-900/20 transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Log Out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Overlay */}
      {isDropdownOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
}
