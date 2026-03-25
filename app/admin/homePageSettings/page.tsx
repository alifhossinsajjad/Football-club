"use client";

import React, { useState, useEffect } from "react";
import { Loader2, Settings, Image as ImageIcon, Type, Sparkles, Edit, Trash2, X, Check, Plus } from "lucide-react";
import { toast } from "react-hot-toast";
import swal from "sweetalert";
import { 
  useGetHeroSettingsQuery, 
  useCreateHeroSettingsMutation,
  useUpdateHeroSettingsMutation,
  useDeleteHeroSettingsMutation,
  HeroSettings
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

export default function HomePageSettings() {
  const { data: heroes, isLoading: isLoadingGet } = useGetHeroSettingsQuery();
  const [createHero, { isLoading: isCreatingHero }] = useCreateHeroSettingsMutation();
  const [updateHero, { isLoading: isUpdating }] = useUpdateHeroSettingsMutation();
  const [deleteHero] = useDeleteHeroSettingsMutation();

  const [editingHero, setEditingHero] = useState<HeroSettings | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<HeroSettings>>({});

  useEffect(() => {
    if (editingHero) {
      setFormData(editingHero);
    }
  }, [editingHero]);

  const handleAddNew = () => {
    setFormData({
      title: "LEVEL UP YOUR PLAY",
      subtitle: "Join the next generation of football talent",
      description: "",
      primary_button_text: "Get Started",
      primary_button_url: "/register",
      secondary_button_text: "Join Now",
      secondary_button_url: "/signup",
      background_color: "#080D2C",
      title_color: "#FFFFFF",
      subtitle_color: "#B0B0B0",
      hero_image: "",
      is_active: true
    });
    setEditingHero(null);
    setIsCreating(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleToggle = (val: boolean) => {
    setFormData(prev => ({ ...prev, is_active: val }));
  };

  const handleDelete = async (id: number) => {
    const confirmed = await swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this hero section!",
      icon: "warning",
      buttons: ["Cancel", "Yes, delete it!"],
      dangerMode: true,
    });

    if (confirmed) {
      try {
        await deleteHero(id).unwrap();
        toast.success("Hero section deleted successfully");
      } catch (error: any) {
        toast.error(error?.data?.message || "Failed to delete hero section");
      }
    }
  };

  const handleSave = async () => {
    try {
      if (isCreating) {
        await createHero(formData).unwrap();
        toast.success("Hero section created successfully");
        setIsCreating(false);
      } else {
        if (!formData.id) return;
        await updateHero(formData).unwrap();
        toast.success("Hero settings updated successfully");
        setEditingHero(null);
      }
    } catch (error: any) {
      toast.error(error?.data?.message || `Failed to ${isCreating ? 'create' : 'update'} hero settings`);
    }
  };

  if (isLoadingGet) {
    return (
      <div className="min-h-screen bg-[#0B0D2C] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
      </div>
    );
  }

  const isFormActive = isCreating || editingHero;

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white p-6 md:p-12 font-sans overflow-x-hidden relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-gradient-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
            Home Page Settings
          </h1>
          <p className="text-gray-500 text-lg">Manage landing page hero sections</p>
        </div>
        {!isFormActive && (
          <button 
            onClick={handleAddNew}
            className="px-6 py-2.5 rounded-xl bg-[#00E5FF] hover:bg-[#00cce6] text-[#080D2C] font-bold transition-all shadow-lg shadow-[#00E5FF]/20 flex items-center justify-center gap-2"
          >
            <Plus size={20} />
            Add New Hero
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
                    <th className="px-6 py-5 font-semibold">Image</th>
                    <th className="px-6 py-5 font-semibold">Title</th>
                    <th className="px-6 py-5 font-semibold">Status</th>
                    <th className="px-6 py-5 font-semibold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {heroes && Array.isArray(heroes) && heroes.length > 0 ? (
                    heroes.map((hero) => (
                      <tr key={hero.id} className="hover:bg-[#0a0c16]/40 transition-colors group">
                        <td className="px-6 py-5">
                          <div className="w-24 h-16 rounded-lg overflow-hidden border border-gray-700">
                            {hero.hero_image ? (
                              <img src={hero.hero_image} alt="Hero" className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-500">
                                <ImageIcon size={20} />
                              </div>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div>
                            <p className="font-bold text-gray-200 line-clamp-1">{hero.title || "No Title"}</p>
                            <p className="text-sm text-gray-500 line-clamp-1 mt-1">{hero.subtitle || "No Subtitle"}</p>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-full border ${hero.is_active ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-gray-500/10 text-gray-400 border-gray-500/20'}`}>
                            {hero.is_active ? <Check size={12} /> : <X size={12} />}
                            {hero.is_active ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex items-center justify-end gap-3 opacity-80 group-hover:opacity-100 transition-opacity">
                            <button
                              onClick={() => { setEditingHero(hero); setIsCreating(false); }}
                              className="p-2 bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 rounded-lg transition-colors border border-blue-500/20"
                              title="Edit Hero"
                            >
                              <Edit size={18} />
                            </button>
                            <button
                              onClick={() => hero.id && handleDelete(hero.id)}
                              className="p-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/20"
                              title="Delete Hero"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                        No hero sections found.
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
              {isCreating ? 'Create Hero Section' : 'Edit Hero Section'}
            </h2>
            <button 
              onClick={() => { setEditingHero(null); setIsCreating(false); }} 
              className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-xl transition-all"
            >
              <X size={24} />
            </button>
          </div>

          <div className="space-y-8">
            {/* Visibility */}
            <div className={cardClass}>
              <h2 className={sectionTitleClass}><Settings size={20} className="text-cyan-400" /> Hero Visibility</h2>
              <Toggler 
                label="Enable Hero Section" 
                description="Toggle whether the hero section is visible on the landing page."
                enabled={!!formData.is_active} 
                onChange={handleToggle} 
              />
            </div>

            {/* Text Content */}
            <div className={cardClass}>
              <h2 className={sectionTitleClass}><Type size={20} className="text-purple-400" /> Text Content</h2>
              <div className="space-y-6">
                <div>
                  <label className={labelClass}>Title</label>
                  <input name="title" value={formData.title || ""} onChange={handleChange} className={inputClass} placeholder="LEVEL UP YOUR PLAY" />
                </div>
                <div>
                  <label className={labelClass}>Subtitle</label>
                  <input name="subtitle" value={formData.subtitle || ""} onChange={handleChange} className={inputClass} placeholder="Join the next generation of football talent" />
                </div>
                <div>
                  <label className={labelClass}>Description</label>
                  <textarea name="description" value={formData.description || ""} onChange={handleChange} rows={3} className={inputClass} placeholder="Optional description..." />
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className={cardClass}>
              <h2 className={sectionTitleClass}><Sparkles size={20} className="text-emerald-400" /> Call to Action Buttons</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-2">Primary Button</h3>
                  <div>
                    <label className={labelClass}>Button Text</label>
                    <input name="primary_button_text" value={formData.primary_button_text || ""} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Button URL / Route</label>
                    <input name="primary_button_url" value={formData.primary_button_url || ""} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-sm font-bold text-gray-300 uppercase tracking-widest border-b border-gray-800 pb-2">Secondary Button</h3>
                  <div>
                    <label className={labelClass}>Button Text</label>
                    <input name="secondary_button_text" value={formData.secondary_button_text || ""} onChange={handleChange} className={inputClass} />
                  </div>
                  <div>
                    <label className={labelClass}>Button URL / Route</label>
                    <input name="secondary_button_url" value={formData.secondary_button_url || ""} onChange={handleChange} className={inputClass} />
                  </div>
                </div>
              </div>
            </div>

            {/* Design & Media */}
            <div className={cardClass}>
              <h2 className={sectionTitleClass}><ImageIcon size={20} className="text-amber-400" /> Design & Media</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div>
                  <label className={labelClass}>Background Color</label>
                  <div className="flex items-center gap-3 bg-[#0a0c16] border border-gray-800 rounded-xl p-2 pr-4 transition-all focus-within:border-cyan-500/50">
                    <input type="color" name="background_color" value={formData.background_color || "#000000"} onChange={handleChange} className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer overflow-hidden" />
                    <input type="text" name="background_color" value={formData.background_color || ""} onChange={handleChange} className="bg-transparent border-none focus:outline-none text-white font-mono uppercase text-sm w-full" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Title Color</label>
                  <div className="flex items-center gap-3 bg-[#0a0c16] border border-gray-800 rounded-xl p-2 pr-4 transition-all focus-within:border-cyan-500/50">
                    <input type="color" name="title_color" value={formData.title_color || "#ffffff"} onChange={handleChange} className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer overflow-hidden" />
                    <input type="text" name="title_color" value={formData.title_color || ""} onChange={handleChange} className="bg-transparent border-none focus:outline-none text-white font-mono uppercase text-sm w-full" />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Subtitle Color</label>
                  <div className="flex items-center gap-3 bg-[#0a0c16] border border-gray-800 rounded-xl p-2 pr-4 transition-all focus-within:border-cyan-500/50">
                    <input type="color" name="subtitle_color" value={formData.subtitle_color || "#ffffff"} onChange={handleChange} className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer overflow-hidden" />
                    <input type="text" name="subtitle_color" value={formData.subtitle_color || ""} onChange={handleChange} className="bg-transparent border-none focus:outline-none text-white font-mono uppercase text-sm w-full" />
                  </div>
                </div>
              </div>

              <div>
                <label className={labelClass}>Hero Image URL</label>
                <input name="hero_image" value={formData.hero_image || ""} onChange={handleChange} className={inputClass} placeholder="https://cloudinary.com/..." />
                {formData.hero_image && (
                  <div className="mt-4 rounded-xl overflow-hidden border border-gray-800 w-full max-w-md">
                    <img src={formData.hero_image} alt="Hero Preview" className="w-full h-auto object-cover" />
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <button 
                type="button"
                onClick={() => { setEditingHero(null); setIsCreating(false); }} 
                className="px-8 py-3 rounded-xl bg-white/5 border border-gray-800 font-bold hover:bg-white/10 transition-all"
              >
                Cancel
              </button>
              <button 
                type="button"
                onClick={handleSave} 
                disabled={isUpdating || isCreatingHero} 
                className="px-10 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#00cce6] text-[#080D2C] font-bold transition-all shadow-lg shadow-[#00E5FF]/20 disabled:opacity-50 flex items-center justify-center min-w-[160px]"
              >
                {isUpdating || isCreatingHero ? <Loader2 size={18} className="animate-spin text-[#080D2C]" /> : (isCreating ? 'Create Hero' : 'Update Settings')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
