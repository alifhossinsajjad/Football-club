import { useFormContext } from "react-hook-form";
import { Info } from "lucide-react";

type FormValues = {
  agency_name: string;
  region: string;
  state: string;
  professional_phone: string;
  experience: string;
};

export default function StepTwo() {
  const { register, formState: { errors } } = useFormContext<FormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Professional Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Agency Name */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-white/70 flex items-center gap-1">
            Organization/Agency Name <span className="text-red-500">*</span>
          </label>
          <input
            {...register("agency_name", { required: "Agency name is required" })}
            placeholder="Enter organization or agency name"
            className={`w-full bg-[#0A0F1D] border ${errors.agency_name ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/50 transition-all`}
          />
          {errors.agency_name && <p className="text-xs text-red-400 mt-1">{errors.agency_name.message}</p>}
        </div>

        {/* Region/Country */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 flex items-center gap-1">
            Region/Country <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("region", { required: "Region is required" })}
              className={`w-full bg-[#0A0F1D] border ${errors.region ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]/50 transition-all appearance-none cursor-pointer`}
            >
              <option value="" className="bg-[#0A0F1D]">Select Region</option>
              <option value="uk" className="bg-[#0A0F1D]">United Kingdom</option>
              <option value="us" className="bg-[#0A0F1D]">United States</option>
              <option value="de" className="bg-[#0A0F1D]">Germany</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white/40" />
            </div>
          </div>
          {errors.region && <p className="text-xs text-red-400 mt-1">{errors.region.message}</p>}
        </div>

        {/* State/Location */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 flex items-center gap-1">
            State/Location <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("state", { required: "State is required" })}
              className={`w-full bg-[#0A0F1D] border ${errors.state ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]/50 transition-all appearance-none cursor-pointer`}
            >
              <option value="" className="bg-[#0A0F1D]">Select State/Location</option>
              <option value="london" className="bg-[#0A0F1D]">London</option>
              <option value="berlin" className="bg-[#0A0F1D]">Berlin</option>
              <option value="ny" className="bg-[#0A0F1D]">New York</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white/40" />
            </div>
          </div>
          {errors.state && <p className="text-xs text-red-400 mt-1">{errors.state.message}</p>}
        </div>

        {/* Professional Contact */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 flex items-center gap-1">
            Contact Number <span className="text-red-500">*</span>
          </label>
          <input
            {...register("professional_phone", { required: "Contact number is required" })}
            placeholder="Enter contact number"
            className={`w-full bg-[#0A0F1D] border ${errors.professional_phone ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/50 transition-all`}
          />
          {errors.professional_phone && <p className="text-xs text-red-400 mt-1">{errors.professional_phone.message}</p>}
        </div>

        {/* Experience */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-white/70 flex items-center gap-1">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register("experience", { required: "Experience is required" })}
              className={`w-full bg-[#0A0F1D] border ${errors.experience ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#00E5FF]/50 transition-all appearance-none cursor-pointer`}
            >
              <option value="" className="bg-[#0A0F1D]">Select experience</option>
              <option value="1-3" className="bg-[#0A0F1D]">1-3 Years</option>
              <option value="4-7" className="bg-[#0A0F1D]">4-7 Years</option>
              <option value="8+" className="bg-[#0A0F1D]">8+ Years</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
              <div className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-white/40" />
            </div>
          </div>
          {errors.experience && <p className="text-xs text-red-400 mt-1">{errors.experience.message}</p>}
        </div>
      </div>

      {/* Info Box */}
      <div className="mt-8 bg-[#B026FF]/5 border border-[#B026FF]/20 rounded-2xl p-4 flex gap-3">
        <div className="mt-0.5">
          <Info className="w-5 h-5 text-[#B026FF]" />
        </div>
        <div>
          <h4 className="text-[#B026FF] text-sm font-bold mb-1">Professional details (optional)</h4>
          <p className="text-white/60 text-xs leading-relaxed">
            Your professional information helps us verify your credentials and ensure you find relevant talent. Any information provided is kept confidential.
          </p>
        </div>
      </div>
    </div>
  );
}