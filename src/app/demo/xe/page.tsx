import { Suspense } from "react";
import type { Metadata } from "next";
import { Showroom } from "@/components/demo/xe/showroom";
import { ShowroomFromQuery } from "@/components/demo/xe/showroom-from-query";
import { brand } from "@/components/demo/xe/brand";

export const metadata: Metadata = {
  title: `${brand.name} — Showroom ô tô và xe máy`,
  description: "Cấu hình ô tô và xe máy trên mô hình 3D, chọn màu sơn, mâm xe, xem giá, tính trả góp và đặt lịch lái thử.",
};

export default function XePage() {
  return (
    <Suspense fallback={<Showroom />}>
      <ShowroomFromQuery />
    </Suspense>
  );
}
