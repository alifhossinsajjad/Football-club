/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Clock,
  MapPin,
  Users,
  Mail,
  Phone,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { useAppSelector } from "@/redux/hooks";
import SectionTitel from "../reuseable/SectionTitel";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useGetPlayerEventsQuery } from "@/redux/features/player/eventsDirectoryApi";
import { format, isValid,} from "date-fns";
import React, { useState, useEffect, useMemo } from "react";
import { EventDataApi } from "@/redux/features/player/eventsDirectoryApi";
import { useGetSubscriptionPlansQuery, useCreatePublicCheckoutMutation } from "@/redux/features/player/singleSubscription/singleSubscriptionApi";
import toast from "react-hot-toast";

export default function UpcomingEventsSection() {
  const router = useRouter();
  const theme = useAppSelector((state) => state.theme);
  const user = useAppSelector((state) => state.auth.user);
  const { data: eventsData, isLoading } = useGetPlayerEventsQuery();
  const [mounted, setMounted] = useState(false);

  const {data :singlePlan} = useGetSubscriptionPlansQuery();
  const [createCheckout, { isLoading: isCreatingCheckout }] = useCreatePublicCheckoutMutation();
  const activePlan = singlePlan?.data?.find((p: any) => p.status === 'ACTIVE') || singlePlan?.data?.[0];
  console.log(singlePlan, activePlan)

  useEffect(() => {
    setMounted(true);
  }, []);

  const eventsList = useMemo(() => {
    if (!eventsData) return [];
    return Array.isArray(eventsData)
      ? eventsData
      : eventsData.results || eventsData.data || [];
  }, [eventsData]);

  const upcomingEvents = useMemo(() => {
    return [...eventsList]
      .filter(
        (e) =>
          e.status?.toUpperCase() !== "CANCELLED" &&
          e.status?.toUpperCase() !== "COMPLETED",
      )
      .sort(
        (a, b) =>
          new Date(b.created_at || 0).getTime() -
          new Date(a.created_at || 0).getTime(),
      )
      .slice(0, 2);
  }, [eventsList]);

  const formatEventDate = (dateStr?: string) => {
    if (!dateStr) return "TBD";
    const d = new Date(dateStr);
    return isValid(d) ? format(d, "dd MMM yyyy") : dateStr;
  };

  const formatEventTime = (timeStr?: string) => {
    if (!timeStr) return "TBD";
    try {
      const [hours, minutes] = timeStr.split(":");
      const d = new Date();
      d.setHours(Number(hours), Number(minutes));
      return format(d, "hh:mm a");
    } catch (error) {
      return timeStr;
    }
  };

  const formatFee = (fee?: string) => {
    return fee === "0.00" || !fee || Number(fee) === 0
      ? "Free Entry"
      : `$${fee}`;
  };

  const handleViewAllEvents = () => {
    if (!user) {
      router.push("/latest-events");
      return;
    }
    const role = user.role?.toUpperCase();
    switch (role) {
      case "PLAYER":
        router.push("/player/eventsDirectory");
        break;
      case "CLUB":
      case "CLUB_ACADEMY":
        router.push("/club/eventManagement");
        break;
      case "SCOUT":
      case "SCOUT_AGENT":
        router.push("/scout/events");
        break;
      case "ADMIN":
        router.push("/admin/eventManagement");
        break;
      default:
        router.push("/latest-events");
    }
  };

  const handleGuestCheckout = async (plan: any) => {
    if (!plan) return;
    try {
      const payload = {
        plan_id: plan.plan_id || plan.id,
        billing_cycle: "YEARLY" as const,
      };
      const res = await createCheckout(payload as any).unwrap();
      const checkoutUrl = res.session_url || (res as any).data?.session_url;
      
      if (checkoutUrl) {
        window.location.href = checkoutUrl;
      } else {
        throw new Error("No checkout URL returned from server.");
      }
    } catch (err: any) {
      console.error("Checkout Error:", err);
      toast.error(err?.data?.message || err?.message || "Payment failed. Try again.");
    }
  };

  return (
    <div className="py-16 bg-[var(--bg-dark,#07142b)] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-9">
          <SectionTitel
            title="LATEST EVENTS"
            subtitle="Stay updated with training tips, nutrition advice, and gear reviews."
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-48 mb-12">
            <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
          </div>
        ) : upcomingEvents.length === 0 ? (
          <div className="text-center text-gray-400 h-48 flex flex-col justify-center items-center mb-12 border border-[#12143A] rounded-2xl bg-[#090C22]">
            <p>Please login to show upcoming events</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {upcomingEvents.map((event: EventDataApi) => (
              <div
                key={event.id}
                className="rounded-2xl p-8 bg-[var(--bg-card,#12143A)] shadow-lg hover:shadow-cyan-900/10 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-[#06A295] font-semibold text-sm uppercase tracking-wider">
                    {event.status || "Upcoming"}
                  </span>
                  <span className="text-[#06A295] font-medium text-sm">
                    {formatEventDate(event.event_date)}
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
                    <span className="text-[#06A295]">
                      {formatEventTime(event.event_time)}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <MapPin
                      className="w-5 h-5 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295]">
                      {event.venue_name || event.venue_address || "Location TBD"}
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <Users
                      className="w-5 h-5 text-cyan-400 flex-shrink-0"
                      style={{ color: theme.colors.primaryCyan }}
                    />
                    <span className="text-[#06A295]">
                      {formatFee(event.registration_fee)}
                    </span>
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
              </div>
            ))}
          </div>
        )}

        <div className="flex justify-center">
          <div className="flex justify-center mt-10">
            <button
              onClick={handleViewAllEvents}
              className="px-10 py-3 bg-linear-to-r from-cyan-500 to-purple-600 rounded-full text-white font-bold hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] flex items-center gap-3"
            >
              View All Events <ArrowRight size={18} />
            </button>
          </div>
        </div>

      {/* card for new player  */}

        {singlePlan?.data && singlePlan.data.length > 0 && (
          <div
            id="membership"
            className="mt-20 p-4 sm:p-6"
          >
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-linear-to-r from-cyan-400 to-purple-500">
                Choose Your Plan
              </h2>
            </div>
            <div className="flex flex-wrap justify-center gap-8 max-w-7xl mx-auto">
              {singlePlan.data.map((plan: any) => (
                <div
                  key={plan.id || plan.plan_id}
                  className="w-full max-w-md bg-linear-to-br from-[#00E5FF]/20 via-[#00E5FF]/5 to-[#9C27B0]/30 p-4 sm:p-6 md:p-8 border border-indigo-500/20 shadow-2xl shadow-indigo-950/40 rounded-xl flex flex-col"
                >
                  <div className="bg-[#171D36]/90 p-4 sm:p-6 md:p-8 rounded-xl flex flex-col h-full">
                    <div className="flex justify-center mb-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-linear-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-xl sm:text-2xl font-black text-white shadow-lg overflow-hidden">
                        {plan.logo_url ? (
                          <Image src={plan.logo_url} alt={plan.title || "Plan Logo"} width={48} height={48} className="w-full h-full object-cover" />
                        ) : (
                          "♔"
                        )}
                      </div>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent text-center">
                      {plan.title?.toUpperCase() || "GO PRO"}
                    </h2>

                    <p className="text-[#7FB6B6] text-sm text-center mb-6 sm:mb-8 font-bold px-2">
                      {plan.description || "Unlock premium features and accelerate your football career with NextGen Pro membership"}
                    </p>

                    <ul className="space-y-3 sm:space-y-4 mb-8 sm:mb-10 text-[#7FB6B6] text-xs sm:text-sm flex-grow">
                      {(plan.features && plan.features.length > 0
                        ? plan.features
                        : [
                          "Exclusive scout network access",
                          "Refined direct messaging system",
                          "Exclusive scout & agent network access",
                          "Newsletter with pre-season training content and priority event access",
                          "Full access to all events with direct contact options",
                          "Enhanced player profile creation with photos & videos to get noticed by clubs",
                        ]
                      ).map((item: any, i: number) => (
                        <li key={i} className="flex items-start gap-2 sm:gap-3">
                          <span className="text-indigo-400 text-base sm:text-lg font-bold mt-0.5">
                            ✓
                          </span>
                          <span>
                            {typeof item === 'string' 
                              ? item 
                              : (item?.name || (typeof item === 'object' ? Object.values(item)[0] : String(item)))}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="flex flex-col xl:flex-row items-center justify-center gap-3 sm:gap-4 mb-3">
                      <div className="flex items-baseline text-[#9CFFF0]">
                        <span className="text-2xl sm:text-3xl font-black">$</span>
                        <span className="text-3xl sm:text-4xl font-black tracking-tight">
                          {plan.yearly_price_after_discount !== undefined && plan.yearly_price_after_discount !== null 
                            ? plan.yearly_price_after_discount 
                            : 9.99}
                        </span>
                        <span className="text-sm font-bold ml-1 sm:ml-2">
                          /year
                        </span>
                      </div>

                      {plan.discount_label && plan.discount_percentage ? (
                        <div className="bg-linear-to-r from-[#00E5FF] to-[#9C27B0] text-white text-[10px] sm:text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-wide text-center">
                          {plan.discount_label.split('(')[0].trim()}
                        </div>
                      ) : plan.discount_percentage ? (
                        <div className="bg-linear-to-r from-[#00E5FF] to-[#9C27B0] text-white text-[10px] sm:text-xs font-bold px-3 py-2 rounded-lg uppercase tracking-wide text-center">
                          Save {plan.discount_percentage}%
                        </div>
                      ) : null}
                    </div>

                    {plan.yearly_price && plan.discount_label ? (
                      <p className="text-[#7FB6B6] text-xs text-center mb-6 sm:mb-8 min-h-[2rem]">
                        ({plan.discount_label.includes('(') ? plan.discount_label.split('(')[1].replace(')', '') : 'introductory offer'} — usually ${plan.yearly_price}/year)
                      </p>
                    ) : (
                      <div className="mb-6 sm:mb-8 min-h-[2rem]"></div>
                    )}

                    <div className="flex justify-center mt-auto">
                      {(!mounted || !user) ? (
                        <button
                          onClick={() => handleGuestCheckout(plan)}
                          disabled={isCreatingCheckout}
                          className="w-full text-center bg-[#00F6FF] text-black px-6 py-3 text-sm font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,246,255,0.3)] disabled:opacity-50"
                        >
                          {isCreatingCheckout ? "Redirecting..." : "Sign Up"}
                        </button>
                      ) : (
                        <Link
                          href={
                            user.role === "PLAYER"
                              ? "/player"
                              : user.role === "CLUB_ACADEMY"
                                ? "/club"
                                : user.role === "SCOUT_AGENT"
                                  ? "/scout"
                                  : "/admin"
                          }
                          className="w-full text-center bg-[#00F6FF] text-black px-6 py-3 text-sm font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-[0_0_20px_rgba(0,246,255,0.3)]"
                        >
                          Go to Dashboard
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
