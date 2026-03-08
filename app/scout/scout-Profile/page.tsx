// app/(scout)/profile/page.tsx or pages/scout/profile.tsx
"use client";

import { useGetProfileQuery } from "@/redux/features/scout/scoutProfileApi";
import { useState } from "react";
import { Edit } from "lucide-react";
import ProfileEditForm from "@/components/scoutDashboard/profile/ScoutProfileEdit";
import ProfileView from "@/components/scoutDashboard/profile/ScoutProfileView";

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
        <p className="text-red-400 text-sm font-semibold mb-1">
          Failed to load profile
        </p>
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
  const [isEditMode, setIsEditMode] = useState(false);

  if (isLoading) return <LoadingScreen />;
  if (isError || !profile)
    return <ErrorScreen message="Could not load your profile." />;

  return (
    <div className="min-h-screen bg-[#070B24] text-white">
      {/* Header */}
      <div className="border-b border-[#1A2160] px-6 py-4 flex items-center justify-between bg-[#08092F]">
        <h1 className="text-xl font-bold text-[#00D9FF]">My Scout Profile</h1>
        {!isEditMode && (
          <button
            onClick={() => setIsEditMode(true)}
            className="px-5 py-2 bg-[#111640] border border-[#00D9FF]/30 text-[#00D9FF] rounded-lg text-sm font-medium hover:bg-[#00D9FF]/10 transition-colors flex items-center gap-2"
          >
            <Edit size={16} /> Edit Profile
          </button>
        )}
      </div>

      <div className="p-6 max-w-4xl mx-auto">
        {isEditMode ? (
          <ProfileEditForm
            profile={profile}
            onCancel={() => setIsEditMode(false)}
            onSuccess={() => setIsEditMode(false)}
          />
        ) : (
          <ProfileView profile={profile} />
        )}
      </div>
    </div>
  );
}
