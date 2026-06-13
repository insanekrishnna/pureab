"use client";

import { cn } from "@/lib/utils/cn";

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  label?: string;
  className?: string;
}

export function Select({
  options,
  value,
  onChange,
  label,
  className,
}: SelectProps) {
  return (
    <label className={cn("block w-full", className)}>
      {label ? (
        <span className="mb-1.5 block text-sm font-medium text-text-primary">
          {label}
        </span>
      ) : null}
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="field-surface w-full rounded-md px-3 py-2 text-sm text-text-primary transition-all duration-150 ease-out focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/15"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
