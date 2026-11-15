import { brand } from "./brand";

/** Logo mẫu: monogram + wordmark. Thay SVG này bằng logo của bạn. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 whitespace-nowrap ${className ?? ""}`}>
      <svg viewBox="0 0 32 32" className="size-8 shrink-0" aria-hidden>
        <rect x="1" y="1" width="30" height="30" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M8 23V9l8 9 8-9v14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span className="display text-[20px] font-extrabold">{brand.name}</span>
    </span>
  );
}
