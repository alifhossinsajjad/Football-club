"use client";

import { usePathname, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { User, Lock, Bell, Globe, Shield } from "lucide-react";
import PlayerTitle from "@/components/player/playerTitle";

const playerSettingsTabs = [
  {
    path: "/scout/settings/privacy",
    icon: Shield,
    label: "Security & Privacy ",
  },
  {
    path: "/scout/settings/notifications",
    icon: Bell,
    label: "Notifications",
  },
  { path: "/scout/settings/preferences", icon: Globe, label: "Preferences" },
];

export default function PlayerSettingsLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="space-y-6 lg:space-y-8"
      style={{
        borderColor: `${theme?.colors?.primaryCyan || "#04B5A3"}33`,
      }}
    >
      {/* Page Header */}
      <div>
        <PlayerTitle title="Settings" />
      </div>
      <section className="  rounded-lg">
        {/* Tab Navigation */}
        <div className=" overflow-x-auto scrollbar-hide">
          <div className="flex gap-1 lg:gap-2 min-w-max ">
            {playerSettingsTabs.map((tab) => {
              const isActive = pathname === tab.path;
              const Icon = tab.icon;

              return (
                <button
                  key={tab.path}
                  onClick={() => router.push(tab.path)}
                  className="flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-medium transition-all whitespace-nowrap rounded-t-lg"
                  style={{
                    color: isActive ? "white" : "#9CA3AF",
                    backgroundColor: isActive ? `rgba(0,0,0,0)` : "transparent",
                    borderBottom: isActive
                      ? `2px solid ${theme?.colors?.primaryCyan || "#04B5A3"}`
                      : "2px solid transparent",
                    background: isActive
                      ? `linear-gradient(90deg, ${theme?.colors?.primaryCyan || "#04B5A3"}33, ${theme?.colors?.primaryMagenta || "#A855F7"}33)`
                      : "transparent",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = `${theme?.colors?.backgroundCard || "#1F2937"}4D`;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.backgroundColor = "transparent";
                    }
                  }}
                >
                  <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content */}
        <div>{children}</div>
      </section>
    </div>
  );
}
