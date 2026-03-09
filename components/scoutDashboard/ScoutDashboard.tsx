import React from "react";
import {
  Eye,
  Star,
  CalendarDays,
  MessageSquare,
  ChevronRight,
  Clock,
} from "lucide-react";
import SectionTitel from "../reuseable/SectionTitel";

// You can replace these with real data coming from props / context / API
const placeholderPlayers = [
  {
    name: "John Doe",
    position: "Midfielder",
    nationality: "Spain",
    flag: "🇪🇸",
    age: 19,
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=300&h=400&fit=crop",
  },
  {
    name: "Sarah Player",
    position: "Forward",
    nationality: "Portugal",
    flag: "🇵🇹",
    age: 18,
    image:
      "https://images.unsplash.com/photo-1530549387789-4c1017266635?w=300&h=400&fit=crop",
  },
  {
    name: "Mike Johnson",
    position: "Defender",
    nationality: "France",
    flag: "🇫🇷",
    age: 20,
    image:
      "https://images.unsplash.com/photo-1624880357917-835c449dd5d0?w=300&h=400&fit=crop",
  },
];

const upcomingEvents = [
  {
    club: "Elite Football Academy",
    title: "Elite Youth Trial",
    date: "15/09/2025",
    time: "10:00 AM",
    location: "Madrid, Spain",
    logo: "https://via.placeholder.com/48/000000/FFFFFF?text=EFA",
  },
  {
    club: "FC Barcelona Youth",
    title: "Football Academy Showcase",
    date: "20/09/2025",
    time: "2:00 PM",
    location: "Barcelona, Spain",
    logo: "https://via.placeholder.com/48/fc0303/FFFFFF?text=FCB",
  },
  {
    club: "Portuguese FA",
    title: "Talent Scouting Day",
    date: "25/09/2025",
    time: "9:00 AM",
    location: "Lisbon, Portugal",
    logo: "https://via.placeholder.com/48/006600/FFFFFF?text=FPF",
  },
];

