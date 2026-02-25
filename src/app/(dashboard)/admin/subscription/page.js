'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { Users, DollarSign, TrendingUp, Calendar, Eye, Edit2, Download } from 'lucide-react'

export default function SubscriptionTrackingPage() {
  const theme = useSelector(state => state.theme)
  const [activeFilter, setActiveFilter] = useState('all')

  const stats = [
    {
      icon: Users,
      label: 'Total Subscribers',
      value: '3,842',
      change: '+15%',
      isPositive: true
    },
    {
      icon: DollarSign,
      label: 'Monthly Revenue',
      value: '€38,420',
      change: '+23%',
      isPositive: true
    },
    {
      icon: TrendingUp,
      label: 'Active Subscriptions',
      value: '3,456',
      change: '+12%',
      isPositive: true
    },
    {
      icon: Calendar,
      label: 'Expiring This Month',
      value: '386',
      change: '-5%',
      isPositive: false
    }
  ]

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'active', label: 'Active' },
    { id: 'cancelled', label: 'Cancelled' },
    { id: 'expired', label: 'Expired' }
  ]

  const subscriptions = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      plan: 'NextGen Pro',
      status: 'Active',
      nextBilling: '15/01/2026',
      amount: '€9.99',
      autoRenew: 'Enabled'
    },
    {
      id: 2,
      name: 'Sarah Player',
      email: 'sarah@example.com',
      plan: 'NextGen Pro',
      status: 'Active',
      nextBilling: '20/01/2026',
      amount: '€9.99',
      autoRenew: 'Enabled'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      plan: 'NextGen Pro',
      status: 'Cancelled',
      nextBilling: 'N/A',
      amount: '€9.99',
      autoRenew: 'Disabled'
    },
    {
      id: 4,
      name: 'Emma Wilson',
      email: 'emma@example.com',
      plan: 'NextGen Pro',
      status: 'Active',
      nextBilling: '18/01/2026',
      amount: '€9.99',
      autoRenew: 'Enabled'
    },
    {
      id: 5,
      name: 'Alex Brown',
      email: 'alex@example.com',
      plan: 'NextGen Pro',
      status: 'Expired',
      nextBilling: 'N/A',
      amount: '€9.99',
      autoRenew: 'Disabled'
    }
  ]

  const getStatusStyle = (status) => {
    if (status === 'Active') {
      return {
        backgroundColor: 'rgba(0, 201, 80, 0.2)',
        color: 'rgba(5, 223, 114, 1)'
      }
    } else if (status === 'Cancelled') {
      return {
        backgroundColor: 'rgba(253, 199, 0, 0.2)',
        color: 'rgba(253, 199, 0, 1)'
      }
    } else if (status === 'Expired') {
      return {
        backgroundColor: 'rgba(239, 68, 68, 0.2)',
        color: '#EF4444'
      }
    }
  }

  const getAutoRenewStyle = (autoRenew) => {
    if (autoRenew === 'Enabled') {
      return {
        color: 'rgba(5, 223, 114, 1)'
      }
    } else {
      return {
        color: '#9CA3AF'
      }
    }
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Page Header */}
      <div className="mb-6">
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
          Subscription Tracking
        </h1>
        <p className="text-gray-400 text-sm">Track and manage all user subscriptions</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
        {stats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div 
              key={index}
              className="rounded-lg p-6 border transition-all hover:scale-105"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`
              }}
            >
              <div className="flex items-start justify-between mb-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)'
                  }}
                >
                  <Icon className="w-6 h-6" style={{ color: theme.colors.primaryCyan }} />
                </div>
                <span 
                  className="text-sm font-semibold"
                  style={{ 
                    color: stat.isPositive ? 'rgba(5, 223, 114, 1)' : 'rgba(253, 199, 0, 1)'
                  }}
                >
                  {stat.change}
                </span>
              </div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-white">{stat.value}</div>
            </div>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row justify-end gap-3 mb-6">
        <button 
          className="px-6 py-3 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.colors.primaryCyan}33`,
            color: '#9CA3AF'
          }}
        >
          <Download className="w-5 h-5" />
          Export Data
        </button>
        <Link href="/admin/subscription/plans">
          <button 
            className="w-full sm:w-auto px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{
              backgroundColor: theme.colors.neonAccent
            }}
          >
            + Manage Plans
          </button>
        </Link>
      </div>

      {/* Search and Filters */}
      <div 
        className="rounded-lg border p-4 mb-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        <div className="flex flex-col lg:flex-row gap-4">
          {/* Search */}
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search by name, email, or user ID..."
              className="w-full h-11 px-4 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 transition-all text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`
              }}
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-2 overflow-x-auto">
            {filters.map(filter => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className="px-6 py-2.5 rounded-lg font-semibold text-sm whitespace-nowrap transition-all"
                style={
                  activeFilter === filter.id
                    ? {
                        background: 'linear-gradient(180deg, #00E5FF 0%, #9C27B0 100%)',
                        color: '#FFFFFF'
                      }
                    : {
                        backgroundColor: 'transparent',
                        color: '#9CA3AF'
                      }
                }
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div 
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr style={{ backgroundColor: theme.colors.backgroundDark }}>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">User</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Email</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Plan</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Next Billing</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Amount</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Auto-Renew</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((sub) => (
                <tr 
                  key={sub.id}
                  className="border-t transition-colors hover:bg-opacity-50"
                  style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                >
                  <td className="px-6 py-4 text-sm text-white font-medium">{sub.name}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{sub.email}</td>
                  <td className="px-6 py-4">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: theme.colors.primaryCyan }}
                    >
                      {sub.plan}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={getStatusStyle(sub.status)}
                    >
                      {sub.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{sub.nextBilling}</td>
                  <td className="px-6 py-4 text-sm text-white font-semibold">{sub.amount}</td>
                  <td className="px-6 py-4">
                    <span
                      className="text-sm font-semibold"
                      style={getAutoRenewStyle(sub.autoRenew)}
                    >
                      {sub.autoRenew}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/subscription/${sub.id}`}>
                        <button
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: theme.colors.primaryCyan }}
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        className="p-2 rounded-lg transition-colors"
                        style={{ color: theme.colors.primaryMagenta }}
                        title="Edit"
                      >
                        <Edit2 className="w-4 h-4" />
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