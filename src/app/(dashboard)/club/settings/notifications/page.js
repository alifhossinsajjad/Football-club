'use client'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Input } from '@/components/ui/input'
import { Mail, Bell, MessageSquare, Clock } from 'lucide-react'

export default function ClubNotificationsPage() {
  const theme = useSelector(state => state.theme)

  // Email Notifications
  const [newApplications, setNewApplications] = useState(true)
  const [eventRegistrations, setEventRegistrations] = useState(true)
  const [scoutInquiries, setScoutInquiries] = useState(true)
  const [messageNotifications, setMessageNotifications] = useState(true)
  const [paymentConfirmations, setPaymentConfirmations] = useState(true)
  const [eventReminders, setEventReminders] = useState(true)
  const [monthlyReports, setMonthlyReports] = useState(false)
  const [platformUpdates, setPlatformUpdates] = useState(false)
  const [marketingCommunications, setMarketingCommunications] = useState(false)

  // Push Notifications
  const [instantMessages, setInstantMessages] = useState(true)
  const [applicationAlerts, setApplicationAlerts] = useState(true)
  const [eventUpdates, setEventUpdates] = useState(true)
  const [systemAlerts, setSystemAlerts] = useState(true)

  // SMS Notifications
  const [securityAlerts, setSecurityAlerts] = useState(true)
  const [loginVerification, setLoginVerification] = useState(true)
  const [smsEventReminders, setSmsEventReminders] = useState(false)

  // Quiet Hours
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')

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
      {/* Email Notifications */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Mail className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
          <h2 className="text-lg lg:text-xl font-bold text-white">Email Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">New Player Applications</p>
              <p className="text-xs text-gray-400 mt-1">Get notified when players apply to your events</p>
            </div>
            <Toggle checked={newApplications} onChange={setNewApplications} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Event Registration Updates</p>
              <p className="text-xs text-gray-400 mt-1">Receive updates about event registrations</p>
            </div>
            <Toggle checked={eventRegistrations} onChange={setEventRegistrations} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Scout Inquiries</p>
              <p className="text-xs text-gray-400 mt-1">Know when scouts contact you or view your events</p>
            </div>
            <Toggle checked={scoutInquiries} onChange={setScoutInquiries} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Message Notifications</p>
              <p className="text-xs text-gray-400 mt-1">Get notified about new messages</p>
            </div>
            <Toggle checked={messageNotifications} onChange={setMessageNotifications} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Payment Confirmations</p>
              <p className="text-xs text-gray-400 mt-1">Receive payment and transaction confirmations</p>
            </div>
            <Toggle checked={paymentConfirmations} onChange={setPaymentConfirmations} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Event Reminders</p>
              <p className="text-xs text-gray-400 mt-1">Reminders about upcoming events</p>
            </div>
            <Toggle checked={eventReminders} onChange={setEventReminders} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Monthly Reports</p>
              <p className="text-xs text-gray-400 mt-1">Receive monthly performance and analytics reports</p>
            </div>
            <Toggle checked={monthlyReports} onChange={setMonthlyReports} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Platform Updates</p>
              <p className="text-xs text-gray-400 mt-1">Stay informed about new features and updates</p>
            </div>
            <Toggle checked={platformUpdates} onChange={setPlatformUpdates} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Marketing Communications</p>
              <p className="text-xs text-gray-400 mt-1">Promotional offers and tips</p>
            </div>
            <Toggle checked={marketingCommunications} onChange={setMarketingCommunications} />
          </div>
        </div>
      </div>

      {/* Push Notifications */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <Bell className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
          <h2 className="text-lg lg:text-xl font-bold text-white">Push Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Instant Messages</p>
              <p className="text-xs text-gray-400 mt-1">Real-time notifications for new messages</p>
            </div>
            <Toggle checked={instantMessages} onChange={setInstantMessages} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Application Alerts</p>
              <p className="text-xs text-gray-400 mt-1">Immediate alerts for new applications</p>
            </div>
            <Toggle checked={applicationAlerts} onChange={setApplicationAlerts} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Event Updates</p>
              <p className="text-xs text-gray-400 mt-1">Updates about your events</p>
            </div>
            <Toggle checked={eventUpdates} onChange={setEventUpdates} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">System Alerts</p>
              <p className="text-xs text-gray-400 mt-1">Important system and security notifications</p>
            </div>
            <Toggle checked={systemAlerts} onChange={setSystemAlerts} />
          </div>
        </div>
      </div>

      {/* SMS Notifications */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-6">
          <MessageSquare className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
          <h2 className="text-lg lg:text-xl font-bold text-white">SMS Notifications</h2>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Security Alerts</p>
              <p className="text-xs text-gray-400 mt-1">Critical security notifications</p>
            </div>
            <Toggle checked={securityAlerts} onChange={setSecurityAlerts} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Login Verification</p>
              <p className="text-xs text-gray-400 mt-1">Two-factor authentication codes</p>
            </div>
            <Toggle checked={loginVerification} onChange={setLoginVerification} />
          </div>

          <div className="flex items-center justify-between py-3">
            <div>
              <p className="text-sm lg:text-base text-white font-medium">Event Reminders</p>
              <p className="text-xs text-gray-400 mt-1">SMS reminders for your events</p>
            </div>
            <Toggle checked={smsEventReminders} onChange={setSmsEventReminders} />
          </div>
        </div>
      </div>

      {/* Quiet Hours */}
      <div 
        className="border rounded-lg p-4 lg:p-6"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-4">
          <Clock className="w-5 h-5" style={{ color: theme.colors.primaryCyan }} />
          <h2 className="text-lg lg:text-xl font-bold text-white">Quiet Hours</h2>
        </div>
        
        <p className="text-sm text-gray-400 mb-6">
          Set times when you don't want to receive non-urgent notifications
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              Start Time
            </label>
            <Input
              type="time"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-white mb-2">
              End Time
            </label>
            <Input
              type="time"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              style={{ 
                backgroundColor: theme.colors.backgroundDark,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}