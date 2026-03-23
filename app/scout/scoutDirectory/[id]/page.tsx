"use client";

import { use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  CalendarDays,
  Users,
  Eye,
  Star,
  MessageSquare,
  Trophy,
  Globe,
  Phone,
  Mail,
  ChevronRight,
  TrendingUp,
  Award,
  Target,
  Briefcase,
  Languages,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Building2,
  ChevronLeft,
  Loader2,
  X,
  Info
} from "lucide-react";
import { toast } from "react-hot-toast";
import { useGetScoutProfileByIdQuery } from "@/redux/features/scout/scoutDirectoryApi";
import { useCreateConversationMutation } from "@/redux/features/chat/chatApi";

/* ─── Shared Components ────────────────────────────────────────── */
const SidebarSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-5 mb-5">
    <h3 className="text-sm font-bold bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent mb-5 uppercase tracking-wide">
      {title}
    </h3>
    {children}
  </div>
);

const SectionTitle = ({ title }: { title: string }) => (
  <h2 className="text-xl font-bold bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent mb-5">
    {title}
  </h2>
);

/* ─── Main Component ─────────────────────────────────────────── */
export default function ScoutProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  
  const { data: scout, isLoading, isError } = useGetScoutProfileByIdQuery(Number(id));
  const [createConversation, { isLoading: isSendingMessage }] = useCreateConversationMutation();

  // Messaging Modal State
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageText, setMessageText] = useState("");

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#0B0D2C] flex items-center justify-center text-[#00E5FF]">
        <Loader2 size={48} className="animate-spin" />
        <span className="ml-4 text-xl font-semibold">Loading Profile...</span>
      </div>
    );
  }

  if (isError || !scout) {
    return (
      <div className="min-h-screen bg-[#0B0D2C] flex flex-col items-center justify-center text-white p-6">
        <h1 className="text-2xl font-bold mb-4">Profile Not Found</h1>
        <p className="text-white/60 mb-8">The scout profile you are looking for does not exist or could not be loaded.</p>
        <Link
          href="/scout/scoutDirectory"
          className="bg-[#00D4AA] text-black px-6 py-3 rounded-xl font-bold hover:bg-[#00D4AA]/90 transition-all"
        >
          Back to Directory
        </Link>
      </div>
    );
  }

  const handleSendMessage = async () => {
    if (!messageText.trim()) return;

    // Use scout.id as receiver ID or scout.user.id if available
    const receiverId = scout.id; 
    if (!receiverId) {
      toast.error("Cannot message this scout: missing ID");
      return;
    }

    try {
      await createConversation({
        receiver_id: receiverId,
        message: messageText.trim(),
      }).unwrap();

      toast.success(`Message sent to ${scout.scout_name}`);
      setIsMessageModalOpen(false);
      setMessageText("");

      router.push(`/scout/messaging?userId=${receiverId}`);
    } catch (error) {
      console.error("Message error:", error);
      toast.error("Failed to send message. Please try again.");
    }
  };

  // Fallback Helper for formatting joined date
  const formattedJoinedDate = scout.joined 
    ? new Date(scout.joined).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
    : "Not available";

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white font-sans pb-12">
      {/* ── Banner & Hero ── */}
      <div className="relative h-[280px] w-full">
        {/* Stadium Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: `url(${(() => {
              const url = scout.cover_image;
              if (!url || url === "null" || url === "") return "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=2693&auto=format&fit=crop";
              if (url.startsWith("http") || url.startsWith("/")) return url;
              return `/${url}`;
            })()})` 
          }}
        >
          <div className="absolute inset-0 bg-[#0B0D2C]/60" />
        </div>

        {/* Back Button */}
        <div className="relative z-10 p-6">
          <Link
            href="/scout/scoutDirectory"
            className="flex items-center gap-2 bg-[#0B0D2C]/80 border border-white/10 px-4 py-2 rounded-xl text-sm font-medium hover:bg-[#0B0D2C] transition-colors w-fit"
          >
            <ChevronLeft size={16} /> Back to Directory
          </Link>
        </div>

        {/* Floating Profile Card */}
        <div className="absolute bottom-[-140px] left-1/2 -translate-x-1/2 w-[90%] md:w-[800px] z-20">
          <div className="bg-[#12143C] border border-white/[0.08] rounded-3xl p-7 md:p-10 flex flex-col md:flex-row items-center gap-8 shadow-2xl">
            {/* Avatar */}
            <div className="w-40 h-40 rounded-full border-4 border-white/10 overflow-hidden flex-shrink-0 relative">
              <Image
                src={(() => {
                  const url = scout.profile_image;
                  if (!url || url === "null" || url === "") return "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop";
                  if (url.startsWith("http") || url.startsWith("/")) return url;
                  return `/${url}`;
                })()}
                alt={scout.scout_name || "Scout"}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1 text-center md:text-left min-w-0">
              <h1 className="text-2xl md:text-3xl font-bold mb-1 truncate">
                {scout.scout_name ? (
                  <>
                    <span className="text-[#00E5FF]">{scout.scout_name.split(" ")[0]} </span>
                    <span className="text-[#9C27B0]">{scout.scout_name.split(" ").slice(1).join(" ")}</span>
                  </>
                ) : (
                  <span className="text-[#00E5FF]">Unnamed Scout</span>
                )}
              </h1>
              <p className="text-sm text-white/50 mb-6 truncate">{scout.bio || "No bio provided"}</p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-y-4 gap-x-8 mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <MapPin size={16} className="text-[#00E5FF]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase">Location</p>
                    <p className="text-xs font-semibold">{scout.location || "N/A"}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <CalendarDays size={16} className="text-[#00E5FF]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase">Joined</p>
                    <p className="text-xs font-semibold">{formattedJoinedDate}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <Users size={16} className="text-[#00E5FF]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase">Connections</p>
                    <p className="text-xs font-semibold">{scout.connections || 0}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center">
                    <Trophy size={16} className="text-[#00E5FF]" />
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-white/40 uppercase">Experience</p>
                    <p className="text-xs font-semibold">{scout.experience_years || 0} years</p>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3">
                <button 
                  onClick={() => setIsMessageModalOpen(true)}
                  className="flex-1 py-3 px-6 bg-[#00D4AA] hover:bg-[#00D4AA]/90 text-black font-bold rounded-xl text-sm transition-all"
                >
                  Send Message
                </button>
                {/* <button className="flex-1 py-3 px-6 border border-[#233566] hover:bg-white/5 text-white/80 font-semibold rounded-xl text-sm transition-all">
                  Add to Network
                </button> */}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Spacer for Hero ── */}
      <div className="h-[200px]" />

      {/* ── Stats Card Bar ── */}
      <section className="px-6  mb-8 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Players Viewed", val: scout.dashboard_stats?.players_viewed || 0, sub: "Total count", icon: Eye },
          { label: "Shortlisted Players", val: scout.dashboard_stats?.shortlisted_players || 0, sub: "Ready for review", icon: Star },
          { label: "Upcoming Events", val: scout.dashboard_stats?.upcoming_events || 0, sub: "In calendar", icon: CalendarDays },
          { label: "Active Conversations", val: scout.dashboard_stats?.active_conversations || 0, sub: "Messaging", icon: MessageSquare },
        ].map((s) => (
          <div key={s.label} className="bg-[#12143A] border border-white/[0.08] rounded-xl p-5">
            <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center mb-4 text-[#00E5FF]">
              <s.icon size={18} />
            </div>
            <p className="text-xs text-white/50 mb-1">{s.label}</p>
            <p className="text-2xl font-bold mb-1">{s.val}</p>
            <p className="text-[10px] text-[#00D4AA]">{s.sub}</p>
          </div>
        ))}
      </section>

      {/* ── Layout Grid ── */}
      <div className="px-6  mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column (Main Content) */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* About */}
          <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
            <SectionTitle title="About" />
            <p className="text-sm text-white/70 leading-relaxed mb-6 whitespace-pre-line">
              {scout.about || "No detailed about information provided."}
            </p>
            {scout.specialization && scout.specialization.length > 0 && (
              <div>
                <p className="text-xs text-white/30 uppercase mb-3">Specializations</p>
                <div className="flex flex-wrap gap-2">
                  {scout.specialization.map((spec) => (
                    <span key={spec} className="px-3 py-1.5 bg-[#00E5FF]/5 border border-[#00E5FF]/20 text-[#00E5FF] text-[11px] font-medium rounded-full">
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Scouting Statistics */}
          {scout.scouting_statistics && (
            <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
              <SectionTitle title="Scouting Statistics" />
              <div className="grid grid-cols-3 gap-4 mb-4">
                {[
                  { label: "Players Scouted", val: scout.scouting_statistics.players_scouted || 0, icon: Eye },
                  { label: "Recommended", val: scout.scouting_statistics.players_recommended || 0, icon: Star },
                  { label: "Pro Placements", val: scout.scouting_statistics.professional_placements || 0, icon: Trophy },
                ].map((st) => (
                  <div key={st.label} className="bg-[#0B0D2C] border border-white/[0.05] rounded-xl p-4">
                    <div className="text-[#00E5FF] mb-2"><st.icon size={16} /></div>
                    <p className="text-[10px] text-white/40 mb-1">{st.label}</p>
                    <p className="text-lg font-bold">{st.val}</p>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "Success Rate", val: `${(Number(scout.scouting_statistics.success_rate) * 100).toFixed(0)}%`, icon: Target },
                  { label: "Clubs worked with", val: scout.scouting_statistics.clubs_worked_with || 0, icon: Building2 },
                ].map((st) => (
                  <div key={st.label} className="bg-[#0B0D2C] border border-white/[0.05] rounded-xl p-4">
                    <div className="text-[#00E5FF] mb-2"><st.icon size={16} /></div>
                    <p className="text-[10px] text-white/40 mb-1">{st.label}</p>
                    <p className="text-lg font-bold">{st.val}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Notable Discoveries */}
          {scout.notable_discoveries && scout.notable_discoveries.length > 0 && (
            <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
              <SectionTitle title="Notable Discoveries" />
              <div className="space-y-4">
                {scout.notable_discoveries.map((p, idx) => (
                  <div key={idx} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold">{p.player_name}</p>
                        <div className="w-2.5 h-2.5 rounded-full bg-[#00E5FF]/40 border border-[#00E5FF] shadow-[0_0_5px_rgba(0,229,255,0.5)]" />
                      </div>
                      <p className="text-xs text-white/30">{p.position}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-[#00E5FF]">{p.current_team}</p>
                      <p className="text-[10px] text-white/30">Discovered in {p.discovered_year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Scouting Regions */}
          {scout.scouting_regions && scout.scouting_regions.length > 0 && (
            <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
              <SectionTitle title="Scouting Regions" />
              <div className="grid grid-cols-2 gap-4">
                {scout.scouting_regions.map((r, idx) => (
                  <div key={idx} className="bg-[#0B0D2C] border border-white/[0.05] rounded-xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">🏳️</span>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold truncate">{r.country}</p>
                        <p className="text-[10px] text-white/30 lowercase">{r.coverage_type} coverage</p>
                      </div>
                    </div>
                    <p className="text-xs font-bold text-[#00E5FF] flex-shrink-0">{r.active_since} years</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Professional History */}
          {scout.professional_history && scout.professional_history.length > 0 && (
            <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
              <SectionTitle title="Professional History" />
              <div className="space-y-6">
                {scout.professional_history.map((j, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#00E5FF]/10 flex items-center justify-center flex-shrink-0 text-[#00E5FF]">
                      <Building2 size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-bold truncate">{j.organization}</p>
                        {j.is_current && (
                          <span className="px-2 py-0.5 bg-[#00D4AA] text-black text-[10px] font-bold rounded-lg uppercase flex-shrink-0 ml-2">Current</span>
                        )}
                      </div>
                      <p className="text-xs text-white/50">{j.role}</p>
                      <p className="text-[10px] text-[#00E5FF] mt-1">{j.duration}</p>
                      {j.description && <p className="text-[11px] text-white/40 mt-2 italic">{j.description}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column (Sidebar) */}
        <div>
          {/* Contact Info */}
          <SidebarSection title="Contact Information">
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", val: scout.email || "Not public" },
                { icon: Phone, label: "Phone", val: scout.phone || "Not public" },
                { icon: Globe, label: "Website", val: scout.website, color: "text-[#00E5FF]" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-4">
                  <div className="w-8 h-8 rounded-lg bg-[#00E5FF]/10 flex items-center justify-center text-[#00E5FF]">
                    <c.icon size={16} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[9px] text-white/30 uppercase">{c.label}</p>
                    <p className={`text-[11px] font-medium truncate ${c.color || "text-white"}`}>
                       {c.val && c.val.startsWith('http') ? (
                          <a href={c.val} target="_blank" rel="noopener noreferrer" className="hover:underline">{c.val.replace(/^https?:\/\//, '')}</a>
                       ) : c.val || "N/A"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </SidebarSection>

          {/* Social Media */}
          {(scout.twitter || scout.facebook || scout.youtube) && (
            <SidebarSection title="Social Media">
              <div className="space-y-3">
                {[
                  { platform: "Twitter", val: scout.twitter, icon: Twitter },
                  { platform: "Facebook", val: scout.facebook, icon: MessageSquare },
                  { platform: "YouTube", val: scout.youtube, icon: Youtube },
                ].filter(s => s.val).map((s) => (
                  <a 
                    key={s.platform} 
                    href={s.val || '#'} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-[#0B0D2C] border border-white/5 p-3 rounded-lg hover:bg-white/5 transition-colors"
                  >
                    <s.icon size={14} className="text-[#00E5FF]" />
                    <p className="text-[11px] text-white/70 truncate">{s.val?.split('/').pop() || s.platform}</p>
                  </a>
                ))}
              </div>
            </SidebarSection>
          )}

          {/* Languages */}
          {scout.languages && scout.languages.length > 0 && (
            <SidebarSection title="Languages">
              <div className="flex flex-wrap gap-2">
                {scout.languages.map((l) => (
                  <span key={l} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/70">
                    {l}
                  </span>
                ))}
              </div>
            </SidebarSection>
          )}

          {/* Club Affiliations */}
          {scout.club_affiliations && scout.club_affiliations.length > 0 && (
            <SidebarSection title="Club Affiliations">
              <div className="space-y-2">
                {scout.club_affiliations.map((c, idx) => (
                  <div key={idx} className="p-3 bg-white/5 border border-white/10 rounded-lg text-xs font-medium text-white/60">
                    <p className="font-bold text-white/80">{c.club_name}</p>
                    <p className="text-[10px]">{c.affiliation_type} • {c.year}</p>
                  </div>
                ))}
              </div>
            </SidebarSection>
          )}

          {/* Achievements */}
          {scout.achievements && scout.achievements.length > 0 && (
            <SidebarSection title="Achievements">
              <div className="space-y-4">
                {scout.achievements.map((a, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="mt-1 text-[#00E5FF]"><Award size={14} /></div>
                    <div>
                      <p className="text-xs text-white/70 leading-relaxed font-normal">{a.achievement}</p>
                      <p className="text-[10px] text-white/30">{a.club_name} • {a.year}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SidebarSection>
          )}

        </div>
      </div>

      <footer className="text-center py-10 text-white/20 text-[10px]">
        © 2025 NextGen Pros. All rights reserved.
      </footer>

      {/* Messaging Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="relative w-full max-w-lg bg-[#12143A] border border-[#1E2550] rounded-[32px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-[#1E2550]">
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full border-2 border-[#04B5A3]/30 overflow-hidden">
                  <Image
                    src={(() => {
                      const url = scout.profile_image;
                      if (!url || url === "null" || url === "") return "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop";
                      if (url.startsWith("http") || url.startsWith("/")) return url;
                      return `/${url}`;
                    })()}
                    alt={scout.scout_name || "Scout"}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">
                    Message {scout.scout_name}
                  </h3>
                  <p className="text-xs text-gray-400">
                    Scout Profile
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="p-2 rounded-full hover:bg-white/5 text-gray-400 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">
                  Your Message
                </label>
                <textarea
                  autoFocus
                  className="w-full h-40 p-4 rounded-2xl bg-[#0B0E1E] border border-[#1E2550] text-white focus:outline-none focus:border-[#04B5A3]/50 transition-all resize-none placeholder:text-gray-600"
                  placeholder={`Hi ${scout.scout_name?.split(" ")[0]}, let's connect...`}
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                />
              </div>

              <div className="flex items-center gap-2 text-amber-500/80 bg-amber-500/5 rounded-xl p-3 border border-amber-500/10">
                <Info size={16} className="shrink-0" />
                <p className="text-[10px] leading-tight">
                  Your message will be sent directly to the scout's inbox.
                  They will be notified immediately.
                </p>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 pt-2 flex gap-3">
              <button
                onClick={() => setIsMessageModalOpen(false)}
                className="flex-1 h-14 rounded-xl border border-[#1E2550] text-gray-400 font-bold hover:bg-white/5 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={handleSendMessage}
                disabled={!messageText.trim() || isSendingMessage}
                className="flex-[2] h-14 rounded-xl bg-gradient-to-r from-[#04B5A3] to-[#039d8f] text-white font-bold hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-[0_8px_20px_-5px_rgba(4,181,163,0.3)] flex items-center justify-center gap-2"
              >
                {isSendingMessage ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
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
