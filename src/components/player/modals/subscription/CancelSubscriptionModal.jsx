"use client";

import { Button } from "@/components/ui/button";
import { CircleX, CircleAlert, X } from "lucide-react";
import { useSelector } from "react-redux";
export default function CancelSubscriptionModal({ isOpen, onClose }) {
  const theme = useSelector((state) => state.theme);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
      <div
        className="w-full max-w-md p-6 rounded-xl"
        style={{ backgroundColor: theme.colors.backgroundCard }}
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-white  flex items-center gap-3">
            <span className="text-red-500 text-2xl rounded-lg bg-[#FB2C3633] p-2">
              <CircleAlert className="h-8 w-8" />
            </span>{" "}
            Cancel Subscription?
          </h3>
          <button onClick={onClose}>
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <p className="text-gray-300 mb-6">
          No refund. Subscription stays active until expiry, then does not
          renew.
        </p>

        <ul className="space-y-2 mb-8 text-white">
          <li className="flex items-center gap-2">
            <CircleX className="w-4 h-4 text-red-500" /> Unlimited events
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="w-4 h-4 text-red-500" /> Featured listings
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="w-4 h-4 text-red-500" /> Advanced analytics
          </li>
          <li className="flex items-center gap-2">
            <CircleX className="w-4 h-4 text-red-500" /> Priority support
          </li>
        </ul>

        <div className="flex gap-4">
          <Button
            variant="outline"
            className="flex-1 text-white py-6"
            style={{
              backgroundColor: "transparent",
              border: `1px solid ${theme.colors.primaryCyan}`,
            }}
            onClick={onClose}
          >
            Keep Subscription
          </Button>
          <Button
            variant="outline"
            className="flex-1 text-white py-6"
            style={{ backgroundColor: "#EF4444" }}
            onClick={() => {
              // Real cancel logic here
              alert("Subscription cancelled");
              onClose();
            }}
          >
            Cancel Subscription
          </Button>
        </div>
      </div>
    </div>
  );
}
