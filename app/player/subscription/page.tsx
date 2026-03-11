"use client";

import React from "react";

const subscriptionData = {
  plan: "NextGen Pro",
  type: "Annual Subscription",
  price: "€9.99",
  period: "/year",
  features: [
    "Exclusive scout network access",
    "Direct messaging system",
    "Premium training content",
    "Full event access",
  ],
  billing: {
    nextBillingDate: "15/01/2026",
    paymentMethod: "•••• •••• •••• 4242",
    autoRenewal: "Active",
  },
  paymentHistory: [
    {
      id: 1,
      date: "15/01/2025",
      description: "Annual Subscription",
      amount: "€9.99",
      status: "Paid",
    },
  ],
};

const CheckIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 8L6.5 11.5L13 5"
      stroke="#00D4AA"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SubscriptionPage = () => {
  return (
    <div className="p-3 mx-auto font-sans">
      {/* Page Title */}
      <h1 className="text-3xl font-bold inline-block bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent mb-7">
        Subscription Management
      </h1>

      {/* Current Plan Card */}
      <div className="bg-gradient-to-r from-[#00E5FF]/20 to-[#9C27B0]/20 rounded-xl p-8 border border-[#00E5FF]/30 mb-6 ">
        {/* Plan Header */}
        <div className="flex justify-between items-start mb-5">
          <div>
            <h2 className="text-xl font-bold text-white mb-1">
              {subscriptionData.plan}
            </h2>
            <p className="text-sm text-white/50">{subscriptionData.type}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-[#00E5FF]">
              {subscriptionData.price}
            </span>
            <span className="text-sm text-white/50 block">
              {subscriptionData.period}
            </span>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {subscriptionData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2">
              <CheckIcon />
              <span className="text-sm text-white/75">{feature}</span>
            </div>
          ))}
        </div>

        {/* Cancel Button */}
        <button className="px-5 py-2.5 rounded-lg border border-red-500 text-red-500 text-sm font-medium bg-transparent hover:bg-red-500/10 transition-colors cursor-pointer">
          Cancel Subscription
        </button>
      </div>

      {/* Billing Information Card */}
      <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7 mb-6 space-y-2">
        <h3 className="text-lg font-bold text-white mb-5">
          Billing Information
        </h3>

        {/* Next Billing Date */}
        <div className="flex justify-between items-center py-3.5 border-b border-white/[0.06] bg-[#0B0D2C] p-3 rounded-lg ">
          <span className="text-sm text-white/55 ">Next billing date:</span>
          <span className="text-sm text-white/75">
            {subscriptionData.billing.nextBillingDate}
          </span>
        </div>

        {/* Payment Method */}
        <div className="flex justify-between items-center py-3.5 border-b border-white/[0.06] bg-[#0B0D2C] p-3 rounded-lg">
          <span className="text-sm text-white/55">Payment method:</span>
          <span className="text-sm text-white/75">
            {subscriptionData.billing.paymentMethod}
          </span>
        </div>

        {/* Auto Renewal */}
        <div className="flex justify-between items-center py-3.5 bg-[#0B0D2C] p-3 rounded-lg">
          <span className="text-sm text-white/55">Auto-renewal:</span>
          <span className="text-sm text-[#00D4AA] font-medium">
            {subscriptionData.billing.autoRenewal}
          </span>
        </div>

        {/* Update Payment Method Button */}
        <button className="w-full mt-5 py-3 rounded-lg border border-[#00E5FF] text-[#00E5FF] text-sm font-medium bg-transparent hover:bg-[#7B61FF]/10 transition-colors cursor-pointer">
          Update Payment Method
        </button>
      </div>

      {/* Payment History Card */}
      <div className="bg-[#12143A] border border-white/[0.08] rounded-xl p-7">
        <h3 className="text-lg font-semibold text-white mb-5">
          Payment History
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse ">
            <thead >
              <tr className="border-b border-white/[0.08]">
                {["Date", "Description", "Amount", "Status", "Invoice"].map(
                  (col) => (
                    <th
                      key={col}
                      className="text-left pb-3 text-xs font-semibold text-white/50 pr-4"
                    >
                      {col}
                    </th>
                  ),
                )}
              </tr>
            </thead>
            <tbody>
              {subscriptionData.paymentHistory.map((payment) => (
                <tr key={payment.id}>
                  <td className="pt-4 pr-4 text-sm text-white/65">
                    {payment.date}
                  </td>
                  <td className="pt-4 pr-4 text-sm text-white/65">
                    {payment.description}
                  </td>
                  <td className="pt-4 pr-4 text-sm text-white/65">
                    {payment.amount}
                  </td>
                  <td className="pt-4 pr-4">
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-[#00D4AA]/15 text-[#00D4AA] text-xs font-medium">
                      {payment.status}
                    </span>
                  </td>
                  <td className="pt-4">
                    <button className="bg-transparent border-none text-[#00E5FF] text-sm font-medium cursor-pointer hover:underline p-0">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPage;
