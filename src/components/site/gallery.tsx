"use client";

import { ArrowRight, Eye, LayoutGrid, LayoutTemplate, Palette, Sparkles, Store } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button, Eyebrow } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatVnd, templates, type Template } from "@/lib/data";
import { TemplateShot } from "./template-shot";

const services = [
  {
    icon: LayoutTemplate,
    title: "Template có sẵn",
    text: "Landing page, dashboard, UI kit và bộ trang bằng React, Next.js, Vue, Tailwind. Mua xong tải về ngay, kèm file Figma.",
    link: "Xem kho template",
    href: "#kho-template",
  },
  {
    icon: Palette,
    title: "UI theo thương hiệu",
    text: "Gửi logo, màu và danh sách màn hình. Nhận giao diện đã chỉnh theo thương hiệu trong 24–48 giờ, từ 4.000.000 ₫.",
    link: "Đặt UI riêng",
    href: "#kiem-duyet",
  },
  {
    icon: Store,
    title: "Kênh bán cho designer",
    text: "Từ năm 2028, designer và dev frontend Việt được mời bán template trên NewTech với mức phí sàn thấp và quy trình kiểm duyệt công bằng.",
    link: "Đăng ký nhận tin",
    href: "#hoi-dap",
  },
];

export function Services() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-24 md:px-6 md:py-32">
      <div className="grid gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow icon={Sparkles}>Dịch vụ</Eyebrow>
          <h2 className="display mt-6 text-[32px] font-medium text-ink sm:text-[48px]">
            Ba việc NewTech làm
            <br />
            <span className="text-grad">cho đội dev của bạn.</span>
          </h2>
        </div>
        <p className="self-end text-ink-muted lg:col-span-4 lg:col-start-9">
          NewTech cung cấp phần giao diện đẹp cho bạn. Backend, hosting và triển khai vẫn do đội dev của bạn nắm giữ.
        </p>
      </div>
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {services.map((s) => (
          <article key={s.title} className="flex flex-col rounded-lg border border-line bg-surface p-8">
            <span className="grid size-12 place-items-center rounded-full bg-chip">
              <s.icon className="size-5 stroke-[1.5] text-brand" aria-hidden />
            </span>
            <h3 className="display mt-6 text-[24px] font-medium text-ink">{s.title}</h3>
            <p className="mt-2 flex-1 text-ink-muted">{s.text}</p>
            <Button variant="underline" className="mt-6 self-start" render={<a href={s.href} />} nativeButton={false}>
              {s.link}
              <ArrowRight />
            </Button>
          </article>
        ))}
      </div>
    </section>
  );
}

function TemplateCard({ t }: { t: Template }) {
  return (
    <article className="group flex flex-col rounded-lg border border-line bg-surface p-4 transition-colors duration-200 hover:border-ink-muted">
      <div className="relative overflow-hidden rounded-md border border-line">
        <div className={t.dark ? "bg-ink text-paper" : "bg-surface text-ink"}>
          <TemplateShot kind={t.kind} headline={t.headline} dark={t.dark} />
        </div>
        {/* hover: swap to the second screen of the template */}
        <div className="absolute inset-0 bg-surface text-ink opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-within:opacity-100">
          <TemplateShot kind={t.altKind} headline={t.headline} />
        </div>
        {t.isNew && (
          <Badge className="absolute bottom-2 right-2 rounded-full border-0 px-2 text-[12px] font-semibold text-white [background:var(--grad-a)]">Mới</Badge>
        )}
      </div>
      <h3 className="mt-4 font-semibold text-ink">{t.name}</h3>
      <p className="text-[14px] text-ink-muted">{t.seller}</p>
      <ul className="mt-2 flex flex-wrap gap-2" aria-label="Công nghệ">
        {t.stack.map((s) => (
          <li key={s}>
            <Badge className="rounded-full border border-line bg-chip px-2 text-[12px] font-medium text-ink">{s}</Badge>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
        <span className="display text-[24px] font-medium text-ink">{formatVnd(t.price)}</span>
        <Button variant="outline" size="sm" render={<a href="#" />} nativeButton={false}>
          <Eye />
          Xem demo
        </Button>
      </div>
    </article>
  );
}

const filters = [
  { value: "all", label: "Tất cả" },
  { value: "landing", label: "Landing page" },
  { value: "dashboard", label: "Dashboard" },
  { value: "pages", label: "Bộ trang" },
  { value: "kit", label: "UI kit" },
] as const;

export function Gallery() {
  return (
    <section id="kho-template" className="mx-auto max-w-[1280px] scroll-mt-24 px-4 py-24 md:px-6 md:py-32">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow icon={LayoutGrid}>Kho template</Eyebrow>
          <h2 className="display mt-6 text-[32px] font-medium text-ink sm:text-[48px]">
            Template mới <span className="text-grad">lên kệ tuần này</span>
          </h2>
        </div>
        <Button variant="underline" render={<a href="#" />} nativeButton={false}>
          Xem tất cả template
          <ArrowRight />
        </Button>
      </div>

      <Tabs defaultValue="all" className="mt-8 gap-8">
        <TabsList className="h-auto flex-wrap justify-start gap-2 bg-transparent p-0">
          {filters.map((f) => (
            <TabsTrigger
              key={f.value}
              value={f.value}
              className="h-10 flex-none rounded-full border border-line bg-surface px-4 text-[14px] font-semibold text-ink-muted data-active:border-brand data-active:bg-brand data-active:text-primary-foreground dark:data-active:bg-brand dark:data-active:text-primary-foreground"
            >
              {f.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {filters.map((f) => {
          const list = f.value === "all" ? templates : templates.filter((t) => t.category === f.value);
          return (
            <TabsContent key={f.value} value={f.value}>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {list.map((t) => (
                  <TemplateCard key={t.slug} t={t} />
                ))}
              </div>
            </TabsContent>
          );
        })}
      </Tabs>
    </section>
  );
}
