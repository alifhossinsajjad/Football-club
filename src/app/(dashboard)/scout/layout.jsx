"use client";

import { useSelector } from "react-redux";
import ScoutSidebar from "@/components/scout/layout/ScoutSidebar";
import ScoutTopbar from "@/components/scout/layout/ScoutTopbar";

export default function ScoutLayout({ children }) {
  const theme = useSelector((state) => state.theme);

  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      <ScoutSidebar />
      <ScoutTopbar />

      {/* Main Content - Responsive */}
      <main className="lg:ml-64 mt-20 p-4 lg:p-8">{children}</main>
    </div>
  );
}
