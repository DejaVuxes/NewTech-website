import { cn } from "@/lib/utils";
import { brand } from "./brand";

/** Logo mẫu: monogram trong vành đĩa. Thay bằng logo thật của bạn. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg viewBox="0 0 40 40" className="size-8 shrink-0 text-brand sm:size-10" aria-hidden>
        <circle cx="20" cy="20" r="19" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="15" fill="none" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
        <text x="20" y="25" textAnchor="middle" fontSize="13" fontWeight="800" fill="currentColor" style={{ fontFamily: "var(--font-demo-display)" }}>
          {brand.short}
        </text>
      </svg>
      <span className="display whitespace-nowrap text-[16px] font-extrabold text-ink sm:text-[20px]">{brand.name}</span>
    </span>
  );
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
