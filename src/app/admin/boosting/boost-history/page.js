'use client'

import { useSelector } from 'react-redux'
import { History } from 'lucide-react'

export default function BoostHistoryPage() {
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
        <History 
          className="w-16 h-16 mx-auto mb-4"
          style={{ color: theme.colors.primaryCyan }}
        />
        <h3 className="text-xl lg:text-2xl font-bold text-white mb-2">Boost History</h3>
        <p className="text-sm lg:text-base text-gray-400">Coming Soon...</p>
      </div>
    </div>
  )
}