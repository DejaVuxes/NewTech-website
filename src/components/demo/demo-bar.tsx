import Link from "next/link";
import { ArrowLeft, ShoppingBag } from "lucide-react";

/** Thin NewTech preview bar shown above every template demo (like a marketplace live-preview frame). */
export function DemoBar() {
  return (
    <div className="demo-bar sticky top-0 z-[60] flex h-10 items-center gap-4 border-b border-white/10 bg-[#1c2a1f] px-4 text-[14px] text-[#f0ebe5]">
      <Link href="/#kho-template" className="inline-flex items-center gap-2 rounded-md px-2 py-1 hover:bg-white/10">
        <ArrowLeft className="size-4 stroke-[1.5]" aria-hidden />
        NewTech
      </Link>
      <span className="hidden truncate text-[#d7cfc4] sm:inline">Bản demo template. Logo và tên thương hiệu là nội dung mẫu, thay bằng của bạn.</span>
      <Link
        href="/#kho-template"
        className="ml-auto inline-flex items-center gap-2 rounded-full bg-[#4caf50] px-4 py-1 font-semibold text-[#10200f] hover:brightness-110"
      >
        <ShoppingBag className="size-4 stroke-[1.5]" aria-hidden />
        Mua template
      </Link>
    </div>
  );
}
