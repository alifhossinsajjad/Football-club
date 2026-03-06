"use client";

export default function SkeletonCard() {
  return (
    <div className="bg-[#12143A] border border-[#04B5A3]/20 rounded-xl p-5 animate-pulse">
      <div className="flex gap-3 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#1d3a55]" />
        <div className="flex-1 space-y-2">
          <div className="h-3 w-24 bg-[#1d3a55] rounded" />
          <div className="h-2 w-16 bg-[#1d3a55] rounded" />
        </div>
      </div>

      <div className="space-y-2 mb-4">
        <div className="h-2 w-full bg-[#1d3a55] rounded" />
        <div className="h-2 w-5/6 bg-[#1d3a55] rounded" />
        <div className="h-2 w-4/6 bg-[#1d3a55] rounded" />
      </div>

      <div className="h-8 w-full bg-[#1d3a55] rounded" />
    </div>
  );
}