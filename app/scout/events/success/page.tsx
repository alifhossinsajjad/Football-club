"use client";

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCheckPaymentStatusMutation } from '@/redux/features/scout/eventsApi';
import Link from 'next/link';
import { BsCheckCircleFill, BsXCircleFill } from "react-icons/bs";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const EventsRegistarSuccess = () => {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [checkStatus, { data, isLoading, error }] = useCheckPaymentStatusMutation();

  useEffect(() => {
    if (sessionId) {
      checkStatus({ session_id: sessionId });
    }
  }, [sessionId, checkStatus]);

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      {isLoading ? (
        <div className="flex flex-col items-center gap-4 text-white">
          <AiOutlineLoading3Quarters className="animate-spin text-5xl text-[#00E5FF]" />
          <h2 className="text-2xl font-bold">Verifying Payment...</h2>
        </div>
      ) : error ? (
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <BsXCircleFill className="text-6xl text-red-500" />
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">Verification Failed</h2>
            <p className="text-white/60">We encountered an error while verifying your payment status. Please contact support if the problem persists.</p>
          </div>
          <Link href="/scout/events" className="bg-[#0D1424] border border-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/5 transition-all">
            Back to Events
          </Link>
        </div>
      ) : data?.success ? (
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <BsCheckCircleFill className="text-7xl text-[#00E5FF] shadow-[0_0_30px_rgba(0,229,255,0.2)] rounded-full" />
          <div>
            <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-2">Registration Confirmed!</h2>
            <p className="text-white/60">Your payment of <span className="text-[#00E5FF] font-bold">${data.payment_amount}</span> was successful. You
            have been successfully registered for the event.</p>
          </div>
          <div className="flex flex-col w-full gap-3">
            <Link href="/scout/events" className="bg-[#00E5FF] text-black px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-[#00E5FF]/90 transition-all shadow-[0_4px_20px_rgba(0,229,255,0.2)]">
              View All Events
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 text-center max-w-md">
          <BsXCircleFill className="text-6xl text-red-500" />
          <div>
            <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">{data?.message || "Payment Not Completed"}</h2>
            <p className="text-white/60">Your registration is currently pending. Please ensure your payment has been processed.</p>
          </div>
          <Link href="/scout/events" className="bg-[#0D1424] border border-white/10 text-white px-8 py-3 rounded-xl font-bold hover:bg-white/5 transition-all">
            Back to Events
          </Link>
        </div>
      )}
    </div>
  );
};

export default EventsRegistarSuccess;