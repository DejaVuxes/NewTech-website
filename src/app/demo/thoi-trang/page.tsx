import type { Metadata } from "next";
import { brand } from "@/components/demo/thoi-trang/brand";
import { FashionStore } from "@/components/demo/thoi-trang/shop-page";

export const metadata: Metadata = {
  title: `${brand.name} — Thời trang Thu Đông 2026 | Demo template NewTech`,
  description: "Template cửa hàng thời trang: lookbook, bộ lọc sản phẩm, xem nhanh, giỏ hàng, thanh toán VietQR, MoMo, ZaloPay.",
};

export default function Page() {
  return <FashionStore />;
}
