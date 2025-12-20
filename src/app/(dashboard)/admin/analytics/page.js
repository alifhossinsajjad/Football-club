'use client'

import { useSelector } from 'react-redux'

export default function AnalyticsPage() {
  const { colors } = useSelector(state => state.theme)

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

  const CIRCUMFERENCE = 2 * Math.PI * 80

  const getDashArray = percent => `${(percent / 100) * CIRCUMFERENCE} ${CIRCUMFERENCE}`

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <h1
        className="text-3xl lg:text-4xl font-bold mb-8"
        style={{
          background: `linear-gradient(90deg, ${colors.primaryCyan}, ${colors.primaryMagenta})`,
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          display: 'inline-block'

        }}
      >
        Analytics
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* User Growth */}
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: colors.backgroundCard,
            borderColor: `${colors.primaryCyan}33`
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">User Growth</h2>

          <div className="flex items-end gap-2 h-64">
            {userGrowthData.map((item, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-3">
                <div className="w-full flex items-end" style={{ height: '240px' }}>
                  <div
                    className="w-full rounded-t-lg transition-transform hover:scale-105"
                    style={{
                      height: `${item.value}%`,
                      background: `linear-gradient(180deg, ${colors.primaryCyan}, ${colors.primaryMagenta})`
                    }}
                  />
                </div>
                <span className="text-sm text-gray-400">{item.day}</span>
              </div>
            ))}
          </div>
        </div>

        {/* User Distribution */}
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: colors.backgroundCard,
            borderColor: `${colors.primaryCyan}33`
          }}
        >
          <h2 className="text-xl font-semibold text-white mb-6">User Distribution</h2>

          <div className="flex flex-col items-center">
            <svg
              viewBox="0 0 200 200"
              className="-rotate-90 mb-8"
              width="260"
              height="260"
            >
              <defs>
                <linearGradient id="blendGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors.primaryCyan} />
                  <stop offset="100%" stopColor={colors.primaryMagenta} />
                </linearGradient>
              </defs>

              {/* Background */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={colors.backgroundDark}
                strokeWidth="40"
              />

              {/* Players */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={colors.primaryCyan}
                strokeWidth="40"
                strokeDasharray={getDashArray(68)}
                strokeDashoffset="0"
              />

              {/* Clubs */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke={colors.primaryMagenta}
                strokeWidth="40"
                strokeDasharray={getDashArray(22)}
                strokeDashoffset={-(68 / 100) * CIRCUMFERENCE}
              />

              {/* Scouts (Blend) */}
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#blendGradient)"
                strokeWidth="40"
                strokeDasharray={getDashArray(10)}
                strokeDashoffset={-(90 / 100) * CIRCUMFERENCE}
              />
            </svg>

            {/* Legend */}
            <div className="grid grid-cols-3 gap-6 w-full text-center">
              {userDistribution.map(item => {
                const color =
                  item.label === 'Players'
                    ? colors.primaryCyan
                    : item.label === 'Clubs'
                    ? colors.primaryMagenta
                    : `linear-gradient(135deg, ${colors.primaryCyan}, ${colors.primaryMagenta})`

                return (
                  <div key={item.label}>
                    <div
                      className="w-3 h-3 rounded-full mx-auto mb-2"
                      style={{ background: color }}
                    />
                    <div className="text-sm text-gray-400">{item.label}</div>
                    <div className="text-xl font-bold text-white">{item.value}%</div>
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
