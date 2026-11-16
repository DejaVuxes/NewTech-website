import type { Metadata } from "next";
import { brand } from "@/components/demo/thoi-trang/brand";
import { FashionStore } from "@/components/demo/thoi-trang/shop-page";

export const metadata: Metadata = {
  title: `${brand.name} — Dệt chất riêng, mặc tinh thần Sài Gòn`,
  description: `${brand.name}: thời trang đương đại mang tinh thần Sài Gòn. Khám phá những thiết kế tối giản, chất liệu chọn lọc và phong cách riêng cho mỗi ngày.`,
};

export default function Page() {
  return <FashionStore />;
}
