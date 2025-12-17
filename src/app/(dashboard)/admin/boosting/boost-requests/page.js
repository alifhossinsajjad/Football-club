'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Check, X } from 'lucide-react'

export default function BoostRequestsPage() {
  const theme = useSelector(state => state.theme)

  const [requests, setRequests] = useState([
    {
      id: 1,
      type: 'Player',
      profileName: 'David Johnson',
      requestedBy: 'david.j@email.com',
      duration: '1 Month',
      price: 30,
      requestDate: '2025-01-15 10:30'
    },
    {
      id: 2,
      type: 'Event',
      profileName: 'Elite Training Camp',
      requestedBy: 'Chelsea FC Academy',
      duration: 'Until Event',
      price: 20,
      requestDate: '2025-01-15 09:15'
    },
    {
      id: 3,
      type: 'Player',
      profileName: 'Ana Martinez',
      requestedBy: 'ana.m@email.com',
      duration: '1 Month',
      price: 30,
      requestDate: '2025-01-14 16:45'
    }
  ])

  const handleApprove = (id) => {
    // Remove from pending requests
    setRequests(requests.filter(r => r.id !== id))
    // Show success message (you can add toast here)
    console.log(`Request ${id} approved`)
  }

  const handleReject = (id) => {
    // Remove from pending requests
    setRequests(requests.filter(r => r.id !== id))
    // Show rejection message (you can add toast here)
    console.log(`Request ${id} rejected`)
  }

  const getTypeStyle = (type) => {
    if (type === 'Player') {
      return {
        backgroundColor: `${theme.colors.primaryCyan}33`,
        color: theme.colors.primaryCyan
      }
    } else if (type === 'Event') {
      return {
        backgroundColor: `${theme.colors.primaryMagenta}33`,
        color: theme.colors.primaryMagenta
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
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Type</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Profile/Event Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Requested By</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Duration</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Price</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Request Date</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>

            {/* Table Body */}
            <tbody>
              {requests.map((request) => (
                <tr 
                  key={request.id}
                  className="border-t transition-colors hover:bg-opacity-50"
                  style={{
                    borderColor: `${theme.colors.primaryCyan}1A`
                  }}
                >
                  {/* Type Badge */}
                  <td className="px-6 py-4">
                    <span 
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={getTypeStyle(request.type)}
                    >
                      {request.type}
                    </span>
                  </td>

                  {/* Profile/Event Name */}
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    {request.profileName}
                  </td>

                  {/* Requested By */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {request.requestedBy}
                  </td>

                  {/* Duration */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {request.duration}
                  </td>

                  {/* Price */}
                  <td className="px-6 py-4 text-sm text-white font-medium">
                    €{request.price}
                  </td>

                  {/* Request Date */}
                  <td className="px-6 py-4 text-sm text-gray-300">
                    {request.requestDate}
                  </td>

                  {/* Actions */}
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold text-white transition-all hover:scale-105"
                        style={{
                          backgroundColor: theme.colors.primaryCyan,
                          backgroundImage: 'none'
                        }}
                      >
                        ✓ Approve
                      </button>
                      <button
                        onClick={() => handleReject(request.id)}
                        className="px-4 py-2 rounded-lg text-xs font-semibold transition-all hover:scale-105"
                        style={{
                          backgroundColor: 'rgba(239, 68, 68, 0.2)',
                          color: '#EF4444',
                          backgroundImage: 'none'
                        }}
                      >
                        ✕ Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State (if no requests) */}
        {requests.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-400 text-sm">No pending boost requests</p>
          </div>
        )}
      </div>
    </div>
  )
}