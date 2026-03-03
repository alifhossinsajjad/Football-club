import React from "react";
import {
  Eye,
  Star,
  Calendar,
  MessageSquare,
  Search,
  Bell,
  Plus,
  LayoutDashboard,
  Users,
  Settings,
  ChevronRight,
} from "lucide-react";

// --- Types ---

interface Stat {
  label: string;
  value: string | number;
  subValue: string;
  icon: React.ReactNode;
  subColor: string;
}

interface Player {
  id: string;
  name: string;
  role: string;
  nationality: string;
  age: number;
  image: string;
  isTopProspect?: boolean;
}

interface ScoutingEvent {
  id: string;
  title: string;
  date: { month: string; day: string };
  time: string;
  location: string;
}

// --- Sub-components ---

const StatCard: React.FC<Stat> = ({
  label,
  value,
  subValue,
  icon,
  subColor,
}) => (
  <div className="bg-[#0f172a] border border-slate-800 rounded-2xl p-4 flex flex-col gap-2">
    <div className="flex justify-between items-start">
      <div className="p-2 bg-slate-800/50 rounded-lg text-cyan-400">{icon}</div>
      <span className={`text-[10px] font-medium ${subColor}`}>{subValue}</span>
    </div>
    <div className="mt-2">
      <p className="text-slate-400 text-xs uppercase tracking-wider font-semibold">
        {label}
      </p>
      <p className="text-2xl font-bold text-white mt-1">{value}</p>
    </div>
  </div>
);

const PlayerCard: React.FC<Player> = ({
  name,
  role,
  nationality,
  age,
  image,
  isTopProspect,
}) => (
  <div className="relative min-w-[240px] bg-[#0f172a] border border-slate-800 rounded-3xl overflow-hidden group">
    <div className="h-64 overflow-hidden relative">
      <img src={image} alt={name} className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0f172a] via-transparent to-transparent" />
      {isTopProspect && (
        <span className="absolute top-4 left-4 bg-cyan-500 text-black text-[10px] font-bold px-2 py-1 rounded-md uppercase">
          Top Prospect
        </span>
      )}
    </div>
    <div className="p-5 -mt-12 relative z-10">
      <h4 className="text-white text-lg font-bold">{name}</h4>
      <p className="text-slate-400 text-sm">
        {role}, {nationality}, {age}
      </p>
      <button className="w-full mt-4 py-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-xl transition-colors text-sm">
        View Full Profile
      </button>
    </div>
  </div>
);

const EventItem: React.FC<ScoutingEvent> = ({
  title,
  date,
  time,
  location,
}) => (
  <div className="flex items-center gap-4 p-4 bg-[#0f172a] border border-slate-800 rounded-2xl group cursor-pointer hover:border-slate-700 transition-colors">
    <div className="flex flex-col items-center justify-center w-14 h-14 bg-slate-800/50 rounded-xl text-center">
      <span className="text-[10px] uppercase font-bold text-purple-400">
        {date.month}
      </span>
      <span className="text-xl font-bold text-white leading-tight">
        {date.day}
      </span>
    </div>
    <div className="flex-1">
      <h4 className="text-white font-semibold text-sm">{title}</h4>
      <div className="flex items-center gap-2 text-slate-500 text-xs mt-1">
        <div className="flex items-center gap-1">
          <Calendar size={12} />
          <span>{time}</span>
        </div>
        <span>•</span>
        <span>{location}</span>
      </div>
    </div>
    <ChevronRight
      size={18}
      className="text-slate-600 group-hover:text-cyan-400 transition-colors"
    />
  </div>
);

// --- Main Component ---

const ScoutDashboard: React.FC = () => {
  const stats: Stat[] = [
    {
      label: "Players Viewed",
      value: "342",
      subValue: "+48 wk",
      icon: <Eye size={20} />,
      subColor: "text-cyan-400",
    },
    {
      label: "Shortlisted",
      value: "28",
      subValue: "12 Active",
      icon: <Star size={20} />,
      subColor: "text-purple-400",
    },
    {
      label: "Events",
      value: "6",
      subValue: "Sep 15",
      icon: <Calendar size={20} />,
      subColor: "text-orange-400",
    },
    {
      label: "Messages",
      value: "15",
      subValue: "5 Unread",
      icon: <MessageSquare size={20} />,
      subColor: "text-emerald-400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans pb-24">
      {/* Header */}
      <header className="px-6 pt-8 pb-6 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-emerald-500 p-0.5 overflow-hidden">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Mike"
              alt="Profile"
              className="w-full h-full rounded-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">
              Welcome Back,{" "}
              <span className="text-purple-500 font-extrabold italic">
                Mike!
              </span>
            </h1>
            <p className="text-slate-500 text-xs">
              Head Scout • Manchester United
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white transition-colors">
            <Search size={20} />
          </button>
          <button className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl text-slate-400 hover:text-white relative transition-colors">
            <Bell size={20} />
            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full border-2 border-slate-900" />
          </button>
        </div>
      </header>

      {/* Stats Grid */}
      <section className="px-6 grid grid-cols-2 gap-4 mb-10">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </section>

      {/* Shortlisted Players */}
      <section className="mb-10">
        <div className="px-6 flex justify-between items-end mb-6">
          <h2 className="text-xl font-bold text-white tracking-tight">
            Shortlisted Players
          </h2>
          <button className="text-cyan-400 text-sm font-semibold hover:underline">
            See all
          </button>
        </div>
        <div className="flex overflow-x-auto gap-4 px-6 no-scrollbar">
          <PlayerCard
            id="1"
            name="John Doe"
            role="Midfielder"
            nationality="Spain"
            age={19}
            isTopProspect
            image="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=300&fit=crop"
          />
          <PlayerCard
            id="2"
            name="Sarah Player"
            role="Forward"
            nationality="Portugal"
            age={18}
            image="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&h=300&fit=crop"
          />
        </div>
      </section>

      {/* Scouting Events */}
      <section className="px-6 mb-10">
        <h2 className="text-xl font-bold text-white tracking-tight mb-6">
          Upcoming Scouting Events
        </h2>
        <div className="space-y-4">
          <EventItem
            id="1"
            title="Elite Youth Trial"
            date={{ month: "Sep", day: "12" }}
            time="10:00 AM"
            location="London, UK"
          />
          <EventItem
            id="2"
            title="Academy Showcase"
            date={{ month: "Sep", day: "15" }}
            time="02:30 PM"
            location="Madrid, ES"
          />
          <EventItem
            id="3"
            title="Talent Scouting Day"
            date={{ month: "Sep", day: "18" }}
            time="09:00 AM"
            location="Berlin, DE"
          />
        </div>
      </section>
    </div>
  );
};

export default ScoutDashboard;
