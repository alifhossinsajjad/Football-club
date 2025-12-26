"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Globe, Menu, X, Instagram, Youtube, Facebook, Lock } from "lucide-react";

const newsCategories = ["All", "Training", "Nutrition", "Academies", "Gear", "News"];

const newsArticles = [
  {
    id: 1,
    category: "Training",
    title: "Top 7 Football Boots for Speed and Control in 2025",
    description: "Compare the best boots trusted by rising stars and pros alike.",
    image: "/view-news-1.jpg",
    readTime: "3 min read",
  },
  {
    id: 2,
    category: "Training",
    title: "5 Essential Drills to Improve Your Ball Control",
    description: "Master these fundamental drills to enhance your ball handling skills and stand out on the pitch.",
    image: "/view-news-2.jpg",
    readTime: "4 min read",
  },
  {
    id: 3,
    category: "Nutrition",
    title: "Pre-Match Nutrition: What to Eat Before a Game",
    description: "Optimize your performance with the right pre-match meal plan recommended by sports nutritionists.",
    image: "/view-news-3.jpg",
    readTime: "5 min read",
  },
  {
    id: 4,
    category: "Academies",
    title: "Top 10 Football Academies in Europe for 2024",
    description: "Discover the leading football academies that are producing the next generation of professional players.",
    image: "/view-news-4.jpg",
    readTime: "6 min read",
  },
  {
    id: 5,
    category: "Training",
    title: "Improving Your Weak Foot: A 30-Day Challenge",
    description: "Follow this structured program to develop two-footed proficiency and become a more versatile player.",
    image: "/view-news-5.jpg",
    readTime: "4 min read",
  },
  {
    id: 6,
    category: "Gear",
    title: "GPS Trackers: Should Youth Players Use Them?",
    description: "Exploring the benefits and considerations of using GPS tracking technology for youth development.",
    image: "/view-news-6.jpg",
    readTime: "3 min read",
  },
  {
    id: 7,
    category: "News",
    title: "Rising Stars: Youth Players Making Headlines",
    description: "Meet the talented young talents who are already catching the attention of top European clubs.",
    image: "/view-news-7.jpg",
    readTime: "5 min read",
  },
];

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Academies", href: "/scout/dashboard" },
  { name: "Clubs", href: "/club/dashboard" },
  { name: "Players", href: "/player/dashboard" },
];

