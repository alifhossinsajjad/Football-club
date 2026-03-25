"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Shield, ImageIcon, Type, Edit, Trash2, X, Check, Plus, Hash } from "lucide-react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
import { 
  useGetFeaturedClubsQuery,
  useCreateFeaturedClubMutation,
  useUpdateFeaturedClubMutation,
  useDeleteFeaturedClubMutation,
  FeaturedClub
} from "@/redux/features/admin/adminHomePageApi";

const cardClass = "bg-[#171b2f] border border-gray-800 rounded-[2rem] p-8 md:p-10 mb-8 shadow-2xl backdrop-blur-sm";
const sectionTitleClass = "text-xl font-bold text-white mb-8 flex items-center gap-3";
const labelClass = "text-sm font-medium text-gray-400 mb-2.5 block ml-1";
const inputClass = "w-full bg-[#0a0c16] border border-gray-800 rounded-xl px-4 py-4 text-sm text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600";

const Toggler = ({ enabled, onChange, label, description }: { enabled: boolean; onChange: (val: boolean) => void; label: string; description?: string }) => {
  return (
    <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0a0c16]/50 border border-gray-800/50 hover:border-gray-700 transition-all group">
      <div className="flex-1 pr-4">
        <p className="text-sm font-bold text-gray-200 group-hover:text-white transition-colors">{label}</p>
        {description && <p className="text-xs text-gray-500 mt-1">{description}</p>}
      </div>
      <button
        type="button"
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
          enabled ? "bg-[#00E5FF]" : "bg-gray-800"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out ${
            enabled ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </div>
  );
};

