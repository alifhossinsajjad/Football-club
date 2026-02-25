"use client";

import { useSelector } from "react-redux";
import ScoutSidebar from "@/components/scout/layout/ScoutSidebar";
import ScoutTopbar from "@/components/scout/layout/ScoutTopbar";
import ScoutFooter from "@/components/scout/layout/ScoutFooter";
import { usePathname } from "next/navigation";
import ScoutTopBar from "@/components/scout/layout/ScoutTopbar";

export default function ScoutLayout({ children }) {
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
          <ScoutSidebar />
          <ScoutTopBar />
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
