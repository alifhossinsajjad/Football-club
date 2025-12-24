"use client";

import { Button } from "@/components/ui/button";
import { CircleAlert, CreditCard, LockIcon, X } from "lucide-react";
import { useSelector } from "react-redux";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/player/select";

export default function UpdatePaymentMethodModal({ isOpen, onClose }) {
  const theme = useSelector((state) => state.theme);

  if (!isOpen) return null;

  const inputStyle = {
    backgroundColor: theme.colors.backgroundDark,
    border: `1px solid ${theme.colors.greenBg}`,
  };

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div
        className="w-full max-w-2xl p-8 rounded-xl relative max-h-[90vh] overflow-y-auto"
        style={{ backgroundColor: theme.colors.backgroundCard }}
      >
        {/* Close Button */}
        <button className="absolute top-3 right-3" onClick={onClose}>
          <X className="w-5 h-5 text-gray-400" />
        </button>

        {/* Header */}
        <h3 className="text-xl font-semibold text-white mb-4 ">
          Update Payment Method
        </h3>

        {/* Current Payment */}
        <div className="mb-4 border-t pt-8">
          <h4 className="text-base font-medium text-white mb-2">
            Current Payment Method
          </h4>
          <div
            className="p-3 rounded-lg flex justify-between items-center"
            style={{ backgroundColor: theme.colors.backgroundDark }}
          >
            <div className="flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-gray-400" />
              <div className="text-sm">
                <span className="text-white">•••• •••• •••• 4242</span>
                <div className="text-gray-400 text-xs">Expires 12/26</div>
              </div>
            </div>
            <span className="text-green-500 text-xs">Active</span>
          </div>
        </div>

        {/* New Payment */}
        <h4 className="text-base font-medium text-white mb-4">
          New Payment Method
        </h4>

        <div className="space-y-4">
          {/* Card Number */}
          <div>
            <label className="text-xs text-gray-300 mb-1 block">
              Card number
            </label>
            <input
              type="text"
              placeholder="1234 5678 9012 3456"
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white"
              style={inputStyle}
            />
          </div>

          {/* Expiry + CVV */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-gray-300 mb-1 block">
                Expiry (MM/YY)
              </label>
              <input
                type="text"
                placeholder="MM/YY"
                className="w-full px-3 py-2.5 rounded-lg text-sm text-white"
                style={inputStyle}
              />
            </div>
            <div>
              <label className="text-xs text-gray-300 mb-1 block">CVV</label>
              <input
                type="text"
                placeholder="123"
                className="w-full px-3 py-2.5 rounded-lg text-sm text-white"
                style={inputStyle}
              />
            </div>
          </div>

          {/* Cardholder */}
          <div>
            <label className="text-xs text-gray-300 mb-1 block">
              Cardholder Name
            </label>
            <input
              type="text"
              defaultValue="John Doe"
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white"
              style={inputStyle}
            />
          </div>

          {/* Billing Address */}
          <div>
            <label className="text-xs text-gray-300 mb-1 block">
              Billing Address
            </label>
            <input
              type="text"
              placeholder="Street Address"
              className="w-full px-3 py-2.5 rounded-lg text-sm text-white mb-3"
              style={inputStyle}
            />

            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  placeholder="City"
                  className="w-full px-3 py-2.5 rounded-lg text-sm text-white"
                  style={inputStyle}
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Postal Code"
                  className="w-full px-3 py-2.5 rounded-lg text-sm text-white"
                  style={inputStyle}
                />
              </div>
            </div>
          </div>

          {/* Default Checkbox */}
          <div className="flex items-center gap-2 mt-4">
            <input type="checkbox" className="w-4 h-4" />
            <span className="text-xs text-gray-300">
              Set as default payment method
            </span>
          </div>

          <label
            className="flex items-center gap-4 cursor-pointer   p-2 rounded-md "
            style={{
              backgroundColor: theme.colors.backgroundDark,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            <LockIcon
              className="w-12 md:w-5 md:h-5 md:mt-1 "
              style={{
                color: theme.colors.primaryCyan,
              }}
            />
            <div className="text-gray-400 text-sm">
              <div className="font-semibold text-white leading-relaxed">
                Your payment is secure
              </div>
              We use industry-standard encryption to protect your information.
            </div>
          </label>
        </div>

        {/* Actions */}
        <div className="flex gap-3 mt-6">
          <Button
            variant="outline"
            className="flex-1  py-4 text-sm"
            style={{
              border: `1px solid ${theme.colors.primaryCyan}`,
              color: theme.colors.primaryCyan,
            }}
            onClick={onClose}
          >
            Cancel
          </Button>
          <Button
            variant="common"
            className="flex-1  py-4 text-sm"
            onClick={() => {
              alert("Payment method updated");
              onClose();
            }}
          >
            Update Payment Method
          </Button>
        </div>
      </div>
    </div>
  );
}
