'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { showSuccessToast } from '@/components/ui/toast'
import { Globe, Clock, DollarSign, Calendar } from 'lucide-react'

export default function ClubPreferencesPage() {
  const theme = useSelector(state => state.theme)

  // Language & Region
  const [language, setLanguage] = useState('en-US')
  const [timezone, setTimezone] = useState('GMT+1')
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY')
  const [currency, setCurrency] = useState('EUR')

  // Event Preferences
  const [defaultDuration, setDefaultDuration] = useState('2')
  const [autoApprove, setAutoApprove] = useState('manual')
  const [sendConfirmationEmails, setSendConfirmationEmails] = useState(true)

  const handleSave = () => {
    showSuccessToast('Settings Saved!', 'Your preferences have been updated successfully')
  }

  const handleCancel = () => {
    setLanguage('en-US')
    setTimezone('GMT+1')
    setDateFormat('DD/MM/YYYY')
    setCurrency('EUR')
    setDefaultDuration('2')
    setAutoApprove('manual')
    setSendConfirmationEmails(true)
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
      {/* Language & Region */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Globe className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
          <h2 className="text-lg lg:text-xl font-bold text-white">Language & Region</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Platform Language */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Platform Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-4 py-2 rounded-lg h-10 text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: '#FFFFFF',
              }}
            >
              <option value="en-US">English (UK)</option>
              <option value="es-ES">Spanish (Spain)</option>
              <option value="fr-FR">French (France)</option>
              <option value="de-DE">German (Germany)</option>
              <option value="it-IT">Italian (Italy)</option>
            </select>
          </div>

          {/* Time Zone */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              <Clock className="inline w-4 h-4 mr-1" style={{ color: theme.colors.primaryCyan }} />
              Time Zone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full px-4 py-2 rounded-lg h-10 text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: '#FFFFFF',
              }}
            >
              <option value="GMT">GMT (London)</option>
              <option value="GMT+1">GMT+1 (Madrid, Barcelona)</option>
              <option value="GMT+2">GMT+2 (Athens, Cairo)</option>
              <option value="GMT-5">GMT-5 (New York)</option>
              <option value="GMT-8">GMT-8 (Los Angeles)</option>
            </select>
          </div>

          {/* Date Format */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Date Format
            </label>
            <select
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              className="w-full px-4 py-2 rounded-lg h-10 text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: '#FFFFFF',
              }}
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          {/* Currency */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-4 py-2 rounded-lg h-10 text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: '#FFFFFF',
              }}
            >
              <option value="EUR">EUR (€)</option>
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Event Preferences */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Calendar className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
          <h2 className="text-lg lg:text-xl font-bold text-white">Event Preferences</h2>
        </div>

        <div className="space-y-6">
          {/* Default Event Duration */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Default Event Duration
            </label>
            <select
              value={defaultDuration}
              onChange={(e) => setDefaultDuration(e.target.value)}
              className="w-full px-4 py-2 rounded-lg h-10 text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: '#FFFFFF',
              }}
            >
              <option value="1">1 hour</option>
              <option value="2">2 hours</option>
              <option value="3">3 hours</option>
              <option value="4">4 hours</option>
              <option value="6">6 hours</option>
              <option value="8">Full day (8 hours)</option>
            </select>
          </div>

          {/* Auto-approve Applications */}
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Auto-approve Applications
            </label>
            <select
              value={autoApprove}
              onChange={(e) => setAutoApprove(e.target.value)}
              className="w-full px-4 py-2 rounded-lg h-10 text-sm"
              style={{
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
                border: `1px solid ${theme.colors.primaryCyan}33`,
                color: '#FFFFFF',
              }}
            >
              <option value="manual">Manual approval</option>
              <option value="auto">Automatic approval</option>
              <option value="verified">Auto-approve verified players only</option>
            </select>
          </div>

          {/* Send Confirmation Emails */}
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Send Confirmation Emails</p>
              <p className="text-xs text-gray-400 mt-1">Automatically send confirmation to applicants</p>
            </div>
            <Toggle checked={sendConfirmationEmails} onChange={setSendConfirmationEmails} />
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div 
        className="flex flex-col sm:flex-row justify-end gap-3 lg:gap-4"
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
            backgroundColor: `${theme.colors.primaryCyan}`,
            backgroundImage: 'none',
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}