import { X, User, Ruler, Home, Video, MessageCircle } from "lucide-react";
import { useGetPlayerByIdQuery } from "@/redux/features/scout/playerDiscoverApi";
import { useCreateConversationMutation } from "@/redux/features/chat/chatApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { DiscoveryPlayer } from "@/types/scout/playerDicoverType";

// Reusable components (assume they exist, or define them inline)
import { Avatar } from "./Avatar";
import { getFlagEmoji as getFlag } from "@/lib/utils/flagUtils";


// Custom icon (no direct lucide match)
const FootIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="8.5" cy="7" r="4.5" />
    <path d="M3 19c0-3 2-5 5.5-5s5.5 2 5.5 5" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    <path d="M21 19c0-3-2-5-5-5" />
  </svg>
);

// Helper skeleton (same as original)
const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-[#1a2e45] ${className}`} />
);

// StatPill component (unchanged from original)
const StatPill = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number;
  unit?: string;
}) => (
  <div className="flex flex-col items-center bg-[#0a1622] border border-[#162d45] rounded-xl px-3 py-3 flex-1">
    <span className="text-base font-bold text-white">
      {value}
      {unit && (
        <span className="text-[10px] text-[#4A6480] font-normal ml-0.5">
          {unit}
        </span>
      )}
    </span>
    <span className="text-[10px] text-[#4A6480] mt-0.5 uppercase tracking-wider">
      {label}
    </span>
  </div>
);

// DetailRow component (unchanged from original)
const DetailRow = ({
  icon,
  label,
  value,
  valueColor = "text-[#C8D8E8]",
}: {
  icon: React.ReactNode;
  label: string;
  value: React.ReactNode;
  valueColor?: string;
}) => (
  <div className="flex items-center justify-between py-3 border-b border-[#162d45] last:border-0">
    <div className="flex items-center gap-2 text-[#4A6480]">
      {icon}
      <span className="text-xs font-medium">{label}</span>
    </div>
    <span className={`text-xs font-semibold ${valueColor}`}>{value}</span>
  </div>
);

