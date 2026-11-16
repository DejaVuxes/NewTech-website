import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "./brand";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span className={cn("relative block h-9 w-16 shrink-0 overflow-hidden", className)}>
      <Image
        src="/images/fashion/threehn-monogram.png"
        alt=""
        fill
        sizes="96px"
        className="object-cover dark:brightness-0 dark:invert"
      />
    </span>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap text-ink", className)}>
      <BrandMark className="h-7 w-12 sm:h-9 sm:w-16" />
      <span className="flex flex-col gap-1">
        <span className="display text-[18px] leading-none font-semibold tracking-[-0.04em] sm:text-[22px]">
          {brand.short}
        </span>
        <span className="text-[10px] leading-none tracking-[0.08em] sm:text-[11px]">
          {brand.studio}
        </span>
      </span>
    </span>
  );
}
