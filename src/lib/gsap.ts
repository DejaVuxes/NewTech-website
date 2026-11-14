"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

// dev only: lets the screenshot loop fast-forward timelines from the console
if (typeof window !== "undefined" && process.env.NODE_ENV !== "production") {
  (window as unknown as { gsap: typeof gsap }).gsap = gsap;
}

export const MQ = {
  motion: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  desktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
};

export { gsap, ScrollTrigger, SplitText, useGSAP };