export default function ClubManagementPage() {
  const { data: clubs, isLoading: isLoadingGet } = useGetFeaturedClubsQuery();
  const [createClub, { isLoading: isCreatingClub }] = useCreateFeaturedClubMutation();
  const [updateClub, { isLoading: isUpdating }] = useUpdateFeaturedClubMutation();
  const [deleteClub] = useDeleteFeaturedClubMutation();

  const [editingClub, setEditingClub] = useState<FeaturedClub | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<FeaturedClub>>({});

  useEffect(() => {
    if (editingClub) {
      setFormData(editingClub);
    }
  }, [editingClub]);

  const handleAddNew = () => {
    setFormData({
      club_name: "",
      club_logo: "",
      club_type: "",
      order: 1,
      is_active: true
    });
    setEditingClub(null);
    setIsCreating(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'number' ? Number(value) : value 
    }));
  };

  const handleToggle = (val: boolean) => {
    setFormData(prev => ({ ...prev, is_active: val }));
  };

  const handleDelete = async (id: number) => {
    const confirmed = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this club!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    });

    if (confirmed) {
      try {
        await deleteClub(id).unwrap();
        toast.success("Featured club deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete featured club");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (!formData.club_name || !formData.club_logo || !formData.club_type) {
        toast.error("Please fill in all required fields");
        return;
      }

      if (isCreating) {
        await createClub(formData as FeaturedClub).unwrap();
        toast.success("Featured club created successfully");
        setIsCreating(false);
      } else {
        if (!formData.id) return;
        await updateClub(formData as FeaturedClub).unwrap();
        toast.success("Featured club updated successfully");
        setEditingClub(null);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${isCreating ? 'create' : 'update'} featured club`);
    }
  };

  if (isLoadingGet) {
    return (
      <div className="min-h-screen bg-[#0B0D2C] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const isFormActive = isCreating || editingClub;

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white p-6 md:p-12 font-sans overflow-x-hidden relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
            Featured Clubs
          </h1>
          <p className="text-gray-500 text-lg">Manage existing featured clubs and organization profiles.</p>
        </div>
        {!isFormActive && (
          <button 
            onClick={handleAddNew}
            className="px-6 py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#00cce6] text-[#080D2C] font-bold transition-all shadow-lg shadow-[#00E5FF]/20 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add Featured Club
          </button>
        )}
      </div>

      {!isFormActive ? (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
          <div className="bg-[#171b2f] border border-gray-800 rounded-[2rem] overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#0a0c16]/80 text-gray-400 text-sm uppercase tracking-wider border-b border-gray-800">
                    <th className="px-6 py-5 font-semibold">Logo</th>
                    <th className="px-6 py-5 font-semibold">Club Name</th>
                    <th className="px-6 py-5 font-semibold">Club Type</th>
                    <th className="px-6 py-5 font-semibold">Order</th>
                    <th className="px-6 py-5 font-semibold">Status</th>
                    <th className="px-6 py-5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {clubs && Array.isArray(clubs) && clubs.length > 0 ? (
                    clubs.map((club: FeaturedClub) => (
                      <tr key={club.id} className="hover:bg-[#0a0c16]/40 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="w-16 h-16 rounded-full overflow-hidden border border-gray-700 bg-white/5 flex items-center justify-center p-2">
                            {club.club_logo ? (
                              <img src={club.club_logo} alt="Club Logo" className="w-full h-full object-contain" />
                            ) : (
                              <ImageIcon size={20} className="text-gray-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <p className="font-bold text-gray-200 line-clamp-1">{club.club_name}</p>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20">
                            {club.club_type}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-gray-400 font-mono">
                          {club.order}
                        </td>
                        <td className="px-6 py-5">
                          {club.is_active !== undefined ? (
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${club.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                              {club.is_active ? <Check size={12} /> : <X size={12} />}
                              {club.is_active ? 'Active' : 'Inactive'}
                            </span>
                          ) : (
                            <span className="text-gray-500 text-xs">N/A</span>
                          )}
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => { setEditingClub(club); setIsCreating(false); }}
                              className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-500/20"
                              title="Edit Featured Club"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => club.id && handleDelete(club.id)}
                              className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                              title="Delete Featured Club"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                        No featured clubs found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold flex items-center gap-3">
              <span className="p-2 bg-blue-500/20 text-blue-400 rounded-lg">
                {isCreating ? <Plus size={24} /> : <Edit size={24} />}
              </span>
              {isCreating ? 'Create Featured Club' : 'Edit Featured Club'}
            </h2>
            <button 
              onClick={() => { setEditingClub(null); setIsCreating(false); }} 
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8 max-w-4xl">
            {/* Visibility */}
            <div className={cardClass}>
              <h2 className={sectionTitleClass}><Shield size={20} className="text-cyan-400" /> Club State</h2>
              <Toggler 
                label="Active Status" 
                description="Determine whether this club is shown publicly as featured."
                enabled={!!formData.is_active} 
                onChange={handleToggle} 
              />
            </div>

            {/* Club Information */}
            <div className={cardClass}>
              <h2 className={sectionTitleClass}><Type size={20} className="text-purple-400" /> Club Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className={labelClass}>Club Name *</label>
                  <input name="club_name" value={formData.club_name || ""} onChange={handleChange} className={inputClass} placeholder="e.g. Manchester United" />
                </div>
                <div>
                  <label className={labelClass}>Club Type *</label>
                  <input name="club_type" value={formData.club_type || ""} onChange={handleChange} className={inputClass} placeholder="e.g. Premier League" />
                </div>
                <div>
                  <label className={labelClass}>Display Order</label>
                  <div className="relative">
                    <Hash size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
                    <input name="order" type="number" min="0" value={formData.order || 0} onChange={handleChange} className={`${inputClass} pl-12`} placeholder="1" />
                  </div>
                </div>
              </div>
            </div>

            {/* Media */}
            <div className={cardClass}>
              <h2 className={sectionTitleClass}><ImageIcon size={20} className="text-amber-400" /> Branding & Media</h2>
              
              <div>
                <label className={labelClass}>Club Logo URL *</label>
                <input name="club_logo" value={formData.club_logo || ""} onChange={handleChange} className={inputClass} placeholder="https://cloudinary.com/..." />
                {formData.club_logo && (
                  <div className="mt-6 flex justify-center bg-white/5 border border-gray-800 rounded-xl p-6">
                    <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 bg-white">
                      <img src={formData.club_logo} alt="Club Preview" className="w-full h-full object-contain p-2" />
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => { setEditingClub(null); setIsCreating(false); }} 
                className="px-8 py-3 rounded-xl bg-white/5 border border-gray-800 font-bold hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSave} 
                disabled={isUpdating || isCreatingClub} 
                className="px-10 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#00cce6] text-[#080D2C] font-bold transition-all shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 flex items-center justify-center min-w-[160px]"
              >
                {isUpdating || isCreatingClub ? <Loader2 size={18} className="animate-spin text-[#080D2C]" /> : (isCreating ? 'Create Featured Club' : 'Update Featured Club')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
