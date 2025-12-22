"use client";

import React from "react";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import {
  CardSim,
  Check,
  CreditCard,
  Lock,
  Phone,
  Shield,
  User,
} from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import Link from "next/link";

export default function Step4({ event, formData = {} }) {
  const theme = useSelector((state) => state.theme);

  const processingFee = 2.5;
  const total = (event.price + processingFee).toFixed(2);

  // Fallback data
  const personal = formData.personal || {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+34 XXX XXX XXX",
    dob: "2005-02-10",
  };

  const emergency = formData.emergency || {
    name: "Not provided",
    relationship: "Parent",
    phone: "Not provided",
  };

  return (
    <div
      className="space-y-8 pt-12  border rounded-sm p-6"
      style={{
        backgroundColor: theme.colors.backgroundCard,
        borderColor: `${theme.colors.primaryCyan}33`,
      }}
    >
      {/* Success Icon */}
      <div className="flex justify-center mb-8 ">
        <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta flex items-center justify-center">
          <div className="flex justify-center ">
            <Button className="w-24 h-24 rounded-full text-5xl ">
              <Check className="w-20 h-20 text-white" />
            </Button>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Review Your Registration
        </h2>
        <p className="text-gray-300 max-w-lg mx-auto">
          Please review all information before confirming
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8  mx-auto">
        {/* Personal Info */}
        <div
          className="rounded-xl p-8 border"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <h4 className="text-white font-semibold mb-6 flex items-center gap-3">
            <User
              className="w-6 h-6 "
              style={{
                color: theme.colors.primaryCyan,
              }}
            />{" "}
            Personal Info
          </h4>
          <div className="space-y-3 text-gray-300">
            <p>
              <div className="text-gray-400">Name</div> {personal.firstName}{" "}
              {personal.lastName}
            </p>
            <p>
              <div className="text-gray-400">Email</div> {personal.email}
            </p>
            <p>
              <div className="text-gray-400">Phone</div> {personal.phone}
            </p>
            <p>
              <div className="text-gray-400">Date of Birth</div> {personal.dob}
            </p>
          </div>
        </div>

        {/* Emergency Contact */}
        <div
          className="rounded-xl p-8 border"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <h4 className="text-white font-semibold mb-6 flex items-center gap-3">
            <Phone
              className="w-6 h-6 "
              style={{
                color: theme.colors.primaryCyan,
              }}
            />{" "}
            Emergency Contact
          </h4>
          <div className="space-y-3 text-gray-300">
            <p>
              <div className="text-gray-400">Name</div> {emergency.name}
            </p>
            <p>
              <div className="text-gray-400">Relationship</div>{" "}
              {emergency.relationship}
            </p>
            <p>
              <div className="text-gray-400">Phone</div> {emergency.phone}
            </p>
          </div>
        </div>

        {/* Payment */}
        <div
          className="rounded-xl p-8 border"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <h4 className="text-white font-semibold mb-6 flex items-center gap-3">
            <CreditCard
              className="w-6 h-6 "
              style={{
                color: theme.colors.primaryCyan,
              }}
            />{" "}
            Payment
          </h4>
          <div className="space-y-3">
            <p className="text-gray-300">Total Amount</p>
            <p
              className="text-3xl font-bold"
              style={{ color: theme.colors.primaryCyan }}
            >
              €{total}
            </p>
            <p className="text-gray-400 text-sm mt-2">Card ending in **</p>
          </div>
        </div>
      </div>

      {/* Agreements */}
      <div className=" mx-auto space-y-6">
        <label
          className="flex items-center gap-4 cursor-pointer hover:border  p-4 rounded-md "
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <Checkbox
            type="checkbox"
            className="mt-0.5 w-5 h-5 rounded accent-primaryCyan"
          />
          <span className="text-gray-300 text-base leading-relaxed">
            I agree to the{" "}
            <Link
              href="#"
              className=" underline"
              style={{
                color: theme.colors.primaryCyan,
              }}
            >
              Terms and Conditions
            </Link>{" "}
            and{" "}
            <a
              href="#"
              className=" underline"
              style={{
                color: theme.colors.primaryCyan,
              }}
            >
              Privacy Policy
            </a>
          </span>
        </label>

        <label
          className="flex items-center gap-4 cursor-pointer hover:border  p-4 rounded-md "
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <Checkbox
            type="checkbox"
            className="mt-1 w-5 h-5 rounded accent-primaryCyan"
          />
          <span className="text-gray-300 text-base leading-relaxed">
            I acknowledge that I will provide a medical clearance certificate
            and understand the physical requirements of this event
          </span>
        </label>

        <label
          className="flex items-center gap-4 cursor-pointer hover:border  p-4 rounded-md "
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}33`,
          }}
        >
          <Checkbox
            type="checkbox"
            className="mt-1 w-5 h-5 rounded accent-primaryCyan"
          />
          <span className="text-gray-300 text-base leading-relaxed">
            Cancellation Policy: Full refund 7+ days before the event. 3-6 days
            50% refund, less than 3 days: No refund.
          </span>
        </label>
      </div>

      {/* Final Payment Summary - Matching Step 3 Style */}
      <div
        className=" mx-auto rounded-xl p-8 border space-y-6"
        style={{
          background: `linear-gradient(90deg, ${theme.colors.primaryCyan}20, ${theme.colors.primaryMagenta}33)`,
          borderTop: `1.25px solid ${theme.colors.primaryCyan}4D`,
          borderColor: `${theme.colors.primaryCyan}33`,
        }}
      >
        <h4 className="text-2xl font-medium text-white">
          Final Payment Summary
        </h4>

        <div className="space-y-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Registration Fee</span>
            <span className="text-white">€{event.price}</span>
          </div>
          <div
            className="flex justify-between text-sm border-b pb-2 "
            style={{
              borderColor: theme.colors.primaryCyan,
            }}
          >
            <span className="text-gray-400">Processing Fee</span>
            <span className="text-white">€{processingFee}</span>
          </div>
          <div className="flex justify-between text-sm ">
            <span className="text-gray-400">
              Total Amount{" "}
              <div>
                <span className="text-gray-400">You will be charged</span>
              </div>
            </span>
            <span
              className="text-3xl font-bold"
              style={{ color: theme.colors.primaryCyan }}
            >
              €{total}
            </span>
          </div>
        </div>

        <div className="flex  items-center mt-8 pt-6 border-t border-primaryCyan/20">
          <div className="flex items-center gap-8 text-gray-400 text-sm justify-between md:w-full md:px-12  lg:max-w-7xl mx-auto">
            <div className="flex flex-col items-center gap-2">
              <Shield
                className="w-6 h-6 "
                style={{
                  color: theme.colors.primaryCyan,
                }}
              />
              Secure Payment
            </div>
            <div className="flex flex-col items-center gap-2">
              <Lock
                className="w-6 h-6 "
                style={{
                  color: theme.colors.primaryCyan,
                }}
              />
              256-bit SSL
            </div>
            <div className="flex flex-col items-center gap-2">
              <Check
                className="w-6 h-6 "
                style={{
                  color: theme.colors.primaryCyan,
                }}
              />
              PCI Compliant
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}
