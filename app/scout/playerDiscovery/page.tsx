"use client";

import { useState, useMemo } from "react";
import {
  useGetDiscoveryPlayersQuery,
  useGetPlayerByIdQuery,
} from "@/redux/features/scout/playerDiscoverApi";
import {
  DiscoveryPlayer,
  PlayerDiscoveryFilters,
} from "@/types/scout/playerDicoverType";

// ─── Fallback data ────────────────────────────────────────────────────────────

const FALLBACK_PLAYERS: DiscoveryPlayer[] = [
  {
    id: 1,
    first_name: "John",
    last_name: "Doe",
    designation: "Midfielder",
    nationality: "Spain",
    age: 19,
    preferred_foot: "RIGHT",
    height: "1.80",
    weight: "75",
    current_club: "Real Madrid Academy",
    availability_status: "AVAILABLE",
    highlight_video_available: true,
    profile_image: "",
  },
  {
    id: 2,
    first_name: "Sarah",
    last_name: "Player",
    designation: "Forward",
    nationality: "Portugal",
    age: 18,
    preferred_foot: "LEFT",
    height: "1.70",
    weight: "62",
    current_club: "Chelsea Academy",
    availability_status: "AVAILABLE",
    highlight_video_available: true,
    profile_image: "",
  },
  {
    id: 3,
    first_name: "Mike",
    last_name: "Johnson",
    designation: "Defender",
    nationality: "France",
    age: 20,
    preferred_foot: "RIGHT",
    height: "1.85",
    weight: "80",
    current_club: "AC Milan Youth",
    availability_status: "NOT_AVAILABLE",
    highlight_video_available: false,
    profile_image: "",
  },
  {
    id: 4,
    first_name: "Emma",
    last_name: "Garcia",
    designation: "Goalkeeper",
    nationality: "Spain",
    age: 17,
    preferred_foot: "RIGHT",
    height: "1.75",
    weight: "68",
    current_club: "São Paulo FC",
    availability_status: "AVAILABLE",
    highlight_video_available: true,
    profile_image: "",
  },
  {
    id: 5,
    first_name: "Carlos",
    last_name: "Silva",
    designation: "Midfielder",
    nationality: "Portugal",
    age: 19,
    preferred_foot: "LEFT",
    height: "1.78",
    weight: "73",
    current_club: "Al Ahly SC",
    availability_status: "AVAILABLE",
    highlight_video_available: true,
    profile_image: "",
  },
  {
    id: 6,
    first_name: "Anna",
    last_name: "Müller",
    designation: "Forward",
    nationality: "Germany",
    age: 18,
    preferred_foot: "RIGHT",
    height: "1.68",
    weight: "60",
    current_club: "PSG Academy",
    availability_status: "NOT_AVAILABLE",
    highlight_video_available: false,
    profile_image: "",
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const FLAG: Record<string, string> = {
  Spain: "🇪🇸",
  Portugal: "🇵🇹",
  France: "🇫🇷",
  Germany: "🇩🇪",
  England: "🏴󠁧󠁢󠁥󠁮󠁧󠁿",
  Brazil: "🇧🇷",
  Argentina: "🇦🇷",
  Italy: "🇮🇹",
  Netherlands: "🇳🇱",
  Belgium: "🇧🇪",
  Croatia: "🇭🇷",
  Morocco: "🇲🇦",
};
const getFlag = (n: string) => FLAG[n] ?? "🌍";

// ─── Icons ────────────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);
const StarIcon = ({ filled }: { filled?: boolean }) => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill={filled ? "#2DD4BF" : "none"}
    stroke={filled ? "#2DD4BF" : "#4A6480"}
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);
const MessageIcon = () => (
  <svg
    width="15"
    height="15"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const ChevronIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);
const SearchIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);
const ResetIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </svg>
);
const UserIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
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
const ClubIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    <polyline points="9 22 9 12 15 12 15 22" />
  </svg>
);
const RulerIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21.3 8.7 8.7 21.3c-1 1-2.5 1-3.4 0l-2.6-2.6c-1-1-1-2.5 0-3.4L15.3 2.7c1-1 2.5-1 3.4 0l2.6 2.6c1 1 1 2.5 0 3.4Z" />
    <path d="m7.5 10.5 2 2" />
    <path d="m10.5 7.5 2 2" />
    <path d="m13.5 4.5 2 2" />
    <path d="m4.5 13.5 2 2" />
  </svg>
);
const VideoIcon = () => (
  <svg
    width="13"
    height="13"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="23 7 16 12 23 17 23 7" />
    <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
  </svg>
);

