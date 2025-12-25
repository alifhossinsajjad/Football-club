"use client";

import { Lock } from "lucide-react";
import { useSelector } from "react-redux";
import SectionTitel from "./ReUseable/SectionTitle";
import Image from "next/image";

export default function Home() {
  const theme = useSelector((state) => state.theme);

  return (
    <div className="text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
            LATEST NEWS
          </h1>
          <p className="text-gray-400 text-lg">
            Stay updated with training tips, nutrition advice, and gear reviews.
          </p>
        </div> */}

        <SectionTitel
          title="LATEST NEWS"
          subtitle="Stay updated with training tips, nutrition advice, and gear reviews."
        />

        <div className="mb-12">
          <div className="grid md:grid-cols-2 gap-8 items-stretch">
            {/* TEXT CONTENT */}
            <div
              className=" rounded-2xl p-8 md:p-10 flex flex-col h-full justify-between"
              style={{
                backgroundColor: theme.colors.backgroundCard,
              }}
            >
              {/* TOP INFO */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-landing-number  text-sm uppercase tracking-wider">
                  Training
                </span>
                <span className="text-landing-number font-medium text-sm">
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
                <button className=" text-sm transition-colors duration-200">
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

        <div className="flex justify-center mt-10">
          <button
            className="px-8 py-2 border border-purple/50 rounded-full text-foreground hover:bg-purple/10 transition-colors flex items-center gap-2"
            style={{ borderColor: theme.colors.primaryMagenta }}
          >
            View All News <Lock size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}
