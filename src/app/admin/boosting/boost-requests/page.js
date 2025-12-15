'use client'

import { useSelector } from 'react-redux'
import { Clock } from 'lucide-react'

export default function BoostRequestsPage() {
  const theme = useSelector(state => state.theme)

  return (
    <div 
      className="border rounded-lg p-8 lg:p-12 min-h-[400px] flex items-center justify-center"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      <div className="text-center">
        <div className="relative inline-block mb-4">
          <Clock 
            className="w-16 h-16"
            style={{ color: theme.colors.primaryCyan }}
          />
          <span 
            className="absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-bold"
            style={{
              backgroundColor: theme.colors.primaryCyan,
              color: 'white',
            }}
          >
            18
          </span>
        </div>
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Boost Requests</h3>
        <p className="text-sm lg:text-base text-gray-400">18 pending requests awaiting approval</p>
      </div>
    </div>
  )
}