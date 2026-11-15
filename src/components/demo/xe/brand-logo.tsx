import Image from "next/image";
import { cn } from "@/lib/utils";
import { brand } from "./brand";

/** Honda branding is scoped to the vehicle showroom. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap text-[#e40521] sm:gap-2.5", className)}>
      <Image src="/images/honda/honda-h.svg" alt="" width={44} height={36} className="h-auto w-8 shrink-0 sm:w-11" />
      <span className="display text-[14px] font-extrabold min-[360px]:text-[16px] sm:text-[20px]">{brand.name}</span>
    </span>
  );
}
