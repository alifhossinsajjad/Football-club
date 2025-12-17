'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { showSuccessToast } from '@/components/ui/toast'

export default function MonetizationPage() {
  const theme = useSelector(state => state.theme)

  // Profile Boosting Pricing
  const [featuredPlayerPrice, setFeaturedPlayerPrice] = useState('30.00')
  const [featuredEventPrice, setFeaturedEventPrice] = useState('20.00')
  const [autoBoostRenewals, setAutoBoostRenewals] = useState(true)
  const [adminApprovalBoosts, setAdminApprovalBoosts] = useState(true)

  // Featured Listings
  const [maxFeaturedPlayers, setMaxFeaturedPlayers] = useState('10')
  const [maxFeaturedEvents, setMaxFeaturedEvents] = useState('5')
  const [boostDuration, setBoostDuration] = useState('30')
  const [showBoostBadge, setShowBoostBadge] = useState(true)

  // Advertising
  const [enableAdBanner, setEnableAdBanner] = useState(true)

  // Revenue Tracking
  const [enableRevenueDashboard, setEnableRevenueDashboard] = useState(true)
  const [trackConversionRates, setTrackConversionRates] = useState(true)
  const [sendMonthlyReports, setSendMonthlyReports] = useState(true)
  const [revenueReportEmail, setRevenueReportEmail] = useState('admin@nextgenpros.com')

  const handleSave = () => {
    showSuccessToast()
  }

  const handleCancel = () => {
    setFeaturedPlayerPrice('30.00')
    setFeaturedEventPrice('20.00')
    setAutoBoostRenewals(true)
    setAdminApprovalBoosts(true)
    setMaxFeaturedPlayers('10')
    setMaxFeaturedEvents('5')
    setBoostDuration('30')
    setShowBoostBadge(true)
    setEnableAdBanner(true)
    setEnableRevenueDashboard(true)
    setTrackConversionRates(true)
    setSendMonthlyReports(true)
    setRevenueReportEmail('admin@nextgenpros.com')
  }

  // Toggle component
  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: checked ? theme.colors.primaryCyan : '#374151',
        outline: `2px solid ${checked ? theme.colors.primaryCyan : 'transparent'}`,
        outlineOffset: '2px',
      }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  )

  return (
    <div 
      className="border rounded-lg p-4 lg:p-8 space-y-6 lg:space-y-8"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Profile Boosting Pricing */}
      <div>
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Profile Boosting Pricing</h2>
        
        <div className="space-y-6">
          {/* Featured Player Price */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Featured Player Price (EUR/month)
            </label>
            <Input
              type="number"
              value={featuredPlayerPrice}
              onChange={(e) => setFeaturedPlayerPrice(e.target.value)}
              placeholder="30.00"
              step="0.01"
              className="max-w-xs"
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>

          {/* Featured Event Price */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Featured Event Price (EUR)
            </label>
            <Input
              type="number"
              value={featuredEventPrice}
              onChange={(e) => setFeaturedEventPrice(e.target.value)}
              placeholder="20.00"
              step="0.01"
              className="max-w-xs"
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>

          {/* Enable automatic boost renewals */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Enable automatic boost renewals</span>
            <Toggle checked={autoBoostRenewals} onChange={setAutoBoostRenewals} />
          </div>

          {/* Require admin approval for boosts */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Require admin approval for boosts</span>
            <Toggle checked={adminApprovalBoosts} onChange={setAdminApprovalBoosts} />
          </div>
        </div>
      </div>

      {/* Featured Listings */}
      <div 
        className="pt-6 lg:pt-8 border-t"
        style={{ borderColor: `${theme.colors.primaryCyan}33` }}
      >
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Featured Listings</h2>
        
        <div className="space-y-6">
          {/* Max Featured Players per page */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Max Featured Players per page
            </label>
            <Input
              type="number"
              value={maxFeaturedPlayers}
              onChange={(e) => setMaxFeaturedPlayers(e.target.value)}
              placeholder="10"
              className="max-w-xs"
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>

          {/* Max Featured Events per page */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Max Featured Events per page
            </label>
            <Input
              type="number"
              value={maxFeaturedEvents}
              onChange={(e) => setMaxFeaturedEvents(e.target.value)}
              placeholder="5"
              className="max-w-xs"
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>

          {/* Boost duration for players */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Boost duration for players (days)
            </label>
            <Input
              type="number"
              value={boostDuration}
              onChange={(e) => setBoostDuration(e.target.value)}
              placeholder="30"
              className="max-w-xs"
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>

          {/* Show boost badge on profiles */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Show boost badge on profiles</span>
            <Toggle checked={showBoostBadge} onChange={setShowBoostBadge} />
          </div>
        </div>
      </div>

      {/* Advertising */}
      <div 
        className="pt-6 lg:pt-8 border-t"
        style={{ borderColor: `${theme.colors.primaryCyan}33` }}
      >
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Advertising</h2>
        
        <div className="space-y-4">
          {/* Enable Ad Banner System */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Enable Ad Banner System</span>
            <Toggle checked={enableAdBanner} onChange={setEnableAdBanner} />
          </div>
        </div>
      </div>

      {/* Revenue Tracking */}
      <div 
        className="pt-6 lg:pt-8 border-t"
        style={{ borderColor: `${theme.colors.primaryCyan}33` }}
      >
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Revenue Tracking</h2>
        
        <div className="space-y-6">
          {/* Enable revenue analytics dashboard */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Enable revenue analytics dashboard</span>
            <Toggle checked={enableRevenueDashboard} onChange={setEnableRevenueDashboard} />
          </div>

          {/* Track conversion rates */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Track conversion rates</span>
            <Toggle checked={trackConversionRates} onChange={setTrackConversionRates} />
          </div>

          {/* Send monthly revenue reports */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Send monthly revenue reports</span>
            <Toggle checked={sendMonthlyReports} onChange={setSendMonthlyReports} />
          </div>

          {/* Revenue report email */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Revenue report email
            </label>
            <Input
              type="email"
              value={revenueReportEmail}
              onChange={(e) => setRevenueReportEmail(e.target.value)}
              placeholder="admin@nextgenpros.com"
              className="max-w-md"
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div 
        className="flex flex-col sm:flex-row justify-end gap-3 lg:gap-4 pt-6 border-t"
        style={{ borderColor: `${theme.colors.primaryCyan}33` }}
      >
        <Button
          variant="outline"
          onClick={handleCancel}
          className="w-full sm:w-auto px-6"
          style={{
            borderColor: `${theme.colors.primaryCyan}4D`,
          }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          className="w-full sm:w-auto px-6"
          style={{
            backgroundColor: '#04B5A3',
            backgroundImage: 'none',
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}