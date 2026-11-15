"use client";

import { useMemo, useRef, useState } from "react";
import { Check, SlidersHorizontal } from "lucide-react";
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { categories, colourFilters, priceFilters, priceOf, products, sizeFilters, type Category, type Size } from "./data";
import { Photo } from "./photo";
import { ProductCard, ProductCardSkeleton } from "./product-card";

type Sort = "featured" | "new" | "best" | "price-asc" | "price-desc";
const sorts: { value: Sort; label: string }[] = [
  { value: "featured", label: "Nổi bật" },
  { value: "new", label: "Mới về" },
  { value: "best", label: "Bán chạy" },
  { value: "price-asc", label: "Giá thấp đến cao" },
  { value: "price-desc", label: "Giá cao đến thấp" },
];
const tabs: { value: Category | "all"; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "nu", label: "Nữ" },
  { value: "nam", label: "Nam" },
  { value: "phu-kien", label: "Phụ kiện" },
];

type Filters = { sizes: Size[]; colours: string[]; price: string | null };
const empty: Filters = { sizes: [], colours: [], price: null };

const toggle = <T,>(list: T[], v: T) => (list.includes(v) ? list.filter((x) => x !== v) : [...list, v]);

function FilterPanel({ f, set }: { f: Filters; set: (f: Filters) => void }) {
  return (
    <div className="flex flex-col gap-8">
      <fieldset>
        <legend className="text-[14px] font-semibold text-ink">Kích cỡ</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {sizeFilters.map((s) => {
            const on = f.sizes.includes(s);
            return (
              <button
                key={s}
                aria-pressed={on}
                onClick={() => set({ ...f, sizes: toggle(f.sizes, s) })}
                className={cn(
                  "h-10 min-w-12 rounded-[6px] border px-2 text-[14px] font-semibold transition-colors duration-150",
                  on ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink hover:border-ink"
                )}
              >
                {s}
              </button>
            );
          })}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-[14px] font-semibold text-ink">Màu sắc</legend>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {colourFilters.map((c) => {
            const on = f.colours.includes(c.name);
            return (
              <button
                key={c.name}
                aria-pressed={on}
                onClick={() => set({ ...f, colours: toggle(f.colours, c.name) })}
                className={cn(
                  "flex h-10 items-center gap-2 rounded-[6px] px-2 text-left text-[14px] transition-colors duration-150",
                  on ? "bg-brand-soft font-semibold text-ink" : "text-ink-muted hover:bg-chip"
                )}
              >
                <span className="grid size-5 shrink-0 place-items-center rounded-full border border-line" style={{ background: c.hex }}>
                  {on && <Check className="size-3 stroke-[2] text-ink mix-blend-difference" aria-hidden />}
                </span>
                {c.name}
              </button>
            );
          })}
        </div>
      </fieldset>
      <fieldset>
        <legend className="text-[14px] font-semibold text-ink">Khoảng giá</legend>
        <div className="mt-4 flex flex-col gap-2">
          {priceFilters.map((p) => (
            <label key={p.id} className="flex cursor-pointer items-center gap-2 text-[14px] text-ink">
              <input
                type="radio"
                name="price"
                checked={f.price === p.id}
                onChange={() => set({ ...f, price: p.id })}
                className="size-4 accent-[var(--brand)]"
              />
              {p.label}
            </label>
          ))}
          {f.price && (
            <button onClick={() => set({ ...f, price: null })} className="self-start text-[14px] text-ink-muted underline underline-offset-4">
              Bỏ chọn giá
            </button>
          )}
        </div>
      </fieldset>
    </div>
  );
}

