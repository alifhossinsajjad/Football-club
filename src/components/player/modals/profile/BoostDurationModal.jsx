"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, Eye, Star, X } from "lucide-react";
import NextImage from "next/image";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import PlayerTitle from "../../playerTitle";

export default function BoostDurationModal({
  isOpen,
  onClose,
  onNext,
  selectedDuration,
  setSelectedDuration,
}) {
  if (!isOpen) return null;
  const theme = useSelector((state) => state.theme);

  const durations = [
    { months: 1, price: 30, save: 0 },
    { months: 3, price: 85, save: 5 },
    { months: 6, price: 160, save: 11 },
    { months: 12, price: 300, save: 17 },
  ];

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
      <div
        className=" rounded-2xl max-w-5xl w-full shadow-2xl border border-primaryCyan/20"
        style={{
          backgroundColor: theme.colors.backgroundDark,
        }}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-primaryCyan/20">
          <div className="flex items-center gap-3">
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
            <X className="w-6 h-6 text-gray-400" />
          </button>
        </div>

        <div className="p-8 grid lg:grid-cols-2 gap-8">
          {/* Left - Player & Steps */}
          <div className="space-y-8">
            <div
              className=" rounded-xl p-6"
              style={{
                backgroundColor: theme.colors.backgroundCard,
              }}
            >
              <p className="text-gray-400 mb-4">Boosting Profile For:</p>
              <div className="flex items-center gap-4">
                <NextImage
                  src="/player/profile/profile.png"
                  alt="Player"
                  width={60}
                  height={60}
                  className="rounded-full"
                />
                <div>
                  <p className="text-white font-semibold text-lg">John Doe</p>
                  <p className="text-gray-400">Forward / Striker</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-6">
                Step 1: Choose Boost Duration
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {durations.map((d) => (
                  <Button
                    variant="common"
                    key={d?.months}
                    onClick={() => setSelectedDuration(d)}
                    className={`p-6 text-base rounded-xl relative flex items-center justify-between  border-2 transition-all ${
                      selectedDuration?.months === d?.months
                        ? "border-primaryCyan bg-primaryCyan/10"
                        : "border-primaryCyan/20 hover:border-primaryCyan/50"
                    }`}
                    style={{
                      backgroundColor: theme.colors.backgroundCard,
                    }}
                  >
                    <p className="text-white font-semibold">
                      {d?.months} Month{d?.months > 1 ? "s" : ""}
                    </p>
                    <p
                      className="text-lg font-bold "
                      style={{
                        color: theme.colors.primaryCyan,
                      }}
                    >
                      €{d.price}
                    </p>
                    {d.save > 0 && (
                      <p
                        className="absolute right-5 -top-6 p-1 rounded-lg text-sm "
                        style={{
                          backgroundColor: theme.colors.button,
                        }}
                      >
                        Save {d.save}%
                      </p>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">
                Step 2: Set Date Range
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-gray-400 text-sm">Start Date</label>
                  <Input type="date" className="mt-2" />
                </div>
                <div>
                  <label className="text-gray-400 text-sm">End Date</label>
                  <Input type="date" className="mt-2" />
                </div>
              </div>
            </div>
          </div>

          {/* Right - Summary & Benefits */}
          <div
            className={`rounded-xl p-8 bg-gradient-to-b border from-[#00E5FF1A] to-[${theme.colors.backgroundCard}]`}
            style={{
              borderColor: `${theme.colors.primaryCyan}66`,
            }}
          >
            <div className="flex justify-center mb-8">
              <Button className="w-24 h-24 rounded-full text-5xl ">⚡</Button>
            </div>

            <h3 className="text-lg text-center font-bold text-white mb-6">
              Boost Summary
            </h3>
            {selectedDuration ? (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-300 text-sm">Duration</span>
                  <span className="text-white font-semibold text-sm">
                    {selectedDuration.months} Month
                    {selectedDuration.months > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex justify-between text-2xl font-bold">
                  <span className="text-gray-300 text-sm">Total Price</span>
                  <span
                    className="text-primaryCyan text-xl"
                    style={{
                      color: theme.colors.primaryCyan,
                    }}
                  >
                    €{selectedDuration.price}
                  </span>
                </div>
              </div>
            ) : (
              <p className="text-gray-400">Select a duration to see price</p>
            )}

            <div className="mt-8">
              <h4 className="text-white font-semibold mb-4">Boost Benefits</h4>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-6 h-6 "
                      style={{
                        backgroundColor: theme.colors.backgroundCard,
                      }}
                    >
                      <NextImage
                        src="/icons/star.png"
                        alt="star"
                        fill
                        className="object-contain"
                      />
                    </div>

                    <div>
                      <h1 className="text-white"> Featured Placement</h1>
                      <h1 className="text-gray-400">
                        Top position in directory listings
                      </h1>
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-6 h-6 "
                      style={{
                        backgroundColor: theme.colors.backgroundCard,
                      }}
                    >
                      <NextImage
                        src="/icons/eye.png"
                        alt="star"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-white"> 4x More Visibility</h1>
                      <h1 className="text-gray-400">
                        Increased profile views and engagement
                      </h1>
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-6 h-6 "
                      style={{
                        backgroundColor: theme.colors.backgroundCard,
                      }}
                    >
                      <NextImage
                        src="/icons/search.png"
                        alt="star"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-white"> Priority in Search</h1>
                      <h1 className="text-gray-400">
                        Appear first in search results
                      </h1>
                    </div>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="flex items-center gap-4">
                    <div
                      className="relative w-6 h-6 "
                      style={{
                        backgroundColor: theme.colors.backgroundCard,
                      }}
                    >
                      <NextImage
                        src="/icons/trophy.png"
                        alt="star"
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h1 className="text-white"> Special Badge</h1>
                      <h1 className="text-gray-400">
                        Featured badge on profile
                      </h1>
                    </div>
                  </div>
                </li>
              </ul>
              <Button
                variant="common"
                className="px-8 lg:px-16 mt-6 w-full"
                onClick={onNext}
                disabled={!selectedDuration}
              >
                Proceed to Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
