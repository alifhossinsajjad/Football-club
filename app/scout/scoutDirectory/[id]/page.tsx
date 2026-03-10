// app/scout/scoutDirectory/[id]/page.tsx
import { notFound } from "next/navigation";
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
  Clock,
  TrendingUp,
  Building2,
  Award,
  Target,
  CheckCircle,
  ChevronRight,
  Share2,
  BookmarkPlus,
  Flag,
  Briefcase,
  Languages,
  Heart,
  Users2,
  Sparkles,
  UserCheck,
  Activity,
  BarChart3,
  FileText,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  UserPlus,
} from "lucide-react";

const fakeScouts = [
  {
    id: 1,
    name: "Roberto Martinez",
    title: "Senior Scout - Youth Development",
    location: "Madrid, Spain",
    joined: "January 2020",
    email: "rmartinez@nextgenpros.com",
    phone: "+34 770 900 000",
    website: "www.rmartinezscout.com",
    connections: 234,
    experience: 25,
    playersViewed: 342,
    shortlistedPlayers: 28,
    upcomingEvents: 6,
    activeConversations: 15,
    successRate: "61%",
    playersScouted: "1,200+",
    recommended: 145,
    proPlacements: 89,
    clubsWorkedWith: 25,
    bio: "Highly experienced and dedicated professional football scout with over 20 years in talent identification and player development. Specialize in meticulous attention to detail, strong networking capabilities, and an exceptional eye for raw talent. Known for discovering numerous players who have gone on to play at the highest levels of European football.",
    specializations: [
      "Youth Scouting",
      "Technical Analysis",
      "Player Development",
      "International Scouting",
      "Talent Identification",
      "Performance Analytics",
    ],
    languages: [
      "English",
      "Spanish",
      "French",
      "Portuguese",
      "German",
      "Italian",
    ],
    scoutingRegions: [
      { country: "England", flag: "🏴󠁧󠁢󠁥󠁮󠁧󠁿", years: 20, coverage: "Full coverage" },
      { country: "Spain", flag: "🇪🇸", years: 15, coverage: "Full coverage" },
      {
        country: "Germany",
        flag: "🇩🇪",
        years: 12,
        coverage: "Partial coverage",
      },
      { country: "France", flag: "🇫🇷", years: 18, coverage: "Full coverage" },
      { country: "Portugal", flag: "🇵🇹", years: 10, coverage: "Full coverage" },
      { country: "Italy", flag: "🇮🇹", years: 8, coverage: "Partial coverage" },
    ],
    notableDiscoveries: [
      {
        name: "Carlos Fernandez",
        age: 17,
        position: "Midfielder",
        club: "Real Madrid",
        discovered: "2018",
        image: "/images/player1.jpg",
        value: "€12M",
      },
      {
        name: "Lucas Silva",
        age: 16,
        position: "Forward",
        club: "Barcelona",
        discovered: "2019",
        image: "/images/player2.jpg",
        value: "€15M",
      },
      {
        name: "Miguel Torres",
        age: 18,
        position: "Defender",
        club: "Atletico Madrid",
        discovered: "2020",
        image: "/images/player3.jpg",
        value: "€8M",
      },
      {
        name: "James Wilson",
        age: 17,
        position: "Midfielder",
        club: "Manchester United",
        discovered: "2021",
        image: "/images/player4.jpg",
        value: "€10M",
      },
      {
        name: "Pierre Dubois",
        age: 18,
        position: "Forward",
        club: "PSG",
        discovered: "2022",
        image: "/images/player5.jpg",
        value: "€20M",
      },
      {
        name: "Marco Rossi",
        age: 16,
        position: "Striker",
        club: "AC Milan",
        discovered: "2023",
        image: "/images/player6.jpg",
        value: "€5M",
      },
    ],
    professionalHistory: [
      {
        club: "Manchester United Youth Academy",
        role: "Senior Scout",
        duration: "2021 - Present",
        current: true,
        logo: "/images/manutd.png",
      },
      {
        club: "Liverpool FC",
        role: "Youth Development Scout",
        duration: "2018 - 2021",
        current: false,
        logo: "/images/liverpool.png",
      },
      {
        club: "England U-18 National Team",
        role: "Talent Scout",
        duration: "2015 - 2018",
        current: false,
        logo: "/images/england.png",
      },
      {
        club: "City Football Academy",
        role: "Regional Scout",
        duration: "2012 - 2015",
        current: false,
        logo: "/images/mancity.png",
      },
      {
        club: "Chelsea FC Academy",
        role: "Junior Scout",
        duration: "2008 - 2012",
        current: false,
        logo: "/images/chelsea.png",
      },
    ],
    achievements: [
      {
        title: "Scout of the Year - Premier League Youth Development 2024",
        icon: "🏆",
        year: "2024",
      },
      {
        title: "Discovered 5 players who went on to represent national teams",
        icon: "🌍",
        year: "2023",
      },
      {
        title: "Top 10 Most Influential Scouts in Europe - 2023",
        icon: "⭐",
        year: "2023",
      },
      {
        title: "Pro Promotions Youth Development Award - 2022",
        icon: "🎯",
        year: "2022",
      },
      {
        title: "Excellence in Talent Identification - 2021",
        icon: "🔍",
        year: "2021",
      },
    ],
    social: [
      {
        platform: "Instagram",
        handle: "@rmartinez_scout",
        icon: Instagram,
        url: "#",
        followers: "12.5K",
      },
      {
        platform: "Twitter",
        handle: "@RM_ScoutPro",
        icon: Twitter,
        url: "#",
        followers: "8.2K",
      },
      {
        platform: "LinkedIn",
        handle: "Roberto Martinez",
        icon: Linkedin,
        url: "#",
        connections: "500+",
      },
      {
        platform: "YouTube",
        handle: "RM Scouting Analysis",
        icon: Youtube,
        url: "#",
        subscribers: "15.3K",
      },
    ],
    upcomingEvents: [
      {
        name: "UEFA Youth League Final",
        date: "Sep 15, 2024",
        location: "Nyon, Switzerland",
        type: "Tournament",
      },
      {
        name: "International Youth Cup",
        date: "Oct 5-10, 2024",
        location: "Barcelona, Spain",
        type: "Tournament",
      },
      {
        name: "Regional Scouting Summit",
        date: "Nov 12, 2024",
        location: "London, UK",
        type: "Conference",
      },
    ],
    recentActivity: [
      {
        action: "Scouted new player",
        player: "Andre Silva",
        age: 16,
        position: "Striker",
        time: "2 hours ago",
        club: "Benfica U17",
      },
      {
        action: "Added to shortlist",
        player: "Marco Russo",
        age: 17,
        position: "Midfielder",
        time: "Yesterday",
        club: "Inter Milan U18",
      },
      {
        action: "Submitted report",
        player: "David Wagner",
        age: 18,
        position: "Defender",
        time: "2 days ago",
        club: "Bayern U19",
      },
      {
        action: "Attended match",
        player: "Real Madrid vs Barcelona U17",
        time: "3 days ago",
        location: "Madrid",
      },
    ],
    stats: [
      {
        label: "Players Scouted",
        value: "1,247",
        icon: Eye,
        change: "+48",
        trend: "up",
      },
      {
        label: "Pro Placements",
        value: "89",
        icon: Trophy,
        change: "+12",
        trend: "up",
      },
      {
        label: "Success Rate",
        value: "61%",
        icon: Target,
        change: "+5%",
        trend: "up",
      },
      {
        label: "Active Projects",
        value: "23",
        icon: Activity,
        change: "+3",
        trend: "up",
      },
    ],
  },
];

