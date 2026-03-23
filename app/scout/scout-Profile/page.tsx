"use client";

import { useGetProfileQuery } from "@/redux/features/scout/scoutProfileApi";
import { useState } from "react";
import { Edit, User } from "lucide-react";
import ProfileEditForm from "@/components/scoutDashboard/profile/ScoutProfileEdit";
import ProfileView from "@/components/scoutDashboard/profile/ScoutProfileView";

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

function EmptyProfileScreen({ onEdit }: { onEdit: () => void }) {
  return (
    <div className="min-h-screen bg-[#070B24] flex items-center justify-center">
      <div className="bg-[#0C1033] border border-[#1A2160] rounded-xl p-10 text-center max-w-sm">
        <div className="w-16 h-16 rounded-full bg-[#111640] border border-[#1A2160] flex items-center justify-center mx-auto mb-4">
          <User size={28} className="text-[#2D3568]" />
        </div>
        <h2 className="text-white font-bold text-base mb-2">No Profile Yet</h2>
        <p className="text-[#5B6397] text-xs mb-6 leading-relaxed">
          Your scout profile hasn't been set up yet. Complete your profile to become discoverable to clubs and players.
        </p>
        {/* <button
          onClick={onEdit}
          className="px-6 py-2.5 bg-[#00D9FF] text-[#070B24] rounded-lg text-sm font-bold hover:bg-[#00C4E8] transition-colors"
        >
          Set Up Profile
        </button> */}
      </div>
    </div>
  );
}

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
  const { data: profile, isLoading, isError, error } = useGetProfileQuery();
  const [isEditMode, setIsEditMode] = useState(false);

  if (isLoading) return <LoadingScreen />;

  // "Profile not found" → not an error, just no profile yet
  const isNotFound =
    (error as any)?.status === 404 ||
    (error as any)?.data?.error?.toLowerCase().includes("not found") ||
    (error as any)?.data?.error?.toLowerCase().includes("please create");

  if (isError && !isNotFound) {
    return <ErrorScreen message="Could not load your profile. Please check your connection." />;
  }

  if (!profile || isNotFound) {
    return <EmptyProfileScreen onEdit={() => setIsEditMode(true)} />;
  }

  return (
    <div className="min-h-screen bg-[#070B24] text-white">
      {isEditMode ? (
        <div className="w-full">
          {/* Form will handle its own header and layout */}
          <ProfileEditForm
            profile={profile}
            onCancel={() => setIsEditMode(false)}
            onSuccess={() => setIsEditMode(false)}
          />
        </div>
      ) : (
        <div className="relative">
          {/* Floating Edit Button for the new design */}
          <div className="absolute top-6 right-6 z-30">
            <button
              onClick={() => setIsEditMode(true)}
              className="px-5 py-2 bg-[#111640]/80 backdrop-blur-md border border-[#00D9FF]/30 text-[#00D9FF] rounded-lg text-sm font-medium hover:bg-[#00D9FF]/10 transition-colors flex items-center gap-2 shadow-lg"
            >
              <Edit size={16} /> Edit Profile
            </button>
          </div>
          <div className="max-w-7xl mx-auto p-4 md:p-8">
            <ProfileView profile={profile} />
          </div>
        </div>
      )}
    </div>
  );
}
