"use client";

import { useSelector } from "react-redux";
import PlayerSidebar from "@/components/player/layout/playerSidebar";
import TopBar from "@/components/player/layout/TopBar";
import { usePathname } from "next/navigation";
import ScoutFooter from "@/components/scout/layout/ScoutFooter";
import PlayerTopBar from "@/components/player/layout/player/PlayerTopBar";

export default function AdminLayout({ children }) {
  const theme = useSelector((state) => state.theme);
  const pathname = usePathname();

  const isAuth = pathname.includes("auth");
  return (
    <div
      className="min-h-screen"
      style={{
        backgroundColor: theme.colors.backgroundDark,
      }}
    >
      {isAuth || (
        <>
          <PlayerSidebar />
          <PlayerTopBar />
        </>
      )}

      {/* Main Content - Responsive */}
      <main className={` ${isAuth ? " " : " lg:ml-64 mt-20 p-4  lg:p-8"}`}>
        {children}
      </main>
      {isAuth || <ScoutFooter />}
    </div>
  );
}
