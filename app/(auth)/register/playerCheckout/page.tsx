"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useGetSubscriptionPlansQuery, useCreatePublicCheckoutMutation } from "@/redux/features/player/singleSubscription/singleSubscriptionApi";


export default function PlayerCheckoutPage() {
  const router = useRouter();
  const { data: singlePlan, isLoading } = useGetSubscriptionPlansQuery();
  const [createCheckout, { isLoading: isCreatingCheckout }] = useCreatePublicCheckoutMutation();

  const activePlan = singlePlan?.data?.find((p: any) => p.status === 'ACTIVE') || singlePlan?.data?.[0];

  const handleGuestCheckout = async () => {
    if (!activePlan) return;
    try {
      const payload = {
        plan_id: activePlan.plan_id || (activePlan as any).id,
        billing_cycle: "YEARLY" as const,
      };
      const res = await createCheckout(payload as any).unwrap();
      const checkoutUrl = res.session_url || (res as any).data?.session_url;
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No checkout URL returned from server.");
      }
    } catch (err: any) {
      console.error("Checkout Error:", err);
      alert(err?.data?.message || err?.message || "Payment failed. Try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07142b]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--bg-dark,#07142b)] text-white flex flex-col items-center justify-center p-4">
      <div className="absolute top-4 left-4">
        <Link href="/register" className="flex items-center text-gray-400 hover:text-white transition-colors">
          <ArrowLeft className="mr-2" size={20} /> Back
        </Link>
      </div>

      <div className="text-center mb-10 mt-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-linear-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
          Player Registration Checkout
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          To complete your player registration, please subscribe to our premium plan. Once the payment is complete, you will be redirected to the registration form.
        </p>
      </div>

      {activePlan ? (
        <div className="w-full max-w-md bg-linear-to-br from-[#00E5FF]/20 via-[#00E5FF]/5 to-[#9C27B0]/30 p-1 rounded-xl shadow-2xl shadow-indigo-950/40">
          <div className="bg-[#171D36]/90 p-8 rounded-xl border border-indigo-500/20">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-3xl font-black text-white shadow-lg overflow-hidden">
                {activePlan.logo_url ? (
                  <img src={activePlan.logo_url} alt={activePlan.title} className="w-full h-full object-cover" />
                ) : (
                  "♔"
                )}
              </div>
            </div>

            <h2 className="text-3xl font-bold mb-6 bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent text-center">
              {activePlan.title?.toUpperCase() || "GO PRO"}
            </h2>

            <p className="text-[#7FB6B6] text-center mb-8 font-bold">
              {activePlan.description || "Unlock premium features and accelerate your football career with NextGen Pro membership"}
            </p>

            <ul className="space-y-4 mb-10 text-[#7FB6B6] text-sm">
              {(activePlan.features && activePlan.features.length > 0
                ? activePlan.features
                : [
                  "Exclusive scout network access",
                  "Refined direct messaging system",
                  "Exclusive scout & agent network access",
                  "Newsletter with pre-season training content and priority event access",
                  "Full access to all events with direct contact options",
                  "Enhanced player profile creation with photos & videos to get noticed by clubs",
                ]
              ).map((item: any, i: number) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">✓</span>
                  <span>
                    {typeof item === 'string' 
                      ? item 
                      : (item?.name || (typeof item === 'object' ? Object.values(item)[0] : String(item)))}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex flex-col items-center justify-center gap-4 mb-4">
              <div className="flex items-baseline text-[#9CFFF0]">
                <span className="text-3xl font-black">$</span>
                <span className="text-5xl font-black tracking-tight">
                  {activePlan.yearly_price_after_discount !== undefined && activePlan.yearly_price_after_discount !== null 
                    ? activePlan.yearly_price_after_discount 
                    : activePlan.yearly_price || 9.99}
                </span>
                <span className="text-xl font-bold ml-2">/year</span>
              </div>

              {activePlan.discount_label && activePlan.discount_percentage ? (
                <div className="bg-linear-to-r from-[#00E5FF] to-[#9C27B0] text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wide">
                  {activePlan.discount_label.split('(')[0].trim()}
                </div>
              ) : activePlan.discount_percentage ? (
                <div className="bg-linear-to-r from-[#00E5FF] to-[#9C27B0] text-white text-xs font-bold px-4 py-2 rounded-lg uppercase tracking-wide">
                  Save {activePlan.discount_percentage}%
                </div>
              ) : null}
            </div>

            {activePlan.yearly_price && activePlan.discount_label && (
              <p className="text-[#7FB6B6] text-sm text-center mb-8">
                ({activePlan.discount_label.includes('(') ? activePlan.discount_label.split('(')[1].replace(')', '') : 'introductory offer'} — usually ${activePlan.yearly_price}/year)
              </p>
            )}

            <div className="flex justify-center mt-8">
              <button
                onClick={handleGuestCheckout}
                disabled={isCreatingCheckout}
                className="w-full text-center bg-[#00F6FF] text-black px-8 py-4 font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,246,255,0.3)] disabled:opacity-50 text-lg"
              >
                {isCreatingCheckout ? "Processing..." : "Pay & Register"}
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center text-gray-400 p-8 border border-white/10 rounded-xl bg-white/5">
          <p>No active subscription plans available at the moment.</p>
        </div>
      )}
    </div>
  );
}
