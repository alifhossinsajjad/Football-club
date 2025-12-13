'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { showSuccessToast } from '@/components/ui/toast'

export default function UserManagementPage() {
  const theme = useSelector(state => state.theme)

  // Registration Settings
  const [requireEmailVerification, setRequireEmailVerification] = useState(true)
  const [adminApprovalClubs, setAdminApprovalClubs] = useState(true)
  const [adminApprovalScouts, setAdminApprovalScouts] = useState(true)

  // Player Registration
  const [requireGuardianConsent, setRequireGuardianConsent] = useState(true)
  const [minimumAge, setMinimumAge] = useState('13')
  const [profileVisibilityToggle, setProfileVisibilityToggle] = useState(true)

  // User Permissions
  const [clubsContactPlayers, setClubsContactPlayers] = useState(true)
  const [scoutsContactPlayers, setScoutsContactPlayers] = useState(true)
  const [internalMessaging, setInternalMessaging] = useState(true)

  const handleSave = () => {
    // Save logic here
    showSuccessToast()
  }

  const handleCancel = () => {
    // Reset to default or last saved state
    setRequireEmailVerification(true)
    setAdminApprovalClubs(true)
    setAdminApprovalScouts(true)
    setRequireGuardianConsent(true)
    setMinimumAge('13')
    setProfileVisibilityToggle(true)
    setClubsContactPlayers(true)
    setScoutsContactPlayers(true)
    setInternalMessaging(true)
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
      {/* Registration Settings */}
      <div>
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Registration Settings</h2>
        
        <div className="space-y-4">
          {/* Require email verification */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Require email verification</span>
            <Toggle checked={requireEmailVerification} onChange={setRequireEmailVerification} />
          </div>

          {/* Admin approval for clubs/academies */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Admin approval for clubs/academies</span>
            <Toggle checked={adminApprovalClubs} onChange={setAdminApprovalClubs} />
          </div>

          {/* Admin approval for scouts/agents */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Admin approval for scouts/agents</span>
            <Toggle checked={adminApprovalScouts} onChange={setAdminApprovalScouts} />
          </div>
        </div>
      </div>

      {/* Player Registration */}
      <div 
        className="pt-6 lg:pt-8 border-t"
        style={{ borderColor: `${theme.colors.primaryCyan}33` }}
      >
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Player Registration</h2>
        
        <div className="space-y-6">
          {/* Require guardian consent */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Require guardian consent for under-18</span>
            <Toggle checked={requireGuardianConsent} onChange={setRequireGuardianConsent} />
          </div>

          {/* Minimum age */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Minimum age
            </label>
            <Input
              type="number"
              value={minimumAge}
              onChange={(e) => setMinimumAge(e.target.value)}
              placeholder="13"
              className="max-w-xs"
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>

          {/* Allow profile visibility toggle */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Allow profile visibility toggle</span>
            <Toggle checked={profileVisibilityToggle} onChange={setProfileVisibilityToggle} />
          </div>
        </div>
      </div>

      {/* User Roles */}
      <div 
        className="pt-6 lg:pt-8 border-t"
        style={{ borderColor: `${theme.colors.primaryCyan}33` }}
      >
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">User Roles</h2>
        
        <div className="space-y-4">
          {/* Players */}
          <div 
            className="flex items-center justify-between p-4 lg:p-6 rounded-lg"
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <div>
              <h3 className="text-sm lg:text-base font-semibold text-white">Players</h3>
              <p className="text-xs lg:text-sm text-gray-400 mt-1">Paid subscription: €9.99/year</p>
            </div>
            <span 
              className="text-xs lg:text-sm font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${theme.colors.primaryCyan}33`,
                color: theme.colors.primaryCyan,
              }}
            >
              Active
            </span>
          </div>

          {/* Clubs/Academies */}
          <div 
            className="flex items-center justify-between p-4 lg:p-6 rounded-lg"
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <div>
              <h3 className="text-sm lg:text-base font-semibold text-white">Clubs/Academies</h3>
              <p className="text-xs lg:text-sm text-gray-400 mt-1">Free registration</p>
            </div>
            <span 
              className="text-xs lg:text-sm font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${theme.colors.primaryCyan}33`,
                color: theme.colors.primaryCyan,
              }}
            >
              Active
            </span>
          </div>

          {/* Scouts/Agents */}
          <div 
            className="flex items-center justify-between p-4 lg:p-6 rounded-lg"
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <div>
              <h3 className="text-sm lg:text-base font-semibold text-white">Scouts/Agents</h3>
              <p className="text-xs lg:text-sm text-gray-400 mt-1">Free registration</p>
            </div>
            <span 
              className="text-xs lg:text-sm font-medium px-3 py-1 rounded-full"
              style={{
                backgroundColor: `${theme.colors.primaryCyan}33`,
                color: theme.colors.primaryCyan,
              }}
            >
              Active
            </span>
          </div>
        </div>
      </div>

      {/* User Permissions */}
      <div 
        className="pt-6 lg:pt-8 border-t"
        style={{ borderColor: `${theme.colors.primaryCyan}33` }}
      >
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">User Permissions</h2>
        
        <div className="space-y-4">
          {/* Allow clubs to contact players */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Allow clubs to contact players directly</span>
            <Toggle checked={clubsContactPlayers} onChange={setClubsContactPlayers} />
          </div>

          {/* Allow scouts to contact players */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Allow scouts to contact players directly</span>
            <Toggle checked={scoutsContactPlayers} onChange={setScoutsContactPlayers} />
          </div>

          {/* Enable internal messaging */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Enable internal messaging system</span>
            <Toggle checked={internalMessaging} onChange={setInternalMessaging} />
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
