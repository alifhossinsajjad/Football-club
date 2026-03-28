"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ArrowLeft,
  Ticket,
  Save,
  Send,
  Loader2,
  Calendar as CalendarIcon,
  Percent,
  CircleDollarSign,
  Users,
  AlertCircle,
  CheckCircle2,
  Type,
  ToggleLeft,
  Hash
} from 'lucide-react';
import { useCreatePromoCodeMutation } from '@/redux/features/admin/adminPromoApi';
import { toast } from 'react-hot-toast';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { format, parseISO } from 'date-fns';

export default function CreatePromoCodePage() {
  const router = useRouter();
  const [createPromoCode, { isLoading }] = useCreatePromoCodeMutation();

  // Form State
  const [formData, setFormData] = useState({
    code: '',
    discount_type: 'PERCENTAGE',
    discount_value: '',
    min_purchase: '',
    valid_from: new Date().toISOString().split('T')[0],
    valid_until: '',
    max_uses: '',
    applicable_to: 'ALL',
    isActive: true,
    description: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as any;
    const val = type === 'checkbox' ? (e.target as any).checked : value;
    setFormData(prev => ({ ...prev, [name]: val }));
  };

  const handleSubmit = async () => {
    if (!formData.code || !formData.discount_value || !formData.valid_until) {
      toast.error('Code, discount value, and expiry date are required');
      return;
    }

    try {
      const payload = {
        code: formData.code.toUpperCase(),
        discount_type: formData.discount_type as "PERCENTAGE" | "FIXED",
        discount_value: Number(formData.discount_value),
        max_uses: Number(formData.max_uses) || 0,
        applicable_to: formData.applicable_to,
        valid_from: `${formData.valid_from}T00:00:00Z`,
        valid_until: `${formData.valid_until}T23:59:59Z`,
      };

      const response = await createPromoCode(payload).unwrap();
      
      if (response.success) {
        toast.success(response.message || 'Promo code created successfully!');
        router.push('/admin/monetization'); 
      }
    } catch (error: any) {
      console.error('Failed to create promo code:', error);
      toast.error(error?.data?.message || 'Failed to create promo code');
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D2C] text-white">
      {/* Top Header */}
      <div className="sticky top-0 z-50 bg-[#0B0D2C]/80 backdrop-blur-md border-b border-gray-800/50">
        <div className="px-6 md:px-12 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => router.back()}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 text-gray-400 transition-all"
            >
              <ArrowLeft size={20} />
            </button>
            <h1 className="text-xl font-black tracking-tight">Create <span className="text-cyan-400">Promo Code</span></h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-[#0B0D2C] rounded-xl font-black transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-cyan-500/20 disabled:opacity-50"
            >
              {isLoading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              Create Code
            </button>
          </div>
        </div>
      </div>

      <div className="px-6 md:px-12 py-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Form Fields */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Basic Info Section */}
            <section className="bg-[#12143A] border border-gray-800/50 rounded-[2rem] p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-cyan-500/10 text-cyan-400">
                  <Ticket size={18} />
                </div>
                <h2 className="text-lg font-black uppercase tracking-widest text-gray-400">Core Details</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 block ml-1">Promo Code</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold uppercase">#</span>
                    <input
                      type="text"
                      name="code"
                      value={formData.code}
                      onChange={handleInputChange}
                      placeholder="SUMMER2026"
                      className="w-full bg-black/20 border border-gray-800 focus:border-cyan-500/50 rounded-2xl p-4 pl-10 text-lg font-bold transition-all outline-none placeholder:text-gray-600 uppercase"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 block ml-1">Discount Type</label>
                    <div className="relative">
                      <select
                        name="discount_type"
                        value={formData.discount_type}
                        onChange={handleInputChange}
                        className="w-full bg-black/20 border border-gray-800 focus:border-cyan-500/50 rounded-2xl p-4 text-sm font-bold transition-all outline-none appearance-none cursor-pointer"
                      >
                        <option value="PERCENTAGE">Percentage (%)</option>
                        <option value="FIXED">Fixed Amount ($)</option>
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
                        {formData.discount_type === 'PERCENTAGE' ? <Percent size={18} /> : <CircleDollarSign size={18} />}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 block ml-1">Discount Value</label>
                    <input
                      type="number"
                      name="discount_value"
                      value={formData.discount_value}
                      onChange={handleInputChange}
                      placeholder={formData.discount_type === 'PERCENTAGE' ? "20" : "50.00"}
                      className="w-full bg-black/20 border border-gray-800 focus:border-cyan-500/50 rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* Limits & Constraints */}
            <section className="bg-[#12143A] border border-gray-800/50 rounded-[2rem] p-8 shadow-xl">
              <div className="flex items-center gap-2 mb-6">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <AlertCircle size={18} />
                </div>
                <h2 className="text-lg font-black uppercase tracking-widest text-gray-400">Limits & Logic</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 block ml-1">Min Purchase Amount</label>
                  <input
                    type="number"
                    name="min_purchase"
                    value={formData.min_purchase}
                    onChange={handleInputChange}
                    placeholder="0.00"
                    className="w-full bg-black/20 border border-gray-800 focus:border-cyan-500/50 rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 uppercase font-black tracking-widest mb-2 block ml-1">Total Usage Limit</label>
                  <input
                    type="number"
                    name="max_uses"
                    value={formData.max_uses}
                    onChange={handleInputChange}
                    placeholder="100"
                    className="w-full bg-black/20 border border-gray-800 focus:border-cyan-500/50 rounded-2xl p-4 text-sm font-bold transition-all outline-none"
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar / Settings */}
          <div className="space-y-8">
            
            {/* Scheduling Section */}
            <section className="bg-indigo-500/5 border border-indigo-500/10 rounded-[2.5rem] p-6 lg:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400">
                  <CalendarIcon size={20} />
                </div>
                <h2 className="text-lg font-black text-white">Scheduling</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-2 block">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-full flex items-center justify-between bg-black/20 border border-gray-800 focus:border-indigo-500/50 rounded-2xl p-4 text-sm font-bold transition-all outline-none">
                        <span className={formData.valid_from ? "text-white" : "text-gray-500"}>
                          {formData.valid_from ? format(parseISO(formData.valid_from), "PPP") : "Select Date"}
                        </span>
                        <CalendarIcon size={16} className="text-gray-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                      <Calendar 
                        selected={formData.valid_from ? parseISO(formData.valid_from) : undefined}
                        onSelect={(date) => {
                          setFormData(prev => ({ ...prev, valid_from: format(date, "yyyy-MM-dd") }));
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-2 block">Expiry Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <button className="w-full flex items-center justify-between bg-black/20 border border-gray-800 focus:border-indigo-500/50 rounded-2xl p-4 text-sm font-bold transition-all outline-none">
                        <span className={formData.valid_until ? "text-white" : "text-gray-500"}>
                          {formData.valid_until ? format(parseISO(formData.valid_until), "PPP") : "Select Date"}
                        </span>
                        <CalendarIcon size={16} className="text-gray-500" />
                      </button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0 border-none bg-transparent shadow-none" align="start">
                      <Calendar 
                        selected={formData.valid_until ? parseISO(formData.valid_until) : undefined}
                        onSelect={(date) => {
                          setFormData(prev => ({ ...prev, valid_until: format(date, "yyyy-MM-dd") }));
                        }}
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div>
                  <label className="text-[10px] text-gray-400 uppercase font-black tracking-widest mb-2 block">Applicable To</label>
                  <select
                    name="applicable_to"
                    value={formData.applicable_to}
                    onChange={handleInputChange}
                    className="w-full bg-black/20 border border-gray-800 focus:border-indigo-500/50 rounded-2xl p-4 text-sm font-bold transition-all outline-none appearance-none cursor-pointer"
                  >
                    <option value="ALL">All Users</option>
                    <option value="PLAYER">Players Only</option>
                    <option value="SCOUT">Scouts Only</option>
                    <option value="CLUB">Clubs Only</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Status Section */}
            <section className="bg-gray-800/10 border border-gray-800/20 rounded-3xl p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <ToggleLeft className={formData.isActive ? "text-cyan-400" : "text-gray-600"} size={24} />
                  <div>
                    <p className="text-sm font-bold text-white">Status</p>
                    <p className="text-[10px] text-gray-500 uppercase font-black">{formData.isActive ? "Active" : "Inactive"}</p>
                  </div>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cyan-500"></div>
                </label>
              </div>
            </section>

            {/* Live Preview Card */}
            <div className="bg-linear-to-br from-cyan-500/10 to-indigo-500/10 border border-white/5 rounded-3xl p-6 backdrop-blur-sm">
              <p className="text-[10px] text-cyan-400 uppercase font-black tracking-widest mb-4">Live Preview</p>
              <div className="flex flex-col items-center justify-center p-6 bg-black/40 rounded-2xl border border-white/5 border-dashed">
                <Ticket className="text-cyan-400 mb-2 opacity-50" size={32} />
                <p className="text-2xl font-black tracking-tighter text-white">
                  {formData.code || "SUMMER2026"}
                </p>
                <div className="flex items-center gap-2 mt-2">
                   <div className="px-2 py-1 rounded bg-cyan-500 text-[#0B0D2C] text-[10px] font-black uppercase">
                     {formData.discount_value || "20"}{formData.discount_type === 'PERCENTAGE' ? '%' : '$'} OFF
                   </div>
                </div>
                <p className="text-[10px] text-gray-500 mt-4 uppercase font-bold">Expires: {formData.valid_until || "Not set"}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
