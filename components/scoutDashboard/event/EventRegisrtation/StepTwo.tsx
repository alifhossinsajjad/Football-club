import { useFormContext } from "react-hook-form";
import { Info } from "lucide-react";

type FormValues = {
  region_country: string;
  specialization: string;
  years_of_experience: number;
};

export default function StepTwo() {
  const { register, formState: { errors } } = useFormContext<FormValues>();

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white mb-6">Professional Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Specialization */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-white/70 flex items-center gap-1">
            Specialization <span className="text-red-500">*</span>
          </label>
          <input
            {...register("specialization", { required: "Specialization is required" })}
            placeholder="e.g. Youth Development, Talent Identification"
            className={`w-full bg-[#0A0F1D] border ${errors.specialization ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/50 transition-all`}
          />
          {errors.specialization && <p className="text-xs text-red-400 mt-1">{errors.specialization.message}</p>}
        </div>

        {/* Region/Country */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-white/70 flex items-center gap-1">
            Region/Country <span className="text-red-500">*</span>
          </label>
          <input
            {...register("region_country", { required: "Region/Country is required" })}
            placeholder="e.g. London, UK"
            className={`w-full bg-[#0A0F1D] border ${errors.region_country ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/50 transition-all`}
          />
          {errors.region_country && <p className="text-xs text-red-400 mt-1">{errors.region_country.message}</p>}
        </div>

        {/* Experience */}
        <div className="space-y-2 col-span-1 md:col-span-2">
          <label className="text-sm font-medium text-white/70 flex items-center gap-1">
            Years of Experience <span className="text-red-500">*</span>
          </label>
          <input
            type="number"
            {...register("years_of_experience", { 
              required: "Experience is required",
              min: { value: 0, message: "Must be a positive number" }
            })}
            placeholder="Enter years of experience"
            className={`w-full bg-[#0A0F1D] border ${errors.years_of_experience ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:border-[#00E5FF]/50 transition-all`}
          />
          {errors.years_of_experience && <p className="text-xs text-red-400 mt-1">{errors.years_of_experience.message}</p>}
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