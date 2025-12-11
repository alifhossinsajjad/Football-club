'use client'

import { Users, Calendar, DollarSign, TrendingUp, MessageSquare } from 'lucide-react'

const StatCard = ({ icon: Icon, title, value, change, changeType }) => (
  <div className="bg-[#12143A] border border-[#00E5FF]/20 rounded-lg p-6 hover:border-[#00E5FF]/40 transition-all">
    <div className="flex items-center justify-between mb-4">
      <div className="p-3 bg-gradient-to-br from-[#00E5FF]/20 to-[#9C27B0]/20 rounded-lg">
        <Icon className="w-6 h-6 text-[#00E5FF]" />
      </div>
      {change && (
        <span className={`text-sm font-medium ${changeType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {changeType === 'up' ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <h3 className="text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-sm text-gray-400">{title}</p>
  </div>
)

const MessageItem = ({ name, message, time, unread }) => (
  <div className="flex items-start gap-4 p-4 hover:bg-[#0B0D2C]/50 rounded-lg transition-all cursor-pointer">
    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00E5FF] to-[#9C27B0] flex items-center justify-center text-white font-semibold">
      {name.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <p className="text-sm font-semibold text-white">{name}</p>
        <span className="text-xs text-gray-400">{time}</span>
      </div>
      <p className="text-sm text-gray-400 truncate">{message}</p>
    </div>
    {unread && (
      <span className="w-2 h-2 bg-[#9C27B0] rounded-full flex-shrink-0 mt-2"></span>
    )}
  </div>
)

const EventItem = ({ title, date, location, status }) => (
  <div className="flex items-center justify-between p-4 hover:bg-[#0B0D2C]/50 rounded-lg transition-all cursor-pointer">
    <div className="flex items-center gap-4">
      <div className="p-3 bg-[#00E5FF]/10 rounded-lg">
        <Calendar className="w-5 h-5 text-[#00E5FF]" />
      </div>
      <div>
        <p className="text-sm font-semibold text-white mb-1">{title}</p>
        <p className="text-xs text-gray-400">{date} • {location}</p>
      </div>
    </div>
    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
      status === 'upcoming' ? 'bg-[#00E5FF]/20 text-[#00E5FF]' : 
      status === 'ongoing' ? 'bg-green-500/20 text-green-400' : 
      'bg-gray-500/20 text-gray-400'
    }`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  </div>
)

export default function AdminDashboard() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-gray-400">Welcome back, Nolan! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          icon={Users} 
          title="Total Users" 
          value="12,458" 
          change={12.5}
          changeType="up"
        />
        <StatCard 
          icon={Calendar} 
          title="Active Events" 
          value="24" 
          change={8.2}
          changeType="up"
        />
        <StatCard 
          icon={DollarSign} 
          title="Revenue" 
          value="$48,392" 
          change={15.3}
          changeType="up"
        />
        <StatCard 
          icon={TrendingUp} 
          title="Growth Rate" 
          value="23%" 
          change={-2.1}
          changeType="down"
        />
      </div>

      {/* Messages & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Panel */}
        <div className="bg-[#12143A] border border-[#00E5FF]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-5 h-5 text-[#00E5FF]" />
              <h2 className="text-lg font-bold text-white">Recent Messages</h2>
            </div>
            <button className="text-sm text-[#00E5FF] hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            <MessageItem 
              name="Marcus Johnson"
              message="Hello, I have a question about my profile..."
              time="5m ago"
              unread={true}
            />
            <MessageItem 
              name="Sarah Williams"
              message="Thank you for approving my event!"
              time="1h ago"
              unread={true}
            />
            <MessageItem 
              name="David Brown"
              message="When will the next scouting event be?"
              time="3h ago"
              unread={false}
            />
          </div>
        </div>

        {/* Events Panel */}
        <div className="bg-[#12143A] border border-[#00E5FF]/20 rounded-lg p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <Calendar className="w-5 h-5 text-[#00E5FF]" />
              <h2 className="text-lg font-bold text-white">Upcoming Events</h2>
            </div>
            <button className="text-sm text-[#00E5FF] hover:underline">View All</button>
          </div>
          <div className="space-y-2">
            <EventItem 
              title="Youth Talent Showcase"
              date="Dec 15, 2025"
              location="London Stadium"
              status="upcoming"
            />
            <EventItem 
              title="Scout Training Session"
              date="Dec 12, 2025"
              location="Manchester Arena"
              status="ongoing"
            />
            <EventItem 
              title="Club Networking Event"
              date="Dec 8, 2025"
              location="Birmingham FC"
              status="completed"
            />
          </div>
        </div>
      </div>
    </div>
  )
}