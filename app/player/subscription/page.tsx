"use client";

import React, { useState } from "react";
import { 
  Check, 
  X, 
  AlertCircle, 
  CreditCard, 
  Download, 
  Calendar,
  Lock,
  ChevronRight
} from "lucide-react";
import { 
  useGetSubscriptionQuery, 
  useGetPaymentHistoryQuery, 
  useCancelSubscriptionMutation, 
  useUpdatePaymentMethodMutation,
  useGetPlansQuery,
  useCreateCheckoutMutation,
  useVerifyPaymentMutation
} from "../../../redux/features/player/subscriptionApi";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

interface Plan {
  id: number;
  planName?: string;
  plan_name?: string;
  plan_type?: string;
  price: string | number;
  billingInterval?: string;
  billing_cycle?: string;
  features: string[];
}

interface ActiveSubscription {
  plan_name: string;
  plan_type: string;
  amount: string | number;
  billing_cycle: string;
  next_billing_date: string;
  card_brand: string;
  card_last_four: string;
  auto_renewal: boolean;
  features: string[];
}

interface PaymentHistoryItem {
  id: number;
  payment_date: string;
  description: string;
  currency: string;
  amount: string | number;
  status: string;
}

const CheckIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#00D4AA]/20 flex items-center justify-center">
    <Check size={12} className="text-[#00D4AA]" strokeWidth={3} />
  </div>
);



