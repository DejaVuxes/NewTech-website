"use client";

import { useState } from "react";
import { Check, Minus, Plus, RotateCcw, ShoppingBag, Trash2, Truck } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { brand } from "./brand";
import { formatVnd, priceOf, sizeGuide, type Product, type Size } from "./data";
import { Photo } from "./photo";
import { useStore } from "./store";

function QuickViewBody({ p, onAdded }: { p: Product; onAdded: () => void }) {
  const { add } = useStore();
  const [colour, setColour] = useState(p.colours[0].name);
  const [size, setSize] = useState<Size | null>(p.sizes.length === 1 ? p.sizes[0] : null);
  const [error, setError] = useState(false);
  const [added, setAdded] = useState(false);

  const submit = () => {
    if (!size) return setError(true);
    add(p, size, colour);
    setAdded(true);
    setTimeout(onAdded, 600);
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-2 px-6 pt-16">
        {[p.image, p.altImage].map((src, i) => (
          <div key={src} className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-chip">
            <Photo src={src} alt={i === 0 ? p.name : ""} fill sizes="240px" className="object-cover" />
          </div>
        ))}
      </div>
      <SheetHeader className="px-6 pb-0 pt-6">
        <SheetTitle className="display text-[32px] font-extrabold leading-[1.1] text-ink">{p.name}</SheetTitle>
        <SheetDescription className="mt-2 text-[14px] text-ink-muted">{p.material}</SheetDescription>
        <p className="mt-4 flex items-baseline gap-2">
          <span className={cn("display text-[24px] font-extrabold", p.salePrice ? "text-accent" : "text-ink")}>{formatVnd(priceOf(p))}</span>
          {p.salePrice && <s className="text-ink-muted">{formatVnd(p.price)}</s>}
        </p>
      </SheetHeader>

      <div className="flex flex-col gap-6 px-6 pt-6">
        <fieldset>
          <legend className="text-[14px] text-ink-muted">
            Màu: <span className="font-semibold text-ink">{colour}</span>
          </legend>
          <div className="mt-2 flex gap-2">
            {p.colours.map((c) => (
              <button
                key={c.name}
                onClick={() => setColour(c.name)}
                aria-pressed={colour === c.name}
                aria-label={c.name}
                className={cn(
                  "size-10 rounded-full border-2 p-1 transition-colors duration-150",
                  colour === c.name ? "border-ink" : "border-transparent hover:border-line"
                )}
              >
                <span className="block size-full rounded-full border border-line" style={{ background: c.hex }} />
              </button>
            ))}
          </div>
        </fieldset>

        {p.sizes[0] !== "Free" && (
          <fieldset>
            <legend className="text-[14px] text-ink-muted">Kích cỡ</legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {(["XS", "S", "M", "L", "XL"] as Size[]).map((s) => {
                const ok = p.sizes.includes(s);
                return (
                  <button
                    key={s}
                    disabled={!ok}
                    onClick={() => {
                      setSize(s);
                      setError(false);
                    }}
                    aria-pressed={size === s}
                    className={cn(
                      "h-12 min-w-14 rounded-[6px] border text-[14px] font-semibold transition-colors duration-150",
                      size === s ? "border-ink bg-ink text-paper" : "border-line bg-surface text-ink hover:border-ink",
                      !ok && "cursor-not-allowed text-ink-muted line-through opacity-50 hover:border-line"
                    )}
                  >
                    {s}
                  </button>
                );
              })}
            </div>
            {error && (
              <p role="alert" className="mt-2 text-[14px] font-semibold text-danger">
                Chọn kích cỡ trước khi thêm vào giỏ.
              </p>
            )}
          </fieldset>
        )}

        <Accordion className="border-y border-line">
          <AccordionItem value="size" className="border-line">
            <AccordionTrigger className="py-4 text-[14px] font-semibold text-ink">Bảng kích cỡ</AccordionTrigger>
            <AccordionContent>
              <table className="w-full text-left text-[14px]">
                <thead className="text-ink-muted">
                  <tr>
                    <th className="py-2 font-normal">Size</th>
                    <th className="py-2 font-normal">Ngực (cm)</th>
                    <th className="py-2 font-normal">Eo (cm)</th>
                    <th className="py-2 font-normal">Chiều cao</th>
                  </tr>
                </thead>
                <tbody className="text-ink">
                  {sizeGuide.map((r) => (
                    <tr key={r.size} className="border-t border-line">
                      <td className="py-2 font-semibold">{r.size}</td>
                      <td className="py-2">{r.chest}</td>
                      <td className="py-2">{r.waist}</td>
                      <td className="py-2">{r.height}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="ship" className="border-line">
            <AccordionTrigger className="py-4 text-[14px] font-semibold text-ink">Giao hàng và đổi trả</AccordionTrigger>
            <AccordionContent className="text-ink-muted">
              <p>Nội thành Hà Nội và TP. HCM nhận trong 24 giờ, tỉnh khác 2–4 ngày. Đổi size miễn phí trong 30 ngày, giữ nguyên tem mác.</p>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <SheetFooter className="border-t border-line bg-paper p-6">
        <button
          onClick={submit}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-[16px] font-semibold text-accent-ink transition-[filter] duration-150 hover:brightness-110"
        >
          {added ? <Check className="size-5 stroke-[1.5]" aria-hidden /> : <ShoppingBag className="size-5 stroke-[1.5]" aria-hidden />}
          {added ? "Đã thêm vào giỏ" : "Thêm vào giỏ"}
        </button>
      </SheetFooter>
    </>
  );
}

export function QuickView() {
  const { quickView, closeQuickView, setCartOpen } = useStore();
  return (
    <Sheet open={!!quickView} onOpenChange={(o) => !o && closeQuickView()}>
      <SheetContent className="w-full gap-0 overflow-y-auto bg-paper sm:max-w-[480px]" data-lenis-prevent>
        {quickView && (
          <QuickViewBody
            key={quickView.id}
            p={quickView}
            onAdded={() => {
              closeQuickView();
              setCartOpen(true);
            }}
          />
        )}
      </SheetContent>
    </Sheet>
  );
}

const payments = ["VietQR", "MoMo", "ZaloPay", "Thẻ Visa/Master", "COD"];

export function CartDrawer() {
  const { lines, subtotal, count, cartOpen, setCartOpen, setQty, remove } = useStore();
  const left = Math.max(0, brand.freeShipFrom - subtotal);
  const pct = Math.min(100, (subtotal / brand.freeShipFrom) * 100);
  const shipping = subtotal === 0 || left === 0 ? 0 : 30000;

  return (
    <Sheet open={cartOpen} onOpenChange={setCartOpen}>
      <SheetContent className="w-full gap-0 bg-paper sm:max-w-[440px]" data-lenis-prevent>
        <SheetHeader className="border-b border-line px-6 py-6">
          <SheetTitle className="display text-[24px] font-extrabold text-ink">Giỏ hàng ({count})</SheetTitle>
          <SheetDescription className="sr-only">Sản phẩm bạn đã chọn</SheetDescription>
        </SheetHeader>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-start justify-center gap-4 px-6">
            <ShoppingBag className="size-6 stroke-[1.5] text-ink-muted" aria-hidden />
            <p className="display text-[24px] font-extrabold text-ink">Giỏ hàng đang trống</p>
            <p className="text-ink-muted">Bắt đầu với vài món len mới về cho mùa lạnh.</p>
            <a
              href="#cua-hang"
              onClick={() => setCartOpen(false)}
              className="mt-2 inline-flex h-12 items-center rounded-full bg-brand px-8 text-[14px] font-semibold text-primary-foreground"
            >
              Xem cửa hàng
            </a>
          </div>
        ) : (
          <>
            <div className="border-b border-line px-6 py-4">
              <p className="flex items-center gap-2 text-[14px] text-ink">
                <Truck className="size-4 stroke-[1.5] text-brand" aria-hidden />
                {left > 0 ? (
                  <span>
                    Mua thêm <strong>{formatVnd(left)}</strong> để được miễn phí giao hàng
                  </span>
                ) : (
                  <span className="font-semibold">Đơn của bạn được miễn phí giao hàng</span>
                )}
              </p>
              <div className="mt-2 h-1 overflow-hidden rounded-full bg-chip" role="progressbar" aria-valuenow={Math.round(pct)} aria-valuemin={0} aria-valuemax={100}>
                <div className="h-full origin-left rounded-full bg-brand transition-transform duration-200 ease-out" style={{ transform: `scaleX(${pct / 100})` }} />
              </div>
            </div>

            <ul className="flex-1 overflow-y-auto px-6">
              {lines.map((l) => (
                <li key={l.key} className="flex gap-4 border-b border-line py-4">
                  <div className="relative aspect-[4/5] w-20 shrink-0 overflow-hidden rounded-[6px] bg-chip">
                    <Photo src={l.product.image} alt="" fill sizes="80px" className="object-cover" />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <p className="font-semibold text-ink">{l.product.name}</p>
                    <p className="text-[14px] text-ink-muted">
                      {l.colour}, size {l.size}
                    </p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full border border-line">
                        <button onClick={() => setQty(l.key, l.qty - 1)} className="grid size-8 place-items-center rounded-full hover:bg-chip" aria-label="Giảm số lượng">
                          <Minus className="size-4 stroke-[1.5]" />
                        </button>
                        <span className="w-8 text-center text-[14px] font-semibold" aria-live="polite">
                          {l.qty}
                        </span>
                        <button onClick={() => setQty(l.key, l.qty + 1)} className="grid size-8 place-items-center rounded-full hover:bg-chip" aria-label="Tăng số lượng">
                          <Plus className="size-4 stroke-[1.5]" />
                        </button>
                      </div>
                      <span className="display text-[16px] font-extrabold text-ink">{formatVnd(priceOf(l.product) * l.qty)}</span>
                    </div>
                  </div>
                  <button onClick={() => remove(l.key)} className="grid size-8 place-items-center self-start rounded-full text-ink-muted hover:bg-chip hover:text-ink" aria-label={`Xoá ${l.product.name}`}>
                    <Trash2 className="size-4 stroke-[1.5]" />
                  </button>
                </li>
              ))}
            </ul>

            <SheetFooter className="gap-4 border-t border-line p-6">
              <dl className="flex flex-col gap-2 text-[14px]">
                <div className="flex justify-between text-ink-muted">
                  <dt>Tạm tính</dt>
                  <dd className="text-ink">{formatVnd(subtotal)}</dd>
                </div>
                <div className="flex justify-between text-ink-muted">
                  <dt>Phí giao hàng</dt>
                  <dd className="text-ink">{shipping === 0 ? "Miễn phí" : formatVnd(shipping)}</dd>
                </div>
                <div className="flex justify-between border-t border-line pt-2 text-[16px] font-semibold text-ink">
                  <dt>Tổng cộng</dt>
                  <dd className="display text-[24px] font-extrabold">{formatVnd(subtotal + shipping)}</dd>
                </div>
              </dl>
              <button className="h-12 rounded-full bg-accent text-[16px] font-semibold text-accent-ink transition-[filter] duration-150 hover:brightness-110">
                Thanh toán
              </button>
              <ul className="flex flex-wrap gap-2" aria-label="Phương thức thanh toán">
                {payments.map((m) => (
                  <li key={m} className="rounded-[6px] border border-line bg-surface px-2 text-[12px] font-semibold leading-6 text-ink-muted">
                    {m}
                  </li>
                ))}
              </ul>
              <p className="flex items-center gap-2 text-[12px] text-ink-muted">
                <RotateCcw className="size-4 stroke-[1.5]" aria-hidden />
                Có xuất hoá đơn VAT. Đổi size miễn phí trong 30 ngày.
              </p>
            </SheetFooter>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
