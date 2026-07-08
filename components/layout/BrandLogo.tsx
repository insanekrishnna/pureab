import Image from "next/image";
import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/pure.png"
      alt="Paperlab Logo"
      width={67}
      height={60}
      className={cn("object-contain", className)}
      priority={priority}
    />
  );
}
