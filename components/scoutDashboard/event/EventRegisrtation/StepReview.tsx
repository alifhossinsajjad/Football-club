import { useFormContext } from "react-hook-form";
import { Check, Info } from "lucide-react";

export default function StepReview() {
  const { getValues, register } = useFormContext();
  const values = getValues();

  return (
    <div className="space-y-8">
      <div className="flex flex-col items-center justify-center text-center py-4">
        <div className="w-20 h-20 bg-[#00E5FF]/10 border border-[#00E5FF]/20 rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(0,229,255,0.1)]">
          <Check className="w-10 h-10 text-[#00E5FF] stroke-[3px]" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-2">Review Your Registration</h3>
        <p className="text-white/40 text-sm">Please review all information before confirming</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Personal Info Summary */}
        <div className="bg-[#0A0F1D] border border-white/5 rounded-2xl p-6">
          <h4 className="flex items-center gap-2 text-[#00E5FF] font-bold text-sm uppercase tracking-wider mb-6 pb-4 border-b border-white/5">
            <div className="w-1.5 h-1.5 bg-[#00E5FF] rounded-full" />
            Personal Info
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-white/30 text-[11px] uppercase mb-1">Full Name</p>
              <p className="text-white font-medium">{values.first_name} {values.last_name}</p>
            </div>
            <div>
              <p className="text-white/30 text-[11px] uppercase mb-1">Email Address</p>
              <p className="text-white font-medium">{values.email}</p>
            </div>
            <div>
              <p className="text-white/30 text-[11px] uppercase mb-1">Phone Number</p>
              <p className="text-white font-medium">{values.phone_number}</p>
            </div>
          </div>
        </div>

        {/* Professional Info Summary */}
        <div className="bg-[#0A0F1D] border border-white/5 rounded-2xl p-6">
          <h4 className="flex items-center gap-2 text-[#B026FF] font-bold text-sm uppercase tracking-wider mb-6 pb-4 border-b border-white/5">
            <div className="w-1.5 h-1.5 bg-[#B026FF] rounded-full" />
            Professional Info
          </h4>
          <div className="space-y-4">
            <div>
              <p className="text-white/30 text-[11px] uppercase mb-1">Specialization</p>
              <p className="text-white font-medium">{values.specialization || "Not provided"}</p>
            </div>
            <div>
              <p className="text-white/30 text-[11px] uppercase mb-1">Region & Country</p>
              <p className="text-white font-medium">{values.region_country || "Not provided"}</p>
            </div>
            <div>
              <p className="text-white/30 text-[11px] uppercase mb-1">Years of Experience</p>
              <p className="text-white font-medium">{values.years_of_experience ?? "Not provided"}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 pt-4">
        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="mt-1">
            <input 
              type="checkbox" 
              {...register("terms", { required: true })}
              className="w-4 h-4 rounded border-white/10 bg-[#0A0F1D] text-[#00E5FF] focus:ring-[#00E5FF]/20 cursor-pointer" 
            />
          </div>
          <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
            I agree to the <span className="text-[#00E5FF] hover:underline">Terms & Conditions</span> and <span className="text-[#00E5FF] hover:underline">Privacy Policy</span>.
          </p>
        </label>

        <label className="flex items-start gap-3 cursor-pointer group">
          <div className="mt-1">
            <input 
              type="checkbox" 
              {...register("data_sharing", { required: true })}
              className="w-4 h-4 rounded border-white/10 bg-[#0A0F1D] text-[#00E5FF] focus:ring-[#00E5FF]/20 cursor-pointer" 
            />
          </div>
          <p className="text-sm text-white/60 group-hover:text-white/80 transition-colors">
            I understand that my information will be shared with the event organizers to facilitate my attendance.
          </p>
        </label>
      </div>

      {/* Final Info Box */}
      <div className="bg-[#00E5FF]/5 border border-[#00E5FF]/20 rounded-2xl p-4 flex gap-3">
        <div className="mt-0.5">
          <Info className="w-5 h-5 text-[#00E5FF]" />
        </div>
        <div>
          <h4 className="text-[#00E5FF] text-sm font-bold mb-1">Important Information</h4>
          <p className="text-white/60 text-xs leading-relaxed">
            All scout registrations are subject to verification. A formal confirmation email will be sent to your registered email address shortly after your registration is processed.
          </p>
        </div>
      </div>
    </div>
  );
}