'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import Link from 'next/link'
import { DollarSign, Star, TrendingUp, Edit, Trash2 } from 'lucide-react'

export default function MonetizationPage() {
  const theme = useSelector(state => state.theme)

  const stats = [
    {
      icon: DollarSign,
      label: 'Total Revenue',
      value: '€24,890',
      subtitle: '+23% from last month',
      color: theme.colors.primaryCyan
    },
    {
      icon: Star,
      label: 'Featured Listings',
      value: '48',
      subtitle: 'Active featured items',
      color: theme.colors.primaryCyan
    },
    {
      icon: TrendingUp,
      label: 'Ad Revenue',
      value: '€8,450',
      subtitle: '+15% from last month',
      color: theme.colors.primaryCyan
    }
  ]

  const adBanners = [
    {
      id: 1,
      name: 'Top Banner - Homepage',
      size: '1200x200',
      position: 'News Header',
      advertiser: 'Nike Sports',
      clicks: 1234,
      status: 'Active'
    },
    {
      id: 2,
      name: 'Sidebar Ad 1',
      size: '300x250',
      position: 'News Sidebar',
      advertiser: 'Adidas Football',
      clicks: 892,
      status: 'Active'
    },
    {
      id: 3,
      name: 'In-Article Ad',
      size: '728x90',
      position: 'Between Articles',
      advertiser: 'Puma Athletics',
      clicks: 456,
      status: 'Active'
    },
    {
      id: 4,
      name: 'Bottom Banner',
      size: '970x90',
      position: 'News Footer',
      advertiser: 'Under Armour',
      clicks: 0,
      status: 'Inactive'
    }
  ]

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Page Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
        <h1 
          className="text-3xl lg:text-4xl font-bold"
          style={{
            background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Monetization
        </h1>
        
        <Link href="/admin/monetization/create">
          <button 
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center gap-2 w-full lg:w-auto justify-center"
            style={{
              backgroundColor: theme.colors.neonAccent
            }}
          >
            + Add New Ad Slot
          </button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-8">
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
              <div 
                className="w-12 h-12 rounded-lg flex items-center justify-center mb-4"
                style={{
                  background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)'
                }}
              >
                <Icon className="w-6 h-6" style={{ color: stat.color }} />
              </div>
              <div className="text-sm text-gray-400 mb-2">{stat.label}</div>
              <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-xs" style={{ color: '#4ADE80' }}>{stat.subtitle}</div>
            </div>
          )
        })}
      </div>

      {/* Ad Banner Management Section */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-white mb-4">Ad Banner Management</h2>
      </div>

      {/* Ad Banners Table */}
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
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Ad Name</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Size</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Position</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Advertiser</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Clicks</th>
                <th className="text-left px-6 py-4 text-sm font-semibold text-gray-400">Status</th>
                <th className="text-center px-6 py-4 text-sm font-semibold text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adBanners.map((ad) => (
                <tr 
                  key={ad.id}
                  className="border-t transition-colors hover:bg-opacity-50"
                  style={{ borderColor: `${theme.colors.primaryCyan}1A` }}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                        style={{
                          background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)'
                        }}
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: theme.colors.primaryCyan }}>
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                          <circle cx="8.5" cy="8.5" r="1.5"></circle>
                          <polyline points="21 15 16 10 5 21"></polyline>
                        </svg>
                      </div>
                      <div className="text-white font-medium text-sm">{ad.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-300">{ad.size}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{ad.position}</td>
                  <td className="px-6 py-4 text-sm text-gray-300">{ad.advertiser}</td>
                  <td className="px-6 py-4">
                    <span
                      className="text-sm font-semibold"
                      style={{ color: theme.colors.primaryCyan }}
                    >
                      {ad.clicks.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: ad.status === 'Active' ? 'rgba(5, 223, 114, 0.2)' : 'rgba(107, 114, 128, 0.2)',
                        color: ad.status === 'Active' ? '#05DF72' : '#9CA3AF'
                      }}
                    >
                      {ad.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-center gap-2">
                      <Link href={`/admin/monetization/${ad.id}/edit`}>
                        <button
                          className="p-2 rounded-lg transition-colors"
                          style={{ color: theme.colors.primaryCyan }}
                          title="Edit"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
                      <button
                        className="p-2 rounded-lg transition-colors hover:bg-red-500 hover:bg-opacity-20"
                        style={{ color: '#EF4444' }}
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
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