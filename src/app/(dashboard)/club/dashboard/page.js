'use client'

import { useSelector } from 'react-redux'

export default function ClubDashboardPage() {
  const theme = useSelector(state => state.theme)

  return (
    <div className="min-h-screen">
      <h1 
        className="text-3xl lg:text-4xl font-bold mb-4"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          color: 'transparent',
          display: 'inline-block'
        }}
      >
        Club Dashboard
      </h1>
      <p className="text-gray-400">Welcome to your club dashboard</p>
    </div>
  )
}