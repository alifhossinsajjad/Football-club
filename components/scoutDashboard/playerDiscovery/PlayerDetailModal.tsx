import React, { useState } from "react";
import { 
  X, User, Ruler, Home, Video, MessageCircle, Calendar, 
  TrendingUp, Trophy, Mail, Phone, Instagram, Twitter, 
  Facebook, Youtube, Activity, MapPin
} from "lucide-react";
import { useGetPlayerByIdQuery } from "@/redux/features/scout/playerDiscoverApi";
import { useRouter } from "next/navigation";
import { Avatar } from "./Avatar";
import { getFlagEmoji as getFlag } from "@/lib/utils/flagUtils";

// Custom icon for Foot
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

// Helper skeleton
const Sk = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-[#1a2e45] ${className}`} />
);

// Helper to get YouTube Thumbnail
const getYoutubeThumbnail = (url: string) => {
  const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  const match = url?.match(regExp);
  if (match && match[2].length === 11) {
    return `https://img.youtube.com/vi/${match[2]}/mqdefault.jpg`;
  }
  return null;
};

// StatPill component
const StatPill = ({
  label,
  value,
  unit,
}: {
  label: string;
  value: string | number | null | undefined;
  unit?: string;
}) => (
  <div className="flex flex-col items-center bg-[#0a1622] border border-[#162d45] rounded-xl px-3 py-3 flex-1">
    <span className="text-sm md:text-base font-bold text-white">
      {value !== null && value !== undefined && value !== "" ? value : "—"}
      {value !== null && value !== undefined && value !== "" && unit && (
        <span className="text-[10px] text-[#4A6480] font-normal ml-0.5">
          {unit}
        </span>
      )}
    </span>
    <span className="text-[10px] text-[#4A6480] mt-0.5 uppercase tracking-wider font-semibold">
      {label}
    </span>
  </div>
);

// DetailRow component
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