// Main Modal Component
export const PlayerDetailModal = ({
  playerId,
  onClose,
}: {
  playerId: number;
  onClose: () => void;
}) => {
  const { data: player, isLoading } = useGetPlayerByIdQuery(playerId);
  const [createConversation, { isLoading: isCreatingChat }] = useCreateConversationMutation();
  const router = useRouter();

  const isAvailable = player?.availability_status === "AVAILABLE";
  const fullName = player ? `${player.first_name} ${player.last_name}` : "";

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0B1623] border border-[#162d45] rounded-t-2xl sm:rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-[#0B1623] border-b border-[#162d45] px-5 py-4 flex items-center justify-between z-10">
          <p className="text-sm font-bold text-white">Player Profile</p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#162d45] flex items-center justify-center text-[#4A6480] hover:text-white hover:bg-[#1d3a55] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="p-5 space-y-4">
            <div className="flex items-center gap-4">
              <Sk className="w-20 h-20 rounded-2xl flex-shrink-0" />
              <div className="space-y-2 flex-1">
                <Sk className="h-5 w-40" />
                <Sk className="h-3 w-24" />
                <div className="flex gap-2">
                  <Sk className="h-6 w-20 rounded-full" />
                  <Sk className="h-6 w-20 rounded-full" />
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <Sk className="h-16 flex-1 rounded-xl" />
              <Sk className="h-16 flex-1 rounded-xl" />
              <Sk className="h-16 flex-1 rounded-xl" />
            </div>
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="flex justify-between border-b border-[#162d45] pb-3"
              >
                <Sk className="h-3 w-24" />
                <Sk className="h-3 w-28" />
              </div>
            ))}
          </div>
        )}

        {/* Player Data */}
        {!isLoading && player && (
          <div className="p-5 space-y-5">
            {/* Hero Section */}
            <div className="flex items-start gap-4">
              <Avatar player={player} size={72} />
              <div className="flex-1 min-w-0">
                <h2 className="text-lg font-bold text-white leading-tight">
                  {fullName}
                </h2>
                <p className="text-xs text-[#4A6480] mt-0.5 capitalize">
                  {player.designation}
                </p>
                <div className="flex flex-wrap gap-2 mt-2.5">
                  {/* Availability Badge */}
                  <span
                    className={`inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border ${
                      isAvailable
                        ? "text-[#2DD4BF] bg-[#2DD4BF]/10 border-[#2DD4BF]/30"
                        : "text-[#4A6480] bg-[#4A6480]/10 border-[#4A6480]/30"
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isAvailable ? "bg-[#2DD4BF]" : "bg-[#4A6480]"
                      }`}
                    />
                    {isAvailable ? "Available" : "Not Available"}
                  </span>
                  {/* Nationality Badge */}
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full border text-[#C8D8E8] bg-[#162d45] border-[#1d3a55]">
                    {getFlag(player.nationality)} {player.nationality}
                  </span>
                </div>
              </div>
            </div>

            {/* Age / Height / Weight Pills */}
            <div className="flex gap-2">
              <StatPill label="Age" value={player.age} unit="yrs" />
              <StatPill label="Height" value={player.height} unit="m" />
              <StatPill label="Weight" value={player.weight} unit="kg" />
            </div>

            {/* All Detail Rows */}
            <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl px-4 pt-1">
              <DetailRow
                icon={<User size={13} />}
                label="Full Name"
                value={fullName}
              />
              <DetailRow
                icon={
                  <span className="text-xs">{getFlag(player.nationality)}</span>
                }
                label="Nationality"
                value={player.nationality}
              />
              <DetailRow
                icon={<User size={13} />}
                label="Age"
                value={`${player.age} years`}
              />
              <DetailRow
                icon={<FootIcon />}
                label="Preferred Foot"
                value={player.preferred_foot}
                valueColor="text-[#2DD4BF]"
              />
              <DetailRow
                icon={<Ruler size={13} />}
                label="Height"
                value={`${player.height} m`}
                valueColor="text-[#2DD4BF]"
              />
              <DetailRow
                icon={<Ruler size={13} />}
                label="Weight"
                value={`${player.weight} kg`}
                valueColor="text-[#2DD4BF]"
              />
              <DetailRow
                icon={<Home size={13} />}
                label="Current Club"
                value={player.current_club || "—"}
                valueColor="text-[#2DD4BF]"
              />
              <DetailRow
                icon={<Video size={13} />}
                label="Highlight Video"
                value={
                  player.highlight_video_available
                    ? "Available"
                    : "Not available"
                }
                valueColor={
                  player.highlight_video_available
                    ? "text-[#2DD4BF]"
                    : "text-[#4A6480]"
                }
              />
            </div>

            {/* Highlight Video Player / Placeholder */}
            {player.highlight_video_available ? (
              <div className="w-full h-28 rounded-xl bg-[#0a1622] border border-[#162d45] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#2DD4BF]/40 transition-colors group">
                <div className="w-10 h-10 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center group-hover:bg-[#2DD4BF]/20 transition-colors">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#2DD4BF">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <p className="text-[11px] text-[#4A6480]">Play Highlight Video</p>
              </div>
            ) : (
              <div className="w-full h-20 rounded-xl bg-[#0a1622] border border-dashed border-[#162d45] flex items-center justify-center gap-2">
                <Video size={13} />
                <p className="text-[11px] text-[#4A6480]">No highlight video available</p>
              </div>
            )}

            {/* Send Message CTA */}
            <button
              onClick={() => {
                const userId = player.user?.id || playerId;
                router.push(`/scout/messaging?playerId=${playerId}&userId=${userId}`);
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-[#0a1218] font-bold text-sm transition-colors"
            >
              <MessageCircle size={14} />
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};