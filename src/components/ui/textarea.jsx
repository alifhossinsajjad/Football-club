"use client";

import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const textareaVariants = cva(
  "flex w-full rounded-lg border px-4 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 transition-all",
  {
    variants: {
      variant: {
        default:
          "border-gray-600 bg-transparent text-white placeholder:text-gray-500",
        dark: "border-gray-700 bg-gray-800/50 text-white placeholder:text-gray-500",
      },
      size: {
        default: "min-h-32",
        sm: "min-h-24 py-2",
        lg: "min-h-48 py-5 text-base",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const Textarea = forwardRef(({ className, variant, size, ...props }, ref) => {
  return (
    <textarea
      className={cn(textareaVariants({ variant, size, className }))}
      ref={ref}
      {...props}
    />
  );
});

Textarea.displayName = "Textarea";

export { Textarea, textareaVariants };
