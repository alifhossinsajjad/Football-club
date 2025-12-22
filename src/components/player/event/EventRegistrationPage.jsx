"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Check, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";

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
        <div className=" mx-auto">
          {step === 1 && <Step1 />}

          {step === 2 && <Step2 />}

          {step === 3 && (
            <div
              className="rounded-xl p-8 space-y-8"
              style={{ backgroundColor: theme.colors.backgroundCard }}
            >
              <h2 className="text-2xl font-bold text-white mb-8">Payment</h2>

              {/* Payment Summary */}
              <div
                className="rounded-xl p-6 mb-8"
                style={{ backgroundColor: theme.colors.backgroundDark }}
              >
                <div className="flex justify-between mb-4">
                  <span className="text-gray-300">Registration Fee</span>
                  <span className="text-white">€{event.price}</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-gray-300">Processing Fee</span>
                  <span className="text-white">€2.50</span>
                </div>
                <div className="border-t border-primaryCyan/20 pt-4 flex justify-between text-2xl font-bold">
                  <span className="text-gray-300">Total</span>
                  <span style={{ color: theme.colors.primaryCyan }}>
                    €{(event.price + 2.5).toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Payment Details */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-4">
                  Payment Details
                </h3>
                <Input placeholder="Card Number" className="mb-4" />
                <div className="grid grid-cols-2 gap-4">
                  <Input placeholder="Expiry Date" />
                  <Input placeholder="CVV" />
                </div>
                <Input placeholder="Name on card" className="mt-4" />
              </div>

              <div className="p-4 rounded-lg bg-backgroundDark/50 flex items-center gap-3">
                <Lock className="w-5 h-5 text-primaryCyan" />
                <p className="text-sm text-gray-300">
                  Your payment information is encrypted and secure. We use
                  Stripe for payment processing.
                </p>
              </div>
            </div>
          )}

          {step === 4 && (
            <div
              className="text-center py-12"
              style={{
                backgroundColor: theme.colors.backgroundCard,
                borderColor: `${theme.colors.primaryCyan}33`,
              }}
            >
              <div className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta flex items-center justify-center">
                <Check className="w-20 h-20 text-white" />
              </div>

              <h2 className="text-3xl font-bold text-white mb-4">
                Review Your Registration
              </h2>
              <p className="text-gray-300 mb-12 max-w-lg mx-auto">
                Please review all information before confirming
              </p>

              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
                <div
                  className="rounded-xl p-6 text-left"
                  style={{ backgroundColor: theme.colors.backgroundCard }}
                >
                  <h4 className="text-white font-semibold mb-4">
                    Personal Info
                  </h4>
                  <p className="text-gray-300">Name: John Doe</p>
                  <p className="text-gray-300">Email: john.doe@example.com</p>
                  <p className="text-gray-300">Phone: +34 XXX XXX XXX</p>
                  <p className="text-gray-300">DoB: 2005-02-10</p>
                </div>

                <div
                  className="rounded-xl p-6 text-left"
                  style={{ backgroundColor: theme.colors.backgroundCard }}
                >
                  <h4 className="text-white font-semibold mb-4">
                    Emergency Contact
                  </h4>
                  <p className="text-gray-300">Name: Not provided</p>
                  <p className="text-gray-300">Relationship: parent</p>
                </div>

                <div
                  className="rounded-xl p-6 text-left"
                  style={{ backgroundColor: theme.colors.backgroundCard }}
                >
                  <h4 className="text-white font-semibold mb-4">Payment</h4>
                  <p className="text-gray-300">Total Amount</p>
                  <p
                    className="text-2xl font-bold"
                    style={{ color: theme.colors.primaryCyan }}
                  >
                    € 52.50
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Card ending in **
                  </p>
                </div>
              </div>

              <div className="space-y-4 max-w-2xl mx-auto text-left mb-12">
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="text-gray-300">
                    I agree to the{" "}
                    <a href="#" className="text-primaryCyan underline">
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a href="#" className="text-primaryCyan underline">
                      Privacy Policy
                    </a>
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="text-gray-300">
                    I acknowledge that I will provide a medical clearance
                    certificate and understand the physical requirements of this
                    event
                  </span>
                </label>
                <label className="flex items-center gap-3">
                  <input type="checkbox" className="w-5 h-5" />
                  <span className="text-gray-300">
                    Cancellation Policy: Full refund 3-6 days before event, 50%
                    within 3 days. No refund less than 3 days.
                  </span>
                </label>
              </div>

              <div
                className="rounded-xl p-6 mb-12 border"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                  borderColor: `${theme.colors.primaryCyan}33`,
                }}
              >
                <h4 className="text-white font-semibold mb-4">
                  Final Payment Summary
                </h4>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Registration Fee</span>
                  <span className="text-white">€ {event.price}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-300">Processing Fee</span>
                  <span className="text-white">€ 2.50</span>
                </div>
                <div className="border-t border-primaryCyan/20 pt-4 flex justify-between text-xl font-bold">
                  <span className="text-gray-300">Total Amount</span>
                  <span style={{ color: theme.colors.primaryCyan }}>
                    € 52.50
                  </span>
                </div>
              </div>

              <Button
                className="rounded-full py-6 px-12 text-lg"
                style={{ backgroundColor: theme.colors.primaryCyan }}
              >
                Confirm Registration & Pay € 52.50
              </Button>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        {step < 4 && (
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
            <Button
              variant="outline"
              onClick={handleNext}
              className=" px-8"
              style={{ backgroundColor: theme.colors.primaryCyan }}
            >
              Next Step →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
