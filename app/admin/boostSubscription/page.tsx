"use client";

import React, { useState } from "react";
import { Plus, Loader2, Search, Filter, Zap } from "lucide-react";
import {
  useGetBoostPackagesQuery,
  useDeleteBoostPackageMutation,
  useToggleBoostPackageStatusMutation,
  type BoostPackage,
} from "@/redux/features/admin/adminBoostPackageApi";
import toast from "react-hot-toast";

import BoostPackageFormModal from "@/components/adminDashboard/boostPackages/BoostPackageFormModal";
import BoostPackageDetailsModal from "@/components/adminDashboard/boostPackages/BoostPackageDetailsModal";
import BoostPackageTable from "@/components/adminDashboard/boostPackages/BoostPackageTable";

export default function BoostSubscriptionPage() {
  const { data: packagesResp, isLoading, isError, refetch } = useGetBoostPackagesQuery();
  const [deleteBoostPackage, { isLoading: isDeleting }] = useDeleteBoostPackageMutation();
  const [toggleStatus] = useToggleBoostPackageStatusMutation();

  const [selectedPackage, setSelectedPackage] = useState<BoostPackage | null>(null);
  const [detailPackage, setDetailPackage] = useState<BoostPackage | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [togglingId, setTogglingId] = useState<number | null>(null);

  const packages = packagesResp?.data || [];

  const filteredPackages = packages.filter(
    (p) =>
      p.duration.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.features.some((f) => f.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleDelete = async (id: number, duration: string) => {
    if (window.confirm(`Are you sure you want to delete the "${duration}" boost package?`)) {
      try {
        await deleteBoostPackage(id).unwrap();
        toast.success("Boost package deleted successfully");
      } catch (err) {
        const error = err as { data?: { message?: string } };
        toast.error(error.data?.message || "Failed to delete boost package");
      }
    }
  };

  const handleToggleStatus = async (id: number) => {
    setTogglingId(id);
    try {
      const result = await toggleStatus(id).unwrap();
      toast.success(result.message || "Status toggled successfully");
    } catch (err) {
      const error = err as { data?: { message?: string } };
      toast.error(error.data?.message || "Failed to toggle status");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111f] text-white p-6 md:p-8 font-sans">
      {/* Modals */}
      {(showAddModal || selectedPackage) && (
        <BoostPackageFormModal
          boostPackage={selectedPackage}
          onClose={() => {
            setShowAddModal(false);
            setSelectedPackage(null);
          }}
        />
      )}

      {detailPackage && (
        <BoostPackageDetailsModal
          packageId={detailPackage.id}
          onClose={() => setDetailPackage(null)}
        />
      )}

      {/* Header */}
      <header className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <Zap className="w-8 h-8 text-cyan-400" />
            <span className="bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
              Boosting Subscription
            </span>
          </h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage player profile boost packages and subscription plans
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#00d8b6] text-white rounded-xl text-sm font-semibold hover:bg-[#00c2a3] transition-all hover:scale-105 shadow-lg shadow-[#00d8b6]/20 shrink-0"
        >
          <Plus className="w-5 h-5" /> Create New Package
        </button>
      </header>

      {/* Toolbar */}
      <section className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            placeholder="Search by duration or features..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#171b2f] border border-gray-800 rounded-xl pl-11 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 bg-[#171b2f] border border-gray-800 rounded-xl text-sm text-gray-400 hover:text-white transition-colors">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </section>

      {/* Table */}
      <main className="bg-[#171b2f] border border-gray-800 rounded-2xl overflow-hidden shadow-xl backdrop-blur-sm">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-24 gap-4">
            <Loader2 className="w-10 h-10 text-cyan-500 animate-spin" />
            <p className="text-gray-400 animate-pulse">Loading boost packages...</p>
          </div>
        ) : isError ? (
          <div className="py-20 text-center">
            <p className="text-red-400 mb-4">Failed to load boost packages.</p>
            <button
              onClick={() => refetch()}
              className="px-4 py-2 bg-white/5 rounded-lg text-sm hover:bg-white/10 transition-colors"
            >
              Retry
            </button>
          </div>
        ) : (
          <BoostPackageTable
            packages={filteredPackages}
            onView={setDetailPackage}
            onEdit={setSelectedPackage}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            isDeleting={isDeleting}
            togglingId={togglingId}
          />
        )}
      </main>
    </div>
  );
}
