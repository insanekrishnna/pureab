"use client";

import { cn } from "@/lib/utils/cn";

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Slider({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  showValue = false,
  className,
}: SliderProps) {
  return (
    <label className={cn("block w-full", className)}>
      {label || showValue ? (
        <span className="mb-2 flex items-center justify-between gap-3 text-sm font-medium text-text-primary">
          <span>{label}</span>
          {showValue ? (
            <span className="text-xs text-text-secondary">{value}</span>
          ) : null}
        </span>
      ) : null}
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="field-surface h-2 w-full cursor-pointer rounded-none transition-all duration-150 ease-out"
        style={{ accentColor: "var(--accent)" }}
      />
    </label>
  );
}
