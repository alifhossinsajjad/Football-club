import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(
  ({ background, className, type, style, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          `flex h-10 w-full rounded-md border border-[#04B5A3]/20 px-3 py-2 text-sm text-gray-400 placeholder:text-gray-400",
          "focus:outline-none focus:ring-2 focus:ring-[#04B5A3]/50 focus:border-transparent",
          "transition-all disabled:cursor-not-allowed disabled:opacity-50 ${background}`,
          className
        )}
        style={{
          backgroundColor: background || "#0B0D2C", // Default background
          ...style, // Allow override via style prop
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
