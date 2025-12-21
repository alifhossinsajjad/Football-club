"use client";

import { Lock } from "lucide-react";
import { useSelector } from "react-redux";
import SectionTitel from "./ReUseable/SectionTitle";

const players = [
  {
    firstName: "Lionel",
    lastName: "Messi",
    country: "Argentina",
    flag: "🇦🇷",
    position: "Forward",
    image:
      "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=150&h=150&fit=crop&crop=face",
  },
  {
    firstName: "Kevin",
    lastName: "Bruyne",
    country: "Belgium",
    flag: "🇧🇪",
    position: "Midfielder",
    image:
      "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=150&h=150&fit=crop&crop=face",
  },
  {
    firstName: "Virgil",
    lastName: "van",
    country: "Netherlands",
    flag: "🇳🇱",
    position: "Defender",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=150&h=150&fit=crop&crop=face",
  },
  {
    firstName: "Mbappé",
    lastName: "",
    country: "France",
    flag: "🇫🇷",
    position: "Forward",
    image:
      "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=150&h=150&fit=crop&crop=face",
  },
];

const FeaturedPlayers = () => {
  const theme = useSelector((state) => state.theme);
  return (
    <section className="py-20 px-4 ">
      <div className="container mx-auto">
        {/* Header */}
        {/* <div className="text-center mb-12">
          <h2  className="text-4xl md:text-5xl lg:text-6xl  font-bold mb-2 inline-block"
                        style={{
                            backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                            backgroundClip: "text",
                            color: "transparent",
                        }}>
            FEATURED PLAYERS
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Browse top football talent and explore detailed player profiles.
          </p>
        </div> */}

        <SectionTitel
          title="FEATURED PLAYERS"
          subtitle="Browse top football talent and explore detailed player profiles."
        />

        {/* Players Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {players.map((player, index) => (
            <div
              key={index}
              className="relative p-6 rounded-lg  border border-navy-700/50 flex items-center justify-between hover:border-purple-500/30 transition-colors duration-300"
            >
              {/* Player Info */}
              <div className="flex-1">
                <h3 className="font-display text-lg font-semibold mb-2">
                  <span className="text-cyan-400">{player.firstName}</span>
                  {player.lastName && (
                    <span className="text-foreground"> {player.lastName}</span>
                  )}
                </h3>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-lg">{player.flag}</span>
                  <span className="text-muted-foreground text-sm">
                    {player.country}
                  </span>
                </div>
                <p className="text-purple-400 text-sm">
                  Position: {player.position}
                </p>
              </div>

              {/* Player Image */}
              <div className="w-32 h-24 rounded-lg overflow-hidden bg-navy-700">
                <img
                  src={player.image}
                  alt={`${player.firstName} ${player.lastName}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

   

        <div className="flex justify-center mt-10">
          <button className="px-8 py-2 border border-purple/50 rounded-full text-foreground hover:bg-purple/10 transition-colors flex items-center gap-2"
           style={{ borderColor: theme.colors.primaryMagenta }}
          >
            View All Clubs <Lock size={14} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedPlayers;