const SubscriptionPage = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);


  const router = useRouter();

  const { data: subscription, isLoading: isSubLoading } = useGetSubscriptionQuery();
  const { data: plansData, isLoading: isPlansLoading } = useGetPlansQuery();
  const { data: historyRes, isLoading: isHistoryLoading } = useGetPaymentHistoryQuery();
  const [createCheckout, { isLoading: isCreatingCheckout }] = useCreateCheckoutMutation();
  const [verifyPayment] = useVerifyPaymentMutation();
  const [cancelSubscription, { isLoading: isCancelling }] = useCancelSubscriptionMutation();
  const [updatePaymentMethod, { isLoading: isUpdating }] = useUpdatePaymentMethodMutation();

  const activeSub: ActiveSubscription | null = subscription?.data || null;
  const plans: Plan[] = plansData?.data || [];
  const paymentHistory: PaymentHistoryItem[] = historyRes?.data || [];

  const displaySub = activeSub;

  const handleSubscribe = async (plan: Plan) => {
    try {
      const baseUrl = window.location.origin;
      
      // Aggressively match known plan types from whatever string the backend provided
      const rawName = String(plan.plan_type || plan.plan_name || plan.planName || "BASIC").toUpperCase();
      let pType = "BASIC";
      if (rawName.includes("PRO") || rawName.includes("PREMIUM")) pType = "PRO";
      else if (rawName.includes("ELITE")) pType = "ELITE";
      else if (rawName.includes("BASIC") || rawName.includes("STARTER")) pType = "BASIC";
      else pType = "BASIC"; 
      
      const rawCycle = String(plan.billing_cycle || plan.billingInterval || "ANNUAL").toUpperCase();
      let bCycle = rawCycle.includes("MONTH") ? "MONTHLY" : "ANNUAL";
      
      const payload: { plan_type: string; billing_cycle: string; success_url?: string; cancel_url?: string } = {
        plan_type: pType, 
        billing_cycle: bCycle,
        success_url: `${baseUrl}/player/subscription/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${baseUrl}/player/subscription/cancel`
      };
      
      console.log("Sending checkout payload:", payload);
      
      const res = await createCheckout(payload).unwrap();
      
      if (res.checkout_url) {
        window.location.href = res.checkout_url;
      }
    } catch (err: any) {
      console.error("Checkout error:", err);
      const errMsg = err?.data?.plan_type?.[0] || err?.data?.message || "Failed to initiate checkout";
      toast.error(errMsg);
    }
  };

  const handleCancelSubscription = async () => {
    try {
      const res = await cancelSubscription({ reason: cancelReason }).unwrap();
      toast.success(res.message || "Subscription cancelled.");
      setIsCancelModalOpen(false);
      setCancelReason("");
    } catch (err) {
      toast.error("Failed to cancel subscription.");
    }
  };

  const handleUpdatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updatePaymentMethod({ dummy: "data" }).unwrap();
      toast.success("Payment method updated.");
      setIsUpdateModalOpen(false);
    } catch (err) {
      toast.error("Failed to update payment method.");
    }
  };

  if (isSubLoading || isPlansLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4AA]"></div>
      </div>
    );
  }

  // View 1: Plan Selection (No Active Subscription and No recent Success)
  if (!displaySub) {
    return (
      <div className="p-8 max-w-6xl mx-auto space-y-12 animate-in fade-in duration-500">
        <div className="text-center space-y-4 py-8">
          <h1 className="text-6xl font-black bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent italic leading-tight">
            Choose Your Power Up
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-medium">
            Join the NextGen network and get exclusive access to scouts, premium content, and more.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {plans.map((plan: any) => (
            <div key={plan.id} className="relative group/card bg-[#12143A]/50 border border-white/5 rounded-[40px] p-8 flex flex-col hover:bg-[#12143A] hover:border-cyan-400/30 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
              {plan.id === 1 && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-[10px] font-black uppercase tracking-widest px-6 py-2 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-xl font-bold text-white mb-2">{plan.plan_name || plan.planName || plan.plan_type}</h3>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-black text-white">€{plan.price}</span>
                  <span className="text-gray-500 font-bold text-xs">/{(plan.billing_cycle || plan.billingInterval || "").toLowerCase()}</span>
                </div>
              </div>

              <div className="space-y-4 flex-1 mb-10">
                {plan.features.map((feature: string, i: number) => (
                  <div key={i} className="flex gap-3 text-sm">
                    <div className="mt-1 flex-shrink-0">
                      <CheckIcon />
                    </div>
                    <span className="text-gray-400 font-medium leading-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <button 
                onClick={() => handleSubscribe(plan)}
                disabled={isCreatingCheckout}
                className="w-full py-4 rounded-2xl bg-[#0B0D2C] border border-white/10 text-white font-black uppercase tracking-widest text-xs group-hover/card:bg-gradient-to-r group-hover/card:from-cyan-400 group-hover/card:to-purple-500 group-hover/card:border-transparent transition-all active:scale-95"
              >
                {isCreatingCheckout ? "Initializing..." : "Get Started"}
              </button>
            </div>
          ))}
        </div>


      </div>
    );
  }

  // View 2: Active Subscription Management
  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-10 italic">
        Subscription Management
      </h1>

      {/* Current Plan Card */}
      <div className="relative overflow-hidden bg-[#12143A] rounded-[32px] p-10 border border-white/[0.05] group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-2 italic uppercase">{displaySub.plan_name}</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{displaySub.plan_type} SUBSCRIPTION</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {displaySub.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm text-gray-400 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              <button 
                onClick={() => setIsCancelModalOpen(true)}
                className="px-6 py-3 rounded-xl border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition-all active:scale-95"
              >
                Cancel Subscription
              </button>
              <button 
                className="px-6 py-3 rounded-xl bg-cyan-400/10 border border-cyan-400/30 text-cyan-400 text-xs font-black uppercase tracking-widest hover:bg-cyan-400/20 transition-all active:scale-95"
              >
                Change Plan
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-5xl font-black text-white">€{displaySub.amount}</p>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">/{displaySub.billing_cycle.toLowerCase()}</p>
          </div>
        </div>
      </div>

      {/* Billing Information Section */}
      <div className="bg-[#12143A] border border-white/[0.05] rounded-[32px] p-10 space-y-8">
        <h3 className="text-xl font-bold text-white tracking-tight italic uppercase">Billing Information</h3>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="p-6 bg-[#0B0D2C]/50 rounded-2xl border border-white/[0.03]">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Next Billing Date</p>
            <p className="text-sm text-white font-bold">{displaySub.next_billing_date}</p>
          </div>
          
          <div className="p-6 bg-[#0B0D2C]/50 rounded-2xl border border-white/[0.03]">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Payment Method</p>
            <div className="flex items-center gap-3">
               <div className="w-8 h-6 bg-cyan-400/10 rounded-md flex items-center justify-center text-cyan-400 border border-cyan-400/20">
                  <CreditCard size={14} />
               </div>
               <span className="text-sm text-white font-bold">{displaySub.card_brand.toUpperCase()} •••• {displaySub.card_last_four}</span>
            </div>
          </div>
          
          <div className="p-6 bg-[#0B0D2C]/50 rounded-2xl border border-white/[0.03]">
            <p className="text-[10px] text-gray-500 font-black uppercase tracking-widest mb-2">Auto-renewal</p>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${displaySub.auto_renewal ? 'bg-[#00D4AA]' : 'bg-red-500'} shadow-[0_0_10px_rgba(0,0,0,0.5)]`} />
              <span className="text-sm text-white font-black uppercase tracking-tighter">{displaySub.auto_renewal ? 'Active' : 'Disabled'}</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsUpdateModalOpen(true)}
          className="w-full py-5 rounded-2xl bg-gradient-to-r from-cyan-400/10 to-purple-500/10 border border-cyan-400/30 text-cyan-400 font-black uppercase tracking-widest hover:bg-cyan-400/20 transition-all text-sm active:scale-[0.99]"
        >
          Update Payment Method
        </button>
      </div>

      {/* Payment History Section */}
      <div className="bg-[#12143A] border border-white/[0.05] rounded-[32px] p-10">
        <h3 className="text-xl font-bold text-white tracking-tight mb-8 italic uppercase">Payment History</h3>
        
        <div className="overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/[0.05]">
                <th className="text-left pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Date</th>
                <th className="text-left pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Description</th>
                <th className="text-left pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Amount</th>
                <th className="text-left pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Status</th>
                <th className="text-right pb-4 text-[10px] font-black text-gray-500 uppercase tracking-widest">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {paymentHistory.map((item: PaymentHistoryItem) => (
                <tr key={item.id} className="group border-b border-white/[0.02] last:border-0 hover:bg-white/[0.01] transition-colors">
                  <td className="py-6 text-sm text-gray-300 font-bold">{new Date(item.payment_date).toLocaleDateString()}</td>
                  <td className="py-6 text-sm text-gray-400">{item.description}</td>
                  <td className="py-6 text-sm text-white font-black">{item.currency.toUpperCase()} {item.amount}</td>
                  <td className="py-6">
                    <span className="px-3 py-1 bg-[#00D4AA]/10 text-[#00D4AA] text-[10px] font-black uppercase rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <button className="p-3 bg-white/5 border border-white/5 rounded-xl text-cyan-400 hover:bg-cyan-400/10 hover:border-cyan-400/30 transition-all">
                       <Download size={18} />
                    </button>
                  </td>
                </tr>
              ))}
              {paymentHistory.length === 0 && (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-gray-500 font-medium italic">No payment history found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* --- Modals --- */}


      {/* Cancel Modal */}
      {isCancelModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-md bg-[#12143A] border border-white/10 rounded-[40px] p-10 text-center shadow-2xl animate-in zoom-in duration-300">
             <div className="w-20 h-20 bg-red-500/10 rounded-3xl flex items-center justify-center text-red-500 mx-auto mb-8 animate-bounce">
                <AlertCircle size={40} />
             </div>
             <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter italic">Cancel Subscription?</h3>
             <p className="text-gray-400 mb-8 leading-relaxed">
               No refund. Your subscription will stay active until <span className="text-white font-bold">{displaySub.next_billing_date}</span>, then it will not renew.
             </p>
             
             <div className="space-y-4 mb-8 text-left">
                <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Reason for cancelling (optional)</label>
                <textarea 
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                  placeholder="Tell us why you're leaving..."
                  className="w-full bg-[#0B0D2C] border border-white/5 rounded-2xl px-4 py-3 text-white focus:outline-none focus:border-red-500/50 transition-all text-sm min-h-[100px] resize-none"
                />
             </div>

             <div className="space-y-4 mb-10 text-left bg-[#0B0D2C] p-6 rounded-2xl border border-white/5">
                {displaySub.features.map((perk: string, i: number) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-gray-500">
                    <X size={14} className="text-red-500/50" /> {perk}
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsCancelModalOpen(false)}
                  className="py-4 rounded-xl bg-white/5 text-gray-300 font-bold hover:bg-white/10 transition-all border border-white/5 active:scale-95"
                >
                  Keep It
                </button>
                <button 
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className="py-4 rounded-xl bg-red-500 text-white font-black hover:bg-red-600 transition-all shadow-[0_8px_20px_rgba(239,68,68,0.3)] uppercase tracking-widest text-xs active:scale-95"
                >
                  {isCancelling ? "Processing..." : "Cancel Now"}
                </button>
             </div>
          </div>
        </div>
      )}

      {/* Update Payment Modal */}
      {isUpdateModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="relative w-full max-w-xl bg-[#12143A] border border-white/10 rounded-[40px] overflow-hidden shadow-2xl animate-in zoom-in duration-300">
             <div className="flex justify-between items-center p-8 border-b border-white/5">
                <h3 className="text-xl font-bold text-white tracking-tight italic uppercase">Update Payment Method</h3>
                <button onClick={() => setIsUpdateModalOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                  <X size={24} />
                </button>
             </div>

             <div className="p-10 space-y-8">
               <div className="space-y-3">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Current Payment Method</label>
                  <div className="flex items-center justify-between p-5 bg-[#0B0D2C] rounded-2xl border border-cyan-400/20">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-9 bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-400/30">
                           <CreditCard size={20} />
                        </div>
                        <div>
                           <p className="text-sm text-white font-bold">{displaySub.card_brand.toUpperCase()} •••• {displaySub.card_last_four}</p>
                           <p className="text-[10px] text-gray-500">Expires 12/26</p>
                        </div>
                     </div>
                     <span className="px-2 py-0.5 bg-cyan-400/10 text-cyan-400 text-[8px] font-black uppercase rounded-full tracking-widest">Active</span>
                  </div>
               </div>

               <form onSubmit={handleUpdatePayment} className="space-y-6">
                  <div className="space-y-4">
                    <p className="text-sm text-gray-400">Please enter your new payment details below.</p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-bold ml-1">Card Number</label>
                        <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="•••• •••• •••• ••••" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs text-gray-500 font-bold ml-1">CVV</label>
                        <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="•••" />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-5 bg-cyan-400/5 border border-cyan-400/10 rounded-2xl">
                     <Lock size={18} className="text-cyan-400" />
                     <p className="text-[10px] text-gray-400 leading-tight">
                       <span className="text-cyan-400 font-bold">Secure Update.</span> Your payment information is processed securely through Stripe encryption.
                     </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                     <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-4 text-gray-500 font-black uppercase tracking-widest text-xs hover:text-white transition-all">Cancel</button>
                     <button 
                        type="submit" 
                        disabled={isUpdating}
                        className="flex-[2] py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-lg hover:opacity-90 transition-all"
                      >
                       {isUpdating ? "Updating..." : "Update Card Details"}
                     </button>
                  </div>
               </form>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubscriptionPage;
