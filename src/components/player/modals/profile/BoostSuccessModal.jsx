"use client";

import { Button } from "@/components/ui/button";
import { Check, ChevronLeft, X } from "lucide-react";
import { useSelector } from "react-redux";
import PlayerTitle from "../../playerTitle";

export default function BoostSuccessModal({ isOpen, onClose, boostData }) {
  if (!isOpen) return null;
  const theme = useSelector((state) => state.theme);

  // Use boostData or fallback defaults
  const duration = boostData?.duration || 1;
  const price = boostData?.price || 30;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        className="rounded-2xl max-w-5xl w-full shadow-2xl border border-primaryCyan/20 overflow-hidden"
        style={{
          backgroundColor: theme.colors.backgroundDark,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-primaryCyan/20">
          <div className="flex items-center gap-4">
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <div className="flex flex-col">
              <PlayerTitle title="Boost Your Profile" />
              <h1>
                Feature your profile to increase visibility and engagement
              </h1>
            </div>
          </div>
          <button onClick={onClose}>
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-8 pt-12 text-center max-w-xl mx-auto">
          {/* Success Check Icon */}
          <div className="flex justify-center mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-primaryCyan to-primaryMagenta flex items-center justify-center">
              <div className="flex justify-center mb-8">
                <Button className="w-24 h-24 rounded-full text-5xl ">
                  <Check className="w-20 h-20 text-white" />
                </Button>
              </div>
            </div>
          </div>

          {/* Title & Message */}
          <h2 className="text-3xl font-bold text-white mb-4">
            Boost Request Submitted!
          </h2>
          <p className="text-gray-300 mb-8 max-w-sm mx-auto">
            Your profile boost request has been submitted successfully. The
            admin team will review and activate your boost shortly.
          </p>

          {/* Summary Card */}
          <div
            className="rounded-xl p-6 space-y-4 text-left"
            style={{
              backgroundColor: theme.colors.backgroundCard,
            }}
          >
            <div className="flex justify-between">
              <span className="text-gray-400">Request ID</span>
              <span className="text-white font-medium">#BR1594</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Duration</span>
              <span className="text-white font-medium">
                {duration} Month{duration > 1 ? "s" : ""}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount Paid</span>
              <span className=" font-medium" style={{ color: theme.colors.primaryCyan }}>
                €{price}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="px-4 py-2 rounded-md text-sm font-medium bg-[#FBBF24] text-black">
                Pending Approval
              </span>
            </div>
          </div>

          {/* Done Button */}
          <Button
            variant="common"
            onClick={onClose}
            className="w-full mt-10 rounded-md py-6 text-lg"
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
