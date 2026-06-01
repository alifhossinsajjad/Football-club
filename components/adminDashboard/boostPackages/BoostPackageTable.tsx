"use client";

import React from "react";
import {
  Eye,
  Pencil,
  Trash2,
  Zap,
  ToggleLeft,
  ToggleRight,
  Loader2,
} from "lucide-react";
import type { BoostPackage } from "@/redux/features/admin/adminBoostPackageApi";

interface BoostPackageTableProps {
  packages: BoostPackage[];
  onView: (pkg: BoostPackage) => void;
  onEdit: (pkg: BoostPackage) => void;
  onDelete: (id: number, duration: string) => void;
  onToggleStatus: (id: number) => void;
  isDeleting: boolean;
  togglingId: number | null;
}

const BoostPackageTable: React.FC<BoostPackageTableProps> = ({
  packages,
  onView,
  onEdit,
  onDelete,
  onToggleStatus,
  isDeleting,
  togglingId,
}) => {
  const formatPrice = (price: string | number) =>
    `€${parseFloat(String(price)).toFixed(2)}`;

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="bg-[#0a0c16]/60 text-gray-400 border-b border-gray-800">
          <tr>
            <th className="px-6 py-5 font-medium uppercase tracking-wider text-[11px]">
              ID
            </th>
            <th className="px-6 py-5 font-medium uppercase tracking-wider text-[11px]">
              Duration
            </th>
            <th className="px-6 py-5 font-medium uppercase tracking-wider text-[11px]">
              Price
            </th>
            <th className="px-6 py-5 font-medium uppercase tracking-wider text-[11px]">
              Discount
            </th>
            <th className="px-6 py-5 font-medium uppercase tracking-wider text-[11px]">
              Features
            </th>
            <th className="px-6 py-5 font-medium uppercase tracking-wider text-[11px]">
              Status
            </th>
            <th className="px-6 py-5 font-medium uppercase tracking-wider text-[11px]">
              Created
            </th>
            <th className="px-6 py-5 font-medium uppercase tracking-wider text-[11px] text-right">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-800/50">
          {packages.length > 0 ? (
            packages.map((pkg) => (
              <tr
                key={pkg.id}
                className="hover:bg-white/[0.02] transition-colors group"
              >
                <td className="px-6 py-4 font-mono text-xs text-gray-400">
                  #{pkg.id}
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-100 font-semibold group-hover:text-cyan-400 transition-colors">
                    {pkg.duration}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-emerald-400 font-bold">
                    {formatPrice(pkg.price)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-500/10 text-purple-400 border border-purple-500/20">
                    {pkg.discount}% OFF
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1 max-w-[200px]">
                    {pkg.features.slice(0, 2).map((f, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-md border border-gray-800"
                      >
                        {f}
                      </span>
                    ))}
                    {pkg.features.length > 2 && (
                      <span className="text-[10px] text-cyan-400/70 px-1">
                        +{pkg.features.length - 2} more
                      </span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => onToggleStatus(pkg.id)}
                    disabled={togglingId === pkg.id}
                    className="flex items-center gap-1.5 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
                    title={`Toggle to ${pkg.is_active ? "inactive" : "active"}`}
                  >
                    {togglingId === pkg.id ? (
                      <Loader2 className="w-4 h-4 animate-spin text-gray-400" />
                    ) : pkg.is_active ? (
                      <ToggleRight className="w-5 h-5 text-green-500" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-gray-500" />
                    )}
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase ${
                        pkg.is_active
                          ? "bg-green-500/10 text-green-500 border border-green-500/20"
                          : "bg-red-500/10 text-red-500 border border-red-500/20"
                      }`}
                    >
                      {pkg.is_active ? "Active" : "Inactive"}
                    </span>
                  </button>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs">
                  {pkg.created_at || "—"}
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onView(pkg)}
                      className="p-2 rounded-lg text-gray-400 hover:text-cyan-400 hover:bg-cyan-400/10 transition-all"
                      title="View Details"
                    >
                      <Eye className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => onEdit(pkg)}
                      className="p-2 rounded-lg text-gray-400 hover:text-amber-400 hover:bg-amber-400/10 transition-all"
                      title="Edit Package"
                    >
                      <Pencil className="w-4.5 h-4.5" />
                    </button>
                    <button
                      onClick={() => onDelete(pkg.id, pkg.duration)}
                      disabled={isDeleting}
                      className="p-2 rounded-lg text-gray-400 hover:text-red-400 hover:bg-red-400/10 transition-all disabled:opacity-50"
                      title="Delete Package"
                    >
                      <Trash2 className="w-4.5 h-4.5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="px-6 py-16 text-center">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-white/5 rounded-full">
                    <Zap className="w-8 h-8 text-gray-600" />
                  </div>
                  <p className="text-gray-500">
                    No boost packages found. Create your first package!
                  </p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BoostPackageTable;
