"use client";

import { Plus } from "lucide-react";
import { formatVnd, type Product } from "./data";
import { Photo } from "./photo";
import { useStore } from "./store";

export function ProductCard({ p }: { p: Product }) {
  const { openQuickView } = useStore();
  const off = p.salePrice ? Math.round((1 - p.salePrice / p.price) * 100) : 0;

  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-chip">
        <Photo src={p.image} alt={p.name} fill sizes="(min-width: 1024px) 22vw, 50vw" className="object-cover" />
        {/* hover: second photo, opacity swap only */}
        <Photo
          src={p.altImage}
          alt=""
          fill
          sizes="(min-width: 1024px) 22vw, 50vw"
          className="object-cover opacity-0 transition-opacity duration-200 ease-out group-hover:opacity-100"
        />
        <div className="absolute left-2 top-2 flex gap-2">
          {p.isNew && <span className="rounded-full bg-surface px-2 text-[12px] font-semibold leading-6 text-ink">Mới</span>}
          {off > 0 && <span className="rounded-full bg-accent px-2 text-[12px] font-semibold leading-6 text-accent-ink">−{off}%</span>}
        </div>
        <button
          onClick={() => openQuickView(p.id)}
          className="absolute bottom-2 right-2 z-10 flex h-10 items-center gap-2 rounded-full bg-surface px-4 text-[14px] font-semibold text-ink transition-[opacity,transform] duration-200 ease-out hover:bg-brand hover:text-primary-foreground focus-visible:opacity-100 lg:translate-y-2 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100"
          aria-label={`Thêm nhanh ${p.name}`}
        >
          <Plus className="size-4 stroke-[1.5]" aria-hidden />
          <span className="hidden sm:inline">Thêm nhanh</span>
        </button>
      </div>

      <button onClick={() => openQuickView(p.id)} className="mt-4 text-left after:absolute after:inset-0 after:content-['']">
        <h3 className="text-[16px] font-semibold leading-snug text-ink">{p.name}</h3>
      </button>
      <p className="mt-1 flex flex-wrap items-baseline gap-x-2 text-[16px]">
        <span className={`display text-[20px] font-extrabold ${p.salePrice ? "text-accent" : "text-ink"}`}>{formatVnd(p.salePrice ?? p.price)}</span>
        {p.salePrice && <s className="text-[14px] text-ink-muted">{formatVnd(p.price)}</s>}
      </p>
      <ul className="mt-2 flex gap-2" aria-label="Màu có sẵn">
        {p.colours.map((c) => (
          <li key={c.name} title={c.name} className="size-4 rounded-full border border-line" style={{ background: c.hex }}>
            <span className="sr-only">{c.name}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="flex flex-col" aria-hidden>
      <div className="aspect-[4/5] animate-pulse rounded-[12px] bg-chip" />
      <div className="mt-4 h-4 w-3/4 animate-pulse rounded-[6px] bg-chip" />
      <div className="mt-2 h-4 w-1/3 animate-pulse rounded-[6px] bg-chip" />
      <div className="mt-2 flex gap-2">
        <span className="size-4 rounded-full bg-chip" />
        <span className="size-4 rounded-full bg-chip" />
      </div>
    </div>
  );
}
