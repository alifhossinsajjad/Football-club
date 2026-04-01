"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetNewsArticlesQuery } from "@/redux/features/admin/adminNewsApi";
import Navbar from "@/components/sheard/Navbar";
import Footer from "@/components/sheard/Footer";
import { useAppSelector } from "@/redux/hooks";
import { useRouter } from "next/navigation";

export default function LatestNewsPage() {
  const router = useRouter();
  const user = useAppSelector((state) => state.auth.user);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  
  const { data: newsData, isLoading } = useGetNewsArticlesQuery();
  const articles = newsData?.data || [];
  
  // Show only published articles
  const publishedArticles = articles.filter(
    (article) => article.status?.toUpperCase() === "PUBLISHED"
  );

  // Pagination logic
  const totalPages = Math.ceil(publishedArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentArticles = publishedArticles.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const setPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleArticleClick = (e: React.MouseEvent, id: number) => {
    e.preventDefault();
    router.push(`/latest-news/${id}`);
  };

  return (
    <main className="min-h-screen bg-[#050B14] flex flex-col pt-32">
      <Navbar />
      
      <div className="flex-1 container mx-auto px-4 py-8 mb-12 max-w-7xl">
        <div className="mb-10">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm text-cyan-400 hover:text-cyan-300 transition-colors mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent inline-block">
            LATEST NEWS
          </h1>
          <p className="text-gray-400 max-w-2xl">
            Stay updated with the latest announcements, scouting reports, and insights from NextGen Pros.
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
          </div>
        ) : publishedArticles.length === 0 ? (
          <div className="bg-[#0B0D2C] border border-[#1E2554] rounded-2xl p-12 text-center">
            <p className="text-gray-400">No news articles have been published yet.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentArticles.map((article) => (
                <div 
                  key={article.id} 
                  className="bg-[#0B0D2C] border border-[#1A2049] rounded-2xl overflow-hidden hover:border-[#2A3560] transition-colors group flex flex-col h-full"
                >
                  <div className="relative w-full h-56 overflow-hidden">
                    <Image
                      src={article.image || "/images/event-banner.jpg"}
                      alt={article.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-[#050B14]/80 backdrop-blur-md text-cyan-400 text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-cyan-400/20">
                        {article.category_name || "News"}
                      </span>
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-[11px] text-gray-500 font-medium uppercase tracking-wider mb-3">
                      <span>{article.date ? format(new Date(article.date), "MMM d, yyyy") : "Recent"}</span>
                      <span className="mx-2">•</span>
                      <span>By {article.author_name || "Admin"}</span>
                    </div>
                    
                    <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {article.title}
                    </h3>
                    
                    <div className="mt-auto pt-4">
                      <button
                        onClick={(e) => handleArticleClick(e, article.id)}
                        className="text-sm text-cyan-400 font-medium hover:text-cyan-300 inline-flex items-center group/btn"
                      >
                        Read Full Article <span className="ml-1 group-hover/btn:translate-x-1 transition-transform">→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-16 gap-3">
                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => setPage(page)}
                      className={`w-10 h-10 flex items-center justify-center rounded-lg border text-sm font-bold transition-all ${
                        currentPage === page
                          ? "bg-gradient-to-r from-cyan-500 to-blue-500 border-transparent text-white shadow-lg shadow-cyan-500/20"
                          : "border-[#1E2554] bg-[#0B0D2C] text-gray-400 hover:text-white hover:border-cyan-400/50"
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="px-6 h-10 flex items-center justify-center rounded-lg border border-[#1E2554] bg-[#0B0D2C] text-gray-400 hover:text-white hover:border-cyan-400 disabled:opacity-30 disabled:cursor-not-allowed transition-all font-bold text-sm"
                >
                  Next <ChevronRight className="w-4 h-4 ml-1" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
      
      <Footer />
    </main>
  );
}
