"use client";

import { Menu, Search, ShoppingBag, Truck, User } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { brand } from "./brand";
import { formatVnd } from "./data";
import { Logo } from "./logo";
import { useStore } from "./store";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { label: "Nữ", href: "#cua-hang" },
  { label: "Nam", href: "#cua-hang" },
  { label: "Phụ kiện", href: "#cua-hang" },
  { label: "Lookbook", href: "#lookbook" },
  { label: "Cửa hàng", href: "#lien-he" },
];

export function Header() {
  const { count, setCartOpen } = useStore();

  return (
    <>
      <p className="flex items-center justify-center gap-2 bg-brand px-4 py-2 text-center text-[14px] text-primary-foreground">
        <Truck className="size-4 shrink-0 stroke-[1.5]" aria-hidden />
        Miễn phí giao hàng cho đơn từ {formatVnd(brand.freeShipFrom)}. Đổi size trong 30 ngày.
      </p>
      <header className="sticky top-10 z-40 border-b border-line bg-paper">
        <div className="mx-auto flex h-16 max-w-[1280px] items-center gap-4 px-4 md:gap-6 md:px-6">
          <Sheet>
            <SheetTrigger
              className="-ml-2 grid size-10 place-items-center rounded-md hover:bg-chip lg:hidden"
              aria-label="Mở menu"
            >
              <Menu className="size-5 stroke-[1.5]" />
            </SheetTrigger>
            <SheetContent side="left" className="w-[296px] gap-0 bg-paper p-6" data-lenis-prevent>
              <SheetTitle className="sr-only">Danh mục</SheetTitle>
              <Logo />
              <nav className="mt-8 flex flex-col">
                {links.map((l) => (
                  <a key={l.label} href={l.href} className="display border-b border-line py-4 text-[24px] font-extrabold text-ink">
                    {l.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>

          <a href="#" aria-label={`${brand.name} — trang chủ`} className="text-ink">
            <Logo />
          </a>

          <nav className="ml-8 hidden items-center gap-8 lg:flex" aria-label="Danh mục chính">
            {links.map((l) => (
              <a key={l.label} href={l.href} className="text-[14px] font-semibold text-ink transition-colors duration-150 hover:text-brand">
                {l.label}
              </a>
            ))}
          </nav>

          <div className="ml-auto flex items-center sm:gap-2">
            <label className="hidden h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-ink-muted focus-within:border-brand md:flex">
              <Search className="size-4 stroke-[1.5]" aria-hidden />
              <span className="sr-only">Tìm sản phẩm</span>
              <input
                type="search"
                placeholder="Tìm áo len, túi da…"
                className="w-40 bg-transparent text-[14px] text-ink outline-none placeholder:text-ink-muted"
              />
            </label>
            <button className="grid size-10 place-items-center rounded-full hover:bg-chip md:hidden" aria-label="Tìm kiếm">
              <Search className="size-5 stroke-[1.5]" />
            </button>
            <ThemeToggle />
            <button className="hidden size-10 place-items-center rounded-full hover:bg-chip sm:grid" aria-label="Tài khoản">
              <User className="size-5 stroke-[1.5]" />
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="relative grid size-10 place-items-center rounded-full hover:bg-chip"
              aria-label={`Giỏ hàng, ${count} sản phẩm`}
            >
              <ShoppingBag className="size-5 stroke-[1.5]" />
              {count > 0 && (
                <span className="absolute -right-0.5 -top-0.5 grid min-w-5 place-items-center rounded-full bg-accent px-1 text-[12px] font-semibold leading-5 text-accent-ink">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
