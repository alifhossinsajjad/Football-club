"use client";
import GradientTitle from "@/components/scout/reusable/GradientTitle";
import { Button } from "@/components/ui/button";
import PlayerDirectoryCard from "@/components/ui/scout/PlayerDirectoryCard";
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
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <PlayerDirectoryCard
          image="/Scout/Shortlisted-player/John.png"
          title="John Doe"
          role="midfielder"
          nationality="spain"
          age="19 years"
          rating="89"
          highlightVideo="jdsnqeknd"
          currentClub="Real Madrid Academy"
          theme={theme}
        />
        <PlayerDirectoryCard
          image="/Scout/Shortlisted-player/John.png"
          title="John Doe"
          role="midfielder"
          nationality="spain"
          age="19 years"
          rating="89"
          highlightVideo=""
          currentClub="Chelsea Academy"
          theme={theme}
        />
        <PlayerDirectoryCard
          image="/Scout/Shortlisted-player/John.png"
          title="John Doe"
          role="midfielder"
          nationality="spain"
          age="19 years"
          rating="89"
          highlightVideo="jdsnqeknd"
          currentClub="AC Milan Youth"
          theme={theme}
        />
        <PlayerDirectoryCard
          image="/Scout/Shortlisted-player/John.png"
          title="John Doe"
          role="midfielder"
          nationality="spain"
          age="19 years"
          rating="89"
          highlightVideo="jdsnqeknd"
          currentClub="São Paulo FC"
          theme={theme}
        />
        <PlayerDirectoryCard
          image="/Scout/Shortlisted-player/John.png"
          title="John Doe"
          role="midfielder"
          nationality="spain"
          age="19 years"
          rating="89"
          highlightVideo=""
          currentClub="PSG Academy"
          theme={theme}
        />
        <PlayerDirectoryCard
          image="/Scout/Shortlisted-player/John.png"
          title="John Doe"
          role="midfielder"
          nationality="spain"
          age="19 years"
          rating="89"
          highlightVideo="jdsnqeknd"
          currentClub="Al Ahly SC"
          theme={theme}
        />
      </div>
      <div className="px-4 flex items-center justify-center">
        <Button variant="outline" size="icon" className="w-full md:w-1/5">
          <span className="text-[#00E5FF]"> Load More Players</span>
        </Button>
      </div>
    </div>
  );
}
