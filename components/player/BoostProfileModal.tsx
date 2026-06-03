"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  ChevronLeft,
  Zap,
  Star,
  Eye,
  Search,
  Award,
  Check,
  Lock,
} from "lucide-react";
import toast from "react-hot-toast";

import {
  useGetBoostPackagesQuery,
  useCreateBoostCheckoutMutation,
  useValidatePromoMutation,
  BoostPackage,
} from "@/redux/features/player/profileBoostingApi";
import { useGetMyProfileQuery } from "@/redux/features/player/playerProfileAndEdit/profileAndEditApi";

interface BoostProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BoostProfileModal({ isOpen, onClose }: BoostProfileModalProps) {
  const [step, setStep] = useState<1 | 2>(1);
  const [selectedPackageId, setSelectedPackageId] = useState<number | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoAmount, setPromoAmount] = useState<number>(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");

  const { data: profile } = useGetMyProfileQuery();
  const { data: packagesData, isLoading: isLoadingPackages } = useGetBoostPackagesQuery();
  const [createBoostCheckout, { isLoading: isCreatingCheckout }] = useCreateBoostCheckoutMutation();
  const [validatePromo, { isLoading: isApplyingPromo }] = useValidatePromoMutation();

  const packages: BoostPackage[] = packagesData?.boostPackages ?? [];
  const selectedPackage = packages.find((p) => p.id === selectedPackageId) ?? null;

  // Reset state each time modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setSelectedPackageId(null);
      setPromoCode("");
      setPromoAmount(0);
      setIsPromoApplied(false);
      setPromoError("");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const finalPrice = Math.max(
    0,
    parseFloat(selectedPackage?.finalPrice ?? "0") - promoAmount
  );

  const handleApplyPromo = async () => {
    if (!promoCode.trim() || !selectedPackage) return;
    setPromoError("");
    try {
      const res = await validatePromo({
        code: promoCode,
        amount: parseFloat(selectedPackage.finalPrice),
        usage_type: "BOOSTING",
      }).unwrap();
      if (res.data?.discount_amount) {
        setPromoAmount(Number(res.data.discount_amount));
        setIsPromoApplied(true);
        toast.success("Promo code applied successfully!");
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      setPromoError(err?.data?.message ?? "Invalid promo code");
      setPromoAmount(0);
      setIsPromoApplied(false);
    }
  };

  const handleProceedToPayment = () => {
    if (!selectedPackageId) {
      toast.error("Please select a package.");
      return;
    }
    setStep(2);
  };

  const handlePayWithStripe = async () => {
    if (!selectedPackageId) return;
    try {
      const res = await createBoostCheckout({ package_id: selectedPackageId }).unwrap();
      if (res.checkout_url) {
        // Store session_id so we can verify after redirect
        sessionStorage.setItem("boost_session_id", res.session_id);
        window.location.href = res.checkout_url;
      }
    } catch (error: unknown) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message ?? "Failed to initiate payment. Try again.");
    }
  };

  const renderBenefits = () => (
    <div className="space-y-4 text-sm mt-6">
      {[
        { icon: <Star size={18} className="text-yellow-400 mt-0.5" />, title: "Featured Placement", sub: "Top position in directory listings" },
        { icon: <Eye size={18} className="text-[#00E5FF] mt-0.5" />, title: "4x More Visibility", sub: "Increased profile views and engagement" },
        { icon: <Search size={18} className="text-[#00E5FF] mt-0.5" />, title: "Priority in Search", sub: "Appear first in search results" },
        { icon: <Award size={18} className="text-yellow-500 mt-0.5" />, title: "Special Badge", sub: "Featured badge on profile" },
      ].map(({ icon, title, sub }) => (
        <div key={title} className="flex gap-3">
          {icon}
          <div>
            <p className="font-bold text-white">{title}</p>
            <p className="text-[#8B97B5] text-xs">{sub}</p>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 lg:p-6 bg-black/70 backdrop-blur-sm overflow-y-auto">
      <div className="w-full max-w-5xl bg-[#080B1A] border border-[#1E2554] rounded-2xl shadow-2xl relative flex flex-col my-auto max-h-[95vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#1E2554]">
          <div className="flex items-center gap-4">
            {step === 2 && (
              <button
                onClick={() => setStep(1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#11163C] hover:bg-[#1A2255] transition-colors border border-[#1E2554]"
              >
                <ChevronLeft size={16} className="text-gray-300" />
              </button>
            )}
            <div>
              <h2 className="text-2xl font-black bg-linear-to-r from-[#00E5FF] to-[#B026FF] bg-clip-text text-transparent">
                Boost Your Profile
              </h2>
              <p className="text-[#8B97B5] text-sm">
                Feature your profile to increase visibility and engagement
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#11163C] hover:bg-[#1A2255] transition-colors border border-[#1E2554] text-gray-400 hover:text-white"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-y-auto min-h-[500px]">
          {/* LEFT */}
          <div className="flex-1 p-6 lg:border-r border-[#1E2554]">

            {/* STEP 1 — Select Package */}
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Profile card */}
                <div className="bg-[#11163C] border border-[#1E2554] rounded-xl p-4 flex items-center gap-4">
                  <img
                    src={profile?.profile_image ?? "https://cdn-icons-png.flaticon.com/512/149/149071.png"}
                    alt="Player Profile"
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#00E5FF]"
                  />
                  <div>
                    <h3 className="font-bold text-white text-lg">{profile?.full_name ?? "John Doe"}</h3>
                    <p className="text-sm text-[#00E5FF] capitalize">{profile?.designation ?? "Forward"}</p>
                  </div>
                </div>

                {/* Packages */}
                <div>
                  <h3 className="text-white font-bold mb-4">Step 1: Choose Boost Duration</h3>
                  {isLoadingPackages ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="h-24 bg-[#11163C] animate-pulse rounded-xl border border-[#1E2554]" />
                      <div className="h-24 bg-[#11163C] animate-pulse rounded-xl border border-[#1E2554]" />
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {packages.map((pkg) => (
                        <div
                          key={pkg.id}
                          onClick={() => setSelectedPackageId(pkg.id)}
                          className={`relative p-5 rounded-xl border-2 cursor-pointer transition-all ${
                            selectedPackageId === pkg.id
                              ? "border-[#00E5FF] bg-[#11163C]"
                              : "border-[#1E2554] bg-[#0A0D23] hover:border-[#3A4579]"
                          }`}
                        >
                          {pkg.discount > 0 && (
                            <span className="absolute -top-3 right-4 bg-[#00E564] text-black text-xs font-black px-2 py-1 rounded">
                              Save {pkg.discount}%
                            </span>
                          )}
                          <div className="flex justify-between items-center">
                            <span className="font-bold text-white text-lg">{pkg.duration}</span>
                            <span className="font-black text-[#00E5FF] text-2xl">€{pkg.finalPrice}</span>
                          </div>
                          {/* Features preview */}
                          {selectedPackageId === pkg.id && pkg.features.length > 0 && (
                            <ul className="mt-3 space-y-1">
                              {pkg.features.map((f) => (
                                <li key={f} className="text-xs text-[#8B97B5] flex items-center gap-2">
                                  <Check size={10} className="text-[#00E5FF]" /> {f}
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* STEP 2 — Order Confirmation */}
            {step === 2 && selectedPackage && (
              <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-500">
                <h3 className="text-white font-bold text-xl mb-2">Confirm & Pay</h3>

                <div className="bg-[#11163C] p-5 rounded-xl border border-[#1E2554] space-y-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-linear-to-br from-[#00E5FF] to-[#B026FF] flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.3)]">
                      <Zap size={20} className="text-white" />
                    </div>
                    <div>
                      <p className="font-bold text-white">Profile Boost</p>
                      <p className="text-sm text-[#00E5FF]">{selectedPackage.duration}</p>
                    </div>
                  </div>

                  <div className="border-t border-[#1E2554] pt-4 space-y-3 text-sm">
                    <div className="flex justify-between text-[#8B97B5]">
                      <span>Package Price</span>
                      <span className="text-white">€{selectedPackage.price}</span>
                    </div>
                    {selectedPackage.discount > 0 && (
                      <div className="flex justify-between text-[#8B97B5]">
                        <span>Package Discount ({selectedPackage.discount}%)</span>
                        <span className="text-[#00E564]">
                          -€{(parseFloat(selectedPackage.price) - parseFloat(selectedPackage.finalPrice)).toFixed(2)}
                        </span>
                      </div>
                    )}
                    {isPromoApplied && (
                      <div className="flex justify-between text-[#00E5FF] font-bold">
                        <span>Promo ({promoCode})</span>
                        <span>-€{promoAmount.toFixed(2)}</span>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-between items-center bg-[#080B1A] p-4 rounded-xl border border-[#1E2550]">
                    <span className="font-bold text-white">Total</span>
                    <span className="font-black text-2xl text-[#00E5FF]">€{finalPrice.toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs text-[#04B5A3]">
                  <Lock size={14} /> Secure Payment via Stripe &nbsp;|&nbsp; 256-bit SSL Encrypted
                </div>
              </div>
            )}
          </div>

          {/* RIGHT — Summary Panel */}
          <div className="w-full lg:w-[400px] bg-[#0A0D23] p-8 flex flex-col justify-between">
            {step === 1 && (
              <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-[#11163C] border border-[#1E2554] rounded-2xl p-6 text-center shadow-lg relative overflow-hidden">
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#00E5FF]/20 blur-3xl rounded-full" />
                  <div className="w-16 h-16 rounded-full bg-linear-to-br from-[#00E5FF] to-[#B026FF] flex items-center justify-center mx-auto mb-4 border-4 border-[#080B1A] shadow-[0_0_20px_rgba(0,229,255,0.4)]">
                    <Zap size={28} className="text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-6">Boost Summary</h3>

                  <div className="space-y-4 text-sm mb-6">
                    <div className="flex justify-between items-center border-b border-[#1E2554] pb-4">
                      <span className="text-[#8B97B5]">Duration</span>
                      <span className="font-bold text-white">{selectedPackage?.duration ?? "—"}</span>
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <span className="text-[#8B97B5]">Total Price</span>
                      <span className="font-black text-2xl text-[#00E5FF]">
                        €{finalPrice.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Promo Code */}
                  <div className="mb-6 space-y-2 text-left">
                    <label className="text-xs text-[#8B97B5] font-bold uppercase tracking-widest pl-1">
                      Promo Code
                    </label>
                    <div className="flex gap-2">
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        disabled={isPromoApplied || !selectedPackageId}
                        placeholder={!selectedPackageId ? "Select a package first" : "Enter code"}
                        className={`flex-1 bg-[#080B1A] border ${
                          promoError ? "border-red-500" : "border-[#1E2550]"
                        } rounded-xl px-3 py-2 text-white focus:outline-none focus:border-[#00E5FF] transition-all text-sm`}
                      />
                      <button
                        type="button"
                        onClick={handleApplyPromo}
                        disabled={!selectedPackageId || isPromoApplied || isApplyingPromo || !promoCode}
                        className="px-4 py-2 bg-[#00E5FF]/20 text-[#00E5FF] hover:bg-[#00E5FF]/30 font-bold text-xs uppercase rounded-xl disabled:opacity-50 transition-all"
                      >
                        {isApplyingPromo ? "..." : isPromoApplied ? "Applied ✓" : "Apply"}
                      </button>
                    </div>
                    {promoError && <p className="text-red-500 text-xs pl-1">{promoError}</p>}
                    {isPromoApplied && (
                      <p className="text-[#00E564] text-xs pl-1">Discount applied: -€{promoAmount.toFixed(2)}</p>
                    )}
                  </div>

                  {/* Benefits */}
                  <div className="bg-[#080B1A] rounded-xl p-4 text-left border border-[#1E2550]">
                    <h4 className="text-xs font-bold text-[#8B97B5] mb-2 uppercase flex items-center gap-2">
                      <Zap size={12} /> Boost Benefits
                    </h4>
                    {renderBenefits()}
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  disabled={!selectedPackageId}
                  className="w-full py-4 rounded-xl bg-[#00A79D] text-white font-bold text-lg hover:bg-[#00E5FF] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_12px_24px_-8px_rgba(0,167,157,0.4)] flex items-center justify-center gap-2"
                >
                  <Zap size={18} /> Proceed to Payment
                </button>
              </div>
            )}

            {step === 2 && selectedPackage && (
              <div className="space-y-4 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-[#11163C] border border-[#1E2554] rounded-2xl p-6 space-y-4">
                  <h3 className="text-lg font-bold text-white">What you get</h3>
                  <ul className="space-y-2">
                    {selectedPackage.features.map((f) => (
                      <li key={f} className="text-sm text-[#8B97B5] flex items-start gap-2">
                        <Check size={14} className="text-[#00E5FF] mt-0.5 shrink-0" /> {f}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={handlePayWithStripe}
                  disabled={isCreatingCheckout}
                  className="w-full py-4 rounded-xl bg-[#00A79D] text-white font-bold text-lg hover:bg-[#00E5FF] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_12px_24px_-8px_rgba(0,167,157,0.4)] flex items-center justify-center gap-2"
                >
                  {isCreatingCheckout ? (
                    <span className="flex items-center gap-2">
                      <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Redirecting...
                    </span>
                  ) : (
                    <><Lock size={18} /> Pay €{finalPrice.toFixed(2)} with Stripe</>
                  )}
                </button>

                <button
                  onClick={() => setStep(1)}
                  className="w-full py-3 rounded-xl bg-[#11163C] text-[#8B97B5] font-bold text-sm hover:text-white transition-all border border-[#1E2554] hover:bg-[#1A2255]"
                >
                  ← Back to Selection
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
