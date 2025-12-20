"use client";
import GradientTitle from "@/components/scout/reusable/GradientTitle";
import SearchFilters from "@/components/ui/scout/SearchFilters";
import React from "react";
import { useSelector } from "react-redux";

export default function page() {
  const theme = useSelector((state) => state.theme);
  //   const theme = useSelector((state) => state.theme) || {
  //     colors: {
  //       primaryCyan: "#04B5A3",
  //       primaryMagenta: "#9C27B0",
  //       backgroundCard: "#12143A",
  //     },
  //   };

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <GradientTitle text="Player Discovery" />
      </div>
        <SearchFilters theme={theme} />
    </div>
  );
}
