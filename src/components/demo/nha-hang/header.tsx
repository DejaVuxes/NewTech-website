"use client";

import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { brand } from "./brand";
import { Logo } from "./logo";

const links = [
  { label: "Thực đơn", href: "#thuc-don" },
  { label: "Câu chuyện", href: "#cau-chuyen" },
  { label: "Không gian", href: "#khong-gian" },
  { label: "Liên hệ", href: "#lien-he" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-10 z-50 border-b border-line bg-paper/95">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-2 sm:gap-6 px-4 md:h-20 md:px-6">
        <a href="#top" aria-label={`${brand.name}, về đầu trang`}>
          <Logo />
        </a>
        <nav aria-label="Điều hướng chính" className="ml-auto hidden items-center gap-1 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="rounded-md px-4 py-2 text-[16px] text-ink-muted transition-colors duration-150 hover:bg-brand-soft hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <a href={brand.phoneHref} className="ml-auto hidden items-center gap-2 text-[16px] font-semibold text-ink md:inline-flex lg:ml-0">
          <Phone className="size-4 stroke-[1.5] text-brand" aria-hidden />
          {brand.phone}
        </a>
        <a
          href="#dat-ban"
          className="ml-auto inline-flex h-10 items-center whitespace-nowrap rounded-full bg-brand px-4 sm:px-6 text-[14px] font-semibold text-primary-foreground transition-[filter] duration-150 hover:brightness-110 md:ml-0"
        >
          Đặt bàn
        </a>
        <button
          type="button"
          className="grid size-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          aria-expanded={open}
          aria-controls="nm-mobile-nav"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5 stroke-[1.5]" /> : <Menu className="size-5 stroke-[1.5]" />}
        </button>
      </div>
      {open && (
        <nav id="nm-mobile-nav" aria-label="Menu di động" className="border-t border-line bg-paper px-4 pb-6 lg:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="display block border-b border-line py-4 text-[24px] font-extrabold text-ink">
              {l.label}
            </a>
          ))}
          <a href={brand.phoneHref} className="mt-6 inline-flex items-center gap-2 font-semibold text-ink">
            <Phone className="size-4 stroke-[1.5] text-brand" aria-hidden />
            {brand.phone}
          </a>
        </nav>
      )}
    </header>
  );
}
