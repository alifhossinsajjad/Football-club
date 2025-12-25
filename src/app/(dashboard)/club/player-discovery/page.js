'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { MessageSquare } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function ClubPlayerDiscoveryPage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()
  const [selectedPlayer, setSelectedPlayer] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [position, setPosition] = useState('All Positions')
  const [nationality, setNationality] = useState('All Countries')
  const [ageRange, setAgeRange] = useState('All Ages')

  const players = [
    {
      id: 1,
      name: 'John Doe',
      position: 'Midfielder',
      avatar: '/john_doe2.jpg',
      nationality: 'Spain',
      countryCode: 'ES',
      age: '19 years',
      rating: '85/100'
    },
    {
      id: 2,
      name: 'Sarah Player',
      position: 'Forward',
      avatar: '/sarah_player.jpg',
      nationality: 'Portugal',
      countryCode: 'PT',
      age: '18 years',
      rating: '82/100'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      position: 'Defender',
      avatar: '/mike_johnson.jpg',
      nationality: 'France',
      countryCode: 'FR',
      age: '20 years',
      rating: '88/100'
    },
    {
      id: 4,
      name: 'Emma Garcia',
      position: 'Goalkeeper',
      avatar: '/emma_garcia.jpg',
      nationality: 'Spain',
      countryCode: 'ES',
      age: '17 years',
      rating: '79/100'
    }
  ]

  const handleViewProfile = (playerId) => {
    router.push(`/club/player-discovery/${playerId}`)
  }

  const handleMessageClick = (player) => {
    setSelectedPlayer(player)
  }

  const closeModal = () => {
    setSelectedPlayer(null)
  }

  return (
    <>
      <div className="space-y-6">
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
            Player Discovery
          </h1>
        </div>

        {/* Filters */}
        <div 
          className="border rounded-lg p-4 lg:p-6"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Position Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Position</label>
              <select
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF',
                }}
              >
                <option value="All Positions">All Positions</option>
                <option value="Goalkeeper">Goalkeeper</option>
                <option value="Defender">Defender</option>
                <option value="Midfielder">Midfielder</option>
                <option value="Forward">Forward</option>
              </select>
            </div>

            {/* Nationality Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Nationality</label>
              <select
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF',
                }}
              >
                <option value="All Countries">All Countries</option>
                <option value="Spain">Spain</option>
                <option value="Portugal">Portugal</option>
                <option value="France">France</option>
              </select>
            </div>

            {/* Age Range Filter */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Age Range</label>
              <select
                value={ageRange}
                onChange={(e) => setAgeRange(e.target.value)}
                className="w-full px-4 py-2 rounded-lg h-10 text-sm"
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                  color: '#FFFFFF',
                }}
              >
                <option value="All Ages">All Ages</option>
                <option value="16-18">16-18 years</option>
                <option value="18-21">18-21 years</option>
              </select>
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-white mb-2">Search</label>
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name..."
                style={{
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Players Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {players.map((player) => (
            <div
              key={player.id}
              className="border rounded-lg p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              {/* Player Header */}
              <div className="flex items-start gap-4 mb-4">
                <img
                  src={player.avatar}
                  alt={player.name}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-white">{player.name}</h3>
                  <p className="text-sm text-gray-400">{player.position}</p>
                </div>
              </div>

              {/* Player Info */}
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Nationality:</span>
                  <span className="text-white flex items-center gap-2">
                    <img 
                      src={`https://flagcdn.com/w40/${player.countryCode.toLowerCase()}.png`}
                      alt={player.nationality}
                      className="w-5 h-4 object-cover rounded-sm"
                    />
                    {player.nationality}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Age:</span>
                  <span className="text-white">{player.age}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Rating:</span>
                  <span 
                    className="font-bold"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    {player.rating}
                  </span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleViewProfile(player.id)}
                  className="flex-1 py-2 rounded-lg font-semibold text-sm transition-all"
                  style={{ backgroundColor: theme.colors.neonAccent, color: 'white' }}
                >
                  View Profile
                </button>
                <button
                  onClick={() => handleMessageClick(player)}
                  className="p-2 rounded-lg border transition-all"
                  style={{
                    borderColor: theme.colors.primaryCyan,
                    backgroundColor: 'transparent',
                  }}
                >
                  <MessageSquare 
                    className="w-5 h-5"
                    style={{ color: theme.colors.primaryCyan }}
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Message Modal */}
      {selectedPlayer && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={closeModal}
          />

          {/* Modal */}
          <div 
            className="fixed inset-0 flex items-center justify-center z-50 p-4"
            onClick={closeModal}
          >
            <div 
              className="w-full max-w-2xl border rounded-lg flex flex-col max-h-[80vh]"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}80`,
              }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div 
                className="p-4 border-b flex items-center justify-between"
                style={{ borderColor: `${theme.colors.primaryCyan}33` }}
              >
                <div className="flex items-center gap-3">
                  <img 
                    src={selectedPlayer.avatar}
                    alt={selectedPlayer.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="text-white font-semibold">{selectedPlayer.name}</p>
                    <p className="text-xs text-gray-400">Active now</p>
                  </div>
                </div>
                <button 
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors text-2xl"
                >
                  ×
                </button>
              </div>

              {/* Messages Area */}
              <div 
                className="flex-1 p-6 overflow-y-auto space-y-4"
                style={{ backgroundColor: theme.colors.backgroundDark }}
              >
                <div className="flex justify-start">
                  <div
                    className="max-w-md px-4 py-3 rounded-lg"
                    style={{ backgroundColor: theme.colors.backgroundCard }}
                  >
                    <p className="text-white text-sm mb-1">Hello, I'm very interested in your upcoming trial.</p>
                    <p className="text-xs opacity-70 text-white">10:30 AM</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div
                    className="max-w-md px-4 py-3 rounded-lg"
                    style={{ backgroundColor: theme.colors.primaryMagenta }}
                  >
                    <p className="text-white text-sm mb-1">Hi {selectedPlayer.name}! Thank you for your interest. I'd be happy to provide more details.</p>
                    <p className="text-xs opacity-70 text-white">10:45 AM</p>
                  </div>
                </div>

                <div className="flex justify-start">
                  <div
                    className="max-w-md px-4 py-3 rounded-lg"
                    style={{ backgroundColor: theme.colors.backgroundCard }}
                  >
                    <p className="text-white text-sm mb-1">That would be great! What are the requirements?</p>
                    <p className="text-xs opacity-70 text-white">11:00 AM</p>
                  </div>
                </div>

                <div className="flex justify-end">
                  <div
                    className="max-w-md px-4 py-3 rounded-lg"
                    style={{ backgroundColor: theme.colors.primaryMagenta }}
                  >
                    <p className="text-white text-sm mb-1">The trial is open to players aged 16-21. You'll need to bring your sports gear and be prepared for physical tests.</p>
                    <p className="text-xs opacity-70 text-white">11:15 AM</p>
                  </div>
                </div>
              </div>

              {/* Message Input */}
              <div 
                className="p-4 border-t"
                style={{ borderColor: `${theme.colors.primaryCyan}33` }}
              >
                <div className="flex gap-3">
                  <Input
                    placeholder="Type your message..."
                    className="flex-1"
                    style={{
                      backgroundColor: theme.colors.backgroundDark,
                      borderColor: `${theme.colors.primaryCyan}33`,
                    }}
                  />
                  <button
                    className="px-6 py-2 rounded-lg font-semibold transition-all"
                    style={{ backgroundColor: theme.colors.neonAccent, color: 'white' }}
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}