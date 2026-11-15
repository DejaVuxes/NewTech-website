import type { Metadata } from "next";
import { Booking } from "@/components/demo/nha-hang/booking";
import { brand } from "@/components/demo/nha-hang/brand";
import { Header } from "@/components/demo/nha-hang/header";
import { Hero } from "@/components/demo/nha-hang/hero";
import { Menu } from "@/components/demo/nha-hang/menu";
import { Footer, Location, Reviews, Signatures, Space, Story } from "@/components/demo/nha-hang/sections";

export const metadata: Metadata = {
  title: `${brand.name} — Nhà hàng cơm Việt | Template NewTech`,
  description: "Template website giới thiệu nhà hàng: thực đơn theo danh mục, món đặc trưng, không gian, đánh giá và đặt bàn trực tuyến.",
};

export default function NhaHangPage() {
  return (
    <div className="demo-nha-hang min-h-screen">
      <Header />
      <main>
        <Hero />
        <Signatures />
        <Menu />
        <Story />
        <Space />
        <Reviews />
        <Booking />
        <Location />
      </main>
      <Footer />
    </div>
  );
}
