"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import SectionTitel from "@/components/reuseable/SectionTitel";
import { useAppSelector } from "@/redux/hooks";
import { Lock, Loader2 } from "lucide-react";
import { useGetLatestNewsArticlesQuery } from "@/redux/features/home/homeApi";
import { format } from "date-fns";

export default function LatestNews() {
  const theme = useAppSelector((state) => state.theme);
  const user = useAppSelector((state) => state.auth.user);
  const router = useRouter();

  const { data: newsData, isLoading } = useGetLatestNewsArticlesQuery();
  
  console.log(newsData, "newsData");

  const newsItems = newsData?.data || [];

  const handleViewAllNews = () => {
    router.push("/latest-news");
  };

  return (
    <div className="bg-[var(--bg-dark,#07142b)] text-white">
      <div className="container mx-auto px-4 py-16 sm:px-6 lg:px-8">
        <div className="text-center mb-9">
          <SectionTitel
            title="LATEST NEWS"
            subtitle="Stay updated with training tips, nutrition advice, and gear reviews."
          />
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-cyan-400" />
          </div>
        ) : newsItems.length === 0 ? (
          <div className="text-center text-gray-400 h-32 flex flex-col justify-center">
            <p>No latest news available right now.</p>
          </div>
        ) : (
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {newsItems.slice(0, 2).map((item: any) => (
                <div
                  key={item.id}
                  className="overflow-hidden rounded-2xl md:col-span-1 border border-cyan-500/10 transition-all duration-300 hover:border-cyan-500/40 group"
                  style={{ backgroundColor: item.background_color || "var(--bg-card,#12143A)" }}
                >
                  <div className="p-8 flex flex-col h-full min-h-[300px] justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-6">
                        <span className="text-cyan-400 text-xs uppercase tracking-widest font-bold px-3 py-1 bg-cyan-400/10 rounded-full border border-cyan-400/20">
                          News Update
                        </span>
                      </div>

                      <h2 
                        className="text-2xl md:text-3xl font-black mb-6 leading-tight"
                        style={{ color: item.title_color || "white" }}
                      >
                        {item.title}
                      </h2>
                      
                      <p className="text-gray-400 text-lg leading-relaxed mb-8">
                        {item.subtitle}
                      </p>
                    </div>

                    <div className="mt-auto">
                      <button
                        onClick={handleViewAllNews}
                        className="text-sm font-bold uppercase tracking-widest text-[#00E5FF] hover:text-white transition-colors duration-300 flex items-center gap-2 group-hover:translate-x-2 transition-transform"
                      >
                        Read Full Story <span className="text-xl">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex justify-center items-center w-full mt-4">
          <div className="flex justify-center">
            <button
              onClick={handleViewAllNews}
              className="px-8 py-2 border border-purple-700 rounded-full text-foreground hover:bg-purple/10 transition-colors flex items-center gap-2 text-white"
            >
              View All News <Lock size={14} className="hidden" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
