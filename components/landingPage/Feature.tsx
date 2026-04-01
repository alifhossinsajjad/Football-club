"use client";

import { useAppSelector } from "@/redux/hooks";
import { Lock, Loader2 } from "lucide-react";
import { useGetFeaturedPlayersQuery } from "@/redux/features/admin/adminSettingsApi";
import Image from "next/image";

const Feature = () => {
  const theme = useAppSelector((state) => state.theme);
  const { data: response, isLoading } = useGetFeaturedPlayersQuery();

  const players = Array.isArray(response?.data) 
    ? [...response.data]
        .filter(p => p.is_active)
        .sort((a, b) => a.order - b.order)
    : [];

  return (
    <section id="players" className="py-20 px-4 bg-[var(--bg-dark,#07142b)] text-white">
      <div className="container mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h2
            className="text-4xl md:text-5xl lg:text-6xl  font-bold mb-2 inline-block"
            style={{
              backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              color: "transparent",
            }}
          >
            FEATURED PLAYERS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Browse top football talent and explore detailed player profiles.
          </p>
        </div>

        {/* Players Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
          </div>
        ) : players.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {players.map((player) => {
              // Split name for styling parity with static design
              const nameParts = player.player_name.split(' ');
              const firstName = nameParts[0];
              const lastName = nameParts.slice(1).join(' ');

              return (
                <div
                  key={player.id}
                  className="relative p-8 bg-[var(--bg-card,#12143A)] rounded-lg flex items-center justify-between transition-colors duration-300"
                >
                  {/* Player Info */}
                  <div className="flex-1">
                    <h3
                      className="font-display text-lg font-semibold mb-2"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                        color: "transparent",
                      }}
                    >
                      <span>{firstName}</span>
                      {lastName && <span> {lastName}</span>}
                    </h3>
                    <div className="flex items-center gap-2 mb-1">
                      {player.flag_image ? (
                        <div className="w-5 h-4 relative rounded-sm overflow-hidden bg-[#07142b]">
                          <Image src={player.flag_image as string} alt="Flag" fill className="object-cover" unoptimized />
                        </div>
                      ) : null}
                      <span className="text-muted-foreground text-sm">
                        {player.country_name}
                      </span>
                    </div>
                    <p className="text-purple-400 text-sm">
                      Position: {player.position}
                    </p>
                  </div>

                  {/* Player Image */}
                  <div className="w-32 h-24 rounded-lg overflow-hidden bg-navy-700 relative">
                    {player.player_image ? (
                      <Image
                        src={player.player_image as string}
                        alt={player.player_name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-800 flex items-center justify-center text-xs text-gray-500">No Image</div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-500">
            No featured players currently available.
          </div>
        )}

        {/* View All Button */}
        <div className="flex justify-center mt-10">
          <button className="px-8 py-2 border border-purple-700 rounded-full text-foreground hover:bg-purple/10 transition-colors flex items-center gap-2 text-white ">
            View All Clubs <Lock size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Feature;
