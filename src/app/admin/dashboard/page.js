'use client'

import { useSelector } from 'react-redux'
import { Users, Calendar, DollarSign, TrendingUp, MessageSquare } from 'lucide-react'

const StatCard = ({ icon: Icon, title, value, change, changeType, theme }) => (
  <div 
    className="border rounded-lg p-4 lg:p-6 hover:opacity-90 transition-all"
    style={{
      backgroundColor: theme.colors.backgroundCard,
      borderColor: `${theme.colors.primaryCyan}33`,
    }}
  >
    <div className="flex items-center justify-between mb-3 lg:mb-4">
      <div 
        className="p-2 lg:p-3 rounded-lg"
        style={{
          background: `linear-gradient(to bottom right, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
        }}
      >
        <Icon 
          className="w-5 h-5 lg:w-6 lg:h-6" 
          style={{ color: theme.colors.primaryCyan }}
        />
      </div>
      {change && (
        <span className={`text-xs lg:text-sm font-medium ${changeType === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {changeType === 'up' ? '+' : ''}{change}%
        </span>
      )}
    </div>
    <h3 className="text-xl lg:text-2xl font-bold text-white mb-1">{value}</h3>
    <p className="text-xs lg:text-sm text-gray-400">{title}</p>
  </div>
)

const MessageItem = ({ name, message, time, unread, theme }) => (
  <div 
    className="flex items-start gap-3 lg:gap-4 p-3 lg:p-4 rounded-lg transition-all cursor-pointer"
    style={{
      backgroundColor: 'transparent',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = `${theme.colors.backgroundDark}80`
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent'
    }}
  >
    <div 
      className="w-8 h-8 lg:w-10 lg:h-10 rounded-full flex items-center justify-center text-white font-semibold text-sm lg:text-base flex-shrink-0"
      style={{
        background: `linear-gradient(to bottom right, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
      }}
    >
      {name.charAt(0)}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center justify-between mb-1">
        <p className="text-xs lg:text-sm font-semibold text-white truncate pr-2">{name}</p>
        <span className="text-xs text-gray-400 flex-shrink-0">{time}</span>
      </div>
      <p className="text-xs lg:text-sm text-gray-400 truncate">{message}</p>
    </div>
    {unread && (
      <span 
        className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
        style={{
          backgroundColor: theme.colors.primaryMagenta,
        }}
      ></span>
    )}
  </div>
)

const EventItem = ({ title, date, location, status, theme }) => (
  <div 
    className="flex items-center justify-between p-3 lg:p-4 rounded-lg transition-all cursor-pointer gap-3"
    style={{
      backgroundColor: 'transparent',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.backgroundColor = `${theme.colors.backgroundDark}80`
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.backgroundColor = 'transparent'
    }}
  >
    <div className="flex items-center gap-3 lg:gap-4 flex-1 min-w-0">
      <div 
        className="p-2 lg:p-3 rounded-lg flex-shrink-0"
        style={{
          backgroundColor: `${theme.colors.primaryCyan}1A`,
        }}
      >
        <Calendar 
          className="w-4 h-4 lg:w-5 lg:h-5" 
          style={{ color: theme.colors.primaryCyan }}
        />
      </div>
      <div className="min-w-0">
        <p className="text-xs lg:text-sm font-semibold text-white mb-0.5 lg:mb-1 truncate">{title}</p>
        <p className="text-xs text-gray-400 truncate">{date} • {location}</p>
      </div>
    </div>
    <span 
      className="px-2 lg:px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0"
      style={{
        backgroundColor: status === 'upcoming' 
          ? `${theme.colors.primaryCyan}33` 
          : status === 'ongoing' 
          ? 'rgba(34, 197, 94, 0.2)' 
          : 'rgba(107, 114, 128, 0.2)',
        color: status === 'upcoming' 
          ? theme.colors.primaryCyan 
          : status === 'ongoing' 
          ? 'rgb(74, 222, 128)' 
          : 'rgb(156, 163, 175)',
      }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  </div>
)

export default function AdminDashboard() {
  const theme = useSelector(state => state.theme)

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">Dashboard</h1>
        <p className="text-sm lg:text-base text-gray-400">Welcome back, Nolan! Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <StatCard 
          icon={Users} 
          title="Total Users" 
          value="12,458" 
          change={12.5}
          changeType="up"
          theme={theme}
        />
        <StatCard 
          icon={Calendar} 
          title="Active Events" 
          value="24" 
          change={8.2}
          changeType="up"
          theme={theme}
        />
        <StatCard 
          icon={DollarSign} 
          title="Revenue" 
          value="$48,392" 
          change={15.3}
          changeType="up"
          theme={theme}
        />
        <StatCard 
          icon={TrendingUp} 
          title="Growth Rate" 
          value="23%" 
          change={-2.1}
          changeType="down"
          theme={theme}
        />
      </div>

      {/* Messages & Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
        {/* Messages Panel */}
        <div 
          className="border rounded-lg p-4 lg:p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <MessageSquare 
                className="w-4 h-4 lg:w-5 lg:h-5" 
                style={{ color: theme.colors.primaryCyan }}
              />
              <h2 className="text-base lg:text-lg font-bold text-white">Recent Messages</h2>
            </div>
            <button 
              className="text-xs lg:text-sm hover:underline"
              style={{ color: theme.colors.primaryCyan }}
            >
              View All
            </button>
          </div>
          <div className="space-y-1 lg:space-y-2">
            <MessageItem 
              name="Marcus Johnson"
              message="Hello, I have a question about my profile..."
              time="5m ago"
              unread={true}
              theme={theme}
            />
            <MessageItem 
              name="Sarah Williams"
              message="Thank you for approving my event!"
              time="1h ago"
              unread={true}
              theme={theme}
            />
            <MessageItem 
              name="David Brown"
              message="When will the next scouting event be?"
              time="3h ago"
              unread={false}
              theme={theme}
            />
          </div>
        </div>

        {/* Events Panel */}
        <div 
          className="border rounded-lg p-4 lg:p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="flex items-center justify-between mb-4 lg:mb-6">
            <div className="flex items-center gap-2 lg:gap-3">
              <Calendar 
                className="w-4 h-4 lg:w-5 lg:h-5" 
                style={{ color: theme.colors.primaryCyan }}
              />
              <h2 className="text-base lg:text-lg font-bold text-white">Upcoming Events</h2>
            </div>
            <button 
              className="text-xs lg:text-sm hover:underline"
              style={{ color: theme.colors.primaryCyan }}
            >
              View All
            </button>
          </div>
          <div className="space-y-1 lg:space-y-2">
            <EventItem 
              title="Youth Talent Showcase"
              date="Dec 15, 2025"
              location="London Stadium"
              status="upcoming"
              theme={theme}
            />
            <EventItem 
              title="Scout Training Session"
              date="Dec 12, 2025"
              location="Manchester Arena"
              status="ongoing"
              theme={theme}
            />
            <EventItem 
              title="Club Networking Event"
              date="Dec 8, 2025"
              location="Birmingham FC"
              status="completed"
              theme={theme}
            />
          </div>
        </div>
      </div>
    </div>
  )
}