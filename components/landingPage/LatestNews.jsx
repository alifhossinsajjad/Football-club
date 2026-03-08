"use client";

import { Lock } from "lucide-react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import SectionTitel from "./ReUseable/SectionTitle";
import Image from "next/image";
import HomeButton from "../ui/HomeButton";

export default function LatestNews() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();

  const handleViewAllNews = () => {
    router.push("/view-all-news");
  };

  return (
    <div className="text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <SectionTitel
          title="LATEST NEWS"
          subtitle="Stay updated with training tips, nutrition advice, and gear reviews."
        />

        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* TEXT CONTENT */}
            <div
              className="rounded-2xl p-8 md:p-10 flex flex-col h-full justify-between"
              style={{
                backgroundColor: theme.colors.backgroundCard,
              }}
            >
              {/* TOP INFO */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-landing-number text-white text-sm uppercase tracking-wider">
                  Training
                </span>
                <span className="text-landing-number text-white font-medium text-sm">
                  3 min read
                </span>
              </div>

              {/* MAIN TEXT BELOW */}
              <div className="">
                <h2 className="text-xl font-bold mb-2 text-white leading-tight">
                  Top 7 Football Boots for Speed and Control in 2025
                </h2>

                <p className="text-gray-400 mb-2 text-sm leading-relaxed">
                  Compare the best boots trusted by rising stars and pros alike.
                </p>

                {/* BUTTON */}
                <button className="text-sm transition-colors duration-200">
                  Read More
                </button>
              </div>
            </div>

            {/* IMAGE */}
            <div className="relative w-full h-48 md:h-80 lg:h-[400px] rounded-xl overflow-hidden">
              <Image
                src="/footballPlayer.png"
                alt="Young football player on field"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center w-full">
          <HomeButton
            text={`View All News`}
            icon={<Lock size={18} />}
            variant="outline"
            theme={theme}
          />
        </div>
      </div>
    </div>
  );
}
