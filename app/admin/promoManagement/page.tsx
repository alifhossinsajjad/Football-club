"use client";

import React, { useState } from 'react';
import { 
  Ticket, 
  Plus, 
  Search, 
  Filter, 
  Loader2, 
  CheckCircle2, 
  XCircle,
  Clock,
  Users,
  Percent,
  CircleDollarSign,
  TrendingUp,
  ExternalLink,
  ChevronRight,
  Calendar
} from 'lucide-react';
import { 
  useGetPromoCodesQuery, 
  useDeletePromoCodeMutation, 
  useGetPromoCodeByCodeQuery,
  useUpdatePromoStatusMutation 
} from '@/redux/features/admin/adminPromoApi';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { toast } from 'react-hot-toast';
import { Eye, Trash2, X, AlertTriangle, RefreshCcw, Send } from 'lucide-react';

// ─── Validator Modal ────────────────────────────────────────────────────────
import { useValidatePromoCodeMutation } from '@/redux/features/admin/adminPromoApi';

function PromoValidatorModal({ onClose }: { onClose: () => void }) {
  const [validatePromo, { isLoading, data: response }] = useValidatePromoCodeMutation();
  const [formData, setFormData] = useState({
    code: '',
    amount: '',
    usage_type: 'EVENT' as 'EVENT' | 'BOOST'
  });

  const handleValidate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.code || !formData.amount) {
      toast.error("Please fill in all fields");
      return;
    }
    try {
      await validatePromo({
        code: formData.code.toUpperCase(),
        amount: Number(formData.amount),
        usage_type: formData.usage_type
      }).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || "Validation failed");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#171b2f] border border-gray-800 rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-800 bg-[#12142d]/50">
          <h2 className="text-lg font-bold flex items-center gap-2">
            <RefreshCcw className="text-cyan-400" size={18} />
            Harness: Promo Validator
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-gray-400">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleValidate} className="p-6 space-y-4">
          <div>
            <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1 block">Promo Code</label>
            <input 
              type="text" 
              value={formData.code}
              onChange={(e) => setFormData(prev => ({ ...prev, code: e.target.value }))}
              placeholder="E.g. SUMMER2024"
              className="w-full bg-black/20 border border-gray-800 rounded-xl p-3 text-sm font-bold focus:border-cyan-500/50 outline-none uppercase"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1 block">Amount ($)</label>
              <input 
                type="number" 
                value={formData.amount}
                onChange={(e) => setFormData(prev => ({ ...prev, amount: e.target.value }))}
                placeholder="100.00"
                className="w-full bg-black/20 border border-gray-800 rounded-xl p-3 text-sm font-bold focus:border-cyan-500/50 outline-none"
              />
            </div>
            <div>
              <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1 block">Usage Type</label>
              <select 
                value={formData.usage_type}
                onChange={(e) => setFormData(prev => ({ ...prev, usage_type: e.target.value as any }))}
                className="w-full bg-black/20 border border-gray-800 rounded-xl p-3 text-sm font-bold focus:border-cyan-500/50 outline-none appearance-none"
              >
                <option value="EVENT">Event</option>
                <option value="BOOST">Boost</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0B0D2C] rounded-xl font-black uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
            Validate Code
          </button>
        </form>

        {response?.success && (
          <div className="mx-6 mb-6 p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl animate-in slide-in-from-top-2">
            <div className="flex items-center gap-2 mb-3 text-emerald-400">
               <CheckCircle2 size={16} />
               <span className="text-xs font-black uppercase">Valid Promo Applied</span>
            </div>
            <div className="space-y-2">
               <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Original Amount:</span>
                  <span className="text-white font-bold">${response.data.original_amount.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-xs">
                  <span className="text-gray-500">Discount ({response.data.discount_value}{response.data.discount_type === 'PERCENTAGE' ? '%' : '$'}):</span>
                  <span className="text-emerald-400 font-bold">-${response.data.discount_amount.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm border-t border-gray-800 pt-2 mt-2">
                  <span className="text-white font-black uppercase">Final Total:</span>
                  <span className="text-cyan-400 font-black">${response.data.final_amount.toFixed(2)}</span>
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

interface PromoDetailModalProps {
  code: string;
  onClose: () => void;
}

function PromoDetailModal({ code, onClose }: PromoDetailModalProps) {
  const { data: response, isLoading } = useGetPromoCodeByCodeQuery(code);
  const data = response?.data;

  const labelClass = "text-[10px] text-gray-500 uppercase font-black tracking-widest mb-1 block";
  const valueClass = "text-sm font-bold text-white mb-4";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
      <div className="bg-[#171b2f] border border-gray-800 rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex justify-between items-center p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <Ticket className="text-cyan-400" size={20} />
            Promo Details: <span className="text-cyan-400 uppercase">{code}</span>
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg text-gray-400 transition-colors">
            <X size={20} />
          </button>
        </div>

        {isLoading ? (
          <div className="p-12 flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
            <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Loading Details...</p>
          </div>
        ) : data ? (
          <div className="p-8 space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className={labelClass}>Status</label>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${data.is_valid ? 'bg-emerald-500' : 'bg-gray-600'}`} />
                  <span className={`text-xs font-black uppercase tracking-widest ${data.is_valid ? 'text-emerald-400' : 'text-gray-500'}`}>
                    {data.status}
                  </span>
                </div>
              </div>
              <div>
                <label className={labelClass}>Stripe Coupon ID</label>
                <p className={valueClass}>{data.stripe_coupon_id || 'N/A'}</p>
              </div>
              <div>
                <label className={labelClass}>Discount Type</label>
                <p className={valueClass}>{data.discount_type}</p>
              </div>
              <div>
                <label className={labelClass}>Discount Value</label>
                <p className={valueClass}>
                  {data.discount_type === 'PERCENTAGE' ? `${data.discount_value}%` : `$${data.discount_value}`}
                </p>
              </div>
              <div>
                <label className={labelClass}>Applicable To</label>
                <p className={valueClass}>{data.applicable_to}</p>
              </div>
              <div>
                <label className={labelClass}>Usage</label>
                <p className={valueClass}>{data.used_count} / {data.max_uses}</p>
              </div>
              <div className="col-span-2 grid grid-cols-2 gap-4 pt-4 border-t border-gray-800">
                <div>
                  <label className={labelClass}>Valid From</label>
                  <p className="text-xs text-gray-300">{new Date(data.valid_from).toLocaleString()}</p>
                </div>
                <div>
                  <label className={labelClass}>Valid Until</label>
                  <p className="text-xs text-red-400 font-bold">{new Date(data.valid_until).toLocaleString()}</p>
                </div>
              </div>
            </div>
            <button 
              onClick={onClose}
              className="w-full py-4 mt-4 bg-white/5 border border-gray-800 hover:bg-white/10 rounded-2xl font-black uppercase tracking-widest text-xs text-gray-400 transition-all"
            >
              Close Details
            </button>
          </div>
        ) : (
          <div className="p-8 text-center text-red-500 font-bold">Failed to load details.</div>
        )}
      </div>
    </div>
  );
}

export default function PromoManagementPage() {
  const router = useRouter();
  const { data: response, isLoading, isError } = useGetPromoCodesQuery();
  const [deletePromoCode, { isLoading: isDeleting }] = useDeletePromoCodeMutation();
  const [updateStatus] = useUpdatePromoStatusMutation();
  const promoCodes = response?.data || [];

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState<string | null>(null);
  const [updatingCode, setUpdatingCode] = useState<string | null>(null);
  const [isValidatorOpen, setIsValidatorOpen] = useState(false);

  const filteredCodes = promoCodes.filter(code => 
    code.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggleStatus = async (promo: any) => {
    const newStatus = promo.status === 'ACTIVE' ? 'INACTIVE' : 'ACTIVE';
    setUpdatingCode(promo.code);
    try {
      const res = await updateStatus({ code: promo.code, status: newStatus }).unwrap();
      if (res.success) {
        toast.success(`Promo status updated to ${newStatus}`);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || 'Failed to update status');
    } finally {
      setUpdatingCode(null);
    }
  };

  const handleDelete = async (code: string) => {
    if (window.confirm(`Are you sure you want to delete promo code "${code}"?`)) {
      try {
        const res = await deletePromoCode(code).unwrap();
        if (res.success) {
          toast.success(res.message || 'Promo code deleted successfully');
        }
      } catch (error: any) {
        toast.error(error?.data?.message || 'Failed to delete promo code');
      }
    }
  };

  const metrics = [
    { 
      icon: <Ticket className="w-5 h-5" />, 
      title: "Total Codes", 
      value: promoCodes.length.toString(), 
      color: "text-blue-400", 
      bg: "bg-blue-500/10" 
    },
    { 
      icon: <CheckCircle2 className="w-5 h-5" />, 
      title: "Active Codes", 
      value: promoCodes.filter(c => c.is_valid && c.status === 'ACTIVE').length.toString(), 
      color: "text-emerald-400", 
      bg: "bg-emerald-500/10" 
    },
    { 
      icon: <TrendingUp className="w-5 h-5" />, 
      title: "Total Uses", 
      value: promoCodes.reduce((acc, c) => acc + c.used_count, 0).toString(), 
      color: "text-cyan-400", 
      bg: "bg-cyan-500/10" 
    },
    { 
      icon: <XCircle className="w-5 h-5" />, 
      title: "Expired/Invalid", 
      value: promoCodes.filter(c => !c.is_valid || c.status !== 'ACTIVE').length.toString(), 
      color: "text-red-400", 
      bg: "bg-red-500/10" 
    },
  ];

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white p-6 md:p-8 font-sans">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
            Promo Management
          </h1>
          <p className="text-gray-400 mt-2 text-lg">Create and track discounts for your platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsValidatorOpen(true)}
            className="flex items-center gap-2 px-6 py-3 bg-white/5 border border-gray-800 hover:bg-white/10 hover:border-gray-700 text-gray-400 hover:text-white rounded-xl font-bold transition-all transform hover:scale-105 active:scale-95"
          >
            <RefreshCcw size={18} />
            Test Validator
          </button>
          <button 
            onClick={() => router.push('/admin/promoManagement/create')}
            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 hover:bg-cyan-400 text-[#0B0D2C] rounded-xl font-bold transition-all shadow-lg shadow-cyan-500/20 transform hover:scale-105 active:scale-95"
          >
            <Plus size={20} />
            Create New Promo Code
          </button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        {metrics.map((m, i) => (
          <div key={i} className="bg-[#171b2f] border border-gray-800 rounded-3xl p-6 transition-all hover:border-gray-700 hover:shadow-2xl">
            <div className={`inline-flex p-3 rounded-2xl ${m.bg} ${m.color} mb-4`}>
              {m.icon}
            </div>
            <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{m.title}</p>
            <p className="text-3xl font-bold text-white">{m.value}</p>
          </div>
        ))}
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-6 mb-6">
         <div className="relative group flex-1 w-full xl:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search by code (e.g. SUMMER2024)..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#171b2f] border border-gray-800 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600 font-medium"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-[#171b2f] border border-gray-800 rounded-xl text-gray-400 hover:text-white hover:border-gray-700 transition-all text-sm font-bold">
            <Filter size={18} />
            More Filters
          </button>
      </div>

      {/* Main Table Area */}
      <div className="bg-[#171b2f]/50 border border-gray-800 rounded-[2rem] overflow-hidden backdrop-blur-sm shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-[#12142d]/50 border-b border-gray-800/50">
                <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Promo Code</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Value</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Usage</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Target</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Validity</th>
                <th className="px-6 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em]">Status</th>
                <th className="px-8 py-6 text-xs font-black text-gray-500 uppercase tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/50">
              {isLoading ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-4">
                      <Loader2 className="w-10 h-10 text-cyan-400 animate-spin" />
                      <p className="text-gray-500 font-bold uppercase tracking-widest text-xs">Fetching Promo Codes...</p>
                    </div>
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center text-red-400 font-bold">
                    Failed to load promo codes. Please try again.
                  </td>
                </tr>
              ) : filteredCodes.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-8 py-20 text-center">
                     <div className="flex flex-col items-center gap-2">
                        <Ticket size={40} className="text-gray-800 mb-2" />
                        <p className="text-gray-500 font-bold">No promo codes found matching your search.</p>
                     </div>
                  </td>
                </tr>
              ) : (
                filteredCodes.map((code) => (
                  <tr 
                    key={code.id} 
                    className="group hover:bg-white/2 transition-colors border-b border-gray-800/30"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 shrink-0 rounded-xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20">
                          <Ticket className="text-cyan-400" size={18} />
                        </div>
                        <div>
                           <span className="font-black text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">
                             {code.code}
                           </span>
                           <p className="text-[10px] text-gray-600 font-black uppercase tracking-widest mt-0.5">ID: #{code.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                      <div className="flex items-center gap-2">
                         <div className={`p-1.5 rounded-lg ${code.discount_type === 'PERCENTAGE' ? 'bg-purple-500/10 text-purple-400' : 'bg-green-500/10 text-green-400'} border border-current/20`}>
                            {code.discount_type === 'PERCENTAGE' ? <Percent size={14} /> : <CircleDollarSign size={14} />}
                         </div>
                         <span className="font-bold text-white">
                           {code.discount_type === 'PERCENTAGE' ? `${Number(code.discount_value)}%` : `$${Number(code.discount_value).toFixed(2)}`}
                         </span>
                      </div>
                    </td>
                    <td className="px-6 py-6">
                       <div className="flex flex-col gap-1 w-24">
                          <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
                             <span className="text-gray-500">{code.used_count} / {code.max_uses}</span>
                             <span className={code.used_count >= code.max_uses ? 'text-red-400' : 'text-cyan-400'}>
                               {Math.round((code.used_count / code.max_uses) * 100)}%
                             </span>
                          </div>
                          <div className="h-1.5 w-full bg-black/40 rounded-full overflow-hidden border border-white/5">
                             <div 
                               className={`h-full transition-all duration-500 ${code.used_count >= code.max_uses ? 'bg-red-500' : 'bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.5)]'}`}
                               style={{ width: `${Math.min(100, (code.used_count / code.max_uses) * 100)}%` }} 
                             />
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-6">
                       <span className="px-3 py-1 bg-white/5 text-gray-400 border border-gray-800 rounded-full text-[10px] font-black tracking-widest uppercase">
                         {code.applicable_to}
                       </span>
                    </td>
                    <td className="px-6 py-6">
                       <div className="flex flex-col gap-1">
                          <div className="flex items-center gap-2 text-xs text-gray-400">
                             <Clock size={12} className="text-gray-600" />
                             <span>{formatDate(code.valid_from)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-xs text-white font-medium">
                             <Calendar size={12} className="text-red-400/50" />
                             <span className="text-red-400/80">Till {formatDate(code.valid_until)}</span>
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-6">
                      <button 
                        onClick={() => handleToggleStatus(code)}
                        disabled={updatingCode === code.code}
                        className="flex items-center gap-2 group/status hover:opacity-80 transition-all disabled:opacity-50"
                        title="Click to toggle status"
                      >
                        <div className={`w-2 h-2 rounded-full ${code.is_valid && code.status === 'ACTIVE' ? 'bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-gray-600'}`} />
                        <span className={`text-[10px] font-black tracking-widest uppercase ${code.is_valid && code.status === 'ACTIVE' ? 'text-emerald-400' : 'text-gray-500'}`}>
                          {updatingCode === code.code ? 'Updating...' : code.status}
                        </span>
                        {updatingCode === code.code ? (
                          <RefreshCcw size={10} className="animate-spin text-cyan-400" />
                        ) : (
                          <div className="opacity-0 group-hover/status:opacity-100 transition-opacity">
                            <RefreshCcw size={10} className="text-gray-600" />
                          </div>
                        )}
                      </button>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button 
                            onClick={() => setSelectedCode(code.code)}
                            className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 hover:bg-blue-500 hover:text-white transition-all transform hover:scale-110 border border-blue-500/20"
                            title="View Details"
                          >
                             <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(code.code)}
                            disabled={isDeleting}
                            className="p-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500 hover:text-white transition-all transform hover:scale-110 border border-red-500/20 disabled:opacity-50"
                            title="Delete Code"
                          >
                             {isDeleting ? <Loader2 size={18} className="animate-spin" /> : <Trash2 size={18} />}
                          </button>
                       </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        
        {/* Footer */}
        <div className="px-8 py-6 bg-[#12142d]/50 border-t border-gray-800/50 flex items-center justify-between">
           <p className="text-xs text-gray-500 font-bold uppercase tracking-widest">
             Showing {filteredCodes.length} of {promoCodes.length} codes
           </p>
           <div className="flex gap-2">
              <button disabled className="px-4 py-2 bg-white/5 border border-gray-800 rounded-lg text-xs font-bold text-gray-600 cursor-not-allowed">Previous</button>
              <button disabled className="px-4 py-2 bg-white/5 border border-gray-800 rounded-lg text-xs font-bold text-gray-600 cursor-not-allowed">Next</button>
           </div>
        </div>
      </div>

      {/* Details Modal */}
      {selectedCode && (
        <PromoDetailModal 
          code={selectedCode} 
          onClose={() => setSelectedCode(null)} 
        />
      )}

      {/* Validator Modal */}
      {isValidatorOpen && (
        <PromoValidatorModal 
          onClose={() => setIsValidatorOpen(false)} 
        />
      )}

    </div>
  );
}
