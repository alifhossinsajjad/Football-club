'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { showSuccessToast } from '@/components/ui/toast'
import { Lock, Smartphone, Eye, EyeOff } from 'lucide-react'

export default function ClubSecurityPage() {
  const theme = useSelector(state => state.theme)
  
  // Password states
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Privacy settings
  const [publicProfile, setPublicProfile] = useState(true)
  const [showContactInfo, setShowContactInfo] = useState(true)
  const [acceptApplications, setAcceptApplications] = useState(true)
  const [scoutAccess, setScoutAccess] = useState(true)
  const [showStatistics, setShowStatistics] = useState(false)

  // Active sessions
  const [sessions] = useState([
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'Barcelona, Spain',
      status: 'Current',
      lastActive: 'Active now'
    },
    {
      id: 2,
      device: 'Safari on MacBook',
      location: 'Barcelona, Spain',
      lastActive: '3 hours ago'
    }
  ])

  const handlePasswordUpdate = () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      return
    }
    if (newPassword !== confirmPassword) {
      return
    }
    showSuccessToast('Password Updated!', 'Your password has been changed successfully')
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleCancel = () => {
    setCurrentPassword('')
    setNewPassword('')
    setConfirmPassword('')
  }

  const handleSignOutSession = (sessionId) => {
    // Handle sign out logic
    console.log('Sign out session:', sessionId)
  }

  const handleSignOutAll = () => {
    showSuccessToast('Sessions Cleared!', 'All other sessions have been signed out')
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
    <div className="space-y-6">
      {/* Change Password */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Lock className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
          <h2 className="text-lg lg:text-xl font-bold text-white">Change Password</h2>
        </div>

        <div className="space-y-4 lg:space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Current Password
            </label>
            <div className="relative">
              <Input
                type={showCurrentPassword ? "text" : "password"}
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                placeholder="Enter current password"
                style={{ 
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
              <button
                type="button"
                onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* New Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              New Password
            </label>
            <div className="relative">
              <Input
                type={showNewPassword ? "text" : "password"}
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
                style={{ 
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Must be at least 8 characters with uppercase, lowercase, and numbers
            </p>
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <Input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm new password"
                style={{ 
                  backgroundColor: theme.colors.backgroundDark,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div 
          className="flex flex-col sm:flex-row justify-end gap-3 lg:gap-4 pt-6 mt-6 border-t"
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
            onClick={handlePasswordUpdate}
            className="w-full sm:w-auto px-6"
            style={{
              backgroundColor: '#04B5A3',
              backgroundImage: 'none',
            }}
          >
            Update Password
          </Button>
        </div>
      </div>

      {/* Privacy Settings */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <h2 className="text-lg lg:text-xl font-bold text-white mb-6">Privacy Settings</h2>
        
        <div className="space-y-4">
          {/* Public Profile */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Public Profile</p>
              <p className="text-xs text-gray-400 mt-1">Allow your club to be discovered in searches</p>
            </div>
            <Toggle checked={publicProfile} onChange={setPublicProfile} />
          </div>

          {/* Show Contact Information */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Show Contact Information</p>
              <p className="text-xs text-gray-400 mt-1">Display phone and email on public profile</p>
            </div>
            <Toggle checked={showContactInfo} onChange={setShowContactInfo} />
          </div>

          {/* Accept Applications */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Accept Player Applications</p>
              <p className="text-xs text-gray-400 mt-1">Allow players to apply directly to your events</p>
            </div>
            <Toggle checked={acceptApplications} onChange={setAcceptApplications} />
          </div>

          {/* Scout Access */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Scout Access</p>
              <p className="text-xs text-gray-400 mt-1">Allow scouts to view your events and contact you</p>
            </div>
            <Toggle checked={scoutAccess} onChange={setScoutAccess} />
          </div>

          {/* Show Statistics */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Show Statistics</p>
              <p className="text-xs text-gray-400 mt-1">Display event attendance and success metrics</p>
            </div>
            <Toggle checked={showStatistics} onChange={setShowStatistics} />
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Smartphone className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
          <h2 className="text-lg lg:text-xl font-bold text-white">Active Sessions</h2>
        </div>

        <div className="space-y-4">
          {sessions.map((session) => (
            <div 
              key={session.id}
              className="flex items-center justify-between p-4 rounded-lg"
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{
                    backgroundColor: `${theme.colors.primaryCyan}33`,
                  }}
                >
                  <Smartphone className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-white font-medium text-sm">{session.device}</p>
                    {session.status === 'Current' && (
                      <span 
                        className="px-2 py-0.5 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: 'rgba(5, 223, 114, 0.2)',
                          color: '#05DF72'
                        }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400 text-xs mt-1">{session.location} • {session.lastActive}</p>
                </div>
              </div>
              {session.status !== 'Current' && (
                <button
                  onClick={() => handleSignOutSession(session.id)}
                  className="p-2 text-sm font-medium transition-colors"
                  style={{ color: '#EF4444' }}
                >
                  ✕
                </button>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={handleSignOutAll}
          className="w-full mt-6 py-3 rounded-lg font-semibold transition-all text-sm"
          style={{
            backgroundColor: 'transparent',
            border: `1px solid ${theme.colors.primaryCyan}33`,
            color: '#EF4444'
          }}
        >
          Sign Out All Other Sessions
        </button>
      </div>
    </div>
  )
}