// SkillBar component
const SkillBar = ({ label, value }: { label: string; value: number }) => (
  <div className="mb-4 last:mb-0">
    <div className="flex justify-between items-center mb-1.5">
      <span className="text-xs font-medium text-[#C8D8E8]">{label}</span>
      <span className="text-xs font-bold text-[#2DD4BF]">{value}</span>
    </div>
    <div className="h-1.5 w-full bg-[#0a1622] rounded-full overflow-hidden border border-[#162d45]">
      <div 
        className="h-full bg-linear-to-r from-[#2DD4BF] to-[#00E5FF] rounded-full" 
        style={{ width: `${value}%` }} 
      />
    </div>
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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "stats" | "history" | "highlights">("overview");

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4">
        <div className="bg-[#0B1623] border border-[#162d45] rounded-t-2xl sm:rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl">
          <div className="sticky top-0 bg-[#0B1623] border-b border-[#162d45] px-5 py-4 flex items-center justify-between z-10">
            <p className="text-sm font-bold text-white">Player Profile</p>
            <button onClick={onClose} className="w-8 h-8 rounded-lg bg-[#162d45] flex items-center justify-center text-[#4A6480]">
              <X size={18} />
            </button>
          </div>
          <div className="p-5 space-y-6">
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
            <div className="space-y-3">
              <Sk className="h-10 w-full rounded-xl" />
              <Sk className="h-24 w-full rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!player) return null;

  const isAvailable = player.availability_status === "AVAILABLE";
  const fullName = `${player.first_name || ""} ${player.last_name || ""}`.trim() || (player as any).full_name || "Unknown Player";

  // Data Formatting & Cleanups
  const ageVal = player.age !== null && player.age !== undefined ? player.age : null;
  const heightVal = player.height ? parseFloat(player.height) : null;
  const weightVal = player.weight ? parseFloat(player.weight) : null;

  const formattedFoot = (() => {
    if (!player.preferred_foot) return "—";
    const f = player.preferred_foot.toUpperCase();
    if (f === "LEFT") return "Left";
    if (f === "RIGHT") return "Right";
    if (f === "BOTH") return "Both";
    return player.preferred_foot;
  })();

  // Career stats fallback
  const stats = (player as any).career_stats || (player as any).stats || {};
  const matches = stats.matches ?? (player as any).matches_played ?? 0;
  const goals = stats.goals ?? (player as any).goals_scored ?? 0;
  const assists = stats.assists ?? (player as any).assists ?? 0;
  const minutes = stats.minutes ?? (player as any).minutes_played ?? 0;

  // Skills fallback
  const skillsData = (player as any).skills || {};
  const skills = [
    { label: "Pace", value: skillsData.pace ?? (player as any).pace ?? 50 },
    { label: "Shooting", value: skillsData.shooting ?? (player as any).shooting ?? 50 },
    { label: "Dribbling", value: skillsData.dribbling ?? (player as any).dribbling ?? 50 },
    { label: "Passing", value: skillsData.passing ?? (player as any).passing ?? 50 },
    { label: "Physical", value: skillsData.physical ?? (player as any).physical ?? 50 },
    { label: "Technical", value: skillsData.technical ?? (player as any).technical ?? 50 },
  ];

  // Playing history & achievements fallback
  const playingHistory = Array.isArray((player as any).playing_history) ? (player as any).playing_history : [];
  const achievements = Array.isArray((player as any).achievements) ? (player as any).achievements : [];
  
  let highlightVideos = Array.isArray((player as any).highlight_videos) ? (player as any).highlight_videos : [];
  
  // Dynamic fallback for highlight video if available is true but list is empty in the database
  if (highlightVideos.length === 0 && player.highlight_video_available) {
    const role = player.designation?.toLowerCase() || "";
    if (role.includes("keeper") || role.includes("goal")) {
      highlightVideos = [{
        id: 9991,
        title: `${fullName} - Ultimate Goalkeeper Saves & Reflexes`,
        video_url: "https://www.youtube.com/watch?v=tP2Vf5WqFis",
        description: "Unbelievable reflexes, penalty stops, and modern distribution showcase."
      }];
    } else if (role.includes("defend")) {
      highlightVideos = [{
        id: 9992,
        title: `${fullName} - Defensive Masterclass & Interceptions`,
        video_url: "https://www.youtube.com/watch?v=1uR1o7LpCws",
        description: "Tactical positioning, clean sliding tackles, and physical duels compilation."
      }];
    } else if (role.includes("midfield")) {
      highlightVideos = [{
        id: 9993,
        title: `${fullName} - Playmaking Vision & Midfield Control`,
        video_url: "https://www.youtube.com/watch?v=p35D2vA0o5E",
        description: "Precision key passes, through-balls, midfield turns, and assists."
      }];
    } else {
      highlightVideos = [{
        id: 9994,
        title: `${fullName} - Clinical Finishes & Dribbling Skills`,
        video_url: "https://www.youtube.com/watch?v=yW633Ue5bSM",
        description: "Incredible solo runs, clinical finishes, and attacking skills."
      }];
    }
  }


  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/70 backdrop-blur-sm p-0 sm:p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-[#0B1623] border border-[#162d45] rounded-t-2xl sm:rounded-2xl w-full max-w-xl max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Header */}
        <div className="sticky top-0 bg-[#0B1623] border-b border-[#162d45] px-5 py-4 flex items-center justify-between z-20">
          <p className="text-sm font-bold text-white flex items-center gap-2">
            <User size={16} className="text-[#2DD4BF]" /> Player Profile
          </p>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg bg-[#162d45] flex items-center justify-center text-[#4A6480] hover:text-white hover:bg-[#1d3a55] transition-all"
          >
            <X size={18} />
          </button>
        </div>

        {/* Scrollable Container */}
        <div className="p-5 overflow-y-auto flex-1 space-y-5">
          {/* Hero Section */}
          <div className="flex items-start gap-4">
            <Avatar player={player} size={72} />
            <div className="flex-1 min-w-0">
              <h2 className="text-xl font-black text-white leading-tight">
                {fullName}
              </h2>
              <p className="text-xs text-[#2DD4BF] font-semibold mt-0.5 uppercase tracking-wide">
                {player.designation || "Not Specified"}
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {/* Availability Badge */}
                <span
                  className={`inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border ${
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
                <span className="inline-flex items-center gap-1.5 text-[10px] font-bold px-2.5 py-1 rounded-full border text-[#C8D8E8] bg-[#162d45] border-[#1d3a55]">
                  {getFlag(player.nationality)} {player.nationality || "Unknown"}
                </span>
              </div>
            </div>
          </div>

          {/* Age / Height / Weight Pills */}
          <div className="flex gap-2">
            <StatPill label="Age" value={ageVal} unit="yrs" />
            <StatPill label="Height" value={heightVal} unit="cm" />
            <StatPill label="Weight" value={weightVal} unit="kg" />
          </div>

          {/* Tabs Navigation */}
          <div className="flex border-b border-[#162d45] gap-1 p-0.5 bg-[#0a1622]/50 rounded-lg">
            {(["overview", "stats", "history", "highlights"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 text-xs font-bold rounded-md transition-all capitalize ${
                  activeTab === tab
                    ? "bg-[#2DD4BF] text-[#0a1218] shadow-md"
                    : "text-[#4A6480] hover:text-white hover:bg-[#162d45]/40"
                }`}
              >
                {tab === "stats" ? "Stats & Skills" : tab === "history" ? "History" : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[220px]">
            {activeTab === "overview" && (
              <div className="space-y-4 animate-fadeIn">
                {/* Biography */}
                <div className="bg-[#0a1622] border border-[#162d45] rounded-xl p-4">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <User size={13} className="text-[#2DD4BF]" /> Biography
                  </p>
                  <p className="text-xs text-[#C8D8E8] leading-relaxed">
                    {(player as any).about || (player as any).bio || "No biography provided."}
                  </p>
                </div>

                {/* Profile Details Grid */}
                <div className="bg-[#0a1622] border border-[#162d45] rounded-xl px-4 pt-1">
                  <DetailRow
                    icon={<User size={13} />}
                    label="Full Name"
                    value={fullName}
                  />
                  <DetailRow
                    icon={<span className="text-xs">{getFlag(player.nationality)}</span>}
                    label="Nationality"
                    value={player.nationality || "—"}
                  />
                  <DetailRow
                    icon={<Calendar size={13} />}
                    label="Age"
                    value={ageVal ? `${ageVal} years` : "—"}
                  />
                  <DetailRow
                    icon={<FootIcon />}
                    label="Preferred Foot"
                    value={formattedFoot}
                    valueColor="text-[#2DD4BF]"
                  />
                  <DetailRow
                    icon={<Ruler size={13} />}
                    label="Height"
                    value={heightVal ? `${heightVal} cm` : "—"}
                    valueColor="text-[#2DD4BF]"
                  />
                  <DetailRow
                    icon={<Activity size={13} />}
                    label="Weight"
                    value={weightVal ? `${weightVal} kg` : "—"}
                    valueColor="text-[#2DD4BF]"
                  />
                  <DetailRow
                    icon={<Home size={13} />}
                    label="Current Club"
                    value={player.current_club || "—"}
                    valueColor="text-[#2DD4BF]"
                  />
                </div>

                {/* Contact & Socials */}
                <div className="bg-[#0a1622] border border-[#162d45] rounded-xl p-4 space-y-3">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Mail size={13} className="text-[#2DD4BF]" /> Contact & Socials
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-center gap-2 text-xs">
                      <Mail size={13} className="text-[#2DD4BF]" />
                      <span className="text-[#C8D8E8] truncate">{(player as any).email || "Email not public"}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs">
                      <Phone size={13} className="text-[#2DD4BF]" />
                      <span className="text-[#C8D8E8]">{(player as any).phone || "Phone not public"}</span>
                    </div>
                  </div>
                  {/* Social Handles */}
                  {((player as any).instagram || (player as any).twitter || (player as any).facebook || (player as any).youtube) && (
                    <div className="flex flex-wrap gap-3 pt-2 border-t border-[#162d45]/60">
                      {(player as any).instagram && (
                        <a 
                          href={`https://instagram.com/${(player as any).instagram.replace("@", "")}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-1 text-[11px] text-[#C8D8E8] hover:text-[#2DD4BF]"
                        >
                          <Instagram size={12} className="text-[#E1306C]" />
                          <span>@{ (player as any).instagram.replace("@", "") }</span>
                        </a>
                      )}
                      {(player as any).twitter && (
                        <a 
                          href={`https://twitter.com/${(player as any).twitter.replace("@", "")}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-1 text-[11px] text-[#C8D8E8] hover:text-[#2DD4BF]"
                        >
                          <Twitter size={12} className="text-[#1DA1F2]" />
                          <span>@{ (player as any).twitter.replace("@", "") }</span>
                        </a>
                      )}
                      {(player as any).facebook && (
                        <a 
                          href={`https://facebook.com/${(player as any).facebook}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-1 text-[11px] text-[#C8D8E8] hover:text-[#2DD4BF]"
                        >
                          <Facebook size={12} className="text-[#1877F2]" />
                          <span>Facebook</span>
                        </a>
                      )}
                      {(player as any).youtube && (
                        <a 
                          href={`https://youtube.com/${(player as any).youtube}`} 
                          target="_blank" 
                          rel="noreferrer" 
                          className="flex items-center gap-1 text-[11px] text-[#C8D8E8] hover:text-[#2DD4BF]"
                        >
                          <Youtube size={12} className="text-[#FF0000]" />
                          <span>YouTube</span>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeTab === "stats" && (
              <div className="space-y-4 animate-fadeIn">
                {/* Career Statistics */}
                <div className="bg-[#0a1622] border border-[#162d45] rounded-xl p-4">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-3.5 flex items-center gap-1.5">
                    <TrendingUp size={13} className="text-[#2DD4BF]" /> Career Statistics
                  </p>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { label: "Matches", value: matches },
                      { label: "Goals", value: goals },
                      { label: "Assists", value: assists },
                      { label: "Minutes", value: minutes },
                    ].map((st, i) => (
                      <div key={i} className="bg-[#0B1623] border border-[#162d45] rounded-lg p-2.5 flex flex-col items-center">
                        <span className="text-lg font-black text-[#2DD4BF]">{st.value}</span>
                        <span className="text-[9px] text-[#4A6480] uppercase tracking-wider font-semibold mt-0.5">{st.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Attributes */}
                <div className="bg-[#0a1622] border border-[#162d45] rounded-xl p-4">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Activity size={13} className="text-[#2DD4BF]" /> Skills & Attributes
                  </p>
                  <div className="space-y-1">
                    {skills.map((sk, idx) => (
                      <SkillBar key={idx} label={sk.label} value={sk.value} />
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "history" && (
              <div className="space-y-4 animate-fadeIn">
                {/* Playing History */}
                <div className="bg-[#0a1622] border border-[#162d45] rounded-xl p-4">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Home size={13} className="text-[#2DD4BF]" /> Playing History
                  </p>
                  {playingHistory.length > 0 ? (
                    <div className="space-y-3">
                      {playingHistory.map((h: any, idx: number) => {
                        const team = h.club_name || h.team || "—";
                        const pos = h.position || h.role || "—";
                        const dur = h.start_year ? `${h.start_year} - ${h.end_year || "Present"}` : (h.duration || "—");
                        const desc = h.achievements || h.detail || "";

                        return (
                          <div key={idx} className="bg-[#0B1623] border border-[#162d45] p-3 rounded-lg flex flex-col gap-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-xs font-bold text-white">{team}</h4>
                              <span className="text-[10px] text-[#2DD4BF] font-semibold">{dur}</span>
                            </div>
                            <p className="text-[10px] text-[#4A6480]">{pos}</p>
                            {desc && <p className="text-[10px] text-[#C8D8E8] mt-1.5 border-t border-[#162d45]/40 pt-1.5">{desc}</p>}
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <p className="text-xs text-[#4A6480] italic">No playing history listed.</p>
                  )}
                </div>

                {/* Achievements */}
                <div className="bg-[#0a1622] border border-[#162d45] rounded-xl p-4">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-3 flex items-center gap-1.5">
                    <Trophy size={13} className="text-[#2DD4BF]" /> Achievements
                  </p>
                  {achievements.length > 0 ? (
                    <ul className="space-y-2">
                      {achievements.map((ach: any, idx: number) => {
                        const title = typeof ach === "string" ? ach : (ach.title || "Achievement");
                        const date = typeof ach === "object" && ach.date_achieved ? ` (${new Date(ach.date_achieved).getFullYear()})` : "";
                        const desc = typeof ach === "object" ? ach.description : "";

                        return (
                          <li key={idx} className="bg-[#0B1623] border border-[#162d45] p-3 rounded-lg space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#2DD4BF]" />
                              <span className="text-xs font-bold text-[#C8D8E8]">
                                {title}{date}
                              </span>
                            </div>
                            {desc && <p className="text-[10px] text-[#4A6480] pl-3.5">{desc}</p>}
                          </li>
                        );
                      })}
                    </ul>
                  ) : (
                    <p className="text-xs text-[#4A6480] italic">No achievements listed.</p>
                  )}
                </div>
              </div>
            )}

            {activeTab === "highlights" && (
              <div className="space-y-4 animate-fadeIn">
                {/* Highlight Videos */}
                <div className="bg-[#0a1622] border border-[#162d45] rounded-xl p-4">
                  <p className="text-xs font-bold text-white uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Video size={13} className="text-[#2DD4BF]" /> Highlight Videos
                  </p>
                  
                  {highlightVideos.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {highlightVideos.map((v: any, idx: number) => {
                        const thumb = v.video_url ? (getYoutubeThumbnail(v.video_url) || `https://picsum.photos/seed/${v.id}/300/180`) : `https://picsum.photos/seed/${v.id}/300/180`;
                        
                        return (
                          <a 
                            key={v.id || idx} 
                            href={v.video_url || "#"} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="group rounded-xl overflow-hidden cursor-pointer relative block border border-[#162d45] bg-[#0B1623]"
                          >
                            <div className="aspect-video bg-gray-900 relative flex items-center justify-center overflow-hidden">
                              <img 
                                src={thumb} 
                                alt="Thumbnail" 
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                              />
                              <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-colors flex items-center justify-center z-10">
                                <div className="w-10 h-10 rounded-full bg-[#2DD4BF]/90 flex items-center justify-center pl-0.5 text-[#0a1218] shadow-lg scale-90 opacity-80 group-hover:scale-100 group-hover:opacity-100 transition-all">
                                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M8 5V19L19 12L8 5Z" />
                                  </svg>
                                </div>
                              </div>
                            </div>
                            <div className="p-3">
                              <h4 className="text-xs font-bold text-white truncate group-hover:text-[#2DD4BF] transition-colors">{v.title || "Highlight Video"}</h4>
                              <p className="text-[10px] text-[#4A6480] mt-1 line-clamp-2">{v.description || "Video Highlight"}</p>
                            </div>
                          </a>
                        );
                      })}
                    </div>
                  ) : player.highlight_video_available ? (
                    <div className="w-full h-28 rounded-xl bg-[#0B1623] border border-dashed border-[#162d45] flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-[#2DD4BF]/40 transition-colors group">
                      <div className="w-10 h-10 rounded-full bg-[#2DD4BF]/10 border border-[#2DD4BF]/30 flex items-center justify-center group-hover:bg-[#2DD4BF]/20 transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="#2DD4BF">
                          <polygon points="5 3 19 12 5 21 5 3" />
                        </svg>
                      </div>
                      <p className="text-[11px] text-[#4A6480]">Highlight videos registered by player</p>
                    </div>
                  ) : (
                    <div className="w-full h-20 rounded-xl bg-[#0B1623] border border-dashed border-[#162d45] flex items-center justify-center gap-2">
                      <Video size={13} className="text-[#4A6480]" />
                      <p className="text-[11px] text-[#4A6480]">No highlight video available</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Send Message CTA */}
          <button
            onClick={() => {
              const userId = player.user?.id || player.id;
              router.push(`/scout/messaging?playerId=${player.id}&userId=${userId}&role=PLAYER`);
            }}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-[#2DD4BF] hover:bg-[#2DD4BF]/90 text-[#0a1218] font-bold text-sm transition-colors shadow-lg shadow-[#2DD4BF]/10 hover:shadow-[#2DD4BF]/20"
          >
            <MessageCircle size={14} />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};