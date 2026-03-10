"use client";

import React, { useState } from 'react';
import { 
  Newspaper, 
  Eye, 
  TrendingUp, 
  Tag as TagIcon, 
  Plus, 
  Pencil, 
  Trash2, 
  Layout,
  Search,
  Filter,
  ChevronDown,
  Monitor
} from 'lucide-react';

const metrics = [
  { icon: <Newspaper className="w-5 h-5" />, title: "Total Articles", value: "156", sub: "23 published this month", color: "text-blue-400", bg: "bg-blue-500/10" },
  { icon: <Eye className="w-5 h-5" />, title: "Total Views", value: "48.2K", sub: "+18% vs last month", color: "text-cyan-400", bg: "bg-cyan-500/10" },
  { icon: <TagIcon className="w-5 h-5" />, title: "Categories", value: "8", sub: "Active categories", color: "text-emerald-400", bg: "bg-emerald-500/10" },
  { icon: <Monitor className="w-5 h-5" />, title: "Active Ads", value: "12", sub: "In news section", color: "text-purple-400", bg: "bg-purple-500/10" },
];

const initialArticles = [
  { id: 1, title: "Top 10 Training Drills for Young Strikers", category: "Training", author: "Admin", date: "2025-01-10", views: "3,245", status: "Published" },
  { id: 2, title: "Nutrition Guide for Youth Athletes", category: "Nutrition", author: "Admin", date: "2025-01-08", views: "2,891", status: "Published" },
  { id: 3, title: "Best Football Academies in Europe 2025", category: "Academies", author: "Admin", date: "2025-01-05", views: "5,102", status: "Published" },
  { id: 4, title: "Essential Gear for Youth Players", category: "Gear", author: "Admin", date: "2025-01-15", views: "0", status: "Draft" },
];

export default function NewsManagementPage() {
  const [activeTab, setActiveTab] = useState('All Articles');

  const tabs = [
    { name: 'All Articles', count: 156 },
    { name: 'Published', count: 142 },
    { name: 'Drafts', count: 14 },
    { name: 'Categories' }
  ];

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white p-6 md:p-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
            News Management
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Create and manage your platform's editorial content.</p>
        </div>
        <button className="flex items-center gap-2 px-6 py-3 bg-[#00d8b6] hover:bg-[#00c2a3] text-white rounded-xl font-bold transition-all shadow-lg shadow-[#00d8b6]/20 transform hover:scale-105 active:scale-95">
          <Plus size={20} />
          Create New Article
        </button>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#171b2f] border border-gray-800 rounded-3xl p-6 transition-all hover:border-gray-700 hover:shadow-2xl">
            <div className={`inline-flex p-3 rounded-2xl ${m.bg} ${m.color} mb-4`}>
              {m.icon}
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{m.title}</p>
            <p className="text-3xl font-bold text-white mb-1">{m.value}</p>
            <p className="text-gray-500 text-[10px] font-medium uppercase tracking-wider">{m.sub}</p>
          </div>
        ))}
      </div>

      {/* Navigation & Search */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-6">
        <div className="flex flex-wrap gap-8 border-b border-gray-800/50 w-full xl:w-auto">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`pb-4 text-sm font-bold tracking-wide transition-all relative ${
                activeTab === tab.name ? 'text-white' : 'text-gray-500 hover:text-gray-300'
              }`}
            >
              {tab.name} {tab.count !== undefined && <span className="ml-1 opacity-60">({tab.count})</span>}
              {activeTab === tab.name && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-linear-to-r from-cyan-400 to-purple-500" />
              )}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 w-full xl:w-auto">
          <div className="relative group flex-1 xl:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search articles..." 
              className="w-full bg-[#171b2f] border border-gray-800 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600"
            />
          </div>
          <button className="p-2.5 bg-[#171b2f] border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-gray-700 transition-all">
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Articles Table */}
      <div className="bg-[#171b2f]/50 border border-gray-800 rounded-[2rem] overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#12142d]/50 border-b border-gray-800/50">
                <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Article Title</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Category</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Author</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Date</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Views</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {initialArticles.map((article) => (
                <tr key={article.id} className="group hover:bg-white/2 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                        <Newspaper size={20} />
                      </div>
                      <span className="font-bold text-white group-hover:text-cyan-400 transition-colors max-w-xs truncate">
                        {article.title}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-6">
                    <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 rounded-full text-[10px] font-black tracking-widest uppercase">
                      {article.category}
                    </span>
                  </td>
                  <td className="px-6 py-6 text-sm text-gray-400">{article.author}</td>
                  <td className="px-6 py-6 text-sm text-gray-400">{article.date}</td>
                  <td className="px-6 py-6 text-sm font-bold text-cyan-400">{article.views}</td>
                  <td className="px-6 py-6">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase ${
                      article.status === 'Published' 
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                      : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                    }`}>
                      {article.status}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-2 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 border border-blue-500/20">
                        <Eye size={18} />
                      </button>
                      <button className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white transition-all transform hover:scale-110 border border-emerald-500/20">
                        <Pencil size={18} />
                      </button>
                      <button className="p-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 border border-red-500/20">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
