"use client";

import React from 'react';
import Link from 'next/link';
import { BsXCircleFill } from "react-icons/bs";

const EventsRegistarCancel = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
      <div className="flex flex-col items-center gap-6 text-center max-w-md">
        <BsXCircleFill className="text-7xl text-red-500 shadow-[0_0_30px_rgba(239,68,68,0.2)] rounded-full" />
        <div>
          <h2 className="text-4xl font-black text-white uppercase tracking-tight mb-2">Registration Cancelled</h2>
          <p className="text-white/60">Your registration process was cancelled. No payment was processed. If you would like to try again, you can return to the event page.</p>
        </div>
        <div className="flex flex-col w-full gap-3">
          <Link href="/scout/events" className="bg-white text-black px-8 py-4 rounded-xl font-black uppercase tracking-wider hover:bg-white/90 transition-all shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
            Back to Events
          </Link>
          <button 
            onClick={() => window.history.back()}
            className="text-white/40 hover:text-white text-sm font-bold uppercase tracking-widest transition-colors py-2"
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default EventsRegistarCancel;