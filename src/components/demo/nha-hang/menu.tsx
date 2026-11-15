"use client";

import { useState } from "react";
import Image from "next/image";
import { Flame, Leaf } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { formatVnd, img, menu, type Dish } from "./data";
import { PorcelainRim } from "./logo";

function DishRow({ d }: { d: Dish }) {
  return (
    <li className="flex gap-4 border-b border-line py-6">
      {d.photo ? (
        <div className="relative size-16 shrink-0 overflow-hidden rounded-full sm:size-24">
          <Image src={img(d.photo, 300)} alt="" fill sizes="96px" className="object-cover" />
        </div>
      ) : (
        /* món chưa có ảnh: đĩa men lam trống (thay bằng ảnh món của bạn) */
        <div aria-hidden className="relative size-16 shrink-0 rounded-full bg-surface sm:size-24">
          <PorcelainRim className="absolute inset-0 size-full opacity-40" />
        </div>
      )}
      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className="font-semibold text-ink sm:text-[20px]">{d.name}</h3>
          <span aria-hidden className="mx-2 hidden flex-1 border-b border-dotted border-ink-muted/40 sm:block" />
          <span className="display ml-auto shrink-0 text-[20px] font-extrabold text-ink sm:ml-0">{formatVnd(d.price)}</span>
        </div>
        <p className="mt-1 text-[14px] text-ink-muted sm:text-[16px]">{d.desc}</p>
        {(d.veg || d.spicy || d.signature) && (
          <ul className="mt-2 flex flex-wrap gap-2" aria-label="Đặc điểm món">
            {d.signature && <li className="rounded-full bg-accent px-2 text-[12px] font-semibold leading-6 text-accent-ink">Món đặc trưng</li>}
            {d.veg && (
              <li className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 text-[12px] font-semibold leading-6 text-ink">
                <Leaf className="size-3 stroke-[1.5] text-success" aria-hidden />
                Chay
              </li>
            )}
            {d.spicy && (
              <li className="inline-flex items-center gap-1 rounded-full bg-brand-soft px-2 text-[12px] font-semibold leading-6 text-ink">
                <Flame className="size-3 stroke-[1.5] text-danger" aria-hidden />
                Cay
              </li>
            )}
          </ul>
        )}
      </div>
    </li>
  );
}

export function Menu() {
  const [vegOnly, setVegOnly] = useState(false);
  const [tab, setTab] = useState(menu[0].id);

  return (
    <section id="thuc-don" aria-labelledby="thuc-don-title" className="scroll-mt-32 border-t border-line">
      <div className="mx-auto max-w-[1280px] px-4 py-24 md:px-6 md:py-32">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 id="thuc-don-title" className="display text-[32px] font-extrabold text-ink sm:text-[48px] lg:col-span-7">
            Thực đơn
          </h2>
          <p className="self-end text-ink-muted lg:col-span-4 lg:col-start-9">
            Giá đã gồm VAT. Thực đơn đổi theo mùa, món hết trong ngày sẽ được nhân viên báo trước khi gọi.
          </p>
        </div>

        <Tabs value={tab} onValueChange={(v) => setTab(v as string)} className="mt-12 gap-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <TabsList className="h-auto group-data-horizontal/tabs:h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
              {menu.map((c) => (
                <TabsTrigger
                  key={c.id}
                  value={c.id}
                  className="h-10 flex-none rounded-full border border-line bg-surface px-4 text-[14px] font-semibold text-ink-muted transition-colors duration-150 data-active:border-brand data-active:bg-brand data-active:text-primary-foreground dark:data-active:border-brand dark:data-active:bg-brand dark:data-active:text-primary-foreground"
                >
                  {c.label}
                </TabsTrigger>
              ))}
            </TabsList>
            <label className="inline-flex cursor-pointer items-center gap-2 text-[14px] font-semibold text-ink">
              <span
                className={cn(
                  "relative inline-flex h-6 w-10 items-center rounded-full border border-line transition-colors duration-150",
                  vegOnly ? "bg-brand" : "bg-surface"
                )}
              >
                <input type="checkbox" className="peer sr-only" checked={vegOnly} onChange={(e) => setVegOnly(e.target.checked)} />
                <span
                  aria-hidden
                  className={cn(
                    "absolute left-1 size-4 rounded-full transition-transform duration-150 ease-out",
                    vegOnly ? "translate-x-4 bg-primary-foreground" : "bg-ink-muted"
                  )}
                />
                <span aria-hidden className="pointer-events-none absolute -inset-1 rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-focus" />
              </span>
              Chỉ món chay
            </label>
          </div>

          {menu.map((c) => {
            const list = vegOnly ? c.dishes.filter((d) => d.veg) : c.dishes;
            return (
              <TabsContent key={c.id} value={c.id} className="text-[16px]">
                {list.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-line px-6 py-12 text-center">
                    <Leaf className="mx-auto size-6 stroke-[1.5] text-brand" aria-hidden />
                    <p className="mt-4 font-semibold text-ink">Mục {c.label.toLowerCase()} chưa có món chay.</p>
                    <p className="mt-1 text-ink-muted">Bếp có thể nấu chay theo yêu cầu, ghi chú khi đặt bàn. Hoặc xem món chay ở mục khác.</p>
                    <button
                      type="button"
                      onClick={() => setVegOnly(false)}
                      className="mt-6 inline-flex h-10 items-center rounded-full border border-line px-6 text-[14px] font-semibold text-ink transition-colors duration-150 hover:border-brand hover:text-brand"
                    >
                      Hiện tất cả món
                    </button>
                  </div>
                ) : (
                  <ul className="grid gap-x-12 md:grid-cols-2">
                    {list.map((d) => (
                      <DishRow key={d.name} d={d} />
                    ))}
                  </ul>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
      </div>
    </section>
  );
}
