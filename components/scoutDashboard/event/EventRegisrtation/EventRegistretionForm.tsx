// components/scoutDashboard/event/EventRegisrtation/EventRegistretionForm.tsx
"use client";

import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { MapPin } from "lucide-react";

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
  city: string
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
    if (step === 0) fields = ["first_name", "last_name", "email", "phone_number"];
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
        className="flex items-center justify-between p-6 rounded-lg"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
          borderTop: `1.25px solid ${theme.colors.primaryCyan}4D`,
        }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Event Registration</h1>
          <h1 className="pt-2 text-white">{event.event_name}</h1>
          <p className="flex text-white items-center gap-2 mt-2">
            <span>{event.event_date}</span>
            <MapPin className="w-5 h-5" />
            {event.city}
          </p>
        </div>

        <div className="text-right">
          <p className="text-gray-400 text-sm">Registration Fee</p>
          <p className="text-4xl font-bold" style={{ color: theme.colors.primaryCyan }}>
            {event.registration_fee}
          </p>
        </div>
      </div>

      <div className="bg-[#0B1220] rounded-2xl border border-[#1C2B40] p-6 w-full my-8">
        <Stepper steps={steps} currentStep={step} />
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            {step === 0 && <StepOne />}
            {step === 1 && <StepTwo />}
            {step === 2 && <StepReview />}

            <div className="flex justify-between mt-6">
              {step > 0 && (
                <button
                  type="button"
                  onClick={prev}
                  className="px-4 py-2 border border-[#1C2B40] rounded-lg text-gray-400"
                >
                  Back
                </button>
              )}

              {step < 2 && (
                <button
                  type="button"
                  onClick={next}
                  className="ml-auto px-6 py-2 bg-teal-400 text-black font-semibold rounded-lg"
                >
                  Continue
                </button>
              )}

              {step === 2 && (
                <button
                  type="submit"
                  className="ml-auto px-6 py-2 bg-teal-400 text-black font-semibold rounded-lg"
                >
                  Confirm Registration
                </button>
              )}
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
}