// ─── Skeleton ─────────────────────────────────────────────────────────────────

const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-[#1a2e45] ${className}`} />
);

// ─── Avatar ───────────────────────────────────────────────────────────────────

const Avatar = ({
  player,
  size = 48,
}: {
  player: DiscoveryPlayer;
  size?: number;
}) => {
  const initials = `${player.first_name[0]}${player.last_name[0]}`;
  const hue =
    (player.first_name + player.last_name)
      .split("")
      .reduce((a, c) => a + c.charCodeAt(0), 0) % 360;
  if (player.profile_image) {
    return (
      <img
        src={player.profile_image}
        alt=""
        className="rounded-full object-cover border-2 border-[#1d3a55] flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }
  return (
    <div
      className="rounded-full flex items-center justify-center text-white font-bold border-2 border-[#1d3a55] flex-shrink-0"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.32,
        background: `linear-gradient(135deg, hsl(${hue},55%,28%), hsl(${hue},45%,18%))`,
      }}
    >
      {initials}
    </div>
  );
};

// ─── Filter Select ────────────────────────────────────────────────────────────

const FilterSelect = ({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: { label: string; value: string }[];
}) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#2DD4BF] transition-colors cursor-pointer pr-8"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#0a1622]">
            {o.label}
          </option>
        ))}
      </select>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
        <ChevronIcon />
      </span>
    </div>
  </div>
);

// ─── Skeleton Card ────────────────────────────────────────────────────────────

