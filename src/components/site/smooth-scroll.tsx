"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

/**
 * One Lenis instance for the whole site, driven by GSAP's ticker (single RAF loop).
 *
 * The instance is created here (not via <ReactLenis>) so the ticker hook is attached in the
 * same effect that creates it. With <ReactLenis autoRaf={false}> the instance could still be
 * missing when our effect ran; Lenis then captured the wheel but nothing ever stepped it,
 * so the page could not be scrolled with the mouse.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ autoRaf: false, lerp: 0.1, syncTouch: false });
    lenis.on("scroll", ScrollTrigger.update);
    const update = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);
    // fonts change line breaks → re-measure pinned sections
    document.fonts?.ready.then(() => ScrollTrigger.refresh());

    return () => {
      gsap.ticker.remove(update);
      lenis.destroy();
    };
  }, []);

  return null;
}
