"use client";

import { use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { Loader2, ArrowLeft, Clock, Share2, Eye } from "lucide-react";
import { useGetNewsArticleDetailsQuery } from "@/redux/features/admin/adminNewsApi";
import Navbar from "@/components/sheard/Navbar";
import Footer from "@/components/sheard/Footer";
import DOMPurify from "isomorphic-dompurify";

export default function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const unwrappedParams = use(params);
  
  const { data: articleData, isLoading } = useGetNewsArticleDetailsQuery(unwrappedParams.id);
  const article = articleData?.data;

  // Scroll to top on load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (isLoading) {
    return (
      <main className="min-h-screen bg-[#050B14] flex flex-col pt-32">
        <Navbar />
        <div className="flex-1 flex justify-center items-center">
          <Loader2 className="w-12 h-12 animate-spin text-cyan-400" />
        </div>
        <Footer />
      </main>
    );
  }

  if (!article) {
    return (
      <main className="min-h-screen bg-[#050B14] flex flex-col pt-32">
        <Navbar />
        <div className="flex-1 container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-bold text-white mb-6">Article not found</h1>
          <p className="text-gray-400 mb-8">The news article you are looking for does not exist or has been removed.</p>
          <Link href="/latest-news" className="text-cyan-400 hover:underline inline-flex items-center">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Latest News
          </Link>
        </div>
        <Footer />
      </main>
    );
  }

  // Create sanitized HTML content
  const createMarkup = (html: string) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  return (
    <main className="min-h-screen bg-[#050B14] flex flex-col pt-32">
      <Navbar />
      
      <div className="flex-1 w-full max-w-4xl mx-auto px-4 py-8 mb-16">
        <Link 
          href="/latest-news" 
          className="inline-flex items-center text-sm font-medium text-cyan-400 hover:text-cyan-300 transition-colors mb-8 bg-cyan-400/10 px-4 py-2 rounded-full border border-cyan-400/20"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Latest News
        </Link>
        
        <article className="bg-[#12143A] rounded-3xl overflow-hidden border border-[#1E2554] shadow-2xl">
          {/* Cover Image */}
          <div className="relative w-full h-[300px] sm:h-[400px] md:h-[500px]">
            <Image
              src={article.featured_image || "/images/event-banner.jpg"}
              alt={article.title}
              fill
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
            {/* Gradient Overlay for Text Visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#12143A] via-[#12143A]/40 to-transparent" />
            
            <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 pb-8">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-1.5 rounded-full inline-block mb-4 shadow-lg">
                {article.category_name}
              </span>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
                {article.title}
              </h1>
              
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-300 font-medium">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-cyan-400 p-[2px]">
                    <div className="w-full h-full rounded-full bg-[#12143A] flex items-center justify-center text-white text-xs font-bold">
                      {article.author_name ? article.author_name.charAt(0) : "A"}
                    </div>
                  </div>
                  <span>{article.author_name || "Admin"}</span>
                </div>
                
                <div className="flex items-center gap-1.5 text-cyan-400">
                  <Clock className="w-4 h-4" />
                  <span>{article.published_date ? format(new Date(article.published_date), "MMM d, yyyy") : "Recent"}</span>
                </div>
                
                <div className="flex items-center gap-1.5 min-w-fit">
                  <Clock className="w-4 h-4 opacity-60" />
                  <span>{article.formatted_read_time || "4 min read"}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-8 sm:p-12 md:max-w-3xl mx-auto relative bg-[#12143A]">
            {/* Quick Actions / Share Sidebar (hidden on mobile, floats on desktop) */}
            <div className="hidden lg:flex flex-col gap-4 absolute -left-16 top-12">
              <button title="Share" className="w-10 h-10 rounded-full bg-[#1E2554] border border-[#2A3560] flex items-center justify-center text-gray-400 hover:text-cyan-400 hover:border-cyan-400 transition-colors">
                <Share2 className="w-4 h-4" />
              </button>
              <div title="Views" className="w-10 h-10 rounded-full bg-[#1E2554]/50 border border-[#2A3560] flex flex-col items-center justify-center text-gray-400">
                <Eye className="w-4 h-4 mb-0.5" />
                <span className="text-[10px] font-bold">{article.views_count || 0}</span>
              </div>
            </div>
            
            {/* Excerpt emphasis */}
            {article.excerpt && (
              <p className="text-xl sm:text-2xl font-light text-[#E2E8F0] leading-relaxed mb-10 italic border-l-4 border-cyan-400 pl-6 py-2">
                &ldquo;{article.excerpt}&rdquo;
              </p>
            )}
            
            {/* Main Content Body */}
            <div 
              className="prose prose-invert prose-lg max-w-none prose-p:text-gray-300 prose-p:leading-relaxed prose-headings:text-white prose-a:text-cyan-400 prose-img:rounded-xl prose-img:border prose-img:border-[#1E2554]"
              dangerouslySetInnerHTML={createMarkup(article.content)}
            />
            
            {/* Tags section */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-[#1E2554]">
                <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-4">Related Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {article.tags.split(',').map((tag: string, index: number) => (
                    <span 
                      key={index}
                      className="text-xs font-semibold text-gray-400 bg-[#1E2554] px-3 py-1.5 rounded-md hover:bg-[#2A3560] hover:text-white transition-colors cursor-pointer"
                    >
                      # {tag.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </article>
      </div>
      
      <Footer />
    </main>
  );
}
