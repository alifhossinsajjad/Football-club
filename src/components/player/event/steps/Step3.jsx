import { Input } from "@/components/ui/input";
import React from "react";
import { useSelector } from "react-redux";

export default function Step3({ event }) {
  const theme = useSelector((state) => state.theme);
  return (
    <div
      className="rounded-xl p-8 space-y-8"
      style={{ backgroundColor: theme.colors.backgroundCard }}
    >
      <h2 className="text-2xl font-bold text-white mb-8">Payment</h2>

      {/* Payment Summary */}
      <div
        className="rounded-xl p-6 mb-8"
        style={{ backgroundColor: theme.colors.backgroundDark }}
      >
        <div className="flex justify-between mb-4">
          <span className="text-gray-300">Registration Fee</span>
          <span className="text-white">€{event.price}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-300">Processing Fee</span>
          <span className="text-white">€2.50</span>
        </div>
        <div className="border-t border-primaryCyan/20 pt-4 flex justify-between text-2xl font-bold">
          <span className="text-gray-300">Total</span>
          <span style={{ color: theme.colors.primaryCyan }}>
            €{(event.price + 2.5).toFixed(2)}
          </span>
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">
          Payment Details
        </h3>
        <Input placeholder="Card Number" className="mb-4" />
        <div className="grid grid-cols-2 gap-4">
          <Input placeholder="Expiry Date" />
          <Input placeholder="CVV" />
        </div>
        <Input placeholder="Name on card" className="mt-4" />
      </div>

      <div className="p-4 rounded-lg bg-backgroundDark/50 flex items-center gap-3">
        <Lock className="w-5 h-5 text-primaryCyan" />
        <p className="text-sm text-gray-300">
          Your payment information is encrypted and secure. We use Stripe for
          payment processing.
        </p>
      </div>
    </div>
  );
}
