"use client";

import { useSelector } from "react-redux";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Check, Download, CreditCard } from "lucide-react";
import CancelSubscriptionModal from "@/components/player/modals/subscription/CancelSubscriptionModal";
import UpdatePaymentMethodModal from "@/components/player/modals/subscription/UpdatePaymentMethodModal";

export default function SubscriptionManagementPage() {
  const theme = useSelector((state) => state.theme);

  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showUpdatePaymentModal, setShowUpdatePaymentModal] = useState(false);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1
          className="text-2xl lg:text-3xl font-bold mb-2 inline-block"
          style={{
            backgroundImage: `linear-gradient(90deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`,
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          Subscription Management
        </h1>
      </div>

      {/* Current Plan Card */}
      <div
        className="p-6 lg:p-8 rounded-xl border"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-white mb-2">NextGen Pro</h2>
            <p className="text-sm text-gray-400 mb-6">Annual Subscription</p>

            <div className="space-y-3 grid grid-cols-2">
              <div className="flex items-center gap-3">
                <Check
                  className="w-5 h-5"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <span className="text-white">Container-out network access</span>
              </div>
              <div className="flex items-center gap-3">
                <Check
                  className="w-5 h-5"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <span className="text-white">Premium training content</span>
              </div>
              <div className="flex items-center gap-3">
                <Check
                  className="w-5 h-5"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <span className="text-white">Direct messaging system</span>
              </div>
              <div className="flex items-center gap-3">
                <Check
                  className="w-5 h-5"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <span className="text-white">Full event access</span>
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-8 rounded-full"
              style={{
                borderColor: "#EF4444",
                color: "#EF4444",
              }}
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Subscription
            </Button>
          </div>

          <div className="text-right">
            <div
              className="text-4xl font-bold "
              style={{
                color: theme.colors.primaryCyan,
              }}
            >
              €9.99
            </div>
            <div className="text-sm text-gray-400">/ year</div>
          </div>
        </div>
      </div>

      {/* Billing Information */}
      <div
        className="p-6 lg:p-8 rounded-xl border"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <h2 className="text-xl font-bold text-white mb-6">
          Billing Information
        </h2>

        <div className="space-y-6">
          <div
            className="flex justify-between items-center p-4 rounded-lg "
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <span className="text-gray-400">Next billing date:</span>
            <span className="text-white">15/01/2026</span>
          </div>
          <div
            className="flex justify-between items-center p-4 rounded-lg "
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <span className="text-gray-400">Payment method:</span>
            <div className="flex items-center gap-3">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <span className="text-white">•••• •••• •••• 4242</span>
            </div>
          </div>
          <div
            className="flex justify-between items-center p-4 rounded-lg "
            style={{
              backgroundColor: theme.colors.backgroundDark,
            }}
          >
            <span className="text-gray-400">Auto-renewal:</span>
            <span className="text-green-500 font-medium">Active</span>
          </div>
        </div>

        <div className="mt-8">
          <Button
            variant="outline"
            className="w-full rounded-full py-6 text-lg font-medium"
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${theme.colors.primaryCyan}`,
              color: theme.colors.primaryCyan,
            }}
            onClick={() => setShowUpdatePaymentModal(true)}
          >
            Update Payment Method
          </Button>
        </div>
      </div>

      {/* Payment History */}
      <div
        className="p-6 lg:p-8 rounded-xl border"
        style={{
          backgroundColor: theme.colors.backgroundCard,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <h2 className="text-xl font-bold text-white mb-6">Payment History</h2>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr
                className="text-left  text-sm text-gray-200 border-b"
                style={{
                  borderColor: `${theme.colors.primaryCyan}33 `,
                  background: theme.colors.backgroundDark,
                }}
              >
                <th className="p-4">Date</th>
                <th className="p-4">Description</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Status</th>
                <th className="p-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              <tr className="text-sm">
                <td className="py-4 px-2 text-white">15/01/2025</td>
                <td className="py-4 px-2 text-white">Annual Subscription</td>
                <td className="py-4 px-2 text-white">€9.99</td>
                <td className="py-4 px-2">
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-green-500 bg-opacity-20 text-green-500">
                    Paid
                  </span>
                </td>
                <td className="py-4">
                  <button
                    className="text-sm font-medium flex items-center gap-2 hover:underline"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modals */}
      <CancelSubscriptionModal
        isOpen={showCancelModal}
        onClose={() => setShowCancelModal(false)}
      />
      <UpdatePaymentMethodModal
        isOpen={showUpdatePaymentModal}
        onClose={() => setShowUpdatePaymentModal(false)}
      />
    </div>
  );
}
