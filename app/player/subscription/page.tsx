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
  useUpdatePaymentMethodMutation 
} from "../../../redux/features/player/subscriptionApi";

const CheckIcon = () => (
  <div className="w-5 h-5 rounded-full bg-[#00D4AA]/20 flex items-center justify-center">
    <Check size={12} className="text-[#00D4AA]" strokeWidth={3} />
  </div>
);

const SubscriptionPage = () => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);

  const { data: subscription, isLoading: isSubLoading } = useGetSubscriptionQuery();
  const { data: paymentHistory = [], isLoading: isHistoryLoading } = useGetPaymentHistoryQuery();
  const [cancelSubscription, { isLoading: isCancelling }] = useCancelSubscriptionMutation();
  const [updatePaymentMethod, { isLoading: isUpdating }] = useUpdatePaymentMethodMutation();

  // Fallback data for design consistency
  const subData = subscription || {
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
  };

  const handleCancelSubscription = async () => {
    try {
      await cancelSubscription().unwrap();
      alert("Subscription cancelled successfully.");
      setIsCancelModalOpen(false);
    } catch (err) {
      alert("Failed to cancel subscription.");
    }
  };

  const handleUpdatePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // In a real app, you'd use Stripe Elements or similar
      await updatePaymentMethod({ dummy: "data" }).unwrap();
      alert("Payment method updated.");
      setIsUpdateModalOpen(false);
    } catch (err) {
      alert("Failed to update payment method.");
    }
  };

  if (isSubLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#00D4AA]"></div>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* Page Title */}
      <h1 className="text-4xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-10">
        Subscription Management
      </h1>

      {/* Current Plan Card */}
      <div className="relative overflow-hidden bg-[#12143A] rounded-[32px] p-10 border border-white/[0.05] group">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 to-purple-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
        <div className="relative flex flex-col md:flex-row justify-between items-start gap-8">
          <div className="space-y-6">
            <div>
              <h2 className="text-3xl font-black text-white mb-2">{subData.plan}</h2>
              <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">{subData.type}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-x-12 gap-y-4">
              {subData.features.map((feature: string, index: number) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckIcon />
                  <span className="text-sm text-gray-400 font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setIsCancelModalOpen(true)}
              className="px-6 py-3 rounded-xl border border-red-500/30 text-red-500 text-xs font-black uppercase tracking-widest hover:bg-red-500/10 transition-all"
            >
              Cancel Subscription
            </button>
          </div>

          <div className="text-right">
            <p className="text-5xl font-black text-white">{subData.price}</p>
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2">{subData.period}</p>
          </div>
        </div>
      </div>

      {/* Billing Information Section */}
      <div className="bg-[#12143A] border border-white/[0.05] rounded-[32px] p-10 space-y-8">
        <h3 className="text-xl font-bold text-white tracking-tight">Billing Information</h3>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center p-6 bg-[#0B0D2C] rounded-2xl border border-white/[0.03]">
            <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Next billing date:</span>
            <span className="text-sm text-white font-bold">{subData.billing.nextBillingDate}</span>
          </div>
          
          <div className="flex justify-between items-center p-6 bg-[#0B0D2C] rounded-2xl border border-white/[0.03]">
            <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Payment method:</span>
            <div className="flex items-center gap-3">
               <CreditCard size={18} className="text-[#00D4AA]" />
               <span className="text-sm text-white font-bold">{subData.billing.paymentMethod}</span>
            </div>
          </div>
          
          <div className="flex justify-between items-center p-6 bg-[#0B0D2C] rounded-2xl border border-white/[0.03]">
            <span className="text-sm text-gray-500 font-bold uppercase tracking-wider">Auto-renewal:</span>
            <span className="text-sm text-[#00D4AA] font-black uppercase tracking-tighter">{subData.billing.autoRenewal}</span>
          </div>
        </div>

        <button 
          onClick={() => setIsUpdateModalOpen(true)}
          className="w-full py-5 rounded-2xl border border-cyan-400/30 text-cyan-400 font-black uppercase tracking-widest hover:bg-cyan-400/5 transition-all text-sm"
        >
          Update Payment Method
        </button>
      </div>

      {/* Payment History Section */}
      <div className="bg-[#12143A] border border-white/[0.05] rounded-[32px] p-10">
        <h3 className="text-xl font-bold text-white tracking-tight mb-8">Payment History</h3>
        
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
              {(paymentHistory.length > 0 ? paymentHistory : [{ id: 1, date: "15/01/2025", description: "Annual Subscription", amount: "€9.99", status: "Paid" }]).map((item: any) => (
                <tr key={item.id} className="group border-b border-white/[0.02] last:border-0">
                  <td className="py-6 text-sm text-gray-300 font-bold">{item.date}</td>
                  <td className="py-6 text-sm text-gray-400">{item.description}</td>
                  <td className="py-6 text-sm text-white font-black">{item.amount}</td>
                  <td className="py-6">
                    <span className="px-3 py-1 bg-[#00D4AA]/10 text-[#00D4AA] text-[10px] font-black uppercase rounded-full">
                      {item.status}
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <button className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-2 ml-auto text-sm font-bold">
                       <Download size={16} /> Download
                    </button>
                  </td>
                </tr>
              ))}
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
             <h3 className="text-2xl font-black text-white mb-4 uppercase tracking-tighter">Cancel Subscription?</h3>
             <p className="text-gray-400 mb-8 leading-relaxed">
               No refund. Your subscription will stay active until <span className="text-white font-bold">{subData.billing.nextBillingDate}</span>, then it will not renew.
             </p>
             
             <div className="space-y-4 mb-10 text-left bg-[#0B0D2C] p-6 rounded-2xl border border-white/5">
                {[
                  "Unlimited events access",
                  "Featured talent listings",
                  "Advanced analytics tools",
                  "Priority support channel"
                ].map((perk, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs text-gray-500">
                    <X size={14} className="text-red-500/50" /> {perk}
                  </div>
                ))}
             </div>

             <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => setIsCancelModalOpen(false)}
                  className="py-4 rounded-xl bg-white/5 text-gray-300 font-bold hover:bg-white/10 transition-all border border-white/5"
                >
                  Keep Subscription
                </button>
                <button 
                  onClick={handleCancelSubscription}
                  disabled={isCancelling}
                  className="py-4 rounded-xl bg-red-500 text-white font-black hover:bg-red-600 transition-all shadow-[0_8px_20px_rgba(239,68,68,0.3)] uppercase tracking-widest text-xs"
                >
                  {isCancelling ? "Cancelling..." : "Cancel Now"}
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
                <h3 className="text-xl font-bold text-white tracking-tight">Update Payment Method</h3>
                <button onClick={() => setIsUpdateModalOpen(false)} className="p-2 rounded-full hover:bg-white/5 text-gray-500 hover:text-white transition-all">
                  <X size={24} />
                </button>
             </div>

             <div className="p-10 space-y-8">
               {/* Current Method Preview */}
               <div className="space-y-3">
                  <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Current Payment Method</label>
                  <div className="flex items-center justify-between p-5 bg-[#0B0D2C] rounded-2xl border border-cyan-400/20">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-9 bg-gradient-to-br from-cyan-400/20 to-cyan-500/20 rounded-lg flex items-center justify-center text-cyan-400 border border-cyan-400/30">
                           <CreditCard size={20} />
                        </div>
                        <div>
                           <p className="text-sm text-white font-bold">{subData.billing.paymentMethod}</p>
                           <p className="text-[10px] text-gray-500">Expires 12/26</p>
                        </div>
                     </div>
                     <span className="px-2 py-0.5 bg-cyan-400/10 text-cyan-400 text-[8px] font-black uppercase rounded-full tracking-widest">Active</span>
                  </div>
               </div>

               {/* Form */}
               <form onSubmit={handleUpdatePayment} className="space-y-6">
                  <div className="space-y-6">
                     <label className="text-[10px] text-gray-500 font-black uppercase tracking-widest ml-1">Add New Payment Method</label>
                     <div className="space-y-4">
                        <div className="space-y-2">
                           <label className="text-xs text-gray-500 font-bold ml-1">Card Number *</label>
                           <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <div className="space-y-2">
                              <label className="text-xs text-gray-500 font-bold ml-1">Expiry Date *</label>
                              <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="MM/YY" />
                           </div>
                           <div className="space-y-2">
                              <label className="text-xs text-gray-500 font-bold ml-1">CVV *</label>
                              <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="123" />
                           </div>
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs text-gray-500 font-bold ml-1">Cardholder Name *</label>
                           <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="John Doe" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-xs text-gray-500 font-bold ml-1">Billing Address *</label>
                           <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="Street Address" />
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                           <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="City" />
                           <input className="w-full bg-[#0B0D2C] border border-white/5 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-cyan-400 transition-all text-sm" placeholder="Postal Code" />
                        </div>
                     </div>
                  </div>

                  <div className="flex items-center gap-3 p-5 bg-cyan-400/5 border border-cyan-400/10 rounded-2xl">
                     <Lock size={18} className="text-cyan-400" />
                     <p className="text-[10px] text-gray-400 leading-tight">
                       <span className="text-cyan-400 font-bold">Your payment is secure.</span> We use industry-standard encryption to protect your sensitive information.
                     </p>
                  </div>

                  <div className="flex gap-4 pt-4">
                     <button type="button" onClick={() => setIsUpdateModalOpen(false)} className="flex-1 py-4 text-gray-500 font-black uppercase tracking-widest text-xs hover:text-white transition-all">Cancel</button>
                     <button 
                        type="submit" 
                        disabled={isUpdating}
                        className="flex-[2] py-4 bg-[#04B5A3] text-white font-black uppercase tracking-widest text-xs rounded-xl shadow-[0_8px_24px_rgba(4,181,163,0.3)] hover:opacity-90 transition-all"
                      >
                       {isUpdating ? "Updating..." : "Update Payment Method"}
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
