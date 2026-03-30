"use client";

import { Lock, Clock, MapPin, Users, Mail, Phone, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { useAppSelector } from "@/redux/hooks";
import SectionTitel from "../reuseable/SectionTitel";
import Link from "next/link";
import { useGetEventsQuery } from "@/redux/features/admin/adminEventApi";
import { format } from "date-fns";

export default function UpcomingEvent() {
  const theme = useAppSelector((state) => state.theme);
  const { data: eventsData, isLoading } = useGetEventsQuery();
  
  // Get active/upcoming events and limit to 4
  const upcomingEvents = (eventsData?.data || [])
    .filter((e) => e.status !== "Cancelled" && e.status !== "Completed")
    .slice(0, 4);

  return (
    <div className="py-16 bg-[#07142b] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-9">
          <SectionTitel
            title="LATEST Events"
            subtitle="Stay updated with training tips, nutrition advice, and gear reviews."
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48 mb-12">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center text-gray-400 h-48 flex flex-col justify-center items-center mb-12 border border-[#12143A] rounded-2xl bg-[#090C22]">
            <p>No upcoming events at the moment. Please check back later.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {upcomingEvents.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl p-8"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#06A295] font-semibold text-sm uppercase tracking-wider">
                    {event.status || "Upcoming"}
                  </span>
                  <span className="text-[#06A295] font-medium text-sm">
                    {(() => {
                      if (!event.date) return "TBD";
                      const d = new Date(event.date);
                      return !isNaN(d.getTime()) ? format(d, "dd MMM yyyy") : event.date;
                    })()}
                  </span>
                </div>

                <h2 className="text-lg md:text-xl font-bold mb-8 text-white leading-tight">
                  {event.event_name}
                </h2>

                <div className="space-y-4 mb-8 pb-8 border-b border-gray-700">
                  <div className="flex items-center gap-3">
                    <Clock
                      className="w-5 h-5 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295]">08:00 AM (TBD)</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin
                      className="w-5 h-5 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295]">{event.location || "Location TBD"}</span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users
                      className="w-5 h-5 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295]">{event.fee === "0.00" || !event.fee ? "Free Entry" : `$${event.fee}`}</span>
                  </div>
                </div>

                <div className="mb-8">
                  <h3 className="text-gray-400 font-semibold mb-4">
                    Contact information
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Mail
                        className="w-4 h-4 text-cyan-400 flex-shrink-0"
                        style={{ color: theme.colors.primaryCyan }}
                      />
                      <span className="text-[#06A295] text-sm">
                        contact@nextgenpros.com
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone
                        className="w-4 h-4 text-cyan-400 flex-shrink-0"
                        style={{ color: theme.colors.primaryCyan }}
                      />
                      <span className="text-[#06A295] text-sm">
                        +1 234 567 890
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  variant="common"
                  className="w-full text-white font-semibold py-3 rounded-md transition-colors duration-200"
                >
                  See more details
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <div className="flex justify-center mt-10">
            <button className="px-8 py-2 border border-purple-700 rounded-full text-foreground hover:bg-purple/10 transition-colors flex items-center gap-2 text-white ">
              View All Events <Lock size={14} className="hidden" />
            </button>
          </div>
        </div>

        {/*  go pro*/}
        <div className="min-h-screen flex items-center justify-center p-6 ">
          <div
            className="
          w-full max-w-md 
          bg-gradient-to-br from-[#00E5FF]/20 via-[#00E5FF]/5 to-[#9C27B0]/30 
           p-8 
          border border-indigo-500/20 
          shadow-2xl shadow-indigo-950/40 rounded-xl
        "
          >
            <div className="bg-[#171D36]/90 p-8">

              <div className="  gap-4 mb-6">
                <div className="flex justify-center mb-3">
                  <div
                    className="
              w-12 h-12 rounded-xl 
              bg-gradient-to-br from-indigo-500 to-purple-600 
              flex items-center justify-center 
              text-2xl font-black text-white 
              shadow-lg
            "
                  >
                    ♔
                  </div>
                </div>
                <h2 className="text-4xl font-bold mb-6  pb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent text-center ">
                  GO PRO
                </h2>
              </div>


              <div className="text-center">
                <p className="text-[#7FB6B6] text-base leading-relaxed mb-8 font-bold">
                  Unlock premium features and accelerate your football career
                  with NextGen Pro membership
                </p>
              </div>

        
              <ul className="space-y-4 mb-10 text-[#7FB6B6] text-sm">
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>Exclusive scout network access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>Refined direct messaging system</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>Exclusive scout & agent network access</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>
                    Newsletter with pre-season training content and priority
                    event access
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>
                    Full access to all events with direct contact options
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-indigo-400 text-lg font-bold mt-0.5">
                    ✓
                  </span>
                  <span>
                    Enhanced player profile creation with photos & videos to get
                    noticed by clubs
                  </span>
                </li>
              </ul>

       
              <div className="flex items-center gap-4 mb-3">
                <div className="flex items-baseline text-[#9CFFF0]">
                  <span className="text-4xl font-black ">$</span>
                  <span className="text-5xl font-black tracking-tight">
                    9.99
                  </span>
                  <span className="text-xl font-bold ml-2">/year</span>
                </div>

                <div className="bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] text-white text-xs font-bold px-4 py-3 rounded-lg uppercase tracking-wide">
                  Save 50%
                </div>
              </div>

              <p className="text-[#7FB6B6] text-sm text-center mb-8">
                (introductory offer — usually $19.99/year)
              </p>

        
              <div className="flex justify-center">
                <Link href={"/login"} className="text-center bg-[#00F6FF] text-black px-3 py-2 font-bold rounded-full">
                  Sign Up
                </Link>
              </div>

      
              <p className="text-center mt-6 text-[#7FB6B6] hover:text-blue-300 text-sm cursor-pointer transition-colors">
                Have a promo code?
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
