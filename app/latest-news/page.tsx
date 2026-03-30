"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Loader2, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetNewsArticlesQuery } from "@/redux/features/admin/adminNewsApi";
import Navbar from "@/components/sheard/Navbar";
import Footer from "@/components/sheard/Footer";

export default function LatestNewsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  
  const { data: newsData, isLoading } = useGetNewsArticlesQuery();
  const articles = newsData?.data || [];
  
  // Show only published articles
  const publishedArticles = articles.filter(
    (article) => article.status === "Published"
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
                      <Link 
                        href={`/latest-news/${article.id}`}
                        className="text-sm text-cyan-400 font-medium hover:text-cyan-300 inline-flex items-center"
                      >
                        Read Full Article <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center mt-12 gap-2">
                <button
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#1A2049] bg-[#0B0D2C] text-gray-400 hover:text-white hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setPage(page)}
                    className={`w-10 h-10 flex items-center justify-center rounded-lg border transition-colors ${
                      currentPage === page
                        ? "bg-cyan-400/10 border-cyan-400 text-cyan-400 font-bold"
                        : "border-[#1A2049] bg-[#0B0D2C] text-gray-400 hover:text-white hover:border-[#2A3560]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
                
                <button
                  onClick={handleNextPage}
                  disabled={currentPage === totalPages}
                  className="w-10 h-10 flex items-center justify-center rounded-lg border border-[#1A2049] bg-[#0B0D2C] text-gray-400 hover:text-white hover:border-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
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
