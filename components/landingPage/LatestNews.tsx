"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import SectionTitel from "@/components/reuseable/SectionTitel";
import { useAppSelector } from "@/redux/hooks";
import { Lock, Loader2 } from "lucide-react";
import { useGetNewsArticlesQuery } from "@/redux/features/admin/adminNewsApi";
import { format } from "date-fns";

export default function LatestNews() {
  const theme = useAppSelector((state) => state.theme);
  const router = useRouter();

  const { data: newsData, isLoading } = useGetNewsArticlesQuery();
  const articles = newsData?.data || [];
  
  // Show only published articles, limited to the latest 4
  const latestPublishedArticles = articles
    .filter((article) => article.status === "Published")
    .slice(0, 4);

  const handleViewAllNews = () => {
    router.push("/latest-news");
  };

  const handleReadMore = (id: number) => {
    router.push(`/latest-news/${id}`);
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
        ) : latestPublishedArticles.length === 0 ? (
          <div className="text-center text-gray-400 h-32 flex flex-col justify-center">
            <p>No latest news available right now.</p>
          </div>
        ) : (
          <div className="mb-12">
            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {latestPublishedArticles.map((article, idx) => (
                <div key={article.id} className="grid md:grid-cols-2 gap-0 overflow-hidden rounded-2xl md:col-span-1 bg-[var(--bg-card,#12143A)]">
                  {/* TEXT CONTENT */}
                  <div className="p-8 flex flex-col h-full justify-between">
                    {/* TOP INFO */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-landing-number text-cyan-400 text-xs uppercase tracking-wider font-bold truncate max-w-[60%]">
                        {article.category_name || "News"}
                      </span>
                      <span className="text-gray-400 font-medium text-xs whitespace-nowrap">
                        {article.date ? format(new Date(article.date), "MMM d, yyyy") : "Recent"}
                      </span>
                    </div>

                    {/* MAIN TEXT BELOW */}
                    <div className="flex-1">
                      <h2 className="text-lg font-bold mb-2 text-white leading-tight line-clamp-3">
                        {article.title}
                      </h2>
                      <p className="text-gray-400 mb-4 text-xs leading-relaxed line-clamp-2">
                        By {article.author_name || "Admin"}
                      </p>
                    </div>

                    {/* BUTTON */}
                    <button 
                      onClick={() => handleReadMore(article.id)}
                      className="text-sm transition-colors duration-200 text-left hover:text-cyan-400 font-medium"
                    >
                      Read More <span className="ml-1">→</span>
                    </button>
                  </div>

                  {/* IMAGE */}
                  <div className="relative w-full h-48 md:h-full">
                    <Image
                      src={article.image || "/images/event-banner.jpg"}
                      alt={article.title}
                      fill
                      priority={idx === 0}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
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
