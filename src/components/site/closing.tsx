"use client";

import { ArrowUpRight, BadgePercent, CircleHelp, ShieldCheck, Check, CircleCheck, Mail, MessageCircle, X } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button, Eyebrow, PillChip } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { Logo } from "./header";

/* ---------------- Review band (reference: dark "Bảo vệ. Giữ gìn. Phát triển." block) ---------------- */

const checks = ["Chạy đúng như demo", "Đúng ngôn ngữ", "Responsive và truy cập được", "Giấy phép rõ ràng"];

const reviewItems = [
  "Build production không lỗi, không cảnh báo",
  "Lighthouse",
  "Hiển thị đúng",
  "Không bị lỗi ngôn ngữ",
  "Chế độ sáng và tối",
  "Giấy phép thương mại kèm khoá kích hoạt",
];

export function ReviewBand() {
  return (
    <section id="kiem-duyet" className="relative scroll-mt-24 overflow-hidden bg-band text-band-ink">
      <div className="band-glow pointer-events-none absolute inset-0 rotate-180 opacity-70" aria-hidden />
      <div className="relative mx-auto grid max-w-[1280px] gap-12 px-4 py-24 md:px-6 md:py-32 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <Eyebrow icon={ShieldCheck} onBand>Mỗi template trước khi lên kệ</Eyebrow>
          <h2 className="display mt-6 text-[44px] font-medium sm:text-[56px]">
            Kiểm duyệt.
            <br />
            Cấp phép.
            <br />
            <span className="text-grad">Bàn giao.</span>
          </h2>

          <ol className="mt-8 border-t border-band-line">
            {checks.map((c, i) => (
              <li key={c} className="flex gap-4 border-b border-band-line py-4">
                <span className="text-[14px] tabular-nums text-band-muted">{i + 1}</span>
                <span className="font-semibold">{c}</span>
              </li>
            ))}
          </ol>

          <div className="mt-8 flex flex-wrap gap-4">
            <Button variant="pill" render={<a href="#hoi-dap" />} nativeButton={false}>
              Đặt UI theo thương hiệu
              <PillChip>
                <ArrowUpRight className="size-4" />
              </PillChip>
            </Button>
            <Button variant="onBand" render={<a href="#hoi-dap" />} nativeButton={false}>
              <MessageCircle />
              Nhắn Zalo cho NewTech
            </Button>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-lg border border-band-line bg-band-card">
            <div className="flex items-center justify-between border-b border-band-line px-6 py-4">
              <p className="font-semibold">Phiếu kiểm duyệt</p>
              <p className="text-[14px] text-band-muted">12/12 mục đạt</p>
            </div>
            <ul className="divide-y divide-band-line">
              {reviewItems.map((x, i) => (
                <li key={x} className={cn("flex items-center gap-4 px-6 py-4 text-[14px]", i === 0 ? "text-band-ink" : "text-band-muted")}>
                  <CircleCheck className="size-5 shrink-0 stroke-[1.5]" /> {x}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------- License & pricing (reference: Basic / Growth / Performance tabs) ---------------- */

const tiers = [
  {
    value: "ca-nhan",
    label: "Cá nhân",
    price: "Từ 290.000 ₫",
    note: "mỗi template, đúng giá niêm yết, trả một lần",
    yes: ["Dùng cho 1 dự án cá nhân hoặc học tập", "Mã nguồn và file Figma", "Cập nhật miễn phí 12 tháng"],
    no: ["Dự án cho khách hàng hoặc sản phẩm thương mại"],
  },
  {
    value: "thuong-mai",
    label: "Thương mại",
    price: "Từ 580.000 ₫",
    note: "mỗi template, gấp 2 giá niêm yết, trả một lần",
    yes: ["Dùng cho 1 sản phẩm thương mại hoặc 1 dự án khách hàng", "Mã nguồn, Figma, tài liệu", "Hoá đơn VAT theo mã số thuế công ty", "Cập nhật miễn phí 12 tháng"],
    no: ["Bán lại template dưới dạng template"],
  },
  {
    value: "mo-rong",
    label: "Mở rộng",
    price: "Từ 1.160.000 ₫",
    note: "mỗi template, gấp 4 giá niêm yết, trả một lần",
    yes: ["Không giới hạn dự án trong một công ty hoặc agency", "Mã nguồn, Figma, tài liệu", "Hoá đơn VAT", "Hỗ trợ kỹ thuật ưu tiên 6 tháng"],
    no: ["Bán lại template dưới dạng template"],
  },
];


export function Pricing() {
  return (
    <section id="gia" className="mx-auto max-w-[1280px] scroll-mt-24 px-4 py-24 md:px-6 md:py-32">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow icon={BadgePercent}>Giấy phép và giá</Eyebrow>
          <h2 className="display mt-6 text-[32px] font-medium text-ink sm:text-[48px]">
            <span className="text-grad">Bảng giá.</span>
          </h2>
        </div>
        <p className="self-end text-ink-muted lg:col-span-4 lg:col-start-9">
          Chọn giấy phép theo cách bạn dùng template. Giá đã gồm VAT, không có phí ẩn khi thanh toán.
        </p>
      </div>

      <Tabs defaultValue="thuong-mai" className="mt-12 gap-0">
        <TabsList className="h-auto w-full justify-start gap-2 rounded-b-none rounded-t-lg border border-b-0 border-line bg-surface p-2 sm:w-fit">
          {tiers.map((t) => (
            <TabsTrigger
              key={t.value}
              value={t.value}
              className="h-10 flex-1 rounded-full px-4 text-[14px] font-semibold text-ink-muted sm:flex-none data-active:bg-brand data-active:text-primary-foreground dark:data-active:bg-brand dark:data-active:text-primary-foreground"
            >
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {tiers.map((t) => (
          <TabsContent key={t.value} value={t.value}>
            <div className="rounded-lg rounded-tl-none border border-line bg-surface">
              <div className="p-6 md:p-8">
                <p className="display text-[48px] font-medium text-ink md:text-[64px]">{t.price}</p>
                <p className="text-ink-muted">{t.note}</p>
                <ul className="mt-8 space-y-4">
                  {t.yes.map((x) => (
                    <li key={x} className="flex gap-2">
                      <Check className="mt-1 size-4 shrink-0 stroke-[1.5] text-success" /> {x}
                    </li>
                  ))}
                  {t.no.map((x) => (
                    <li key={x} className="flex gap-2 text-ink-muted">
                      <X className="mt-1 size-4 shrink-0 stroke-[1.5] text-danger" /> {x}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
}

/* ---------------- FAQ (reference: heading + buttons left, accordion right) ---------------- */

const faqs = [
  {
    q: "NewTech có làm backend hoặc triển khai website không?",
    a: "Không. NewTech chỉ bán và làm phần giao diện frontend. Đội dev của bạn tự nối với backend, hosting và triển khai, nên bạn giữ toàn quyền với hệ thống.",
  },
  {
    q: "Template dùng công nghệ gì?",
    a: "React, Next.js (App Router), Vue 3 và Tailwind CSS, phần lớn dùng shadcn/ui. Mỗi template ghi rõ phiên bản thư viện ở trang chi tiết.",
  },
  {
    q: "Tôi có nhận được hoá đơn VAT không?",
    a: "Có. Nhập tên công ty và mã số thuế ở bước thanh toán, hoá đơn VAT điện tử được gửi qua email trong ngày.",
  },
  {
    q: "Giấy phép Thương mại và Mở rộng khác nhau thế nào?",
    a: "Thương mại dùng cho một sản phẩm hoặc một dự án khách hàng. Mở rộng dùng cho không giới hạn dự án trong cùng một công ty hoặc agency.",
  },
  {
    q: "Đặt UI theo thương hiệu được chỉnh sửa mấy lần?",
    a: "Mỗi đơn gồm hai vòng chỉnh sửa trong phạm vi danh sách màn hình đã thống nhất. Thời gian giao bản đầu là 24–48 giờ.",
  },
  {
    q: "Nếu template không chạy như demo thì sao?",
    a: "Báo cho NewTech trong 14 ngày. Nếu lỗi nằm ở template và không sửa được trong 3 ngày làm việc, bạn được hoàn tiền toàn bộ.",
  },
];

export function Faq() {
  return (
    <section id="hoi-dap" className="mx-auto max-w-[1280px] scroll-mt-24 px-4 py-24 md:px-6 md:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <Eyebrow icon={CircleHelp}>Câu hỏi thường gặp</Eyebrow>
          <h2 className="display mt-6 text-[44px] font-medium text-ink sm:text-[56px]">
            Giải đáp nhanh
            <br />
            <span className="text-grad">mọi thắc mắc.</span>
          </h2>
          <p className="mt-6 max-w-[40ch] text-ink-muted">
            Chưa thấy câu trả lời bạn cần? Nhắn cho NewTech, đội ngũ trả lời trong giờ làm việc.
          </p>
          <div className="mt-8 flex flex-col items-start gap-2">
            <Button variant="outline" render={<a href="#" />} nativeButton={false}>
              <MessageCircle /> Nhắn Zalo
            </Button>
            <Button variant="outline" render={<a href="mailto:hello@newtech.vn" />} nativeButton={false}>
              <Mail /> hello@newtech.vn
            </Button>
          </div>
        </div>
        <div className="lg:col-span-7">
          <Accordion className="gap-2">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q} className="rounded-lg border border-line bg-surface not-last:border-b">
                <AccordionTrigger className="px-6 py-4 text-[16px] font-semibold text-ink hover:no-underline">{f.q}</AccordionTrigger>
                <AccordionContent className="px-6 pb-4 text-[16px] text-ink-muted">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Footer ---------------- */

const footerCols = [
  { title: "Sản phẩm", links: ["Landing page", "Dashboard", "UI kit", "Bộ trang"] },
  { title: "Dịch vụ", links: ["UI theo thương hiệu", "Giấy phép doanh nghiệp", "Kênh bán cho designer"] },
  { title: "Hỗ trợ", links: ["Hỏi đáp", "Chính sách hoàn tiền", "Điều khoản giấy phép"] },
];

export function Footer() {
  return (
    <footer className="bg-band text-band-ink">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-16 md:px-6 lg:grid-cols-12 lg:gap-6">
        <div className="lg:col-span-5">
          <Logo onBand />
          <p className="mt-4 max-w-[40ch] text-[14px] text-band-muted">
            Chợ giao diện frontend cho đội dev Việt. Template đã kiểm duyệt, thanh toán nội địa, có hoá đơn VAT.
          </p>
        </div>
        {footerCols.map((c) => (
          <nav key={c.title} aria-label={c.title} className="lg:col-span-2">
            <p className="font-semibold">{c.title}</p>
            <ul className="mt-4 space-y-2 text-[14px] text-band-muted">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="transition-colors hover:text-band-ink">{l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="border-t border-band-line">
        <div className="mx-auto flex max-w-[1280px] flex-wrap justify-between gap-4 px-4 py-6 text-[14px] text-band-muted md:px-6">
          <p>© 2026 NewTech. Dự án khởi nghiệp sinh viên.</p>
          <p className="flex gap-6">
            <a href="#" className="hover:text-band-ink">Chính sách bảo mật</a>
            <a href="#" className="hover:text-band-ink">Điều khoản sử dụng</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
