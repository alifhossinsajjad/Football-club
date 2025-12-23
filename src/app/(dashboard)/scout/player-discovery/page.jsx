"use client";
import GradientTitle from "@/components/scout/reusable/GradientTitle";
import { Button } from "@/components/ui/button";
import PlayerDirectoryCard from "@/components/ui/scout/PlayerDirectoryCard";
import SearchFilters from "@/components/ui/scout/SearchFilters";
import { useRouter } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const mockPlayers = [
  {
    id: 1,
    image: "/Scout/Shortlisted-player/John.png",
    name: "John Doe",
    position: "midfielder",
    nationality: "Spain",
    age: "19 years",
    rating: "89",
    highlightVideo: "Real Madrid Academy",
    currentClub: "Real Madrid Academy",
  },
  {
    id: 2,
    image: "/Scout/Shortlisted-player/John.png",
    name: "James Smith",
    position: "forward",
    nationality: "England",
    age: "20 years",
    rating: "92",
    highlightVideo: "",
    currentClub: "Chelsea Academy",
  },
  {
    id: 3,
    image: "/Scout/Shortlisted-player/John.png",
    name: "Robert Garcia",
    position: "defender",
    nationality: "Argentina",
    age: "18 years",
    rating: "87",
    highlightVideo: "Real Madrid Academy",
    currentClub: "AC Milan Youth",
  },
  {
    id: 4,
    image: "/Scout/Shortlisted-player/John.png",
    name: "Michael Chen",
    position: "goalkeeper",
    nationality: "Japan",
    age: "21 years",
    rating: "90",
    highlightVideo: "Real Madrid Academy",
    currentClub: "São Paulo FC",
  },
  {
    id: 5,
    image: "/Scout/Shortlisted-player/John.png",
    name: "Ahmed Hassan",
    position: "midfielder",
    nationality: "Egypt",
    age: "19 years",
    rating: "85",
    highlightVideo: "",
    currentClub: "PSG Academy",
  },
  {
    id: 6,
    image: "/Scout/Shortlisted-player/John.png",
    name: "Pierre Dubois",
    position: "forward",
    nationality: "France",
    age: "20 years",
    rating: "91",
    highlightVideo: "Real Madrid Academy",
    currentClub: "Al Ahly SC",
  },
];

export default function page() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div>
        <GradientTitle text="Player Discovery" />
      </div>
      <SearchFilters theme={theme} />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {mockPlayers.map((player) => (
          <PlayerDirectoryCard
            key={player.id}
            image={player.image}
            name={player.name}
            position={player.position}
            nationality={player.nationality}
            age={player.age}
            rating={player.rating}
            highlightVideo={player.highlightVideo}
            currentClub={player.currentClub}
            theme={theme}
            onViewProfile={() =>
              router.push(
                `/scout/player-profile?data=${encodeURIComponent(
                  JSON.stringify({
                    image: player.image,
                    name: player.name,
                    position: player.role,
                    nationality: player.nationality,
                    age: player.age,
                    currentClub: player.currentClub,
                    rating: player.rating,
                    highlightVideo: player.highlightVideo,
                  })
                )}`
              )
            }
          />
        ))}
      </div>
      <div className="px-4 flex items-center justify-center">
        <Button variant="outline" size="icon" className="w-full md:w-1/5">
          <span className="text-[#00E5FF]"> Load More Players</span>
        </Button>
      </div>
    </div>
  );
}
