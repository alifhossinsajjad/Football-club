'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useSelector } from 'react-redux'
import { Shield, Bell, Globe } from 'lucide-react'

const settingsTabs = [
  { path: '/club/settings/security', icon: Shield, label: 'Security & Privacy' },
  { path: '/club/settings/notifications', icon: Bell, label: 'Notifications' },
  { path: '/club/settings/preferences', icon: Globe, label: 'Preferences' },
]

export default function ClubSettingsLayout({ children }) {
  const pathname = usePathname()
  const router = useRouter()
  const theme = useSelector(state => state.theme)

  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Page Header */}
      <div>
        <h1 
          className="text-2xl lg:text-3xl font-bold mb-2 inline-block"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            color: "transparent",
          }}
        >
          Settings
        </h1>
        <p className="text-sm lg:text-base text-gray-400">Manage your club account and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div 
        className="border-b overflow-x-auto"
        style={{
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex gap-1 lg:gap-2 min-w-max">
          {settingsTabs.map((tab) => {
            const isActive = pathname === tab.path
            const Icon = tab.icon

            return (
              <button
                key={tab.path}
                onClick={() => router.push(tab.path)}
                className="flex items-center gap-2 px-3 lg:px-4 py-2 lg:py-3 text-xs lg:text-sm font-medium transition-all whitespace-nowrap rounded-t-lg"
                style={{
                  color: isActive ? 'white' : '#9CA3AF',
                  backgroundColor: isActive 
                    ? `rgba(0,0,0,0)` 
                    : 'transparent',
                  borderBottom: isActive 
                    ? `2px solid ${theme.colors.primaryCyan}` 
                    : '2px solid transparent',
                  background: isActive 
                    ? `linear-gradient(90deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)` 
                    : 'transparent',
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = `${theme.colors.backgroundCard}4D`
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.backgroundColor = 'transparent'
                  }
                }}
              >
                <Icon className="w-3 h-3 lg:w-4 lg:h-4" />
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            )
          })}
        </div>
      </div>

      {/* Tab Content */}
      <div>
        {children}
      </div>
    </div>
  )
}