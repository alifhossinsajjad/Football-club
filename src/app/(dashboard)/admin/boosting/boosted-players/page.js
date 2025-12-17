'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { TrendingUp, X } from 'lucide-react'

export default function BoostedPlayersPage() {
  const theme = useSelector(state => state.theme)

  const [players, setPlayers] = useState([
    {
      id: 1,
      name: 'Marcus Silva',
      country: 'Brazil',
      image: '/MarcusSilva-1.jpg',
      position: 'Forward',
      startDate: '2025-01-01',
      endDate: '2025-02-01',
      views: 1234,
      price: 30,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Emma Rodriguez',
      country: 'Spain',
      image: '/EmmaRodriguez-2.jpg',
      position: 'Midfielder',
      startDate: '2025-01-05',
      endDate: '2025-02-05',
      views: 892,
      price: 30,
      status: 'Active'
    },
    {
      id: 3,
      name: "Liam O'Connor",
      country: 'Ireland',
      image: '/LiamOConnor-3.jpg',
      position: 'Defender',
      startDate: '2024-12-28',
      endDate: '2025-01-28',
      views: 2103,
      price: 30,
      status: 'Expiring Soon'
    },
    {
      id: 4,
      name: 'Sophie Dubois',
      country: 'France',
      image: '/SophieDubois-4.jpg',
      position: 'Goalkeeper',
      startDate: '2025-01-10',
      endDate: '2025-02-10',
      views: 567,
      price: 30,
      status: 'Active'
    }
  ])

  const handleRemove = (id) => {
    setPlayers(players.filter(p => p.id !== id))
  }

  const getStatusStyle = (status) => {
    if (status === 'Active') {
      return {
        backgroundColor: 'rgba(5, 223, 114, 0.2)',
        color: '#05DF72'
      }
    } else if (status === 'Expiring Soon') {
      return {
        backgroundColor: 'rgba(255, 193, 7, 0.2)',
        color: '#FFC107'
      }
    }
  }

  return (
    <div className="w-full">
      {/* Table Container */}
      <div 
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        {/* Responsive Table Wrapper */}
        <div className="overflow-x-auto">
          <table className="w-full">
            {/* Table Header */}
            <thead>
              <tr 
                style={{
                  backgroundColor: theme.colors.backgroundDark
                }}
              >
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Player</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Position</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Start Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">End Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Views</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {players.map((player, index) => (
                <tr 
                  key={player.id}
                  className="border-t transition-colors hover:bg-opacity-50"
                  style={{
                    borderColor: `${theme.colors.primaryCyan}1A`
                  }}
                >
                  {/* Player Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={player.image}
                          alt={player.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{player.name}</div>
                        <div className="text-gray-400 text-xs">{player.country}</div>
                      </div>
                    </div>
                  </td>

                  {/* Position */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {player.position}
                  </td>

                  {/* Start Date */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {player.startDate}
                  </td>

                  {/* End Date */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {player.endDate}
                  </td>

                  {/* Views */}
                  <td className="px-6 py-4">
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: theme.colors.primaryCyan }}
                    >
                      {player.views.toLocaleString()}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    €{player.price}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={getStatusStyle(player.status)}
                    >
                      {player.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{
                          color: theme.colors.primaryCyan
                        }}
                        title="View Details"
                      >
                        <TrendingUp className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleRemove(player.id)}
                        className="p-2 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20"
                        style={{
                          color: '#EF4444'
                        }}
                        title="Remove"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}