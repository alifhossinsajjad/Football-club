"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Loader2, Settings, Image as ImageIcon, Type, Sparkles, X, Check, Save, Palette } from "lucide-react";
import { toast } from "react-hot-toast";
import { 
  useGetGeneralSettingsQuery, 
  useUpdateGeneralSettingsMutation,
  GeneralSettings
} from "@/redux/features/admin/adminSettingsApi";

const cardClass = "bg-[#171b2f] border border-gray-800 rounded-[2rem] p-8 md:p-10 mb-8 shadow-2xl backdrop-blur-sm";
const sectionTitleClass = "text-xl font-bold text-white mb-8 flex items-center gap-3";
const labelClass = "text-sm font-medium text-gray-400 mb-2.5 block ml-1";
const inputClass = "w-full bg-[#0a0c16] border border-gray-800 rounded-xl px-4 py-4 text-sm text-gray-300 focus:outline-none focus:border-cyan-500/50 transition-all placeholder:text-gray-600";

export default function ContentManagement() {
  const { data: settings, isLoading: isLoadingGet } = useGetGeneralSettingsQuery();
  const [updateSettings, { isLoading: isUpdating }] = useUpdateGeneralSettingsMutation();

  const [formData, setFormData] = useState<Partial<GeneralSettings>>({});
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [faviconPreview, setFaviconPreview] = useState<string | null>(null);

  useEffect(() => {
    if (settings) {
      setFormData(settings);
    }
  }, [settings]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (name: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      brandColors: {
        ...prev.brandColors!,
        [name]: value
      }
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, field: "platformLogo" | "favicon") => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, [field]: file }));
      const reader = new FileReader();
      reader.onloadend = () => {
        if (field === "platformLogo") setLogoPreview(reader.result as string);
        else setFaviconPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    try {
      const data = new FormData();
      
      // Construct the data object for the 'data' field
      const settingsData = {
        platformName: formData.platformName || "",
        tagline: formData.tagline || "",
        brandColors: formData.brandColors
      };

      data.append("data", JSON.stringify(settingsData));

      if (formData.platformLogo instanceof File) {
        data.append("platformLogo", formData.platformLogo);
      }
      if (formData.favicon instanceof File) {
        data.append("favicon", formData.favicon);
      }

      await updateSettings(data).unwrap();
      toast.success("Settings updated successfully");
    } catch (error) {
      const err = error as { data?: { message?: string } };
      toast.error(err?.data?.message || "Failed to update settings");
    }
  };

  if (isLoadingGet) {
    return (
      <div className="min-h-screen bg-[#0B0D2C] flex items-center justify-center">
        <Loader2 className="w-12 h-12 text-cyan-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white p-6 md:p-12 font-sans overflow-x-hidden relative">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 w-full mb-12">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 bg-linear-to-r from-[#00E5FF] to-[#9C27B0] bg-clip-text text-transparent">
            General Settings
          </h1>
          <p className="text-gray-500 text-lg">Manage platform content and identity</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isUpdating}
          className="px-8 py-3 rounded-xl bg-[#00E5FF] hover:bg-[#00cce6] text-[#080D2C] font-bold transition-all shadow-lg shadow-[#00E5FF]/20 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {isUpdating ? <Loader2 size={20} className="animate-spin" /> : <Save size={20} />}
          Save Changes
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pb-20">
        <div className="space-y-8">
          {/* General Info */}
          <div className={cardClass}>
            <h2 className={sectionTitleClass}><Type size={20} className="text-cyan-400" /> Platform Identity</h2>
            <div className="space-y-6">
              <div>
                <label className={labelClass}>Platform Name</label>
                <input name="platformName" value={formData.platformName || ""} onChange={handleChange} className={inputClass} placeholder="NextGen Pros" />
              </div>
              <div>
                <label className={labelClass}>Tagline</label>
                <input name="tagline" value={formData.tagline || ""} onChange={handleChange} className={inputClass} placeholder="Join the scouts" />
              </div>
            </div>
          </div>

          {/* Theme Customization */}
          <div className={cardClass}>
            <h2 className={sectionTitleClass}><Palette size={20} className="text-purple-400" /> Brand Colors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { label: "Primary Cyan", key: "primaryCyan" },
                { label: "Primary Magenta", key: "primaryMagenta" },
                { label: "Background Dark", key: "backgroundDark" },
                { label: "Background Card", key: "backgroundCard" }
              ].map((color) => (
                <div key={color.key}>
                  <label className={labelClass}>{color.label}</label>
                  <div className="flex items-center gap-3 bg-[#0a0c16] border border-gray-800 rounded-xl p-2 pr-4 transition-all focus-within:border-cyan-500/50">
                    <input 
                      type="color" 
                      value={formData.brandColors?.[color.key as keyof typeof formData.brandColors] || "#000000"} 
                      onChange={(e) => handleColorChange(color.key, e.target.value)}
                      className="w-12 h-12 rounded-lg bg-transparent border-none cursor-pointer overflow-hidden" 
                    />
                    <input 
                      type="text" 
                      value={formData.brandColors?.[color.key as keyof typeof formData.brandColors] || ""} 
                      onChange={(e) => handleColorChange(color.key, e.target.value)}
                      className="bg-transparent border-none focus:outline-none text-white font-mono uppercase text-sm w-full" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          {/* Brand Assets */}
          <div className={cardClass}>
            <h2 className={sectionTitleClass}><ImageIcon size={20} className="text-amber-400" /> Brand Assets</h2>
            
            <div className="space-y-8">
              {/* Logo */}
              <div>
                <label className={labelClass}>Platform Logo</label>
                <div className="flex flex-col gap-4">
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChange(e, "platformLogo")} 
                      className="hidden" 
                      id="logo-upload" 
                    />
                    <label 
                      htmlFor="logo-upload" 
                      className="flex items-center justify-center gap-3 w-full h-32 border-2 border-dashed border-gray-800 rounded-2xl cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group-hover:bg-[#0a0c16]"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-8 h-8 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-sm text-gray-500 group-hover:text-gray-300">
                          {formData.platformLogo instanceof File ? formData.platformLogo.name : "Upload Logo"}
                        </span>
                      </div>
                    </label>
                  </div>
                  {(logoPreview || (typeof formData.platformLogo === 'string' && formData.platformLogo)) && (
                    <div className="rounded-xl overflow-hidden border border-gray-800 w-full bg-[#0a0c16] relative aspect-video">
                      <Image 
                        src={logoPreview || (typeof formData.platformLogo === 'string' ? formData.platformLogo : '')} 
                        alt="Logo Preview" 
                        fill
                        className="object-contain p-4"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Favicon */}
              <div>
                <label className={labelClass}>Favicon</label>
                <div className="flex flex-col gap-4">
                  <div className="relative group">
                    <input 
                      type="file" 
                      accept="image/*" 
                      onChange={(e) => handleFileChange(e, "favicon")} 
                      className="hidden" 
                      id="favicon-upload" 
                    />
                    <label 
                      htmlFor="favicon-upload" 
                      className="flex items-center justify-center gap-3 w-full h-24 border-2 border-dashed border-gray-800 rounded-2xl cursor-pointer hover:border-cyan-500/50 hover:bg-cyan-500/5 transition-all group-hover:bg-[#0a0c16]"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-gray-500 group-hover:text-cyan-400 transition-colors" />
                        <span className="text-sm text-gray-500 group-hover:text-gray-300">
                          {formData.favicon instanceof File ? formData.favicon.name : "Upload Favicon"}
                        </span>
                      </div>
                    </label>
                  </div>
                  {(faviconPreview || (typeof formData.favicon === 'string' && formData.favicon)) && (
                    <div className="rounded-xl overflow-hidden border border-gray-800 w-24 h-24 bg-[#0a0c16] relative p-4 self-start">
                      <Image 
                        src={faviconPreview || (typeof formData.favicon === 'string' ? formData.favicon : '')} 
                        alt="Favicon Preview" 
                        fill
                        className="object-contain"
                        unoptimized
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
