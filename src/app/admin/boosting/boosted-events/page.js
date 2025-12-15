'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import Image from 'next/image'
import { TrendingUp, X } from 'lucide-react'

export default function BoostedEventsPage() {
  const theme = useSelector(state => state.theme)

  const [events, setEvents] = useState([
    {
      id: 1,
      name: 'Barcelona Youth Trial',
      image: '/Barcelona_Youth_Trial.png',
      club: 'FC Barcelona Academy',
      eventDate: '2025-02-15',
      boostUntil: '2025-02-15',
      clicks: 456,
      price: 20,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Summer Showcase 2025',
      image: '/Summer_Showcase_2025.png',
      club: 'Real Madrid Foundation',
      eventDate: '2025-07-10',
      boostUntil: '2025-07-10',
      clicks: 289,
      price: 20,
      status: 'Active'
    },
    {
      id: 3,
      name: 'Talent Scout Day',
      image: '/Talent_Scout_Day.png',
      club: 'Manchester United Academy',
      eventDate: '2025-03-20',
      boostUntil: '2025-03-20',
      clicks: 612,
      price: 20,
      status: 'Active'
    }
  ])

  const handleRemove = (id) => {
    setEvents(events.filter(e => e.id !== id))
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
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Event</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Club/Academy</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Event Date</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Boost Until</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Clicks</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {events.map((event) => (
                <tr 
                  key={event.id}
                  className="border-t transition-colors hover:bg-opacity-50"
                  style={{
                    borderColor: `${theme.colors.primaryCyan}1A`
                  }}
                >
                  {/* Event Info */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={event.image}
                          alt={event.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">{event.name}</div>
                      </div>
                    </div>
                  </td>

                  {/* Club/Academy */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {event.club}
                  </td>

                  {/* Event Date */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {event.eventDate}
                  </td>

                  {/* Boost Until */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {event.boostUntil}
                  </td>

                  {/* Clicks */}
                  <td className="px-6 py-4">
                    <span 
                      className="text-sm font-semibold"
                      style={{ color: theme.colors.primaryCyan }}
                    >
                      {event.clicks.toLocaleString()}
                    </span>
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    €{event.price}
                  </td>

                  {/* Status */}
                  <td className="px-6 py-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={getStatusStyle(event.status)}
                    >
                      {event.status}
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
                        onClick={() => handleRemove(event.id)}
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