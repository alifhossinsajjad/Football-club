// components/scoutDashboard/event/EventRegisrtation/EventRegistretionForm.tsx
"use client";

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

type FormValues = {
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  agency_name: string;
  event: number;
  city: string;
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

  const methods = useForm<FormValues>({
    defaultValues: {
      event: event.id,
    },
    mode: "onChange",
  });

  const next = async () => {
    let fields: (keyof FormValues)[] = [];
    if (step === 0)
      fields = ["first_name", "last_name", "email", "phone_number"];
    if (step === 1) fields = ["agency_name"];

    const valid = await methods.trigger(fields);
    if (valid) setStep((prev) => prev + 1);
  };

  const prev = () => setStep((prev) => prev - 1);

  const onSubmit = async (data: FormValues) => {
    console.log("Submitting:", data);
    toast.success("Registration Successful");
    methods.reset();
    if (onSuccess) onSuccess();
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

        <div className="text-right relative z-10">
          <p className="text-white/40 text-xs uppercase tracking-wider mb-1">Registration Fee</p>
          <p className="text-4xl font-black text-[#00E5FF]">
            {event.registration_fee.toUpperCase() === "FREE" ? "FREE" : event.registration_fee}
          </p>
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
            {step === 2 && <StepReview />}

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
