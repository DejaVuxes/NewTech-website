"use client";

import { useEffect, useState } from "react";
import ClothingRailHero from "@/components/ui/product-rail-gallery";
import { brand } from "./brand";
import { BrandMark } from "./logo";
import { railGarments } from "./rail-garments";

const railLabels = {
  front: "Mặt trước",
  back: "Mặt sau",
  close: "Đóng",
  show: "Xem sản phẩm",
};

export function Hero() {
  const [garmentHeight, setGarmentHeight] = useState(320);

  useEffect(() => {
    const measure = () => setGarmentHeight(Math.min(400, Math.max(220, window.innerHeight * 0.42)));
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  return (
    <section
      aria-labelledby="fashion-intro-title"
      className="flex min-h-[calc(100svh-2.5rem)] flex-col justify-center bg-paper py-8 text-ink"
    >
      <div className="relative z-10 px-5 text-center">
        <BrandMark className="mx-auto mb-4 h-[54px] w-24 sm:mb-5" />
        <h1
          id="fashion-intro-title"
          className="display text-balance text-[clamp(2.5rem,6.4vw,6rem)] leading-[1.05] font-semibold tracking-[-0.055em]"
        >
          {brand.name}
        </h1>
        <p className="mt-3 text-balance text-[15px] font-normal text-ink-muted sm:mt-4 sm:text-[18px]">
          {brand.tagline}
        </p>
      </div>

      <ClothingRailHero
        items={railGarments}
        hanger="none"
        autoplay
        interval={2800}
        maxGarmentHeight={garmentHeight}
        labels={railLabels}
        showCaptions={false}
        aria-label={`Sào đồ ${brand.name}`}
        className="mx-auto mt-5 max-w-[1440px] !bg-transparent sm:mt-6"
      />
    </section>
  );
}
