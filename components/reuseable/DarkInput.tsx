"use client";

import React, { useState } from "react";

interface Props {
  label: string;
  register: any;
  name: string;
  type?: string;
  error?: string;
  placeholder?: string;
}

const DarkInput = ({
  label,
  register,
  name,
  type = "text",
  error,
  placeholder,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const isPasswordField = type === "password";
  const resolvedType = isPasswordField ? (showPassword ? "text" : "password") : type;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValue(e.target.value.length > 0);
    // Call the register's onChange if it exists
    if (register && register(name) && register(name).onChange) {
      register(name).onChange(e);
    }
  };

  return (
    <div className="space-y-1 relative">
      <label className="text-sm text-gray-300 font-medium transition-all duration-300">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="relative">
        <input
          {...register(name)}
          type={resolvedType}
          placeholder={placeholder || `Enter ${label.toLowerCase()}`}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={handleChange}
          className={`w-full bg-[#050B14]/80 border rounded-lg px-4 py-2.5 text-white outline-none transition-all duration-300 placeholder:text-gray-600 ${
            (!error && hasValue) || isPasswordField ? "pr-12" : ""
          }
          ${error 
            ? "border-red-500 focus:border-red-500 animate-shake" 
            : isFocused 
              ? "border-[#00E5FF] shadow-[0_0_20px_rgba(0,229,255,0.3)]" 
              : "border-white/10 hover:border-white/30"
          }
          `}
        />
        
        {/* Glow effect on focus */}
        {isFocused && !error && (
          <div className="absolute inset-0 rounded-lg pointer-events-none transition-all duration-300">
            <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-500/20 animate-pulse" />
          </div>
        )}
        
        {/* Right-side affordances (success + password toggle) */}
        {((!error && hasValue) || isPasswordField) && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
            {!error && hasValue && (
              <svg
                className="w-5 h-5 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            )}

            {isPasswordField && (
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="text-gray-400 hover:text-gray-200 transition-colors"
              >
                {showPassword ? (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20c-7 0-11-8-11-8a21.78 21.78 0 0 1 5.06-6.94" />
                    <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c7 0 11 8 11 8a21.78 21.78 0 0 1-2.11 3.38" />
                    <path d="M14.12 14.12a3 3 0 0 1-4.24-4.24" />
                    <path d="M1 1l22 22" />
                  </svg>
                ) : (
                  <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </button>
            )}
          </div>
        )}
      </div>
      
      {/* Error message with animation */}
      {error && (
        <div className="flex items-center gap-1 mt-1 animate-shake">
          <svg className="w-4 h-4 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          <p className="text-red-400 text-xs">{error}</p>
        </div>
      )}
    </div>
  );
};

export default DarkInput;
