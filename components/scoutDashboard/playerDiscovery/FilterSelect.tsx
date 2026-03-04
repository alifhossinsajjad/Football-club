import { ChevronDown } from "lucide-react";

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { label: string; value: string }[];
}

export const FilterSelect = ({ label, value, onChange, options }: FilterSelectProps) => (
  <div className="flex flex-col gap-1.5">
    <label className="text-[10px] text-[#4A6480] font-medium uppercase tracking-wider">
      {label}
    </label>
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none bg-[#0a1622] border border-[#1d3a55] rounded-lg px-3 py-2 text-sm text-[#C8D8E8] focus:outline-none focus:border-[#2DD4BF] transition-colors cursor-pointer pr-8"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value} className="bg-[#0a1622]">
            {o.label}
          </option>
        ))}
      </select>
      <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#4A6480] pointer-events-none">
        <ChevronDown size={14} />
      </span>
    </div>
  </div>
);