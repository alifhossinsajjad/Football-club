"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Lock } from "lucide-react";
import { useSelector } from "react-redux";

const clubs = [
  {
    name: "Arsenal",
    league: "EPL",
    team: "Arsenal",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  },
  {
    name: "Benfica FC",
    league: "Liga Portugal",
    team: "Benfica",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg",
  },
  {
    name: "Atlético de Madrid",
    league: "La Liga",
    team: "Atlético de Madrid",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  },
  {
    name: "Porto",
    league: "Liga Portugal",
    team: "Porto",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f1/FC_Porto.svg",
  },
  {
    name: "Chelsea",
    league: "EPL",
    team: "Chelsea",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  },
  {
    name: "Real Madrid",
    league: "La Liga",
    team: "Real Madrid",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  },
];

const academies = [
  {
    name: "La Masia",
    league: "Barcelona Youth",
    team: "FC Barcelona",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/56/Real_Madrid_CF.svg",
  }, // placeholder
  {
    name: "Ajax Academy",
    league: "Eredivisie Youth",
    team: "Ajax",
    logo: "https://upload.wikimedia.org/wikipedia/en/5/53/Arsenal_FC.svg",
  }, // placeholder
  {
    name: "Sporting CP Academy",
    league: "Portugal Youth",
    team: "Sporting CP",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg",
  },
  {
    name: "Manchester City Academy",
    league: "Premier League 2",
    team: "Man City",
    logo: "https://upload.wikimedia.org/wikipedia/en/c/cc/Chelsea_FC.svg",
  },
  {
    name: "Benfica Campus",
    league: "Portugal Youth",
    team: "Benfica",
    logo: "https://upload.wikimedia.org/wikipedia/en/a/a2/SL_Benfica_logo.svg",
  },
  {
    name: "Atlético Youth",
    league: "Spain Youth",
    team: "Atlético Madrid",
    logo: "https://upload.wikimedia.org/wikipedia/en/f/f4/Atletico_Madrid_2017_logo.svg",
  },
];

export default function ClubsSection() {
  const [activeTab, setActiveTab] = useState("clubs");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [mounted, setMounted] = useState(false);

  const theme = useSelector((state) => state.theme);

  // Data source based on active tab
  const data = activeTab === "clubs" ? clubs : academies;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Responsive visible count
  useEffect(() => {
    if (!mounted) return;

    const handleResize = () => {
      const width = window.innerWidth;
      if (width < 640) setVisibleCount(1);
      else if (width < 1024) setVisibleCount(2);
      else setVisibleCount(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mounted]);

  // Reset carousel index when switching tabs
  useEffect(() => {
    setCurrentIndex(0);
  }, [activeTab]);

  if (!mounted) return null;

  const maxIndex = Math.max(data.length - visibleCount, 0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1 > maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 < 0 ? maxIndex : prev - 1));
  };

  const visibleItems = data.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        {/* Tabs */}
        <div className="flex justify-center mb-6">
          <div
            className="flex bg-[#12143A] rounded-lg overflow-hidden border px-2"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <button
              onClick={() => setActiveTab("clubs")}
              className={`px-6 py-3 text-sm font-medium transition-all rounded-md mx-1 ${
                activeTab === "clubs"
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
              style={{
                backgroundColor:
                  activeTab === "clubs"
                    ? theme.colors.backgroundCard
                    : "transparent",
              }}
            >
              Clubs
            </button>
            <button
              onClick={() => setActiveTab("academies")}
              className={`px-6 py-3 text-sm font-medium transition-all rounded-md mx-1 ${
                activeTab === "academies"
                  ? "text-white"
                  : "text-gray-500 hover:text-white"
              }`}
              style={{
                backgroundColor:
                  activeTab === "academies"
                    ? theme.colors.backgroundCard
                    : "transparent",
              }}
            >
              Academies
            </button>
          </div>
        </div>

        {/* Subtitle */}
        <p className="text-center text-gray-400 mb-10 text-lg">
          Connect with top {activeTab === "clubs" ? "clubs" : "academies"} from
          around the world.
        </p>

        {/* Carousel */}
        <div className="relative flex items-center">
          {maxIndex > 0 && (
            <button
              onClick={prevSlide}
              className="absolute left-0 lg:left-10 z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{
                backgroundColor: `${theme.colors.backgroundCard}cc`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <ChevronLeft size={28} className="text-gray-300" />
            </button>
          )}

          <div className="flex gap-6 justify-center mx-auto w-full overflow-hidden px-12">
            {visibleItems.map((item, i) => (
              <div
                key={i}
                className="flex-shrink-0 bg-card rounded-2xl p-6 text-center transition-all hover:scale-105 hover:shadow-xl"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                  width:
                    visibleCount === 1
                      ? "100%"
                      : visibleCount === 2
                      ? "45%"
                      : "22%",
                  maxWidth: "280px",
                }}
              >
                <div className="w-20 h-20 mx-auto mb-6 flex items-center justify-center bg-gray-800 rounded-2xl">
                  <img
                    src={item.logo}
                    alt={item.name}
                    className="max-w-full max-h-full object-contain p-2"
                  />
                </div>
                <h3 className="font-bold text-white text-lg mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-400 text-sm">
                  {item.league} • {item.team}
                </p>
              </div>
            ))}
          </div>

          {maxIndex > 0 && (
            <button
              onClick={nextSlide}
              className="absolute right-0 lg:right-10 z-10 w-12 h-12 flex items-center justify-center rounded-full transition-all hover:scale-110"
              style={{
                backgroundColor: `${theme.colors.backgroundCard}cc`,
                boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
              }}
            >
              <ChevronRight size={28} className="text-gray-300" />
            </button>
          )}
        </div>

        {/* View All Button */}
        <div className="flex justify-center mt-12">
          <button
            className="px-10 py-4 rounded-full font-medium transition-all flex items-center gap-3 hover:scale-105"
            style={{
              border: `2px solid ${theme.colors.primaryMagenta}`,
              color: "white",
              backgroundColor: `${theme.colors.primaryMagenta}20`,
            }}
          >
            View All {activeTab === "clubs" ? "Clubs" : "Academies"}
            <Lock size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
