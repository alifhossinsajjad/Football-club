// File: src/app/(dashboard)/club/player-discovery/[id]/page.js

'use client'

import { useSelector } from 'react-redux'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft, Cake, Ruler, Weight, Globe, Mail, Phone, 
  Instagram, Twitter, Facebook, Youtube, Trophy, TrendingUp,
  Play
} from 'lucide-react'

export default function PlayerProfilePage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()
  const params = useParams()

  const achievements = [
    'Player of the Month - March 2025',
    'Top Scorer U-18 League 2024',
    'England Youth Call-up 2024',
    'FA Youth Cup Finalist 2024',
    'Academy Player of the Year 2023'
  ]

  const careerStats = [
    { label: 'Matches', value: '28', color: theme.colors.primaryCyan },
    { label: 'Goals', value: '19', color: theme.colors.primaryCyan },
    { label: 'Assists', value: '12', color: theme.colors.primaryCyan },
    { label: 'Minutes', value: '2,340', color: theme.colors.primaryCyan }
  ]

  const skills = [
    { name: 'Pace', value: 92 },
    { name: 'Shooting', value: 88 },
    { name: 'Dribbling', value: 90 },
    { name: 'Passing', value: 85 },
    { name: 'Physical', value: 82 },
    { name: 'Technical', value: 89 }
  ]

  const playingHistory = [
    {
      team: 'Manchester United Youth Academy',
      role: 'Forward',
      achievement: 'FA Youth Cup Runner-up 2024',
      period: '2021 - Present'
    },
    {
      team: 'England U-18 National Team',
      role: 'Forward',
      achievement: '8 Caps, 5 Goals',
      period: '2024 - Present'
    },
    {
      team: 'City Football Academy',
      role: 'Forward',
      achievement: 'Regional Champions 2020',
      period: '2018 - 2021'
    }
  ]

  const highlightVideos = [
    {
      title: 'Season Highlights 2024/25 - Part 1',
      duration: '3:45 minutes',
      thumbnail: '/season-part1.jpg'
    },
    {
      title: 'Season Highlights 2024/25 - Part 2',
      duration: '3:45 minutes',
      thumbnail: '/season-part2.jpg'
    }
  ]

  return (
    <div 
      className="fixed inset-0 z-50 overflow-auto"
      style={{ backgroundColor: theme.colors.backgroundDark }}
    >
      {/* Custom Topbar */}
      <header 
        className="sticky top-0 h-20 border-b flex items-center justify-between px-4 lg:px-8 z-30"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}1A`,
        }}
      >
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors hover:opacity-80"
          style={{ color: theme.colors.primaryCyan }}
        >
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Directory</span>
        </button>

        <div className="flex items-center gap-3">
          <img 
            src="/john-doe-topbar.jpg"
            alt="John Doe"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <p className="text-sm font-semibold text-white">John Doe</p>
            <p className="text-xs text-gray-400">Forward / Striker</p>
          </div>
        </div>
      </header>

      {/* Cover Image with Profile Card */}
      <div className="relative">
        {/* Cover Background */}
        <div className="h-64 lg:h-80">
          <img 
            src="/view-profile-cover.jpg"
            alt="Cover"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Profile Card - Positioned to overlap cover */}
        <div className="px-4 lg:px-8">
          <div 
            className="relative -mt-24 lg:-mt-32 border rounded-2xl p-6 lg:p-8"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
              background: `linear-gradient(135deg, ${theme.colors.backgroundCard} 0%, ${theme.colors.backgroundDark} 100%)`,
            }}
          >
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
              {/* Profile Image */}
              <div className="flex-shrink-0">
                <img 
                  src="/EmmaRodriguez-2.jpg"
                  alt="John Doe"
                  className="w-32 h-32 lg:w-40 lg:h-40 rounded-full border-4 object-cover"
                  style={{ borderColor: theme.colors.primaryCyan }}
                />
              </div>

              {/* Profile Info */}
              <div className="flex-1 space-y-4">
                {/* Name and Status */}
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
                  <div>
                    <h1 
                      className="text-2xl lg:text-3xl font-bold mb-2"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        backgroundClip: "text",
                      }}
                    >
                      John Doe
                    </h1>
                    <p className="text-base lg:text-lg text-gray-300 mb-2">Forward / Striker</p>
                    <p className="text-sm text-gray-400 flex items-center gap-2">
                      <Globe className="w-4 h-4" />
                      Manchester, United Kingdom
                    </p>
                  </div>
                  
                  <span 
                    className="px-4 py-2 rounded-lg font-semibold text-sm w-fit"
                    style={{
                      backgroundColor: `${theme.colors.primaryCyan}20`,
                      color: theme.colors.primaryCyan,
                      border: `1px solid ${theme.colors.primaryCyan}40`
                    }}
                  >
                    Available
                  </span>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {/* Age */}
                  <div 
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}20`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Cake className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                      <p className="text-xs text-gray-400">Age</p>
                    </div>
                    <p className="text-white font-bold text-sm">17 years</p>
                  </div>

                  {/* Height */}
                  <div 
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}20`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Ruler className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                      <p className="text-xs text-gray-400">Height</p>
                    </div>
                    <p className="text-white font-bold text-sm">5'11" (180 cm)</p>
                  </div>

                  {/* Weight */}
                  <div 
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}20`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Weight className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                      <p className="text-xs text-gray-400">Weight</p>
                    </div>
                    <p className="text-white font-bold text-sm">165 lbs (75 kg)</p>
                  </div>

                  {/* Nationality */}
                  <div 
                    className="p-3 rounded-lg border"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}20`,
                    }}
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <Globe className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
                      <p className="text-xs text-gray-400">Nationality</p>
                    </div>
                    <p className="text-white font-bold text-sm">British</p>
                  </div>
                </div>

                {/* Additional Info Row */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Preferred Foot:</span>
                    <span className="text-sm text-white font-semibold">Right</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Date of Birth:</span>
                    <span className="text-sm text-white font-semibold">15/03/2008</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">Jersey Number:</span>
                    <span className="text-sm font-semibold" style={{ color: theme.colors.primaryCyan }}>
                      #10
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="p-4 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">About</h2>
              <p className="text-gray-300 leading-relaxed text-sm">
                Highly skilled and dedicated forward with exceptional technical abilities and a strong goal-scoring record. Known for excellent ball control, pace, and tactical awareness. Currently playing for Manchester United Youth Academy and representing England U-18 National Team. Passionate about developing my skills and pursuing a professional career in football at the highest level.
              </p>
            </div>



            {/* Career Statistics */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Career Statistics (2024/25 Season)</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {careerStats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <p 
                      className="text-3xl font-bold mb-2"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Skills & Attributes */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Skills & Attributes</h2>
              <div className="space-y-4">
                {skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="text-white text-sm">{skill.name}</span>
                      <span 
                        className="font-bold text-sm"
                        style={{ color: theme.colors.primaryCyan }}
                      >
                        {skill.value}
                      </span>
                    </div>
                    <div 
                      className="h-2 rounded-full overflow-hidden"
                      style={{ backgroundColor: theme.colors.backgroundDark }}
                    >
                      <div
                        className="h-full rounded-full transition-all"
                        style={{
                          width: `${skill.value}%`,
                          background: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Playing History */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Playing History</h2>
              <div className="space-y-4">
                {playingHistory.map((history, index) => (
                  <div 
                    key={index}
                    className="p-4 rounded-lg"
                    style={{ backgroundColor: theme.colors.backgroundDark }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-white font-semibold text-sm">{history.team}</h3>
                      <span 
                        className="text-sm font-semibold"
                        style={{ color: theme.colors.primaryCyan }}
                      >
                        {history.period}
                      </span>
                    </div>
                    <p className="text-sm text-gray-400 mb-1">{history.role}</p>
                    <p className="text-sm text-gray-300">{history.achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Highlight Videos */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-6">Highlight Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlightVideos.map((video, index) => (
                  <div key={index} className="relative group cursor-pointer rounded-lg overflow-hidden">
                    <img 
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div 
                        className="w-16 h-16 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: `${theme.colors.primaryCyan}80` }}
                      >
                        <Play className="w-8 h-8 text-white fill-white" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-sm">{video.title}</p>
                      <p className="text-gray-300 text-xs">{video.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Contact Information */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Contact Information</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                  <span className="text-gray-300 text-sm">john.doe@email.com</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                  <span className="text-gray-300 text-sm">+44 7700 900000</span>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Social Media</h2>
              <div className="space-y-3">
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Instagram className="w-5 h-5" style={{ color: '#E4405F' }} />
                  <span className="text-sm">@johndoe_10</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Twitter className="w-5 h-5" style={{ color: '#1DA1F2' }} />
                  <span className="text-sm">@johndoe_10</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Facebook className="w-5 h-5" style={{ color: '#4267B2' }} />
                  <span className="text-sm">John Doe</span>
                </a>
                <a href="#" className="flex items-center gap-3 text-gray-300 hover:text-white transition-colors">
                  <Youtube className="w-5 h-5" style={{ color: '#FF0000' }} />
                  <span className="text-sm">John Doe Football</span>
                </a>
              </div>
            </div>

            {/* Achievements */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                <h2 className="text-xl font-bold text-white">Achievements</h2>
              </div>
              <ul className="space-y-2">
                {achievements.map((achievement, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-300 text-sm">
                    <span 
                      className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                      style={{ backgroundColor: theme.colors.primaryCyan }}
                    />
                    {achievement}
                  </li>
                ))}
              </ul>
            </div>

            {/* Profile Insights */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                <h2 className="text-xl font-bold text-white">Profile Insights</h2>
              </div>
              <div className="space-y-4">
                <div className="pb-4 border-b" style={{ borderColor: `${theme.colors.primaryCyan}1A` }}>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Profile Views</span>
                    <span className="text-white font-bold">342</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#05DF72' }}>+24 this week</p>
                </div>
                <div className="pb-4 border-b" style={{ borderColor: `${theme.colors.primaryCyan}1A` }}>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Scout Views</span>
                    <span className="text-white font-bold">87</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#05DF72' }}>+12 this week</p>
                </div>
                <div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-sm">Club Interest</span>
                    <span className="text-white font-bold">15 clubs</span>
                  </div>
                  <p className="text-xs mt-1" style={{ color: '#05DF72' }}>+3 new this month</p>
                </div>
              </div>
            </div>

            {/* Preferences */}
            <div 
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <h2 className="text-xl font-bold text-white mb-4">Preferences</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Preferred Leagues</p>
                  <p className="text-white text-sm">Premier League, La Liga, Bundesliga</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Contract Status</p>
                  <p className="text-white text-sm">Open to Offers</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Availability</p>
                  <p className="text-white text-sm">Available from Summer 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}