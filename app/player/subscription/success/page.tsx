"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Check, XCircle, ArrowRight, ArrowLeft } from "lucide-react";
import { useVerifyPaymentMutation } from "../../../../redux/features/player/subscriptionApi";

interface SubscriptionData {
  plan_name: string;
  plan_type: string;
  billing_cycle_name: string;
  next_billing_date: string;
  features?: string[];
}

export default function SubscriptionSuccessPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const session_id = searchParams.get("session_id");

  const [verifyPayment, { isLoading }] = useVerifyPaymentMutation();
  const [status, setStatus] = useState<"VERIFYING" | "SUCCESS" | "FAILED">("VERIFYING");
  const [errorMsg, setErrorMsg] = useState("");
  const [planData, setPlanData] = useState<SubscriptionData | null>(null);

  useEffect(() => {
    if (!session_id) {
      setStatus("FAILED");
      setErrorMsg("Missing required payment information in the URL.");
      return;
    }

    const verify = async () => {
      try {
        const res = await verifyPayment({ session_id }).unwrap();
        setPlanData(res.data);
        setStatus("SUCCESS");
      } catch (err: any) {
        setStatus("FAILED");
        const errMsg = err?.data?.message || err?.data?.detail || "Payment verification failed. Please contact support.";
        setErrorMsg(errMsg);
      }
    };

    verify();
  }, [session_id, verifyPayment]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-6">
      <div className="bg-[#121433] border border-[#1E2550] rounded-[32px] p-10 max-w-lg w-full text-center space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        
        {status === "VERIFYING" && (
          <div className="flex flex-col items-center justify-center py-6 space-y-6">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-400"></div>
            <div>
              <h3 className="text-2xl font-black text-white uppercase tracking-tighter mb-2">Verifying Subscription</h3>
              <p className="text-gray-400">Please wait while we confirm your payment...</p>
            </div>
          </div>
        )}

        {status === "SUCCESS" && (
          <div className="flex flex-col items-center justify-center py-4 space-y-8">
            <div className="w-24 h-24 bg-[#04B5A3]/10 text-[#04B5A3] rounded-full flex items-center justify-center border-2 border-[#04B5A3]/30 animate-bounce">
              <Check size={48} strokeWidth={3} />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Subscription Active!</h3>
              <p className="text-gray-400 max-w-sm mx-auto">Welcome to {planData?.plan_name || 'your new plan'}! Your payment was successful.</p>
            </div>
            
            {planData && (
              <div className="bg-[#0B0E1E] border border-cyan-400/20 rounded-2xl p-6 w-full space-y-4 text-left">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-bold uppercase tracking-widest">Plan Type</span>
                  <span className="text-white font-bold">{planData.plan_name} ({planData.billing_cycle_name})</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-bold uppercase tracking-widest">Next Billing</span>
                  <span className="text-cyan-400 font-mono">{planData.next_billing_date}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-gray-500 font-bold uppercase tracking-widest">Status</span>
                  <span className="text-[#04B5A3] font-bold uppercase px-3 py-1 bg-[#04B5A3]/10 rounded-full tracking-wider">Active</span>
                </div>
                
                {planData.features && planData.features.length > 0 && (
                  <div className="pt-4 border-t border-white/5 space-y-3">
                    <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest">Included Features</p>
                    <div className="grid grid-cols-1 gap-2">
                       {planData.features.map((feature: string, i: number) => (
                         <div key={i} className="flex items-center gap-2 text-xs text-gray-400">
                           <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/50" />
                           {feature}
                         </div>
                       ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button 
              onClick={() => router.push("/player/subscription")}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-[#04B5A3] to-[#039d8f] text-white font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:opacity-90 active:scale-[0.98] transition-all shadow-[0_12px_24px_-8px_rgba(4,181,163,0.4)]"
            >
              Manage Subscription <ArrowRight size={20} />
            </button>
          </div>
        )}

        {status === "FAILED" && (
          <div className="flex flex-col items-center justify-center py-4 space-y-8">
            <div className="w-24 h-24 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center border-2 border-red-500/30">
              <XCircle size={48} strokeWidth={3} />
            </div>
            <div className="space-y-3">
              <h3 className="text-3xl font-black text-white uppercase tracking-tighter">Verification Failed</h3>
              <p className="text-red-400 max-w-sm mx-auto">{errorMsg}</p>
            </div>
            <button 
              onClick={() => router.push("/player/subscription")}
              className="w-full py-4 rounded-xl border border-[#1E2550] text-gray-300 font-black uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-white/5 transition-all"
            >
              <ArrowLeft size={20} /> Back to Plans
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
