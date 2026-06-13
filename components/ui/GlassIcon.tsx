import * as React from "react";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface GlassIconProps extends React.ComponentPropsWithoutRef<"svg"> {
  icon: LucideIcon;
  solidClassName?: string;
  glassClassName?: string;
}

export function GlassIcon({ 
  icon: Icon, 
  className, 
  solidClassName,
  glassClassName,
  ...props 
}: GlassIconProps) {
  return (
    <Icon 
      className={cn("text-[#7b61ff]", className)} 
      strokeWidth={2}
      {...props} 
    />
  );
}
