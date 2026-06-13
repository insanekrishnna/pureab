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
      alt="Purelab Logo"
      width={96}
      height={96}
      className={cn("object-contain", className)}
      priority={priority}
    />
  );
}
