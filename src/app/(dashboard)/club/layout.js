"use client";

import { useSelector } from "react-redux";
import ClubSidebar from "@/components/layout/ClubSidebar";
import ClubTopbar from "@/components/layout/ClubTopbar";
import { usePathname } from "next/navigation";
import ScoutFooter from "@/components/scout/layout/ScoutFooter";

export default function ClubLayout({ children }) {
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
          <ClubSidebar />
          <ClubTopbar />
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
