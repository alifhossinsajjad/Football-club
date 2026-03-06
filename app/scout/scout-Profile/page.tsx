"use client";

import { useGetProfileQuery } from "@/redux/features/scout/scoutProfileApi";
import ScoutProfilePage from "@/components/scoutDashboard/profile/ScoutProfilePage";

// Loading
function LoadingScreen() {
  return (
    <div className="min-h-screen bg-[#070B24] flex items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="w-9 h-9 rounded-full border-[3px] border-[#1A2160] border-t-[#00D9FF] animate-spin" />
        <p className="text-[#5B6397] text-sm">Loading profile…</p>
      </div>
    </div>
  );
}

// Error
function ErrorScreen({ message }: { message: string }) {
  return (
    <div className="min-h-screen bg-[#070B24] flex items-center justify-center">
      <div className="bg-[#0C1033] border border-red-500/20 rounded-xl p-8 text-center max-w-sm">
        <p className="text-red-400 text-sm font-semibold mb-1">Failed to load profile</p>
        <p className="text-[#5B6397] text-xs mb-4">{message}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-[#111640] border border-[#1A2160] text-[#5B6397] hover:text-white transition-colors"
        >
          Retry
        </button>
      </div>
    </div>
  );
}

export default function Page() {
  const { data: profile, isLoading, isError } = useGetProfileQuery();

  if (isLoading) return <LoadingScreen />;
  if (isError || !profile) return <ErrorScreen message="Could not load your profile." />;

  // Pass profile down — ScoutProfilePage renders both panels simultaneously
  return <ScoutProfilePage profile={profile} />;
}