export function Shop() {
  const [cat, setCat] = useState<Category | "all">("all");
  const [f, setF] = useState<Filters>(empty);
  const [sort, setSort] = useState<Sort>("featured");
  const [loading, setLoading] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  // Brief skeleton while the (would-be API) list refreshes.
  const refresh = () => {
    setLoading(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setLoading(false), 280);
  };
  const setFilters = (next: Filters) => {
    setF(next);
    refresh();
  };
  const pickCat = (c: Category | "all") => {
    setCat(c);
    refresh();
  };

  const list = useMemo(() => {
    const range = priceFilters.find((p) => p.id === f.price);
    const out = products.filter(
      (p) =>
        (cat === "all" || p.category === cat) &&
        (f.sizes.length === 0 || p.sizes.some((s) => f.sizes.includes(s) || s === "Free")) &&
        (f.colours.length === 0 || p.colours.some((c) => f.colours.includes(c.name))) &&
        (!range || (priceOf(p) >= range.min && priceOf(p) <= range.max))
    );
    const by: Record<Sort, (a: (typeof out)[number], b: (typeof out)[number]) => number> = {
      featured: () => 0,
      new: (a, b) => Number(!!b.isNew) - Number(!!a.isNew),
      best: (a, b) => b.sold - a.sold,
      "price-asc": (a, b) => priceOf(a) - priceOf(b),
      "price-desc": (a, b) => priceOf(b) - priceOf(a),
    };
    return [...out].sort(by[sort]);
  }, [cat, f, sort]);

  const activeCount = f.sizes.length + f.colours.length + (f.price ? 1 : 0);

  return (
    <>
      {/* Category entry points */}
      <section className="mx-auto max-w-[1280px] px-4 pb-24 md:px-6" aria-label="Danh mục">
        <div className="grid grid-cols-3 gap-2 sm:gap-6">
          {categories.map((c) => (
            <a key={c.id} href="#cua-hang" onClick={() => pickCat(c.id)} className="group block">
              <span className="relative block aspect-[3/4] overflow-hidden rounded-[12px] bg-chip">
                <Photo src={c.image} alt="" fill sizes="33vw" className="object-cover" />
              </span>
              <span className="mt-4 flex flex-wrap items-baseline justify-between gap-x-4">
                <span className="display text-[24px] font-extrabold text-ink underline-offset-8 group-hover:underline sm:text-[32px]">{c.label}</span>
                <span className="hidden text-[14px] text-ink-muted sm:inline">{c.note}</span>
              </span>
            </a>
          ))}
        </div>
      </section>

      <section id="cua-hang" className="mx-auto max-w-[1280px] scroll-mt-32 px-4 pb-24 md:px-6 md:pb-32">
        <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-6">
          <div>
            <h2 className="display text-[32px] font-extrabold text-ink sm:text-[48px]">Cửa hàng</h2>
            <p className="mt-2 text-ink-muted">{list.length} sản phẩm</p>
          </div>
          <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Lọc theo danh mục">
            {tabs.map((t) => (
              <button
                key={t.value}
                role="tab"
                aria-selected={cat === t.value}
                onClick={() => pickCat(t.value)}
                className={cn(
                  "h-10 rounded-full border px-4 text-[14px] font-semibold transition-colors duration-150",
                  cat === t.value ? "border-brand bg-brand text-primary-foreground" : "border-line bg-surface text-ink-muted hover:text-ink"
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[256px_1fr] lg:gap-12">
          <aside className="hidden lg:block" aria-label="Bộ lọc">
            <div className="sticky top-40">
              <div className="mb-6 flex items-center justify-between">
                <p className="font-semibold text-ink">Bộ lọc</p>
                {activeCount > 0 && (
                  <button onClick={() => setFilters(empty)} className="text-[14px] text-ink-muted underline underline-offset-4 hover:text-ink">
                    Xoá tất cả
                  </button>
                )}
              </div>
              <FilterPanel f={f} set={setFilters} />
            </div>
          </aside>

          <div>
            <div className="mb-6 flex items-center justify-between gap-4">
              <Sheet>
                <SheetTrigger className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-4 text-[14px] font-semibold text-ink lg:hidden">
                  <SlidersHorizontal className="size-4 stroke-[1.5]" aria-hidden />
                  Bộ lọc{activeCount > 0 && ` (${activeCount})`}
                </SheetTrigger>
                <SheetContent side="bottom" className="max-h-[85dvh] gap-0 rounded-t-[12px] bg-paper" data-lenis-prevent>
                  <SheetHeader className="border-b border-line px-4 py-4">
                    <SheetTitle className="text-[20px] font-semibold">Bộ lọc</SheetTitle>
                  </SheetHeader>
                  <div className="overflow-y-auto p-4">
                    <FilterPanel f={f} set={setFilters} />
                  </div>
                  <SheetFooter className="flex-row border-t border-line">
                    <button onClick={() => setFilters(empty)} className="h-12 flex-1 rounded-full border border-line text-[14px] font-semibold text-ink">
                      Xoá tất cả
                    </button>
                    <p className="grid h-12 flex-1 place-items-center rounded-full bg-brand text-[14px] font-semibold text-primary-foreground">
                      {list.length} kết quả
                    </p>
                  </SheetFooter>
                </SheetContent>
              </Sheet>
              <label className="ml-auto flex items-center gap-2 text-[14px] text-ink-muted">
                Sắp xếp
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as Sort)}
                  className="h-10 rounded-[6px] border border-line bg-surface px-2 text-[14px] font-semibold text-ink"
                >
                  {sorts.map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {loading ? (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            ) : list.length === 0 ? (
              <div className="flex flex-col items-start gap-4 border-y border-line py-16">
                <p className="display text-[32px] font-extrabold text-ink">Chưa có sản phẩm khớp bộ lọc</p>
                <p className="max-w-[480px] text-ink-muted">Thử bỏ bớt màu hoặc kích cỡ. Hàng mới về mỗi thứ Sáu.</p>
                <button
                  onClick={() => {
                    setFilters(empty);
                    setCat("all");
                  }}
                  className="h-12 rounded-full bg-brand px-8 text-[14px] font-semibold text-primary-foreground"
                >
                  Xoá bộ lọc
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 md:gap-x-6">
                {list.map((p) => (
                  <ProductCard key={p.id} p={p} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
