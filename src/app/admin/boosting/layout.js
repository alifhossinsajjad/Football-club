'use client'

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { TrendingUp, Calendar, Clock, DollarSign, Users } from 'lucide-react'

export default function BoostingLayout({ children }) {
  const pathname = usePathname()
  const theme = useSelector(state => state.theme)

  const tabs = [
    { 
      name: 'Boosted Players', 
      path: '/admin/boosting/boosted-players'
    },
    { 
      name: 'Boosted Events', 
      path: '/admin/boosting/boosted-events'
    },
    { 
      name: 'Boost Requests', 
      path: '/admin/boosting/boost-requests',
      badge: 18
    },
    { 
      name: 'Boost History', 
      path: '/admin/boosting/boost-history'
    }
  ]

  const stats = [
    {
      icon: Users,
      label: 'Active Boosted Players',
      value: '127',
      subtitle: '€3,810/month'
    },
    {
      icon: Calendar,
      label: 'Active Boosted Events',
      value: '34',
      subtitle: '€679/total'
    },
    {
      icon: Clock,
      label: 'Pending Requests',
      value: '18',
      subtitle: 'Awaiting approval'
    },
    {
      icon: DollarSign,
      label: 'This Month Revenue',
      value: '€4,489',
      subtitle: '+15% vs last month'
    }
  ]

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <h1 
          className="text-3xl lg:text-4xl font-bold inline-block"
          style={{
            background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
          }}
        >
          Profile Boosting Management
        </h1>
        
        <button 
          className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
          style={{
            backgroundColor: '#04B5A3',
            backgroundImage: 'none'
          }}
        >
          <TrendingUp className="w-5 h-5" />
          Boost Profile
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index}
              className="rounded-lg p-6 border transition-all hover:scale-105"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`
              }}
            >
              {/* Icon */}
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)'
                }}
              >
                <Icon className="w-6 h-6" style={{ color: theme.colors.primaryCyan }} />
              </div>

              {/* Label */}
              <div className="text-sm text-gray-400 mb-2">
                {stat.label}
              </div>

              {/* Value */}
              <div className="text-3xl font-bold text-white mb-1">
                {stat.value}
              </div>

              {/* Subtitle */}
              <div className="text-xs text-gray-500">
                {stat.subtitle}
              </div>
            </div>
          )
        })}
      </div>

      {/* Tab Navigation */}
      <div 
        className="border-b mb-6"
        style={{
          borderColor: `${theme.colors.primaryCyan}1A`
        }}
      >
        <div className="flex gap-0 overflow-x-auto">
          {tabs.map(tab => {
            const isActive = pathname === tab.path
            return (
              <Link 
                key={tab.path} 
                href={tab.path}
                className="relative px-6 py-4 text-sm font-medium whitespace-nowrap transition-all"
                style={{
                  color: isActive ? '#FFFFFF' : '#9CA3AF',
                  borderBottom: isActive ? `2px solid ${theme.colors.primaryCyan}` : '2px solid transparent'
                }}
              >
                <span className="flex items-center gap-2">
                  {tab.name}
                  {tab.badge && (
                    <span 
                      className="relative flex items-center justify-center min-w-[24px] h-6 px-2 rounded-full text-xs font-bold text-white"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`
                      }}
                    >
                      {tab.badge}
                    </span>
                  )}
                </span>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Page Content */}
      {children}
    </div>
  )
}