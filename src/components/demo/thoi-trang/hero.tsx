"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { formatVnd, priceOf, products } from "./data";
import { Photo } from "./photo";
import { useStore } from "./store";

const looks = ["khoac-camel", "mang-to-nam", "quan-ong-rong"].map((id) => products.find((p) => p.id === id)!);
const lookImages = [
  "https://images.unsplash.com/photo-1618244985759-a8a1dc26bce3",
  "https://images.unsplash.com/photo-1619603364937-8d7af41ef206",
  "https://images.unsplash.com/photo-1789110853687-71692f0e86be",
];

export function Hero() {
  const scope = useRef<HTMLElement>(null);
  const { openQuickView } = useStore();

  // The page's one hero effect: photos unveil bottom-up, headline lines rise. ≤ 1.2s total.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".hero-line", { yPercent: 40, opacity: 0, duration: 0.7, stagger: 0.08 })
          .from(".hero-look", { clipPath: "inset(100% 0 0 0)", duration: 0.9, stagger: 0.08 }, 0.1)
          .from(".hero-fade", { opacity: 0, y: 16, duration: 0.5, stagger: 0.06 }, 0.4);
      });
    },
    { scope }
  );

  return (
    <section ref={scope} className="mx-auto grid max-w-[1280px] gap-12 px-4 pb-24 pt-12 md:px-6 lg:grid-cols-12 lg:gap-6 lg:pt-16">
      <div className="flex flex-col justify-end lg:col-span-5 lg:pb-8">
        <p className="hero-fade text-[14px] font-semibold text-brand">Bộ sưu tập Thu Đông 2026</p>
        <h1 className="display mt-4 text-[48px] font-extrabold text-ink sm:text-[64px] xl:text-[88px]">
          <span className="hero-line block">Mùa lạnh,</span>
          <span className="hero-line block">mặc nhẹ.</span>
        </h1>
        <p className="hero-fade display mt-6 max-w-[440px] text-[24px] font-extralight leading-[1.3] text-ink">
          38 thiết kế mới từ len merino, dạ pha và lụa Bảo Lộc, may tại xưởng của chúng tôi ở Bắc Ninh.
        </p>
        <div className="hero-fade mt-8 flex flex-wrap gap-4">
          <a
            href="#cua-hang"
            className="inline-flex h-12 items-center rounded-full bg-accent px-8 text-[16px] font-semibold text-accent-ink transition-[filter] duration-150 hover:brightness-110"
          >
            Mua bộ sưu tập
          </a>
          <a
            href="#lookbook"
            className="inline-flex h-12 items-center rounded-full border border-ink px-8 text-[16px] font-semibold text-ink transition-colors duration-150 hover:bg-ink hover:text-paper"
          >
            Xem lookbook
          </a>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 sm:gap-4 lg:col-span-7">
        {looks.map((p, i) => (
          <button
            key={p.id}
            onClick={() => openQuickView(p.id)}
            className={`group text-left ${i === 1 ? "lg:mt-16" : i === 2 ? "lg:mt-32" : ""}`}
          >
            <span className="hero-look relative block aspect-[3/4] overflow-hidden rounded-[12px] bg-chip">
              <Photo
                src={lookImages[i]}
                alt={`Người mẫu mặc ${p.name.toLowerCase()}`}
                fill
                priority
                sizes="(min-width: 1024px) 25vw, 33vw"
                className="object-cover"
              />
            </span>
            <span className="hero-fade mt-2 block text-[14px] font-semibold text-ink">{p.name}</span>
            <span className="hero-fade block text-[14px] text-ink-muted">{formatVnd(priceOf(p))}</span>
          </button>
        ))}
      </div>
    </section>
  );
}
