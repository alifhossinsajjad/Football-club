import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { MapPin, Calendar, ArrowRight, ArrowLeft, Check } from "lucide-react";

import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepReview from "./StepReview";
import Stepper from "./Stepper";
import { useRegisterForEventMutation, useValidatePromoMutation } from "@/redux/features/scout/eventsApi";

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  region_country: string;
  specialization: string;
  years_of_experience: number;
  event: number;
  promo_code?: string;
};

type EventRegistrationFormProps = {
  event: {
    id: number;
    event_name: string;
    registration_fee: string;
    city: string;
    event_date: string;
  };
  onClose?: () => void;
  onSuccess?: () => void;
};

const steps = ["Personal Info", "Professional", "Review"];

export default function EventRegistrationForm({
  event,
  onSuccess,
}: EventRegistrationFormProps) {
  const [step, setStep] = useState(0);
  const theme = useAppSelector((state: RootState) => state.theme);
  const [registerForEvent, { isLoading: isRegistering }] = useRegisterForEventMutation();

  const methods = useForm<FormValues>({
    defaultValues: {
      event: event.id,
      first_name: "",
      last_name: "",
      email: "",
      phone_number: "",
      region_country: "",
      specialization: "",
      years_of_experience: 0,
      promo_code: "",
    },
    mode: "onChange",
  });

  const [promoCode, setPromoCode] = useState("");
  const [promoAmount, setPromoAmount] = useState<number>(0);
  const [isPromoApplied, setIsPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState("");
  const [validatePromo, { isLoading: isApplyingPromo }] = useValidatePromoMutation();

  const handleApplyPromo = async () => {
    if (!promoCode.trim()) return;
    setPromoError("");
    try {
      const res = await validatePromo({ code: promoCode, amount: parseFloat(event.registration_fee === "Free" ? "0" : (event.registration_fee || "0").replace(/[^0-9.]/g, '')), usage_type: "EVENT" }).unwrap();
      if (res.data?.discount_amount) {
        setPromoAmount(Number(res.data.discount_amount));
        setIsPromoApplied(true);
        methods.setValue("promo_code", promoCode);
        toast.success("Promo code applied successfully!");
      }
    } catch (err: any) {
      setPromoError(err?.data?.message || err?.data?.error || "Invalid promo code");
      setPromoAmount(0);
      setIsPromoApplied(false);
      methods.setValue("promo_code", "");
    }
  };

  const next = async () => {
    let fields: (keyof FormValues)[] = [];
    if (step === 0)
      fields = ["first_name", "last_name", "email", "phone_number"];
    if (step === 1) fields = ["region_country", "specialization", "years_of_experience"];

    const valid = await methods.trigger(fields);
    if (valid) setStep((prev) => prev + 1);
  };

  const prev = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await registerForEvent({
        ...data,
        years_of_experience: Number(data.years_of_experience),
        ...(isPromoApplied && methods.getValues("promo_code") ? { promo_code: methods.getValues("promo_code") } : {}),
      }).unwrap();

      if (response.success) {
        if (response.checkout_url) {
          toast.success("Redirecting to payment...");
          window.location.href = response.checkout_url;
        } else {
          toast.success(response.message || "Registration Successful");
          if (onSuccess) onSuccess();
        }
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (err: any) {
      toast.error(err?.data?.message || "Something went wrong during registration");
    }
  };

  return (
    <div>
      {/* Back Button */}
      <div className="flex items-center gap-4 mb-4">
        <Button
          onClick={onSuccess}
          className="hover:underline bg-transparent border-none"
          style={{ color: theme.colors.primaryCyan }}
        >
          ← Back to Event Details
        </Button>
      </div>

      {/* Header Card */}
      <div
        className="flex items-center justify-between p-8 rounded-2xl mb-8 relative overflow-hidden"
        style={{
          background: "linear-gradient(98.3deg, rgba(0, 229, 255, 0.1) 0%, rgba(176, 38, 255, 0.1) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        }}
      >
        <div className="relative z-10">
          <h1 className="text-3xl font-bold text-white mb-4">Event Registration</h1>
          <h2 className="text-xl font-semibold text-white/90 mb-3">{event.event_name}</h2>
          <div className="flex flex-wrap items-center gap-6 text-white/60">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm">{event.event_date}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-[#00E5FF]" />
              <span className="text-sm">{event.city}</span>
            </div>
          </div>
        </div>

        <div className="text-right relative z-10 flex flex-col items-end">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Registration Fee</p>
          <div className="flex items-center gap-3">
            <p className={`text-4xl font-black ${isPromoApplied ? 'text-white/50 line-through text-2xl' : 'text-[#00E5FF]'}`}>
              {event.registration_fee.toUpperCase() === "FREE" ? "FREE" : event.registration_fee}
            </p>
            {isPromoApplied && (
              <p className="text-4xl font-black text-[#00E5FF]">
                €{Math.max(0, parseFloat(event.registration_fee || "0") - promoAmount).toFixed(2)}
              </p>
            )}
          </div>
        </div>
        
        {/* Subtle decorative glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#00E5FF]/5 blur-[100px] -mr-32 -mt-32" />
      </div>

      <div className="bg-[#050B14] border border-white/5 rounded-3xl p-8 w-full shadow-2xl">
        <Stepper steps={steps} currentStep={step} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 0 && <StepOne />}
            {step === 1 && <StepTwo />}
            {step === 2 && (
              <>
                <StepReview />
                <div className="mt-8 bg-[#0A0F1D] border border-white/5 rounded-2xl p-6">
                  <div className="space-y-3">
                    <label className="text-xs text-white/60 font-bold uppercase tracking-widest">Promo Code</label>
                    <div className="flex gap-3">
                      <input 
                        value={promoCode} 
                        onChange={(e) => setPromoCode(e.target.value)} 
                        disabled={isPromoApplied}
                        className={`flex-1 bg-white/5 border ${promoError ? 'border-red-500' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF] transition-all`} 
                        placeholder="Enter discount code" 
                      />
                      <button 
                        type="button" 
                        onClick={(e) => { e.preventDefault(); handleApplyPromo(); }} 
                        disabled={isPromoApplied || isApplyingPromo || !promoCode}
                        className="px-6 py-3 bg-[#00E5FF]/20 text-[#00E5FF] border border-[#00E5FF]/30 hover:bg-[#00E5FF] hover:text-black font-bold rounded-xl transition-all disabled:opacity-50 disabled:hover:bg-[#00E5FF]/20 disabled:hover:text-[#00E5FF]"
                      >
                        {isApplyingPromo ? "Applying..." : isPromoApplied ? "Applied" : "Apply"}
                      </button>
                    </div>
                    {promoError && <p className="text-red-500 text-xs mt-1">{promoError}</p>}
                  </div>
                </div>
              </>
            )}

            <div className="flex justify-between mt-10 pt-6 border-t border-white/5">
              {step > 0 && (
                <button
                  type="button"
                  onClick={prev}
                  className="px-8 py-3 rounded-xl text-white font-medium bg-white/5 hover:bg-white/10 transition-all flex items-center gap-2"
                >
                  Back
                </button>
              )}

              {step < 2 && (
                <button
                  type="button"
                  onClick={next}
                  className="ml-auto px-8 py-3 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black font-bold rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                >
                  Next Step
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {step === 2 && (
                <button
                  type="submit"
                  className="ml-auto px-8 py-3 bg-[#00E5FF] hover:bg-[#00E5FF]/90 text-black font-bold rounded-xl transition-all flex items-center gap-2 shadow-[0_0_20px_rgba(0,229,255,0.2)]"
                >
                  Confirm Registration
                  <Check className="w-4 h-4" />
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}
