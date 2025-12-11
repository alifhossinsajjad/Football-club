// src/components/layout/Topbar.jsx
'use client'

import Image from 'next/image'
import { Search, Bell } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'

export default function Topbar() {
  return (
    <header className="fixed top-0 left-64 right-0 h-20 bg-[#0B0D2C] border-b border-[#00E5FF]/10 flex items-center justify-between px-8 z-10">
      {/* Search Bar */}
      <div className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full h-11 pl-10 pr-4 bg-[#12143A] border border-[#00E5FF]/20 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00E5FF]/50 transition-all"
          />
        </div>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-[#12143A] rounded-lg transition-all">
          <Bell className="w-5 h-5 text-gray-400" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#9C27B0] rounded-full"></span>
        </button>

        {/* User Profile */}
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/user_pp.jpg" alt="Nolan Torff" />
            <AvatarFallback>NT</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-semibold text-white">Nolan Torff</p>
            <p className="text-xs text-gray-400">Administrator</p>
          </div>
        </div>
      </div>
    </header>
  )
}