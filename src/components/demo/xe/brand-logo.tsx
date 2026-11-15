import { brand } from "./brand";

/** Logo mẫu: monogram hình học. Thay SVG này bằng logo của bạn. */
export function BrandLogo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 ${className ?? ""}`}>
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <rect x="1" y="1" width="30" height="30" rx="6" className="fill-ink" />
        <path d="M8 23V9l16 14V9" fill="none" strokeWidth="3" strokeLinejoin="round" className="stroke-paper" />
        <circle cx="24" cy="9" r="2.5" className="fill-accent" />
      </svg>
      <span className="display text-[20px] font-extrabold text-ink">{brand.name}</span>
    </span>
  );
}
