import { NewtechLogo } from "@/components/newtech-logo";
import { brand } from "./brand";

/** Logo Newtech dùng chung (xem src/components/newtech-logo.tsx). */
export function BrandLogo({ className }: { className?: string }) {
  return <NewtechLogo name={brand.name} className={className} />;
}
