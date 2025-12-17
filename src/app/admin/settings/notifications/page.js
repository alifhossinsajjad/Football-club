"use client"

import { useState } from "react"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"
import { showSuccessToast } from "@/components/ui/toast"

export default function NotificationsPage() {
  const theme = useSelector((state) => state.theme)

  // Email Notifications state
  const [newUserRegistration, setNewUserRegistration] = useState(true)
  const [subscriptionPurchase, setSubscriptionPurchase] = useState(true)
  const [eventPublished, setEventPublished] = useState(true)
  const [profileApproval, setProfileApproval] = useState(true)

  const handleSave = () => {
    // Save logic here
    showSuccessToast()
  }

  const handleCancel = () => {
    // Reset to default or last saved state
    setNewUserRegistration(true)
    setSubscriptionPurchase(true)
    setEventPublished(true)
    setProfileApproval(true)
  }

  // Toggle component - same as user-management page
  const Toggle = ({ checked, onChange }) => (
    <button
      onClick={() => onChange(!checked)}
      className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2"
      style={{
        backgroundColor: checked ? theme.colors.primaryCyan : "#374151",
        outline: `2px solid ${checked ? theme.colors.primaryCyan : "transparent"}`,
        outlineOffset: "2px",
      }}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
          checked ? "translate-x-6" : "translate-x-1"
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
      {/* Email Notifications */}
      <div>
        <h2 className="text-lg lg:text-xl font-bold text-white mb-4 lg:mb-6">Email Notifications</h2>

        <div className="space-y-4">
          {/* New user registration */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">New user registration</span>
            <Toggle checked={newUserRegistration} onChange={setNewUserRegistration} />
          </div>

          {/* Subscription purchase/renewal */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Subscription purchase/renewal</span>
            <Toggle checked={subscriptionPurchase} onChange={setSubscriptionPurchase} />
          </div>

          {/* Event published notification */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Event published notification</span>
            <Toggle checked={eventPublished} onChange={setEventPublished} />
          </div>

          {/* Profile approval notification */}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm lg:text-base text-white">Profile approval notification</span>
            <Toggle checked={profileApproval} onChange={setProfileApproval} />
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
          className="w-full sm:w-auto px-6 bg-transparent"
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
            backgroundColor: "#04B5A3",
            backgroundImage: "none",
          }}
        >
          Save Changes
        </Button>
      </div>
    </div>
  )
}