const SkeletonCard = () => (
  <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl p-4 animate-pulse">
    <div className="flex items-start justify-between mb-4">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-[#1a2e45]" />
        <div className="space-y-2">
          <div className="h-4 w-28 bg-[#1a2e45] rounded" />
          <div className="h-3 w-16 bg-[#1a2e45] rounded" />
        </div>
      </div>
      <div className="w-4 h-4 bg-[#1a2e45] rounded" />
    </div>
    {[1, 2, 3, 4, 5].map((i) => (
      <div key={i} className="flex justify-between mb-2">
        <div className="h-3 w-20 bg-[#1a2e45] rounded" />
        <div className="h-3 w-24 bg-[#1a2e45] rounded" />
      </div>
    ))}
    <div className="flex gap-2 mt-4">
      <div className="flex-1 h-8 bg-[#1a2e45] rounded-lg" />
      <div className="w-8 h-8 bg-[#1a2e45] rounded-lg" />
    </div>
  </div>
);

// ─── Player Card ──────────────────────────────────────────────────────────────

const PlayerCard = ({
  player,
  onViewProfile,
}: {
  player: DiscoveryPlayer;
  onViewProfile: (id: number) => void;
}) => {
  const [starred, setStarred] = useState(false);

  return (
    <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl p-4 hover:border-[#2DD4BF]/30 transition-all duration-200 hover:shadow-[0_0_20px_rgba(45,212,191,0.06)] flex flex-col">
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
          <StarIcon filled={starred} />
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
            className={`text-[11px] font-medium ${player.highlight_video_available ? "text-[#2DD4BF]" : "text-[#4A6480]"}`}
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
          onClick={() => onViewProfile(player.id)}
          className="flex-1 py-2 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#2DD4BF] text-xs font-semibold hover:bg-[#2DD4BF] hover:text-[#0a1218] transition-all duration-200"
        >
          View Profile
        </button>
        <button className="w-9 h-9 rounded-lg bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 text-[#2DD4BF] flex items-center justify-center hover:bg-[#2DD4BF] hover:text-[#0a1218] transition-all duration-200">
          <MessageIcon />
        </button>
      </div>
    </div>
  );
};

// ─── Detail Row ───────────────────────────────────────────────────────────────

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

// ─── Stat Pill ────────────────────────────────────────────────────────────────

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

// ─── Player Detail Modal ──────────────────────────────────────────────────────
// Fetches player data by ID and shows it in a modal overlay

const PlayerDetailModal = ({
  playerId,
  onClose,
}: {
  playerId: number;
  onClose: () => void;
}) => {
  // This calls GET /scout-agent/player-discovery/{playerId}/
  const { data: player, isLoading } = useGetPlayerByIdQuery(playerId);

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
            <CloseIcon />
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

        {/* Player Data — Rendered from API response */}
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
                      className={`w-1.5 h-1.5 rounded-full ${isAvailable ? "bg-[#2DD4BF]" : "bg-[#4A6480]"}`}
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

            {/* All Detail Rows — directly from API fields */}
            <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl px-4 pt-1">
              <DetailRow
                icon={<UserIcon />}
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
                icon={<UserIcon />}
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
                icon={<RulerIcon />}
                label="Height"
                value={`${player.height} m`}
                valueColor="text-[#2DD4BF]"
              />
              <DetailRow
                icon={<RulerIcon />}
                label="Weight"
                value={`${player.weight} kg`}
                valueColor="text-[#2DD4BF]"
              />
              <DetailRow
                icon={<ClubIcon />}
                label="Current Club"
                value={player.current_club || "—"}
                valueColor="text-[#2DD4BF]"
              />
              <DetailRow
                icon={<VideoIcon />}
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
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="#2DD4BF"
                  >
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <p className="text-[11px] text-[#4A6480]">
                  Play Highlight Video
                </p>
              </div>
            ) : (
              <div className="w-full h-20 rounded-xl bg-[#0a1622] border border-dashed border-[#162d45] flex items-center justify-center gap-2">
                <VideoIcon />
                <p className="text-[11px] text-[#4A6480]">
                  No highlight video available
                </p>
              </div>
            )}

            {/* Send Message CTA */}
            <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-[#0a1218] font-bold text-sm transition-colors">
              <MessageIcon />
              Send Message
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Filter Options ───────────────────────────────────────────────────────────

const POSITIONS = [
  { label: "All Positions", value: "" },
  { label: "Forward", value: "Forward" },
  { label: "Midfielder", value: "Midfielder" },
  { label: "Defender", value: "Defender" },
  { label: "Goalkeeper", value: "Goalkeeper" },
];
const NATIONALITIES = [
  { label: "All Countries", value: "" },
  { label: "Spain", value: "Spain" },
  { label: "Portugal", value: "Portugal" },
  { label: "France", value: "France" },
  { label: "Germany", value: "Germany" },
  { label: "England", value: "England" },
  { label: "Brazil", value: "Brazil" },
  { label: "Italy", value: "Italy" },
];
const AGE_RANGES = [
  { label: "All Ages", value: "" },
  { label: "16–18", value: "16-18" },
  { label: "18–21", value: "18-21" },
  { label: "21–25", value: "21-25" },
  { label: "25–30", value: "25-30" },
  { label: "30+", value: "30-99" },
];

// ─── Main Page ────────────────────────────────────────────────────────────────

const PlayerDiscoveryPage = () => {
  const [search, setSearch] = useState("");
  const [position, setPosition] = useState("");
  const [nationality, setNationality] = useState("");
  const [ageRange, setAgeRange] = useState("");
  const [page, setPage] = useState(1);

  // ← selectedPlayerId: null = modal closed, number = modal open showing that player
  const [selectedPlayerId, setSelectedPlayerId] = useState<number | null>(null);

  const activeFilters = useMemo<PlayerDiscoveryFilters>(() => {
    const f: PlayerDiscoveryFilters = { page };
    if (position) f.position = position;
    if (nationality) f.nationality = nationality;
    if (ageRange) {
      const [min, max] = ageRange.split("-").map(Number);
      f.age_min = min;
      f.age_max = max;
    }
    if (search) f.search = search;
    return f;
  }, [position, nationality, ageRange, search, page]);

  const { data, isLoading, isFetching } =
    useGetDiscoveryPlayersQuery(activeFilters);

  const players: DiscoveryPlayer[] =
    data?.results && data.results.length > 0 ? data.results : FALLBACK_PLAYERS;

  const hasMore = !!data?.next;
  const loading = isLoading || isFetching;

  const handleReset = () => {
    setPosition("");
    setNationality("");
    setAgeRange("");
    setSearch("");
    setPage(1);
  };

  return (
    <div className="text-white min-h-screen">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-xl font-bold">
          <span className="text-[#2DD4BF]">Player </span>
          <span className="text-white">Discovery</span>
        </h1>
      </div>

      {/* Filters */}
      <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl p-5 mb-6">
        <div className="flex items-center justify-between mb-4">
          <p className="text-sm font-semibold text-white">Search Filters</p>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 text-xs font-medium text-[#2DD4BF] border border-[#2DD4BF]/40 rounded-lg px-3 py-1.5 hover:bg-[#2DD4BF]/10 transition-colors"
          >
            <ResetIcon /> Reset Filters
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <FilterSelect
            label="Position"
            value={position}
            onChange={(v) => {
              setPosition(v);
              setPage(1);
            }}
            options={POSITIONS}
          />
          <FilterSelect
            label="Nationality"
            value={nationality}
            onChange={(v) => {
              setNationality(v);
              setPage(1);
            }}
            options={NATIONALITIES}
          />
          <FilterSelect
            label="Age Range"
            value={ageRange}
            onChange={(v) => {
              setAgeRange(v);
              setPage(1);
            }}
            options={AGE_RANGES}
          />
          <div className="flex flex-col gap-1.5">
            <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">
              Search Name
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
                <SearchIcon />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                placeholder="Search by name..."
                className="w-full bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 pl-8 text-sm text-[#C8D8E8] placeholder-[#2a4060] focus:outline-none focus:border-[#2DD4BF] transition-colors"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Player Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : players.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <p className="text-sm font-semibold text-white mb-1">
            No players found
          </p>
          <p className="text-xs text-[#4A6480] mb-4">
            Try adjusting your filters
          </p>
          <button
            onClick={handleReset}
            className="text-xs text-[#2DD4BF] border border-[#2DD4BF]/40 rounded-lg px-4 py-2 hover:bg-[#2DD4BF]/10 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {players.map((player) => (
            <PlayerCard
              key={player.id}
              player={player}
              onViewProfile={(id) => setSelectedPlayerId(id)} // ← opens modal with player id
            />
          ))}
        </div>
      )}

      {/* Load More */}
      {players.length >= 6 && (
        <div className="flex justify-center mt-8">
          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={loading || !hasMore}
            className="px-8 py-2.5 rounded-lg border border-[#2DD4BF]/40 text-[#2DD4BF] text-sm font-semibold hover:bg-[#2DD4BF]/10 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "Loading..." : "Load More Players"}
          </button>
        </div>
      )}

      {/* ── Player Detail Modal ──────────────────────────────────────────────
          Opens when selectedPlayerId is set.
          Calls GET /scout-agent/player-discovery/{selectedPlayerId}/
          Closes when X is clicked or backdrop is clicked.
      */}
      {selectedPlayerId !== null && (
        <PlayerDetailModal
          playerId={selectedPlayerId}
          onClose={() => setSelectedPlayerId(null)}
        />
      )}
    </div>
  );
};

export default PlayerDiscoveryPage;
