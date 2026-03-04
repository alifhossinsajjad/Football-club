import { useState } from "react";
import { Star, MessageCircle } from "lucide-react";
// or move getFlag to a shared utils
import { DiscoveryPlayer } from "@/types/scout/playerDicoverType";
import { Avatar } from "./Avatar";
import { getFlag } from "@/app/scout/playerDiscovery/page";

interface PlayerCardProps {
  player: DiscoveryPlayer;
  onViewProfile: () => void;
}

export const PlayerCard = ({ player, onViewProfile }: PlayerCardProps) => {
  const [starred, setStarred] = useState(false);

  return (
    <div className="bg-[#12143A] border border-[#2DD4BF]/30 rounded-xl p-4 transition-all duration-200 hover:shadow-[0_0_20px_rgba(45,212,191,0.06)] flex flex-col">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3 min-w-0">
          <Avatar player={player} size={48} />
          <div className="min-w-0">
            <p className="text-sm font-bold text-white truncate">
              {player.first_name} {player.last_name}
            </p>
            <p className="text-[11px] text-[#4A6480] mt-0.5">
              {player.designation}
            </p>
          </div>
        </div>
        <button
          onClick={() => setStarred(!starred)}
          className="flex-shrink-0 hover:scale-110 transition-transform"
        >
          <Star
            size={15}
            fill={starred ? "#2DD4BF" : "none"}
            stroke={starred ? "#2DD4BF" : "#4A6480"}
          />
        </button>
      </div>

      <div className="space-y-2 flex-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#4A6480]">Nationality:</span>
          <span className="text-[11px] text-[#C8D8E8] flex items-center gap-1">
            {getFlag(player.nationality)} {player.nationality}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#4A6480]">Age:</span>
          <span className="text-[11px] text-[#C8D8E8]">{player.age} years</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#4A6480]">Highlight Video:</span>
          <span
            className={`text-[11px] font-medium ${
              player.highlight_video_available ? "text-[#2DD4BF]" : "text-[#4A6480]"
            }`}
          >
            {player.highlight_video_available ? "Available" : "Not available"}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-[#4A6480]">Current Club:</span>
          <span className="text-[11px] font-medium text-[#2DD4BF] truncate max-w-[120px]">
            {player.current_club || "—"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          onClick={onViewProfile}
          className="flex-1 py-2 rounded-lg bg-[#2DD4BF] text-white text-xs font-semibold  transition-all duration-200"
        >
          View Profile
        </button>
        <button className="w-9 h-9 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center hover:bg-[#2DD4BF] hover:text-[#0a1218] transition-all duration-200">
          <MessageCircle size={15} />
        </button>
      </div>
    </div>
  );
};