'use client'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, CheckCircle, Edit3, Trash2 } from 'lucide-react'

export default function PlanManagementPage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()

  const plan = {
    name: 'NextGen Pro',
    type: 'Yearly Plan',
    price: '€9.99',
    billingPeriod: 'per year',
    features: [
      'Exclusive scout network access',
      'Premium training content',
      'Direct messaging system',
      'Full event access'
    ],
    subscribers: '3,842',
    status: 'active'
  }

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-8 gap-4">
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
        <div className="flex-1">
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
            Plan Management
          </h1>
          <p className="text-gray-400 text-sm mt-1">Create and manage subscription plans</p>
        </div>
        <Link href="/admin/subscription/plans/create">
          <button 
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105 flex items-center gap-2"
            style={{
              backgroundColor: theme.colors.neonAccent
            }}
          >
            + Create New Plan
          </button>
        </Link>
      </div>

      {/* Plan Card */}
      <div 
        className="rounded-lg border p-6 max-w-md"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-6">
          <div>
            <h2 
              className="text-2xl font-bold mb-1"
              style={{ color: theme.colors.primaryCyan }}
            >
              {plan.name}
            </h2>
            <p className="text-gray-400 text-sm">{plan.type}</p>
          </div>
          <span
            className="inline-block px-3 py-1 rounded-full text-xs font-semibold capitalize"
            style={{
              backgroundColor: 'rgba(0, 201, 80, 0.2)',
              color: 'rgba(5, 223, 114, 1)'
            }}
          >
            {plan.status}
          </span>
        </div>

        {/* Price */}
        <div className="mb-6">
          <div className="text-4xl font-bold text-white mb-1">{plan.price}</div>
          <div className="text-gray-400 text-sm">{plan.billingPeriod}</div>
        </div>

        {/* Features */}
        <div className="mb-6">
          <p className="text-white font-semibold mb-3">Features:</p>
          <div className="space-y-2">
            {plan.features.map((feature, index) => (
              <div key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: 'rgba(5, 223, 114, 1)' }} />
                <span className="text-gray-300 text-sm">{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Subscribers */}
        <div 
          className="mb-6 pb-6 border-b p-4 rounded-lg"
          style={{ 
            borderColor: `${theme.colors.primaryCyan}1A`,
            backgroundColor: theme.colors.backgroundDark
          }}
        >
          <div className="flex items-center justify-between">
            <span className="text-gray-400 text-sm">Subscribers</span>
            <span className="text-white font-bold text-lg">{plan.subscribers}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Link href="/admin/subscription/plans/1/edit" className="flex-1">
            <button 
              className="w-full px-4 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
              style={{
                backgroundColor: `${theme.colors.primaryCyan}20`,
                color: theme.colors.primaryCyan
              }}
            >
              <Edit3 className="w-4 h-4" />
              Edit
            </button>
          </Link>
          <button 
            className="px-4 py-2.5 rounded-lg font-semibold transition-all hover:scale-105 flex items-center justify-center gap-2"
            style={{
              backgroundColor: 'rgba(239, 68, 68, 0.2)',
              color: '#EF4444'
            }}
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  )
}