export default async function ScoutProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const scout = fakeScouts.find((s) => s.id === Number(id));
  if (!scout) return notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0A0F1F] to-[#0F172A]">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Back Button */}
        <Link
          href="/scout/scoutDirectory"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-white bg-black/40 backdrop-blur-sm border border-white/15 px-3 py-1.5 rounded-lg hover:bg-black/60 transition-all w-fit mb-4"
        >
          ← Back to Directory
        </Link>

        {/* Profile Banner Card */}
        <div className="bg-[#12143A] border border-[#2DD4BF]/30 rounded-xl p-5 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#2DD4BF]/5 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-600/5 rounded-full filter blur-3xl"></div>

          <div className="relative flex flex-col sm:flex-row items-center sm:items-start gap-4">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-20 h-20 rounded-full border-4 border-[#12143A] overflow-hidden shadow-xl">
                <Image
                  src="/images/njr.jpg"
                  alt={scout.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <span className="absolute bottom-1 right-1 w-3.5 h-3.5 bg-[#2DD4BF] rounded-full border-2 border-[#12143A]" />
            </div>

            {/* Name + Title */}
            <div className="flex-1 text-center sm:text-left">
              <h1 className="text-xl font-bold text-[#2DD4BF] leading-tight">
                {scout.name}
              </h1>
              <p className="text-xs text-[#4A6480] mb-3">{scout.title}</p>

              {/* Meta Info Row */}
              <div className="flex flex-wrap justify-center sm:justify-start gap-x-4 gap-y-2">
                <span className="flex items-center gap-1.5 text-[11px] text-[#4A6480]">
                  <MapPin size={11} className="text-[#2DD4BF]" />
                  {scout.location}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#4A6480]">
                  <Users size={11} className="text-[#2DD4BF]" />
                  {scout.connections} Connections
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#4A6480]">
                  <CalendarDays size={11} className="text-[#2DD4BF]" />
                  Joined {scout.joined}
                </span>
                <span className="flex items-center gap-1.5 text-[11px] text-[#4A6480]">
                  <Clock size={11} className="text-[#2DD4BF]" />
                  {scout.experience} years exp.
                </span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex gap-2 items-center flex-shrink-0 mt-3 sm:mt-0">
              <button className="flex items-center gap-1.5 text-xs font-semibold bg-[#2DD4BF] hover:bg-[#26b8a8] text-[#08121c] px-4 py-2.5 rounded-lg transition-all">
                <MessageSquare size={13} /> Send Message
              </button>
              <button className="flex items-center gap-1.5 text-xs font-semibold border border-[#2DD4BF]/40 text-[#2DD4BF] px-4 py-2.5 rounded-lg hover:bg-[#2DD4BF]/10 transition-all">
                <UserPlus size={13} /> Add to Network
              </button>
            </div>
          </div>
        </div>

        {/* Main Stats Cards */}
        <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
          {scout.stats.map((stat, idx) => (
            <div
              key={idx}
              className="bg-[#12143A] rounded-xl p-5 border border-[#04B5A3]/30 transition-all group"
            >
              <div className=" items-start justify-between ">
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-t from-[#00E5FF]/20 to-[#9C27B0]/30 transition-all mb-3">
                  <stat.icon size={20} className="text-[#2DD4BF] " />
                </div>
                <div>
                    
                  <p className="text-sm text-gray-400 mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
                
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-green-400">
                <TrendingUp size={12} />
                <span>{stat.change} this month</span>
              </div>
            </div>
          ))}
        </div>

        {/* Main Grid - 2 Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            {/* About Section */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-[#2DD4BF]/30">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2 text-gradient-to-t from-[#00E5FF] to-[#9C27B0]">
 
                About
              </h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                {scout.bio}
              </p>

              {/* Specializations */}
              <div className="mt-5">
                <h3 className="text-xs uppercase tracking-wider text-gray-500 mb-3">
                  Specializations
                </h3>
                <div className="flex flex-wrap gap-2">
                  {scout.specializations.map((spec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 bg-[#1A1F35] text-[#2DD4BF] text-xs rounded-lg border border-[#2DD4BF]/30"
                    >
                      {spec}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Notable Discoveries */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-white flex items-center gap-2">
                  <Sparkles size={18} className="text-[#2DD4BF]" />
                  Notable Discoveries
                </h2>
                <Link
                  href="#"
                  className="text-xs text-[#2DD4BF] hover:underline flex items-center gap-1"
                >
                  View All <ChevronRight size={12} />
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {scout.notableDiscoveries.slice(0, 4).map((player, idx) => (
                  <div
                    key={idx}
                    className="bg-[#1A1F35] rounded-lg p-3 border border-gray-700 hover:border-[#2DD4BF]/30 transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2DD4BF]/20 to-purple-500/20 flex items-center justify-center text-[#2DD4BF] font-bold">
                        {player.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-semibold text-white">
                            {player.name}
                          </p>
                          <span className="text-xs text-[#2DD4BF]">
                            {player.age}
                          </span>
                        </div>
                        <p className="text-xs text-gray-400">
                          {player.position} • {player.club}
                        </p>
                        <div className="flex items-center justify-between mt-1">
                          <span className="text-xs text-gray-500">
                            Discovered {player.discovered}
                          </span>
                          <span className="text-xs font-semibold text-green-400">
                            {player.value}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Professional History */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Briefcase size={18} className="text-[#2DD4BF]" />
                Professional History
              </h2>

              <div className="space-y-4">
                {scout.professionalHistory.map((job, idx) => (
                  <div
                    key={idx}
                    className="relative pl-6 pb-4 border-l-2 border-gray-700 last:pb-0 last:border-l-2"
                  >
                    <div className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[#2DD4BF] border-4 border-[#0F172A]"></div>
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-white">
                          {job.role}
                        </p>
                        <p className="text-xs text-[#2DD4BF] mb-1">
                          {job.club}
                        </p>
                        <p className="text-xs text-gray-500">{job.duration}</p>
                      </div>
                      {job.current && (
                        <span className="px-2 py-1 bg-[#2DD4BF]/10 text-[#2DD4BF] text-xs rounded border border-[#2DD4BF]/30">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h2 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Activity size={18} className="text-[#2DD4BF]" />
                Recent Activity
              </h2>

              <div className="space-y-3">
                {scout.recentActivity.map((activity, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-[#1A1F35] rounded-lg"
                  >
                    <div className="w-8 h-8 rounded-full bg-[#2DD4BF]/10 flex items-center justify-center flex-shrink-0">
                      {activity.action.includes("Scouted") ? (
                        <Eye size={14} className="text-[#2DD4BF]" />
                      ) : activity.action.includes("shortlist") ? (
                        <Star size={14} className="text-[#2DD4BF]" />
                      ) : activity.action.includes("report") ? (
                        <FileText size={14} className="text-[#2DD4BF]" />
                      ) : (
                        <CalendarDays size={14} className="text-[#2DD4BF]" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-white">
                        {activity.action}
                        {activity.player && ": "}
                        {activity.player && (
                          <span className="font-semibold">
                            {activity.player}
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        {activity.club || activity.location} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - 1/3 */}
          <div className="space-y-6">
            {/* Contact Info */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Mail size={14} className="text-[#2DD4BF]" />
                Contact Information
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-[#1A1F35] rounded-lg hover:bg-[#1E2439] transition-all cursor-pointer">
                  <Mail size={14} className="text-[#2DD4BF]" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="text-sm text-white">{scout.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#1A1F35] rounded-lg hover:bg-[#1E2439] transition-all cursor-pointer">
                  <Phone size={14} className="text-[#2DD4BF]" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Phone</p>
                    <p className="text-sm text-white">{scout.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-[#1A1F35] rounded-lg hover:bg-[#1E2439] transition-all cursor-pointer">
                  <Globe size={14} className="text-[#2DD4BF]" />
                  <div className="flex-1">
                    <p className="text-xs text-gray-500">Website</p>
                    <p className="text-sm text-[#2DD4BF]">{scout.website}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Users2 size={14} className="text-[#2DD4BF]" />
                Social Media
              </h3>
              <div className="space-y-3">
                {scout.social.map((social, idx) => (
                  <a
                    key={idx}
                    href={social.url}
                    className="flex items-center gap-3 p-3 bg-[#1A1F35] rounded-lg hover:bg-[#1E2439] transition-all"
                  >
                    <social.icon size={16} className="text-[#2DD4BF]" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{social.platform}</p>
                      <p className="text-sm text-white">{social.handle}</p>
                    </div>
                    <p className="text-xs text-[#2DD4BF]">
                      {social.followers || social.connections}
                    </p>
                  </a>
                ))}
              </div>
            </div>

            {/* Languages */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Languages size={14} className="text-[#2DD4BF]" />
                Languages
              </h3>
              <div className="flex flex-wrap gap-2">
                {scout.languages.map((lang, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#1A1F35] text-gray-300 text-sm rounded-lg border border-gray-700"
                  >
                    {lang}
                  </span>
                ))}
              </div>
            </div>

            {/* Scouting Regions */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Flag size={14} className="text-[#2DD4BF]" />
                Scouting Regions
              </h3>
              <div className="space-y-3">
                {scout.scoutingRegions.map((region, idx) => (
                  <div
                    key={idx}
                    className="flex items-center justify-between p-3 bg-[#1A1F35] rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{region.flag}</span>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {region.country}
                        </p>
                        <p className="text-xs text-gray-500">
                          {region.coverage}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-semibold text-[#2DD4BF]">
                      {region.years} yrs
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Award size={14} className="text-[#2DD4BF]" />
                Achievements
              </h3>
              <div className="space-y-3">
                {scout.achievements.map((achievement, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3 bg-[#1A1F35] rounded-lg"
                  >
                    <span className="text-lg">{achievement.icon}</span>
                    <div>
                      <p className="text-sm text-white leading-tight">
                        {achievement.title}
                      </p>
                      <p className="text-xs text-[#2DD4BF] mt-1">
                        {achievement.year}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <CalendarDays size={14} className="text-[#2DD4BF]" />
                Upcoming Events
              </h3>
              <div className="space-y-3">
                {scout.upcomingEvents.map((event, idx) => (
                  <div key={idx} className="p-3 bg-[#1A1F35] rounded-lg">
                    <p className="text-sm font-medium text-white">
                      {event.name}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarDays size={10} /> {event.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={10} /> {event.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Club Affiliations */}
            <div className="bg-[#0F172A] rounded-xl p-6 border border-gray-800">
              <h3 className="text-sm font-bold text-white mb-4 flex items-center gap-2">
                <Building2 size={14} className="text-[#2DD4BF]" />
                Club Affiliations
              </h3>
              <div className="flex flex-wrap gap-2">
                {scout.professionalHistory.map((club, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 bg-[#1A1F35] text-gray-300 text-xs rounded-lg border border-gray-700"
                  >
                    {club.club}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="pt-8 pb-4 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">
              © 2025 NextGen Pros. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-[#2DD4BF] transition-colors"
              >
                Privacy
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-[#2DD4BF] transition-colors"
              >
                Terms
              </Link>
              <Link
                href="#"
                className="text-xs text-gray-500 hover:text-[#2DD4BF] transition-colors"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
