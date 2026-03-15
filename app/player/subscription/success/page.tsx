"use client";

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useVerifyPaymentMutation } from "../../../../redux/features/player/subscriptionApi";
import { Check, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "react-hot-toast";

const SuccessContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
console.log('session id ', sessionId)
  const [verifyPayment, { isLoading: isVerifying }] = useVerifyPaymentMutation();
  const [successData, setSuccessData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (sessionId) {
      verifyPayment({ session_id: sessionId })
        .unwrap()
        .then((res) => {
          setSuccessData(res.data);
          toast.success("Payment verified successfully!");
        })
        .catch((err) => {
          console.error("Verification failed:", err);
          setError("Failed to verify payment. Please contact support.");
          toast.error("Verification failed.");
        });
    } else {
      setError("No session ID found.");
    }
  }, [sessionId, verifyPayment]);

  if (isVerifying) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-cyan-400/20 border-t-cyan-400 rounded-full animate-spin" />
          <Loader2 className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-400 animate-pulse" size={32} />
        </div>
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-black text-white uppercase italic tracking-widest">Verifying Payment</h2>
          <p className="text-gray-500 font-medium">Please wait while we confirm your subscription...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 text-center space-y-8">
        <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 border border-red-500/20">
          <Check size={40} className="rotate-45" />
        </div>
        <div className="space-y-4">
          <h2 className="text-3xl font-black text-white uppercase italic">Something went wrong</h2>
          <p className="text-gray-400 max-w-md mx-auto">{error}</p>
        </div>
        <button 
          onClick={() => router.push("/player/subscription")}
          className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
        >
          Back to Subscription
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 animate-in fade-in zoom-in duration-700">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-cyan-400 blur-3xl opacity-20 animate-pulse" />
        <div className="relative w-32 h-32 bg-gradient-to-br from-[#00D4AA] to-cyan-500 rounded-[40px] flex items-center justify-center text-white shadow-[0_20px_50px_rgba(0,212,170,0.4)] rotate-3">
          <Check size={64} strokeWidth={3} />
        </div>
      </div>

      <div className="text-center space-y-6 max-w-2xl">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase italic leading-none tracking-tighter">
            Payment <br />
            <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">Successful!</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium">Welcome to the elite league.</p>
        </div>

        {successData && (
          <div className="bg-[#12143A]/50 border border-white/5 rounded-[32px] p-8 backdrop-blur-xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-6">
              <div className="text-left">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Active Plan</p>
                <h3 className="text-2xl font-black text-cyan-400 uppercase italic">{successData.plan_name}</h3>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-1">Billing Cycle</p>
                <p className="text-white font-bold">{successData.billing_cycle}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4 text-sm text-gray-400 font-medium bg-[#0B0D2C]/50 p-4 rounded-2xl border border-white/5">
              <div className="w-2 h-2 rounded-full bg-[#00D4AA] shadow-[0_0_10px_#00D4AA]" />
              Your premium features are now active on your profile.
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button 
            onClick={() => router.push("/player/dashboard")}
            className="px-10 py-5 bg-gradient-to-r from-cyan-400 to-purple-500 rounded-2xl text-white font-black uppercase tracking-widest text-xs shadow-[0_10px_30px_rgba(0,212,170,0.3)] hover:scale-105 transition-all flex items-center justify-center gap-2 group"
          >
            Go to Dashboard
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => router.push("/player/subscription")}
            className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
          >
            Manage Billing
          </button>
        </div>
      </div>
    </div>
  );
};

export default function SubscriptionSuccessPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4AA]"></div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}