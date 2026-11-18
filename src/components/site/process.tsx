"use client";

import { useRef } from "react";
import { Check, Workflow } from "lucide-react";
import { Eyebrow } from "@/components/ui/button";
import { gsap, MQ, useGSAP } from "@/lib/gsap";
import { BrowserFrame, TemplateShot } from "./template-shot";

const steps = [
  { title: "Nhận yêu cầu", text: "Đội dev gửi trang cần làm, logo, màu và danh sách màn hình." },
  { title: "Dựng bản đầu", text: "Tạo khung giao diện và component theo yêu cầu khách hàng." },
  { title: "Người kiểm duyệt", text: "Designer và dev rà bố cục, chữ tiếng Việt, responsive, chất lượng code." },
  { title: "Bàn giao", text: "Mã nguồn, file Figma, tài liệu, khoá giấy phép." },
];

const tree = `frontend-saas/
├─ app/
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ hero.tsx
│  ├─ pricing.tsx
│  └─ ui/          # shadcn/ui
├─ styles/tokens.css
├─ figma/frontend-saas.fig
└─ LICENSE-thuong-mai.txt`;

export function Process() {
  const scope = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motion, () => {
        gsap.from(".process-panel", {
          clipPath: "inset(12% 8% 12% 8% round 12px)",
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: ".process-panel", start: "top 80%", once: true },
        });
      });
    },
    { scope }
  );

  return (
    <section id="cach-lam-viec" ref={scope} className="mx-auto max-w-[1280px] px-4 py-24 md:px-6 md:py-32">
      <div className="mx-auto max-w-[960px] text-balance text-center">
        <Eyebrow icon={Workflow}>Cách NewTech làm việc</Eyebrow>
        <h2 className="display mt-6 text-[32px] font-medium text-ink sm:text-[48px] lg:text-[56px]">
          Từ một yêu cầu
          <br />
          <span className="text-grad">đến giao diện chạy được.</span>
        </h2>
        <p className="mt-4 text-ink-muted">Mỗi template và mỗi đơn UI riêng đi qua đúng bốn bước này.</p>
      </div>

      <div className="process-panel relative mt-12 overflow-hidden rounded-lg bg-band text-band-ink md:mt-16">
        <div className="band-glow pointer-events-none absolute inset-0" aria-hidden />
        <ol className="relative grid border-b border-band-line sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.title} className="border-band-line p-6 not-last:border-b sm:[&:nth-child(odd)]:border-r lg:border-b-0 lg:not-last:border-r">
              <span className="inline-flex rounded-full bg-band-badge px-4 py-1 text-[14px] text-band-ink">Bước {i + 1}</span>
              <p className="display mt-2 text-[24px] font-medium">{s.title}</p>
              <p className="mt-2 text-[14px] text-band-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
          <div>
            <p className="text-[14px] font-semibold">Bạn nhận được gì</p>
            <pre className="mt-4 overflow-x-auto rounded-md border border-band-line bg-band-card p-4 font-mono text-[14px] leading-6 text-band-ink" data-lenis-prevent>
              {tree}
            </pre>
            <ul className="mt-4 space-y-2 text-[14px] text-band-muted">
              {["Chạy đúng như bản demo", "Giấy phép ghi rõ được dùng cho bao nhiêu dự án"].map((x) => (
                <li key={x} className="flex gap-2">
                  <Check className="mt-1 size-4 shrink-0 stroke-[1.5] text-band-ink" /> {x}
                </li>
              ))}
            </ul>
          </div>
          <BrowserFrame url="frontend-saas.newtech.vn" className="self-center border-band-line">
            <TemplateShot kind="saas" headline="Quản lý ca làm cho chuỗi cửa hàng" />
          </BrowserFrame>
        </div>
      </div>
    </section>
  );
}
