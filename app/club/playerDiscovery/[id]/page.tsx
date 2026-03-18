"use client";

import DraggableCoverPhoto from "@/components/reuseable/DraggableCoverPhoto";
import { useCreateConversationMutation } from "@/redux/features/chat/chatApi";
import { useGetPlayerDetailsQuery } from "@/redux/features/club/playerDiscoveryApi";
import {
  Activity,
  Calendar,
  ChevronLeft,
  Facebook,
  Flag,
  Instagram,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Ruler,
  TrendingUp,
  Trophy,
  Twitter,
  Video,
  X,
  Youtube,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { toast } from "react-hot-toast";

interface PlayingHistory {
  team: string;
  duration: string;
  role: string;
  detail: string;
}

export default function PlayerDiscoveryDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [isMessageModalOpen, setIsMessageModalOpen] = React.useState(false);
  const [messageText, setMessageText] = React.useState("");

  const {
    data: apiData,
    isLoading,
    isError,
  } = useGetPlayerDetailsQuery(Number(id));
  const [createConversation, { isLoading: isSendingMessage }] =
    useCreateConversationMutation();

  const handleSendMessage = async () => {
    if (!messageText.trim() || !apiData) return;
    const receiverId = (apiData as any)?.user?.id || (apiData as any)?.id;
    if (!receiverId) {
      toast.error("Cannot message this player: missing user ID");
      return;
    }
    try {
      await createConversation({
        receiver_id: receiverId,
        message: messageText.trim(),
      }).unwrap();

      toast.success(`Message sent to ${firstName}`);
      setIsMessageModalOpen(false);
      setMessageText("");
      router.push(`/club/messaging?userId=${receiverId}`);
    } catch (error) {
      console.error("Message error:", error);
      toast.error("Failed to send message.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070B24] flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-[3px] border-[#1E2550] border-t-[#00E5FF] animate-spin" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="min-h-screen bg-[#070B24] flex flex-col items-center justify-center p-4">
        <div className="bg-[#12143A] p-8 rounded-xl border border-red-500/20 text-center max-w-sm">
          <h2 className="text-2xl font-bold text-red-400 mb-2">
            Player Not Found
          </h2>
          <button
            onClick={() => router.back()}
            className="w-full h-12 rounded-xl bg-[#1A2160] text-white mt-4 font-bold"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const p: any = apiData;

  // Header Meta
  const firstName = p?.user?.first_name || p?.first_name || "John";
  const lastName = p?.user?.last_name || p?.last_name || "Doe";
  const position =
    typeof p?.primary_position === "string"
      ? p.primary_position.replace(/_/g, " ")
      : p?.position || "Forward / Striker";
  const location =
    p?.location || p?.user?.address || "Manchester, United Kingdom";

  const age = p?.age || "—";
  const height = p?.height ? `${p.height} cm` : "—";
  const weight = p?.weight ? `${p.weight} kg` : "—";
  const nationality = p?.nationality || "—";

  const preferredFoot = p?.preferred_foot || "—";
  const dateOfBirth = p?.date_of_birth || "—";
  const jerseyNumber = p?.jersey_number || "—";

  const image =
    p?.profile_image ||
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop";
  const coverImage =
    p?.cover_image ||
    "https://www.ipsos.com/sites/default/files/ct/news_and_polls/2022-11/ipsos-global-advisor-fifa-world-cup-2022.jpg";

  // Left Column
  const bio = p?.bio || p?.about || "No biography provided.";
  const matches = p?.matches_played || p?.stats?.matches || 0;
  const goals = p?.goals_scored || p?.stats?.goals || 0;
  const assists = p?.assists || p?.stats?.assists || 0;
  const minutes = p?.minutes_played || "0";

  const skills = [
    { label: "Pace", value: p?.pace || 92 },
    { label: "Shooting", value: p?.shooting || 88 },
    { label: "Dribbling", value: p?.dribbling || 90 },
    { label: "Passing", value: p?.passing || 85 },
    { label: "Physical", value: p?.physical || 82 },
    { label: "Technical", value: p?.technical || 89 },
  ];

  const playingHistory = Array.isArray(p?.playing_history)
    ? p.playing_history
    : [];
  const highlightVideos = Array.isArray(p?.highlight_videos)
    ? p.highlight_videos
    : [];

  // Right Column
  const email = p?.user?.email || p?.email || "john.doe@email.com";
  const phone = p?.user?.phone || p?.phone || "+44 7700 900000";

  const achievements = Array.isArray(p?.achievements) ? p.achievements : [];

  const profileViews = p?.insights?.profile_views || 0;
  const scoutViews = p?.insights?.scout_views || 0;
  const clubInterest = p?.insights?.club_interest || 0;

  return (
    <div className="min-h-screen bg-[#070B24] text-white font-sans pb-20">
      {/* Cover Area */}
      <div className="relative h-[250px] md:h-[350px] w-full">
        <DraggableCoverPhoto src={coverImage} editable={false} height={350}>
          <div className="absolute top-6 left-6 z-10">
            <button
              onClick={() => router.back()}
              className="flex items-center gap-2 px-4 py-2 bg-[#12143A]/80 hover:bg-[#12143A] backdrop-blur-md rounded-lg text-white font-medium border border-[#1A2160] transition-colors text-sm shadow-lg overflow-hidden"
            >
              <ChevronLeft size={16} className="text-[#00E5FF]" /> Back to
              Directory
            </button>
          </div>
        </DraggableCoverPhoto>
      </div>

      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 -mt-16 md:-mt-20 relative z-20">
        {/* Profile Card Header */}
        <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] shadow-2xl p-6 md:p-8 mb-8 relative">
          <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start relative pb-6 border-b border-[#1A2160]">
            {/* Avatar */}
            <div className="relative w-[120px] h-[120px] md:w-[150px] md:h-[150px] shrink-0 -mt-16 md:-mt-24 rounded-full border-4 border-[#12143A] shadow-xl bg-[#070B24] overflow-hidden">
              <Image
                src={image}
                alt={`${firstName} ${lastName}`}
                fill
                className="object-cover"
              />
            </div>

            {/* Main Info */}
            <div className="flex-1 min-w-0 w-full mt-2 md:mt-0">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-black mb-1.5 tracking-tight">
                    <span className="text-[#00E5FF] mr-2">{firstName}</span>
                    <span className="text-[#9C27B0]">{lastName}</span>
                  </h1>
                  <p className="text-gray-400 text-sm md:text-base font-medium mb-2">
                    {position}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-gray-500">
                    <MapPin size={14} /> <span>{location}</span>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsMessageModalOpen(true)}
                    className="px-6 py-2 rounded-lg bg-[#00E5FF] text-[#070B24] text-sm font-bold hover:bg-[#00E5FF]/90 transition-colors flex items-center gap-2"
                  >
                    <MessageSquare size={16} /> Message
                  </button>
                  <button className="px-6 py-2 rounded-lg border border-[#00E5FF] text-[#00E5FF] text-sm font-bold hover:bg-[#00E5FF]/10 transition-colors bg-[#00E5FF]/5 w-max">
                    Available
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-6">
            {/* 4 Dark Boxes Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              {[
                { icon: Calendar, label: "Age", value: age },
                { icon: Ruler, label: "Height", value: height },
                { icon: Activity, label: "Weight", value: weight },
                { icon: Flag, label: "Nationality", value: nationality },
              ].map((item, i) => (
                <div
                  key={i}
                  className="bg-[#0B0D2A] border border-[#1A2160] rounded-xl p-4 flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-1.5 text-gray-500 text-xs">
                    <item.icon size={14} /> <span>{item.label}</span>
                  </div>
                  <div className="text-gray-200 font-medium text-sm md:text-[15px]">
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Footer Info */}
            <div className="flex flex-wrap gap-8 md:gap-16 text-sm">
              <div>
                <p className="text-gray-500 mb-1 text-xs">Preferred Foot</p>
                <p className="text-gray-300">{preferredFoot}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 text-xs">Date of Birth</p>
                <p className="text-gray-300">{dateOfBirth}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1 text-xs">Jersey Number</p>
                <p className="text-gray-300">{jerseyNumber}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          {/* LEFT COLUMN */}
          <div className="lg:col-span-8 space-y-6 md:space-y-8">
            {/* About Section */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6 lg:p-8">
              <h3 className="text-white font-bold mb-4">About</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{bio}</p>
            </div>

            {/* Career Statistics */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6 lg:p-8">
              <h3 className="text-white font-bold mb-6">
                Career Statistics (2024/25 Season)
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: "Matches", val: matches },
                  { label: "Goals", val: goals },
                  { label: "Assists", val: assists },
                  { label: "Minutes", val: minutes },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#0B0D2A] border border-[#1A2160] rounded-xl py-6 flex flex-col items-center justify-center"
                  >
                    <span className="text-3xl font-black text-[#00E5FF] mb-2">
                      {stat.val}
                    </span>
                    <span className="text-xs text-gray-500">{stat.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Attributes */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6 lg:p-8">
              <h3 className="text-white font-bold mb-6">Skills & Attributes</h3>
              <div className="space-y-5">
                {skills.map((skill, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <span className="w-24 text-sm text-gray-300 shrink-0">
                      {skill.label}
                    </span>
                    <div className="flex-1 h-2 bg-[#0A0C20] rounded-full overflow-hidden border border-[#1A2160]">
                      <div
                        className="h-full bg-[#00E5FF] rounded-full"
                        style={{ width: `${skill.value}%` }}
                      />
                    </div>
                    <span className="text-[#00E5FF] text-sm font-bold w-6 text-right">
                      {skill.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Playing History */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6 lg:p-8">
              <h3 className="text-white font-bold mb-6">Playing History</h3>
              <div className="space-y-4">
                {playingHistory.map((history: PlayingHistory, i: number) => (
                  <div
                    key={i}
                    className="bg-[#0B0D2A] border border-[#1A2160] rounded-xl p-5 flex flex-col md:flex-row md:items-start justify-between gap-4"
                  >
                    <div>
                      <h4 className="text-white font-bold text-[15px] mb-1">
                        {history?.team}
                      </h4>
                      <p className="text-gray-400 text-sm mb-1">
                        {history?.role}
                      </p>
                      <p className="text-gray-500 text-xs">{history?.detail}</p>
                    </div>
                    <span className="text-[#00E5FF] text-sm font-medium whitespace-nowrap">
                      {history?.duration}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlight Videos */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6 lg:p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold flex items-center gap-2">
                  Highlight Videos
                </h3>
                <Video size={20} className="text-[#00E5FF]" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                {highlightVideos.map((vid: any, i: number) => (
                  <a
                    key={i}
                    href={vid.video_url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group cursor-pointer block"
                  >
                    <div className="w-full aspect-video rounded-xl overflow-hidden border border-[#1A2160] relative mb-3">
                      <Image
                        src={
                          vid.video_url
                            ? `https://img.youtube.com/vi/${vid.video_url.split("v=")[1]?.split("&")[0] || vid.video_url.split("/").pop()}/mqdefault.jpg`
                            : vid.thumb ||
                              `https://picsum.photos/seed/${i}/400/225`
                        }
                        alt={vid.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-[#00E5FF]/90 flex items-center justify-center pl-1 text-[#070B24] shadow-lg scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all">
                          <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M8 5V19L19 12L8 5Z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-300 text-sm font-medium mb-1 line-clamp-1">
                      {vid.title}
                    </p>
                    <p className="text-gray-500 text-xs font-normal opacity-80">
                      {vid.description || "Video Highlight"}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="lg:col-span-4 space-y-6 md:space-y-8">
            {/* Contact Info */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6">
              <h3 className="text-white font-bold mb-5">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Mail size={16} className="text-[#00E5FF]" />
                  <span>{email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-300">
                  <Phone size={16} className="text-[#00E5FF]" />
                  <span>{phone}</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6">
              <h3 className="text-white font-bold mb-5">Social Media</h3>
              <div className="space-y-4">
                {p.instagram && (
                  <a
                    href={
                      p.instagram.startsWith("http")
                        ? p.instagram
                        : `https://instagram.com/${p.instagram.replace("@", "")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    <Instagram size={16} className="text-[#E1306C]" />{" "}
                    <span>@{p.instagram.replace("@", "")}</span>
                  </a>
                )}
                {p.twitter && (
                  <a
                    href={
                      p.twitter.startsWith("http")
                        ? p.twitter
                        : `https://twitter.com/${p.twitter.replace("@", "")}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    <Twitter size={16} className="text-[#1DA1F2]" />{" "}
                    <span>@{p.twitter.replace("@", "")}</span>
                  </a>
                )}
                {p.facebook && (
                  <a
                    href={
                      p.facebook.startsWith("http")
                        ? p.facebook
                        : `https://facebook.com/${p.facebook}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    <Facebook size={16} className="text-[#1877F2]" />{" "}
                    <span>
                      {firstName} {lastName}
                    </span>
                  </a>
                )}
                {p.youtube && (
                  <a
                    href={
                      p.youtube.startsWith("http")
                        ? p.youtube
                        : `https://youtube.com/${p.youtube}`
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-sm text-gray-400 hover:text-white cursor-pointer transition-colors"
                  >
                    <Youtube size={16} className="text-[#FF0000]" />{" "}
                    <span>{firstName} Football</span>
                  </a>
                )}
                {!p.instagram && !p.twitter && !p.facebook && !p.youtube && (
                  <p className="text-gray-500 text-xs">
                    No social media links provided.
                  </p>
                )}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6">
              <div className="flex items-center gap-2 mb-5">
                <Trophy size={18} className="text-[#00E5FF]" />
                <h3 className="text-white font-bold">Achievements</h3>
              </div>
              <ul className="space-y-3">
                {achievements.map((ach: string, i: number) => (
                  <li
                    key={i}
                    className="flex items-start gap-2 text-sm text-gray-300"
                  >
                    <span className="text-[#00E5FF] mt-1 shrink-0">•</span>
                    <span>{ach}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile Insights */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6">
              <div className="flex items-center gap-2 mb-6">
                <TrendingUp size={18} className="text-[#00E5FF]" />
                <h3 className="text-white font-bold">Profile Insights</h3>
              </div>

              <div className="space-y-5">
                <div className="border-b border-[#1A2160] pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 text-sm">Profile Views</span>
                    <span className="text-white font-bold text-sm">
                      {profileViews}
                    </span>
                  </div>
                  <p className="text-[#04B5A3] text-xs">+24 this week</p>
                </div>
                <div className="border-b border-[#1A2160] pb-4">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 text-sm">Scout Views</span>
                    <span className="text-white font-bold text-sm">
                      {scoutViews}
                    </span>
                  </div>
                  <p className="text-[#04B5A3] text-xs">+12 this week</p>
                </div>
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-gray-400 text-sm">Club Interest</span>
                    <span className="text-white font-bold text-sm">
                      {clubInterest} clubs
                    </span>
                  </div>
                  <p className="text-[#04B5A3] text-xs">+3 new this month</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div className="bg-[#12143A] rounded-2xl border border-[#1A2160] p-6">
              <h3 className="text-white font-bold mb-6">Preferences</h3>
              <div className="space-y-5">
                <div>
                  <p className="text-gray-500 text-xs mb-1">
                    Preferred Regions / Countries
                  </p>
                  <p className="text-gray-300 text-sm">
                    Premier League, La Liga, Bundesliga
                  </p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Contract Status</p>
                  <p className="text-gray-300 text-sm">Open to Offers</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs mb-1">Availability</p>
                  <p className="text-gray-300 text-sm">
                    Available from Summer 2025
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Messaging Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative w-full max-w-lg bg-[#12143A] border border-[#1A2160] rounded-[32px] overflow-hidden shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-[#1A2160]">
              <h3 className="text-xl font-bold text-white">
                Message {firstName} {lastName}
              </h3>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="text-gray-400 hover:text-white"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-6">
              <textarea
                className="w-full h-40 p-4 rounded-2xl bg-[#0B0D2A] border border-[#1A2160] text-white focus:outline-none focus:border-[#00E5FF]/50 transition-all resize-none"
                placeholder={`Hi ${firstName}, I'm interested in your profile...`}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || isSendingMessage}
                className="w-full h-14 mt-6 rounded-xl bg-[#00E5FF] text-[#070B24] font-bold hover:bg-[#00E5FF]/90 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
              >
                {isSendingMessage ? (
                  <div className="w-5 h-5 border-2 border-[#070B24]/30 border-t-[#070B24] rounded-full animate-spin" />
                ) : (
                  <Mail size={18} />
                )}
                {isSendingMessage ? "Sending..." : "Send Message"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
