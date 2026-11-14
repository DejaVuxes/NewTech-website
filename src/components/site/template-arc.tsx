"use client";

import { useRef } from "react";
import { formatVnd, templates } from "@/lib/data";
import { gsap, MQ, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { BrowserFrame, TemplateShot } from "./template-shot";

/**
 * Curved strip of template previews drifting sideways (the reference's 3D project ribbon).
 * Cards are laid on a shallow cylinder: the further from centre, the more they turn and recede.
 */
export function TemplateArc() {
  const scope = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const root = scope.current!;
      const cards = gsap.utils.toArray<HTMLElement>(".arc-card", root);
      const state = { offset: 0, speed: 0.4 };
      let paused = false;

      const layout = () => {
        const vw = root.clientWidth;
        const w = cards[0].offsetWidth;
        const step = w + 24;
        const total = step * cards.length;
        cards.forEach((card, i) => {
          // wrap each card into [-step, total - step)
          const x = gsap.utils.wrap(-step, total - step, i * step - state.offset);
          const centre = x + w / 2;
          const d = gsap.utils.clamp(-1.4, 1.4, (centre - vw / 2) / (vw / 2));
          gsap.set(card, {
            x,
            rotateY: d * -28,
            z: -Math.abs(d) * 200,
            opacity: 1 - Math.max(0, Math.abs(d) - 0.9) * 1.2,
          });
        });
      };

      layout();
      const onResize = () => layout();
      window.addEventListener("resize", onResize);

      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        let inView = true;
        const vis = ScrollTrigger.create({
          trigger: root,
          start: "top bottom",
          end: "bottom top",
          onToggle: (self) => (inView = self.isActive),
        });
        const tick = (_t: number, dt: number) => {
          if (!inView) return;
          const target = paused ? 0 : 0.4;
          state.speed += (target - state.speed) * 0.08;
          state.offset += state.speed * (dt / 16.67);
          layout();
        };
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          vis.kill();
        };
      });

      const pause = () => (paused = true);
      const resume = () => (paused = false);
      root.addEventListener("pointerenter", pause);
      root.addEventListener("pointerleave", resume);
      root.addEventListener("focusin", pause);
      root.addEventListener("focusout", resume);

      return () => {
        window.removeEventListener("resize", onResize);
        root.removeEventListener("pointerenter", pause);
        root.removeEventListener("pointerleave", resume);
        root.removeEventListener("focusin", pause);
        root.removeEventListener("focusout", resume);
      };
    },
    { scope }
  );

  return (
    <div className="relative mt-16 md:mt-24">
      <div
        ref={scope}
        className="relative h-[232px] overflow-hidden [perspective:1400px] sm:h-[280px] md:h-[312px]"
        aria-label="Template nổi bật"
        role="region"
      >
        {templates.map((t) => (
          <a
            key={t.slug}
            href="#kho-template"
            className="arc-card group absolute left-0 top-4 block w-[264px] [transform-style:preserve-3d] sm:w-[336px] md:w-[384px]"
          >
            <BrowserFrame url={`${t.slug}.newtech.vn`} dark={t.dark} className="border-band-line transition-colors duration-200 group-hover:border-lavender-2">
              <TemplateShot kind={t.kind} headline={t.headline} dark={t.dark} />
            </BrowserFrame>
            <span className="mt-2 flex items-baseline justify-between gap-2 px-2 text-[14px]">
              <span className="truncate font-medium text-band-ink">{t.name}</span>
              <span className="display shrink-0 font-medium text-band-muted">{formatVnd(t.price)}</span>
            </span>
          </a>
        ))}
      </div>
      <div className="pb-16" aria-hidden />
    </div>
  );
}
