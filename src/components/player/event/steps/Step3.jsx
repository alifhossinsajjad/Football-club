"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Input } from "@/components/ui/input";
import { Lock, CreditCard, Calendar, User, LockIcon } from "lucide-react";

export default function Step3({ event }) {
  const theme = useSelector((state) => state.theme);

  const total = (event.price + 2.5).toFixed(2);

  return (
    <div
      className="rounded-xl p-8 space-y-10 border"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Payment Summary */}
      <div
        className="rounded-xl p-6 border space-y-4"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primaryCyan}20, ${theme.colors.primaryMagenta}33)`,
          borderTop: `1.25px solid ${theme.colors.primaryCyan}4D`,
        }}
      >
        {/* Title */}
        <h2 className="text-2xl font-medium text-white">Payment Summary</h2>

        <div className="flex justify-between mb-3 text-sm">
          <span className="text-gray-400">Registration Fee</span>
          <span className="text-white">€{event.price}</span>
        </div>

        <div className="flex justify-between mb-4 text-sm">
          <span className="text-gray-400">Processing Fee</span>
          <span className="text-white">€2.50</span>
        </div>

        <div
          className="border-t border-opacity-2  pt-4 flex justify-between text-xl font-bold"
          style={{
            borderColor: theme.colors.primaryCyan,
          }}
        >
          <span className="text-gray-300">Total</span>
          <span style={{ color: theme.colors.primaryCyan }}>€{total}</span>
        </div>
      </div>

      {/* Payment Details */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-6">
          Payment Details
        </h3>

        <div className="space-y-6">
          <Input
            label="Card Number"
            placeholder="1234 5678 9012 3456"
            className="h-14 rounded-xl"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              label="Expiry Date"
              placeholder="MM / YY"
              className="h-14 rounded-xl"
            />

            <Input
              label="CVV"
              type="password"
              placeholder="***"
              className="h-14 rounded-xl"
            />
          </div>

          <Input
            label="Name on Card"
            placeholder="Cardholder name"
            className="h-14 rounded-xl"
          />
        </div>
      </div>

      {/* Security Notice */}
      <div
        className="mt-6 p-4 rounded-lg border"
        style={{
          backgroundColor: `${theme.colors.backgroundDark}80`,
          borderColor: `${theme.colors.primaryCyan}22`,
        }}
      >
        <div className="text-sm text-gray-400 leading-relaxed flex gap-4">
          <LockIcon
            className="w-12 md:w-5 md:h-5 md:mt-1 "
            style={{
              color: theme.colors.primaryCyan,
            }}
          />
          <div>
            <div className="font-semibold text-white leading-relaxed">
              Secure Payment
            </div>{" "}
            Your payment information is encrypted and secure. We use Stripe for
            payment processing.
          </div>
        </div>
      </div>
    </div>
  );
}
