"use client";

import { ScoutProfile } from "@/types/scout/profileType";
import {
  MapPin, Globe, Twitter, Facebook, Youtube, Users, Eye,
  Calendar, MessageCircle, Star, Trophy, Briefcase,
  CheckCircle, Flag, UserCheck, Phone, Link2,
} from "lucide-react";


interface Props {
  profile: ScoutProfile;
  onEdit: () => void;
}

// ── tiny helpers ────────────────────────────────────────────────
const fmtDate = (iso?: string) => {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const urlHandle = (url?: string) =>
  url?.replace(/\/$/, "").split("/").pop() ?? url ?? "";

// ── atoms ───────────────────────────────────────────────────────
const Divider = () => <div className="h-px bg-[#1A2160] my-3" />;

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5B6397] mb-2.5">
    {children}
  </p>
);

const StatPill = ({ value, label }: { value: string | number; label: string }) => (
  <div className="flex flex-col items-center bg-[#111640] border border-[#1A2160] rounded-lg py-2 px-1">
    <span className="text-white font-bold text-sm leading-none">{value}</span>
    <span className="text-[#5B6397] text-[8px] mt-1 text-center leading-tight">{label}</span>
  </div>
);

const InfoRow = ({
  label,
  value,
}: {
  label: string;
  value?: string | boolean | null;
}) => {
  if (value === null || value === undefined || value === "") return null;
  const display = typeof value === "boolean" ? (value ? "Yes" : "No") : value;
  return (
    <div className="flex items-start justify-between gap-2 mb-2">
      <span className="text-[#5B6397] text-[10px] flex-shrink-0">{label}</span>
      <span className="text-[#00D9FF] text-[10px] font-medium text-right">{display}</span>
    </div>
  );
};

