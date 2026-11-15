import { cn } from "@/lib/utils";
import { NewtechLogo } from "@/components/newtech-logo";
import { brand } from "./brand";

/** Logo Newtech dùng chung (xem src/components/newtech-logo.tsx). */
export function Logo({ className }: { className?: string }) {
  return <NewtechLogo name={brand.name} className={className} />;
}

/**
 * Hoạ tiết vành men lam (dải hoa văn sóng + chấm), vẽ bằng SVG, màu --brand, độ tương phản thấp.
 * Là chi tiết trang trí duy nhất của template.
 */
export function PorcelainRim({ className }: { className?: string }) {
  const petals = Array.from({ length: 36 });
  return (
    <svg viewBox="0 0 400 400" className={cn("text-brand", className)} aria-hidden>
      <circle cx="200" cy="200" r="198" fill="none" stroke="currentColor" strokeWidth="2" />
      <circle cx="200" cy="200" r="186" fill="none" stroke="currentColor" strokeWidth="1" />
      {petals.map((_, i) => (
        <g key={i} transform={`rotate(${i * 10} 200 200)`}>
          <path d="M200 16 C 206 24, 206 32, 200 38 C 194 32, 194 24, 200 16 Z" fill="currentColor" opacity="0.55" />
          <circle cx="200" cy="44" r="1.6" fill="currentColor" />
        </g>
      ))}
      <circle cx="200" cy="200" r="152" fill="none" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
