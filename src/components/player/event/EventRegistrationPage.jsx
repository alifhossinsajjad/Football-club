"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, Lock, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

export default function EventRegistrationPage({ params }) {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const [step, setStep] = useState(1);

  const event = {
    title: "Talent Scouting Day",
    location: "Lisbon, Portugal",
    date: "25/09/2025",
    price: 40,
  };

  const steps = [
    "Personal Info",
    "Emergency Contact",
    "Payment",
    "Confirmation",
  ];

  const handleNext = () => {
    if (step < 4) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else router.push(`/player/events/${params.id}`);
  };

  const processingFee = 2.5;
  const total = (event.price + processingFee).toFixed(2);
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          onClick={() => router.push("/player/events")}
          className=" hover:underline bg-none border-none "
          style={{
            color: theme.colors.primaryCyan,
          }}
        >
          ← Back to Events Directory
        </Button>
      </div>

      <div
        className="flex items-center justify-between p-6 rounded-lg"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primaryCyan}33, ${theme.colors.primaryMagenta}33)`,
          borderTop: `1.25px solid ${theme.colors.primaryCyan}4D`,
        }}
      >
        <div>
          <h1 className="text-3xl font-bold text-white">Event Registration</h1>
          <h1 className="pt-2 text-white">{event.title}</h1>
          <p className="text-gray-300 flex items-center gap-2 mt-2">
            <MapPin className="w-5 h-5" />
            {event.location}
          </p>
        </div>
        <div className="text-right">
          <p className="text-gray-400 text-sm">Registration Fee</p>
          <p
            className="text-4xl font-bold"
            style={{ color: theme.colors.primaryCyan }}
          >
            €{event.price}
          </p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="py-8">
        <div
          className="flex items-center justify-start sm:justify-center
                gap-8 py-6 rounded-md mb-12 border px-12  mx-auto overflow-auto"
          style={{
            backgroundColor: theme.colors.backgroundCard,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          {steps.map((s, i) => (
            <div key={i} className="flex items-center gap-4">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold "
                style={{
                  background:
                    i + 1 <= step
                      ? `linear-gradient(135deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`
                      : theme.colors.backgroundDark,
                  color: i + 1 <= step ? "white" : theme.colors.primaryCyan,
                }}
              >
                {i + 1 < step ? <Check className="w-6 h-6" /> : i + 1}
              </div>
              <span
                className={`text-sm ${
                  i + 1 <= step ? "text-white" : "text-gray-500"
                }`}
              >
                {s}
              </span>
              {i < steps.length - 1 && (
                <div
                  className="w-32 h-0.5 rounded-full"
                  style={{
                    background:
                      i + 1 < step
                        ? `linear-gradient(135deg, ${theme.colors.primaryCyan}, ${theme.colors.primaryMagenta})`
                        : theme.colors.backgroundDark,
                  }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="mx-auto">
          {step === 1 && <Step1 event={event} />}

          {step === 2 && <Step2 event={event} />}

          {step === 3 && <Step3 event={event} />}

          {step === 4 && <Step4 event={event} />}
        </div>

        {/* Navigation Buttons */}
        {step < 5 && (
          <div
            className={`mx-auto mt-12 flex ${
              step != 1 ? "justify-between" : "justify-end"
            }  p-6 rounded-lg border`}
            style={{
              backgroundColor: theme.colors.backgroundCard,
              borderColor: `${theme.colors.primaryCyan}33`,
            }}
          >
            {step != 1 && (
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            )}
            {step != 4 && (
              <Button
                variant="outline"
                onClick={handleNext}
                className=" px-8"
                style={{ backgroundColor: theme.colors.primaryCyan }}
              >
                Next Step →
              </Button>
            )}
            {step == 4 && (
              <div className="text-center mt-12">
                <Button
                  variant="outline"
                  className="rounded-md py-10 px-8  font-semibold flex items-center justify-center gap-3 text-left hover:bg-primaryCyan/20"
                  style={{
                    backgroundColor: `${theme.colors.primaryCyan}`,
                  }}
                >
                  <div className="text-left text-lg ">
                    Confirm Registration & Pay
                    <h3 className="text-sm">Secure payment via Stripe</h3>
                  </div>
                  <div
                    className="text-2xl p-3  rounded-full shadow-md"
                    style={{
                      backgroundColor: `${theme.colors.primaryCyan}`,
                      opacity: 0.95,
                    }}
                  >
                    € {total}
                  </div>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
