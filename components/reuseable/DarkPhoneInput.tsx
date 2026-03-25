"use client";

import React, { useState } from "react";
import { Controller, Control } from "react-hook-form";
import { countryCodes } from "@/constants/countryCodes";

interface Props {
  label?: string;
  name: string;
  control: Control<any>;
  error?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  className?: string;
  dropdownClassName?: string;
}

const DarkPhoneInput = ({
  label,
  name,
  control,
  error,
  placeholder,
  icon,
  className,
  dropdownClassName,
}: Props) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="space-y-2 relative w-full">
      {(label || icon) && (
        <div className="flex items-center gap-2">
          {icon && <span className="text-white">{icon}</span>}
          {label && (
            <label className="text-sm text-gray-300 font-medium">
              {label} <span className="text-red-500">*</span>
            </label>
          )}
        </div>
      )}
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          // Parse value "+1 555-5555" into code and number
          const stringValue = value || "";
          let code = "+1";
          let number = "";

          // Simple parsing: if string matches a known country code at the start
          const matchedCode = countryCodes.find((c) => stringValue.startsWith(c.code + " "))?.code;
          if (matchedCode) {
            code = matchedCode;
            number = stringValue.substring(matchedCode.length + 1);
          } else {
            // fallback if no space or doesn't match
            // Try to see if it just starts with a code without space (some users might type +44123456)
            const exactCode = countryCodes.find((c) => stringValue.startsWith(c.code))?.code;
            if (exactCode && stringValue.length > exactCode.length) {
              code = exactCode;
              number = stringValue.substring(exactCode.length).trim();
            } else {
              number = stringValue;
            }
          }

          const handleCodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
            const newCode = e.target.value;
            onChange(`${newCode} ${number}`);
          };

          const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const newNumber = e.target.value;
            onChange(`${code} ${newNumber}`);
          };

          return (
            <div
              className={className || `flex items-center w-full bg-[#050B14]/60 border rounded-xl overflow-hidden transition-all duration-300
              ${
                error
                  ? "border-red-500/50 bg-red-500/5 focus-within:border-red-500"
                  : isFocused
                  ? "border-[#00E5FF] shadow-[0_0_15px_rgba(0,229,255,0.2)] bg-[#050B14]/80"
                  : "border-white/5 hover:border-white/20"
              }
              `}
            >
              {/* Country Code Dropdown */}
              <div className={`relative border-r border-white/10 shrink-0 ${dropdownClassName || ''}`}>
                <select
                  value={code}
                  onChange={handleCodeChange}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  className="w-[100px] h-full py-3 pl-3 pr-8 bg-transparent text-white text-sm outline-none appearance-none cursor-pointer"
                >
                  {countryCodes.map((c) => (
                    <option key={c.code} value={c.code} className="bg-[#050B14] text-white">
                      {c.code}
                    </option>
                  ))}
                </select>
                {/* Custom Chevron */}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2 text-gray-500">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                  </svg>
                </div>
              </div>

              {/* Number Input */}
              <input
                type="tel"
                value={number}
                onChange={handleNumberChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder || (label ? `Enter ${label.toLowerCase()}` : "")}
                className="flex-1 w-full bg-transparent px-4 py-3 text-white outline-none placeholder:text-gray-600"
              />
            </div>
          );
        }}
      />

      {/* Error message */}
      {error && (
        <p className="text-red-400 text-xs mt-1 animate-in fade-in slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
};

export default DarkPhoneInput;