const ScoutDashboard: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#0B0D2C] text-slate-100 font-sans pb-12">
      {/* Welcome + Stats */}
      <SectionTitel title="Welcome Back"  />

      <section className="px-5 sm:px-6 lg:px-8 py-6 md:py-8 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-5 lg:gap-6">
        
        {/* Players Viewed */}
        <div className="bg-gradient-to-br from-slate-900/80 to-[#0a0f1e] border border-slate-800/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Eye className="text-cyan-400" size={28} />
            <span className="text-cyan-400 text-xs font-medium">+48 this week</span>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">
            Players Viewed
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white mt-1">342</p>
        </div>

        {/* Shortlisted Players */}
        <div className="bg-gradient-to-br from-slate-900/80 to-[#0a0f1e] border border-slate-800/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <Star className="text-purple-400" size={28} />
            <span className="text-purple-400 text-xs font-medium">12 active</span>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">
            Shortlisted Players
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white mt-1">28</p>
        </div>

        {/* Upcoming Events */}
        <div className="bg-gradient-to-br from-slate-900/80 to-[#0a0f1e] border border-slate-800/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <CalendarDays className="text-orange-400" size={28} />
            <span className="text-orange-400 text-xs font-medium">Next: Sep 15</span>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">
            Upcoming Events
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white mt-1">6</p>
        </div>

        {/* Active Conversations */}
        <div className="bg-gradient-to-br from-slate-900/80 to-[#0a0f1e] border border-slate-800/60 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <MessageSquare className="text-emerald-400" size={28} />
            <span className="text-emerald-400 text-xs font-medium">5 unread</span>
          </div>
          <p className="text-slate-400 text-xs uppercase tracking-wide font-medium">
            Active Conversations
          </p>
          <p className="text-3xl md:text-4xl font-bold text-white mt-1">15</p>
        </div>
      </section>

      {/* Shortlisted Players */}
      <section className="px-5 sm:px-6 lg:px-8 mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold flex items-center gap-2.5">
            <Star className="text-yellow-400" size={24} fill="currentColor" />
            Shortlisted Players
          </h2>
          <button className="text-cyan-400 text-sm font-medium hover:text-cyan-300 flex items-center gap-1 transition-colors">
            View All <ChevronRight size={16} />
          </button>
        </div>

        <div className="flex overflow-x-auto gap-5 pb-6 snap-x snap-mandatory scrollbar-hide">
          {placeholderPlayers.map((player) => (
            <div
              key={player.name}
              className="min-w-[240px] sm:min-w-[260px] md:min-w-[280px] bg-gradient-to-b from-slate-900/90 to-[#0a0f1e] border border-slate-800/60 rounded-2xl overflow-hidden flex-shrink-0 snap-start"
            >
              <div className="h-56 relative">
                <img
                  src={player.image}
                  alt={player.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D2C] via-transparent to-transparent pointer-events-none" />
                <div className="absolute top-4 left-4 bg-cyan-600/90 text-white text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                  Top Prospect
                </div>
              </div>
              <div className="p-5">
                <h3 className="font-bold text-lg mb-1">{player.name}</h3>
                <p className="text-slate-400 text-sm">
                  {player.position} • {player.flag} {player.nationality} • {player.age} years
                </p>
                <button className="w-full mt-5 py-3 bg-cyan-600 hover:bg-cyan-500 active:bg-cyan-700 text-black font-semibold rounded-xl transition-colors">
                  View Full Profile
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming Scouting Events */}
      <section className="px-5 sm:px-6 lg:px-8 mb-12">
        <SectionTitel title="Upcoming Scouting Events" />

        <div className="space-y-4">
          {upcomingEvents.map((event) => (
            <div
              key={event.title}
              className="bg-gradient-to-r from-slate-900/80 to-[#0a0f1e] border border-slate-800/60 rounded-2xl p-5 flex items-center gap-5 hover:border-cyan-500/40 transition-all group"
            >
              <div className="flex-shrink-0">
                <img
                  src={event.logo}
                  alt={event.club}
                  className="w-16 h-16 rounded-xl object-contain bg-black/40 p-2 border border-slate-700/50"
                />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base group-hover:text-cyan-300 transition-colors truncate">
                  {event.title}
                </h3>
                <p className="text-slate-400 text-sm mt-0.5">{event.club}</p>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 mt-2">
                  <div className="flex items-center gap-1.5">
                    <Clock size={14} />
                    {event.date} • {event.time}
                  </div>
                  <div className="hidden sm:block">•</div>
                  <div>{event.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 text-center">
          <button className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1.5 mx-auto transition-colors">
            View All Events <ChevronRight size={18} />
          </button>
        </div>
      </section>

      {/* Recent Views & Messages */}
      <section className="px-5 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-8 lg:gap-10 pb-12">
        {/* Recent Player Views */}
        <div>
          <SectionTitel title="Recent Player Views" />

          <div className="space-y-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                key={i}
                className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-4 flex items-center gap-4 hover:bg-slate-800/60 transition-colors"
              >
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-800 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">Player {i + 1}</p>
                  <p className="text-slate-500 text-sm">Midfielder • Spain</p>
                </div>
                <span className="text-xs text-slate-500 whitespace-nowrap">2h ago</span>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Messages */}
        <div>
          <SectionTitel title="Recent Messages" />

          <div className="space-y-4">
            {["John Doe", "FC Barcelona Youth", "Sarah Player"].map((name, i) => (
              <div
                key={name}
                className="bg-slate-900/60 border border-slate-800/50 rounded-xl p-4 flex items-center gap-4 hover:bg-slate-800/60 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {name[0]}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{name}</p>
                  <p className="text-slate-400 text-sm truncate">
                    {i === 0
                      ? "Thank you for reaching out..."
                      : i === 1
                      ? "We have updated the event..."
                      : "I appreciate your interest..."}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-xs text-slate-500">
                    {i === 0 ? "2h" : i === 1 ? "5h" : "1d"} ago
                  </span>
                  {i === 0 && (
                    <span className="w-2.5 h-2.5 bg-cyan-400 rounded-full mt-1.5" />
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <button className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors">
              View All Messages
            </button>
          </div>
        </div>
      </section>

      <footer className="px-6 py-8 text-center text-slate-600 text-sm border-t border-slate-800/40">
        © 2025 NextGen Pros. All rights reserved.
      </footer>
    </div>
  );
};

export default ScoutDashboard;