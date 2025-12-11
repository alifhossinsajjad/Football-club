// src/components/layout/Sidebar.jsx
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'
import { 
  LayoutDashboard, 
  Users, 
  Calendar, 
  CreditCard, 
  DollarSign, 
  BarChart3, 
  Newspaper, 
  TrendingUp, 
  Settings 
} from 'lucide-react'
import { cn } from '@/lib/utils'

const menuItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/users', icon: Users, label: 'Users Management' },
  { path: '/admin/events', icon: Calendar, label: 'Event Management' },
  { path: '/admin/subscription', icon: CreditCard, label: 'Subscription Tracking' },
  { path: '/admin/monetization', icon: DollarSign, label: 'Monetization' },
  { path: '/admin/analytics', icon: BarChart3, label: 'Analytics' },
  { path: '/admin/news', icon: Newspaper, label: 'News Management' },
  { path: '/admin/boosting', icon: TrendingUp, label: 'Profile Boosting' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#0B0D2C] border-r border-[#00E5FF]/10 flex flex-col">
      {/* Logo */}
      <div className="h-20 flex items-center justify-center border-b border-[#00E5FF]/10">
        <Image src="/logo.png" alt="NextGen Pros" width={150} height={48} />
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto py-6 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.path
            const Icon = item.icon
            
            return (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={cn(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200 relative",
                    isActive
                      ? "text-white"
                      : "text-gray-400 hover:text-white hover:bg-[#12143A]/30"
                  )}
                  style={isActive ? {
                    background: 'linear-gradient(90deg, rgba(0, 229, 255, 0.20) 0%, rgba(156, 39, 176, 0.20) 100%)',
                    borderTop: '1.25px solid rgba(0, 229, 255, 0.3)'
                  } : {}}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}