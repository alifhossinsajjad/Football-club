'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { ArrowLeft, Search, Users, TrendingUp, Target, Star } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function BoostPlayerProfilePage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()

  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [selectedDuration, setSelectedDuration] = useState('1')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const players = [
    {
      id: 1,
      name: 'Marcus Silva',
      position: 'Forward',
      country: 'Brazil',
      age: 17,
      club: 'FC Barcelona Youth',
      image: '/MarcusSilva-1.jpg'
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      position: 'Midfielder',
      country: 'Spain',
      age: 16,
      club: 'Real Madrid Academy',
      image: '/EmmaRodriguez-2.jpg'
    },
    {
      id: 3,
      name: 'David Johnson',
      position: 'Defender',
      country: 'England',
      age: 18,
      club: 'Manchester United U18',
      image: '/LiamOConnor-3.jpg'
    }
  ]

  const durations = [
    { months: '1', price: 30, discount: null },
    { months: '3', price: 85, discount: 'Save 6%' },
    { months: '6', price: 160, discount: 'Save 11%' },
    { months: '12', price: 300, discount: 'Save 17%' }
  ]

  const benefits = [
    {
      icon: TrendingUp,
      title: 'Featured Placement',
      description: 'Top position in directory listings'
    },
    {
      icon: Users,
      title: '4x More Visibility',
      description: 'Increased profile views and engagement'
    },
    {
      icon: Target,
      title: 'Priority in Search',
      description: 'Appear first in search results'
    },
    {
      icon: Star,
      title: 'Special Badge',
      description: 'Featured badge on profile'
    }
  ]

  const filteredPlayers = players.filter(player =>
    player.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
    player.club.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getSelectedPrice = () => {
    const duration = durations.find(d => d.months === selectedDuration)
    return duration ? duration.price : 0
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="flex items-center justify-center w-10 h-10 rounded-lg transition-all hover:scale-110"
          style={{
            backgroundColor: `${theme.colors.primaryCyan}20`,
            color: theme.colors.primaryCyan
          }}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 
            className="text-3xl lg:text-4xl font-bold mb-2"
            style={{
              background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              display: 'inline-block'
            }}
          >
            Boost Player Profile
          </h1>
          <p className="text-gray-400 text-sm">Feature a player profile to increase visibility and engagement</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Steps */}
        <div className="lg:col-span-2 space-y-6">
          {/* Step 1: Select Player */}
          <div 
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Step 1: Select Player</h2>
            
            {/* Search Bar */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for player name, club, or position..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`
                }}
              />
            </div>

            {/* Player List */}
            <div className="space-y-3">
              {filteredPlayers.map(player => (
                <div
                  key={player.id}
                  onClick={() => setSelectedPlayer(player)}
                  className="flex items-center gap-4 p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: selectedPlayer?.id === player.id ? `${theme.colors.primaryCyan}10` : theme.colors.backgroundDark,
                    borderColor: selectedPlayer?.id === player.id ? theme.colors.primaryCyan : `${theme.colors.primaryCyan}1A`
                  }}
                >
                  <div className="relative w-12 h-12 rounded-full overflow-hidden flex-shrink-0">
                    <div 
                      className="absolute inset-0 rounded-full"
                      style={{
                        background: `linear-gradient(135deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
                        padding: '2px'
                      }}
                    >
                      <div className="relative w-full h-full rounded-full overflow-hidden">
                        <Image
                          src={player.image}
                          alt={player.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-white font-medium">{player.name}</div>
                    <div className="text-sm text-gray-400">
                      {player.position} • {player.country} • Age {player.age}
                    </div>
                    <div className="text-xs text-gray-500">{player.club}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 2: Choose Boost Duration */}
          <div 
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Step 2: Choose Boost Duration</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {durations.map(duration => (
                <div
                  key={duration.months}
                  onClick={() => setSelectedDuration(duration.months)}
                  className="relative p-4 rounded-lg border cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: selectedDuration === duration.months ? `${theme.colors.primaryCyan}10` : theme.colors.backgroundDark,
                    borderColor: selectedDuration === duration.months ? theme.colors.primaryCyan : `${theme.colors.primaryCyan}33`
                  }}
                >
                  {duration.discount && (
                    <div 
                      className="absolute top-2 right-2 px-2 py-1 rounded text-xs font-semibold"
                      style={{
                        backgroundColor: `${theme.colors.primaryMagenta}33`,
                        color: theme.colors.primaryMagenta
                      }}
                    >
                      {duration.discount}
                    </div>
                  )}
                  <div className="text-white font-medium mb-1">{duration.months} Month{duration.months !== '1' ? 's' : ''}</div>
                  <div 
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    €{duration.price}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Step 3: Set Date Range */}
          <div 
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-4">Step 3: Set Date Range</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Start Date</label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`
                  }}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">End Date</label>
                <Input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  placeholder="dd/mm/yyyy"
                  className="w-full"
                  style={{
                    backgroundColor: theme.colors.backgroundDark,
                    borderColor: `${theme.colors.primaryCyan}33`
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Boost Summary */}
        <div className="lg:col-span-1 space-y-6">
          {/* Boost Summary Card */}
          <div 
            className="rounded-lg border p-6"
            style={{
              background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.15) 0%, rgba(156, 39, 176, 0.15) 100%)',
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <h2 className="text-xl font-semibold text-white mb-6">Boost Summary</h2>
            
            {/* Preview Circle */}
            <div className="flex flex-col items-center mb-6">
              <div 
                className="w-32 h-32 rounded-full flex items-center justify-center mb-4"
                style={{
                  backgroundColor: `${theme.colors.primaryCyan}10`,
                  border: `2px dashed ${theme.colors.primaryCyan}40`
                }}
              >
                <Target className="w-16 h-16" style={{ color: `${theme.colors.primaryCyan}60` }} />
              </div>
              <p className="text-gray-400 text-sm text-center">Select a player to see pricing</p>
            </div>

            {/* Activate Boost Button */}
            <button 
              className="w-full py-3 rounded-lg font-semibold text-white transition-all hover:scale-[1.02] flex items-center justify-center gap-2"
              style={{
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)'
              }}
              disabled={!selectedPlayer}
            >
              <TrendingUp className="w-5 h-5" />
              Activate Boost
            </button>
          </div>

          {/* Boost Benefits Card */}
          <div 
            className="rounded-lg border p-6"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Star className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
              <h3 className="text-white font-semibold">Boost Benefits</h3>
            </div>
            
            <div className="space-y-3">
              {benefits.map((benefit, index) => {
                const Icon = benefit.icon
                return (
                  <div key={index} className="flex items-start gap-3">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{
                        backgroundColor: 'rgba(0, 229, 255, 0.2)'
                      }}
                    >
                      <Icon className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                    </div>
                    <div className="flex-1">
                      <div className="text-white text-sm font-medium">{benefit.title}</div>
                      <div className="text-gray-400 text-xs">{benefit.description}</div>
                    </div>
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