// ── main component ───────────────────────────────────────────────
export default function ScoutProfileView({ profile, onEdit }: Props) {
  const stats = profile.dashboard_stats;

  return (
    <div className="min-h-screen bg-[#070B24] text-white">
      <div className="flex min-h-screen">

        {/* ══════════════════════════════════════
            LEFT COLUMN — Profile overview
        ══════════════════════════════════════ */}
        <div
          className="w-[290px] min-w-[290px] bg-[#08092F] border-r border-[#1A2160] overflow-y-auto flex-shrink-0"
          style={{ scrollbarWidth: "none" }}
        >
          <div className="p-3">

            {/* Cover image */}
            <div className="relative h-[120px] rounded-xl overflow-hidden">
              {profile.cover_image ? (
                <img
                  src={profile.cover_image}
                  alt="cover"
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[#0B2040] via-[#0A1530] to-[#070B24]" />
              )}
              <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-[#08092F] to-transparent" />
            </div>

            {/* Avatar + Name */}
            <div className="bg-[#0C1033] rounded-xl px-4 pb-4 -mt-1">
              <div className="flex items-end gap-3 -mt-8 mb-3">
                <div className="w-[60px] h-[60px] rounded-full border-[3px] border-[#08092F] bg-[#111640] overflow-hidden flex-shrink-0">
                  {profile.profile_image ? (
                    <img
                      src={profile.profile_image}
                      alt="avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-[#2D3568]">
                      <Users size={22} />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0 pb-1">
                  <div className="flex items-center gap-1.5">
                    <h2 className="text-[#00D9FF] font-bold text-sm leading-tight truncate">
                      {profile.first_name} {profile.last_name}
                    </h2>
                    <CheckCircle size={12} className="text-[#00D9FF] flex-shrink-0" />
                  </div>
                  {profile.specialization?.length > 0 && (
                    <p className="text-[#5B6397] text-[9px] mt-0.5 truncate">
                      {profile.specialization.join(" · ")}
                    </p>
                  )}
                  <div className="flex flex-wrap gap-x-2 mt-0.5">
                    {profile.location && (
                      <span className="flex items-center gap-0.5 text-[#5B6397] text-[9px]">
                        <MapPin size={8} /> {profile.location}
                      </span>
                    )}
                    {profile.joined && (
                      <span className="flex items-center gap-0.5 text-[#5B6397] text-[9px]">
                        <Calendar size={8} /> {fmtDate(profile.joined)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Edit button */}
              <button
                onClick={onEdit}
                className="w-full py-2 rounded-lg text-xs font-semibold bg-gradient-to-r from-[#7B2FFF] to-[#00D9FF] text-white hover:opacity-90 transition-opacity mb-4"
              >
                ✏ Edit Profile
              </button>

              {/* Stats */}
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                <StatPill value={profile.connections ?? 0} label="Connections" />
                <StatPill value={stats?.players_viewed ?? 0} label="Viewed" />
                <StatPill value={stats?.shortlisted_players ?? 0} label="Listed" />
                <StatPill value={profile.experience_years ?? 0} label="Yrs Exp." />
              </div>

              <Divider />

              {/* About + Contact side by side */}
              <div className="flex gap-3 mb-3">
                <div className="flex-1 min-w-0">
                  <SectionLabel>About</SectionLabel>
                  <p className="text-[#8891BB] text-[10px] leading-relaxed">
                    {profile.about || profile.bio || (
                      <span className="text-[#2D3568] italic">No bio added.</span>
                    )}
                  </p>
                </div>
                <div className="w-[96px] flex-shrink-0">
                  <SectionLabel>Contact Info</SectionLabel>
                  <div className="flex flex-col gap-1.5">
                    {[
                      { icon: <Globe size={9} />, val: profile.website },
                      { icon: <Twitter size={9} />, val: profile.twitter },
                      { icon: <Facebook size={9} />, val: profile.facebook },
                      { icon: <Youtube size={9} />, val: profile.youtube },
                    ].map((s, i) => (
                      <div key={i} className="flex items-center gap-1.5">
                        <span className="text-[#00D9FF] flex-shrink-0">{s.icon}</span>
                        <span className="text-[#5B6397] text-[9px] truncate">
                          {s.val ? urlHandle(s.val) : "—"}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Social icons */}
              <div className="flex gap-1.5 mb-3">
                {[
                  { icon: <Globe size={11} />, href: profile.website },
                  { icon: <Twitter size={11} />, href: profile.twitter },
                  { icon: <Facebook size={11} />, href: profile.facebook },
                  { icon: <Youtube size={11} />, href: profile.youtube },
                ]
                  .filter((s) => s.href)
                  .map((s, i) => (
                    <a
                      key={i}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      className="w-7 h-7 rounded-lg bg-[#111640] border border-[#1A2160] flex items-center justify-center text-[#5B6397] hover:text-[#00D9FF] hover:border-[#00D9FF]/30 transition-all"
                    >
                      {s.icon}
                    </a>
                  ))}
              </div>

              <Divider />

              {/* Scouting Options / Specialization tags */}
              {profile.specialization?.length > 0 && (
                <div className="mb-3">
                  <SectionLabel>Scouting Options</SectionLabel>
                  <div className="flex flex-wrap gap-1.5">
                    {profile.specialization.map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 rounded text-[9px] bg-[#111640] border border-[#1A2160] text-[#8891BB]"
                      >
                        {tag.replace(/_/g, " ")}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              <Divider />

              {/* Notable Observations */}
              <div className="mb-3">
                <SectionLabel>Notable Observations</SectionLabel>
                <InfoRow label="Availability" value={profile.availability} />
                <InfoRow label="Contact Status" value={profile.contact_status} />
                <InfoRow label="Preferred Leagues" value={profile.preferred_leagues} />
                <InfoRow label="Visibility" value={profile.profile_visibility} />
                <InfoRow label="Contact Requests" value={profile.contact_requests} />
                <InfoRow label="Online Status" value={profile.show_online_status} />
              </div>

              <Divider />

              {/* Scouting Region */}
              <div className="mb-3">
                <SectionLabel>Scouting Region</SectionLabel>
                {profile.preferred_leagues ? (
                  <div className="flex flex-col gap-1.5">
                    {profile.preferred_leagues.split(",").map((region, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-1.5">
                          <div className="w-5 h-5 rounded bg-[#111640] border border-[#1A2160] flex items-center justify-center">
                            <Flag size={9} className="text-[#5B6397]" />
                          </div>
                          <span className="text-[#8891BB] text-[10px]">{region.trim()}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#2D3568] text-[9px] italic">No regions set.</p>
                )}
              </div>

              <Divider />

              {/* Professional History */}
              <div>
                <SectionLabel>Professional History</SectionLabel>
                {profile.achievements?.length > 0 ? (
                  <div className="flex flex-col gap-3">
                    {profile.achievements.map((ach) => (
                      <div key={ach.id} className="flex items-start gap-2">
                        <div className="w-7 h-7 rounded-lg bg-[#111640] border border-[#1A2160] flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Trophy size={11} className="text-[#00D9FF]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-1">
                            <p className="text-white text-[11px] font-semibold truncate">
                              {ach.club_name}
                            </p>
                            <span className="text-[#3A4580] text-[8px] flex-shrink-0">
                              {ach.year}
                            </span>
                          </div>
                          <p className="text-[#5B6397] text-[9px]">{ach.achievement}</p>
                          <p className="text-[#2D3568] text-[8px] mt-0.5 truncate">
                            {ach.affiliation_type}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-[#2D3568] text-[9px] italic">No history added.</p>
                )}
              </div>

            </div>
          </div>

          <div className="px-4 py-3 border-t border-[#1A2160]">
            <p className="text-[#2D3568] text-[8px] text-center">
              © 2024 NextTen. All rights reserved.
            </p>
          </div>
        </div>

        {/* ══════════════════════════════════════
            RIGHT COLUMN — Dashboard stats
        ══════════════════════════════════════ */}
        <div className="flex-1 overflow-y-auto p-5">
          <div className="max-w-[700px] mx-auto flex flex-col gap-4">

            {/* Welcome header */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-5">
              <h1 className="text-white font-bold text-lg mb-0.5">
                Welcome back, {profile.first_name}!
              </h1>
              <p className="text-[#5B6397] text-xs">
                Here's an overview of your scouting activity.
              </p>
            </div>

            {/* Dashboard Stats */}
            <div className="grid grid-cols-2 gap-3">
              {[
                {
                  label: "Players Viewed",
                  value: stats?.players_viewed ?? 0,
                  icon: <Eye size={18} />,
                  sub: "Total views",
                },
                {
                  label: "Shortlisted Players",
                  value: stats?.shortlisted_players ?? 0,
                  icon: <Star size={18} />,
                  sub: "On your shortlist",
                },
                {
                  label: "Upcoming Events",
                  value: stats?.upcoming_events ?? 0,
                  icon: <Calendar size={18} />,
                  sub: "Scheduled events",
                },
                {
                  label: "Active Conversations",
                  value: stats?.active_conversations ?? 0,
                  icon: <MessageCircle size={18} />,
                  sub: "Open chats",
                },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-4 flex items-center gap-3"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#111640] border border-[#1A2160] flex items-center justify-center text-[#00D9FF] flex-shrink-0">
                    {s.icon}
                  </div>
                  <div>
                    <p className="text-white text-xl font-bold leading-none">{s.value}</p>
                    <p className="text-[#8891BB] text-xs mt-0.5">{s.label}</p>
                    <p className="text-[#5B6397] text-[10px]">{s.sub}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Profile Snapshot */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5B6397] mb-3">
                Profile Snapshot
              </p>
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label: "Connections", value: profile.connections ?? 0, icon: <Users size={13} /> },
                  { label: "Experience", value: `${profile.experience_years ?? 0} yrs`, icon: <Briefcase size={13} /> },
                  { label: "Scout ID", value: `#${profile.scout ?? "—"}`, icon: <UserCheck size={13} /> },
                ].map((s) => (
                  <div key={s.label} className="bg-[#111640] border border-[#1A2160] rounded-lg p-3">
                    <div className="flex items-center gap-1.5 text-[#5B6397] mb-1.5">
                      {s.icon}
                      <span className="text-[9px] uppercase tracking-wider">{s.label}</span>
                    </div>
                    <p className="text-white text-base font-bold">{s.value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Achievements */}
            {profile.achievements?.length > 0 && (
              <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-4">
                <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5B6397] mb-3">
                  Recent Achievements
                </p>
                <div className="flex flex-col gap-2">
                  {profile.achievements.slice(0, 5).map((ach) => (
                    <div
                      key={ach.id}
                      className="flex items-center gap-3 bg-[#111640] border border-[#1A2160] rounded-lg px-3 py-2.5"
                    >
                      <div className="w-8 h-8 rounded-lg bg-[#0C1033] border border-[#1A2160] flex items-center justify-center flex-shrink-0">
                        <Trophy size={13} className="text-[#00D9FF]" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-semibold truncate">{ach.club_name}</p>
                        <p className="text-[#5B6397] text-[10px] truncate">{ach.achievement}</p>
                      </div>
                      <span className="text-[#3A4580] text-[10px] flex-shrink-0">{ach.year}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Privacy Settings (read-only) */}
            <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-4">
              <p className="text-[10px] font-semibold tracking-[0.15em] uppercase text-[#5B6397] mb-3">
                Privacy Settings
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Profile Visibility", value: profile.profile_visibility },
                  { label: "Contact Requests", value: profile.contact_requests ? "Enabled" : "Disabled" },
                  { label: "Online Status", value: profile.show_online_status ? "Visible" : "Hidden" },
                  { label: "Activity History", value: profile.activity_history ? "On" : "Off" },
                ].map((r) => (
                  <div key={r.label} className="flex items-center justify-between bg-[#111640] border border-[#1A2160] rounded-lg px-3 py-2">
                    <span className="text-[#5B6397] text-[10px]">{r.label}</span>
                    <span className="text-[#00D9FF] text-[10px] font-semibold capitalize">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}