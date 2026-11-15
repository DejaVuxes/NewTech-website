"use client";

import { useState } from "react";
import { Menu, Moon, Phone, Sun, X } from "lucide-react";
import { brand } from "./brand";
import { BrandLogo } from "./brand-logo";

const links = [
  { href: "#cau-hinh", label: "Cấu hình xe" },
  { href: "#dong-xe", label: "Dòng xe" },
  { href: "#thong-so", label: "Thông số" },
  { href: "#tra-gop", label: "Trả góp" },
  { href: "#lai-thu", label: "Lái thử" },
];

function toggleTheme() {
  const el = document.documentElement;
  const next = el.dataset.theme === "dark" ? "light" : "dark";
  el.dataset.theme = next;
  try {
    localStorage.setItem("nt-theme", next);
  } catch {}
}

export function XeHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-10 z-50 border-b border-line bg-paper">
      <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-6 px-4 md:px-6">
        <a href="#cau-hinh" aria-label={`${brand.name}, về đầu trang`}>
          <BrandLogo />
        </a>
        <nav aria-label="Điều hướng chính" className="ml-8 hidden items-center gap-6 lg:flex">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-[14px] font-semibold text-ink-muted transition-colors duration-150 hover:text-ink">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <a href={`tel:${brand.hotline.replace(/\s/g, "")}`} className="hidden items-center gap-2 px-2 text-[14px] font-semibold text-ink md:inline-flex">
            <Phone className="size-4 stroke-[1.5]" aria-hidden />
            {brand.hotline}
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Đổi giao diện sáng/tối"
            className="grid size-10 place-items-center rounded-full border border-line text-ink transition-colors duration-150 hover:bg-chip"
          >
            <Sun className="size-4 stroke-[1.5] dark:hidden" aria-hidden />
            <Moon className="hidden size-4 stroke-[1.5] dark:block" aria-hidden />
          </button>
          <button
            type="button"
            onClick={() => setOpen((o) => !o)}
            aria-expanded={open}
            aria-controls="xe-mobile-nav"
            aria-label={open ? "Đóng menu" : "Mở menu"}
            className="grid size-10 place-items-center rounded-full border border-line text-ink lg:hidden"
          >
            {open ? <X className="size-4 stroke-[1.5]" aria-hidden /> : <Menu className="size-4 stroke-[1.5]" aria-hidden />}
          </button>
        </div>
      </div>
      {open && (
        <nav id="xe-mobile-nav" aria-label="Menu di động" className="border-t border-line px-4 pb-4 lg:hidden">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="display block border-b border-line py-4 text-[24px] font-extrabold text-ink"
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
