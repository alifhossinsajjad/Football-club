import * as React from "react";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";

const Input = React.forwardRef(
  (
    {
      label,
      icon: Icon,
      required = false,
      background,
      className,
      type = "text",
      style,
      ...props
    },
    ref
  ) => {
    const theme = useSelector((state) => state.theme);
    return (
      <div className="relative w-full">
        {/* Optional Label */}
        {label && (
          <div className="flex items-center gap-2 pb-2 text-sm text-gray-400">
            {Icon && <Icon className="w-4 h-4 text-gray-400" />}
            <span>
              {label}
              {required && <span className="text-red-400"> *</span>}
            </span>
          </div>
        )}

        <input
          ref={ref}
          type={type}
          className={cn(
            "flex h-10 w-full rounded-md border px-3 py-2 text-sm text-gray-200 placeholder:text-gray-400",
            "border-[#04B5A3]/20",
            "focus:outline-none focus:ring-2 focus:ring-[#04B5A3]/50 focus:border-transparent",
            "transition-all disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          style={{
            backgroundColor: background || theme.colors.backgroundDark,
            ...style,
          }}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
