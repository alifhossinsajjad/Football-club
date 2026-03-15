"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { XCircle, ArrowLeft, RotateCcw } from "lucide-react";

export default function SubscriptionCancelPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="relative mb-12">
        <div className="absolute inset-0 bg-red-500 blur-3xl opacity-10 animate-pulse" />
        <div className="relative w-32 h-32 bg-gradient-to-br from-red-500/20 to-red-600/20 border border-red-500/30 rounded-[40px] flex items-center justify-center text-red-500 shadow-2xl rotate-3">
          <XCircle size={64} strokeWidth={2.5} />
        </div>
      </div>

      <div className="text-center space-y-6 max-w-xl">
        <div className="space-y-2">
          <h1 className="text-5xl md:text-6xl font-black text-white uppercase italic leading-none tracking-tighter">
            Checkout <br />
            <span className="text-red-500">Canceled</span>
          </h1>
          <p className="text-xl text-gray-400 font-medium">Your subscription was not activated.</p>
        </div>

        <div className="bg-[#12143A]/50 border border-white/5 rounded-[32px] p-8 backdrop-blur-xl space-y-4">
          <p className="text-gray-400 text-sm leading-relaxed">
            No worries! Your account hasn't been charged. You can return to the plans page and try again whenever you're ready.
          </p>
          <div className="h-px bg-white/5 w-full" />
          <div className="flex items-center justify-center gap-2 text-[10px] text-gray-500 font-black uppercase tracking-widest">
            <RotateCcw size={12} />
            Auto-renew is not active
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <button 
            onClick={() => router.push("/player/subscription")}
            className="px-10 py-5 bg-gradient-to-r from-red-500/10 to-red-600/10 border border-red-500/30 rounded-2xl text-red-500 font-black uppercase tracking-widest text-xs hover:bg-red-500/20 transition-all flex items-center justify-center gap-2 group"
          >
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
            Back to Plans
          </button>
          
          <button 
            onClick={() => router.push("/player/dashboard")}
            className="px-10 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}