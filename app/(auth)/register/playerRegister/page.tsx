"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PlayerRegisterForm from "@/components/register/PlayerRegistreForm";
import toast from "react-hot-toast";

function PlayerRegisterContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    // If no session_id in URL, redirect back to checkout
    if (!sessionId) {
      router.replace("/register/playerCheckout");
      return;
    }

    // Payment just completed — show a one-time success toast
    toast.success("🎉 Payment successful! Please complete your registration.", {
      duration: 5000,
    });
  }, []); // run once on mount

  // While redirecting (no session_id), show spinner
  if (!sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#07142b]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
      </div>
    );
  }

  return (
    <div>
      <PlayerRegisterForm />
    </div>
  );
}

const PlayerRegisterPage = () => {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#07142b]">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-400" />
        </div>
      }
    >
      <PlayerRegisterContent />
    </Suspense>
  );
};

export default PlayerRegisterPage;
