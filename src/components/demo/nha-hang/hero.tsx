"use client";

import { useRef } from "react";
import Image from "next/image";
import { Clock, MapPin } from "lucide-react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { brand } from "./brand";
import { img, photos } from "./data";
import { PorcelainRim } from "./logo";

/** Hero: món đặc trưng nằm trong một chiếc đĩa men lam. Hiệu ứng duy nhất: đĩa xoay nhẹ vào chỗ khi tải trang. */
export function Hero() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        const tl = gsap.timeline({ defaults: { ease: "expo.out" } });
        tl.from(".nm-plate", { rotate: -40, scale: 0.92, opacity: 0, duration: 1.1 })
          .from(".nm-rim", { rotate: 30, duration: 1.1 }, 0)
          .from(".nm-hero-line", { y: 24, opacity: 0, duration: 0.6, stagger: 0.06 }, 0.15);
      });
    },
    { scope }
  );

  return (
    <section ref={scope} id="top" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-4 pb-24 pt-12 md:px-6 md:pt-16 lg:grid-cols-12 lg:gap-6 lg:pb-32">
        <div className="lg:col-span-6">
          <p className="nm-hero-line text-[16px] font-semibold text-brand">{brand.tagline}, từ năm {brand.since}</p>
          <h1 className="nm-hero-line display mt-4 text-[48px] font-extrabold text-ink sm:text-[64px] xl:text-[88px]">
            Bữa cơm nhà, dọn trên đĩa men lam.
          </h1>
          <p className="nm-hero-line mt-6 max-w-[34rem] text-[20px] font-normal leading-[1.6] text-ink-muted">
            Phở ninh xương mười hai tiếng, cá nướng than hoa, lẩu riêu cua đồng. Nguyên liệu đi chợ mỗi sáng.
          </p>
          <div className="nm-hero-line mt-8 flex flex-wrap gap-4">
            <a
              href="#dat-ban"
              className="inline-flex h-14 items-center rounded-full bg-accent px-8 text-[16px] font-bold text-accent-ink transition-[filter,transform] duration-150 hover:brightness-105 active:translate-y-px"
            >
              Đặt bàn
            </a>
            <a
              href="#thuc-don"
              className="inline-flex h-14 items-center rounded-full border border-ink/20 px-8 text-[16px] font-semibold text-ink transition-colors duration-150 hover:border-brand hover:text-brand"
            >
              Xem thực đơn
            </a>
          </div>
          <dl className="nm-hero-line mt-12 grid max-w-[34rem] gap-4 border-t border-line pt-6 sm:grid-cols-2">
            <div className="flex gap-2">
              <Clock className="mt-1 size-5 shrink-0 stroke-[1.5] text-brand" aria-hidden />
              <div>
                <dt className="font-semibold text-ink">Hôm nay mở cửa</dt>
                <dd className="text-ink-muted">{brand.hours[0].time}</dd>
              </div>
            </div>
            <div className="flex gap-2">
              <MapPin className="mt-1 size-5 shrink-0 stroke-[1.5] text-brand" aria-hidden />
              <div>
                <dt className="font-semibold text-ink">Địa chỉ</dt>
                <dd className="text-ink-muted">{brand.address}</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[560px] lg:col-span-6 lg:max-w-none">
          <div className="relative aspect-square">
            <PorcelainRim className="nm-rim absolute inset-0 size-full opacity-60" />
            <div className="nm-plate absolute inset-[12%] overflow-hidden rounded-full border-[8px] border-surface">
              <Image
                src={img(photos.hero, 1200)}
                alt="Bát phở bò tái lăn nhìn từ trên xuống"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 90vw"
                className="object-cover"
              />
            </div>
          </div>
          <p className="mt-4 text-center text-[14px] text-ink-muted">Phở bò tái lăn, món được gọi nhiều nhất</p>
        </div>
      </div>
    </section>
  );
}