export default function ViewAllNewsPage() {
  const theme = useSelector((state) => state.theme);
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const itemsPerPage = 6;

  const filteredArticles = activeCategory === "All"
    ? newsArticles
    : newsArticles.filter(article => article.category === activeCategory);

  const totalPages = Math.ceil(filteredArticles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentArticles = filteredArticles.slice(startIndex, endIndex);

  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="w-full overflow-hidden" style={{ backgroundColor: theme.colors.backgroundDark }}>
      {/* Custom Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: theme.colors.backgroundDark }}>
        <div className="max-w-[90vw] mx-auto px-4">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <div className="flex items-center">
              <Image
                src="/logo.png"
                alt="NextGen Pros"
                width={140}
                height={24}
                className="w-[100px] sm:w-[120px] lg:w-[140px] h-auto cursor-pointer"
                priority
                onClick={() => router.push("/")}
              />
            </div>

            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="hover:opacity-80 transition-colors font-medium text-base"
                  style={{ color: '#73A5AB' }}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Globe Button */}
            <div className="hidden lg:flex items-center">
              <button
                className="px-2 text-white rounded-md transition w-12 h-8 flex items-center justify-center"
                style={{ backgroundColor: "#04B5A3" }}
              >
                <Globe className="w-5 h-5 text-black" />
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="lg:hidden py-4 border-t" style={{ borderColor: `${theme.colors.primaryCyan}33` }}>
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-sm font-medium"
                    style={{ color: '#73A5AB' }}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-32 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 lg:mb-16">
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4"
              style={{
                background: `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              LATEST NEWS
            </h1>
            <p className="text-base sm:text-lg max-w-2xl mx-auto" style={{ color: '#7FB6B6' }}>
              Stay updated with training tips, nutrition advice, and gear reviews.
            </p>
          </div>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-3 mb-12 lg:mb-16">
            {newsCategories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className="px-6 py-2 rounded-full text-sm font-medium transition-all duration-300"
                  style={{
                    backgroundColor: isActive ? '#06A295' : '#102338',
                    color: isActive ? '#FFFFFF' : '#7FB6B6',
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* News List - Stacked One After Another */}
          <div className="space-y-8 mb-8">
            {currentArticles.map((article) => (
              <div
                key={article.id}
                className="rounded-2xl overflow-hidden transition-transform duration-300 hover:scale-[1.01]"
                style={{ backgroundColor: theme.colors.backgroundCard }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
                  {/* Text Content - Left Side */}
                  <div className="p-6 sm:p-8 lg:p-10 flex flex-col justify-between order-2 md:order-1">
                    {/* Category & Read Time */}
                    <div className="flex items-center justify-between mb-4 sm:mb-6">
                      <span
                        className="text-xs sm:text-sm uppercase tracking-wider font-medium px-3 py-1 rounded-full"
                        style={{ backgroundColor: '#102338', color: '#06A295' }}
                      >
                        {article.category}
                      </span>
                      <span
                        className="text-xs sm:text-sm px-3 py-1 rounded-full"
                        style={{ backgroundColor: '#102338', color: '#06A295' }}
                      >
                        {article.readTime}
                      </span>
                    </div>

                    <div>
                      {/* Title */}
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 sm:mb-4 leading-tight">
                        {article.title}
                      </h3>

                      {/* Description */}
                      <p
                        className="text-sm sm:text-base mb-4 sm:mb-6 leading-relaxed"
                        style={{ color: '#06A295' }}
                      >
                        {article.description}
                      </p>

                      {/* Read More Button with Lock */}
                      <button
                        className="text-sm sm:text-base font-medium transition-colors duration-200 flex items-center gap-2"
                        style={{ color: '#06A295' }}
                      >
                        Read More <Lock className="w-3 h-3 sm:w-4 sm:h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Image - Right Side */}
                  <div className="relative w-full h-64 sm:h-80 md:h-full min-h-[300px] order-1 md:order-2">
                    <Image
                      src={article.image}
                      alt={article.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination - Bottom Right */}
          {totalPages > 1 && (
            <div className="flex items-center justify-end gap-2 mt-8">
              {/* Previous Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                  color: theme.colors.primaryCyan,
                }}
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, index) => {
                const pageNum = index + 1;
                const isActive = currentPage === pageNum;

                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className="w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-all duration-300"
                    style={{
                      background: isActive
                        ? `linear-gradient(90deg, ${theme.colors.primaryCyan} 0%, ${theme.colors.primaryMagenta} 100%)`
                        : theme.colors.backgroundCard,
                      border: isActive
                        ? 'none'
                        : `1px solid ${theme.colors.primaryCyan}33`,
                      color: isActive ? '#FFFFFF' : '#7FB6B6',
                    }}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
                style={{
                  backgroundColor: theme.colors.backgroundCard,
                  border: `1px solid ${theme.colors.primaryCyan}33`,
                  color: theme.colors.primaryCyan,
                }}
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Custom Footer */}
      {/* <footer style={{ backgroundColor: theme.colors.backgroundDark }} className="border-t" style={{ borderColor: `${theme.colors.primaryCyan}20` }}> */}
        <footer
          className="border-t"
          style={{
            backgroundColor: theme.colors.backgroundDark,
            borderColor: `${theme.colors.primaryCyan}20`,
          }}
        >
          <div className="max-w-[80vw] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 lg:py-16">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
              {/* Brand Section */}
              <div>
                <div className="mb-5 sm:mb-6">
                  <Image
                    src="/logo.png"
                    alt="NextGen Pros"
                    width={140}
                    height={24}
                    className="w-[90px] sm:w-[110px] md:w-[120px] lg:w-[140px] h-auto cursor-pointer"
                    priority
                    onClick={() => router.push("/")}
                  />
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-6 sm:mb-8 max-w-xs" style={{ color: '#7FB6B6' }}>
                  Connecting the next generation of football talent with opportunities worldwide.
                </p>

                {/* Social Icons */}
                <div className="flex items-center gap-4 sm:gap-5">
                  <a href="#" className="transition-opacity hover:opacity-80" style={{ color: '#04A196' }}>
                    <Instagram className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a href="#" className="transition-opacity hover:opacity-80" style={{ color: '#04A196' }}>
                    <svg className="w-5 h-5 sm:w-6 sm:h-6" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  <a href="#" className="transition-opacity hover:opacity-80" style={{ color: '#04A196' }}>
                    <Youtube className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                  <a href="#" className="transition-opacity hover:opacity-80" style={{ color: '#04A196' }}>
                    <Facebook className="w-5 h-5 sm:w-6 sm:h-6" />
                  </a>
                </div>
              </div>

              {/* Platforms */}
              <div>
                <h3 className="font-semibold text-white text-base sm:text-lg mb-3 sm:mb-4">
                  Platforms
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {["Home", "Membership"].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-white transition-colors text-xs sm:text-sm" style={{ color: '#7FB6B6' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources */}
              <div>
                <h3 className="font-semibold text-white text-base sm:text-lg mb-3 sm:mb-4">
                  Resources Links
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {["Player Directory", "Agents & Scouts Directory", "Events"].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-white transition-colors text-xs sm:text-sm" style={{ color: '#7FB6B6' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support */}
              <div>
                <h3 className="font-semibold text-white text-base sm:text-lg mb-3 sm:mb-4">
                  Support
                </h3>
                <ul className="space-y-2 sm:space-y-3">
                  {["Help Center", "Contact Us", "Community"].map((item) => (
                    <li key={item}>
                      <a href="#" className="hover:text-white transition-colors text-xs sm:text-sm" style={{ color: '#7FB6B6' }}>
                        {item}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t" style={{ borderColor: `${theme.colors.primaryCyan}10` }}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
              <div className="flex flex-col md:flex-row items-center justify-between gap-3 sm:gap-4 text-center md:text-left">
                <p className="text-xs sm:text-sm" style={{ color: '#7FB6B6' }}>
                  © 2025 NextGen Pros. All rights reserved.
                </p>

                <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
                  {["Privacy policy", "Terms of service", "Cookie Policy"].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="transition-colors text-xs sm:text-sm hover:opacity-80"
                      style={{ color: '#7FB6B6' }}
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </footer>
    </div>
  );
}