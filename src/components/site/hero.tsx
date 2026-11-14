"use client";

import { useRef } from "react";
import { ArrowDown, ArrowUpRight, LayoutTemplate } from "lucide-react";
import { Button, PillChip } from "@/components/ui/button";
import { gsap, MQ, SplitText, useGSAP } from "@/lib/gsap";
import { GridPulse } from "@/components/ui/grid-pulse";
import { TemplateArc } from "./template-arc";

export function Hero() {
  const scope = useRef<HTMLElement>(null);

  // The page's single "hero" effect: the headline rises word by word.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        // words, not masked lines: masks would clip stacked Vietnamese marks (Ẩ, Ồ)
        const split = SplitText.create(".hero-title", { type: "words" });
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.from(split.words, { yPercent: 40, opacity: 0, duration: 0.7, stagger: 0.06 })
          .from(".hero-fade", { y: 16, opacity: 0, duration: 0.5, stagger: 0.06 }, "-=0.45");
        return () => split.revert();
      });
    },
    { scope }
  );

  return (
    <section ref={scope} className="relative overflow-hidden bg-band pt-32 text-band-ink md:pt-40">
      {/* interactive grid (GridPulse) in leaf-to-moss greens on the forest ground */}
      <GridPulse
        hueTop={135}
        hueSpan={60}
        saturation={42}
        className="[--grid-pulse-line:rgb(240_235_229/0.06)]"
      />
      {/* light rising from below, behind the template ribbon */}
      <div className="band-glow pointer-events-none absolute inset-x-0 bottom-0 h-[70%]" aria-hidden />

      <div className="relative mx-auto grid max-w-[1280px] gap-8 px-4 md:px-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-7">
          <p className="hero-fade inline-flex items-center gap-2 text-[16px] font-medium md:text-[18px]">
            <span className="text-grad" data-grid-avoid>Giao diện frontend cho đội dev Việt</span>
          </p>

          <h1 className="mt-6" data-grid-avoid>
            {/* SplitText rewrites these nodes, so React must not own them (avoids removeChild errors) */}
            <span
              className="hero-title display block text-[44px] font-medium sm:text-[56px] lg:text-[72px]"
              dangerouslySetInnerHTML={{
                __html: 'Giao diện đẹp,<br />mã nguồn chuẩn<span style="color:var(--lavender-2)">.</span>',
              }}
            />
          </h1>

          <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-4 md:mt-12">
            <Button variant="pill" className="hero-fade" render={<a href="#kho-template" />} nativeButton={false}>
              <LayoutTemplate className="size-5" />
              Xem kho template
              <PillChip>
                <ArrowUpRight className="size-4" />
              </PillChip>
            </Button>
            <Button
              variant="underline"
              className="hero-fade border-band-muted text-band-ink hover:border-band-ink hover:text-band-ink"
              render={<a href="#cach-lam-viec" />}
              nativeButton={false}
            >
              Xem cách NewTech kiểm duyệt
              <ArrowDown />
            </Button>
          </div>
        </div>

        <div className="flex flex-col justify-end lg:col-span-5 lg:pb-4 lg:pl-8">
          <dl className="grid grid-cols-2 gap-6 border-t border-band-line pt-6">
            <div className="hero-fade">
              <dt className="sr-only">Tỉ lệ kiểm duyệt</dt>
              <dd className="display whitespace-nowrap text-[40px] font-medium sm:text-[48px]" data-grid-avoid>100%</dd>
              <dd className="mt-2 text-[14px] text-band-muted" data-grid-avoid>template đẹp</dd>
            </div>
            <div className="hero-fade">
              <dt className="sr-only">Thời gian giao UI riêng</dt>
              <dd className="display whitespace-nowrap text-[40px] font-medium sm:text-[48px]" data-grid-avoid>24–48h</dd>
              <dd className="mt-2 text-[14px] text-band-muted" data-grid-avoid>để nhận giao diện theo logo và màu thương hiệu</dd>
            </div>
          </dl>
        </div>
      </div>

      <TemplateArc />
    </section>
  );
}
