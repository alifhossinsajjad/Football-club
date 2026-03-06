"use client";

import {
  RecentMessage,
  UpcomingEvent,
  useGetCareerStatsQuery,
  useGetDashboardStatsQuery,
} from "@/redux/features/player/playerDashboard/playerDashboardApi";

// ─── Fallback data (shown when API returns empty arrays) ──────────────────────

const FALLBACK_EVENTS: UpcomingEvent[] = [
  {
    id: 1,
    title: "Elite Youth Trial",
    location: "Madrid, Spain",
    date: "15/06/2025",
    time: "10:00 AM",
  },
  {
    id: 2,
    title: "Football Academy Showcase",
    location: "Barcelona, Spain",
    date: "20/06/2025",
    time: "2:00 PM",
  },
];

const FALLBACK_MESSAGES: RecentMessage[] = [
  {
    id: 1,
    sender_name: "FC Barcelona Youth",
    preview: "We are interested in your profile...",
    time_ago: "2h ago",
    is_unread: true,
  },
  {
    id: 2,
    sender_name: "Mike Scout",
    preview: "Great highlight reel! Would love to...",
    time_ago: "9h ago",
    is_unread: true,
  },
  {
    id: 3,
    sender_name: "Real Madrid Academy",
    preview: "Thank you for your interest...",
    time_ago: "1d ago",
    is_unread: false,
  },
];

// ─── Avatar Fallback (initials) ────────────────────────────────────────────────

const Avatar = ({
  name,
  logo,
  size = 36,
}: {
  name: string;
  logo?: string;
  size?: number;
}) => {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  if (logo) {
    return (
      <img
        src={logo}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover flex-shrink-0"
        style={{ width: size, height: size }}
      />
    );
  }

  // Generate a consistent hue from the name
  const hue = name.split("").reduce((acc, c) => acc + c.charCodeAt(0), 0) % 360;

  return (
    <div
      className="rounded-full flex items-center justify-center flex-shrink-0 text-white font-bold"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.35,
        background: `hsl(${hue}, 60%, 30%)`,
        border: "1px solid rgba(255,255,255,0.1)",
      }}
    >
      {initials}
    </div>
  );
};

// ─── Icons ────────────────────────────────────────────────────────────────────

const EyeIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const MessageIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const CloseIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const LocationIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const ClockIcon = () => (
  <svg
    width="11"
    height="11"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// ─── Skeleton Loader ───────────────────────────────────────────────────────────

const Skeleton = ({ className }: { className: string }) => (
  <div className={`animate-pulse rounded bg-[#1a2e45] ${className}`} />
);

// ─── Stat Card ────────────────────────────────────────────────────────────────

const StatCard = ({
  icon,
  label,
  value,
  sub,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | string;
  sub?: string;
}) => (
  <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl p-4 flex flex-col gap-2 hover:border-[#1d4068] transition-colors">
    <div className="text-[#2DD4BF]">{icon}</div>
    <p className="text-[11px] text-[#4A6480] font-medium">{label}</p>
    <p className="text-[28px] font-bold text-white leading-none tracking-tight">
      {value}
    </p>
    {sub && <p className="text-[11px] text-[#4A6480]">{sub}</p>}
  </div>
);

// ─── Career Stat Pill ─────────────────────────────────────────────────────────

const CareerPill = ({ label, value }: { label: string; value: number }) => (
  <div className="flex flex-col items-center bg-[#0D1B2A] border border-[#162d45] rounded-lg px-4 py-3 min-w-[70px]">
    <span className="text-xl font-bold text-white">{value}</span>
    <span className="text-[10px] text-[#4A6480] mt-0.5 uppercase tracking-wide">
      {label}
    </span>
  </div>
);

// ─── Main Dashboard ────────────────────────────────────────────────────────────

const PlayerDashboard = () => {
  const { data: stats, isLoading: statsLoading } = useGetDashboardStatsQuery();
  const { data: career, isLoading: careerLoading } = useGetCareerStatsQuery();

  // Use API data, fall back to sample data if arrays are empty
  const upcomingEvents =
    stats?.upcoming_events && stats.upcoming_events.length > 0
      ? stats.upcoming_events
      : FALLBACK_EVENTS;

  const recentMessages =
    stats?.recent_messages && stats.recent_messages.length > 0
      ? stats.recent_messages
      : FALLBACK_MESSAGES;

  const completeness = stats?.profile_completeness ?? 80;

  // Profile checklist — derived from completeness score
  const checks = [
    { label: "Basic Info", done: completeness >= 30 },
    { label: "Profile Photo", done: completeness >= 60 },
    { label: "Highlight Video", done: completeness >= 90 },
  ];

  return (
    <div className="space-y-5 text-white">
      {/* ── Welcome ────────────────────────────────────────────────────────── */}
      <div>
        <h1 className="text-xl font-bold">
          <span className="text-[#2DD4BF]">Welcome Back, </span>
          <span className="text-white">John!</span>
        </h1>
      </div>

      {/* ── Profile Completeness ────────────────────────────────────────────── */}
      <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl p-5">
        {statsLoading ? (
          <div className="space-y-3">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-2 w-full" />
            <div className="flex gap-6">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
              <Skeleton className="h-3 w-28" />
            </div>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm font-semibold text-white">
                Profile Completeness
              </p>
              <p className="text-sm font-bold text-[#2DD4BF]">
                {completeness}%
              </p>
            </div>

            {/* Progress bar */}
            <div className="w-full h-1.5 bg-[#162d45] rounded-full mb-3 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#2DD4BF] to-[#0ea5e9] transition-all duration-700"
                style={{ width: `${completeness}%` }}
              />
            </div>

            <p className="text-[11px] text-[#4A6480] mb-3">
              Complete your profile to increase visibility to clubs and scouts
            </p>

            {/* Checklist */}
            <div className="flex flex-wrap gap-x-6 gap-y-1.5">
              {checks.map((c) => (
                <div key={c.label} className="flex items-center gap-1.5">
                  <span
                    className={`w-3.5 h-3.5 rounded-full flex items-center justify-center flex-shrink-0 ${
                      c.done
                        ? "bg-[#2DD4BF]/20 text-[#2DD4BF]"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {c.done ? <CheckIcon /> : <CloseIcon />}
                  </span>
                  <span
                    className={`text-[11px] ${c.done ? "text-[#4A6480]" : "text-[#4A6480]"}`}
                  >
                    {c.label}
                  </span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ── Stat Cards ─────────────────────────────────────────────────────── */}
      {statsLoading ? (
        <div className="grid grid-cols-3 gap-3">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-[#0D1B2A] border border-[#162d45] rounded-xl p-4 space-y-2"
            >
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-8 w-12" />
              <Skeleton className="h-3 w-24" />
            </div>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-3">
          <StatCard
            icon={<EyeIcon />}
            label="Profile Views"
            value={stats?.profile_views ?? 342}
            sub="+24 this week"
          />
          <StatCard
            icon={<MessageIcon />}
            label="Messages"
            value={stats?.messages_count ?? 12}
            sub="3 unread"
          />
          <StatCard
            icon={<CalendarIcon />}
            label="Events Registered"
            value={stats?.events_registered ?? 5}
            sub="2 upcoming"
          />
        </div>
      )}

      {/* ── Career Statistics ───────────────────────────────────────────────── */}
      {!careerLoading && career && (
        <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl p-4">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-semibold text-white">
              Career Statistics
            </p>
            <span className="text-[11px] text-[#4A6480] bg-[#162d45] px-2 py-0.5 rounded-full">
              {career.season}
            </span>
          </div>
          <div className="flex gap-2 flex-wrap">
            <CareerPill label="Matches" value={career.matches} />
            <CareerPill label="Goals" value={career.goals} />
            <CareerPill label="Assists" value={career.assists} />
            <CareerPill label="Minutes" value={career.minutes} />
          </div>
        </div>
      )}

      {/* ── Upcoming Events ─────────────────────────────────────────────────── */}
      <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#162d45]">
          <p className="text-sm font-semibold text-white">Upcoming Events</p>
        </div>

        <div className="divide-y divide-[#162d45]">
          {statsLoading ? (
            [1, 2].map((i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <div className="space-y-1.5 text-right">
                  <Skeleton className="h-3 w-20 ml-auto" />
                  <Skeleton className="h-3 w-16 ml-auto" />
                </div>
              </div>
            ))
          ) : upcomingEvents.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-[#4A6480]">No upcoming events</p>
            </div>
          ) : (
            upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-3 px-5 py-4 hover:bg-[#0a1622] transition-colors"
              >
                <Avatar name={event.title} logo={event.club_logo} size={36} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {event.title}
                  </p>
                  <p className="text-[11px] text-[#4A6480] flex items-center gap-1 mt-0.5">
                    <LocationIcon />
                    {event.location}
                  </p>
                </div>
                <div className="text-right flex-shrink-0">
                  <p className="text-[11px] font-semibold text-[#2DD4BF]">
                    {event.date}
                  </p>
                  <p className="text-[11px] text-[#4A6480] flex items-center gap-1 mt-0.5 justify-end">
                    <ClockIcon />
                    {event.time}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-5 py-3 border-t border-[#162d45]">
          <button className="w-full text-center text-[12px] font-semibold text-[#4A6480] hover:text-[#2DD4BF] transition-colors py-1">
            View All Events
          </button>
        </div>
      </div>

      {/* ── Recent Messages ──────────────────────────────────────────────────── */}
      <div className="bg-[#0D1B2A] border border-[#162d45] rounded-xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#162d45]">
          <p className="text-sm font-semibold text-white">Recent Messages</p>
        </div>

        <div className="divide-y divide-[#162d45]">
          {statsLoading ? (
            [1, 2, 3].map((i) => (
              <div key={i} className="flex items-center gap-3 px-5 py-4">
                <Skeleton className="h-9 w-9 rounded-full" />
                <div className="flex-1 space-y-1.5">
                  <Skeleton className="h-3.5 w-36" />
                  <Skeleton className="h-3 w-48" />
                </div>
                <div className="flex flex-col items-end gap-1.5">
                  <Skeleton className="h-3 w-12" />
                  <Skeleton className="h-2 w-2 rounded-full" />
                </div>
              </div>
            ))
          ) : recentMessages.length === 0 ? (
            <div className="px-5 py-8 text-center">
              <p className="text-sm text-[#4A6480]">No messages yet</p>
            </div>
          ) : (
            recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="flex items-center gap-3 px-5 py-4 hover:bg-[#0a1622] transition-colors cursor-pointer"
              >
                <Avatar
                  name={msg.sender_name}
                  logo={msg.sender_logo}
                  size={36}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-white truncate">
                    {msg.sender_name}
                  </p>
                  <p className="text-[11px] text-[#4A6480] truncate mt-0.5">
                    {msg.preview}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                  <p className="text-[11px] text-[#4A6480]">{msg.time_ago}</p>
                  {msg.is_unread && (
                    <span className="w-2 h-2 rounded-full bg-[#2DD4BF] flex-shrink-0" />
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        <div className="px-5 py-3 border-t border-[#162d45]">
          <button className="w-full text-center text-[12px] font-semibold text-[#4A6480] hover:text-[#2DD4BF] transition-colors py-1">
            View All Messages
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerDashboard;
