import React from "react";
import { MessageSquare, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function PlayerDirectoryCard({
  image = "/placeholder.png",
  title = "Unknown",
  role = "-",
  nationality = "-",
  nationFlag = "",
  age = "-",
  rating = "_",
  highlightVideo = "_",
  currentClub = "_",
  theme = {
    colors: {
      backgroundDark: "#0B0D2C",
      primaryCyan: "#04B5A3",
    },
  },
}) {
  const router = useRouter();
  const hasHighlightVideo =
    highlightVideo && highlightVideo !== "_" && highlightVideo !== "";

  return (
    <div
      className="border rounded-lg p-4 space-y-5 hover:opacity-80 transition-all"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* image and title */}
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-15 h-15 rounded-full overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={title}
            />
          </div>
          <div>
            <h3 className="text-white font-bold">{title}</h3>
            <p className="text-gray-400">{role}</p>
          </div>
        </div>
        <Star className="text-[#00E5FF] w-5 h-5" />
      </div>

      {/* nationality */}
      <div className="flex text-sm sm:text-base justify-between items-center text-gray-300">
        <p>Nationality:</p>
        <p>
          {nationFlag} {nationality}
        </p>
      </div>

      {/* age */}
      <div className="flex text-sm sm:text-base justify-between items-center text-gray-300">
        <p>Age:</p>
        <p>{age}</p>
      </div>
      {/* rating */}
      <div className="flex text-sm sm:text-base justify-between items-center text-gray-300">
        <p>Rating:</p>
        <p className="text-[#00E5FF]">{rating}/100</p>
      </div>
      {/* highlight video */}
      <div className="flex text-sm sm:text-base justify-between items-center text-gray-300">
        <p>Highlight Video:</p>
        {hasHighlightVideo ? (
          <a
            href={highlightVideo}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#05DF72] font-medium hover:underline"
          >
            Available
          </a>
        ) : (
          <span className="text-[#FFFFFF66]">Not Available</span>
        )}
      </div>

      {/* current club */}
      <div className="flex text-sm sm:text-base justify-between items-center text-gray-300">
        <p>Current Club:</p>
        <p>{currentClub}</p>
      </div>

      {/* button */}
      <div className="flex text-sm sm:text-base items-center gap-2 ">
        <div
          className="flex-1 rounded-md py-2 text-center cursor-pointer hover:opacity-90"
          style={{
            backgroundColor: theme.colors.primaryCyan,
          }}
        >
          {/* <button
            onClick={() => router.push("/scout/player-profile")}
            className="text-white text-sm font-semibold"
          >
            View Full Profile
          </button> */}
          <button
            onClick={() =>
              router.push(
                `/scout/player-profile?data=${encodeURIComponent(
                  JSON.stringify({
                    image,
                    name: title,
                    position: role,
                    nationality,
                    age,
                    currentClub,
                    rating,
                    highlightVideo,
                  })
                )}`
              )
            }
            className="text-white text-sm font-semibold"
          >
            View Full Profile
          </button>
        </div>
        <button className="cursor-pointer px-4 py-2 border-2 border-[#04B5A333] rounded-lg">
          <MessageSquare className="w-4 h-4 text-[#04B5A3]" />
        </button>
      </div>
    </div>
  );
}
