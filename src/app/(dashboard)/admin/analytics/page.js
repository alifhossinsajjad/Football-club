'use client'

import { useSelector } from 'react-redux'

export default function AnalyticsPage() {
  const theme = useSelector(state => state.theme)

  const userGrowthData = [
    { day: 'Mon', value: 65 },
    { day: 'Tue', value: 85 },
    { day: 'Wed', value: 72 },
    { day: 'Thu', value: 95 },
    { day: 'Fri', value: 78 },
    { day: 'Sat', value: 100 },
    { day: 'Sun', value: 88 }
  ]

  const userDistribution = [
    { label: 'Players', value: 68 },
    { label: 'Clubs', value: 22 },
    { label: 'Scouts', value: 10 }
  ]

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 
          className="text-3xl lg:text-4xl font-bold"
          style={{
            background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            display: 'inline-block'
          }}
        >
          Analytics
        </h1>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth Chart */}
        <div 
          className="rounded-lg border p-4 sm:p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">User Growth</h2>
          
          {/* Bar Chart */}
          <div className="flex items-end justify-between gap-2 h-64">
            {userGrowthData.map((item, index) => {
              const maxValue = 100
              const height = (item.value / maxValue) * 100
              
              return (
                <div key={index} className="flex-1 flex flex-col items-center gap-3">
                  <div className="w-full flex items-end justify-center" style={{ height: '240px' }}>
                    <div 
                      className="w-full rounded-t-lg transition-all hover:scale-105"
                      style={{
                        height: `${height}%`,
                        background: 'linear-gradient(180deg, #00E5FF 0%, #9C27B0 100%)'
                      }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400">{item.day}</span>
                </div>
              )
            })}
          </div>
        </div>

        {/* User Distribution Chart */}
        <div 
          className="rounded-lg border p-4 sm:p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">User Distribution</h2>
          
          <div className="flex flex-col items-center">
            {/* Donut Chart */}
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 mb-8">
              <svg viewBox="0 0 200 200" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke={theme.colors.backgroundDark}
                  strokeWidth="40"
                />
                
                {/* Gradient Definitions */}
                <defs>
                  {/* Players gradient (Cyan to transition) */}
                  <linearGradient id="playersGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00E5FF" />
                    <stop offset="100%" stopColor="#7B68EE" />
                  </linearGradient>
                  
                  {/* Clubs gradient (transition to Magenta) */}
                  <linearGradient id="clubsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#7B68EE" />
                    <stop offset="100%" stopColor="#9C27B0" />
                  </linearGradient>
                  
                  {/* Scouts gradient (Magenta back to Cyan) */}
                  <linearGradient id="scoutsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#9C27B0" />
                    <stop offset="50%" stopColor="#5B4B8A" />
                    <stop offset="100%" stopColor="#00E5FF" />
                  </linearGradient>
                </defs>
                
                {/* Players segment (68%) - Cyan gradient */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#playersGradient)"
                  strokeWidth="40"
                  strokeDasharray={`${68 * 5.03} ${32 * 5.03}`}
                  strokeDashoffset="0"
                  className="transition-all"
                />
                
                {/* Clubs segment (22%) - Middle gradient */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#clubsGradient)"
                  strokeWidth="40"
                  strokeDasharray={`${22 * 5.03} ${78 * 5.03}`}
                  strokeDashoffset={`${-68 * 5.03}`}
                  className="transition-all"
                />
                
                {/* Scouts segment (10%) - Completing the circle */}
                <circle
                  cx="100"
                  cy="100"
                  r="80"
                  fill="none"
                  stroke="url(#scoutsGradient)"
                  strokeWidth="40"
                  strokeDasharray={`${10 * 5.03} ${90 * 5.03}`}
                  strokeDashoffset={`${-(68 + 22) * 5.03}`}
                  className="transition-all"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-4 w-full">
              {userDistribution.map((item, index) => {
                let dotGradient = ''
                if (item.label === 'Players') {
                  dotGradient = 'linear-gradient(135deg, #00E5FF 0%, #7B68EE 100%)'
                } else if (item.label === 'Clubs') {
                  dotGradient = 'linear-gradient(135deg, #7B68EE 0%, #9C27B0 100%)'
                } else {
                  dotGradient = 'linear-gradient(135deg, #9C27B0 0%, #5B4B8A 50%, #00E5FF 100%)'
                }

                return (
                  <div key={index} className="text-center">
                    <div 
                      className="w-3 h-3 rounded-full mx-auto mb-2"
                      style={{
                        background: dotGradient
                      }}
                    />
                    <div className="text-xs sm:text-sm text-gray-400 mb-1">{item.label}</div>
                    <div className="text-xl sm:text-2xl font-bold text-white">{item.value}%</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}