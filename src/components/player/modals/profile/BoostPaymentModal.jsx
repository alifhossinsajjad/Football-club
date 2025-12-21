"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, CreditCard, Lock, ChevronLeft, ArrowLeft } from "lucide-react";
import { useSelector } from "react-redux";
import PlayerTitle from "../../playerTitle";

export default function BoostPaymentModal({
  isOpen,
  onClose,
  onBack,
  onSuccess,
  boostData,
}) {
  if (!isOpen) return null;
  const theme = useSelector((state) => state.theme);

  const vat = (boostData.price * 0.2).toFixed(2);
  const total = (boostData.price * 1.2).toFixed(2);

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl max-w-5xl w-full shadow-2xl border border-primaryCyan/20 overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundDark,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-primaryCyan/20">
          <div className="flex items-center gap-4">
            <button onClick={onBack} className="text-gray-400 hover:text-white">
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <PlayerTitle title="Boost Your Profile" />
              <h1>
                Feature your profile to increase visibility and engagement
              </h1>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-8 grid lg:grid-cols-2 gap-8">
          {/* Left - Payment Method & Form */}
          <div className="space-y-8">
            {/* Payment Method */}
            <div>
              <h3 className="text-white font-semibold mb-4">Payment Method</h3>
              <div
                className="rounded-xl p-4 flex items-center gap-4 border-2"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                  borderColor: theme.colors.primaryCyan,
                }}
              >
                <CreditCard
                  className="w-6 h-6"
                  style={{ color: theme.colors.primaryCyan }}
                />
                <span className="text-white font-medium">Credit Card</span>
                <span
                  className="ml-auto px-3 py-1 rounded-full text-xs font-medium"
                  style={{
                    backgroundColor: theme.colors.primaryCyan,
                    color: "white",
                  }}
                >
                  Selected
                </span>
              </div>
            </div>

            {/* Card Information */}
            <div>
              <h3 className="text-white font-semibold mb-4">
                Card Information
              </h3>
              <div className="space-y-4">
                <Input placeholder="Card Number" className="text-lg" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Expiry Date" />
                  <Input placeholder="CVV / CVC" />
                </div>
                <Input placeholder="Cardholder Name" />
              </div>
            </div>

            {/* Billing Address */}
            <div>
              <h3 className="text-white font-semibold mb-4">Billing Address</h3>
              <div className="space-y-4">
                <Input placeholder="Country / Region" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="City" />
                  <Input placeholder="Postal Code" />
                </div>
                <Input placeholder="Street Address" />
              </div>
            </div>

            {/* Agreement */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                className="w-5 h-5 rounded border-primaryCyan"
              />
              <span className="text-gray-300 text-sm">
                I agree to the{" "}
                <a href="#" className="text-primaryCyan underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="#" className="text-primaryCyan underline">
                  Privacy Policy
                </a>
              </span>
            </div>

            <div className="flex items-center gap-2 text-gray-400 text-sm">
              <Lock className="w-4 h-4" />
              Secure Payment | 256-bit SSL Encrypted
            </div>
          </div>

          {/* Right - Order Summary */}
          <div
            className="rounded-xl p-8 border"
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}66`,
            }}
          >
            <h3 className="text-lg font-bold text-white mb-6">Order Summary</h3>

            <div
              className="rounded-xl p-6 mb-6 flex items-center gap-4"
              style={{
                backgroundColor: theme.colors.backgroundDark,
              }}
            >
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta flex items-center justify-center text-3xl">
                ⚡
              </div>
              <div>
                <p className="text-white font-bold">Profile Boost</p>
                <p className="text-gray-400 text-sm">
                  {boostData.duration} Month{boostData.duration > 1 ? "s" : ""}
                </p>
              </div>
            </div>

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-300">Start Date</span>
                <span className="text-white">1 Feb 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">End Date</span>
                <span className="text-white">1 Mar 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Subtotal</span>
                <span className="text-white">€{boostData.price}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-300">Tax (VAT 20%)</span>
                <span className="text-white">€{vat}</span>
              </div>
            </div>

            <div
              className="mt-6 pt-6 border-t 
             flex justify-between items-end"
            >
              <span className="text-gray-300 text-lg">Total Amount</span>
              <span
                className="text-3xl font-bold"
                style={{ color: theme.colors.primaryCyan }}
              >
                €{total}
              </span>
            </div>

            <Button
              variant="outline"
              onClick={onSuccess}
              className="w-full mt-8  py-6 text-base flex items-center justify-center gap-3"
              style={{ backgroundColor: theme.colors.primaryCyan }}
            >
              <Lock className="w-5 h-5" />
              Complete Payment - €{total}
            </Button>
            <Button
              variant="outline"
              onClick={onBack}
              className="w-full mt-8 border-none  py-6 text-base flex items-center justify-center gap-3"
              style={{ backgroundColor: theme.colors.backgroundDark }}
            >
              <ArrowLeft className="w-5 h-5" /> Back to Selection
            </Button>

            <div className="mt-8 pt-6 border-t border-primaryCyan/20">
              <p className="text-gray-400 text-center text-sm mb-4">
                Secured Payment Partners
              </p>
              {/* <div className="flex justify-center gap-6">
                <NextImage src="/visa.png" alt="Visa" width={50} height={30} />
                <NextImage
                  src="/mastercard.png"
                  alt="Mastercard"
                  width={50}
                  height={30}
                />
                <NextImage
                  src="/paypal.png"
                  alt="PayPal"
                  width={80}
                  height={30}
                />
                <NextImage
                  src="/stripe.png"
                  alt="Stripe"
                  width={70}
                  height={30}
                />
              </div> */}
              <div className="flex justify-center flex-wrap gap-4">
                <span className="rounded-md border border-blue-600 bg-blue-50 px-4 py-2 text-xs font-semibold text-blue-700">
                  VISA
                </span>

                <span className="rounded-md border border-red-600 bg-red-50 px-4 py-2 text-xs font-semibold text-red-700">
                  Mastercard
                </span>

                <span className="rounded-md border border-indigo-600 bg-indigo-50 px-4 py-2 text-xs font-semibold text-indigo-700">
                  PayPal
                </span>

                <span className="rounded-md border border-purple-600 bg-purple-50 px-4 py-2 text-xs font-semibold text-purple-700">
                  Stripe
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
