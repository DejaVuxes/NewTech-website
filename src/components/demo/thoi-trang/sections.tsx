"use client";

import { useState } from "react";
import { Leaf, Mail, MapPin, Phone, Receipt, RotateCcw, Truck } from "lucide-react";
import { brand } from "./brand";
import { formatVnd, priceOf, products, unsplash } from "./data";
import { Logo } from "./logo";
import { Photo } from "./photo";
import { useStore } from "./store";

const looks = [
  {
    title: "Đi làm ngày mưa phùn",
    note: "Dạ camel phối quần ống rộng, đủ ấm cho tháng Mười Hai Hà Nội.",
    image: unsplash("1618333453296-9e35280fd6b1"),
    alt: "Người mẫu nữ mặc áo khoác dạ camel đi trên phố",
    spots: [
      { id: "khoac-camel", x: 48, y: 36 },
      { id: "quan-ong-rong", x: 52, y: 72 },
    ],
  },
  {
    title: "Cuối tuần ở Sài Gòn",
    note: "Sơ mi linen mở cúc, quần linen sáng màu. Thoáng từ sáng tới tối.",
    image: unsplash("1792433413663-31eb3dccf89f"),
    alt: "Người mẫu nam mặc sơ mi linen trắng mở cúc",
    spots: [
      { id: "so-mi-linen", x: 68, y: 48 },
      { id: "suit-linen", x: 50, y: 93 },
    ],
  },
];

