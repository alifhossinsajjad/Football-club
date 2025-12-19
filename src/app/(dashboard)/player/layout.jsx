"use client";

import { useSelector } from "react-redux";
import PlayerSidebar from "@/components/player/layout/playerSidebar";
import TopBar from "@/components/player/layout/TopBar";

export default function AdminLayout({ children }) {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      <PlayerSidebar />
      <TopBar />

      {/* Main Content - Responsive */}
      <main className="lg:ml-64 mt-20 p-4 lg:p-8">{children}</main>
    </div>
  );
}
