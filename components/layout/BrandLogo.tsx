import Image from "next/image";

import { cn } from "@/lib/utils/cn";

type BrandLogoProps = {
  className?: string;
  priority?: boolean;
};

export function BrandLogo({ className, priority = false }: BrandLogoProps) {
  return (
    <Image
      src="/paperlab-logo.png"
      alt=""
      width={64}
      height={64}
      quality={100}
      priority={priority}
      className={cn("h-7 w-7 object-contain", className)}
      aria-hidden="true"
    />
  );
}
