"use client";

import React from "react";
import { X, Loader2, Calendar, CheckCircle2, XCircle, Zap, Tag, DollarSign, Percent, Sparkles } from "lucide-react";
import { useGetBoostPackageByIdQuery } from "@/redux/features/admin/adminBoostPackageApi";

interface Props {
  packageId: number | string;
  onClose: () => void;
}

const BoostPackageDetailsModal: React.FC<Props> = ({ packageId, onClose }) => {
  const { data: response, isLoading, isError } = useGetBoostPackageByIdQuery(packageId);
  const pkg = response?.data;

  const fmtPrice = (p: string | number) => `€${parseFloat(String(p)).toFixed(2)}`;
  const finalPrice = pkg ? (parseFloat(String(pkg.price)) * (1 - pkg.discount / 100)).toFixed(2) : "0.00";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-[#171b2f] border border-gray-800 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start p-6 border-b border-gray-800">
          <div>
            <h2 className="text-xl font-bold text-white">Boost Package Details</h2>
            <p className="text-gray-400 text-sm mt-0.5">Full view of boost package configuration</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-lg hover:bg-white/5 text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-cyan-500 animate-spin" />
              <p className="text-gray-400">Fetching package details...</p>
            </div>
          ) : isError || !pkg ? (
            <div className="py-20 text-center">
              <p className="text-red-400">Failed to load package details.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Header Card */}
              <div className="relative overflow-hidden bg-gradient-to-br from-[#0a0c16] to-[#131630] border border-gray-800 rounded-2xl p-6">
                <div className="absolute top-0 right-0 w-40 h-40 bg-cyan-500/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="flex items-center gap-4 relative z-10">
                  <div className="p-3 rounded-xl bg-cyan-500/10"><Zap className="w-8 h-8 text-cyan-400" /></div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{pkg.duration}</h3>
                    <p className="text-gray-400 text-sm mt-0.5">Package ID: #{pkg.id}</p>
                  </div>
                </div>
              </div>

              {/* Pricing */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-[#0a0c16] border border-gray-800 rounded-xl px-5 py-4">
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider flex items-center gap-1.5"><DollarSign className="w-3 h-3" /> Base Price</p>
                  <p className="text-2xl font-bold text-white mt-1">{fmtPrice(pkg.price)}</p>
                </div>
                <div className="bg-[#0a0c16] border border-gray-800 rounded-xl px-5 py-4">
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider flex items-center gap-1.5"><Percent className="w-3 h-3" /> Discount</p>
                  <p className="text-2xl font-bold text-purple-400 mt-1">{pkg.discount}%</p>
                </div>
                <div className="bg-[#0a0c16] border border-gray-800 rounded-xl px-5 py-4">
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider flex items-center gap-1.5"><Tag className="w-3 h-3" /> Final Price</p>
                  <p className="text-2xl font-bold text-emerald-400 mt-1">€{finalPrice}</p>
                </div>
              </div>

              {/* Features */}
              <div className="bg-[#0a0c16] border border-gray-800 rounded-2xl p-6">
                <p className="text-gray-400 text-xs uppercase tracking-wider mb-4 flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Included Features
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pkg.features.map((f, i) => (
                    <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/[0.02] border border-gray-800/50">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 shrink-0" />
                      <span className="text-gray-300 text-sm">{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Status & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-[#0a0c16] border border-gray-800 rounded-xl px-5 py-4">
                  <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Status</p>
                  <div className="flex items-center gap-2 mt-1">
                    {pkg.is_active ? (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-green-500/10 text-green-500 border border-green-500/20">
                        <CheckCircle2 className="w-3 h-3" /> Active
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase bg-red-500/10 text-red-500 border border-red-500/20">
                        <XCircle className="w-3 h-3" /> Inactive
                      </span>
                    )}
                  </div>
                </div>
                {pkg.created_at && (
                  <div className="bg-[#0a0c16] border border-gray-800 rounded-xl px-5 py-4">
                    <p className="text-gray-500 text-xs mb-1 uppercase tracking-wider">Created At</p>
                    <div className="flex items-center gap-2 mt-1 text-gray-300">
                      <Calendar className="w-4 h-4 text-purple-400" />
                      <p>{pkg.created_at}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BoostPackageDetailsModal;
