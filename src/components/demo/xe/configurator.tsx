"use client";

import { useRef } from "react";
import { CalendarCheck, Calculator, Check } from "lucide-react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { formatVnd, models, paints, rims, typeLabel, type Model, type Paint, type Rim, type VehicleType } from "./data";
import { Viewer } from "./viewer";

export type Selection = { model: Model; paint: Paint; rim: Rim };

export const totalPrice = ({ model, paint, rim }: Selection) => model.price + paint[model.type] + (model.asset && !model.asset.rimMaterial ? 0 : rim[model.type]);

function Extra({ value }: { value: number }) {
  return <span className="text-ink-muted">{value ? `+${formatVnd(value)}` : "Miễn phí"}</span>;
}

export function Configurator({
  sel,
  onType,
  onModel,
  onPaint,
  onRim,
}: {
  sel: Selection;
  onType: (t: VehicleType) => void;
  onModel: (m: Model) => void;
  onPaint: (p: Paint) => void;
  onRim: (r: Rim) => void;
}) {
  const scope = useRef<HTMLElement>(null);
  const { model, paint, rim } = sel;
  const list = models.filter((m) => m.type === model.type);
  const total = totalPrice(sel);

  // hero effect: one intro sequence, then a short re-entry of the name when the model changes
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(".hero-in", { y: 16, opacity: 0, duration: 0.6, stagger: 0.06 })
          .from(".hero-stage", { clipPath: "inset(0 50% 0 50%)", duration: 0.7, ease: "expo.out" }, 0.1);
      });
    },
    { scope }
  );
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".model-name", { y: 8, opacity: 0, duration: 0.4, ease: "power3.out" });
      });
    },
    { scope, dependencies: [model.id] }
  );

  return (
    <section ref={scope} id="cau-hinh" className="mx-auto max-w-[1280px] scroll-mt-32 px-4 pb-24 pt-8 md:px-6 md:pt-16">
      <div className="grid gap-8 lg:grid-cols-12 lg:gap-6">
        {/* left: identity + specs */}
        <div className="flex flex-col lg:col-span-3 lg:pt-16">
          <p className="hero-in text-[14px] font-semibold text-ink-muted">{list.length} mẫu {typeLabel[model.type].toLowerCase()} đang bán</p>
          <h1 className={cn("model-name display mt-2 break-words text-[48px] font-extrabold text-ink", model.name.length <= 9 && "md:text-[64px]", model.name.length > 16 && "text-[36px]")}>{model.name}</h1>
          <p className="hero-in display mt-2 text-[24px] font-extralight text-ink">{model.tagline}</p>
          <dl className="hero-in mt-8 hidden border-t border-line lg:block">
            {model.specs.slice(0, 4).map((s) => (
              <div key={s.label} className="flex items-baseline justify-between gap-4 border-b border-line py-2">
                <dt className="text-[14px] text-ink-muted">{s.label}</dt>
                <dd className="text-[14px] font-semibold text-ink">{s.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* centre: stage */}
        <div className="lg:col-span-6">
          <div role="radiogroup" aria-label="Loại xe" className="hero-in mx-auto flex w-fit gap-2 rounded-full border border-line bg-surface p-1">
            {(Object.keys(typeLabel) as VehicleType[]).map((t) => (
              <button
                key={t}
                type="button"
                role="radio"
                aria-checked={model.type === t}
                onClick={() => onType(t)}
                className={cn(
                  "h-10 rounded-full px-6 text-[14px] font-semibold transition-colors duration-150",
                  model.type === t ? "bg-brand text-paper" : "text-ink-muted hover:text-ink"
                )}
              >
                {typeLabel[t]}
              </button>
            ))}
          </div>
          <div className="hero-stage mt-4">
            <Viewer model={model} paint={paint} rim={rim} />
          </div>
          <div role="radiogroup" aria-label="Chọn mẫu xe" className="hero-in mt-6 flex flex-wrap justify-center gap-2">
            {list.map((m) => (
              <button
                key={m.id}
                type="button"
                role="radio"
                aria-checked={m.id === model.id}
                onClick={() => onModel(m)}
                className={cn(
                  "h-10 rounded-full border px-4 text-[14px] font-semibold transition-colors duration-150",
                  m.id === model.id ? "border-ink bg-surface text-ink" : "border-line text-ink-muted hover:border-ink-muted hover:text-ink"
                )}
              >
                {m.name}
              </button>
            ))}
          </div>
        </div>

        {/* right: options + price */}
        <div className="flex flex-col gap-8 lg:col-span-3 lg:pt-16">
          <fieldset className="hero-in">
            <legend className="flex w-full justify-between text-[14px]">
              <span className="font-semibold text-ink">Màu sơn</span>
              <span className="text-ink-muted">{paint.name}</span>
            </legend>
            <div className="mt-4 flex flex-wrap gap-2">
              {paints.map((p) => (
                <label key={p.id} className="relative cursor-pointer" title={p.name}>
                  <input
                    type="radio"
                    name="paint"
                    value={p.id}
                    checked={p.id === paint.id}
                    onChange={() => onPaint(p)}
                    className="peer sr-only"
                    aria-label={`${p.name}, ${p[model.type] ? "+" + formatVnd(p[model.type]) : "miễn phí"}`}
                  />
                  <span
                    className="grid size-10 place-items-center rounded-full border border-line ring-offset-2 ring-offset-paper transition-shadow duration-150 peer-checked:ring-2 peer-checked:ring-ink peer-focus-visible:outline-2 peer-focus-visible:outline-offset-4 peer-focus-visible:outline-focus"
                    style={{ background: p.hex }}
                  >
                    {p.id === paint.id && <Check className={cn("size-4 stroke-[2]", p.id === "pearl" || p.id === "signal" ? "text-[#14191F]" : "text-white")} aria-hidden />}
                  </span>
                </label>
              ))}
            </div>
            <p className="mt-2 text-[14px]"><Extra value={paint[model.type]} /></p>
          </fieldset>

          {(!model.asset || model.asset.rimMaterial) ? <fieldset className="hero-in">
            <legend className="text-[14px] font-semibold text-ink">{model.type === "car" ? "Mâm xe" : "Vành và khung"}</legend>
            <div className="mt-4 flex flex-col gap-2">
              {rims.map((r) => (
                <label
                  key={r.id}
                  className={cn(
                    "flex cursor-pointer items-center gap-4 rounded-md border px-4 py-2 text-[14px] transition-colors duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-focus",
                    r.id === rim.id ? "border-ink bg-surface" : "border-line hover:border-ink-muted"
                  )}
                >
                  <input type="radio" name="rim" value={r.id} checked={r.id === rim.id} onChange={() => onRim(r)} className="sr-only" />
                  <span className="size-4 rounded-full border border-line" style={{ background: r.hex }} aria-hidden />
                  <span className="font-semibold text-ink">{r.name}</span>
                  <span className="ml-auto"><Extra value={r[model.type]} /></span>
                </label>
              ))}
            </div>
          </fieldset> : <div className="hero-in">
            <p className="text-[14px] font-semibold text-ink">Mâm xe</p>
            <p className="mt-2 text-[14px] text-ink-muted">Giữ thiết kế nguyên bản của xe</p>
          </div>}

          <div className="hero-in border-t border-line pt-6">
            <p className="text-[14px] text-ink-muted">{model.asset ? "Giá tham khảo trong bản demo" : "Giá niêm yết tạm tính"}</p>
            <p className="display mt-1 text-[32px] font-extrabold text-ink" aria-live="polite">{formatVnd(total)}</p>
            <p className="text-[14px] text-ink-muted">Đã gồm VAT, chưa gồm lệ phí trước bạ</p>
            <a
              href="#lai-thu"
              className="mt-6 flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-accent-ink transition-[filter] duration-150 hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <CalendarCheck className="size-5 stroke-[1.5]" aria-hidden />
              Đặt lái thử
            </a>
            <a
              href="#tra-gop"
              className="mt-2 flex h-12 items-center justify-center gap-2 rounded-full border border-line px-6 text-[14px] font-semibold text-ink transition-colors duration-150 hover:bg-chip"
            >
              <Calculator className="size-4 stroke-[1.5]" aria-hidden />
              Tính trả góp
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
