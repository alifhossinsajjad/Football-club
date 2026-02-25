"use client";

import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-4 py-2 text-sm font-medium transition-all duration-200",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gray-700 text-white hover:bg-gray-600",
        outline: "bg-transparent text-white hover:opacity-90",
        selected:
          "bg-cyan-500/20 border-cyan-500 text-white shadow-sm shadow-cyan-500/50",
        destructive:
          "border-transparent bg-red-600 text-white hover:bg-red-700",
        secondary:
          "border-transparent bg-gray-600 text-white hover:bg-gray-500",
      },
      size: {
        sm: "px-3 py-1 text-xs",
        md: "px-4 py-2 text-sm",
        lg: "px-6 py-3 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Badge = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  return (
    <div className={cn(badgeVariants({ variant, size, className }))} {...props}>
      {children}
    </div>
  );
};

export { Badge, badgeVariants };
