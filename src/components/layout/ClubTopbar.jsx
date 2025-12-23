'use client'

import { useSelector } from 'react-redux'
import { Search, Bell } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function ClubTopbar() {
  const theme = useSelector(state => state.theme)

  return (
    <header 
      className="fixed top-0 left-0 lg:left-64 right-0 h-20 border-b flex items-center justify-between px-4 lg:px-8 z-30"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}1A`,
      }}
    >
      {/* Search Bar */}
      <div className="flex-1 max-w-xl ml-12 lg:ml-0">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-11 pl-10 pr-4 border rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm lg:text-base"
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
              outlineColor: `${theme.colors.primaryCyan}80`,
            }}
            onFocus={(e) => {
              e.target.style.borderColor = theme.colors.primaryCyan
              e.target.style.boxShadow = `0 0 0 2px ${theme.colors.primaryCyan}80`
            }}
            onBlur={(e) => {
              e.target.style.borderColor = `${theme.colors.primaryCyan}33`
              e.target.style.boxShadow = 'none'
            }}
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 lg:gap-6">
        {/* Notifications */}
        <button 
          className="relative p-2 rounded-lg transition-all"
          style={{
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.backgroundDark
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
          }}
        >
          <Bell className="w-5 h-5 text-gray-400" />
          <span 
            className="absolute top-1 right-1 w-2 h-2 rounded-full"
            style={{
              backgroundColor: theme.colors.primaryMagenta,
            }}
          ></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-2 lg:gap-3">
          <Avatar className="w-8 h-8 lg:w-10 lg:h-10">
            <AvatarImage src="/fc-barcelona-youth.jpg" alt="FC Barcelona Youth" />
            <AvatarFallback>FB</AvatarFallback>
          </Avatar>
          <div className="hidden sm:block">
            <p className="text-sm font-semibold text-white">FC Barcelona Youth</p>
            <p className="text-xs text-gray-400">Club Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}