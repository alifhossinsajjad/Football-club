import ScoutSideBar from "@/components/layout/ScoutSidebar";
import ScoutTopBar from "@/components/layout/ScoutTopBar";

import React from "react";
import { poppins } from "../font";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${poppins.className} `}>
      <ScoutTopBar />
      <div className="lg:ml-58.75 min-h-screen flex flex-col">
        <ScoutSideBar />
        <main className="flex-1 p-4 lg:p-8 bg-[#0B0D2C]">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
