 "use client";

import React, { useState } from "react";

interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  register: any;
  name: string;
  options: { label: string; value: string }[];
  error?: string;
}

const DarkSelect = ({
  label,
  register,
  name,
  options,
  error,
  ...props
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-1 w-full relative">
      <label className="text-sm text-gray-300 font-medium transition-all duration-300">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <select
          {...register(name)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`w-full bg-[#050B14]/80 border rounded-lg px-4 py-2.5 text-white outline-none transition-all duration-300 appearance-none
          ${error 
            ? "border-red-500 focus:border-red-500" 
            : isFocused 
              ? "border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]" 
              : "border-white/10 hover:border-white/30"
          }
          `}
          {...props}
        >
          <option value="" disabled hidden className="bg-[#050B14]">
            Select {label}
          </option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value} className="bg-[#050B14] text-white">
              {opt.label}
            </option>
          ))}
        </select>
        
        {/* Glow effect on focus */}
        {isFocused && !error && (
          <div className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse" />
          </div>
        )}
        
        {/* Custom chevron icon for select */}
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-400 transition-colors duration-300">
          <svg 
            className={`fill-current h-4 w-4 transition-transform duration-300 ${isFocused ? 'text-cyan-400 rotate-180' : ''}`} 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 20 20"
          >
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </div>
      </div>
      
      {/* Error message with animation */}
      {error && (
        <div className="flex items-center gap-1 mt-1">
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DarkSelect;