export function Lookbook() {
  const { openQuickView } = useStore();
  return (
    <section id="lookbook" className="scroll-mt-32 bg-brand-soft py-24 md:py-32">
      <div className="mx-auto max-w-[1280px] px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-12">
          <h2 className="display text-[32px] font-extrabold text-ink sm:text-[48px] lg:col-span-6">Lookbook Thu Đông</h2>
          <p className="self-end text-ink-muted lg:col-span-5 lg:col-start-8">
            Bấm vào các điểm trên ảnh để xem chi tiết và thêm món đồ vào giỏ ngay.
          </p>
        </div>
        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-6">
          {looks.map((l, li) => (
            <figure key={l.title} className={li === 1 ? "md:mt-24" : ""}>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[12px] bg-chip">
                <Photo src={l.image} alt={l.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
                {l.spots.map((s) => {
                  const p = products.find((x) => x.id === s.id)!;
                  return (
                    <button
                      key={s.id}
                      onClick={() => openQuickView(s.id)}
                      style={{ left: `${s.x}%`, top: `${s.y}%` }}
                      className="group/spot absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
                      aria-label={`${p.name}, ${formatVnd(priceOf(p))}`}
                    >
                      <span className="grid size-8 place-items-center rounded-full border-2 border-surface bg-ink/40">
                        <span className="size-2 rounded-full bg-surface" />
                      </span>
                      <span className="hidden whitespace-nowrap rounded-full bg-surface px-4 py-1 text-[14px] font-semibold text-ink group-hover/spot:block group-focus-visible/spot:block">
                        {p.name}, {formatVnd(priceOf(p))}
                      </span>
                    </button>
                  );
                })}
              </div>
              <figcaption className="mt-4">
                <p className="display text-[24px] font-extrabold text-ink">{l.title}</p>
                <p className="mt-1 max-w-[480px] text-ink-muted">{l.note}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

const promises = [
  { icon: Truck, title: "Giao trong 24 giờ", text: `Miễn phí từ ${formatVnd(brand.freeShipFrom)}.` },
  { icon: RotateCcw, title: "Đổi size 30 ngày", text: "Không cần lý do, chúng tôi tới tận nhà lấy hàng." },
  { icon: Receipt, title: "Hoá đơn VAT", text: "Xuất hoá đơn điện tử cho công ty ngay khi đặt hàng." },
  { icon: Leaf, title: "Vải có nguồn gốc", text: "Linen xịn." },
];

export function Promises() {
  return (
    <section className="mx-auto max-w-[1280px] px-4 py-24 md:px-6" aria-label="Cam kết">
      <ul className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {promises.map((p) => (
          <li key={p.title} className="border-t border-ink pt-6">
            <p.icon className="size-6 stroke-[1.5] text-brand" aria-hidden />
            <p className="mt-4 text-[20px] font-semibold text-ink">{p.title}</p>
            <p className="mt-2 text-ink-muted">{p.text}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "error" | "done">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setState(/^\S+@\S+\.\S+$/.test(email) ? "done" : "error");
  };

  return (
    <section className="border-y border-line bg-surface">
      <div className="mx-auto grid max-w-[1280px] gap-8 px-4 py-24 md:px-6 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-6">
          <h2 className="display text-[32px] font-extrabold text-ink sm:text-[48px]">Nhận tin hàng mới</h2>
          <p className="display mt-4 max-w-[480px] text-[24px] font-extralight leading-[1.3] text-ink">
            Mỗi thứ Sáu một email, kèm mã giảm 10% cho đơn đầu tiên.
          </p>
        </div>
        <form onSubmit={submit} noValidate className="lg:col-span-5 lg:col-start-8">
          {state === "done" ? (
            <p role="status" className="rounded-[12px] bg-brand-soft p-6 font-semibold text-ink">
              Đã đăng ký. Mã giảm 10% đang trên đường tới {email}.
            </p>
          ) : (
            <>
              <label htmlFor="nl-email" className="text-[14px] font-semibold text-ink">
                Email của bạn
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="nl-email"
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (state === "error") setState("idle");
                  }}
                  placeholder="ten@email.com"
                  aria-invalid={state === "error"}
                  aria-describedby={state === "error" ? "nl-err" : undefined}
                  className="h-12 min-w-0 flex-1 rounded-full border border-line bg-paper px-6 text-ink outline-none placeholder:text-ink-muted focus:border-brand aria-invalid:border-danger"
                />
                <button className="h-12 shrink-0 rounded-full bg-brand px-6 text-[14px] font-semibold text-primary-foreground hover:brightness-110">
                  Đăng ký
                </button>
              </div>
              {state === "error" && (
                <p id="nl-err" role="alert" className="mt-2 text-[14px] font-semibold text-danger">
                  Email chưa đúng định dạng, ví dụ: ten@email.com
                </p>
              )}
            </>
          )}
        </form>
      </div>
    </section>
  );
}

const footerCols = [
  { title: "Mua sắm", links: ["Nữ", "Nam", "Phụ kiện", "Hàng mới về", "Ưu đãi"] },
  { title: "Hỗ trợ", links: ["Bảng kích cỡ", "Giao hàng", "Đổi trả", "Theo dõi đơn hàng", "Câu hỏi thường gặp"] },
  { title: "Về chúng tôi", links: ["Câu chuyện xưởng may", "Chất liệu", "Tuyển dụng", "Liên hệ"] },
];

export function Footer() {
  return (
    <footer id="lien-he" className="bg-paper">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-4 py-24 md:px-6 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Logo className="text-ink" />
          <p className="mt-4 max-w-[320px] text-ink-muted">{brand.tagline}.</p>
          <ul className="mt-6 flex flex-col gap-2 text-[14px] text-ink">
            {brand.stores.map((s) => (
              <li key={s.city} className="flex gap-2">
                <MapPin className="mt-1 size-4 shrink-0 stroke-[1.5] text-brand" aria-hidden />
                <span>
                  <strong className="font-semibold">{s.city}:</strong> {s.address}
                </span>
              </li>
            ))}
            <li className="flex items-center gap-2">
              <Phone className="size-4 stroke-[1.5] text-brand" aria-hidden />
              {brand.hotline}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 stroke-[1.5] text-brand" aria-hidden />
              {brand.email}
            </li>
          </ul>
        </div>
        {footerCols.map((c) => (
          <nav key={c.title} className="lg:col-span-2" aria-label={c.title}>
            <p className="font-semibold text-ink">{c.title}</p>
            <ul className="mt-4 flex flex-col gap-2 text-[14px] text-ink-muted">
              {c.links.map((l) => (
                <li key={l}>
                  <a href="#" className="hover:text-ink">
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="lg:col-span-2">
          <p className="font-semibold text-ink">Thanh toán</p>
          <ul className="mt-4 flex flex-wrap gap-2">
            {["VietQR", "MoMo", "ZaloPay", "Visa", "COD"].map((m) => (
              <li key={m} className="rounded-[6px] border border-line bg-surface px-2 text-[12px] font-semibold leading-6 text-ink-muted">
                {m}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-[1280px] px-4 py-6 text-[14px] text-ink-muted md:px-6">
          © 2026 {brand.name}. Ảnh minh hoạ từ Unsplash.
        </p>
      </div>
    </footer>
  );
}
