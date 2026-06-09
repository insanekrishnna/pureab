import { forwardRef, type InputHTMLAttributes } from "react";

import { cn } from "@/lib/utils/cn";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const inputId = id ?? props.name;

    return (
      <label className="block w-full">
        {label ? (
          <span className="mb-1.5 block text-sm font-medium text-text-primary">
            {label}
          </span>
        ) : null}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "w-full rounded-[10px] border border-border bg-bg-elevated px-3 py-2 text-sm text-text-primary transition-all duration-150 ease-out",
            "placeholder:text-text-muted focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/10",
            error && "border-error focus:border-error focus:ring-error/10",
            className,
          )}
          {...props}
        />
        {error ? (
          <span className="mt-1.5 block text-xs font-medium text-error">
            {error}
          </span>
        ) : null}
      </label>
    );
  },
);

Input.displayName = "Input";
