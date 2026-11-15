import { cn } from "@/lib/utils";

/**
 * Logo chính của NewTech (chữ N trong khung vuông bo góc): dùng cho trang NewTech và cả 3 template:
 * Newtech Car, Newtech Fashion, Newtech Kitchen.
 * Người mua thay logo của mình ở đây là đổi cho cả template.
 * Màu theo `currentColor`, nên chỉnh màu bằng class text-* ở chỗ dùng.
 */
export function NewtechMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-6 shrink-0 sm:size-8", className)} aria-hidden>
      <rect x="1" y="1" width="30" height="30" rx="6" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 23V9l14 14V9" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
}

/** Logo đầy đủ: mark + tên thương hiệu. */
export function NewtechLogo({ name, className }: { name: string; className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 whitespace-nowrap text-ink", className)}>
      <NewtechMark />
      <span className="display text-[16px] font-extrabold sm:text-[20px]">{name}</span>
    </span>
  );
}
