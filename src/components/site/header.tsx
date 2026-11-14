"use client";

import { useRef, useState } from "react";
import { Menu, MessageCircle, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { nav } from "@/lib/data";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";

export function Logo({ onBand = false }: { onBand?: boolean }) {
  return (
    <a href="#" className="flex items-center gap-2" aria-label="NewTech — trang chủ">
      {/* mark: a leaf-to-bark ring around a pair of code brackets */}
      <svg viewBox="0 0 32 32" className="size-8" aria-hidden>
        <defs>
          <linearGradient id="nt-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#2e7d32" />
            <stop offset=".5" stopColor="#66bb6a" />
            <stop offset="1" stopColor="#8d6e63" />
          </linearGradient>
        </defs>
        <circle cx="16" cy="16" r="13" fill="none" stroke="url(#nt-ring)" strokeWidth="2.5" />
        <path
          d="M13.5 11.5 9 16l4.5 4.5M18.5 11.5 23 16l-4.5 4.5"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={onBand ? "stroke-band-ink" : "stroke-ink"}
        />
      </svg>
      <span className={cn("display text-[20px] font-semibold", onBand ? "text-band-ink" : "text-ink")}>NewTech</span>
    </a>
  );
}

function ThemeToggle() {
  const toggle = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("nt-theme", next);
    } catch {}
  };
  return (
    <Button variant="round" onClick={toggle} aria-label="Đổi giao diện sáng / tối">
      <Sun className="hidden size-4 dark:block" />
      <Moon className="size-4 dark:hidden" />
    </Button>
  );
}

export function Header() {
  const ref = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useGSAP(() => {
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: (self) => setScrolled(self.scroll() > 8) });
    setScrolled(st.scroll() > 8); // page restored mid-scroll
  });

  return (
    <header
      ref={ref}
      className={cn(
        "fixed inset-x-0 top-0 z-40 px-4 pt-4 transition-[padding] duration-200 md:px-6",
        scrolled ? "md:pt-2" : "md:pt-4"
      )}
    >
      {/* floating white bar, as in the reference */}
      <div
        className={cn(
          "mx-auto flex h-16 max-w-[1040px] items-center gap-2 rounded-lg border bg-surface pl-4 pr-2 transition-colors duration-200",
          scrolled ? "border-line" : "border-transparent"
        )}
      >
        <Logo />

        <nav aria-label="Chính" className="ml-auto hidden items-center gap-6 lg:flex">
          {nav.map((n) => (
            <a key={n.label} href={n.href} className="text-[14px] font-medium text-ink transition-colors hover:text-brand">
              {n.label}
            </a>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-8">
          <ThemeToggle />
          <Button
            variant="round"
            className="hidden text-[12px] font-medium sm:inline-flex"
            aria-label="Switch to English"
            render={<a href="#" />}
            nativeButton={false}
          >
            EN
          </Button>
          <Button variant="accent" className="hidden sm:inline-flex" render={<a href="#hoi-dap" />} nativeButton={false}>
            <MessageCircle />
            Liên hệ ngay
          </Button>

          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" className="h-10 gap-2 rounded-full pl-4 pr-2 lg:hidden" aria-label="Mở menu" />}
            >
              <span className="hidden text-[14px] sm:inline">Menu</span>
              <span className="grid size-8 place-items-center">
                <Menu className="size-5" />
              </span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full gap-0 bg-paper p-6 sm:max-w-sm">
              <SheetTitle className="sr-only">Menu</SheetTitle>
              <Logo />
              <nav aria-label="Menu di động" className="mt-12 flex flex-col">
                {nav.map((n) => (
                  <SheetClose
                    key={n.label}
                    render={<a href={n.href} />}
                    className="display border-b border-line py-4 text-[32px] font-medium text-ink"
                  >
                    {n.label}
                  </SheetClose>
                ))}
              </nav>
              <Button variant="accent" className="mt-auto w-full" render={<a href="#hoi-dap" />} nativeButton={false}>
                <MessageCircle />
                Liên hệ ngay
              </Button>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
