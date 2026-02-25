'use client'

import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CreditCard, Activity, DollarSign, RotateCcw, Calendar, Clock } from 'lucide-react'

export default function SubscriptionDetailsPage() {
  const theme = useSelector(state => state.theme)
  const router = useRouter()

  const billingHistory = [
    {
      invoice: 'INV-2025-12',
      date: '15/12/2025',
      amount: '€9.99',
      status: 'Paid'
    },
    {
      invoice: 'INV-2025-11',
      date: '15/11/2025',
      amount: '€9.99',
      status: 'Paid'
    },
    {
      invoice: 'INV-2025-10',
      date: '15/10/2025',
      amount: '€9.99',
      status: 'Paid'
    },
    {
      invoice: 'INV-2025-09',
      date: '15/09/2025',
      amount: '€9.99',
      status: 'Paid'
    },
    {
      invoice: 'INV-2025-08',
      date: '15/08/2025',
      amount: '€9.99',
      status: 'Paid'
    }
  ]

  return (
    <div className="min-h-screen p-4 lg:p-8">
      {/* Header */}
      <div 
        className="mb-8 rounded-lg border p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={() => router.back()}
            className="flex items-center gap-2 text-sm transition-all hover:scale-105"
            style={{ color: theme.colors.primaryCyan }}
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Subscription Tracking
          </button>
        </div>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
              Subscription Details
            </h1>
            <p className="text-gray-400 text-sm">View and manage subscription information</p>
          </div>
          <button 
            className="px-6 py-3 rounded-lg font-semibold text-white transition-all hover:scale-105"
            style={{
              backgroundColor: 'rgba(240, 26, 10, 1)'
            }}
          >
            Cancel Subscription
          </button>
        </div>
      </div>

      {/* User Information */}
      <div 
        className="rounded-lg border p-6 mb-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        <h2 className="text-xl font-semibold text-white mb-6">User Information</h2>
        
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-white mb-1">John Doe</h3>
          <p className="text-gray-400 text-sm mb-4">john@example.com</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gray-400 mb-1">User ID</p>
              <p className="text-white font-medium">USR-12345</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Role</p>
              <p className="text-white font-medium">Player</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Joined Date</p>
              <p className="text-white font-medium">January 15, 2024</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Last Login</p>
              <p className="text-white font-medium">2 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Subscription Details */}
      <div 
        className="rounded-lg border p-6 mb-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        <h2 className="text-xl font-semibold text-white mb-6">Subscription Details</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.colors.backgroundDark }}
          >
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
              <p className="text-xs text-gray-400">Plan</p>
            </div>
            <p className="text-white font-semibold text-lg">NextGen Pro</p>
          </div>
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.colors.backgroundDark }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Activity className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
              <p className="text-xs text-gray-400">Status</p>
            </div>
            <span
              className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
              style={{
                backgroundColor: 'rgba(0, 201, 80, 0.2)',
                color: 'rgba(5, 223, 114, 1)'
              }}
            >
              Active
            </span>
          </div>
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.colors.backgroundDark }}
          >
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
              <p className="text-xs text-gray-400">Amount</p>
            </div>
            <p className="text-white font-semibold text-lg">€9.99</p>
            <p className="text-xs text-gray-400">Monthly</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.colors.backgroundDark }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
              <p className="text-xs text-gray-400">Start Date</p>
            </div>
            <p className="text-white font-semibold">15/01/2026</p>
          </div>
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.colors.backgroundDark }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
              <p className="text-xs text-gray-400">Next Billing</p>
            </div>
            <p className="text-white font-semibold">15/01/2026</p>
          </div>
          <div 
            className="p-4 rounded-lg"
            style={{ backgroundColor: theme.colors.backgroundDark }}
          >
            <div className="flex items-center gap-2 mb-2">
              <RotateCcw className="w-4 h-4" style={{ color: theme.colors.primaryCyan }} />
              <p className="text-xs text-gray-400">Auto-Renew</p>
            </div>
            <span
              className="text-sm font-semibold"
              style={{ color: 'rgba(5, 223, 114, 1)' }}
            >
              Enabled
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8 pt-6 border-t" style={{ borderColor: `${theme.colors.primaryCyan}1A` }}>
          <div>
            <p className="text-xs text-gray-400 mb-1">Payment Method</p>
            <p className="text-white font-medium">Visa •••• 4242</p>
          </div>
          <div>
            <p className="text-xs text-gray-400 mb-1">Transaction ID</p>
            <p className="text-white font-medium">TXN-2025-12345</p>
          </div>
        </div>
      </div>

      {/* Billing History */}
      <div 
        className="rounded-lg border overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`
        }}
      >
        <div className="p-6">
          <h2 className="text-xl font-semibold text-white">Billing History</h2>
        </div>
        
        <div className="space-y-0">
          {billingHistory.map((item, index) => (
            <div 
              key={index}
              className="flex items-center justify-between px-6 py-4 border-t"
              style={{ 
                borderColor: `${theme.colors.primaryCyan}1A`,
                backgroundColor: theme.colors.backgroundDark
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{
                    background: 'linear-gradient(180deg, rgba(0, 229, 255, 0.2) 0%, rgba(156, 39, 176, 0.2) 100%)'
                  }}
                >
                  <CreditCard className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                </div>
                <div>
                  <p className="text-white font-medium text-sm">{item.invoice}</p>
                  <p className="text-gray-400 text-xs">{item.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="text-white font-semibold">{item.amount}</p>
                <span
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold"
                  style={{
                    backgroundColor: 'rgba(0, 201, 80, 0.2)',
                    color: 'rgba(5, 223, 114, 1)'
                  }}
                >
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}